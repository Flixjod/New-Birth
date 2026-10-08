/**
 * Cinematic scene transitions — slow push-in with a breath of blur.
 * Used by Experience for the crossfade between story chapters.
 */

export const sceneEnter = {
  hidden: { opacity: 0, scale: 1.04, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
  },
};

export const sceneExit = {
  opacity: 0,
  scale: 0.985,
  filter: 'blur(8px)',
  transition: { duration: 0.7, ease: [0.4, 0, 1, 1] },
};
