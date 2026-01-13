import { Facebook, Instagram, Mail, MapPin, Phone, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { OptimizedImage } from './OptimizedImage';
import settings from '../../settings.json';

export function Footer() {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: settings.info.facebook, label: 'Facebook' },
    { icon: Instagram, href: settings.info.instagram, label: 'Instagram' },
    { icon: Mail, href: `mailto:${settings.info.email}`, label: 'Email' }
  ];

  const quickLinks = [
    { label: t('nav.home'), href: '#accueil' },
    { label: t('nav.about'), href: '#a-propos' },
    { label: t('nav.products'), href: '#produits' },
    { label: t('nav.contact'), href: '#contact' }
  ];

  const hours = [
    { jour: t('days.monThu'), heures: '07:00-12:00 | 13:30-18:00' },
    { jour: t('days.friday'), heures: '07:00-12:00 | 13:30-18:00' },
    { jour: t('days.saturday'), heures: '07:00-13:00' },
    { jour: t('days.sunday'), heures: t('closed'), closed: true },
  ];

  return (
    <footer className="bg-foreground text-background relative overflow-hidden font-sans">
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
                  className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-2xl flex items-center justify-center p-2"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <OptimizedImage
                    src={settings.images.logo}
                    alt="Boucherie Vaz"
                    className="w-full h-full object-contain"
                    priority
                  />
                </motion.div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold font-serif">
                    Boucherie Vaz
                  </p>
                  <p className="text-base md:text-lg text-background/75 font-medium">
                    {t('footer.tagline')}
                  </p>
                </div>
              </div>
              <p className="text-base md:text-lg text-background/80 leading-relaxed mb-6 max-w-md font-normal">
                {t('footer.description')}
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-background/10 hover:bg-gold rounded-lg flex items-center justify-center transition-all text-background"
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
              <h3 className="text-xl md:text-2xl font-bold mb-4 font-serif">
                {t('footer.navigation')}
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                  >
                    <a href={`/${i18n.language}/${link.href}`} className="text-base md:text-lg text-background/85 hover:text-primary transition-colors inline-flex items-center gap-2 group font-medium">
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
              <h3 className="text-xl md:text-2xl font-bold mb-4 font-serif">
                {t('footer.contact')}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <a
                    href={settings.info.addressMap}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base md:text-lg text-background/80 hover:text-primary transition-colors font-medium"
                  >
                    {settings.info.address.split(',')[0]}<br />
                    {settings.info.address.split(',')[1]}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                  <a href={`tel:${settings.info.phoneRaw}`} className="text-base md:text-lg text-background/85 hover:text-primary transition-colors font-medium">
                    {settings.info.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0" />
                  <a href={`mailto:${settings.info.email}`} className="text-base md:text-lg text-background/85 hover:text-primary transition-colors break-all font-medium">
                    {settings.info.email}
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
              <Clock className="w-6 h-6 text-primary" />
              <h3 className="text-base md:text-lg font-bold uppercase tracking-wider font-serif">
                {t('footer.hours')}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm md:text-base text-background/60">
              {hours.map((horaire, index) => (
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
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm md:text-base text-background/60 font-normal">
              <p>
                © {currentYear} Boucherie Vaz. {t('footer.rights')}
              </p>
              <div className="flex gap-6">
                <Link
                  to={`/${i18n.language}/mentions-legales`}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  {t('legalContent.title')}
                </Link>
                <Link
                  to={`/${i18n.language}/politique-confidentialite`}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  {t('privacyContent.title')}
                </Link>
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
