import { motion, useScroll, useTransform } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTranslation } from 'react-i18next';

export function Hero() {
  const { t } = useTranslation();
  const { scrollY } = useScroll();

  // Parallax effect for background
  const yBackend = useTransform(scrollY, [0, 800], [0, 400]);
  const opacityHero = useTransform(scrollY, [0, 500], [1, 0]);

  const scrollToContent = () => {
    const productsSection = document.querySelector('#a-propos');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="accueil" className="relative h-screen w-full overflow-hidden">
      {/* Dynamic Background with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: yBackend }}
      >
        <ImageWithFallback
          src="/images/Boucherie vaz Viandes.jpeg"
          alt={t('hero.imageAlt', "Boucherie Vaz - L'art de la viande")}
          className="w-full h-full object-cover scale-105"
          loading="eager"
        />
        {/* Gradients pour lisibilité optimale */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60" />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 md:px-0"
        style={{ opacity: opacityHero }}
      >
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-6 md:gap-8 mt-16 md:mt-0">
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
            className="text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold font-serif leading-tight tracking-tight drop-shadow-2xl"
          >
            {t('hero.titleInitial', 'La boucherie')} <br />
            <span className="inline-block py-2 text-white italic drop-shadow-lg">
              {t('hero.titleHighlight', 'proche de vous')}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/90 text-lg md:text-2xl font-sans font-medium max-w-2xl leading-relaxed drop-shadow-lg"
          >
            {t('hero.description', "Excellence artisanale et viandes d'exception à")} <span className="text-white font-bold underline decoration-primary decoration-4 underline-offset-4">Vallorbe</span>.
          </motion.p>

          {/* CTA Buttons - Fixed Rounding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mt-4"
          >
            <a
              href="#produits"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-sans font-bold text-lg hover:bg-primary/90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              {t('hero.cta.products', 'Découvrir nos produits')}
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-lg font-sans font-bold text-lg hover:bg-white/20 transition-all shadow-lg hover:-translate-y-1"
            >
              {t('hero.cta.contact', 'Nous contacter')}
            </a>
          </motion.div>
        </div>

        {/* Redesigned Scroll Indicator - Premium Minimalist */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 cursor-pointer"
          onClick={scrollToContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm"
            whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.6)" }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
