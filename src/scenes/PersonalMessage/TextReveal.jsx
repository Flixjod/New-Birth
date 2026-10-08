import { motion } from 'framer-motion';

/**
 * TextReveal — reveals text blocks one after another with a slow,
 * cinematic fade + unblur. Each block gets its own staggered delay.
 * Renders everything instantly when `reduced` is true.
 */
export default function TextReveal({
  blocks = [],
  stagger = 1.4,
  baseDelay = 0.2,
  lineClassName = '',
  reduced = false,
}) {
  const visible = blocks.filter(Boolean);
  if (visible.length === 0) return null;

  return (
    <div className="pm-text-reveal">
      {visible.map((text, i) => (
        <motion.p
          key={i}
          className={`pm-line ${lineClassName}`}
          initial={
            reduced
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 16, filter: 'blur(8px)' }
          }
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={
            reduced
              ? { duration: 0 }
              : {
                  duration: 1.8,
                  delay: baseDelay + i * stagger,
                  ease: [0.22, 1, 0.36, 1],
                }
          }
        >
          {text}
        </motion.p>
      ))}
    </div>
  );
}
