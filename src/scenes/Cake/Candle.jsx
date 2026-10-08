/**
 * Candle — a CSS-drawn candle with a flickering flame.
 * Flame animation is transform/opacity/filter only. When `lit`
 * becomes false the flame dies and a smoke wisp rises (opacity +
 * translateY via CSS keyframes).
 */
export default function Candle({ lit = true, reduced = false, index = 0 }) {
  return (
    <div className="cake-candle" style={{ '--i': index }} aria-hidden="true">
      {lit ? (
        <div className={`cake-flame ${reduced ? 'cake-flame-still' : ''}`}>
          <span className="cake-flame-glow" />
          <span className="cake-flame-core" />
        </div>
      ) : (
        <div className="cake-smoke-wrap">
          <span className={`cake-smoke ${reduced ? 'cake-smoke-still' : ''}`} />
        </div>
      )}
      <span className="cake-wick" />
      <span className="cake-stick" />
    </div>
  );
}
