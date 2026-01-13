import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import settings from '../../settings.json';

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
    <section id="contact" className="py-12 md:py-20 px-4 md:px-8 bg-background relative overflow-hidden scroll-mt-20">
      {/* Decroative Circles */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
            {t('contact.subtitle', 'Parlons ensemble')}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-serif mb-4">
            {t('contact.title', 'Contactez-nous')}
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Form + Contact Info */}
          <div className="space-y-8">
            {/* Contact Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Phone, label: t('contact.labels.phone', 'Téléphone'), value: settings.info.phone, href: `tel:${settings.info.phoneRaw}` },
                { icon: Mail, label: t('contact.labels.email', 'Email'), value: settings.info.email, href: `mailto:${settings.info.email}` },
              ].map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.href}
                  className="bg-card/50 backdrop-blur-sm p-4 rounded-2xl border border-border/50 hover:border-gold/50 transition-all group shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <contact.icon size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-foreground/50 font-bold uppercase tracking-wider">{contact.label}</p>
                      <p className="font-bold text-foreground/90">{contact.value}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
              <motion.a
                href={settings.info.addressMap}
                target="_blank"
                rel="noopener noreferrer"
                className="sm:col-span-2 bg-card/50 backdrop-blur-sm p-4 rounded-2xl border border-border/50 hover:border-gold/50 transition-all group shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-foreground/50 font-bold uppercase tracking-wider">{t('contact.labels.address', 'Adresse')}</p>
                    <p className="font-bold text-foreground/90">{settings.info.address}</p>
                  </div>
                </div>
              </motion.a>
            </div>

            {/* Form */}
            <motion.div
              className="bg-card rounded-3xl p-6 md:p-8 border border-border/50 shadow-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 font-serif flex items-center gap-3">
                <span className="w-8 h-8 bg-gold/20 rounded-lg flex items-center justify-center text-gold">✍️</span>
                {t('contact.formTitle', 'Envoyez-nous un message')}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-foreground/60 uppercase ml-1">{t('contact.placeholders.name', 'Votre nom')}</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-muted/50 rounded-xl border border-border/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-sans"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-foreground/60 uppercase ml-1">{t('contact.placeholders.email', 'Votre email')}</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-muted/50 rounded-xl border border-border/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-sans"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground/60 uppercase ml-1">{t('contact.placeholders.message', 'Votre message')}</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-muted/50 rounded-xl border border-border/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none font-sans"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all"
                  whileHover={{ scale: 1.01 }}
                >
                  {t('contact.submit', 'Envoyer le message')}
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Right: Horaires + Status */}
          <div className="space-y-6">
            <motion.div
              className="bg-card/40 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl relative overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {/* Glassmorphism accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-16 -mt-16" />

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                    <Clock size={28} />
                  </div>
                  <h3 className="font-bold text-2xl font-serif">
                    {t('contact.hoursTitle', "Horaires d'ouverture")}
                  </h3>
                </div>

                {/* Status Indicator */}
                <motion.div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm ${isOpen
                    ? 'bg-green-500/10 border-green-500/30 text-green-600'
                    : 'bg-red-500/10 border-red-500/30 text-red-600'
                    }`}
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                  <span className="text-sm font-bold uppercase tracking-wider">
                    {isOpen ? t('contact.status.open', 'Ouvert') : t('contact.status.closed', 'Fermé')}
                  </span>
                </motion.div>
              </div>

              <div className="space-y-3">
                {horaires.map((horaire) => {
                  const isToday = horaire.id === currentDay;

                  return (
                    <motion.div
                      key={horaire.id}
                      className={`group flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl transition-all duration-300 ${isToday
                        ? 'bg-primary/10 border border-primary/20 shadow-inner scale-[1.02]'
                        : 'bg-white/40 border border-transparent hover:bg-white/60'
                        }`}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      whileHover={{ x: isToday ? 0 : 5 }}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`font-bold text-base transition-colors ${isToday ? 'text-primary' : (horaire.isClosed ? 'text-foreground/40' : 'text-foreground')
                          }`}>
                          {horaire.jour}
                        </span>
                        {isToday && (
                          <span className="px-2 py-0.5 bg-primary text-white text-[10px] font-black rounded-md uppercase tracking-tighter">
                            {t('contact.today', 'Aujourd\'hui')}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1 sm:mt-0">
                        {horaire.isClosed ? (
                          <span className="text-xs font-bold uppercase tracking-widest text-foreground/40 italic">
                            {t('closed', 'Fermé')}
                          </span>
                        ) : (
                          <div className="flex items-center gap-3">
                            {horaire.matin && (
                              <div className="flex flex-col items-end">
                                <span className="text-[10px] text-foreground/40 font-bold uppercase">{t('contact.morning', 'Matin')}</span>
                                <span className={`text-sm font-bold ${isToday ? 'text-foreground' : 'text-foreground/70'}`}>
                                  {horaire.matin}
                                </span>
                              </div>
                            )}
                            {horaire.apresMidi && (
                              <>
                                <div className="w-[1px] h-6 bg-border/50 hidden sm:block" />
                                <div className="flex flex-col items-end">
                                  <span className="text-[10px] text-foreground/40 font-bold uppercase">{t('contact.afternoon', 'Après-midi')}</span>
                                  <span className={`text-sm font-bold ${isToday ? 'text-foreground' : 'text-foreground/70'}`}>
                                    {horaire.apresMidi}
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Map Frame */}
            <motion.div
              className="bg-card rounded-3xl overflow-hidden border border-border/50 h-[300px] shadow-lg group relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold shadow-sm flex items-center gap-2">
                  <MapPin size={14} className="text-primary" />
                  Vallorbe, Suisse
                </div>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2747.381!2d6.334166!3d46.701944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478f2d9c8a7d8d8d%3A0x1234567890abcdef!2sRue%20du%20Faubourg%205%2C%201337%20Vallorbe!5e0!3m2!1sfr!2sch!4v1700000000000"
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
        </div>
      </div>
    </section>

  );
}
