import { Heart, Award, Leaf, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const valeurs = [
  {
    icon: Heart,
    title: 'Respect de l\'animal',
    description: 'Élevées dans le respect du bien-être animal et des traditions locales.'
  },
  {
    icon: Award,
    title: 'Qualité Premium',
    description: 'Sélection rigoureuse garantissant traçabilité et excellence.'
  },
  {
    icon: Leaf,
    title: 'Terroir Local',
    description: 'Circuits courts et producteurs de notre région.'
  },
  {
    icon: Users,
    title: 'Savoir-faire',
    description: 'Artisanat transmis de génération en génération.'
  }
];

export function ValeursSection() {
  return (
    <section id="a-propos" className="py-14 md:py-20 px-4 md:px-8 bg-background relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left: Image */}
          <motion.div 
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <ImageWithFallback 
                src="/images/image_viande_1.jpg"
                alt="Boucherie Vaz - Notre histoire"
                className="w-full h-full object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.span 
                className="inline-block px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Notre histoire
              </motion.span>
              
              <h2 
                className="text-4xl md:text-5xl mb-4"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Valeurs & Terroir
              </h2>
              
              <p className="text-base text-foreground/80 leading-relaxed mb-6" style={{ fontFamily: 'var(--font-sans)' }}>
                La <span className="font-semibold text-primary">Boucherie Vaz</span> est née en 2025 avec une idée claire : prêcher avant tout la qualité. Chaque viande que nous proposons est issue d'un savoir-faire artisanal et choisie avec exigence, pour offrir à nos clients des produits d'exception, dans une ambiance chaleureuse et familiale.
              </p>

              <p className="text-sm text-foreground/95 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-sans)' }}>
                Située au cœur de la tradition bouchère, notre boutique est votre nouvelle adresse gourmande à Vallorbe. La qualité est notre promesse : nous sélectionnons nos viandes avec le plus grand soin afin de garantir fraîcheur, goût et tendreté, du premier au dernier morceau.
              </p>

              <p className="text-sm text-foreground/95 leading-relaxed mb-3 font-semibold" style={{ fontFamily: 'var(--font-sans)' }}>
                Vous trouverez chez nous :
              </p>
              <ul className="text-sm text-foreground/95 leading-relaxed mb-4 space-y-1" style={{ fontFamily: 'var(--font-sans)' }}>
                <li>• Poulet tendre et savoureux</li>
                <li>• Génisse maturée pour les amateurs de viande raffinée</li>
                <li>• Agneau aux saveurs délicates</li>
                <li>• Porc de qualité supérieure</li>
                <li>• Viande de cheval riche en goût</li>
                <li>• Et bien d'autres viandes sur commande</li>
              </ul>

              <p className="text-sm text-foreground/95 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                Notre équipe est à votre écoute pour vous conseiller et vous accompagner, que ce soit pour un repas en famille, un barbecue entre amis ou une occasion spéciale. Plus qu'une simple boucherie, nous sommes un lieu de confiance, où l'on vient autant pour la qualité exceptionnelle de nos produits que pour le plaisir d'échanger et de partager notre passion de la viande.
              </p>
            </motion.div>

            {/* 4 Values Grid - compact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-6">
              {valeurs.map((valeur, index) => (
                <motion.div
                  key={index}
                  className="bg-muted/50 rounded-lg p-3 border border-border/50"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex gap-2 items-start">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <valeur.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 
                        className="font-semibold text-sm mb-0.5"
                        style={{ fontFamily: 'var(--font-serif)' }}
                      >
                        {valeur.title}
                      </h3>
                      <p 
                        className="text-xs text-foreground/90 leading-tight"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {valeur.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
