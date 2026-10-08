import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import Button from '../../components/UI/Button';
import ParticleField from '../../components/Effects/ParticleField';
import Vignette from '../../components/Effects/Vignette';
import { isMobile } from '../../utils/device';
import TextReveal from './TextReveal';
import './PersonalMessage.css';

/**
 * PersonalMessage ★ — an intimate, quiet chapter.
 * Reveals config.messageIntro lines first, then the message itself,
 * line by line with a slow cinematic stagger. Tapping the text skips
 * ahead; once everything has been read, a way forward appears.
 */
export default function PersonalMessage({ config, onNext, onPrev }) {
  const reduced = useReducedMotion();
  const mobile = isMobile();

  const intro = useMemo(() => {
    const lines = config?.messageIntro;
    return Array.isArray(lines) ? lines.filter(Boolean) : [];
  }, [config]);

  const paragraphs = useMemo(() => {
    const msg = config?.message;
    if (typeof msg !== 'string' || msg.trim().length === 0) return [];
    return msg
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);
  }, [config]);

  // 0 → intro revealing, 1 → message revealing, 2 → finished
  const [phase, setPhase] = useState(reduced ? 2 : 0);
  const timers = useRef([]);

  const INTRO_STAGGER = 2.0;
  const MSG_STAGGER = 2.4;
  const FADE = 1.8;

  useEffect(() => {
    if (reduced) {
      setPhase(2);
      return undefined;
    }
    timers.current.forEach(clearTimeout);
    timers.current = [];

    const introTime = (intro.length * INTRO_STAGGER + FADE) * 1000;
    const msgTime = (paragraphs.length * MSG_STAGGER + FADE) * 1000;

    if (phase === 0) {
      if (intro.length > 0) {
        timers.current.push(setTimeout(() => setPhase(1), introTime));
      } else {
        setPhase(1);
      }
    } else if (phase === 1) {
      if (paragraphs.length > 0) {
        timers.current.push(setTimeout(() => setPhase(2), msgTime));
      } else {
        setPhase(2);
      }
    }
    return () => timers.current.forEach(clearTimeout);
  }, [phase, reduced, intro.length, paragraphs.length]);

  const hasWords = intro.length > 0 || paragraphs.length > 0;

  const skipAhead = () => {
    if (phase === 0) setPhase(1);
    else if (phase === 1) setPhase(2);
  };

  return (
    <section className="pm-root" aria-label="A personal message">
      <div className="pm-atmosphere" aria-hidden="true">
        <ParticleField count={mobile ? 24 : 60} color="#a78bfa" />
        <Vignette />
      </div>

      {onPrev && (
        <button type="button" className="pm-back" onClick={onPrev} aria-label="Go back">
          ← back
        </button>
      )}

      <div className="pm-inner" onClick={skipAhead}>
        <p className="pm-kicker">a few words, just for you</p>

        {intro.length > 0 && (
          <div className="pm-intro">
            <TextReveal
              blocks={intro}
              stagger={INTRO_STAGGER}
              baseDelay={0.6}
              lineClassName="pm-intro-line"
              reduced={reduced}
            />
          </div>
        )}

        {paragraphs.length > 0 && phase >= 1 && (
          <div className="pm-body">
            <TextReveal
              blocks={paragraphs}
              stagger={MSG_STAGGER}
              baseDelay={0.4}
              lineClassName="pm-body-line"
              reduced={reduced}
            />
          </div>
        )}

        {!hasWords && (
          <p className="pm-empty">This page is waiting for its words…</p>
        )}

        <AnimatePresence>
          {(phase === 0 || phase === 1) && hasWords && !reduced && (
            <motion.p
              className="pm-skip-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, delay: 3 }}
            >
              tap the words to read faster
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase === 2 && (
            <motion.div
              className="pm-cta"
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={reduced ? { duration: 0 } : { duration: 1.2, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <Button variant="primary" onClick={onNext} className="pm-continue">
                Continue →
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
