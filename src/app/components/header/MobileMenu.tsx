import { X, Facebook, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import settings from '../../../settings.json';

interface NavItem {
    id: string;
    label: string;
    href: string;
}

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    navItems: NavItem[];
    activeSection: string;
    currentLang: string;
    onLanguageChange: (lang: string) => void;
}

export function MobileMenu({ isOpen, onClose, navItems, activeSection, currentLang, onLanguageChange }: MobileMenuProps) {
    const { t } = useTranslation();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-2xl flex flex-col"
                    initial={{ opacity: 0, x: '100%' }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: '100%' }}
                    transition={{ type: "spring", damping: 30, stiffness: 250 }}
                >
                    <div className="p-6 flex justify-between items-center border-b border-border/50">
                        <span className="font-serif text-2xl font-bold text-primary tracking-tight">Boucherie Vaz</span>
                        <button onClick={onClose} className="p-3 bg-muted rounded-full transition-colors">
                            <X className="w-6 h-6 text-foreground" />
                        </button>
                    </div>
                    <div className="flex-1 flex flex-col justify-center px-12 gap-10">
                        <ul className="flex flex-col gap-8 font-serif text-4xl font-bold">
                            {navItems.map((item, i) => (
                                <motion.li key={item.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.1 }}>
                                    <a
                                        href={`/${currentLang}/${item.href}`}
                                        onClick={onClose}
                                        className={`transition-colors ${activeSection === item.id ? 'text-primary' : 'hover:text-gold'}`}
                                    >
                                        {item.label}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                    <div className="p-10 space-y-8 bg-muted/30 rounded-t-[3rem] border-t border-border/50">
                        <div className="text-center space-y-3">
                            <p className="text-sm font-medium text-muted-foreground">{settings.info.address}</p>
                            <a href={`tel:${settings.info.phoneRaw}`} className="text-primary font-black text-2xl tracking-tighter block">{settings.info.phone}</a>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {['fr', 'en', 'de', 'it'].map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => { onLanguageChange(lang); onClose(); }}
                                    className={`py-4 rounded-2xl font-bold text-xs border-2 transition-all ${currentLang === lang ? 'bg-primary text-white border-primary shadow-xl scale-105' : 'bg-white text-muted-foreground border-border/20'}`}
                                >
                                    {lang.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
