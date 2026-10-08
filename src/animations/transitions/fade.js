/** Shared fade transitions (framer-motion variants). */

export const cinematicTransition = { duration: 0.9, ease: [0.22, 1, 0.36, 1] };

export const fade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: cinematicTransition },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: cinematicTransition },
};

export const fadeScale = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: cinematicTransition },
};
