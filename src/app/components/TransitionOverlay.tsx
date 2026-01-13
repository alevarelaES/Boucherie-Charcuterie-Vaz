import { motion, AnimatePresence } from 'motion/react';

interface TransitionOverlayProps {
    pendingLang: string | null;
}

export function TransitionOverlay({ pendingLang }: { pendingLang: string | null }) {
    const strips = [0, 1, 2, 3, 4];

    const langNames: Record<string, { main: string; sub: string }> = {
        fr: { main: 'Français', sub: 'L’Art de la Viande' },
        en: { main: 'English', sub: 'The Art of Meat' },
        de: { main: 'Deutsch', sub: 'Die Kunst des Fleisches' },
        it: { main: 'Italiano', sub: 'L’Arte della Carne' }
    };

    const currentInfo = pendingLang ? langNames[pendingLang] : null;

    return (
        <AnimatePresence mode="wait">
            {pendingLang && currentInfo && (
                <motion.div
                    className="fixed inset-0 z-[100] flex pointer-events-none"
                    exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.6 } }}
                >
                    {/* Staggered Strips */}
                    {strips.map((i) => (
                        <motion.div
                            key={i}
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            exit={{ scaleY: 1 }}
                            transition={{
                                duration: 0.5,
                                delay: i * 0.05,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            className="relative h-full flex-1 origin-top bg-primary"
                            style={{
                                boxShadow: '0 0 40px rgba(0,0,0,0.1)',
                                zIndex: 100 + i
                            }}
                        >
                            {/* Subtle Texture Overlay */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

                            {/* Optional Gold Bottom Border on strips */}
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold/30" />
                        </motion.div>
                    ))}

                    {/* Center Text Reveal */}
                    <div className="absolute inset-0 flex items-center justify-center z-[150] px-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.1, y: -20 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                            className="flex flex-col items-center text-center"
                        >
                            <span className="text-gold font-serif text-6xl md:text-9xl font-bold tracking-tighter opacity-10 absolute select-none whitespace-nowrap">
                                {currentInfo.main}
                            </span>
                            <div className="relative flex flex-col items-center">
                                <span className="text-white font-serif text-4xl md:text-6xl font-bold tracking-widest uppercase">
                                    {currentInfo.main}
                                </span>
                                <motion.div
                                    className="h-1 bg-gold mt-4 mb-2"
                                    initial={{ width: 0 }}
                                    animate={{ width: '80%' }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                />
                                <span className="text-gold/90 font-sans text-sm md:text-lg font-medium tracking-[0.3em] uppercase italic">
                                    {currentInfo.sub}
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
