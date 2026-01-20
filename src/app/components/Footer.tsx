import { Facebook, Instagram, Mail, MapPin, Phone, Clock } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { OptimizedImage } from './OptimizedImage';
import defaultSettings from '../../settings.json';
import { useSiteSettings, useOpeningHours, type OpeningHours, type DaySchedule } from '../../hooks/useSanity';
import { urlFor } from '../../lib/sanity/image';

/**
 * Footer - Performance Optimized + Sanity CMS
 * 
 * Key optimizations:
 * - No Framer Motion (pure CSS transitions)
 * - Memoized component
 * - CSS-only hover effects
 * - Dynamic data from Sanity
 */
export const Footer = memo(function Footer() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { data: sanitySettings } = useSiteSettings();
  const { data: openingHours } = useOpeningHours();
  const currentYear = new Date().getFullYear();
  const currentLang = (i18n.language as 'fr' | 'de') || 'fr';

  // Fallback to local settings if Sanity data is not yet available
  const facebookUrl = sanitySettings?.socialMedia?.facebook || defaultSettings.info.facebook;
  const instagramUrl = sanitySettings?.socialMedia?.instagram || defaultSettings.info.instagram;
  const email = sanitySettings?.contact?.email || defaultSettings.info.email;
  const phone = sanitySettings?.contact?.phone || defaultSettings.info.phone;
  // Sanity phone might be formatted, strict raw for tel: link if needed, but usually phone field is string
  const phoneRaw = phone.replace(/\s+/g, '');

  const addressStreet = sanitySettings?.contact?.address?.street || defaultSettings.info.address.split(',')[0];
  const addressCity = sanitySettings?.contact?.address?.city || defaultSettings.info.address.split(',')[1].trim().split(' ')[1];
  const addressZip = sanitySettings?.contact?.address?.postalCode || defaultSettings.info.address.split(',')[1].trim().split(' ')[0];
  const fullAddress = `${addressStreet}, ${addressZip} ${addressCity}`;

  // Generate Maps link if not present
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress + ' Boucherie Vaz')}`;

  const logoUrl = sanitySettings?.logo
    ? urlFor(sanitySettings.logo).width(200).url()
    : defaultSettings.images.logo;

  const siteName = sanitySettings?.siteName?.[currentLang] || "Boucherie Vaz";
  const footerText = sanitySettings?.footer?.text?.[currentLang] || t('footer.description');

  const socialLinks = [
    { icon: Facebook, href: facebookUrl, label: 'Facebook' },
    { icon: Instagram, href: instagramUrl, label: 'Instagram' },
    { icon: Mail, href: `mailto:${email}`, label: 'Email' }
  ];

  const quickLinks = [
    { label: t('nav.home'), href: '#accueil' },
    { label: t('nav.about'), href: '#a-propos' },
    { label: t('nav.products'), href: '#produits' },
    { label: t('nav.contact'), href: '#contact' }
  ];

  const formatFooterHours = (schedule?: DaySchedule) => {
    if (!schedule || schedule.closed) return { text: t('closed'), closed: true };
    const morning = schedule.morning ? schedule.morning.replace(' - ', '-') : '';
    const afternoon = schedule.afternoon ? schedule.afternoon.replace(' - ', '-') : '';

    if (morning && afternoon) return { text: `${morning} | ${afternoon}`, closed: false };
    if (morning) return { text: morning, closed: false };
    if (afternoon) return { text: afternoon, closed: false };
    return { text: t('closed'), closed: true };
  };

  const hours = openingHours ? [
    { jour: t('contact.days.monday', 'Lundi'), ...formatFooterHours(openingHours.monday) },
    { jour: t('contact.days.tuesday', 'Mardi'), ...formatFooterHours(openingHours.tuesday) },
    { jour: t('contact.days.wednesday', 'Mercredi'), ...formatFooterHours(openingHours.wednesday) },
    { jour: t('contact.days.thursday', 'Jeudi'), ...formatFooterHours(openingHours.thursday) },
    { jour: t('contact.days.friday', 'Vendredi'), ...formatFooterHours(openingHours.friday) },
    { jour: t('contact.days.saturday', 'Samedi'), ...formatFooterHours(openingHours.saturday) },
    { jour: t('contact.days.sunday', 'Dimanche'), ...formatFooterHours(openingHours.sunday) }
  ] : [
    { jour: t('days.monTue'), text: '07:00-12:00 | 13:30-18:00', closed: false },
    { jour: t('days.wednesday'), text: '07:00-12:00', closed: false },
    { jour: t('days.thursday'), text: '08:00-12:00 | 13:30-18:00', closed: false },
    { jour: t('days.friday'), text: '07:00-12:00 | 13:30-18:00', closed: false },
    { jour: t('days.saturday'), text: '07:00-13:00', closed: false },
    { jour: t('days.sunday'), text: t('closed'), closed: true },
  ];

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    const targetPath = `/${i18n.language}`;
    if (window.location.pathname === targetPath || window.location.pathname === `${targetPath}/`) {
      e.preventDefault();
      const id = href.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `/${i18n.language}${href}`);
      }
    } else {
      e.preventDefault();
      navigate(`/${i18n.language}${href}`);
    }
  };

  return (
    <footer className="bg-foreground text-background relative overflow-hidden font-sans">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="py-16 px-4 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center border-4 border-[#C5A059] overflow-hidden transition-transform duration-700 hover:rotate-[360deg]">
                  <OptimizedImage
                    src={logoUrl}
                    alt={siteName}
                    className="w-full h-full object-contain scale-105"
                  />
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold font-serif">
                    {siteName}
                  </p>
                  <p className="text-base md:text-lg text-background/75 font-medium">
                    {t('footer.tagline')}
                  </p>
                </div>
              </div>
              <p className="text-base md:text-lg text-background/80 leading-relaxed mb-6 max-w-md font-normal">
                {footerText}
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-background/10 hover:bg-gold rounded-lg flex items-center justify-center transition-all duration-300 text-background hover:-translate-y-1"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 font-serif">
                {t('footer.navigation')}
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li
                    key={index}
                    className="transition-transform duration-300 hover:translate-x-1"
                  >
                    <a
                      href={`/${i18n.language}${link.href}`}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-base md:text-lg text-background/85 hover:text-primary transition-colors duration-200 inline-flex items-center gap-2 group font-medium"
                    >
                      <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 font-serif">
                {t('footer.contact')}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <a
                    href={mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base md:text-lg text-background/80 hover:text-primary transition-colors duration-200 font-medium"
                  >
                    {addressStreet}<br />
                    {addressZip} {addressCity}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                  <a href={`tel:${phoneRaw}`} className="text-base md:text-lg text-background/85 hover:text-primary transition-colors duration-200 font-medium">
                    {phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0" />
                  <a href={`mailto:${email}`} className="text-base md:text-lg text-background/85 hover:text-primary transition-colors duration-200 break-all font-medium">
                    {email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Hours Section (Static for now, could be dynamic from Sanity too) */}
          <div className="mb-12 pb-8 border-b border-background/10">
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
                  <span className="block text-background/60">{horaire.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm md:text-base text-background/60 font-normal">
              <p>
                © {currentYear} {siteName}. {t('footer.rights')}
              </p>
              <div className="flex gap-6">
                <Link
                  to={`/${i18n.language}/mentions-legales`}
                  className="hover:text-primary transition-colors duration-200 cursor-pointer"
                >
                  {t('legalContent.title')}
                </Link>
                <Link
                  to={`/${i18n.language}/politique-confidentialite`}
                  className="hover:text-primary transition-colors duration-200 cursor-pointer"
                >
                  {t('privacyContent.title')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-0" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-0" />
    </footer>
  );
});

