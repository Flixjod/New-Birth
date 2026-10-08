/**
 * New-Birth · theme — palette, fonts, story order.
 * The visual identity lives here; scenes read it through CSS variables.
 */

export const theme = {
  colors: {
    bg: '#07040f',
    bg2: '#0d0718',
    bg3: '#150b28',
    violetDeep: '#2a1650',
    violet: '#7c3aed',
    royal: '#8b5cf6',
    lavender: '#a78bfa',
    lilac: '#c4b5fd',
    pink: '#f0abfc',
    pinkSoft: '#f5d0fe',
    white: '#f5f3ff',
  },
  fonts: {
    display: "'Cormorant Garamond', 'Times New Roman', serif",
    script: "'Great Vibes', 'Snell Roundhand', cursive",
    hand: "'Caveat', 'Segoe Script', cursive",
    ui: "'Inter', -apple-system, 'Segoe UI', sans-serif",
  },
  // The story, in order. experienceFlow.js maps these ids to scene components.
  scenes: [
    'intro',
    'mystery',
    'countdown',
    'midnight',
    'memory-world',
    'sketchbook',
    'scrapbook',
    'gallery',
    'personal-message',
    'appreciation',
    'surprise',
    'phone-message',
    'cake',
    'final-letter',
    'ending',
  ],
};
