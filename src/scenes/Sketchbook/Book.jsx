import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { pageSettle } from '../../animations/transitions/pageTurn';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import useSwipe from '../../hooks/useSwipe';
import useParallax from '../../hooks/useParallax';
import { isTouch } from '../../utils/device';
import BookPage from './BookPage';
import PageTurn from './PageTurn';
import SketchbookControls from './SketchbookControls';

/**
 * The open book: one journal page at a time, realistic-ish page turns
 * (rotateY, transform-only, no layout thrash).
 * Mobile: swipe + corner taps. Desktop: hover effects + pointer parallax.
 * Props: pages (array), onContinue (final page → onNext of the scene).
 */
export default function Book({ pages, onContinue }) {
  const reducedMotion = useReducedMotion();
  const touch = isTouch();
  const [index, setIndex] = useState(0);
  const [turn, setTurn] = useState(null); // { dir, from, key } while a turn animates
  const swipeRef = useRef(null);
  const parallaxRef = useParallax(0.4);

  const go = useCallback(
    (delta) => {
      if (turn) return;
      const ni = index + delta;
      if (ni < 0 || ni >= pages.length || ni === index) return;
      if (reducedMotion) {
        setIndex(ni);
        return;
      }
      setTurn({ dir: Math.sign(delta), from: index, key: `${index}->${ni}` });
      setIndex(ni);
    },
    [index, pages.length, turn, reducedMotion]
  );

  const goTo = useCallback(
    (i) => {
      if (i !== index) go(i - index);
    },
    [go, index]
  );

  useSwipe(swipeRef, {
    onSwipeLeft: () => go(1),
    onSwipeRight: () => go(-1),
    threshold: 48,
  });

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  const page = pages[index];

  return (
    <div
      className="skb-bookwrap"
      ref={reducedMotion || touch ? undefined : parallaxRef}
    >
      <div ref={swipeRef} className="skb-book">
        {reducedMotion ? (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              className="skb-page-static"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <BookPage
                page={page}
                pageNumber={index + 1}
                totalPages={pages.length}
                onContinue={onContinue}
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            key={index}
            className="skb-page-static"
            variants={pageSettle}
            initial="initial"
            animate="settle"
          >
            <BookPage
              page={page}
              pageNumber={index + 1}
              totalPages={pages.length}
              onContinue={onContinue}
            />
          </motion.div>
        )}

        {turn ? (
          <PageTurn
            key={turn.key}
            page={pages[turn.from]}
            direction={turn.dir}
            onDone={() => setTurn(null)}
          />
        ) : null}

        <button
          type="button"
          className="skb-corner skb-corner-l"
          onClick={() => go(-1)}
          aria-label="Previous page"
        />
        <button
          type="button"
          className="skb-corner skb-corner-r"
          onClick={() => go(1)}
          aria-label="Next page"
        />
      </div>

      <SketchbookControls
        index={index}
        total={pages.length}
        onPrev={() => go(-1)}
        onNext={() => go(1)}
        onGo={goTo}
        disabled={!!turn}
      />
    </div>
  );
}
