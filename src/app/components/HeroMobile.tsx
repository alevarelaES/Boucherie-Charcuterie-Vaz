import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import settings from '../../settings.json';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HeroMobile() {
    const { t } = useTranslation();

    return (
        <section id="accueil" className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-gray-900 flex flex-col">
            {/* Background - Fixed and bleeding to prevent gaps */}
            <div className="absolute inset-0 z-0">
                <div className="absolute h-[115%] w-full -top-[7.5%] left-0">
                    <ImageWithFallback
                        src={settings.images.hero}
                        alt="Hero Background"
                        className="w-full h-full object-cover"
                        loading="eager"
                    />
                </div>
                {/* Softer Overlays */}
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90" />
            </div>

            {/* Content - Vertically centered */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-16">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col gap-6"
                >
                    <h1 className="text-white text-[2.75rem] leading-[1.1] font-bold font-serif drop-shadow-2xl">
                        {t('hero.titleInitial', 'La boucherie')} <br />
                        <span className="italic italic-white">{t('hero.titleHighlight', 'proche de vous')}</span>
                    </h1>

                    <p className="text-white/90 text-lg font-sans font-medium leading-relaxed drop-shadow-lg">
                        {t('hero.description', "Excellence artisanale et viandes d'exception à")} <br />
                        <span className="text-white font-bold underline decoration-gold decoration-4 underline-offset-4">Vallorbe</span>
                    </p>

                    <div className="flex flex-col gap-4 mt-2">
                        <a
                            href="#produits"
                            className="px-10 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg shadow-xl active:scale-95 transition-transform"
                        >
                            {t('hero.cta.products', 'Découvrir nos produits')}
                        </a>
                        <a
                            href="#contact"
                            className="px-10 py-4 bg-white/5 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-lg shadow-lg active:scale-95 transition-transform"
                        >
                            {t('hero.cta.contact', 'Nous contacter')}
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Minimal Scroll Indicator */}
            <div className="relative z-10 pb-8 flex justify-center">
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-6 h-10 rounded-full border border-white/20 flex justify-center p-1.5"
                >
                    <div className="w-1 h-3 bg-gold/60 rounded-full" />
                </motion.div>
            </div>
        </section>
    );
}
