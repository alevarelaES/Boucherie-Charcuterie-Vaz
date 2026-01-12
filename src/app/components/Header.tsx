import { Menu, X, MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function Header() {
    const { t } = useTranslation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { label: t('nav.home', 'Accueil'), href: '#accueil' },
        { label: t('nav.about', 'À propos'), href: '#a-propos' },
        { label: t('nav.products', 'Produits'), href: '#produits' },
        { label: t('nav.contact', 'Contact'), href: '#contact' }
    ];

    return (
        <>
            {/* Top Bar - Info */}
            <motion.div
                className="hidden lg:flex fixed top-0 w-full z-[60] border-b border-white/10 transition-all duration-300 backdrop-blur-[2px]"
                initial={{ y: 0 }}
                animate={{ y: scrolled ? -50 : 0 }}
                style={{ backgroundColor: scrolled ? 'transparent' : 'rgba(0,0,0,0.2)' }}
            >
                <div className="max-w-7xl mx-auto w-full px-8 py-2 flex justify-between text-xs font-sans font-medium text-white/90">
                    <div className="flex gap-6 items-center">
                        <a href="https://maps.google.com" target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-gold transition-colors">
                            <MapPin className="w-3 h-3 text-gold" />
                            Rue du faubourg 5, 1337 Vallorbe
                        </a>
                        <a href="mailto:boucherievaz@gmail.com" className="flex items-center gap-2 hover:text-gold transition-colors">
                            <Mail className="w-3 h-3 text-gold" />
                            boucherievaz@gmail.com
                        </a>
                    </div>
                    <div className="flex gap-6 items-center">
                        <a href="tel:+41218431109" className="flex items-center gap-2 hover:text-gold transition-colors">
                            <Phone className="w-3 h-3 text-gold" />
                            +41 21 843 11 09
                        </a>
                        <div className="h-4 w-[1px] bg-white/20 mx-1"></div>
                        <div className="flex gap-4">
                            <a href="https://www.facebook.com/people/Boucherie-Charcuterie-Vaz/61579169247905/" target="_blank" rel="noopener" className="hover:text-gold transition-colors">
                                <Facebook className="w-3.5 h-3.5" />
                            </a>
                            <a href="https://www.instagram.com/boucherievaz/" target="_blank" rel="noopener" className="hover:text-gold transition-colors">
                                <Instagram className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Main Navigation */}
            <header
                className={`fixed left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled
                    ? 'top-0 py-3 bg-white/80 backdrop-blur-md border-gray-200/50 shadow-sm text-foreground'
                    : 'top-0 lg:top-10 py-6 bg-transparent border-transparent text-white'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
                    {/* Logo Area */}
                    <a href="#accueil" className="flex items-center gap-3 group">
                        <div className={`p-0.5 rounded-xl transition-all duration-500 ${scrolled ? 'bg-primary/5' : 'bg-white/70 backdrop-blur-sm shadow-lg'}`}>
                            <img
                                src="/images/logo/Boucherie Charcuterie Vaz sans fond.png"
                                alt="Logo Boucherie Vaz"
                                className="w-20 h-20 object-contain group-hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className={`font-serif text-xl font-bold leading-none tracking-tight ${scrolled ? 'text-foreground' : 'text-white transition-colors duration-300 group-hover:text-primary'}`}>
                                Boucherie Vaz
                            </span>
                            <span className={`text-[10px] uppercase tracking-[0.2em] font-sans font-semibold ${scrolled ? 'text-muted-foreground' : 'text-white/80'}`}>
                                Vallorbe
                            </span>
                        </div>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-8">
                        <ul className="flex items-center gap-8 font-sans text-sm font-semibold tracking-wide">
                            {navItems.map((item) => (
                                <li key={item.label}>
                                    <a
                                        href={item.href}
                                        className={`relative py-1 transition-colors hover:text-primary ${scrolled ? 'text-foreground/80' : 'text-white/90'
                                            }`}
                                    >
                                        {item.label}
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'hover:bg-muted text-foreground' : 'hover:bg-white/10 text-white'
                            }`}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-xl flex flex-col"
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    >
                        <div className="p-6 flex justify-between items-center border-b border-border/50">
                            <span className="font-serif text-xl font-bold">{t('menu.title', 'Menu')}</span>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-2 hover:bg-muted rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="flex-1 flex flex-col justify-center px-12 gap-8">
                            <ul className="flex flex-col gap-6 font-serif text-3xl font-bold text-center">
                                {navItems.map((item, i) => (
                                    <motion.li
                                        key={item.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + i * 0.1 }}
                                    >
                                        <a
                                            href={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="hover:text-primary transition-colors"
                                        >
                                            {item.label}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                        <div className="p-8 border-t border-border/50 bg-muted/30">
                            <div className="flex flex-col gap-4 text-center font-sans text-sm text-muted-foreground">
                                <p>Rue du faubourg 5, 1337 Vallorbe</p>
                                <a href="tel:+41218431109" className="text-primary font-bold text-lg">+41 21 843 11 09</a>
                                <div className="flex justify-center gap-6 mt-2">
                                    <a href="https://www.facebook.com/people/Boucherie-Charcuterie-Vaz/61579169247905/" target="_blank" rel="noopener" className="p-2 bg-primary/10 rounded-full text-primary hover:bg-primary hover:text-white transition-all">
                                        <Facebook className="w-5 h-5" />
                                    </a>
                                    <a href="https://www.instagram.com/boucherievaz/" target="_blank" rel="noopener" className="p-2 bg-primary/10 rounded-full text-primary hover:bg-primary hover:text-white transition-all">
                                        <Instagram className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
