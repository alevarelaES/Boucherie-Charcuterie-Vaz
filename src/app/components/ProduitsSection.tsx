import { Badge } from './ui/badge';
import { useState } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const produits = [
  {
    name: 'Poulet tendre et savoureux',
    tag: 'Premium',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80'
  },
  {
    name: 'Génisse maturée pour les amateurs',
    tag: 'Spécialité',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80'
  },
  {
    name: 'Agneau aux saveurs délicates',
    tag: 'Premium',
    image: 'https://images.unsplash.com/photo-1603894537516-b56f5e85e6f0?w=800&q=80'
  },
  {
    name: 'Porc de qualité supérieure',
    tag: 'Spécialité',
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd67fba?w=800&q=80'
  },
  {
    name: 'Viande de cheval riche en goût',
    tag: 'Premium',
    image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&q=80'
  },
  {
    name: 'Viandes sur commande',
    tag: 'Fait Maison',
    image: 'https://images.unsplash.com/photo-1618164436241-92473be9b1d7?w=800&q=80'
  }
];

export function ProduitsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="produits" className="py-14 md:py-20 px-4 md:px-8 bg-muted/30 relative overflow-hidden scroll-mt-20">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary to-transparent opacity-20" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Notre sélection
          </motion.span>
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Produits phares
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-sans)' }}>
            Découvrez des viandes fraîches et savoureuses, préparées chaque jour pour garantir goût et qualité.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {produits.map((produit, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <motion.div 
                className="bg-card rounded-xl md:rounded-2xl overflow-hidden shadow-xl h-full flex flex-col group"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Image */}
                <div className="relative aspect-[3/2] overflow-hidden">
                  <motion.div
                    animate={{ scale: hoveredIndex === index ? 1.1 : 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <ImageWithFallback 
                      src={produit.image}
                      alt={produit.name}
                      className="w-full h-full object-cover"
                      sizes="(min-width: 1024px) 350px, 80vw"
                    />
                  </motion.div>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Tag Badge */}
                  <motion.div
                    className="absolute top-4 right-4"
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <Badge className="bg-primary text-primary-foreground border-0 shadow-xl text-xs px-3 py-1">
                      {produit.tag}
                    </Badge>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-5 md:p-6 flex-grow flex flex-col justify-between">
                  <h3 
                    className="text-xl sm:text-2xl mb-2 group-hover:text-primary transition-colors"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {produit.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-sans)' }}>
                    Découvrez nos sélections fraîches et savoureuses, préparées avec soin.
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
