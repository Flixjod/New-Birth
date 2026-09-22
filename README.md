# New-Birth ✦

A premium, mobile-first **cinematic birthday surprise website** — a personal
digital gift that unfolds like a film:

**Mystery → Countdown → Midnight Reveal → Celebration → Personal Message → Memories → Interactive Scrapbook → Surprise → Final Letter**

Built with React + Vite, styled in a sophisticated midnight-purple palette
with canvas particles, bokeh, glow, glassmorphism and film grain.

---

## ✨ Features

- **Cinematic opening** — dark screen, drifting purple particles, “I made something for you…”
- **Live countdown** to 12:00 AM on the birthday in an explicit IANA timezone
  (`Asia/Kolkata` by default) — accurate regardless of the visitor’s device timezone.
  The atmosphere thickens as midnight approaches; the final 10 seconds take over
  the screen before a dramatic light-bloom reveal of **HAPPY BIRTHDAY + glowing name**.
- **Interactive celebration** — floating balloons, confetti, and a CSS birthday cake:
  hold to blow out the candles and send a wish to the stars.
- **Personal message** with progressive word-by-word reveals + appreciation cards.
- **Draggable memory scrapbook** — polaroid cards you can pick up and move
  (touch + mouse), handwritten notes, hidden notes tucked behind photos,
  and a sealed note to tap open.
- **Cinematic gallery** — horizontal swipe; photos resolve blurred → sharp with
  caption reveals and a soft purple glow.
- **“OPEN ME ✦” surprise** — the world dims, an envelope blooms open.
- **Final letter** — unfolding letter, glowing closing, share + replay.
- **Extras** — optional background music with floating toggle, Web Share API,
  replay-the-night button, desktop parallax touches, touch-reactive particles,
  `prefers-reduced-motion` support, lazy-loaded images.
- **One config file** — every name, date, photo, note and message lives in
  `src/config/birthdayConfig.js`.

---

## 🚀 Quick start

```bash
npm install
npm run dev      # → http://localhost:5173
npm run build    # → dist/
```

## 🎨 Make it yours

Everything personal lives in **`src/config/birthdayConfig.js`**:

```js
export const birthdayConfig = {
  name: 'Aarohi',                 // the glowing name
  birthday: '2026-09-01',         // YYYY-MM-DD — countdown targets 00:00
  timezone: 'Asia/Kolkata',       // explicit IANA timezone
  message: '...',                // your personal message
  memories: [                    // scrapbook + gallery photos
    { image: '/images/photo1.webp', date: 'August 2026', note: '...' },
  ],
  reasons: ['...'],               // appreciation cards
  audio: { enabled: false, src: '/audio/birthday.mp3', volume: 0.35 },
};
```

1. **Photos** — drop your `.webp`/`.jpg` files into `public/images/`
   (WebP/AVIF recommended) and update the `image` paths.
2. **Music** — drop your track at `public/audio/birthday.mp3` and set
   `audio.enabled: true`. Music starts on the ENTER tap (mobile autoplay rules).
3. **Copy** — rewrite every note, message, surprise and the letter in your own words.

> Tip: if the birthday date is in the past, the countdown shows “It’s time ✦”
> and flows straight into the reveal — handy for testing.

---

## 🐳 Docker

```bash
docker compose up --build     # → http://localhost:8080
```

The multi-stage `Dockerfile` builds the Vite app with Node 20 and serves the
static output with nginx (SPA fallback, gzip, immutable asset caching).

## ☁️ Deploy on Koyeb

1. Push this repo to GitHub as **`New-Birth`**.
2. In [Koyeb](https://app.koyeb.com), create a new **Service → from GitHub**,
   select the repo.
3. Builder: **Dockerfile** (default — Koyeb detects it automatically).
4. Port: **80** (HTTP). Health checks: default TCP check on port 80 works.
5. Deploy — you’ll get a `*.koyeb.app` URL. Point a custom domain at it in
   *Service → Domains* if you like.

No environment variables or secrets are required.

## 🌐 Other static hosts

`npm run build` produces a static `dist/` folder — deploy it anywhere
(Netlify, Vercel, Cloudflare Pages, GitHub Pages). No server code involved.

---

## 📁 Project structure

```
New-Birth/
├── public/
│   ├── images/            # your memory photos (placeholders included)
│   └── audio/             # birthday.mp3 goes here (optional)
├── src/
│   ├── components/        # Intro, Countdown, Reveal, Celebration, Message,
│   │                      # Scrapbook, Gallery, Surprise, FinalLetter, …
│   ├── animations/        # (animation helpers live beside components)
│   ├── config/            # ★ birthdayConfig.js — everything personal
│   ├── hooks/             # useCountdown, useInView, useReducedMotion
│   ├── utils/             # timezone-accurate countdown math
│   └── styles/            # cinematic purple theme, mobile-first
├── Dockerfile             # multi-stage build → nginx
├── nginx.conf
├── docker-compose.yml
└── README.md
```

## 📱 Mobile notes

- Designed mobile-first: `100dvh`, safe-area insets, `touch-action` handling,
  no horizontal scrolling, reduced particle counts on small screens.
- Tested targets: iPhone Safari, Android Chrome, tablets, desktop.

---

Made with ♥ — now go make someone’s midnight unforgettable.
