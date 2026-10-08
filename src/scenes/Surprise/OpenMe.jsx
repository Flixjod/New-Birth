import { motion } from 'framer-motion';

/**
 * OpenMe — the glowing invitation button. Pulsing halo
 * (transform/opacity only); still when reduced motion is on.
 */
export default function OpenMe({ label, onOpen, reduced = false }) {
  return (
    <motion.div
      className="sur-openme-wrap"
      initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={reduced ? { duration: 0 } : { duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {!reduced && (
        <>
          <span className="sur-spark sur-spark-1" aria-hidden="true">✦</span>
          <span className="sur-spark sur-spark-2" aria-hidden="true">✦</span>
          <span className="sur-spark sur-spark-3" aria-hidden="true">✦</span>
        </>
      )}
      <motion.button
        type="button"
        className="sur-openme"
        onClick={onOpen}
        animate={
          reduced
            ? {}
            : { scale: [1, 1.045, 1], opacity: [1, 0.92, 1] }
        }
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        whileTap={reduced ? {} : { scale: 0.96 }}
        aria-label={label || 'Open me'}
      >
        <span className="sur-openme-halo" aria-hidden="true" />
        <span className="sur-openme-label">{label || 'OPEN ME ✦'}</span>
      </motion.button>
      <p className="sur-openme-sub">something is waiting for you</p>
    </motion.div>
  );
}
