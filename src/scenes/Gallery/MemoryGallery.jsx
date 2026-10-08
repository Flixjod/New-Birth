import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import Button from '../../components/UI/Button';
import ParticleField from '../../components/Effects/ParticleField';
import Vignette from '../../components/Effects/Vignette';
import { isMobile } from '../../utils/device';
import PhotoStack from './PhotoStack';
import PhotoRail from './PhotoRail';
import FullscreenMemory from './FullscreenMemory';
import './Gallery.css';

/**
 * MemoryGallery — "PHOTO MEMORIES". A fanned stack teaser up top, a
 * horizontal snap-scroll rail of Polaroids below; tapping a photo opens
 * the fullscreen lightbox. Handles empty / missing memories gracefully.
 */
export default function MemoryGallery({ config, onNext, onPrev }) {
  const reduceMotion = useReducedMotion();
  const mobile = isMobile();
  const memories = config?.memories ?? [];
  const [active, setActive] = useState(null);

  const step = (dir) => {
    setActive((i) => (i + dir + memories.length) % memories.length);
  };

  return (
    <section className="gal-scene">
      <ParticleField count={mobile ? 18 : 40} color="#a78bfa" />
      <Vignette />

      <motion.header
        className="gal-head"
        initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.9, ease: 'easeOut' }}
      >
        <Button variant="ghost" onClick={onPrev} className="gal-back">
          ‹ Back
        </Button>
        <p className="gal-eyebrow">the gallery</p>
        <h2 className="gal-title">PHOTO MEMORIES</h2>
        <p className="gal-sub">every picture holds a little forever</p>
      </motion.header>

      {memories.length > 0 ? (
        <>
          <PhotoStack memories={memories} onOpen={setActive} reduceMotion={reduceMotion} />
          <PhotoRail memories={memories} onOpen={setActive} reduceMotion={reduceMotion} />
        </>
      ) : (
        <div className="gal-empty">
          <div className="gal-empty-frame" aria-hidden="true" />
          <p className="gal-empty-text">more memories are on their way…</p>
        </div>
      )}

      <footer className="gal-foot">
        <Button variant="primary" onClick={onNext} className="gal-continue">
          Continue
        </Button>
      </footer>

      <AnimatePresence>
        {active !== null && memories[active] && (
          <FullscreenMemory
            memory={memories[active]}
            index={active}
            total={memories.length}
            onClose={() => setActive(null)}
            onStep={step}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
