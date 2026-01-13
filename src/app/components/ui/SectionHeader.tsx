import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

interface SectionHeaderProps {
    badge: string;
    title: string;
    description?: string;
    isDark?: boolean;
}

export function SectionHeader({ badge, title, description, isDark = false }: SectionHeaderProps) {
    return (
        <motion.div
            className="text-center mb-10 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <motion.span
                className={`inline-block px-4 py-2 ${isDark ? 'bg-gold/20 text-gold-light' : 'bg-gold/10 text-gold'} rounded-full text-sm md:text-base font-bold tracking-widest uppercase mb-4 font-sans`}
            >
                {badge}
            </motion.span>

            <h2
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 font-bold font-serif tracking-tight ${isDark ? 'text-white' : 'text-foreground'}`}
            >
                {title}
            </h2>

            {description && (
                <p className={`text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto font-medium font-sans leading-relaxed ${isDark ? 'text-white/80' : 'text-foreground/80'}`}>
                    {description}
                </p>
            )}
        </motion.div>
    );
}
