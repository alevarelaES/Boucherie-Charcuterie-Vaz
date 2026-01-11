import { Heart, Award, Leaf, Users, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const valeurs = [
  {
    icon: Heart,
    title: 'Respect de l\'animal',
    description: 'Nos bêtes sont élevées dans le respect du bien-être animal et des traditions locales.'
  },
  {
    icon: Award,
    title: 'Qualité Premium',
    description: 'Une sélection rigoureuse garantissant traçabilité et excellence à chaque étape.'
  },
  {
    icon: Leaf,
    title: 'Terroir Local',
    description: 'Nous privilégions les circuits courts et les producteurs de notre région.'
  },
  {
    icon: Users,
    title: 'Savoir-faire',
    description: 'Un artisanat transmis de génération en génération depuis des décennies.'
  }
];

const engagements = [
  'Viandes 100% origine suisse',
  'Traçabilité complète de nos produits',
  'Fabrication artisanale sur place',
  'Conseil personnalisé et expertise'
];

export function ValeursSection() {
  return (
    <section id="à propos" className="py-32 px-4 md:px-8 bg-background relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image with decorative elements */}
          <motion.div 
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              {/* Main Image */}
              <motion.div 
                className="relative rounded-3xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1752695546565-96bfed892b0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
                  alt="Boucherie Vaz - Notre histoire"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>

              {/* Floating Card */}
              <motion.div
                className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-2xl p-6 max-w-xs"
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: "spring" }}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary" style={{ fontFamily: 'var(--font-serif)' }}>
                      2025
                    </div>
                    <div className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-sans)' }}>
                      Depuis notre création
                    </div>
                  </div>
                </div>
                <p className="text-sm text-foreground/70" style={{ fontFamily: 'var(--font-sans)' }}>
                  Une passion pour la qualité qui guide chacune de nos actions
                </p>
              </motion.div>

              {/* Decorative Circle */}
              <motion.div
                className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.span 
                className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wider uppercase mb-6"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Notre histoire
              </motion.span>
              
              <h2 
                className="text-5xl md:text-6xl lg:text-7xl mb-8"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Valeurs & Terroir
              </h2>
            </motion.div>
            
            <motion.div 
              className="mb-10 space-y-6" 
              style={{ fontFamily: 'var(--font-sans)' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-lg text-foreground/80 leading-relaxed">
                La <span className="font-semibold text-primary">Boucherie Vaz</span> est née en 2025 avec une vision claire : 
                privilégier avant tout la qualité. Chaque viande que nous proposons est issue d'un savoir-faire 
                artisanal et choisie avec exigence, pour offrir à nos clients des produits d'exception.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Située au cœur de <span className="font-semibold">Vallorbe</span>, notre boutique est votre nouvelle 
                adresse gourmande. La qualité est notre promesse : nous sélectionnons nos viandes avec le plus grand 
                soin afin de garantir <span className="font-semibold text-primary">fraîcheur, goût et tendreté</span>, 
                du premier au dernier morceau.
              </p>
            </motion.div>

            {/* Engagements */}
            <motion.div 
              className="mb-10 bg-muted/50 rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-serif)' }}>
                <CheckCircle className="w-5 h-5 text-primary" />
                Nos engagements
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {engagements.map((engagement, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 text-sm"
                    style={{ fontFamily: 'var(--font-sans)' }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {engagement}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {valeurs.map((valeur, index) => (
                <motion.div 
                  key={index}
                  className="group relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-muted/50 transition-colors">
                    <motion.div 
                      className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 relative overflow-hidden"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <valeur.icon className="w-7 h-7 text-primary relative z-10" />
                      <motion.div
                        className="absolute inset-0 bg-primary/20"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                    <div>
                      <h3 
                        className="text-lg mb-1 font-semibold"
                        style={{ fontFamily: 'var(--font-serif)' }}
                      >
                        {valeur.title}
                      </h3>
                      <p 
                        className="text-sm text-muted-foreground leading-relaxed"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {valeur.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Hover Border */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-full"
                    initial={{ height: 0 }}
                    whileHover={{ height: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
