import { motion, AnimatePresence } from 'framer-motion';
import { isMobile } from '../../utils/device';

/**
 * PhotoDepth — overlay that blurs and darkens the void while a photo is
 * focused, so the close-up floats above a softened background.
 * Only opacity is animated; the blur itself is static CSS. Tap → onClose.
 */
export default function PhotoDepth({ active, onClose }) {
  const mobile = isMobile();
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className={`mw-depth${mobile ? ' mw-depth--soft' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          onClick={onClose}
        />
      )}
    </AnimatePresence>
  );
}
