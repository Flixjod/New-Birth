/**
 * New-Birth · sketchbook — "A little book of us".
 *
 * Page types:
 *   "title"  — { title, subtitle }
 *   "memory" — { date, image, note }
 *   "letter" — { title, text }
 *   "photos" — { images: [..], note }
 *
 * Reorder, add, or remove pages freely — the book reshapes itself.
 */

export const sketchbookPages = [
  {
    type: 'title',
    title: 'A little book of us',
    subtitle: 'for you, on your day ✦',
  },
  {
    type: 'memory',
    date: 'August 2026',
    image: '/images/memories/memory-01.webp',
    note: 'City lights, late talks, and you laughing at everything.',
  },
  {
    type: 'letter',
    title: 'Something I never say enough',
    text: 'You make ordinary moments feel special. Even the quiet ones — especially the quiet ones.',
  },
  {
    type: 'photos',
    images: ['/images/memories/memory-02.webp', '/images/memories/memory-03.webp'],
    note: 'Golden hour, twice.',
  },
  {
    type: 'memory',
    date: 'May 2026',
    image: '/images/memories/memory-04.webp',
    note: 'Under the same sky, dreaming out loud.',
  },
  {
    type: 'letter',
    title: 'A promise',
    text: 'More pages to come. This book is never finished — just like us.',
  },
];
