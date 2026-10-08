import { useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { isTouch } from '../../utils/device';
import './FinalLetter.css';

export default function FinalEnvelope({ teaser, onOpened }) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [sealed, setSealed] = useState(false);

  const handleTap = () => {
    if (sealed) return;
    setSealed(true);
    if (reduceMotion) {
      setOpen(true);
      onOpened?.();
      return;
    }
    setOpen(true);
    // Let the flap animation play before revealing the letter
    window.setTimeout(() => onOpened?.(), 1150);
  };

  return (
    <div className="fl-envelope-wrap">
      <motion.p
        className="fl-teaser"
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {teaser || 'One last thing…'}
      </motion.p>

      <motion.button
        type="button"
        className={`fl-envelope ${open ? 'fl-open' : ''}`}
        onClick={handleTap}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleTap();
          }
        }}
        aria-label="Open the envelope"
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      >
        <span className="fl-envelope-body" aria-hidden="true">
          <span className="fl-envelope-pocket" />
          <span className="fl-envelope-card" />
          <span className="fl-envelope-flap" />
          <span className="fl-envelope-seal">
            <span className="fl-envelope-heart">♥</span>
          </span>
        </span>
      </motion.button>

      <motion.p
        className="fl-tap-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: sealed ? 0 : 0.72 }}
        transition={{ duration: 0.9, delay: 1.1 }}
      >
        {isTouch() ? 'tap to open' : 'click to open'}
      </motion.p>
    </div>
  );
}
