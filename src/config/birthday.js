/**
 * ═══════════════════════════════════════════════════════════════════
 *  New-Birth — personal configuration
 * ───────────────────────────────────────────────────────────────────
 *  THIS IS THE ONLY FILE YOU NEED TO EDIT.
 *  Change the name, the birthday, the photos, the notes and the
 *  messages — the whole experience reshapes itself around whatever
 *  you put here. Everything below imports from the section modules
 *  in this folder, so the story stays organized as it grows.
 * ═══════════════════════════════════════════════════════════════════
 */

import { theme } from './theme';
import { memories, notes, sealedNote } from './memories';
import { introLines, messageIntro, message, letter } from './messages';
import { sketchbookPages } from './sketchbook';
import { loveMessage } from './phoneMessages';

export const birthdayConfig = {
  // ── The star of the show ─────────────────────────────────────────
  name: 'Aarohi',

  // ── Birthday: YYYY-MM-DD. The countdown targets 00:00 on this date
  //    in the timezone below — accurate no matter where the visitor is.
  birthday: '2026-09-01',
  timezone: 'Asia/Kolkata',

  // ── Story text ───────────────────────────────────────────────────
  introLines,
  messageIntro,
  message,
  letter,

  // ── "Things I love about you" cards ──────────────────────────────
  reasons: [
    'Your smile — the one that fixes bad days',
    'Your kindness, given without keeping score',
    'The way you make ordinary moments feel special',
    'Your courage to keep going, beautifully',
    'How deeply you love the people around you',
    'The way you believe in others before they believe in themselves',
  ],

  // ── Photos, notes, sketchbook, phone story ───────────────────────
  memories,
  notes,
  sealedNote,
  sketchbook: sketchbookPages,
  phoneMessages: loveMessage,

  // ── "OPEN ME" surprise chapter ───────────────────────────────────
  surprise: {
    buttonLabel: 'OPEN ME ✦',
    title: 'A little surprise',
    message:
      'Close your eyes for one second and make a wish. I already wished for you — for laughter that never runs out, for dreams that chase you back, and for a year that loves you as much as I do.',
    image: '/images/memories/memory-03.webp',
  },

  // ── Cake / wish chapter ──────────────────────────────────────────
  wish: {
    prompt: 'Make a wish…',
    holdLabel: 'hold to blow out the candles',
    wishedText: '✦ wish sent to the stars ✦',
  },

  // ── Background music ─────────────────────────────────────────────
  //    Drop your tracks into public/audio/ and set enabled: true.
  //    Music starts on the visitor's first tap (mobile autoplay rules).
  audio: {
    enabled: false,
    volume: 0.35,
    src: '/audio/birthday.mp3',
    tracks: {
      main: '/audio/birthday.mp3', // looped through the story
      midnight: '/audio/midnight.mp3', // one-shot at the reveal
      message: '/audio/message.mp3', // one-shot at the phone scene
    },
  },

  // ── Visual identity (rarely needs editing) ───────────────────────
  theme,
};

export default birthdayConfig;
