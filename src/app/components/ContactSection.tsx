import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react';
import { useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import settings from '../../settings.json';
import { Badge } from './ui/badge';
import { useHomepage, useSiteSettings, useOpeningHours, type OpeningHours, type DaySchedule } from '../../hooks/useSanity';

/**
 * Contact Section - Performance Optimized
 * 
 * Key optimizations:
 * - No Framer Motion (pure CSS transitions)
 * - Memoized component
 * - content-visibility for lazy rendering
 * - CSS-only hover effects
 */
export const ContactSection = memo(function ContactSection() {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const { data: homepageData } = useHomepage();
  const { data: siteSettings } = useSiteSettings();
  const { data: openingHours } = useOpeningHours();
  const currentLang = (i18n.language as 'fr' | 'de') || 'fr';

  const contactData = homepageData?.contactSection;

  // Dynamic Contact Info with fallback
  const phone = siteSettings?.contact?.phone || settings.info.phone;
  const phoneRaw = phone.replace(/\s+/g, '');
  const email = siteSettings?.contact?.email || settings.info.email;

  const addressStreet = siteSettings?.contact?.address?.street || settings.info.address.split(',')[0];
  const addressCity = siteSettings?.contact?.address?.city || settings.info.address.split(',')[1]?.trim() || '';
  const addressZip = siteSettings?.contact?.address?.postalCode || '';
  const addressCountry = siteSettings?.contact?.address?.country || '';

  const fullAddress = siteSettings?.contact?.address
    ? `${addressStreet}, ${addressZip} ${addressCity}`
    : settings.info.address;

  const addressMap = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress + ' Boucherie Vaz')}`;

  const facebookUrl = siteSettings?.socialMedia?.facebook || settings.info.facebook;
  const instagramUrl = siteSettings?.socialMedia?.instagram || settings.info.instagram;

  const getCurrentStatus = () => {
    if (!openingHours) return { isOpen: false, currentDay: 0 };

    const now = new Date();
    const day = now.getDay();
    const currentTime = now.getHours() * 100 + now.getMinutes();

    const dayKeys: (keyof OpeningHours)[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const todayKey = dayKeys[day] as keyof OpeningHours;
    const todaySchedule = openingHours[todayKey] as DaySchedule;

    if (!todaySchedule || todaySchedule.closed) return { isOpen: false, currentDay: day };

    // Parse time strings 'HH:MM - HH:MM' to numbers HHMM
    const parseTime = (timeStr?: string) => {
      if (!timeStr) return null;
      const [start, end] = timeStr.split('-').map(s => parseInt(s.trim().replace(':', '')));
      return { start, end };
    };

    const morning = parseTime(todaySchedule.morning);
    const afternoon = parseTime(todaySchedule.afternoon);

    const inMorning = morning ? (currentTime >= morning.start && currentTime < morning.end) : false;
    const inAfternoon = afternoon ? (currentTime >= afternoon.start && currentTime < afternoon.end) : false;

    return {
      isOpen: inMorning || inAfternoon,
      currentDay: day
    };
  };

  const { currentDay } = getCurrentStatus();

  // Helper to get simple time string from Sanity format
  const formatSchedule = (schedule?: DaySchedule) => {
    if (!schedule) return { matin: null, apresMidi: null, isClosed: true };
    return {
      matin: schedule.morning || null,
      apresMidi: schedule.afternoon || null,
      isClosed: schedule.closed
    };
  };

  const horaires = openingHours ? [
    { id: 1, jour: t('contact.days.monday', 'Lundi'), ...formatSchedule(openingHours.monday) },
    { id: 2, jour: t('contact.days.tuesday', 'Mardi'), ...formatSchedule(openingHours.tuesday) },
    { id: 3, jour: t('contact.days.wednesday', 'Mercredi'), ...formatSchedule(openingHours.wednesday) },
    { id: 4, jour: t('contact.days.thursday', 'Jeudi'), ...formatSchedule(openingHours.thursday) },
    { id: 5, jour: t('contact.days.friday', 'Vendredi'), ...formatSchedule(openingHours.friday) },
    { id: 6, jour: t('contact.days.saturday', 'Samedi'), ...formatSchedule(openingHours.saturday) },
    { id: 0, jour: t('contact.days.sunday', 'Dimanche'), ...formatSchedule(openingHours.sunday) }
  ] : [
    { id: 1, jour: t('contact.days.monday', 'Lundi'), matin: '07:00 - 12:00', apresMidi: '13:30 - 18:00', isClosed: false },
    { id: 2, jour: t('contact.days.tuesday', 'Mardi'), matin: '07:00 - 12:00', apresMidi: '13:30 - 18:00', isClosed: false },
    { id: 3, jour: t('contact.days.wednesday', 'Mercredi'), matin: '07:00 - 12:00', apresMidi: null, isClosed: false },
    { id: 4, jour: t('contact.days.thursday', 'Jeudi'), matin: '08:00 - 12:00', apresMidi: '13:30 - 18:00', isClosed: false },
    { id: 5, jour: t('contact.days.friday', 'Vendredi'), matin: '07:00 - 12:00', apresMidi: '13:30 - 18:00', isClosed: false },
    { id: 6, jour: t('contact.days.saturday', 'Samedi'), matin: '07:00 - 13:00', apresMidi: null, isClosed: false },
    { id: 0, jour: t('contact.days.sunday', 'Dimanche'), matin: null, apresMidi: null, isClosed: true }
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = formData.name.trim();
    const emailUser = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !emailUser || !message) {
      alert(t('contact.alertFill', 'Merci de remplir tous les champs.'));
      return;
    }

    const subject = encodeURIComponent(`${t('contact.emailSubject', 'Message depuis le site')} - ${name}`);
    const body = encodeURIComponent(`${t('contact.emailBody.name', 'Nom')}: ${name}\nEmail: ${emailUser}\n\n${t('contact.emailBody.message', 'Message')}:\n${message}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const contactCards = [
    { icon: Phone, label: t('contact.labels.phone', 'Téléphone'), value: phone, href: `tel:${phoneRaw}` },
    { icon: Mail, label: t('contact.labels.email', 'Email'), value: email, href: `mailto:${email}` },
    { icon: MapPin, label: t('contact.labels.address', 'Adresse'), value: fullAddress, href: addressMap },
  ];

  return (
    <section id="contact" className="py-12 md:py-24 px-4 md:px-8 bg-muted/30 relative overflow-hidden scroll-mt-20 content-auto">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-gold/10 text-gold rounded-full text-sm md:text-base font-bold tracking-wider uppercase mb-3 font-sans">
            {contactData?.subtitle?.[currentLang] || t('contact.subtitle', 'Parlons ensemble')}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 font-bold font-serif">
            {contactData?.title?.[currentLang] || t('contact.title', 'Contactez-nous')}
          </h2>
        </div>

        {/* Contact Info Grid - CSS-only animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactCards.map((contact, index) => (
            <a
              key={index}
              href={contact.href}
              target={contact.icon === MapPin ? '_blank' : undefined}
              rel={contact.icon === MapPin ? 'noopener noreferrer' : undefined}
              className="bg-card p-6 rounded-2xl shadow-xl flex items-center gap-4 group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 flex-shrink-0 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <contact.icon size={24} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{contact.label}</p>
                <p className="font-bold text-foreground text-base sm:text-lg truncate font-sans">{contact.value}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start mb-12">
          {/* Form */}
          <div className="lg:col-span-2 bg-card rounded-2xl p-6 md:p-8 shadow-xl h-full">
            <h3 className="text-2xl font-bold mb-6 font-serif">
              {t('contact.formTitle', 'Envoyez-nous un message')}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder={t('contact.placeholders.name', 'Votre nom')}
                className="w-full px-4 py-3 bg-muted/50 rounded-xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-base font-medium"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder={t('contact.placeholders.email', 'Votre email')}
                className="w-full px-4 py-3 bg-muted/50 rounded-xl border-0 focus:ring-2 focus:ring-primary/20 transition-all font-sans text-base font-medium"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <textarea
                placeholder={t('contact.placeholders.message', 'Votre message')}
                rows={3}
                className="w-full px-4 py-3 bg-muted/50 rounded-xl border-0 focus:ring-2 focus:ring-primary/20 transition-all resize-none font-sans text-base font-medium"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
              <button
                type="submit"
                className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:brightness-110 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary/20 font-sans"
              >
                {t('contact.submit', 'Envoyer')}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-border/50">
              <p className="text-base font-bold text-foreground/80 mb-4 font-sans text-center">
                {t('contact.followUs', 'Suivez-nous')}
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-[#E4405F]/10 hover:bg-gradient-to-tr hover:from-[#405DE6] hover:via-[#E1306C] hover:to-[#FFDC80] text-[#E4405F] hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="lg:col-span-3 bg-card rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                <Clock size={24} />
              </div>
              <h3 className="font-bold text-2xl font-serif">
                {t('contact.hoursTitle', "Horaires d'ouverture")}
              </h3>
            </div>

            <div className="space-y-2">
              {horaires.map((horaire) => {
                const isToday = horaire.id === currentDay;

                return (
                  <div
                    key={horaire.id}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl transition-all duration-300 ${isToday
                      ? 'bg-primary/5 border border-primary/20 shadow-inner'
                      : 'bg-muted/30'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`font-bold text-base ${isToday ? 'text-primary' : (horaire.isClosed ? 'text-foreground/40' : 'text-foreground')}`}>
                        {horaire.jour}
                      </span>
                      {isToday && (
                        <Badge className="bg-primary hover:bg-primary text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5">
                          {t('contact.today', 'Aujourd\'hui')}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-4 mt-2 sm:mt-0">
                      {horaire.isClosed ? (
                        <span className="text-xs font-bold uppercase tracking-widest text-foreground/40 italic">
                          {t('closed', 'Fermé')}
                        </span>
                      ) : (
                        <div className="flex items-center gap-8">
                          {horaire.matin && (
                            <div className="text-right">
                              <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-tighter leading-none mb-1">{t('contact.morning', 'Matin')}</p>
                              <p className={`text-sm font-bold ${isToday ? 'text-foreground' : 'text-foreground/80'}`}>{horaire.matin}</p>
                            </div>
                          )}
                          {horaire.apresMidi && (
                            <div className="text-right">
                              <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-tighter leading-none mb-1">{t('contact.afternoon', 'Après-midi')}</p>
                              <p className={`text-sm font-bold ${isToday ? 'text-foreground' : 'text-foreground/80'}`}>{horaire.apresMidi}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="bg-card rounded-2xl overflow-hidden shadow-xl h-[450px] group relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2747.381559828854!2d6.331591076891081!3d46.70194734346083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478f2d9c8a7d8d8d%3A0x1234567890abcdef!2sRue%20du%20Faubourg%205%2C%201337%20Vallorbe!5e0!3m2!1sfr!2sch!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${t('contact.labels.address', 'Adresse')} - Rue du Faubourg 5, Vallorbe`}
            className="grayscale group-hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </div>
    </section>
  );
});

