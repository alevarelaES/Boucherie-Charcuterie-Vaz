import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useHero } from '../../hooks/useSanity';
import { urlFor } from '../../lib/sanity/image';

/**
 * Hero Section - Ultra Premium & Optimized + Sanity CMS
 * 
 * Uses Sanity data with fallback to i18n translations
 */
export const Hero = memo(function Hero() {
  const { t, i18n } = useTranslation();
  const { data: hero, loading } = useHero();

  const currentLang = (i18n.language as 'fr' | 'de') || 'fr';

  const scrollToContent = () => {
    const section = document.querySelector('#a-propos');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  // Get values from Sanity or fallback to translations
  const titleMain = hero?.titleMain?.[currentLang] || t('hero.titleInitial', 'La boucherie');
  const titleHighlight = hero?.titleHighlight?.[currentLang] || t('hero.titleHighlight', 'proche de vous');
  const description = hero?.description?.[currentLang] || t('hero.description', "Excellence artisanale et viandes d'exception à");
  const highlightedCity = hero?.highlightedCity || 'Vallorbe';
  const cta1Text = hero?.cta1?.text?.[currentLang] || t('hero.cta.products', 'Découvrir nos produits');
  const cta1Link = hero?.cta1?.link || '#produits';
  const cta2Text = hero?.cta2?.text?.[currentLang] || t('hero.cta.contact', 'Nous contacter');
  const cta2Link = hero?.cta2?.link || '#contact';
  const scrollText = hero?.scrollText?.[currentLang] || t('hero.scroll', 'Découvrir');

  // Background image from Sanity or default
  const backgroundImage = hero?.backgroundImage
    ? urlFor(hero.backgroundImage).width(1920).height(1080).url()
    : '/images/Photos Boucherie/Boucherie1.jpg';

  return (
    <section id="accueil" className="relative h-[100dvh] w-full overflow-hidden bg-black">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 transition-opacity duration-[2000ms] ease-out opacity-100">
          <div
            className="absolute inset-0 bg-cover bg-center animate-subtle-zoom"
            style={{ backgroundImage: `url("${backgroundImage}")` }}
          />
          {/* Stronger Overlay for readability */}
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80" />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-8 md:gap-12 pt-12">
          {/* Main Title */}
          <h1 className="flex flex-col items-center">
            <span className="text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-serif leading-[1.0] tracking-tight drop-shadow-2xl animate-fade-in-up">
              {titleMain}
            </span>
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gold font-serif italic mt-4 drop-shadow-lg animation-delay-200 animate-fade-in-up">
              {titleHighlight}
            </span>
          </h1>

          {/* Description */}
          <div className="relative">
            <p className="text-white/90 text-lg md:text-2xl font-sans font-medium max-w-2xl leading-relaxed drop-shadow-lg animation-delay-400 animate-fade-in-up">
              {description}{' '}
              <span className="text-white font-bold underline decoration-gold decoration-2 underline-offset-4">
                {highlightedCity}
              </span>.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 mt-6 animation-delay-600 animate-fade-in-up">
            <a
              href={cta1Link}
              className="px-10 py-5 bg-primary text-white rounded-full font-bold text-lg tracking-wide hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl shadow-primary/30"
            >
              {cta1Text}
            </a>
            <a
              href={cta2Link}
              className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-bold text-lg tracking-wide hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              {cta2Text}
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-30 flex flex-col items-center gap-3 group animate-fade-in animation-delay-1000"
          onClick={scrollToContent}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-white/70 font-bold group-hover:text-white transition-colors">
            {scrollText}
          </span>
          <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center p-1 relative overflow-hidden group-hover:border-white/60 transition-colors">
            <div className="w-1.5 h-3 bg-white rounded-full animate-bounce-slow mt-1" />
          </div>
        </div>
      </div>
    </section>
  );
});

