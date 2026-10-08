import { useEffect, useRef } from 'react';
import { isMobile } from '../../utils/device';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { rand } from '../../utils/random';

/** Accepts "#rrggbb", "r,g,b", or a small set of color names. */
function toRGB(color) {
  if (/^\d{1,3},\d{1,3},\d{1,3}$/.test(color)) return color;
  const names = {
    violet: '124,58,237',
    royal: '139,92,246',
    lavender: '167,139,250',
    lilac: '196,181,253',
    pink: '240,171,252',
    white: '245,243,255',
  };
  if (names[color]) return names[color];
  const hex = color.replace('#', '');
  if (/^[0-9a-fA-F]{6}$/.test(hex)) {
    const n = parseInt(hex, 16);
    return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
  }
  return '139,92,246';
}

/**
 * Canvas-based drifting particle field.
 * Props: count, color ("#rrggbb", "r,g,b", or name), speed.
 * Auto-degrades on mobile; static when the user prefers reduced motion.
 */
export default function ParticleField({ count = 70, color = '139,92,246', speed = 1, className = '' }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const rgb = toRGB(color);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const n = isMobile() ? Math.min(count, 26) : count;
    const ps = Array.from({ length: n }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: rand(0.6, 2.4),
      vx: rand(-1, 1) * 0.00045 * speed,
      vy: rand(-1, 1) * 0.00045 * speed,
      a: rand(0.15, 0.7),
      tw: rand(0, Math.PI * 2),
    }));

    const resize = () => {
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
    };
    resize();
    window.addEventListener('resize', resize);

    let t = 0;
    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of ps) {
        if (!reduced) {
          p.x = (p.x + p.vx + 1) % 1;
          p.y = (p.y + p.vy + 1) % 1;
        }
        const alpha = p.a * (0.6 + 0.4 * Math.sin(t * 2 + p.tw));
        ctx.beginPath();
        ctx.arc(p.x * canvas.width, p.y * canvas.height, p.r * dpr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${alpha.toFixed(3)})`;
        ctx.fill();
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [count, color, speed, reduced]);

  return <canvas ref={ref} className={`nb-particles ${className}`} aria-hidden="true" />;
}
