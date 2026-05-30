import { memo, useState, useCallback, useEffect } from 'react';
import { OptimizedImage } from './OptimizedImage';
import { useTranslation } from 'react-i18next';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const BASE_PATH = '/images/Photos%20Boucherie/Produits/Assortiment%20grillade/Assortimen%20grillade%20';

const IMAGES = Array.from({ length: 11 }, (_, i) => ({
  src: `${BASE_PATH}${i + 1}.jpeg`,
  alt: `Assortiment Grillade ${i + 1}`,
}));

export const GrilladesGallery = memo(function GrilladesGallery() {
  const { t } = useTranslation();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prev = useCallback(() => {
    setLightboxIndex(i => i === null ? null : (i - 1 + IMAGES.length) % IMAGES.length);
  }, []);

  const next = useCallback(() => {
    setLightboxIndex(i => i === null ? null : (i + 1) % IMAGES.length);
  }, []);

  // Navigation clavier
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex, closeLightbox, prev, next]);

  // Bloquer le scroll quand le lightbox est ouvert
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  return (
    <section className="py-24 md:py-32 px-4 md:px-8 bg-muted/30 relative overflow-hidden">
      {/* Decorative line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block px-4 py-1.5 border border-gold/30 text-gold rounded-full text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-6 bg-gold/5 backdrop-blur-sm">
            {t('grillade.badge', 'Fait Maison')}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif text-foreground mb-6">
            {t('grillade.title', 'Assortiment Grillade')}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto font-light leading-relaxed">
            {t('grillade.description', 'Nos pièces marinées et préparées maison, prêtes à saisir sur le grill.')}
          </p>
        </div>

        {/* Grille photos */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {IMAGES.map((img, i) => (
            <button
              key={i}
              onClick={() => openLightbox(i)}
              className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
              aria-label={`Voir ${img.alt}`}
            >
              <OptimizedImage
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
              {/* Icône zoom */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/>
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/92 backdrop-blur-md animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Fermer */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-10 p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Compteur */}
          <span className="absolute top-6 left-1/2 -translate-x-1/2 text-white/50 text-sm font-mono tabular-nums">
            {lightboxIndex + 1} / {IMAGES.length}
          </span>

          {/* Précédent */}
          <button
            onClick={e => { e.stopPropagation(); prev(); }}
            className="absolute left-4 md:left-8 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            aria-label="Image précédente"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image principale */}
          <div
            className="relative max-w-4xl max-h-[85vh] w-full mx-20 flex items-center justify-center"
            onClick={e => e.stopPropagation()}
          >
            <img
              key={lightboxIndex}
              src={IMAGES[lightboxIndex].src}
              alt={IMAGES[lightboxIndex].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl animate-in zoom-in-95 duration-150"
            />
          </div>

          {/* Suivant */}
          <button
            onClick={e => { e.stopPropagation(); next(); }}
            className="absolute right-4 md:right-8 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            aria-label="Image suivante"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Thumbnails strip */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 px-4 overflow-x-auto max-w-[90vw]">
            {IMAGES.map((img, i) => (
              <button
                key={i}
                onClick={e => { e.stopPropagation(); setLightboxIndex(i); }}
                className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden transition-all duration-200 ${
                  i === lightboxIndex
                    ? 'ring-2 ring-gold opacity-100 scale-110'
                    : 'opacity-40 hover:opacity-70'
                }`}
                aria-label={`Photo ${i + 1}`}
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
});
