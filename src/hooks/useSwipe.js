import { useEffect } from 'react';
import { touchPoint } from '../utils/touch';

/**
 * Attach swipe detection to `ref`.
 * Handlers: onSwipeLeft / onSwipeRight / onSwipeUp / onSwipeDown.
 */
export function useSwipe(
  ref,
  { onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold = 60 } = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let start = null;

    const down = (e) => {
      start = touchPoint(e);
    };
    const up = (e) => {
      if (!start) return;
      const end = touchPoint(e);
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      start = null;
      if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) return;
      if (Math.abs(dx) > Math.abs(dy)) {
        (dx < 0 ? onSwipeLeft : onSwipeRight)?.();
      } else {
        (dy < 0 ? onSwipeUp : onSwipeDown)?.();
      }
    };

    el.addEventListener('touchstart', down, { passive: true });
    el.addEventListener('touchend', up, { passive: true });
    return () => {
      el.removeEventListener('touchstart', down);
      el.removeEventListener('touchend', up);
    };
  }, [ref, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold]);
}

export default useSwipe;
