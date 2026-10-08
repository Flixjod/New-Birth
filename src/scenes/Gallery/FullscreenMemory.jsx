import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import useSwipe from '../../hooks/useSwipe';

/**
 * FullscreenMemory — lightbox with the photo, caption and a counter.
 * Swipe left/right to move between photos, swipe down (or tap the
 * backdrop / close) to return to the rail.
 */
export default function FullscreenMemory({ memory, index, total, onClose, onStep }) {
  const reduceMotion = useReducedMotion();
  const cardRef = useRef(null);
  const [imgOk, setImgOk] = useState(true);

  useSwipe(cardRef, {
    onSwipeLeft: () => onStep(1),
    onSwipeRight: () => onStep(-1),
    onSwipeDown: onClose,
    threshold: 48,
  });

  useEffect(() => {
    setImgOk(true);
  }, [memory?.image]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onStep]);

  const text = memory?.note || memory?.caption || '';

  return (
    <motion.div
      className="gal-lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0.15 : 0.3 }}
      role="dialog"
      aria-modal="true"
      aria-label={text || 'Photo memory'}
    >
      <button
        type="button"
        className="gal-lightbox-backdrop"
        onClick={onClose}
        aria-label="Close photo"
        tabIndex={-1}
      />
      <div className="gal-lightbox-inner" ref={cardRef}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            key={index}
            className="gal-lightbox-card"
            initial={
              reduceMotion ? { opacity: 0 } : { opacity: 0, x: 60, scale: 0.96 }
            }
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={
              reduceMotion ? { opacity: 0 } : { opacity: 0, x: -60, scale: 0.96 }
            }
            transition={{ duration: reduceMotion ? 0.15 : 0.3, ease: 'easeOut' }}
          >
            <span className="gal-lb-frame">
              {imgOk && memory?.image ? (
                <img
                  className="gal-lb-img"
                  src={memory.image}
                  alt={text || `Memory ${index + 1}`}
                  onError={() => setImgOk(false)}
                />
              ) : null}
            </span>
            <figcaption className="gal-lb-cap">
              {memory?.date ? <span className="gal-lb-date">{memory.date}</span> : null}
              {text ? <span className="gal-lb-note">{text}</span> : null}
              <span className="gal-lb-count">
                {index + 1} / {total}
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
        <div className="gal-lb-controls">
          <button
            type="button"
            className="gal-lb-nav"
            onClick={() => onStep(-1)}
            aria-label="Previous photo"
          >
            ‹
          </button>
          <button type="button" className="gal-lb-close" onClick={onClose}>
            close
          </button>
          <button
            type="button"
            className="gal-lb-nav"
            onClick={() => onStep(1)}
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
      </div>
    </motion.div>
  );
}
