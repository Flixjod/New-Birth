import Button from '../../components/UI/Button';
import PhotoCard from './PhotoCard';
import HandwrittenNote from './HandwrittenNote';
import Sticker from './Sticker';
import Doodle from './Doodle';

const COLLAGE_ROTATIONS = [-3, 2.4, -1.8];
const COLLAGE_TAPES = [['tl', 'br'], ['tr', 'bl'], ['tl', 'tr']];
const COLLAGE_TAPE_COLORS = ['lavender', 'pink', 'gold'];

function PageHead({ date, pageNumber, totalPages }) {
  return (
    <div className="skb-page-head">
      <span className="skb-date">{date || ''}</span>
      <span className="skb-folio">
        {pageNumber} / {totalPages}
      </span>
    </div>
  );
}

function TitlePage({ page }) {
  return (
    <div className="skb-titlepage">
      <span className="skb-deco" style={{ top: '6%', right: '10%' }}>
        <Sticker kind="sparkle" color="#c4b5fd" size={44} rotate={12} />
      </span>
      <span className="skb-deco" style={{ bottom: '10%', left: '8%' }}>
        <Sticker kind="star" color="#f0abfc" size={34} rotate={-14} />
      </span>
      {page.date ? <span className="skb-date">{page.date}</span> : null}
      {page.title ? <h2 className="skb-titlepage-title">{page.title}</h2> : null}
      {page.title ? <span className="skb-titlepage-rule" /> : null}
      {page.text ? <p className="skb-titlepage-sub">{page.text}</p> : null}
      <Doodle kind="squiggle" width={120} rotate={-2} />
    </div>
  );
}

function MemoryPage({ page }) {
  return (
    <div className="skb-memory">
      <span className="skb-deco" style={{ top: '2%', right: '6%' }}>
        <Doodle kind="stars" width={72} rotate={8} />
      </span>
      <PhotoCard
        src={page.image}
        alt={page.title || 'a memory'}
        rotation={-2.6}
        tapes={['tl', 'tr']}
        tapeColor="lavender"
      />
      {page.title ? (
        <p className="skb-note" style={{ '--skb-rot': '-1deg', fontSize: 19 }}>
          {page.title}
        </p>
      ) : null}
      <HandwrittenNote text={page.note} rotation={1.4} underline />
      <span className="skb-deco" style={{ bottom: '4%', right: '10%' }}>
        <Sticker kind="heart" color="#f0abfc" size={30} rotate={10} />
      </span>
    </div>
  );
}

function LetterPage({ page }) {
  return (
    <div className="skb-letter">
      <HandwrittenNote text={page.text} rotation={-0.6} />
      {page.note ? (
        <div className="skb-letter-ps">
          <HandwrittenNote text={page.note} rotation={1.8} />
        </div>
      ) : null}
      <span className="skb-deco" style={{ bottom: '2%', left: '6%' }}>
        <Sticker kind="heart" color="#c4b5fd" size={36} rotate={-8} />
      </span>
      <span className="skb-deco" style={{ top: '0%', right: '4%' }}>
        <Doodle kind="arrow" width={84} rotate={14} />
      </span>
    </div>
  );
}

function PhotosPage({ page }) {
  const images = Array.isArray(page.images) && page.images.length
    ? page.images.slice(0, 3)
    : page.image
      ? [page.image]
      : [null];
  return (
    <div className="skb-collage">
      {page.title ? <h3 className="skb-collage-title">{page.title}</h3> : null}
      {images.map((src, i) => (
        <PhotoCard
          key={i}
          src={src}
          alt={page.title || `photo ${i + 1}`}
          rotation={COLLAGE_ROTATIONS[i % COLLAGE_ROTATIONS.length]}
          tapes={COLLAGE_TAPES[i % COLLAGE_TAPES.length]}
          tapeColor={COLLAGE_TAPE_COLORS[i % COLLAGE_TAPE_COLORS.length]}
        />
      ))}
      {page.note ? (
        <div className="skb-collage-cap">
          <HandwrittenNote text={page.note} rotation={-1.2} />
        </div>
      ) : null}
      <span className="skb-deco" style={{ top: '4%', right: '8%' }}>
        <Sticker kind="sparkle" color="#f0abfc" size={32} rotate={-10} />
      </span>
    </div>
  );
}

function EndPage({ onContinue, inert }) {
  return (
    <div className="skb-end">
      <span className="skb-deco" style={{ top: '8%', left: '12%' }}>
        <Doodle kind="stars" width={80} rotate={-6} />
      </span>
      <span className="skb-deco" style={{ bottom: '12%', right: '10%' }}>
        <Sticker kind="star" color="#c4b5fd" size={38} rotate={16} />
      </span>
      <Doodle kind="circle" width={110} rotate={4} />
      <p className="skb-end-line">the best pages are still unwritten…</p>
      <p className="skb-end-sub">thank you for flipping through</p>
      {!inert ? (
        <Button variant="primary" onClick={onContinue} className="skb-continue-btn">
          Continue →
        </Button>
      ) : null}
    </div>
  );
}

/**
 * Renders one sketchbook page by type: title | memory | letter | photos | end.
 * All personal text comes from the page object (built from config.sketchbook).
 * Props: page, pageNumber, totalPages, onContinue, inert (static render, no actions).
 */
export default function BookPage({ page, pageNumber = 1, totalPages = 1, onContinue, inert = false }) {
  const p = page || {};
  return (
    <div className="skb-page">
      <div className="skb-page-inner">
        <PageHead date={p.date} pageNumber={pageNumber} totalPages={totalPages} />
        <div className="skb-page-body">
          {p.type === 'title' && <TitlePage page={p} />}
          {p.type === 'memory' && <MemoryPage page={p} />}
          {p.type === 'letter' && <LetterPage page={p} />}
          {p.type === 'photos' && <PhotosPage page={p} />}
          {p.type === 'end' && <EndPage onContinue={onContinue} inert={inert} />}
          {!p.type || !['title', 'memory', 'letter', 'photos', 'end'].includes(p.type) ? (
            <div className="skb-memory">
              <HandwrittenNote text={p.note || p.text} rotation={1} underline />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
