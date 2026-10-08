import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/UI/Button';
import Grain from '../../components/Effects/Grain';
import Vignette from '../../components/Effects/Vignette';
import IntroParticles from './IntroParticles';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useSwipe } from '../../hooks/useSwipe';
import './Intro.css';

const FALLBACK_LINES = ['Something special is waiting for you…'];

/**
 * Scene 1 — the dark screen. Lines from config.introLines appear one after
 * another with a slow fade; then a single ENTER button moves forward.
 */
export default function Intro({ config, onNext, onPrev }) {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef(null);

  const lines = Array.isArray(config?.introLines) && config.introLines.length > 0
    ? config.introLines
    : FALLBACK_LINES;

  const [shown, setShown] = useState(reduceMotion ? lines.length : 0);
  const [ctaReady, setCtaReady] = useState(reduceMotion);

  useEffect(() => {
    if (reduceMotion) return;
    if (shown >= lines.length) {
      const t = setTimeout(() => setCtaReady(true), 1400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 700 : 2600);
    return () => clearTimeout(t);
  }, [shown, lines.length, reduceMotion]);

  // A gentle swipe up after the lines land is also a way forward.
  useSwipe(stageRef, {
    onSwipeUp: () => {
      if (ctaReady) onNext();
    },
  });

  return (
    <section className="intro-scene" ref={stageRef} aria-label="Introduction">
      <IntroParticles />
      <Vignette />
      <Grain />

      <div className="intro-stage">
        <AnimatePresence>
          {lines.slice(0, shown).map((line, i) => (
            <motion.p
              key={i}
              className={i % 2 === 1 ? 'intro-line intro-line-script' : 'intro-line'}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 26, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {line}
            </motion.p>
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {ctaReady && (
            <motion.div
              className="intro-cta"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Button variant="primary" onClick={onNext} className="intro-enter">
                ENTER ✦
              </Button>
              <p className="intro-hint">take your time — there is no rush</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
