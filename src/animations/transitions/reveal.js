/** Text + letter reveal variants. `lineReveal.show` takes the line index as custom. */

export const lineReveal = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.55, duration: 1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const letterPaper = {
  hidden: { opacity: 0, y: 60, rotateX: 8 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
  },
};
