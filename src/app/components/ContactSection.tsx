import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

const horaires = [
  { jour: 'Lundi', heures: 'Fermé', isClosed: true },
  { jour: 'Mardi', heures: '08:00 - 12:30 | 14:00 - 18:30', isClosed: false },
  { jour: 'Mercredi', heures: '08:00 - 12:30 | 14:00 - 18:30', isClosed: false },
  { jour: 'Jeudi', heures: '08:00 - 12:30 | 14:00 - 18:30', isClosed: false },
  { jour: 'Vendredi', heures: '08:00 - 12:30 | 14:00 - 18:30', isClosed: false },
  { jour: 'Samedi', heures: '08:00 - 16:00', isClosed: false },
  { jour: 'Dimanche', heures: 'Fermé', isClosed: true }
];

export function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-5">
        {/* Left: Contact Form & Info */}
        <div className="lg:col-span-3 bg-secondary text-secondary-foreground p-8 md:p-12 lg:p-16 relative">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.span 
                className="inline-block px-4 py-2 bg-primary/20 text-primary-foreground rounded-full text-sm font-semibold tracking-wider uppercase mb-6"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Prenez contact
              </motion.span>
              
              <h2 
                className="text-5xl md:text-6xl mb-6"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Une question ?<br />
                Contactez-nous
              </h2>
              
              <p 
                className="text-lg text-secondary-foreground/80 leading-relaxed mb-12"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Notre équipe se fera un plaisir de vous conseiller et de répondre à toutes vos questions 
                sur nos produits et services.
              </p>
            </motion.div>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[
                { icon: Phone, label: 'Téléphone', value: '+41 21 843 11 09', href: 'tel:+41218431109' },
                { icon: Mail, label: 'Email', value: 'boucherievaz@gmail.com', href: 'mailto:boucherievaz@gmail.com' },
                { icon: MapPin, label: 'Adresse', value: 'Rue du faubourg 5, 1337 Vallorbe', href: '#' },
              ].map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.href}
                  className="group bg-secondary-foreground/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-secondary-foreground/10 transition-all border border-secondary-foreground/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <contact.icon className="w-6 h-6 text-primary-foreground" />
                    </motion.div>
                    <div>
                      <p 
                        className="text-sm text-secondary-foreground/60 mb-1 uppercase tracking-wide"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {contact.label}
                      </p>
                      <p 
                        className="text-base font-semibold group-hover:text-primary transition-colors"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {contact.value}
                      </p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Quick Contact Form */}
            <motion.div
              className="bg-secondary-foreground/5 backdrop-blur-sm rounded-2xl p-8 border border-secondary-foreground/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 
                className="text-2xl mb-6 flex items-center gap-2"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                <Send className="w-6 h-6 text-primary" />
                Message rapide
              </h3>
              
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Votre nom"
                    className="w-full px-4 py-3 bg-secondary-foreground/5 border border-secondary-foreground/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-secondary-foreground placeholder:text-secondary-foreground/40"
                    style={{ fontFamily: 'var(--font-sans)' }}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="w-full px-4 py-3 bg-secondary-foreground/5 border border-secondary-foreground/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-secondary-foreground placeholder:text-secondary-foreground/40"
                    style={{ fontFamily: 'var(--font-sans)' }}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Votre message"
                    rows={4}
                    className="w-full px-4 py-3 bg-secondary-foreground/5 border border-secondary-foreground/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-secondary-foreground placeholder:text-secondary-foreground/40 resize-none"
                    style={{ fontFamily: 'var(--font-sans)' }}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full px-6 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold transition-all shadow-lg"
                  style={{ fontFamily: 'var(--font-sans)' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Envoyer le message
                </motion.button>
              </form>
            </motion.div>

            {/* Opening Hours */}
            <motion.div 
              className="mt-8 bg-secondary-foreground/5 backdrop-blur-sm rounded-2xl p-8 border border-secondary-foreground/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 
                  className="text-2xl"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  Horaires d'ouverture
                </h3>
              </div>
              
              <div className="space-y-3">
                {horaires.map((horaire, index) => (
                  <motion.div 
                    key={index}
                    className={`flex justify-between items-center py-3 px-4 rounded-xl transition-all ${
                      horaire.isClosed 
                        ? 'bg-secondary-foreground/5' 
                        : 'bg-primary/5 hover:bg-primary/10'
                    }`}
                    style={{ fontFamily: 'var(--font-sans)' }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    whileHover={{ x: 5 }}
                  >
                    <span className={`font-semibold ${horaire.isClosed ? 'text-secondary-foreground/50' : ''}`}>
                      {horaire.jour}
                    </span>
                    <span className={horaire.isClosed ? 'text-secondary-foreground/40 italic' : 'text-secondary-foreground/90'}>
                      {horaire.heures}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right: Map */}
        <div className="lg:col-span-2 h-[600px] lg:h-full min-h-[600px] relative group">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2730.982!2d6.3764!3d46.7726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDbCsDQ2JzIxLjQiTiA2wrAyMiczMC44IkU!5e0!3m2!1sen!2sch!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Boucherie Vaz Location"
            className="grayscale hover:grayscale-0 transition-all duration-500"
          />
          
          {/* Map Overlay Badge */}
          <motion.div
            className="absolute top-8 left-8 bg-white rounded-2xl shadow-2xl p-4 max-w-xs"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide" style={{ fontFamily: 'var(--font-sans)' }}>
                  Nous trouver
                </p>
                <p className="text-sm font-semibold" style={{ fontFamily: 'var(--font-serif)' }}>
                  Au cœur de Vallorbe
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
