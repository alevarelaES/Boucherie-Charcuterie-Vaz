import { motion } from 'motion/react';
import { OptimizedImage } from '../OptimizedImage';
import settings from '../../../settings.json';

interface LogoProps {
    isTransparent: boolean;
    className?: string;
}

export function Logo({ isTransparent, className = "" }: LogoProps) {
    return (
        <motion.div
            className={`relative transition-all duration-500 ${!isTransparent ? 'scale-90' : 'scale-100'} ${className}`}
        >
            <div
                className={`relative overflow-hidden rounded-full border-2 transition-all duration-500 bg-white 
          ${isTransparent
                        ? 'border-white/20 shadow-2xl scale-110 p-0.5'
                        : 'border-primary/10 shadow-md p-0'
                    }`}
            >
                <OptimizedImage
                    src={settings.images.logo}
                    alt="Logo Boucherie Vaz"
                    className="w-12 h-12 md:w-16 md:h-16 object-contain"
                    priority
                />
            </div>
        </motion.div>
    );
}
