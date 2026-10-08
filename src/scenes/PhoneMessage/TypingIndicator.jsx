import { motion } from 'framer-motion';
import { typingDots } from '../../animations/phone/typing';

/**
 * TypingIndicator — three dots.
 * The documented `typingDots` variant drives the outer span;
 * an inner span carries the infinite bounce (transform only)
 * so the two never fight over the same transform.
 */
export default function TypingIndicator() {
  return (
    <div className="ph-typing" aria-hidden>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="ph-dot"
          variants={typingDots}
          initial="hidden"
          animate="visible"
          transition={{ delay: i * 0.16 }}
        >
          <span className="ph-dot-inner" />
        </motion.span>
      ))}
    </div>
  );
}
