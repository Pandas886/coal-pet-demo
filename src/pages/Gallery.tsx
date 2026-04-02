import React, { useState, useMemo } from 'react';
import { bases, faces, props, seedRandom } from '../logic/galleryData';
import './Gallery.css';

interface GalleryProps {
  onBack: () => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onBack }) => {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const totalCandidates = 120;

  const candidates = useMemo(() => {
    const list = [];
    for (let i = 0; i < totalCandidates; i++) {
      let base = bases[Math.floor(seedRandom(i * 13) * bases.length)];
      let face = faces[Math.floor(seedRandom(i * 17) * faces.length)];
      let prop = props[Math.floor(seedRandom(i * 19) * props.length)];

      // Manual overrides for the first few (to match original behavior)
      if (i === 0) { base = bases[0]; face = faces[6]; prop = props[1]; }
      if (i === 1) { base = bases[5]; face = faces[0]; prop = props[8]; }
      if (i === 2) { base = bases[4]; face = faces[3]; prop = props[5]; }
      if (i === 3) { base = bases[1]; face = faces[4]; prop = props[7]; }
      if (i === 4) { base = bases[6]; face = faces[5]; prop = props[0]; }
      if (i === 5) { base = bases[2]; face = faces[2]; prop = props[6]; }
      if (i === 6) { base = bases[3]; face = faces[1]; prop = props[4]; }

      list.push({ i, base, face, prop });
    }
    return list;
  }, []);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <main className="gallery-shell">
      <header className="gallery-header">
        <button onClick={onBack} className="back-btn">&larr; 返回</button>
        <h1>小煤球宇宙 - 大规模衍生档案库</h1>
        <p>基于您的反馈，脑洞大开地对“黑碳小煤球”基因进行了极度扩增！<br/>现已投入 7 种基座 × 7 种眼睛/面部 × 10 种道具装饰，足足为您拉起了一支包含 <b>120 款随机独立拼装的像素煤球大军</b>！</p>
      </header>

      <section className="gallery-grid">
        {candidates.map(({ i, base, face, prop }) => (
          <article 
            key={i} 
            className={`candidate-card ${selectedIds.has(i) ? 'selected' : ''}`}
            onClick={() => toggleSelect(i)}
          >
            <div className="candidate-preview">
              <svg className="candidate-svg" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <g dangerouslySetInnerHTML={{ __html: base.svg + face.svg + prop.svg }} />
              </svg>
            </div>
            <div className="candidate-info">
              <h2>CM-{String(i + 1).padStart(3, '0')}</h2>
              <p>{base.name} / {prop.name}</p>
              <p style={{ color: '#959da5', fontSize: '0.75rem', marginTop: '4px' }}>[{face.name}]</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};
