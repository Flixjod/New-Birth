/**
 * New-Birth · memories — the photographs of the story.
 *
 * Drop your photos into public/images/memories/ (webp works best) and
 * update the paths below. Every scene that shows photos reads this file.
 */

export const memories = [
  {
    image: '/images/memories/memory-01.webp',
    date: 'August 2026',
    note: 'City lights, late talks, and you laughing at everything.',
    caption: 'One of my favorite moments.',
  },
  {
    image: '/images/memories/memory-02.webp',
    date: 'July 2026',
    note: 'Golden hour looked better with you in it.',
    caption: 'Golden hour, but make it you.',
  },
  {
    image: '/images/memories/memory-03.webp',
    date: 'June 2026',
    note: 'One of my favorite evenings — pure magic.',
    caption: 'Pure magic.',
  },
  {
    image: '/images/memories/memory-04.webp',
    date: 'May 2026',
    note: 'Under the same sky, dreaming out loud.',
    caption: 'Dreaming out loud.',
  },
];

/** Handwritten notes scattered around the scrapbook. */
export const notes = [
  { text: 'Remember this?', hidden: false },
  { text: 'One of my favorite days.', hidden: false },
  { text: 'You looked so happy here.', hidden: false },
  { text: 'This moment deserves to stay forever.', hidden: true }, // hidden behind a card — drag to find it
  { text: 'More where this came from…', hidden: false },
];

/** A sealed note on the scrapbook — tap to open. */
export const sealedNote = {
  front: 'psst… tap me ✦',
  inside:
    'I hid this here because some feelings deserve a little treasure hunt. You found it. That’s very you.',
};
