import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

const horaires = [
  { jour: 'Lundi', heures: '07:00 - 12:00 | 13:30 - 18:00', isClosed: false },
  { jour: 'Mardi', heures: '07:00 - 12:00 | 13:30 - 18:00', isClosed: false },
  { jour: 'Mercredi', heures: '07:00 - 12:00 | 13:30 - 18:00', isClosed: false },
  { jour: 'Jeudi', heures: '07:00 - 12:00 | 13:30 - 18:00', isClosed: false },
  { jour: 'Vendredi', heures: '07:00 - 12:00 | 13:30 - 18:00', isClosed: false },
  { jour: 'Samedi', heures: '07:00 - 13:00', isClosed: false },
  { jour: 'Dimanche', heures: 'Fermé', isClosed: true }
];

export function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      alert('Merci de remplir tous les champs.');
      return;
    }

    const subject = encodeURIComponent(`Message depuis le site - ${name}`);
    const body = encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:boucherievaz@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-12 md:py-16 px-4 md:px-8 bg-background relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif"
          >
            Contactez-nous
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Form + Contact Info */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Contact Info */}
            <div className="bg-card rounded-lg p-5 border border-border/50">
              <h3 className="text-xl md:text-2xl font-bold mb-4 font-serif">
                Informations
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Phone, label: 'Téléphone', value: '+41 (0)21 843 11 09', href: 'tel:+41218431109' },
                  { icon: Mail, label: 'Email', value: 'boucherievaz@gmail.com', href: 'mailto:boucherievaz@gmail.com' },
                  { icon: MapPin, label: 'Adresse', value: 'Rue du faubourg 5, 1337 Vallorbe', href: 'https://www.google.com/maps/search/?api=1&query=Rue+du+faubourg+5,+1337+Vallorbe' },
                ].map((contact, index) => (
                  <motion.a
                    key={index}
                    href={contact.href}
                    target={contact.icon === MapPin ? '_blank' : undefined}
                    rel={contact.icon === MapPin ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-gold/10 transition-colors group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <contact.icon className="w-6 h-6 text-gold flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div className="min-w-0">
                      <p className="text-sm md:text-base text-foreground/80 uppercase tracking-wide font-semibold font-sans">
                        {contact.label}
                      </p>
                      <p className="text-base md:text-lg font-bold truncate text-foreground/95 font-sans">
                        {contact.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border/50">
                <p className="text-sm md:text-base text-foreground/60 uppercase tracking-widest font-bold font-sans mb-4">
                  Suivez-nous
                </p>
                <div className="flex gap-4">
                  <motion.a
                    href="https://www.facebook.com/people/Boucherie-Charcuterie-Vaz/61579169247905/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                    whileHover={{ y: -5, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Facebook className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    href="https://www.instagram.com/boucherievaz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                    whileHover={{ y: -5, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Instagram className="w-6 h-6" />
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-card rounded-lg p-5 border border-border/50">
              <h3 className="text-xl md:text-2xl font-bold mb-4 font-serif">
                Envoyez-nous un message
              </h3>
              <motion.form
                className="space-y-3"
                onSubmit={handleSubmit}
                noValidate
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <input
                  type="text"
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 bg-muted rounded-lg border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary text-base md:text-lg font-medium font-sans"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full px-4 py-3 bg-muted rounded-lg border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary text-base md:text-lg font-medium font-sans"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <textarea
                  placeholder="Votre message"
                  rows={4}
                  className="w-full px-4 py-3 bg-muted rounded-lg border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary text-base md:text-lg font-medium resize-none font-sans"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
                <motion.button
                  type="submit"
                  className="w-full px-4 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-bold transition-all text-lg font-sans"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Envoyer
                </motion.button>
              </motion.form>
            </div>
          </motion.div>

          {/* Right: Horaires + Map */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Horaires */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-8 border-2 border-primary/30">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-2xl font-serif">
                  Horaires d'ouverture
                </h3>
              </div>
              <div className="space-y-3 text-sm font-sans">
                {horaires.map((horaire, index) => (
                  <motion.div
                    key={index}
                    className={`flex justify-between p-3 rounded-lg ${horaire.isClosed ? 'bg-muted/30' : 'bg-white/40'}`}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    <span className={`font-bold text-base ${horaire.isClosed ? 'text-foreground/40' : 'text-foreground'}`}>
                      {horaire.jour}
                    </span>
                    <span className={horaire.isClosed ? 'text-foreground/40 text-xs italic' : 'text-foreground/80 text-sm font-semibold'}>
                      {horaire.heures}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Map */}
            <motion.div
              className="bg-card rounded-lg overflow-hidden border border-border/50 h-72 sm:h-80 md:h-96"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2747.381!2d6.334166!3d46.701944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478f2d9c8a7d8d8d%3A0x1234567890abcdef!2sRue%20du%20Faubourg%205%2C%201337%20Vallorbe!5e0!3m2!1sfr!2sch!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '384px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Boucherie Vaz - Rue du Faubourg 5, Vallorbe"
                className="grayscale hover:grayscale-0 transition-all"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
