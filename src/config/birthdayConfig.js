/**
 * ═══════════════════════════════════════════════════════════════════
 *  New-Birth — personal configuration
 * ───────────────────────────────────────────────────────────────────
 *  EVERYTHING personal lives here. Change the name, the birthday date,
 *  the photos, the notes and the messages — the whole experience
 *  reshapes itself around whatever you put in this file.
 * ═══════════════════════════════════════════════════════════════════
 */

export const birthdayConfig = {
  // ── The star of the show ─────────────────────────────────────────
  name: 'Aadya',

  // ── Birthday: YYYY-MM-DD. The countdown targets 00:00 on this date
  //    in the timezone below — accurate no matter where the visitor is.
  birthday: '2027-06-13',
  timezone: 'Asia/Kolkata',

  // ── Opening lines (shown one after another on the dark screen) ───
  introLines: ['I made something for you…', 'You just have to discover it.'],

  // ── Personal message chapter ─────────────────────────────────────
  messageIntro: ['Today isn’t just another day…', 'It’s the day the world got a little brighter.'],
  message: `Some people walk into your life quietly and rearrange everything
without even trying. You are that person — the laugh in the middle of
an ordinary Tuesday, the calm in every storm, the reason small moments
feel like memories worth keeping.

Today we celebrate you: your heart, your courage, your ridiculous
kindness, and every dream you haven’t told anyone about yet.
May this year hand you everything you’ve been quietly hoping for —
and a few beautiful surprises you never saw coming.

Happy birthday. The best chapters are still unwritten.`,

  // ── "A few of a million reasons" appreciation cards ──────────────
  reasons: [
    'Your smile — the one that fixes bad days',
    'Your kindness, given without keeping score',
    'The way you make ordinary moments feel special',
    'Your courage to keep going, beautifully',
    'How deeply you love the people around you',
    'The way you believe in others before they believe in themselves',
  ],

  // ── Scrapbook memories (draggable polaroid cards) ────────────────
  //    Drop your own photos into public/images/ and update the paths.
  memories: [
    {
      image: '/images/photo1.webp',
      date: 'August 2026',
      note: 'City lights, late talks, and you laughing at everything.',
    },
    {
      image: '/images/photo2.webp',
      date: 'July 2026',
      note: 'Golden hour looked better with you in it.',
    },
    {
      image: '/images/photo3.webp',
      date: 'June 2026',
      note: 'One of my favorite evenings — pure magic.',
    },
    {
      image: '/images/photo4.webp',
      date: 'May 2026',
      note: 'Under the same sky, dreaming out loud.',
    },
  ],

  // ── Handwritten notes scattered around the scrapbook ─────────────
  notes: [
    { text: 'Remember this?', hidden: false },
    { text: 'One of my favorite days.', hidden: false },
    { text: 'You looked so happy here.', hidden: false },
    { text: 'This moment deserves to stay forever.', hidden: true }, // hidden behind a card — drag to find it
    { text: 'More where this came from…', hidden: false },
  ],

  // ── A sealed note on the scrapbook — tap to open ─────────────────
  sealedNote: {
    front: 'psst… tap me ✦',
    inside: 'I hid this here because some feelings deserve a little treasure hunt. You found it. That’s very you.',
  },

  // ── "OPEN ME" surprise chapter ───────────────────────────────────
  surprise: {
    buttonLabel: 'OPEN ME ✦',
    title: 'A little surprise',
    message:
      'Close your eyes for one second and make a wish. I already wished for you — for laughter that never runs out, for dreams that chase you back, and for a year that loves you as much as I do.',
    image: '/images/photo3.webp',
  },

  // ── Final letter chapter ─────────────────────────────────────────
  letter: {
    teaser: 'One last thing…',
    buttonLabel: 'OPEN YOUR SURPRISE ✦',
    greeting: 'My dearest,',
    body: `If you’re reading this, it means the night went exactly as planned —
you, glowing, surrounded by people who adore you.

I wanted to give you something that wouldn’t fit in a box: a reminder
of how deeply you are loved, how brightly you shine, and how grateful
I am that our stories crossed.

Whatever this next year brings, I’ll be cheering the loudest.
Now go make a wish — the stars are listening tonight.`,
    signoff: 'With all my heart,',
    closingTitle: 'HAPPY BIRTHDAY',
    closingLine: 'Here’s to another beautiful chapter.',
    madeWith: 'Made with ♥ just for you',
  },

  // ── Background music ─────────────────────────────────────────────
  //    Drop your track at public/audio/birthday.mp3 and set enabled: true.
  audio: {
    enabled: false,
    src: '/audio/birthday.mp3',
    volume: 0.35,
  },

  // ── Cake / wish chapter ──────────────────────────────────────────
  wish: {
    prompt: 'Make a wish…',
    holdLabel: 'hold to blow out the candles',
    wishedText: '✦ wish sent to the stars ✦',
  },
};
