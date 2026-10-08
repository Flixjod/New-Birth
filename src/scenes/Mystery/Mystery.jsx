import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Grain from '../../components/Effects/Grain';
import Vignette from '../../components/Effects/Vignette';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './Mystery.css';

/**
 * Scene 2 — one beat of anticipation. A sealed envelope glows on the dark
 * screen; a single tap unwraps it and moves forward. Tease, don't reveal.
 */
export default function Mystery({ config, onNext, onPrev }) {
  const reduceMotion = useReducedMotion();
  const [opened, setOpened] = useState(false);
  const advancedRef = useRef(false);

  const go = () => {
    if (advancedRef.current) return;
    advancedRef.current = true;
    onNext();
  };

  const unwrap = () => {
    if (advancedRef.current || opened) return;
    if (reduceMotion) {
      go();
      return;
    }
    setOpened(true);
    // Let the flap lift and the letter rise before moving on.
    setTimeout(go, 1100);
  };

  const teaserLine = config?.mysteryLine ?? 'Something is waiting for you…';

  return (
    <section className="mystery-scene" aria-label="A sealed surprise">
      <div className="mystery-aura" aria-hidden="true" />
      <Vignette />
      <Grain />

      <div className="mystery-stage">
        <motion.p
          className="mystery-line"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {teaserLine}
        </motion.p>

        <motion.div
          className="mystery-wrap"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            type="button"
            className={`mystery-seal${opened ? ' mystery-seal-open' : ''}`}
            onClick={unwrap}
            aria-label="Unwrap the surprise"
          >
            <span className="mystery-envelope" aria-hidden="true">
              <span className="mystery-env-back" />
              <motion.span
                className="mystery-env-letter"
                animate={opened ? { y: -56, opacity: 1 } : { y: 0, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                ✦
              </motion.span>
              <span className="mystery-env-front" />
              <motion.span
                className="mystery-flap"
                animate={opened ? { rotateX: 180 } : { rotateX: 0 }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              />
              <motion.span
                className="mystery-wax"
                animate={opened ? { opacity: 0, scale: 0.6 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                ✦
              </motion.span>
            </span>
          </button>
        </motion.div>

        <motion.p
          className="mystery-hint"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.4 }}
        >
          tap to unwrap
        </motion.p>
      </div>
    </section>
  );
}
