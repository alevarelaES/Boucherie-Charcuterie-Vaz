import { MapPin, Phone, Facebook, Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

interface TopBarProps {
    show: boolean;
    isTransparent: boolean;
    scrolled: boolean;
    currentLang: string;
    onLanguageChange: (lang: string) => void;
    contactInfo: {
        address: string;
        addressMap: string;
        phone: string;
        phoneRaw: string;
    };
    socialLinks: {
        facebook: string;
        instagram: string;
    };
}

export function TopBar({ show, isTransparent, scrolled, currentLang, onLanguageChange, contactInfo, socialLinks }: TopBarProps) {
    const { i18n } = useTranslation();

    return (
        <motion.div
            className="hidden lg:flex fixed top-0 w-full z-[10001] border-b border-white/10 h-9"
            initial={{ y: 0 }}
            animate={{ y: (show || !scrolled) ? 0 : -36 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            style={{ backgroundColor: isTransparent ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.9)' }}
        >
            <div className={`max-w-7xl mx-auto w-full px-8 h-full flex justify-between items-center text-xs font-sans font-medium text-white/90`}>
                <div className="flex gap-6 items-center">
                    <a href={contactInfo.addressMap} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors">
                        <MapPin className="w-3 h-3 text-gold" />
                        {contactInfo.address}
                    </a>
                    <a href={`tel:${contactInfo.phoneRaw}`} className="flex items-center gap-2 hover:text-gold transition-colors font-bold">
                        <Phone className="w-3 h-3 text-gold" />
                        {contactInfo.phone}
                    </a>
                </div>
                <div className="flex gap-6 items-center">
                    <div className="flex gap-4">
                        <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                            <Facebook className="w-3.5 h-3.5" />
                        </a>
                        <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                            <Instagram className="w-3.5 h-3.5" />
                        </a>
                    </div>
                    <div className="h-4 w-[1px] bg-white/20"></div>
                    <div className="flex gap-3">
                        {['fr', 'en', 'de', 'it'].map((lang, idx) => (
                            <span key={lang} className="flex gap-3 items-center">
                                <button
                                    onClick={() => onLanguageChange(lang)}
                                    className={`hover:text-gold transition-all ${currentLang === lang ? 'text-gold' : ''}`}
                                >
                                    {lang.toUpperCase()}
                                </button>
                                {idx < 3 && <span className="opacity-20 text-[10px]">|</span>}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
