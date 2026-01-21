import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Logo } from './ui/Logo';

export function WelcomeMessage() {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Disable on mobile completely for immediate access
        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
            return;
        }

        const lastSeen = localStorage.getItem('welcome-last-seen');
        const now = Date.now();
        const thirtyDays = 30 * 24 * 60 * 60 * 1000;

        if (!lastSeen || (now - parseInt(lastSeen)) > thirtyDays) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';

            // Faster timeline: ~2s total experience
            const timer = setTimeout(() => {
                handleClose();
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            document.body.style.overflow = '';
        }, 1000);
        localStorage.setItem('welcome-last-seen', Date.now().toString());
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[2000] flex items-center justify-center bg-primary"
                    initial={{ y: 0 }}
                    exit={{
                        y: '-100%',
                        transition: {
                            duration: 0.8,
                            ease: [0.76, 0, 0.24, 1]
                        }
                    }}
                >
                    {/* Background Texture */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

                    {/* Central Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 blur-[100px] rounded-full pointer-events-none" />

                    <div className="relative flex flex-col items-center z-10">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, ease: "backOut" }}
                            className="mb-24 relative"
                        >
                            {/* Halo behind the logo */}
                            <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl scale-150 animate-pulse" />

                            {/* Pure Logo Component - White bg ensures contrast against red */}
                            <Logo isTransparent={true} className="scale-[2.5]" />
                        </motion.div>

                        <div className="overflow-hidden flex flex-col items-center">
                            <motion.h1
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                                className="text-4xl md:text-6xl font-serif font-black text-white tracking-tight mb-2 text-center"
                            >
                                <span className="text-gold">{t('welcome.title', 'Boucherie')}</span> Vaz
                            </motion.h1>

                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "60%" }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="h-0.5 bg-gold/50 my-4"
                            />

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                                className="text-white/80 font-sans font-medium tracking-[0.4em] uppercase text-xs md:text-sm"
                            >
                                {t('tagline', "L'Art de la Viande")}
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
