const CORNER_ROTATION = { tl: -38, tr: 38, bl: -135, br: 135 };

/**
 * A strip of washi tape. Positioned over a corner of a photo card.
 * Props: corner ('tl' | 'tr' | 'bl' | 'br'), color ('lavender' | 'pink' | 'gold'),
 * rotate (deg, overrides corner default), className, style.
 */
export default function Tape({ corner = 'tl', color = 'lavender', rotate, className = '', style = {} }) {
  const r = rotate ?? CORNER_ROTATION[corner] ?? -38;
  return (
    <span
      aria-hidden="true"
      className={`skb-tape skb-tape-${corner} skb-tape-${color} ${className}`.trim()}
      style={{ ...style, transform: `rotate(${r}deg)` }}
    />
  );
}
