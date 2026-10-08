import { useEffect, useRef } from 'react';

/**
 * Pointer parallax: returns a `ref` to attach to a container.
 * While the pointer moves, `--px` / `--py` (each -1..1, smoothed)
 * are set on the element — consume them in CSS, e.g.
 * `transform: translate3d(calc(var(--px, 0) * 24px), calc(var(--py, 0) * 24px), 0)`.
 * No re-renders; pure style writes.
 */
export function useParallax() {
  const ref = useRef(null);

  useEffect(() => {
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const loop = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      const el = ref.current;
      if (el) {
        el.style.setProperty('--px', cx.toFixed(3));
        el.style.setProperty('--py', cy.toFixed(3));
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}

export default useParallax;
