/** Sketchbook page-turn variants (rotateY flip, no layout animation). */

export const pageFlip = {
  front: { rotateY: 0, transition: { duration: 1.1, ease: [0.3, 0.7, 0.3, 1] } },
  back: { rotateY: -180, transition: { duration: 1.1, ease: [0.3, 0.7, 0.3, 1] } },
};

export const pageSettle = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
