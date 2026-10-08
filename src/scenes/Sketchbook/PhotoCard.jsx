import Tape from './Tape';

/**
 * A taped-down photo card with an intentionally uneven rotation.
 * Every <img> sits on a gradient placeholder and hides itself on error,
 * so the card still looks deliberate with no photo.
 * Props: src, alt, rotation (deg), caption, tapes (corner list), wide,
 *         tapeColor, className, style.
 */
export default function PhotoCard({
  src,
  alt = '',
  rotation = -2,
  caption = '',
  tapes = ['tl', 'tr'],
  wide = false,
  tapeColor = 'lavender',
  className = '',
  style = {},
}) {
  return (
    <figure
      className={`skb-photo ${className}`.trim()}
      style={{ ...style, '--skb-rot': `${rotation}deg` }}
    >
      <div className={`skb-photo-frame${wide ? ' skb-photo-frame--wide' : ''}`}>
        <div className="skb-photo-fallback" aria-hidden="true">
          <svg viewBox="0 0 48 48" focusable="false">
            <g fill="none" stroke="#c4b5fd" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
              <circle cx={24} cy={17} r={6} />
              <path d="M6 38 L18 26 L28 34 L36 28 L44 36" />
            </g>
          </svg>
        </div>
        {src ? (
          <img
            className="skb-photo-img"
            src={src}
            alt={alt}
            loading="lazy"
            draggable={false}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : null}
        {tapes.map((corner) => (
          <Tape key={corner} corner={corner} color={tapeColor} />
        ))}
      </div>
      {caption ? <figcaption className="skb-photo-cap">{caption}</figcaption> : null}
    </figure>
  );
}
