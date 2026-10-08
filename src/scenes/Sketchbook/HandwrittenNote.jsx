import Doodle from './Doodle';

/**
 * A handwritten note in Caveat, violet ink on paper.
 * Props: text, rotation (deg), underline (show a pencil underline doodle),
 *         className, style.
 */
export default function HandwrittenNote({
  text = '',
  rotation = 1.2,
  underline = false,
  className = '',
  style = {},
}) {
  if (!text) return null;
  return (
    <div className={`skb-note-wrap ${className}`.trim()} style={style}>
      <p className="skb-note" style={{ '--skb-rot': `${rotation}deg` }}>
        {text}
      </p>
      {underline ? <Doodle kind="underline" width={Math.min(220, 60 + text.length * 2.2)} rotate={-1} /> : null}
    </div>
  );
}
