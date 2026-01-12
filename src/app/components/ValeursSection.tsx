import { Heart, Award, Leaf, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTranslation } from 'react-i18next';

export function ValeursSection() {
  const { t } = useTranslation();

  const valeurs = [
    {
      icon: Heart,
      title: t('about.valeurs.animal.title', 'Respect de l\'animal'),
      description: t('about.valeurs.animal.desc', 'Élevées dans le respect du bien-être animal et des traditions locales.')
    },
    {
      icon: Award,
      title: t('about.valeurs.quality.title', 'Qualité Premium'),
      description: t('about.valeurs.quality.desc', 'Sélection rigoureuse garantissant traçabilité et excellence.')
    },
    {
      icon: Leaf,
      title: t('about.valeurs.terroir.title', 'Terroir Local'),
      description: t('about.valeurs.terroir.desc', 'Circuits courts et producteurs de notre région.')
    },
    {
      icon: Users,
      title: t('about.valeurs.knowhow.title', 'Savoir-faire'),
      description: t('about.valeurs.knowhow.desc', 'Artisanat transmis de génération en génération.')
    }
  ];

  return (
    <section id="a-propos" className="py-12 md:py-16 px-4 md:px-8 bg-background relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block px-3 py-1.5 bg-gold/10 text-gold rounded-full text-base md:text-lg font-bold tracking-wider uppercase mb-3 font-sans"
          >
            {t('about.badge', 'Notre histoire')}
          </motion.span>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl mb-3 font-bold font-serif"
          >
            {t('about.title', 'Valeurs & Terroir')}
          </h2>
        </motion.div>

        {/* Bloc 1 : Introduction - Plus compact */}
        <motion.div
          className="bg-primary/5 border-l-4 border-gold rounded-r-lg p-5 mb-8 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-lg md:text-xl text-foreground/90 leading-relaxed text-center font-sans">
            {t('about.intro', "La Boucherie Vaz est née en 2025 avec une idée claire : prêcher avant tout la qualité. Chaque viande que nous proposons est issue d'un savoir-faire artisanal et choisie avec exigence.")}
          </p>
        </motion.div>

        {/* Grid: Image + Notre Promesse - Plus compact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start mb-8">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative rounded-xl overflow-hidden shadow-lg aspect-[4/3]"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <ImageWithFallback
                src="/images/image_viande_1.jpg"
                alt={t('about.imageAlt', 'Boucherie Vaz - Notre histoire')}
                className="w-full h-full object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
            </motion.div>
          </motion.div>

          {/* Notre Promesse + Nos produits combinés */}
          <div className="space-y-5">
            <motion.div
              className="bg-muted/30 rounded-lg p-5"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-gold font-serif">
                {t('about.promiseTitle', 'Notre Promesse')}
              </h3>
              <p className="text-base md:text-lg text-foreground/90 leading-relaxed font-sans">
                {t('about.promiseText', 'Située au cœur de la tradition bouchère, notre boutique est votre nouvelle adresse gourmande à Vallorbe. Nous sélectionnons nos viandes avec le plus grand soin afin de garantir fraîcheur, goût et tendreté.')}
              </p>
            </motion.div>

            {/* Nos produits */}
            <motion.div
              className="bg-background border border-border/50 rounded-lg p-5"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-primary font-serif">
                {t('about.listTitle', 'Vous trouverez chez nous')}
              </h3>
              <div className="space-y-2">
                {[
                  t('products.items.chicken.name', 'Poulet tendre et savoureux'),
                  t('products.items.heifer.name', 'Génisse maturée raffinée'),
                  t('products.items.lamb.name', 'Agneau aux saveurs délicates'),
                  t('products.items.pork.name', 'Porc de qualité supérieure'),
                  t('products.items.horse.name', 'Viande de cheval riche en goût'),
                  t('products.items.order.name', 'Viandes sur commande')
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-base md:text-lg text-foreground/90 font-sans">
                    <span className="w-2 h-2 bg-gold rounded-full flex-shrink-0 mt-2"></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* 4 Values Grid - Plus compact */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {valeurs.map((valeur, index) => (
            <motion.div
              key={index}
              className="bg-muted/50 rounded-lg p-4 border border-border/50 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center group-hover:bg-gold transition-colors">
                  <valeur.icon className="w-6 h-6 text-gold group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3
                    className="font-bold text-base md:text-lg mb-1 font-serif group-hover:text-gold transition-colors"
                  >
                    {valeur.title}
                  </h3>
                  <p
                    className="text-base md:text-lg text-foreground/90 leading-relaxed font-normal font-sans"
                  >
                    {valeur.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bloc 4 : Notre engagement - Plus compact */}
        <motion.div
          className="bg-primary/5 rounded-lg p-5 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed text-center italic font-sans">
            {t('about.engagement', "Plus qu'une simple boucherie, nous sommes un lieu de confiance, où l'on vient autant pour la qualité exceptionnelle de nos produits que pour partager notre passion de la viande.")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
