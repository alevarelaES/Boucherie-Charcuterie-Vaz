import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import settings from '../../settings.json';
import { OptimizedImage } from './OptimizedImage';
import { Badge } from './ui/badge';

export function ContactSection() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const getCurrentStatus = () => {
    const now = new Date();
    const day = now.getDay(); // 0 is Sunday, 1 is Monday...
    const currentTime = now.getHours() * 100 + now.getMinutes();

    const schedule: Record<number, { morning?: [number, number], afternoon?: [number, number] }> = {
      1: { morning: [700, 1200], afternoon: [1330, 1800] },
      2: { morning: [700, 1200], afternoon: [1330, 1800] },
      3: { morning: [700, 1200], afternoon: [1330, 1800] },
      4: { morning: [700, 1200], afternoon: [1330, 1800] },
      5: { morning: [700, 1200], afternoon: [1330, 1800] },
      6: { morning: [700, 1300] },
      0: {}, // Closed
    };

    const today = schedule[day];
    if (!today) return { isOpen: false, nextStatus: '' };

    const inMorning = today.morning && currentTime >= today.morning[0] && currentTime < today.morning[1];
    const inAfternoon = today.afternoon && currentTime >= today.afternoon[0] && currentTime < today.afternoon[1];

    const isOpen = inMorning || inAfternoon;

    return {
      isOpen,
      currentDay: day
    };
  };

  const { isOpen, currentDay } = getCurrentStatus();

  const horaires = [
    { id: 1, jour: t('contact.days.monday', 'Lundi'), matin: '07:00 - 12:00', apresMidi: '13:30 - 18:00', isClosed: false },
    { id: 2, jour: t('contact.days.tuesday', 'Mardi'), matin: '07:00 - 12:00', apresMidi: '13:30 - 18:00', isClosed: false },
    { id: 3, jour: t('contact.days.wednesday', 'Mercredi'), matin: '07:00 - 12:00', apresMidi: '13:30 - 18:00', isClosed: false },
    { id: 4, jour: t('contact.days.thursday', 'Jeudi'), matin: '07:00 - 12:00', apresMidi: '13:30 - 18:00', isClosed: false },
    { id: 5, jour: t('contact.days.friday', 'Vendredi'), matin: '07:00 - 12:00', apresMidi: '13:30 - 18:00', isClosed: false },
    { id: 6, jour: t('contact.days.saturday', 'Samedi'), matin: '07:00 - 13:00', apresMidi: null, isClosed: false },
    { id: 0, jour: t('contact.days.sunday', 'Dimanche'), matin: null, apresMidi: null, isClosed: true }
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      alert(t('contact.alertFill', 'Merci de remplir tous les champs.'));
      return;
    }

    const subject = encodeURIComponent(`${t('contact.emailSubject', 'Message depuis le site')} - ${name}`);
    const body = encodeURIComponent(`${t('contact.emailBody.name', 'Nom')}: ${name}\nEmail: ${email}\n\n${t('contact.emailBody.message', 'Message')}:\n${message}`);
    window.location.href = `mailto:${settings.info.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-12 md:py-24 px-4 md:px-8 bg-muted/30 relative overflow-hidden scroll-mt-20">
      {/* Decorative background elements consistent with whole site */}
      <motion.div
        className="absolute inset-x-0 -top-40 -bottom-40 z-0 opacity-[0.03] pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.03 }}
        viewport={{ once: true }}
      >
        <OptimizedImage
          src={settings.images.hero}
          alt=""
          className="w-full h-full object-cover blur-3xl scale-150"
        />
      </motion.div>

      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary to-transparent opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-gold/10 text-gold rounded-full text-sm md:text-base font-bold tracking-wider uppercase mb-3 font-sans"
          >
            {t('contact.subtitle', 'Parlons ensemble')}
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 font-bold font-serif">
            {t('contact.title', 'Contactez-nous')}
          </h2>
        </motion.div>

        {/* TOP: Contact Info Grid - 3 cards on one row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Phone, label: t('contact.labels.phone', 'Téléphone'), value: settings.info.phone, href: `tel:${settings.info.phoneRaw}` },
            { icon: Mail, label: t('contact.labels.email', 'Email'), value: settings.info.email, href: `mailto:${settings.info.email}` },
            { icon: MapPin, label: t('contact.labels.address', 'Adresse'), value: settings.info.address, href: settings.info.addressMap },
          ].map((contact, index) => (
            <motion.a
              key={index}
              href={contact.href}
              target={contact.icon === MapPin ? '_blank' : undefined}
              rel={contact.icon === MapPin ? 'noopener noreferrer' : undefined}
              className="bg-card p-6 rounded-2xl shadow-xl flex items-center gap-4 group transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-12 h-12 flex-shrink-0 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <contact.icon size={24} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{contact.label}</p>
                <p className="font-bold text-foreground text-base sm:text-lg truncate font-sans">{contact.value}</p>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start mb-12">
          {/* MIDDLE LEFT: Messaging Form (2/5 size) */}
          <motion.div
            className="lg:col-span-2 bg-card rounded-2xl p-6 md:p-8 shadow-xl h-full"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
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
              <motion.button
                type="submit"
                className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20 font-sans"
                whileHover={{ scale: 1.01 }}
              >
                {t('contact.submit', 'Envoyer')}
              </motion.button>
            </form>
          </motion.div>

          {/* MIDDLE RIGHT: Horaires (3/5 size) */}
          <motion.div
            className="lg:col-span-3 bg-card rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
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
                  <motion.div
                    key={horaire.id}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl transition-all duration-300 ${isToday
                      ? 'bg-primary/5 border border-primary/20 shadow-inner'
                      : 'bg-muted/30'
                      }`}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
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
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* BOTTOM: Massive Map - Full width */}
        <motion.div
          className="bg-card rounded-2xl overflow-hidden shadow-xl h-[450px] group relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
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
        </motion.div>
      </div>
    </section>

  );
}
