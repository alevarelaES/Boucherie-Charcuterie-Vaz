import { Facebook, Instagram, Mail, MapPin, Phone, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary to-transparent" />
      
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
                  className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-2xl flex items-center justify-center p-2"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <img 
                    src="/images/logo/Boucherie Charcuterie Vaz sans fond.png" 
                    alt="Boucherie Vaz" 
                    className="w-full h-full object-contain"
                  />
                </motion.div>
                <div>
                  <p className="text-xl font-bold" style={{ fontFamily: 'var(--font-serif)' }}>
                    Boucherie Vaz
                  </p>
                  <p className="text-sm text-background/75" style={{ fontFamily: 'var(--font-sans)' }}>
                    L'art de la viande depuis 2025
                  </p>
                </div>
              </div>
              <p className="text-background/80 leading-relaxed mb-6 max-w-md" style={{ fontFamily: 'var(--font-sans)' }}>
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
                {[
                  { label: 'Accueil', href: '#accueil' },
                  { label: 'Notre entreprise', href: '#metiers' },
                  { label: 'Produits', href: '#produits' },
                  { label: 'À propos', href: '#a-propos' },
                  { label: 'Contact', href: '#contact' }
                ].map((link, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5 }}
                  >
                    <a href={link.href} className="text-background/85 hover:text-primary transition-colors inline-flex items-center gap-2 group">
                      <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
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
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Rue+du+faubourg+5,+1337+Vallorbe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-background/80 hover:text-primary transition-colors"
                  >
                    Rue du faubourg 5<br />
                    1337 Vallorbe
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href="tel:+41218431109" className="text-sm text-background/85 hover:text-primary transition-colors">
                    +41 21 843 11 09
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href="mailto:boucherievaz@gmail.com" className="text-sm text-background/85 hover:text-primary transition-colors break-all">
                    boucherievaz@gmail.com
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Horaires Section */}
          <motion.div 
            className="mb-12 pb-8 border-b border-background/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ fontFamily: 'var(--font-serif)' }}>
                Horaires
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-xs text-background/60" style={{ fontFamily: 'var(--font-sans)' }}>
              {[
                { jour: 'Lun-Jeu', heures: '07:00-12:00 | 13:30-18:00' },
                { jour: 'Vendredi', heures: '07:00-12:00 | 13:30-18:00' },
                { jour: 'Samedi', heures: '07:00-13:00' },
                { jour: 'Dimanche', heures: 'Fermé', closed: true },
              ].map((horaire, index) => (
                <div 
                  key={index}
                  className={`${horaire.closed ? 'text-background/40 italic' : ''}`}
                >
                  <span className="font-semibold text-background/80">{horaire.jour}</span>
                  <span className="block text-background/60">{horaire.heures}</span>
                </div>
              ))}
            </div>
          </motion.div>

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
