import { motion } from 'framer-motion';

/**
 * MessageComposer — the reply pill + send button.
 * The reply text is pre-composed; tapping send fires early.
 */
export default function MessageComposer({ text, onSend }) {
  return (
    <motion.div
      className="ph-composer"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="ph-composer-field">
        <span className="ph-composer-text">{text}</span>
      </div>
      <button type="button" className="ph-sendbtn" onClick={onSend} aria-label="Send message">
        <svg viewBox="0 0 24 24" aria-hidden>
          <path d="M3.4 20.4 21.9 12 3.4 3.6l-.01 6.53L14 12 3.39 13.87z" />
        </svg>
      </button>
    </motion.div>
  );
}
