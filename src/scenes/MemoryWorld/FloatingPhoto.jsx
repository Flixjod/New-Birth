import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IconButton from '../../components/UI/IconButton';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * FloatingPhoto — a photo card floating in the 3D void.
 *
 * Two modes:
 *  - canvas mode (default): sits at its x/y/z/rotation in the void,
 *    gently bobbing; dims when another photo is focused; tap → onFocus.
 *  - focused mode (`focused`): the close-up layer — larger, with caption
 *    and a close control; tap outside (PhotoDepth) or close → onClose.
 *
 * Every <img> sits on a gradient placeholder and hides itself on error,
 * so the card still looks intentional with no photo.
 */
export default function FloatingPhoto({
  memory,
  index = 0,
  focused = false,
  dimmed = false,
  large = false,
  onFocus,
  onClose,
}) {
  const [imgOk, setImgOk] = useState(true);
  const reduced = useReducedMotion();

  if (focused) {
    return (
      <motion.div
        className={`mw-photo mw-photo--focus${large ? ' mw-photo--large' : ''}`}
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: reduced ? 0.25 : 0.6, ease: 'easeOut' }}
      >
        <div className="mw-photo-frame">
          {imgOk && memory.image && (
            <img src={memory.image} alt={memory.caption || 'memory'} onError={() => setImgOk(false)} />
          )}
        </div>
        <AnimatePresence>
          {memory.caption && (
            <motion.figcaption
              className="mw-caption"
              initial={{ opacity: 0, x: '-50%', y: 12 }}
              animate={{ opacity: 1, x: '-50%', y: 0 }}
              exit={{ opacity: 0, x: '-50%', y: 6 }}
              transition={{ delay: reduced ? 0 : 0.25, duration: reduced ? 0.2 : 0.5, ease: 'easeOut' }}
            >
              {memory.caption}
            </motion.figcaption>
          )}
        </AnimatePresence>
        <div className="mw-close">
          <IconButton label="Close" onClick={onClose}>
            ✕
          </IconButton>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="mw-photo"
      initial={false}
      animate={{ opacity: dimmed ? 0.08 : 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      style={{ x: '-50%', y: '-50%', z: memory.z, rotate: memory.rotation }}
      onClick={onFocus}
      role="button"
      tabIndex={0}
      aria-label={memory.caption ? `View memory: ${memory.caption}` : 'View memory'}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onFocus) {
          e.preventDefault();
          onFocus();
        }
      }}
    >
      <div
        className={reduced ? undefined : 'mw-float'}
        style={
          reduced
            ? undefined
            : { animationDelay: `${(index % 5) * -1.4}s`, animationDuration: `${6 + (index % 4)}s` }
        }
      >
        <div className="mw-photo-frame">
          {imgOk && memory.image && <img src={memory.image} alt="" onError={() => setOk(false)} />}
        </div>
      </div>
    </motion.div>
  );
}
