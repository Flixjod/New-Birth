import { motion } from 'framer-motion';

/**
 * MessageBubble — a single chat bubble.
 * Soft rise + fade in (transform / opacity only).
 */
export default function MessageBubble({ text, fromMe = false }) {
  return (
    <motion.div
      className={`ph-bubble${fromMe ? ' ph-bubble--me' : ''}`}
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {text}
    </motion.div>
  );
}
