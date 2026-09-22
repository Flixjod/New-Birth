import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { useReducedMotion } from '../hooks/useInView';

/**
 * Lightweight canvas confetti. Call `ref.current.burst()` to celebrate.
 * Pieces are purple / pink / gold — premium, never clownish.
 */
const Confetti = forwardRef(function Confetti({ className = '' }, ref) {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();
  const piecesRef = useRef([]);
  const rafRef = useRef(0);

  useImperativeHandle(ref, () => ({
    burst(n = 130) {
      if (reduced) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const colors = ['#a78bfa', '#c084fc', '#e9d5ff', '#f0abfc', '#fbbf24', '#f5f3ff'];
      for (let i = 0; i < n; i++) {
        piecesRef.current.push({
          x: w / 2 + (Math.random() - 0.5) * w * 0.5,
          y: h * 0.42,
          vx: (Math.random() - 0.5) * 9,
          vy: -4 - Math.random() * 7,
          s: 4 + Math.random() * 6,
          r: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.25,
          c: colors[(Math.random() * colors.length) | 0],
          life: 1,
          decay: 0.004 + Math.random() * 0.006,
          shape: Math.random() > 0.5 ? 'rect' : 'circle',
        });
      }
      start();
    },
    sprinkle(n = 26) {
      if (reduced) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const w = canvas.clientWidth;
      const colors = ['#a78bfa', '#c084fc', '#f0abfc'];
      for (let i = 0; i < n; i++) {
        piecesRef.current.push({
          x: Math.random() * w,
          y: -12,
          vx: (Math.random() - 0.5) * 1.4,
          vy: 1 + Math.random() * 2,
          s: 3 + Math.random() * 4,
          r: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.2,
          c: colors[(Math.random() * colors.length) | 0],
          life: 1,
          decay: 0.003 + Math.random() * 0.004,
          shape: 'rect',
        });
      }
      start();
    },
  }));

  const start = () => {
    if (rafRef.current) return;
    const loop = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        rafRef.current = 0;
        return;
      }
      const ctx = canvas.getContext('2d');
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== Math.floor(w * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const pieces = piecesRef.current;
      for (let i = pieces.length - 1; i >= 0; i--) {
        const p = pieces[i];
        p.vy += 0.16;
        p.vx *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        p.r += p.vr;
        p.life -= p.decay;
        if (p.life <= 0 || p.y > h + 30) {
          pieces.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, p.life * 1.4));
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.fillStyle = p.c;
        if (p.shape === 'rect') ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
        else {
          ctx.beginPath();
          ctx.arc(0, 0, p.s / 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      if (pieces.length > 0) {
        rafRef.current = requestAnimationFrame(loop);
      } else {
        rafRef.current = 0;
        ctx.clearRect(0, 0, w, h);
      }
    };
    rafRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  if (reduced) return null;
  return <canvas ref={canvasRef} className={`confetti-canvas ${className}`} aria-hidden="true" />;
});

export default Confetti;
