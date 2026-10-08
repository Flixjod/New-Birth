import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { letterPaper } from '../../animations/transitions/reveal';
import { fade } from '../../animations/transitions/fade';
import Button from '../../components/UI/Button';
import LetterPaper from './LetterPaper';
import './FinalLetter.css';

export default function LetterReveal({ letter, name, onContinue }) {
  const reduceMotion = useReducedMotion();
  const [canContinue, setCanContinue] = useState(false);
  const scrollRef = useRef(null);

  // The letter is unfoldable/scrollable; reveal the continue control
  // once the reader has scrolled near the end (or after a grace period).
  useEffect(() => {
    if (reduceMotion) {
      setCanContinue(true);
      return;
    }
    const el = scrollRef.current;
    if (!el) {
      const t = window.setTimeout(() => setCanContinue(true), 4000);
      return () => window.clearTimeout(t);
    }
    const onScroll = () => {
      const nearEnd = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
      if (nearEnd) setCanContinue(true);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    const fallback = window.setTimeout(() => setCanContinue(true), 9000);
    onScroll();
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.clearTimeout(fallback);
    };
  }, [reduceMotion]);

  return (
    <motion.div
      className="fl-reveal"
      variants={letterPaper}
      initial={reduceMotion ? 'visible' : 'hidden'}
      animate="visible"
    >
      <div ref={scrollRef} className="fl-reveal-scroll">
        <LetterPaper letter={letter} />
        <motion.div
          className="fl-finish"
          initial={false}
          animate={{ opacity: canContinue ? 1 : 0 }}
          transition={{ duration: 0.9 }}
        >
          <Button
            variant="primary"
            onClick={onContinue}
            className={!canContinue ? 'fl-hidden-btn' : ''}
          >
            Continue
          </Button>
        </motion.div>
      </div>
      <motion.div
        className="fl-scroll-hint"
        variants={fade}
        initial={reduceMotion ? 'visible' : 'hidden'}
        animate={canContinue ? 'hidden' : 'visible'}
      >
        <span>scroll gently</span>
        <span className="fl-scroll-line" aria-hidden="true" />
      </motion.div>
    </motion.div>
  );
}
