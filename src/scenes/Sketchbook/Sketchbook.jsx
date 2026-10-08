import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import useParallax from '../../hooks/useParallax';
import { isMobile, isTouch } from '../../utils/device';
import { preloadImages } from '../../utils/preloadImages';
import Button from '../../components/UI/Button';
import ParticleField from '../../components/Effects/ParticleField';
import Vignette from '../../components/Effects/Vignette';
import Grain from '../../components/Effects/Grain';
import Bokeh from '../../components/Effects/Bokeh';
import Book from './Book';
import Sticker from './Sticker';
import './Sketchbook.css';

const PAGE_TYPES = ['title', 'memory', 'letter', 'photos'];

// Graceful fallback when config.sketchbook is missing or empty.
// Generic scene copy only — never personal text.
const FALLBACK_PAGES = [
  {
    type: 'title',
    title: 'a little book of us',
    text: 'every story deserves a keepsake',
  },
  {
    type: 'memory',
    note: 'This page is still blank — the loveliest stories take a little time to write.',
  },
  { type: 'end' },
];

function normalizePages(config) {
  const raw = config && Array.isArray(config.sketchbook) ? config.sketchbook : [];
  const pages = raw
    .filter((p) => p && typeof p === 'object')
    .map((p) => ({
      type: PAGE_TYPES.includes(p.type) ? p.type : 'memory',
      date: typeof p.date === 'string' ? p.date : '',
      image: typeof p.image === 'string' ? p.image : '',
      images: Array.isArray(p.images) ? p.images.filter((u) => typeof u === 'string') : [],
      note: typeof p.note === 'string' ? p.note : '',
      title: typeof p.title === 'string' ? p.title : '',
      text: typeof p.text === 'string' ? p.text : '',
    }))
    .filter((p) => p.title || p.text || p.note || p.image || p.images.length);
  if (!pages.length) return FALLBACK_PAGES;
  return [...pages, { type: 'end' }];
}

function collectImageUrls(pages) {
  const urls = [];
  pages.forEach((p) => {
    if (p.image) urls.push(p.image);
    if (Array.isArray(p.images)) urls.push(...p.images);
  });
  return urls;
}

/**
 * ★ Sketchbook scene — "A LITTLE BOOK OF US".
 * A closed book floats on midnight violet; tapping OPEN reveals a journal
 * whose pages turn with realistic-ish rotateY page turns.
 * Props: config (full birthday config), onNext, onPrev.
 */
export default function Sketchbook({ config, onNext, onPrev }) {
  const reducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const coverParallaxRef = useParallax(0.5);
  const touch = isTouch();
  const mobile = isMobile();

  const pages = useMemo(() => normalizePages(config), [config]);
  const name = config && typeof config.name === 'string' ? config.name : '';

  useEffect(() => {
    const urls = collectImageUrls(pages);
    if (urls.length) preloadImages(urls).catch(() => {});
  }, [pages]);

  const phaseTransition = reducedMotion
    ? { duration: 0.01 }
    : { duration: 0.7, ease: [0.22, 1, 0.36, 1] };

  return (
    <section className="skb-scene" aria-label="A little book of us">
      <div className="skb-bg" aria-hidden="true">
        <Vignette />
        <Bokeh />
        <Grain />
        <ParticleField count={mobile || touch ? 22 : 48} color="#a78bfa" />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {!open ? (
          <motion.div
            key="closed"
            className="skb-closed"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04, filter: 'blur(6px)' }}
            transition={phaseTransition}
          >
            <Button variant="ghost" onClick={onPrev} className="skb-back">
              ‹ Back
            </Button>

            <div
              className="skb-book3d"
              ref={reducedMotion || touch ? undefined : coverParallaxRef}
            >
              <div className="skb-glow" />
              <div className="skb-closed-book">
                <div className="skb-cover-back" />
                <div className="skb-spine" />
                <div className="skb-pages-edge" />
                <div className="skb-cover-front">
                  <div className="skb-cover-copy">
                    <p className="skb-cover-kicker">a little book of</p>
                    <h1 className="skb-cover-title">US</h1>
                    <span className="skb-cover-rule" />
                    {name ? <p className="skb-cover-name">for {name}</p> : null}
                  </div>
                  <span className="skb-cover-sticker">
                    <Sticker kind="sparkle" color="#f0abfc" size={40} rotate={14} />
                  </span>
                </div>
              </div>
            </div>

            <p className="skb-open-hint">some pages are too precious to scroll past</p>
            <Button variant="primary" onClick={() => setOpen(true)}>
              OPEN ✦
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="open"
            className="skb-open"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={phaseTransition}
          >
            <Book pages={pages} onContinue={onNext} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
