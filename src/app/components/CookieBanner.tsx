import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { X, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CookieBanner() {
    const { t, i18n } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        const hasSeenWelcome = localStorage.getItem('welcome-last-seen');

        // Wait for faster curtain animation (approx 3s total)
        const delay = (hasSeenWelcome && !consent) ? 3200 : 1500;

        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), delay);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[100]"
                >
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <ShieldCheck className="w-6 h-6 text-primary" />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-xl font-bold font-serif text-foreground">
                                        {t('cookie.title', 'Respect de votre vie privée')}
                                    </h3>
                                    <p className="text-sm text-foreground/70 leading-relaxed font-sans mt-1">
                                        {t('cookie.description', "Nous utilisons des cookies pour optimiser votre expérience et analyser notre trafic.")}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={handleAccept}
                                    className="flex-grow px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                                >
                                    {t('cookie.accept', 'Tout accepter')}
                                </button>
                                <button
                                    onClick={handleDecline}
                                    className="px-6 py-2.5 bg-muted text-foreground/80 rounded-xl font-bold text-sm hover:bg-muted/80 transition-all"
                                >
                                    {t('cookie.decline', 'Refuser')}
                                </button>
                            </div>
                            <div className="mt-4 text-center">
                                <Link
                                    to={`/${i18n.language}/politique-confidentialite`}
                                    className="text-[10px] uppercase tracking-widest font-bold text-primary/60 hover:text-primary transition-colors"
                                    onClick={() => setIsVisible(false)}
                                >
                                    En savoir plus
                                </Link>
                            </div>
                        </div>
                        {/* Decorative progress-like bar */}
                        <div className="h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
