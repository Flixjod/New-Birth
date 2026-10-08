/** Gentle infinite float for memory-world photos. */

export const floatLoop = (delay = 0, distance = 14) => ({
  animate: {
    y: [0, -distance, 0],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay },
  },
});
