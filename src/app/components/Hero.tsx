import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import settings from '../../settings.json';

export function Hero() {
  const { t } = useTranslation();

  const heroImages = [
    '/images/Photos Boucherie/Boucherie1.jpeg',
    '/images/Photos Boucherie/Boucherie2.jpeg'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const scrollToContent = () => {
    const section = document.querySelector('#a-propos');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="accueil" className="relative h-[100dvh] w-full overflow-hidden bg-black">
      {/* 
          OPTIMIZED BACKGROUND CAROUSEL
      */}
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none overflow-hidden">
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${idx === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            style={{ willChange: 'opacity' }}
          >
            <div
              className="absolute inset-x-0 -top-[5%] -bottom-[5%] h-[110%] w-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url("${img}")`,
                transform: 'scale(1.05)',
                willChange: 'transform'
              }}
            />
          </div>
        ))}
        {/* Superior premium overlays - Softer for elegance */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      {/* Hero Content - Optimized animations */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-6 md:gap-10 pt-10">
          {/* Main Title - Simplified animation */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-serif leading-[1.1] tracking-tight drop-shadow-2xl"
          >
            {t('hero.titleInitial', 'La boucherie')} <br />
            <span className="inline-block py-2 text-white italic drop-shadow-lg">
              {t('hero.titleHighlight', 'proche de vous')}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/90 text-lg md:text-2xl font-sans font-medium max-w-2xl leading-relaxed drop-shadow-lg"
          >
            {t('hero.description', "Excellence artisanale et viandes d'exception à")} <span className="text-white font-bold underline decoration-gold decoration-4 underline-offset-4">Vallorbe</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-5 mt-4"
          >
            <a
              href="#produits"
              className="px-10 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg hover:brightness-110 active:scale-95 transition-all shadow-[0_10px_30px_rgba(156,28,48,0.3)]"
            >
              {t('hero.cta.products', 'Découvrir nos produits')}
            </a>
            <a
              href="#contact"
              className="px-10 py-4 bg-white/5 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 active:scale-95 transition-all shadow-xl"
            >
              {t('hero.cta.contact', 'Nous contacter')}
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer hidden sm:flex flex-col items-center gap-2"
          onClick={scrollToContent}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center p-1.5 backdrop-blur-sm">
            <motion.div
              className="w-1 h-2 bg-gold/80 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
