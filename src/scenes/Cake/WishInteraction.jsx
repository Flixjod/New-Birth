import { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

/**
 * WishInteraction — press-and-hold (or tap, when reduced motion is on)
 * to blow out the candles. Holding fills a progress bar (scaleX —
 * transform only); releasing early resets it. Keyboard: Enter/Space
 * blows the candles out instantly.
 */
const HOLD_MS = 1500;

export default function WishInteraction({
  onBlowOut,
  blown = false,
  reduced = false,
  holdLabel,
}) {
  const progress = useMotionValue(0);
  const fillScale = useTransform(progress, [0, 1], [0, 1]);
  const raf = useRef(null);
  const startAt = useRef(0);

  const cancel = () => {
    if (raf.current) {
      cancelAnimationFrame(raf.current);
      raf.current = null;
    }
  };

  const tick = () => {
    const elapsed = performance.now() - startAt.current;
    const p = Math.min(elapsed / HOLD_MS, 1);
    progress.set(p);
    if (p >= 1) {
      raf.current = null;
      onBlowOut();
      return;
    }
    raf.current = requestAnimationFrame(tick);
  };

  const begin = (e) => {
    if (blown) return;
    if (reduced) {
      onBlowOut();
      return;
    }
    if (e.type === 'pointerdown' && e.pointerType === 'mouse' && e.button !== 0) return;
    cancel();
    startAt.current = performance.now();
    raf.current = requestAnimationFrame(tick);
  };

  const abort = () => {
    if (blown || reduced) return;
    cancel();
    progress.set(0);
  };

  const handleKey = (e) => {
    if (blown) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      cancel();
      progress.set(1);
      onBlowOut();
    }
  };

  return (
    <div className="cake-wish">
      {!blown && (
        <motion.button
          type="button"
          className="cake-hold"
          onPointerDown={begin}
          onPointerUp={abort}
          onPointerLeave={abort}
          onPointerCancel={abort}
          onKeyDown={handleKey}
          aria-label={holdLabel || 'Hold to blow out the candles'}
          whileTap={reduced ? {} : { scale: 0.97 }}
        >
          <span className="cake-hold-ring" aria-hidden="true" />
          <span className="cake-hold-label">{holdLabel || 'hold to blow out the candles'}</span>
          <span className="cake-hold-track" aria-hidden="true">
            <motion.span className="cake-hold-fill" style={{ scaleX: fillScale }} />
          </span>
        </motion.button>
      )}
    </div>
  );
}
