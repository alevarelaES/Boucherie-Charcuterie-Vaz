import { UtensilsCrossed, ShoppingBag, PartyPopper } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

const metiers = [
  {
    icon: UtensilsCrossed,
    title: 'Boucherie',
    description: 'Viandes sélectionnées',
    detail: 'Une sélection rigoureuse de viandes fraîches et savoureuses, préparées avec soin chaque jour pour garantir goût et qualité exceptionnelle.',
    image: 'https://images.unsplash.com/photo-1700478934617-75d2d4f01a04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    stats: { value: '100%', label: 'Origine Suisse' }
  },
  {
    icon: ShoppingBag,
    title: 'Charcuterie',
    description: 'Savoir-faire maison',
    detail: 'Des recettes traditionnelles transmises de génération en génération, élaborées dans le respect de l\'artisanat local et du terroir.',
    image: 'https://images.unsplash.com/photo-1700478929453-a96a4b6eeaf3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    stats: { value: '30+', label: 'Spécialités maison' }
  },
  {
    icon: PartyPopper,
    title: 'Traiteur',
    description: 'Vos événements',
    detail: 'Des prestations sur mesure pour sublimer vos moments de convivialité, du repas familial au grand événement d\'entreprise.',
    image: 'https://images.unsplash.com/photo-1751651054990-a458fda33224?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    stats: { value: '500+', label: 'Événements réalisés' }
  }
];

export function MetiersSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="métiers" className="py-32 px-4 md:px-8 bg-background relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wider uppercase mb-4"
            style={{ fontFamily: 'var(--font-sans)' }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Notre expertise
          </motion.span>
          <h2 
            className="text-5xl md:text-6xl lg:text-7xl mb-6"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Nos Métiers
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
            Trois expertises au service de la qualité et de l'authenticité,
            <br />
            pour vous offrir le meilleur de l'artisanat suisse
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metiers.map((metier, index) => (
            <motion.div 
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-xl cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              {/* Image with Overlay */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <motion.div
                  animate={{ scale: hoveredIndex === index ? 1.1 : 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <ImageWithFallback 
                    src={metier.image}
                    alt={metier.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                
                {/* Icon Badge */}
                <motion.div 
                  className="absolute top-6 right-6 w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-2xl"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.4, type: "spring" }}
                  whileHover={{ rotate: 360 }}
                >
                  <metier.icon className="w-8 h-8 text-primary-foreground" />
                </motion.div>

                {/* Stats Badge */}
                <motion.div 
                  className="absolute top-6 left-6 bg-white/95 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg"
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  <div className="text-2xl font-bold text-primary" style={{ fontFamily: 'var(--font-serif)' }}>
                    {metier.stats.value}
                  </div>
                  <div className="text-xs text-secondary uppercase tracking-wide" style={{ fontFamily: 'var(--font-sans)' }}>
                    {metier.stats.label}
                  </div>
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 
                  className="text-3xl mb-2 group-hover:text-primary transition-colors"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {metier.title}
                </h3>
                <p className="text-primary text-sm uppercase tracking-widest mb-4" style={{ fontFamily: 'var(--font-sans)' }}>
                  {metier.description}
                </p>
                <p 
                  className="text-foreground/70 leading-relaxed"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {metier.detail}
                </p>

                {/* Hover Indicator */}
                <motion.div
                  className="mt-6 flex items-center gap-2 text-primary"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: hoveredIndex === index ? 0 : -10, opacity: hoveredIndex === index ? 1 : 0 }}
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  <span className="text-sm font-semibold">En savoir plus</span>
                  <motion.span
                    animate={{ x: hoveredIndex === index ? [0, 5, 0] : 0 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    →
                  </motion.span>
                </motion.div>
              </div>

              {/* Bottom Border Animation */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: hoveredIndex === index ? "100%" : "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
