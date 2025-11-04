// import React, { useState } from 'react';
// import './gallery.css';

// const allImages = [
//   { src: '/images/event1.jpg', category: 'Petreceri', alt: 'Petrecere Neon Time' },
//   { src: '/images/event2.jpg', category: 'Petreceri', alt: 'Petrecere Neon Time' },
//   { src: '/images/event3.jpg', category: 'Decoruri', alt: 'Decor Neon Time' },
//   { src: '/images/event4.jpg', category: 'Tematice', alt: 'Eveniment Tematic' },
//   { src: '/images/event5.jpg', category: 'Decoruri', alt: 'Decor Neon Time' },
//   { src: '/images/event6.jpg', category: 'Tematice', alt: 'Eveniment Tematic' },

// ]

// const categories = ['Toate', 'Petreceri', 'Decoruri', 'Tematice'];

// const neonColors = {
//   Petreceri: '#ff3c78',
//   Decoruri:  '#00e5ff',
//   Tematice:  '#00ff9d',
//   Toate:     '#ffff00'
// };

// export default function Galerie() {
//   const [filter, setFilter] = useState('Toate');
//   const [lightboxOpen, setLightboxOpen] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const filteredImages = filter === 'Toate'
//     ? allImages
//     : allImages.filter(img => img.category === filter);

//   const openLightbox = (index) => {
//     setCurrentIndex(index);
//     setLightboxOpen(true);
//   };

//   const closeLightbox = () => setLightboxOpen(false);

//   const prevImage = () => setCurrentIndex((currentIndex - 1 + filteredImages.length) % filteredImages.length);
//   const nextImage = () => setCurrentIndex((currentIndex + 1) % filteredImages.length);

//   return (
//     <section className="galerie-container">
//       <h2>Galerie Neon Time</h2>

//       <div className="galerie-filters">
//         {categories.map(cat => (
//           <button
//             key={cat}
//             className={filter === cat ? 'filter-btn active' : 'filter-btn'}
//             style={{ borderColor: neonColors[cat], color: neonColors[cat] }}
//             onClick={() => setFilter(cat)}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       <div className="galerie-masonry">
//         {filteredImages.map((img, index) => (
//           <div
//             key={index}
//             className="galerie-card"
//             style={{ borderColor: neonColors[img.category] }}
//             onClick={() => openLightbox(index)}
//           >
//             <img src={img.src} alt={img.alt} loading="lazy" />
//           </div>
//         ))}
//       </div>

// {lightboxOpen && (
//   <div className="lightbox" onClick={closeLightbox}>
//     {/* X-ul de închidere */}
//     <span className="close" onClick={(e) => { e.stopPropagation(); closeLightbox(); }}>&times;</span>

//     <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
//       <button className="prev" onClick={prevImage}>❮</button>
//       <img src={filteredImages[currentIndex].src} alt={filteredImages[currentIndex].alt} />
//       <button className="next" onClick={nextImage}>❯</button>
//     </div>
//   </div>
// )}

//     </section>
//   );
// }

import React, { useState, useRef } from 'react';
import './gallery.css';

