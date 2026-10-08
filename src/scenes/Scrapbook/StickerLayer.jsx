import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import useParallax from '../../hooks/useParallax';
import { isMobile } from '../../utils/device';
import { rand, randInt, pick } from '../../utils/random';
import { floatLoop } from '../../animations/memory/floating';

const PATHS = {
  star: 'M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z',
  heart:
    'M12 21C7 16.5 3 13 3 8.8 3 6 5.2 4 7.8 4c1.7 0 3.2.9 4.2 2.3C13 4.9 14.5 4 16.2 4 18.8 4 21 6 21 8.8c0 4.2-4 7.7-9 12.2z',
  sparkle:
    'M12 1c.8 5.2 2.6 7 7.8 7.8-5.2.8-7 2.6-7.8 7.8-.8-5.2-2.6-7-7.8-7.8 5.2-.8 7-2.6 7.8-7.8z',
};

const COLORS = ['#a78bfa', '#c4b5fd', '#f0abfc', '#8b5cf6'];

/**
 * StickerLayer — decorative SVG stars / hearts / sparkles scattered over
 * the board. Pure shapes (no emojis), gently floating, parallaxed.
 */
export default function StickerLayer() {
  const reduceMotion = useReducedMotion();
  const mobile = isMobile();
  const parallaxRef = useParallax(mobile ? 6 : 12);

  const stickers = useMemo(() => {
    const count = mobile ? 10 : 18;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      type: pick(['star', 'heart', 'sparkle']),
      left: `${rand(2, 94)}%`,
      top: `${rand(4, 94)}%`,
      size: randInt(10, 26),
      color: pick(COLORS),
      opacity: rand(0.22, 0.55),
      rotate: randInt(0, 360),
      delay: rand(0, 4),
    }));
  }, [mobile]);

  return (
    <div className="sbk-stickers" ref={parallaxRef} aria-hidden="true">
      {stickers.map((s) => (
        <motion.span
          key={s.id}
          className="sbk-sticker"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            color: s.color,
            opacity: s.opacity,
            rotate: s.rotate,
          }}
          animate={reduceMotion ? undefined : floatLoop(s.delay)}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d={PATHS[s.type]} />
          </svg>
        </motion.span>
      ))}
    </div>
  );
}
