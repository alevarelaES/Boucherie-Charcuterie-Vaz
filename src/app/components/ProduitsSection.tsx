import { Badge } from './ui/badge';
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { OptimizedImage } from './OptimizedImage';
import { useTranslation } from 'react-i18next';
import settings from '../../settings.json';

export function ProduitsSection() {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const yTitle = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const produits = [
    {
      name: t('products.items.chicken.name', 'Poulet tendre et savoureux'),
      description: t('products.items.chicken.desc', 'Une chair tendre et juteuse, idéale pour vos grillades ou plats mijotés.'),
      tag: t('products.tags.premium', 'Premium'),
      image: settings.products.find(p => p.id === 'chicken')?.image || ''
    },
    {
      name: t('products.items.heifer.name', 'Génisse maturée pour les amateurs'),
      description: t('products.items.heifer.desc', 'Sélectionnée avec soin pour sa tendreté et son persillé exceptionnel.'),
      tag: t('products.tags.specialty', 'Spécialité'),
      image: settings.products.find(p => p.id === 'heifer')?.image || ''
    },
    {
      name: t('products.items.lamb.name', 'Agneau aux saveurs délicates'),
      description: t('products.items.lamb.desc', 'Des morceaux choisis pour leur finesse et leur goût subtil et parfumé.'),
      tag: t('products.tags.premium', 'Premium'),
      image: settings.products.find(p => p.id === 'lamb')?.image || ''
    },
    {
      name: t('products.items.pork.name', 'Porc de qualité supérieure'),
      description: t('products.items.pork.desc', 'Une qualité suisse irréprochable, parfaite pour toutes vos préparations.'),
      tag: t('products.tags.specialty', 'Spécialité'),
      image: settings.products.find(p => p.id === 'pork')?.image || ''
    },
    {
      name: t('products.items.horse.name', 'Viande de cheval riche en goût'),
      description: t('products.items.horse.desc', 'Une viande maigre et savoureuse, appréciée pour ses qualités nutritives.'),
      tag: t('products.tags.premium', 'Premium'),
      image: settings.products.find(p => p.id === 'horse')?.image || ''
    },
    {
      name: t('products.items.order.name', 'Viandes sur commande'),
      description: t('products.items.order.desc', 'Plateaux de charcuterie et découpes spécifiques pour tous vos événements.'),
      tag: t('products.tags.homemade', 'Fait Maison'),
      image: settings.products.find(p => p.id === 'order')?.image || ''
    }
  ];

  return (
    <section
      id="produits"
      ref={containerRef}
      className="py-12 md:py-16 px-4 md:px-8 bg-muted/30 relative overflow-hidden scroll-mt-20"
    >
      {/* Parallax Background Background */}
      <motion.div
        className="absolute inset-x-0 -top-40 -bottom-40 z-0 opacity-[0.03] pointer-events-none"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [-100, 100]),
          rotate: 5
        }}
      >
        <OptimizedImage
          src={settings.images.hero}
          alt=""
          className="w-full h-full object-cover blur-3xl scale-150"
        />
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary to-transparent opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ y: yTitle }}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-gold/10 text-gold rounded-full text-sm md:text-base font-bold tracking-wider uppercase mb-3 font-sans"
          >
            {t('products.badge', 'Notre sélection')}
          </motion.span>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-3 font-bold font-serif"
          >
            {t('products.title', 'Produits phares')}
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-foreground/90 max-w-3xl mx-auto font-medium font-sans">
            {t('products.description', 'Découvrez des viandes fraîches et savoureuses, préparées chaque jour pour garantir goût et qualité.')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {produits.map((produit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: isMobile ? 0 : index * 0.1 }}
              onHoverStart={() => !isMobile && setHoveredIndex(index)}
              onHoverEnd={() => !isMobile && setHoveredIndex(null)}
            >
              <motion.div
                className="bg-card rounded-xl overflow-hidden shadow-xl h-full flex flex-col group"
                whileHover={isMobile ? {} : { y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Image */}
                <div className="relative aspect-[3/2] overflow-hidden">
                  <motion.div
                    animate={{ scale: hoveredIndex === index ? 1.1 : 1 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full"
                  >
                    <OptimizedImage
                      src={produit.image}
                      alt={produit.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                  {/* Tag Badge */}
                  <motion.div
                    className="absolute top-3 right-3"
                    initial={{ x: isMobile ? 0 : 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: isMobile ? 0 : index * 0.1 + 0.2 }}
                  >
                    <Badge className={`${produit.tag === t('products.tags.premium', 'Premium') ? 'bg-gold hover:bg-gold/90' : 'bg-primary hover:bg-primary/90'} text-white border-0 shadow-xl text-sm md:text-base font-bold px-3 py-1`}>
                      {produit.tag}
                    </Badge>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-5 flex-grow flex flex-col justify-between">
                  <h3
                    className="text-xl sm:text-2xl md:text-3xl mb-2 font-bold group-hover:text-primary transition-colors font-serif"
                  >
                    {produit.name}
                  </h3>

                  <p className="text-base md:text-lg text-muted-foreground font-medium font-sans">
                    {produit.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
