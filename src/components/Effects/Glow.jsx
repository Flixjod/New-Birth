/** Soft radial glow. Props: color ("r,g,b"), size (px), x, y, opacity. */

export default function Glow({
  color = '139,92,246',
  size = 420,
  x = '50%',
  y = '40%',
  opacity = 0.35,
  className = '',
}) {
  return (
    <div
      aria-hidden="true"
      className={`nb-glow ${className}`}
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        opacity,
        background: `radial-gradient(circle, rgba(${color},0.55) 0%, rgba(${color},0) 70%)`,
      }}
    />
  );
}