const allImages = [
  { src: '/images/galerie/1.jpg'  , category: 'Petreceri' },
  { src: '/images/galerie/2.jpg'  , category: 'Petreceri' },
  { src: '/images/galerie/3.jpg'  , category: 'Decoruri'  },
  { src: '/images/galerie/4.jpg'  , category: 'Tematice'  },
  { src: '/images/galerie/5.jpg'  , category: 'Decoruri'  },
  { src: '/images/galerie/6.jpg'  , category: 'Tematice'  },
  { src: '/images/galerie/7.jpg'  , category: 'Petreceri' },
  { src: '/images/galerie/8.jpg'  , category: 'Petreceri' },
  { src: '/images/galerie/9.jpg'  , category: 'Decoruri'  },
  { src: '/images/galerie/10.jpg' , category: 'Tematice'  },
  { src: '/images/galerie/11.jpg' , category: 'Decoruri'  },
  { src: '/images/galerie/12.jpg' , category: 'Tematice'  },
  { src: '/images/galerie/13.jpg' , category: 'Petreceri' },
  { src: '/images/galerie/14.jpg' , category: 'Petreceri' },
  { src: '/images/galerie/15.jpg' , category: 'Decoruri'  },
  { src: '/images/galerie/16.jpg' , category: 'Tematice'  },
  { src: '/images/galerie/17.jpg' , category: 'Decoruri'  },
  { src: '/images/galerie/18.jpg' , category: 'Tematice'  },
  { src: '/images/galerie/19.jpg' , category: 'Decoruri'  },
  { src: '/images/galerie/20.jpg' , category: 'Tematice'  },
  { src: '/images/galerie/21.jpg'  , category: 'Petreceri' },
  { src: '/images/galerie/22.jpg'  , category: 'Petreceri' },
  { src: '/images/galerie/23.jpg'  , category: 'Decoruri'  },
  { src: '/images/galerie/24.jpg'  , category: 'Tematice'  },
  { src: '/images/galerie/25.jpg'  , category: 'Decoruri'  },
  { src: '/images/galerie/26.jpg'  , category: 'Tematice'  },
  { src: '/images/galerie/27.jpg'  , category: 'Petreceri' },
  { src: '/images/galerie/28.jpg'  , category: 'Petreceri' },
  { src: '/images/galerie/29.jpg'  , category: 'Decoruri'  },
  { src: '/images/galerie/30.jpg' , category: 'Tematice'  },
  { src: '/images/galerie/31.jpg' , category: 'Decoruri'  },
  { src: '/images/galerie/32.jpg' , category: 'Tematice'  },
  { src: '/images/galerie/33.jpg' , category: 'Petreceri' },
  { src: '/images/galerie/34.jpg' , category: 'Petreceri' },
  { src: '/images/galerie/35.jpg' , category: 'Decoruri'  },
  { src: '/images/galerie/36.jpg' , category: 'Tematice'  },
  { src: '/images/galerie/37.jpg' , category: 'Decoruri'  },
  { src: '/images/galerie/38.jpg' , category: 'Tematice'  },
  { src: '/images/galerie/39.jpg' , category: 'Decoruri'  },
  { src: '/images/galerie/40.jpg' , category: 'Tematice'  },
  { src: '/images/galerie/41.jpg'  , category: 'Petreceri' },
  { src: '/images/galerie/42.jpg'  , category: 'Petreceri' },
  { src: '/images/galerie/43.jpg'  , category: 'Decoruri'  },
  { src: '/images/galerie/44.jpg'  , category: 'Tematice'  },
  { src: '/images/galerie/45.jpg'  , category: 'Decoruri'  },
  { src: '/images/galerie/46.jpg'  , category: 'Tematice'  },
  { src: '/images/galerie/47.jpg'  , category: 'Petreceri' },
  { src: '/images/galerie/48.jpg'  , category: 'Petreceri' },
  { src: '/images/galerie/49.jpg'  , category: 'Decoruri'  },
  { src: '/images/galerie/50.jpg' , category: 'Tematice'  },
  { src: '/images/galerie/51.jpg' , category: 'Decoruri'  },
  { src: '/images/galerie/52.jpg' , category: 'Tematice'  },
  { src: '/images/galerie/53.jpg' , category: 'Petreceri' },
  { src: '/images/galerie/54.jpg' , category: 'Petreceri' },
  { src: '/images/galerie/55.jpg' , category: 'Decoruri'  },
  { src: '/images/galerie/56.jpg' , category: 'Tematice'  },
  { src: '/images/galerie/57.jpg' , category: 'Decoruri'  },
  { src: '/images/galerie/58.jpg' , category: 'Tematice'  },
  { src: '/images/galerie/59.jpg' , category: 'Decoruri'  },
  { src: '/images/galerie/60.jpg' , category: 'Tematice'  },
  { src: '/images/galerie/61.jpg'  , category: 'Petreceri' },
  { src: '/images/galerie/62.jpg'  , category: 'Petreceri' },
  { src: '/images/galerie/63.jpg'  , category: 'Decoruri'  },
  { src: '/images/galerie/64.jpg'  , category: 'Tematice'  },
  { src: '/images/galerie/65.jpg'  , category: 'Decoruri'  },
  { src: '/images/galerie/66.jpg'  , category: 'Tematice'  },
  { src: '/images/galerie/67.jpg'  , category: 'Petreceri' },
  { src: '/images/galerie/68.jpg'  , category: 'Petreceri' },
  { src: '/images/galerie/69.jpg'  , category: 'Decoruri'  },
  { src: '/images/galerie/70.jpg' , category: 'Tematice'  },
  { src: '/images/galerie/71.jpg' , category: 'Decoruri'  },
  { src: '/images/galerie/72.jpg' , category: 'Tematice'  },
  { src: '/images/galerie/73.jpg' , category: 'Petreceri' },
  { src: '/images/galerie/74.jpg' , category: 'Petreceri' },
  { src: '/images/galerie/75.jpg' , category: 'Decoruri'  },
  { src: '/images/galerie/76.jpg' , category: 'Tematice'  },
  { src: '/images/galerie/77.jpg' , category: 'Decoruri'  },
  { src: '/images/galerie/78.jpg' , category: 'Tematice'  },
  { src: '/images/galerie/79.jpg' , category: 'Decoruri'  },
  { src: '/images/galerie/80.jpg' , category: 'Tematice'  },
  { src: '/images/galerie/81.jpg' , category: 'Tematice'  },
  { src: '/images/galerie/81.jpg'  , category: 'Petreceri' },
  { src: '/images/galerie/82.jpg'  , category: 'Petreceri' },
  { src: '/images/galerie/83.jpg'  , category: 'Decoruri'  },
  { src: '/images/galerie/84.jpg'  , category: 'Tematice'  },
  { src: '/images/galerie/85.jpg'  , category: 'Decoruri'  },
  { src: '/images/galerie/86.jpg'  , category: 'Tematice'  },
  { src: '/images/galerie/87.jpg'  , category: 'Petreceri' },
  { src: '/images/galerie/88.jpg'  , category: 'Petreceri' },
  { src: '/images/galerie/89.jpg'  , category: 'Decoruri'  },
  { src: '/images/galerie/90.jpg' , category: 'Tematice'  },
  { src: '/images/galerie/91.jpg' , category: 'Decoruri'  },
  { src: '/images/galerie/92.jpg' , category: 'Tematice'  },
  { src: '/images/galerie/93.jpg' , category: 'Petreceri' },
  { src: '/images/galerie/94.jpg' , category: 'Petreceri' },
  { src: '/images/galerie/95.jpg' , category: 'Decoruri'  },
  { src: '/images/galerie/96.jpg' , category: 'Tematice'  },
  { src: '/images/galerie/97.jpg' , category: 'Decoruri'  },
  { src: '/images/galerie/98.jpg' , category: 'Tematice'  },
  { src: '/images/galerie/99.jpg' , category: 'Decoruri'  },
  { src: '/images/galerie/100.jpg' , category: 'Tematice'  },
];

