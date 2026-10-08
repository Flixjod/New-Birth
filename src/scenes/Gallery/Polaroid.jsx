import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Polaroid — a small photo card. Interactive (button) when onClick is
 * given, otherwise a plain div. Missing images fall back to the
 * gradient placeholder so the card still looks intentional.
 */
export default function Polaroid({
  memory,
  index = 0,
  onClick,
  reduceMotion = false,
  className = '',
}) {
  const [imgOk, setImgOk] = useState(true);
  const text = memory?.note || memory?.caption || '';
  const interactive = typeof onClick === 'function';
  const Tag = interactive ? motion.button : motion.div;

  return (
    <Tag
      type={interactive ? 'button' : undefined}
      className={`gal-polaroid ${className}`}
      onClick={onClick}
      whileHover={interactive && !reduceMotion ? { y: -6, rotate: 0 } : undefined}
      whileTap={interactive && !reduceMotion ? { scale: 0.97 } : undefined}
      aria-label={
        interactive
          ? text
            ? `Open photo: ${text}`
            : `Open photo ${index + 1}`
          : undefined
      }
    >
      <span className="gal-pol-frame">
        {imgOk && memory?.image ? (
          <img
            className="gal-pol-img"
            src={memory.image}
            alt={text || `Memory ${index + 1}`}
            draggable={false}
            onError={() => setImgOk(false)}
          />
        ) : null}
      </span>
      <span className="gal-pol-cap">
        {memory?.date ? <span className="gal-pol-date">{memory.date}</span> : null}
        {text ? <span className="gal-pol-note">{text}</span> : null}
      </span>
    </Tag>
  );
}
