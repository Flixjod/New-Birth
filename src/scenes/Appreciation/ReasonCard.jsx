import { motion } from 'framer-motion';

/**
 * ReasonCard — one numbered "things I love about you" card.
 * Gentle staggered entrance; lifts on hover (transform only).
 */
export default function ReasonCard({ reason, index, reduced = false }) {
  const number = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      className="apr-card"
      variants={{
        hidden: reduced ? { opacity: 1 } : { opacity: 0, y: 36 },
        show: {
          opacity: 1,
          y: 0,
          transition: reduced
            ? { duration: 0 }
            : { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      <span className="apr-card-number" aria-hidden="true">
        {number}
      </span>
      <p className="apr-card-text">{reason}</p>
      <span className="apr-card-glow" aria-hidden="true" />
    </motion.article>
  );
}
