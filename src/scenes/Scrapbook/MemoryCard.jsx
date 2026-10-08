import { useState } from 'react';

/**
 * MemoryCard — a polaroid: photo on a gradient placeholder (so a missing
 * image still looks intentional), date + handwritten note below.
 */
export default function MemoryCard({ memory }) {
  const [imgOk, setImgOk] = useState(true);
  const text = memory?.note || memory?.caption || '';

  return (
    <figure className="sbk-card">
      <span className="sbk-card-photo">
        {imgOk && memory?.image ? (
          <img
            className="sbk-card-img"
            src={memory.image}
            alt={text || 'a kept memory'}
            draggable={false}
            onError={() => setImgOk(false)}
          />
        ) : null}
      </span>
      <figcaption className="sbk-card-cap">
        {memory?.date ? <span className="sbk-card-date">{memory.date}</span> : null}
        {text ? <span className="sbk-card-note">{text}</span> : null}
      </figcaption>
    </figure>
  );
}
