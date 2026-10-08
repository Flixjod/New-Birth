import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { pageFlip } from '../../animations/transitions/pageTurn';
import BookPage from './BookPage';

/**
 * The animated page-turn overlay: the outgoing page rotates away on the Y axis
 * (transform-only), revealing the incoming page already rendered underneath.
 * Props: page (outgoing page object), direction (1 = forward, -1 = backward),
 *        duration (s), onDone.
 * A timeout fallback guarantees onDone fires even if the variant shape differs.
 */
export default function PageTurn({ page, direction = 1, duration = 0.85, onDone }) {
  const doneRef = useRef(false);
  const finish = () => {
    if (!doneRef.current) {
      doneRef.current = true;
      if (onDone) onDone();
    }
  };

  useEffect(() => {
    const t = setTimeout(finish, duration * 1000 + 150);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="skb-turn"
      aria-hidden="true"
      style={{ transformOrigin: direction > 0 ? 'left center' : 'right center' }}
      variants={pageFlip}
      custom={direction}
      initial="initial"
      animate="flip"
      transition={{ duration, ease: [0.32, 0, 0.24, 1] }}
      onAnimationComplete={finish}
    >
      <BookPage page={page} inert />
      <div className="skb-turn-shade" />
    </motion.div>
  );
}
