import { ChevronDown, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect } from 'react';

export function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const handleNavClick = (href: string) => {
    // Fermer le menu immédiatement
    setMobileMenuOpen(false);
    
    // Attendre que le menu soit fermé avant de scroller (animation de 250ms)
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  const navItems = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'Produits', href: '#produits' },
    { label: 'À propos', href: '#a-propos' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <section id="accueil" className="relative min-h-screen w-full overflow-hidden scroll-mt-20">
      {/* Contact Info Bar - Fixed at the very top */}
      <motion.div 
        className="hidden md:block fixed top-0 left-0 right-0 bg-secondary/80 backdrop-blur-md text-secondary-foreground py-3 px-8 z-[60] border-b border-primary/20"
        initial={{ y: -100 }}
        animate={{ y: scrolled ? -100 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4 text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
          <motion.a 
            href="https://www.google.com/maps/search/?api=1&query=Rue+du+faubourg+5,+1337+Vallorbe"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-primary">📍</span>
            <span>Rue du faubourg 5, 1337 Vallorbe</span>
          </motion.a>
          <motion.a 
            href="tel:+41218431109"
            className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-primary">📞</span>
            <span>+41 21 843 11 09</span>
          </motion.a>
          <motion.a 
            href="mailto:boucherievaz@gmail.com"
            className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-primary">✉️</span>
            <span>boucherievaz@gmail.com</span>
          </motion.a>
        </div>
      </motion.div>

      {/* Background Image with Parallax Effect */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <ImageWithFallback 
          src="/images/Boucherie vaz Viandes.jpeg"
          alt="Boucherie Vaz - L'art de la viande" 
          className="w-full h-full object-cover"
          loading="eager"
          fetchpriority="high"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70" />
      </motion.div>

      {/* Animated Logo with Glass Morphism */}
      <motion.div 
        className="hidden md:block absolute top-20 left-8 z-20"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <motion.div 
          className="bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-2xl"
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img 
            src="/images/logo/Boucherie Charcuterie Vaz sans fond.png" 
            alt="Boucherie Vaz" 
            className="w-16 h-16 lg:w-20 lg:h-20 object-contain"
          />
        </motion.div>
      </motion.div>

      {/* Sticky Navbar - always visible on mobile, appears on scroll on desktop */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-lg shadow-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a 
              href="#accueil"
              className="flex items-center gap-3"
            >
              <img 
                src="/images/logo/Boucherie Charcuterie Vaz sans fond.png" 
                alt="Boucherie Vaz" 
                className="h-10 w-10 object-contain"
              />
              <span className="text-lg font-bold text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>
                Boucherie Vaz
              </span>
            </a>

            {/* Mobile Menu Button */}
            <button
              className="text-foreground p-2 rounded-lg hover:bg-muted"
              aria-label="Ouvrir le menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="bg-white/95 backdrop-blur-lg border-t border-gray-200/60 shadow-lg"
            >
              <div className="max-w-7xl mx-auto px-4 pb-4">
                <ul className="flex flex-col divide-y divide-gray-200/70" style={{ fontFamily: 'var(--font-sans)' }}>
                  {navItems.map((item) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                    >
                      <a
                        href={item.href}
                        className="flex items-center justify-between py-3 text-foreground/90 hover:text-primary"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.href);
                        }}
                      >
                        <span className="font-semibold">{item.label}</span>
                        <ChevronDown className="w-4 h-4 text-primary" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Desktop Navbar - appears on scroll */}
      <motion.nav
        className="hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        initial={{ y: -100 }}
        animate={{ y: scrolled ? 0 : -100 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className="bg-white/85 backdrop-blur-lg shadow-lg border-b border-gray-200/50">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <motion.a 
                href="#accueil"
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src="/images/logo/Boucherie Charcuterie Vaz sans fond.png" 
                  alt="Boucherie Vaz" 
                  className="h-10 w-10 object-contain"
                />
                <span className="text-lg font-bold text-foreground" style={{ fontFamily: 'var(--font-serif)' }}>
                  Boucherie Vaz
                </span>
              </motion.a>

              {/* Navigation Links */}
              <ul className="hidden md:flex items-center gap-8" style={{ fontFamily: 'var(--font-sans)' }}>
                {navItems.map((item, index) => (
                  <motion.li 
                    key={item.label}
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <motion.a 
                      href={item.href}
                      className="text-foreground/95 hover:text-primary transition-colors relative group font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                    </motion.a>
                  </motion.li>
                ))}
              </ul>

              {/* Contact Button */}
              <motion.a
                href="#contact"
                className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-semibold hover:bg-primary/90 transition-all shadow-md"
                style={{ fontFamily: 'var(--font-sans)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
              >
                Contact
              </motion.a>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Animated Navigation (initial - kept for Hero) */}
      <motion.nav 
        className="absolute top-20 right-4 md:right-8 z-20 hidden md:block"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <ul className="flex gap-8 bg-white/10 backdrop-blur-md px-8 py-4 rounded-full border border-white/20" style={{ fontFamily: 'var(--font-sans)' }}>
          {navItems.map((item, index) => (
            <motion.li 
              key={item.label}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <motion.a 
                href={item.href}
                className="text-white hover:text-primary transition-colors relative group"
                whileHover={{ scale: 1.1 }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </motion.a>
            </motion.li>
          ))}
        </ul>
      </motion.nav>

      {/* Hero Content with Staggered Animation - Centered Vertically */}
      <div className="relative min-h-screen flex flex-col items-center justify-center text-white px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center max-w-5xl"
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
              Boucherie Vaz · Vallorbe
            </span>
          </motion.div>

          <h1 
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-6 max-w-4xl md:max-w-5xl leading-tight md:leading-[1.05]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            La boucherie proche de chez vous
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-base sm:text-lg md:text-xl text-white/80 mb-12 md:mb-16 max-w-3xl mx-auto"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Née en 2025 avec une idée claire : prêcher avant tout la qualité. Chaque viande est choisie avec exigence et préparée avec un savoir-faire artisanal, pour offrir un accueil chaleureux et des produits d’exception à Vallorbe.
          </motion.p>
        </motion.div>

        {/* Animated Scroll Indicator */}
        <motion.button 
          onClick={scrollToContent}
          className="mt-8 cursor-pointer group"
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
