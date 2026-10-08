import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Envelope — a CSS-drawn sealed envelope. Tap to break the seal:
 * the flap rotates open (rotateX, transform-origin top) and a small
 * note card rises out. Calls onOpened() when the flap finishes.
 * Reduced motion: the flap fades away instead of flipping.
 */
export default function Envelope({ opening, onOpen, onOpened, reduced = false }) {
  const [tapped, setTapped] = useState(false);

  const handleTap = () => {
    if (opening || tapped) return;
    setTapped(true);
    onOpen();
  };

  return (
    <motion.div
      className="sur-envelope-stage"
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
      transition={reduced ? { duration: 0.4 } : { duration: 1.2, ease: 'easeOut' }}
    >
      <div
        className="sur-envelope"
        onClick={handleTap}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleTap();
        }}
        aria-label="Sealed envelope — tap to open"
      >
        {/* note card rising out during opening */}
        <motion.div
          className="sur-mini-note"
          aria-hidden="true"
          initial={{ y: '46%', opacity: 0, scale: 0.92 }}
          animate={
            opening
              ? { y: '-72%', opacity: 1, scale: 1 }
              : { y: '46%', opacity: 0, scale: 0.92 }
          }
          transition={
            reduced
              ? { duration: 0.5 }
              : { duration: 1.4, delay: 0.55, ease: [0.22, 1, 0.36, 1] }
          }
        >
          <span className="sur-mini-note-mark">✦</span>
        </motion.div>

        {/* envelope body */}
        <div className="sur-env-body" aria-hidden="true">
          <span className="sur-env-pocket" />
        </div>

        {/* flap */}
        <motion.div
          className="sur-env-flap"
          aria-hidden="true"
          style={{ zIndex: opening ? 1 : 3 }}
          initial={false}
          animate={
            opening
              ? reduced
                ? { opacity: 0 }
                : { rotateX: -178 }
              : { rotateX: 0, opacity: 1 }
          }
          transition={
            reduced ? { duration: 0.6 } : { duration: 1.3, ease: [0.4, 0, 0.2, 1] }
          }
          onAnimationComplete={() => {
            if (opening) onOpened();
          }}
        >
          <span className="sur-seal">✦</span>
        </motion.div>
      </div>

      {!opening && (
        <p className="sur-env-hint">tap to break the seal</p>
      )}
      {opening && (
        <p className="sur-env-hint">…</p>
      )}
    </motion.div>
  );
}
