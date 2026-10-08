import { motion, AnimatePresence } from 'framer-motion';

/**
 * HiddenNote — a note concealed behind a card. A faint corner peeks out
 * so it's discoverable; the full note springs in once the card covering
 * it has been dragged away (parent flips `revealed`).
 */
export default function HiddenNote({ note, style, revealed, reduceMotion = false }) {
  if (!note) return null;

  return (
    <div className="sbk-hidden-pos" style={style} aria-hidden={!revealed}>
      {!revealed && <span className="sbk-hidden-peek" aria-hidden="true" />}
      <AnimatePresence>
        {revealed && (
          <motion.div
            className="sbk-hidden-note"
            initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={
              reduceMotion
                ? { duration: 0.2 }
                : { type: 'spring', stiffness: 300, damping: 22 }
            }
          >
            <span className="sbk-tape" aria-hidden="true" />
            <p className="sbk-hidden-text">{note.text}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