const categories = ['Toate', 'Petreceri', 'Decoruri', 'Tematice'];

const neonColors = {
  Petreceri: '#ff3c78',
  Decoruri:  '#00e5ff',
  Tematice:  '#00ff9d',
  Toate:     '#ffff00'
};

export default function Galerie() {
  const [filter, setFilter] = useState('Toate');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // swipe refs / state
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [trail, setTrail] = useState({ x: 0, y: 0, visible: false, dir: null });
  const trailTimeout = useRef(null);

  const filteredImages = filter === 'Toate'
    ? allImages
    : allImages.filter(img => img.category === filter);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setTrail({ x: 0, y: 0, visible: false, dir: null });
  };

  const prevImage = () => setCurrentIndex((i) => (i - 1 + filteredImages.length) % filteredImages.length);
  const nextImage = () => setCurrentIndex((i) => (i + 1) % filteredImages.length);

  // Touch handlers for swipe + neon trail
  const handleTouchStart = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    const t = e.touches[0];
    touchStartX.current = t.clientX;
    touchEndX.current = t.clientX;

    // show trail
    setTrail({ x: t.clientX, y: t.clientY, visible: true, dir: null });
    if (trailTimeout.current) clearTimeout(trailTimeout.current);
  };

  const handleTouchMove = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    const t = e.touches[0];
    touchEndX.current = t.clientX;

    // update trail position realtime
    setTrail((prev) => ({ ...prev, x: t.clientX, y: t.clientY }));
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    const threshold = 50; // px

    if (distance > threshold) {
      // swipe left => next
      setTrail((prev) => ({ ...prev, dir: 'left' }));
      nextImage();
    } else if (distance < -threshold) {
      // swipe right => prev
      setTrail((prev) => ({ ...prev, dir: 'right' }));
      prevImage();
    } else {
      // small tap — keep trail only briefly
      setTrail((prev) => ({ ...prev, dir: null }));
    }

    // Hide trail after small delay (so animation can show)
    if (trailTimeout.current) clearTimeout(trailTimeout.current);
    trailTimeout.current = setTimeout(() => {
      setTrail({ x: 0, y: 0, visible: false, dir: null });
    }, 450);
  };

  return (
    <section className="galerie-container">
      <h2>Galerie Neon Time</h2>

      <div className="galerie-filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={filter === cat ? 'filter-btn active' : 'filter-btn'}
            style={{ borderColor: neonColors[cat], color: neonColors[cat] }}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="galerie-masonry">
        {filteredImages.map((img, index) => (
          <div
            key={index}
            className="galerie-card"
            style={{ borderColor: neonColors[img.category] }}
            onClick={() => openLightbox(index)}
          >
            <img src={img.src} alt={img.alt} loading="lazy" />
          </div>
        ))}
      </div>

      {lightboxOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          {/* Neon fog background layers */}
          <div className="neon-fog fog-1" />
          <div className="neon-fog fog-2" />
          <div className="neon-fog fog-3" />

          <span
            className="close"
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            aria-label="close"
          >
            &times;
          </span>

          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button className="prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>❮</button>

            <div className="image-wrap">
              <img
                key={filteredImages[currentIndex].src}
                src={filteredImages[currentIndex].src}
                alt={filteredImages[currentIndex].alt}
                className={`lightbox-img ${trail.dir === 'left' ? 'swipe-next' : ''} ${trail.dir === 'right' ? 'swipe-prev' : ''}`}
              />
              {/* neon trail element that follows the finger */}
              {trail.visible && (
                <span
                  className={`neon-trail ${trail.dir === 'left' ? 'dir-left' : ''} ${trail.dir === 'right' ? 'dir-right' : ''}`}
                  style={{ left: trail.x, top: trail.y }}
                />
              )}
            </div>

            <button className="next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>❯</button>
          </div>
        </div>
      )}
    </section>
  );
}


