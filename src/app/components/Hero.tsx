import { useTranslation } from 'react-i18next';
import { useState, useEffect, memo } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Hero Section - Ultra Premium & Optimized
 * 
 * Improvements:
 * - "Premium" transition: Image starts slightly zoomed in (1.1) and scales down to 1.0 while fading in.
 *   This creates a very sophisticated, cinematic "reveal" effect.
 * - Optimized scroll indicator with simpler, reliable CSS animation.
 * - Removed complex state logic for smoother performance.
 */
export const Hero = memo(function Hero() {
  const { t } = useTranslation();

  const heroImages = [
    '/images/Photos Boucherie/Boucherie1.jpeg',
    '/images/Photos Boucherie/Boucherie2.jpeg'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const scrollToContent = () => {
    const section = document.querySelector('#a-propos');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="accueil" className="relative h-[100dvh] w-full overflow-hidden bg-black">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((img, idx) => {
          const isActive = idx === currentImageIndex;
          return (
            <div
              key={idx}
              className={`absolute inset-0 transition-all duration-[2000ms] ease-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              aria-hidden={!isActive}
            >
              <div
                className={`absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-out ${isActive ? 'scale-100' : 'scale-110'
                  }`}
                style={{ backgroundImage: `url("${img}")` }}
              />
              {/* Premium Overlay Gradient - Darkened for readability */}
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
            </div>
          );
        })}
      </div>

      {/* Hero Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-8 md:gap-12 pt-12">
          {/* Main Title */}
          <h1 className="flex flex-col items-center">
            <span className="text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-serif leading-[1.0] tracking-tight drop-shadow-2xl animate-fade-in-up">
              {t('hero.titleInitial', 'La boucherie')}
            </span>
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gold font-serif italic mt-4 drop-shadow-lg animation-delay-200 animate-fade-in-up">
              {t('hero.titleHighlight', 'proche de vous')}
            </span>
          </h1>

          {/* Description */}
          <div className="relative">
            <p className="text-white/90 text-lg md:text-2xl font-sans font-medium max-w-2xl leading-relaxed drop-shadow-lg animation-delay-400 animate-fade-in-up">
              {t('hero.description', "Excellence artisanale et viandes d'exception à")}{' '}
              <span className="text-white font-bold underline decoration-gold decoration-2 underline-offset-4">
                Vallorbe
              </span>.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 mt-6 animation-delay-600 animate-fade-in-up">
            <a
              href="#produits"
              className="px-10 py-5 bg-primary text-white rounded-full font-bold text-lg tracking-wide hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl shadow-primary/30"
            >
              {t('hero.cta.products', 'Découvrir nos produits')}
            </a>
            <a
              href="#contact"
              className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-bold text-lg tracking-wide hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              {t('hero.cta.contact', 'Nous contacter')}
            </a>
          </div>
        </div>

        {/* Scroll Indicator - Totally revamped */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-30 flex flex-col items-center gap-3 group animate-fade-in animation-delay-1000"
          onClick={scrollToContent}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-white/70 font-bold group-hover:text-white transition-colors">
            {t('hero.scroll', 'Découvrir')}
          </span>
          <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center p-1 relative overflow-hidden group-hover:border-white/60 transition-colors">
            <div className="w-1.5 h-3 bg-white rounded-full animate-bounce-slow mt-1" />
          </div>
        </div>
      </div>
    </section>
  );
});
