const DOODLES = {
  squiggle: {
    vb: '0 0 100 24',
    paths: ['M3 12 Q 14 4, 26 12 T 50 12 T 74 12 T 97 12'],
  },
  underline: {
    vb: '0 0 100 24',
    paths: ['M4 14 C 28 8, 56 20, 96 10'],
  },
  arrow: {
    vb: '0 0 100 60',
    paths: ['M8 52 C 34 48, 62 34, 88 12', 'M74 14 L88 12 L80 26'],
  },
  heart: {
    vb: '0 0 48 44',
    paths: ['M24 40 C 10 30, 4 22, 4 15 C 4 8, 9 4, 15 4 C 19 4, 22 7, 24 10 C 26 7, 29 4, 33 4 C 39 4, 44 8, 44 15 C 44 22, 38 30, 24 40 Z'],
  },
  circle: {
    vb: '0 0 100 60',
    paths: ['M50 8 C 78 8, 94 20, 92 32 C 90 46, 58 54, 30 50 C 10 46, 4 32, 12 20 C 20 8, 52 4, 76 12'],
  },
  stars: {
    vb: '0 0 100 40',
    filled: [
      'M22 6 l1.6 3.8 3.8 1.6 -3.8 1.6 -1.6 3.8 -1.6 -3.8 -3.8 -1.6 3.8 -1.6 z',
      'M62 22 l1.3 3 3 1.3 -3 1.3 -1.3 3 -1.3 -3 -3 -1.3 3 -1.3 z',
      'M86 6 l1 2.4 2.4 1 -2.4 1 -1 2.4 -1 -2.4 -2.4 -1 2.4 -1 z',
    ],
  },
};

/**
 * Pencil-style doodle — hand-drawn SVG strokes, intentionally imperfect.
 * Props: kind ('squiggle' | 'underline' | 'arrow' | 'heart' | 'circle' | 'stars'),
 * color, width (px), rotate (deg), className, style.
 */
export default function Doodle({
  kind = 'squiggle',
  color,
  width = 96,
  rotate = 0,
  className = '',
  style = {},
}) {
  const def = DOODLES[kind] || DOODLES.squiggle;
  const ink = color || 'var(--skb-pencil)';
  return (
    <span
      aria-hidden="true"
      className={`skb-doodle ${className}`.trim()}
      style={{ ...style, '--skb-rot': `${rotate}deg`, width }}
    >
      <svg viewBox={def.vb} width={width} focusable="false" style={{ display: 'block', overflow: 'visible' }}>
        {def.paths &&
          def.paths.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={ink}
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        {def.filled &&
          def.filled.map((d, i) => <path key={i} d={d} fill={ink} />)}
      </svg>
    </span>
  );
}
