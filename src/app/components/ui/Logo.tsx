import { motion } from 'motion/react';
import { OptimizedImage } from '../OptimizedImage';
import settings from '../../../settings.json';

interface LogoProps {
    isTransparent: boolean;
    className?: string;
    logoUrl?: string;
}

export function Logo({ isTransparent, className = "", logoUrl }: LogoProps) {
    const finalLogo = logoUrl || settings.images.logo;

    return (
        <motion.div
            className={`relative transition-all duration-500 ${!isTransparent ? 'scale-90' : 'scale-100'} ${className}`}
        >
            <div
                className={`relative overflow-hidden rounded-full border-4 transition-all duration-500 bg-white flex items-center justify-center
          ${isTransparent
                        ? 'border-[#C5A059] shadow-2xl p-0 w-16 h-16 md:w-20 md:h-20'
                        : 'border-[#C5A059] shadow-md p-0 w-12 h-12 md:w-16 md:h-16'
                    }`}
            >
                <OptimizedImage
                    src={finalLogo}
                    alt="Logo Boucherie Vaz"
                    className="w-full h-full object-contain"
                    priority
                />
            </div>
        </motion.div>
    );
}
