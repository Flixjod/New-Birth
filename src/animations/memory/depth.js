/**
 * Depth styling for the memory world.
 * `z` in px: 0 = near, -600 = far. Returns opacity + blur + brightness
 * so distant photos melt into the dark. transform is handled by the scene.
 */
export function depthStyle(z) {
  const farness = Math.max(0, Math.min(1, -z / 600));
  return {
    opacity: 1 - farness * 0.55,
    filter: `blur(${(farness * 6).toFixed(1)}px) brightness(${(1 - farness * 0.45).toFixed(2)})`,
  };
}
