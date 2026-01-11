import { ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1733700469173-15d46efc2c09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920"
          alt="Boucherie Vaz - L'art de la viande" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </motion.div>

      {/* Animated Top Bar */}
      <motion.div 
        className="absolute top-0 left-0 right-0 bg-secondary/95 backdrop-blur-md text-secondary-foreground py-3 px-4 md:px-8 z-20 border-b border-primary/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4 text-xs md:text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-primary">📍</span>
            <span>Rue du faubourg 5, 1337 Vallorbe</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-primary">📞</span>
            <span>+41 21 843 11 09</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-primary">✉️</span>
            <span>boucherievaz@gmail.com</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Animated Logo with Glass Morphism */}
      <motion.div 
        className="absolute top-24 left-4 md:left-8 z-20"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <motion.div 
          className="bg-white/90 backdrop-blur-lg p-5 rounded-2xl shadow-2xl border border-white/20"
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
            <span className="text-primary text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-serif)' }}>
              VAZ
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Animated Navigation */}
      <motion.nav 
        className="absolute top-24 right-4 md:right-8 z-20 hidden md:block"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <ul className="flex gap-8 bg-white/10 backdrop-blur-md px-8 py-4 rounded-full border border-white/20" style={{ fontFamily: 'var(--font-sans)' }}>
          {['Accueil', 'Métiers', 'Produits', 'À propos', 'Contact'].map((item, index) => (
            <motion.li 
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <motion.a 
                href={`#${item.toLowerCase()}`}
                className="text-white hover:text-primary transition-colors relative group"
                whileHover={{ scale: 1.1 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </motion.a>
            </motion.li>
          ))}
        </ul>
      </motion.nav>

      {/* Hero Content with Staggered Animation */}
      <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mb-4"
          >
            <span 
              className="inline-block px-6 py-2 bg-primary/90 backdrop-blur-sm rounded-full text-sm tracking-widest uppercase border border-white/20"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Depuis 2025
            </span>
          </motion.div>

          <h1 
            className="text-5xl md:text-7xl lg:text-8xl mb-6 max-w-5xl leading-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            L'art de la viande,
            <br />
            <span className="text-primary">le goût du terroir</span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Une boucherie-charcuterie artisanale où tradition et excellence se rencontrent
          </motion.p>

          <motion.button 
            className="px-12 py-5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-all shadow-2xl relative overflow-hidden group"
            style={{ fontFamily: 'var(--font-sans)' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <span className="relative z-10 font-semibold tracking-wide">Découvrir nos spécialités</span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </motion.div>

        {/* Animated Scroll Indicator */}
        <motion.button 
          onClick={scrollToContent}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer group"
          aria-label="Scroll down"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm uppercase tracking-widest text-white/70" style={{ fontFamily: 'var(--font-sans)' }}>
              Découvrir
            </span>
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
              <motion.div
                className="w-1.5 h-1.5 bg-white rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.button>
      </div>
    </section>
  );
}
