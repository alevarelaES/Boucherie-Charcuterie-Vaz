import { Badge } from './ui/badge';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const produits = [
  {
    name: 'Filet de Bœuf Premium',
    origin: 'Origine Suisse',
    tag: 'Fait Maison',
    price: 'CHF 65.00',
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1690983321402-35ff91692b56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    rating: 5,
    description: 'Pièce noble et tendre, parfaite pour vos occasions spéciales'
  },
  {
    name: 'Charcuterie Artisanale',
    origin: 'Fait Maison',
    tag: 'Spécialité',
    price: 'CHF 4.50',
    unit: '100g',
    image: 'https://images.unsplash.com/photo-1763734546248-a04dd0f88b0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    rating: 5,
    description: 'Sélection de charcuterie artisanale préparée selon nos recettes traditionnelles'
  },
  {
    name: 'Côte de Veau',
    origin: 'Origine Suisse',
    tag: 'Premium',
    price: 'CHF 38.00',
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1733700469173-15d46efc2c09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    rating: 5,
    description: 'Viande tendre et savoureuse, élevée dans le respect du bien-être animal'
  },
  {
    name: 'Saucisson Valaisan',
    origin: 'Fait Maison',
    tag: 'Origine Suisse',
    price: 'CHF 5.80',
    unit: '100g',
    image: 'https://images.unsplash.com/photo-1700478929453-a96a4b6eeaf3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    rating: 5,
    description: 'Authentique saucisson valaisan séché selon la tradition'
  },
  {
    name: 'Entrecôte Maturée',
    origin: 'Origine Suisse',
    tag: 'Premium',
    price: 'CHF 55.00',
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1690983321402-35ff91692b56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    rating: 5,
    description: 'Maturée 21 jours pour un goût intense et une tendreté exceptionnelle'
  },
  {
    name: 'Terrine Maison',
    origin: 'Fait Maison',
    tag: 'Spécialité',
    price: 'CHF 18.00',
    unit: 'pièce',
    image: 'https://images.unsplash.com/photo-1763734546248-a04dd0f88b0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    rating: 5,
    description: 'Terrine artisanale aux saveurs du terroir'
  }
];

export function ProduitsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="produits" className="py-32 px-4 md:px-8 bg-muted/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-20" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wider uppercase mb-4"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Notre sélection
            </motion.span>
            <h2 
              className="text-5xl md:text-6xl lg:text-7xl mb-4"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Produits Phares
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl" style={{ fontFamily: 'var(--font-sans)' }}>
              Découvrez notre sélection de spécialités et produits de saison
            </p>
          </motion.div>
          
          <motion.div 
            className="flex gap-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.button
              onClick={() => scroll('left')}
              className="w-14 h-14 rounded-full bg-white border-2 border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-lg"
              aria-label="Scroll left"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              onClick={() => scroll('right')}
              className="w-14 h-14 rounded-full bg-white border-2 border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-lg"
              aria-label="Scroll right"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {produits.map((produit, index) => (
            <motion.div 
              key={index}
              className="flex-shrink-0 w-[350px] snap-start"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <motion.div 
                className="bg-card rounded-2xl overflow-hidden shadow-xl h-full flex flex-col relative"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <motion.div
                    animate={{ scale: hoveredIndex === index ? 1.1 : 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <ImageWithFallback 
                      src={produit.image}
                      alt={produit.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <motion.div
                      initial={{ x: 100, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      <Badge className="bg-primary text-primary-foreground border-0 shadow-xl text-xs px-3 py-1">
                        {produit.tag}
                      </Badge>
                    </motion.div>
                    {produit.origin && (
                      <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <Badge className="bg-white/95 backdrop-blur-sm text-secondary border-0 shadow-xl text-xs px-3 py-1">
                          {produit.origin}
                        </Badge>
                      </motion.div>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="absolute bottom-4 left-4 flex gap-1">
                    {[...Array(produit.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.2 + i * 0.1 }}
                      >
                        <Star className="w-4 h-4 fill-primary text-primary drop-shadow-lg" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 
                    className="text-2xl mb-2 group-hover:text-primary transition-colors"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {produit.name}
                  </h3>
                  <p 
                    className="text-sm text-muted-foreground mb-4 flex-grow"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {produit.description}
                  </p>
                  
                  {/* Price Section */}
                  <div className="flex items-end justify-between pt-4 border-t border-border">
                    <div>
                      <span 
                        className="text-xs text-muted-foreground uppercase tracking-wide block mb-1"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        Prix indicatif
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span 
                          className="text-3xl text-primary font-bold"
                          style={{ fontFamily: 'var(--font-serif)' }}
                        >
                          {produit.price}
                        </span>
                        <span className="text-sm text-muted-foreground">/ {produit.unit}</span>
                      </div>
                    </div>
                    
                    <motion.button
                      className="px-5 py-2.5 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-all text-sm font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Commander
                    </motion.button>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <motion.div
                  className="absolute inset-0 border-2 border-primary rounded-2xl pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
