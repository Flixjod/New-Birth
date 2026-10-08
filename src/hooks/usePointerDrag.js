import { useEffect } from 'react';

/**
 * Pointer drag on `ref` — works for mouse and touch via pointer events.
 * onDelta(dx, dy, event) fires per move; the hook manages capture cleanup.
 */
export function usePointerDrag(ref, { onDelta, onStart, onEnd } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let last = null;

    const move = (e) => {
      if (!last) return;
      onDelta?.(e.clientX - last.x, e.clientY - last.y, e);
      last = { x: e.clientX, y: e.clientY };
    };
    const up = (e) => {
      if (!last) return;
      last = null;
      onEnd?.(e);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
    const down = (e) => {
      last = { x: e.clientX, y: e.clientY };
      onStart?.(e);
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
      window.addEventListener('pointercancel', up);
    };

    el.addEventListener('pointerdown', down);
    return () => el.removeEventListener('pointerdown', down);
  }, [ref, onDelta, onStart, onEnd]);
}
