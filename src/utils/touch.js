/** Small touch-event helpers. */

/** Unified pointer position from a touch or mouse event. */
export const touchPoint = (e) => {
  const t = e.touches?.[0] || e.changedTouches?.[0];
  return t ? { x: t.clientX, y: t.clientY } : { x: e.clientX, y: e.clientY };
};
