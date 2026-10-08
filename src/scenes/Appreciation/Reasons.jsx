import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import Button from '../../components/UI/Button';
import Glow from '../../components/Effects/Glow';
import Bokeh from '../../components/Effects/Bokeh';
import Vignette from '../../components/Effects/Vignette';
import { isMobile } from '../../utils/device';
import ReasonCard from './ReasonCard';
import './Appreciation.css';

/**
 * Reasons ★ — "Things I love about you".
 * Lays out config.reasons as numbered ReasonCards with a slow
 * staggered entrance and a gentle hover lift.
 */
export default function Reasons({ config, onNext, onPrev }) {
  const reduced = useReducedMotion();
  const mobile = isMobile();

  const reasons = useMemo(() => {
    const list = config?.reasons;
    return Array.isArray(list) ? list.filter(Boolean) : [];
  }, [config]);

  const listVariants = {
    hidden: {},
    show: {
      transition: reduced
        ? { staggerChildren: 0 }
        : { staggerChildren: mobile ? 0.22 : 0.32, delayChildren: 0.5 },
    },
  };

  return (
    <section className="apr-root" aria-label="Things I love about you">
      <div className="apr-atmosphere" aria-hidden="true">
        <Bokeh />
        <Glow />
        <Vignette />
      </div>

      {onPrev && (
        <button type="button" className="apr-back" onClick={onPrev} aria-label="Go back">
          ← back
        </button>
      )}

      <div className="apr-inner">
        <motion.header
          className="apr-head"
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? { duration: 0 } : { duration: 1.4, ease: 'easeOut' }}
        >
          <p className="apr-kicker">a few of a million reasons</p>
          <h2 className="apr-title">Things I love about you</h2>
        </motion.header>

        {reasons.length > 0 ? (
          <motion.div
            className="apr-grid"
            variants={listVariants}
            initial="hidden"
            animate="show"
          >
            {reasons.map((reason, i) => (
              <ReasonCard key={i} reason={reason} index={i} reduced={reduced} />
            ))}
          </motion.div>
        ) : (
          <p className="apr-empty">The reasons are still being gathered…</p>
        )}

        <motion.div
          className="apr-cta"
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reduced ? { duration: 0 } : { duration: 1.2, delay: 0.8 + reasons.length * 0.28 }}
        >
          <Button variant="primary" onClick={onNext} className="apr-continue">
            Continue →
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
