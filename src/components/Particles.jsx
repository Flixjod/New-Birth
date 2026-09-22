import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useInView';

/**
 * Cinematic purple particle field rendered on canvas.
 * Layers: fine glowing dust + large soft bokeh orbs.
 * `intensity` (0..1) scales count, speed and glow — the night "wakes up"
 * as midnight approaches. Pointer proximity gently stirs the dust.
 */
export default function Particles({ intensity = 0.5, className = '', interactive = true }) {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const pointer = { x: -9999, y: -9999 };
    const intensityRef = { v: intensity };
    intensityRef.v = intensity;

    const isMobile = window.innerWidth < 640;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    // Palette — midnight violet family
    const hues = [
      [268, 'rgba(167,139,250,'], // lavender
      [282, 'rgba(192,132,252,'], // purple
      [300, 'rgba(240,171,252,'], // pink-lavender
      [255, 'rgba(129,140,248,'], // indigo
    ];

    let dust = [];
    let bokeh = [];

    const seed = () => {
      const base = isMobile ? 42 : 90;
      const count = Math.floor(base * (0.45 + intensityRef.v * 0.9));
      dust = Array.from({ length: count }, () => {
        const [, c] = hues[(Math.random() * hues.length) | 0];
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.6 + Math.random() * 1.8,
          vy: 0.08 + Math.random() * 0.35,
          vx: (Math.random() - 0.5) * 0.12,
          tw: Math.random() * Math.PI * 2,
          ts: 0.004 + Math.random() * 0.01,
          c,
          a: 0.25 + Math.random() * 0.55,
        };
      });
      const bCount = isMobile ? 5 : 9;
      bokeh = Array.from({ length: bCount }, () => {
        const [, c] = hues[(Math.random() * hues.length) | 0];
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: 40 + Math.random() * 90,
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.08,
          c,
          a: 0.05 + Math.random() * 0.08 + intensityRef.v * 0.05,
        };
      });
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const p = e.touches ? e.touches[0] : e;
      pointer.x = p.clientX - rect.left;
      pointer.y = p.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      for (const b of bokeh) {
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, `${b.c}${b.a})`);
        g.addColorStop(1, `${b.c}0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }
      for (const p of dust) {
        ctx.fillStyle = `${p.c}${p.a * 0.8})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = () => {
      const inten = intensityRef.v;
      ctx.clearRect(0, 0, w, h);

      for (const b of bokeh) {
        b.x += b.vx * (0.6 + inten);
        b.y += b.vy * (0.6 + inten);
        if (b.x < -b.r) b.x = w + b.r;
        if (b.x > w + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = h + b.r;
        if (b.y > h + b.r) b.y = -b.r;
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, `${b.c}${b.a})`);
        g.addColorStop(1, `${b.c}0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const p of dust) {
        p.tw += p.ts * (1 + inten * 1.6);
        const twinkle = 0.55 + 0.45 * Math.sin(p.tw);
        p.y -= p.vy * (0.5 + inten * 1.4);
        p.x += p.vx + Math.sin(p.tw * 0.7) * 0.15;
        if (p.y < -6) {
          p.y = h + 6;
          p.x = Math.random() * w;
        }
        if (p.x < -6) p.x = w + 6;
        if (p.x > w + 6) p.x = -6;

        // gentle stir near the pointer
        if (interactive) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 9000) {
            const d = Math.sqrt(d2) || 1;
            p.x += (dx / d) * 0.6;
            p.y += (dy / d) * 0.6;
          }
        }

        ctx.fillStyle = `${p.c}${(p.a * twinkle).toFixed(3)})`;
        ctx.shadowColor = `${p.c}0.9)`;
        ctx.shadowBlur = 6 + inten * 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener('resize', resize);
    if (interactive) {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerleave', onLeave);
    }

    if (reduced) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Live-update intensity without reseeding.
  useEffect(() => {
    // intensity flows through the ref inside the loop; reseeding happens
    // only on resize. Nothing to do here.
  }, [intensity]);

  return <canvas ref={canvasRef} className={`particle-canvas ${className}`} aria-hidden="true" />;
}
