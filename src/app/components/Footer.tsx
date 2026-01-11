import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'motion/react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      <div className="py-16 px-4 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <motion.div 
              className="md:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div 
                  className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-primary-foreground text-2xl font-bold" style={{ fontFamily: 'var(--font-serif)' }}>
                    VAZ
                  </span>
                </motion.div>
                <div>
                  <p className="text-xl font-bold" style={{ fontFamily: 'var(--font-serif)' }}>
                    Boucherie Vaz
                  </p>
                  <p className="text-sm text-background/60" style={{ fontFamily: 'var(--font-sans)' }}>
                    L'art de la viande depuis 2025
                  </p>
                </div>
              </div>
              <p className="text-background/70 leading-relaxed mb-6 max-w-md" style={{ fontFamily: 'var(--font-sans)' }}>
                Une boucherie-charcuterie artisanale au cœur de Vallorbe, 
                où tradition et excellence se rencontrent pour vous offrir 
                le meilleur de la gastronomie locale.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: '#', label: 'Facebook' },
                  { icon: Instagram, href: '#', label: 'Instagram' },
                  { icon: Mail, href: 'mailto:boucherievaz@gmail.com', label: 'Email' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-background/10 hover:bg-primary rounded-xl flex items-center justify-center transition-all"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                Navigation
              </h3>
              <ul className="space-y-3" style={{ fontFamily: 'var(--font-sans)' }}>
                {['Accueil', 'Nos Métiers', 'Produits', 'À propos', 'Contact'].map((link, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5 }}
                  >
                    <a href={`#${link.toLowerCase()}`} className="text-background/70 hover:text-primary transition-colors inline-flex items-center gap-2 group">
                      <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                Contact
              </h3>
              <ul className="space-y-4" style={{ fontFamily: 'var(--font-sans)' }}>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-background/70">
                    Rue du faubourg 5<br />
                    1337 Vallorbe
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href="tel:+41218431109" className="text-sm text-background/70 hover:text-primary transition-colors">
                    +41 21 843 11 09
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href="mailto:boucherievaz@gmail.com" className="text-sm text-background/70 hover:text-primary transition-colors break-all">
                    boucherievaz@gmail.com
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div 
            className="pt-8 border-t border-background/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/60" style={{ fontFamily: 'var(--font-sans)' }}>
              <p>
                © {currentYear} Boucherie Vaz. Tous droits réservés.
              </p>
              <div className="flex gap-6">
                <motion.a 
                  href="#" 
                  className="hover:text-primary transition-colors"
                  whileHover={{ y: -2 }}
                >
                  Mentions légales
                </motion.a>
                <motion.a 
                  href="#" 
                  className="hover:text-primary transition-colors"
                  whileHover={{ y: -2 }}
                >
                  Politique de confidentialité
                </motion.a>
                <motion.a 
                  href="#" 
                  className="hover:text-primary transition-colors"
                  whileHover={{ y: -2 }}
                >
                  CGV
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-0" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-0" />
    </footer>
  );
}
