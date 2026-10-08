const STICKERS = {
  star: {
    vb: '0 0 24 24',
    fill: 'M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z',
  },
  heart: {
    vb: '0 0 24 24',
    fill: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
  },
  sparkle: {
    vb: '0 0 24 24',
    fill: 'M12 2c.6 4.9 2.7 7 7.6 7.6-4.9.6-7 2.7-7.6 7.6-.6-4.9-2.7-7-7.6-7.6 4.9-.6 7-2.7 7.6-7.6zM19 14.5c.3 2.4 1.3 3.4 3.7 3.7-2.4.3-3.4 1.3-3.7 3.7-.3-2.4-1.3-3.4-3.7-3.7 2.4-.3 3.4-1.3 3.7-3.7z',
  },
  arrow: {
    vb: '0 0 48 32',
    stroke: ['M4 16 H40', 'M31 7 L41 16 L31 25'],
  },
};

/**
 * Small decorative sticker — pure SVG shapes (star, heart, sparkle, arrow).
 * Never emojis. Props: kind, color, size (px), rotate (deg), className, style.
 */
export default function Sticker({
  kind = 'star',
  color = '#f0abfc',
  size = 40,
  rotate = 0,
  className = '',
  style = {},
}) {
  const def = STICKERS[kind] || STICKERS.star;
  return (
    <span
      aria-hidden="true"
      className={`skb-sticker ${className}`.trim()}
      style={{ ...style, '--skb-rot': `${rotate}deg`, width: size, height: size }}
    >
      <svg viewBox={def.vb} width={size} height={size} focusable="false">
        {def.fill && <path d={def.fill} fill={color} />}
        {def.stroke &&
          def.stroke.map((d, i) => (
            <path key={i} d={d} fill="none" stroke={color} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
          ))}
      </svg>
    </span>
  );
}
