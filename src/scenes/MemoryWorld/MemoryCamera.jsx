import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { usePointerDrag } from '../../hooks/usePointerDrag';
import { isMobile, isTouch } from '../../utils/device';

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

/**
 * MemoryCamera — pointer-driven camera for the 3D void.
 * Desktop: follows the pointer. Touch: drag to look around.
 * Applies a smoothed translate + rotate to the camera wrapper (transform
 * only, via rAF lerping toward the target — no React re-renders per frame).
 */
export default function MemoryCamera({ children }) {
  const reduced = useReducedMotion();
  const mobile = isMobile();
  const touch = isTouch();
  const rootRef = useRef(null);
  const innerRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  // Desktop pointer → camera target
  useEffect(() => {
    if (reduced || touch) return;
    const onMove = (e) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      target.current.x = clamp(e.clientX / w - 0.5, -0.5, 0.5) * 2;
      target.current.y = clamp(e.clientY / h - 0.5, -0.5, 0.5) * 2;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduced, touch]);

  // Touch drag → camera target (deltas accumulate, clamped)
  usePointerDrag(rootRef, {
    onDelta: (dx, dy) => {
      if (reduced) return;
      target.current.x = clamp(target.current.x + dx / 260, -1, 1);
      target.current.y = clamp(target.current.y + dy / 260, -1, 1);
    },
  });

  // Smooth follow loop (transform only, written straight to the DOM node)
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const strength = mobile ? 16 : 36;
    const rotAmt = mobile ? 1.5 : 3;
    const tick = () => {
      const c = current.current;
      const t = target.current;
      c.x += (t.x - c.x) * 0.07;
      c.y += (t.y - c.y) * 0.07;
      const el = innerRef.current;
      if (el) {
        el.style.transform =
          `perspective(1100px) ` +
          `translate3d(${(-c.x * strength).toFixed(2)}px, ${(-c.y * strength).toFixed(2)}px, 0) ` +
          `rotateY(${(c.x * rotAmt).toFixed(3)}deg) ` +
          `rotateX(${(-c.y * rotAmt).toFixed(3)}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, mobile]);

  return (
    <div ref={rootRef} className="mw-camera-root">
      <div ref={innerRef} className="mw-camera">
        {children}
      </div>
    </div>
  );
}
