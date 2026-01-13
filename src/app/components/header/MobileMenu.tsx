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
                    className="fixed inset-0 z-[10000] bg-background flex flex-col"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="p-4 flex justify-between items-center border-b border-border/50">
                        <span className="font-serif text-xl font-bold text-primary tracking-tight">Boucherie Vaz</span>
                        <button onClick={onClose} className="p-2 bg-muted rounded-full transition-colors active:scale-90">
                            <X className="w-6 h-6 text-foreground" />
                        </button>
                    </div>
                    <div className="flex-1 flex flex-col justify-center px-10 gap-8">
                        <ul className="flex flex-col gap-6 font-serif text-3xl font-bold">
                            {navItems.map((item, i) => (
                                <motion.li
                                    key={item.id}
                                // Removed entry animation for instant feel
                                >
                                    <a
                                        href={`/${currentLang}/${item.href}`}
                                        onClick={(e) => {
                                            const currentPath = window.location.pathname;
                                            const isHomePage = currentPath === `/${currentLang}` || currentPath === `/${currentLang}/`;

                                            if (isHomePage) {
                                                e.preventDefault();
                                                const id = item.href.replace('#', '');
                                                const element = document.getElementById(id);
                                                if (element) {
                                                    onClose();
                                                    setTimeout(() => {
                                                        element.scrollIntoView({ behavior: 'smooth' });
                                                    }, 300);
                                                }
                                            } else {
                                                // Force navigation to the home page with the hash
                                                e.preventDefault();
                                                onClose();
                                                window.location.href = `/${currentLang}/${item.href}`;
                                            }
                                        }}
                                        className={`transition-colors ${activeSection === item.id ? 'text-primary' : 'text-foreground/80'}`}
                                    >
                                        {item.label}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                    <div className="p-8 space-y-6 bg-muted/20 border-t border-border/30">
                        <div className="text-center space-y-2">
                            <p className="text-xs font-medium text-muted-foreground">{settings.info.address}</p>
                            <a href={`tel:${settings.info.phoneRaw}`} className="text-primary font-black text-xl tracking-tighter block">{settings.info.phone}</a>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {['fr', 'en', 'de', 'it'].map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => { onLanguageChange(lang); onClose(); }}
                                    className={`py-3 rounded-xl font-bold text-xs border transition-all active:scale-95 ${currentLang === lang ? 'bg-primary text-white border-primary shadow-md' : 'bg-white text-muted-foreground border-border/20'}`}
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
