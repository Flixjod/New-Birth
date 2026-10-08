/**
 * Pointer parallax offset. px/py in -1..1, depth scales the travel.
 * Returns a transform-only style (compositor-friendly).
 */
export function parallaxStyle(px, py, depth = 1) {
  return {
    transform: `translate3d(${(px * 24 * depth).toFixed(1)}px, ${(py * 24 * depth).toFixed(1)}px, 0)`,
  };
}
