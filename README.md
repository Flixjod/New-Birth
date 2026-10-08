# New-Birth ✦

A premium, mobile-first **cinematic birthday surprise website** — a personal
digital gift that unfolds like one continuous film, not a website.

**Intro → Mystery → Countdown → Midnight Reveal → 3D Memory World →
Sketchbook → Scrapbook → Gallery → Personal Message → Things I Love About
You → Hidden Surprise → iPhone Love Message → Cake & Wish → Final Letter →
Ending**

Built with React 18 + Vite + framer-motion. Midnight-violet palette,
canvas particles, bokeh, glow, film grain, light leaks.

---

## The two-minute personalization

**Edit one file: `src/config/birthday.js`.** Everything personal lives
there — name, birthday, messages, reasons, photos, sketchbook pages, the
phone conversation, the final letter, music. The whole experience reshapes
itself around whatever you put in it.

The file imports section modules from `src/config/` so the story stays
organized as it grows:

| Module | What it holds |
|---|---|
| `birthday.js` | **The only file you need to edit.** Name, date, timezone, reasons, surprise, wish, audio |
| `memories.js` | Photos + captions, scrapbook notes, the sealed note |
| `messages.js` | Intro lines, personal message, final letter |
| `sketchbook.js` | "A little book of us" pages (`title` / `memory` / `letter` / `photos`) |
| `phoneMessages.js` | The iPhone conversation (text + natural typing delays) |
| `theme.js` | Palette, fonts, story order |

## Adding your photos

Drop webp files (best quality/size) into `public/images/`:

```
public/images/
├── memories/        ← story photos (memory-01.webp, memory-02.webp, …)
├── sketchbook/      ← book textures, tape, stickers (+ doodles/)
├── phone/           ← phone scene assets (+ message-assets/)
├── decorations/     ← stars, hearts, light-leaks
└── audio/ …         ← see below
```

Then point the config at them. Missing images degrade gracefully — every
scene renders a designed gradient placeholder, so the story never breaks
while you're still gathering photos.

## Music

Drop tracks into `public/audio/` (`birthday.mp3` loops through the story,
`midnight.mp3` fires at the reveal, `message.mp3` at the phone scene) and
set `audio.enabled: true` in `src/config/birthday.js`. Music starts on the
visitor's first tap, per mobile autoplay rules.

## Project structure

```
src/
├── app/            ← App.jsx, Experience.jsx (story controller), experienceFlow.js
├── config/         ← the story's words & pictures (see table above)
├── scenes/         ← one folder per story chapter (Intro … Ending)
├── components/
│   ├── UI/         ← Button, IconButton, ProgressIndicator
│   ├── Effects/    ← ParticleField, Glow, Grain, Bokeh, LightLeak, Vignette
│   └── Audio/      ← AudioManager, MusicToggle, useAudio
├── animations/     ← transitions/, memory/, phone/, scrapbook/ (framer-motion variants)
├── hooks/          ← useCountdown, useSwipe, usePointerDrag, useParallax, …
├── utils/          ← timezone, countdown, device, random, preloadImages, …
└── styles/         ← variables, globals, typography, responsive, safe-area, reduced-motion
```

**The story controller** (`src/app/Experience.jsx`) renders one scene at a
time with cinematic crossfades. Scenes advance themselves via `onNext()`.
To reorder chapters, reorder `src/app/experienceFlow.js`. To add a chapter,
build its scene folder and register it there.

**Animation code lives apart from UI** (`src/animations/`) — scenes stay
readable, motion stays reusable.

## Performance rules (enforced, not suggested)

- The 3D memory world is CSS-3D only (no WebGL lib) and auto-degrades:
  fewer photos, particles, and gentler camera on mobile / low-power devices.
- Animations use `transform` / `opacity` / `filter` exclusively.
- Every scene honors `prefers-reduced-motion`.
- Images are preloaded per chapter; audio files are optional.

## Develop & build

```bash
npm install
npm run dev      # local preview at http://localhost:5173
npm run build    # production build → dist/
```

Docker:

```bash
docker compose up --build   # serves dist/ via nginx
```

## Countdown behavior

The countdown targets **00:00 on the birthday in the configured IANA
timezone** (`Asia/Kolkata` by default), accurate wherever the visitor is.
If the date has already passed, the countdown scene acknowledges it and
offers to continue — the story never dead-ends.
