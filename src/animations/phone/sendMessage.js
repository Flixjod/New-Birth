/** SEND burst: compress → bloom → dissolve into the conversation. */
export const sendBurst = {
  hidden: { opacity: 0, scale: 0.6 },
  show: {
    opacity: [0, 1, 0],
    scale: [0.6, 1.4, 1.8],
    transition: { duration: 0.9, ease: 'easeOut' },
  },
};
