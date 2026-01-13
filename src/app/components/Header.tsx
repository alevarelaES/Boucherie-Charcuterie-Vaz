import { Menu, X, MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import settings from '../../settings.json';

export function Header() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showTopBar, setShowTopBar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [activeSection, setActiveSection] = useState('accueil');

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrolled(currentScrollY > 50);

            // Show top bar if scrolling up or at the very top
            if (currentScrollY < 10) {
                setShowTopBar(true);
            } else if (currentScrollY < lastScrollY) {
                setShowTopBar(true); // Scrolling up
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setShowTopBar(false); // Scrolling down
            }

            setLastScrollY(currentScrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        let observer: IntersectionObserver;

        const setupObserver = () => {
            if (observer) observer.disconnect();

            const observerOptions = {
                root: null,
                rootMargin: '-20% 0px -70% 0px',
                threshold: 0
            };

            const observerCallback = (entries: IntersectionObserverEntry[]) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            };

            observer = new IntersectionObserver(observerCallback, observerOptions);
            const sections = ['accueil', 'a-propos', 'produits', 'contact'];

            // We need to wait a small bit to ensure DOM elements are rendered
            // after the PageContent mount/animation
            const timeoutId = setTimeout(() => {
                sections.forEach((id) => {
                    const el = document.getElementById(id);
                    if (el) observer.observe(el);
                });
            }, 500); // 500ms matches the PageContent enter duration

            return timeoutId;
        };

        const timeoutId = setupObserver();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (observer) observer.disconnect();
            clearTimeout(timeoutId);
        };
    }, [location.pathname]); // Re-run when URL changes (language switch)

    const navItems = [
        { id: 'accueil', label: t('nav.home', 'Accueil'), href: '#accueil' },
        { id: 'a-propos', label: t('nav.about', 'À propos'), href: '#a-propos' },
        { id: 'produits', label: t('nav.products', 'Produits'), href: '#produits' },
        { id: 'contact', label: t('nav.contact', 'Contact'), href: '#contact' }
    ];

    const changeLanguage = (newLang: string) => {
        const currentPath = location.pathname;
        const hash = location.hash;
        const pathParts = currentPath.split('/');
        pathParts[1] = newLang;
        const newPath = pathParts.join('/') + hash;
        navigate(newPath);
    };

    return (
        <>
            {/* Top Bar - Info */}
            <motion.div
                className="hidden lg:flex fixed top-0 w-full z-[60] border-b border-white/10 transition-all duration-300 backdrop-blur-[2px]"
                initial={{ y: 0 }}
                animate={{ y: showTopBar ? 0 : -50 }}
                style={{ backgroundColor: (scrolled || activeSection !== 'accueil') ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.2)' }}
            >
                <div className="max-w-7xl mx-auto w-full px-8 py-2 flex justify-between text-xs font-sans font-medium text-white/90">
                    <div className="flex gap-6 items-center">
                        <a href={settings.info.addressMap} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors">
                            <MapPin className="w-3 h-3 text-gold" />
                            {settings.info.address}
                        </a>
                        <a href={`mailto:${settings.info.email}`} className="flex items-center gap-2 hover:text-gold transition-colors">
                            <Mail className="w-3 h-3 text-gold" />
                            {settings.info.email}
                        </a>
                    </div>
                    <div className="flex gap-6 items-center">
                        <a href={`tel:${settings.info.phoneRaw}`} className="flex items-center gap-2 hover:text-gold transition-colors">
                            <Phone className="w-3 h-3 text-gold" />
                            {settings.info.phone}
                        </a>
                        <div className="h-4 w-[1px] bg-white/20 mx-1"></div>
                        <div className="flex gap-4">
                            <a href={settings.info.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                                <Facebook className="w-3.5 h-3.5" />
                            </a>
                            <a href={settings.info.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                                <Instagram className="w-3.5 h-3.5" />
                            </a>
                        </div>
                        <div className="h-4 w-[1px] bg-white/20 mx-1"></div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => changeLanguage('fr')}
                                className={`hover:text-gold transition-colors ${i18n.language === 'fr' ? 'text-gold font-bold' : ''}`}
                            >
                                FR
                            </button>
                            <span>|</span>
                            <button
                                onClick={() => changeLanguage('en')}
                                className={`hover:text-gold transition-colors ${i18n.language === 'en' ? 'text-gold font-bold' : ''}`}
                            >
                                EN
                            </button>
                            <span>|</span>
                            <button
                                onClick={() => changeLanguage('de')}
                                className={`hover:text-gold transition-colors ${i18n.language === 'de' ? 'text-gold font-bold' : ''}`}
                            >
                                DE
                            </button>
                            <span>|</span>
                            <button
                                onClick={() => changeLanguage('it')}
                                className={`hover:text-gold transition-colors ${i18n.language === 'it' ? 'text-gold font-bold' : ''}`}
                            >
                                IT
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Main Navigation */}
            <header
                className={`fixed left-0 right-0 z-50 transition-all duration-500 border-b ${(scrolled || activeSection !== 'accueil')
                    ? `bg-white/95 backdrop-blur-xl border-gray-200/50 shadow-md text-foreground ${showTopBar ? 'top-10 py-3' : 'top-0 py-3'}`
                    : `bg-transparent border-transparent text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] ${showTopBar ? 'top-0 lg:top-10 py-6' : 'top-0 py-6'}`
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
                    {/* Logo Area */}
                    <a href={`/${i18n.language}/#accueil`} className="flex items-center gap-3 group">
                        <motion.div
                            className={`p-0.5 rounded-xl transition-all duration-500 ${(scrolled || activeSection !== 'accueil') ? 'bg-primary/5 scale-90' : 'bg-white/70 backdrop-blur-sm shadow-lg'}`}
                            animate={{ scale: (scrolled || activeSection !== 'accueil') ? 0.85 : 1 }}
                        >
                            <img
                                src={settings.images.logo}
                                alt="Logo Boucherie Vaz"
                                className="w-20 h-20 object-contain group-hover:scale-110 transition-transform duration-300"
                            />
                        </motion.div>
                        <div className="flex flex-col">
                            <span className={`font-serif text-xl font-bold leading-none tracking-tight ${(scrolled || activeSection !== 'accueil') ? 'text-foreground' : 'text-white'}`}>
                                Boucherie Vaz
                            </span>
                            <span className={`text-[10px] uppercase tracking-[0.2em] font-sans font-semibold ${(scrolled || activeSection !== 'accueil') ? 'text-muted-foreground' : 'text-white/80'}`}>
                                Vallorbe
                            </span>
                        </div>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-8">
                        <ul className="flex items-center gap-8 font-sans text-sm font-semibold tracking-wide">
                            {navItems.map((item) => {
                                const href = `/${i18n.language}/${item.href}`;
                                return (
                                    <li key={item.id}>
                                        <a
                                            href={href}
                                            className={`relative py-1 transition-all duration-300 group ${activeSection === item.id
                                                ? 'text-primary'
                                                : (scrolled || activeSection !== 'accueil') ? 'text-foreground/80 hover:text-primary' : 'text-white/90 hover:text-white'
                                                }`}
                                        >
                                            {item.label}
                                            <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label={t('nav.toggleMenu', 'Ouvrir le menu')}
                        className={`lg:hidden p-2 rounded-lg transition-colors ${(scrolled || activeSection !== 'accueil') ? 'hover:bg-muted text-foreground' : 'hover:bg-white/10 text-white'}`}
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
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + i * 0.1 }}
                                    >
                                        <a
                                            href={`/${i18n.language}/${item.href}`}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`transition-colors ${activeSection === item.id ? 'text-primary' : 'hover:text-primary'}`}
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
                                    <a href="https://www.facebook.com/people/Boucherie-Charcuterie-Vaz/61579169247905/" target="_blank" rel="noopener noreferrer" className="p-2 bg-primary/10 rounded-full text-primary hover:bg-primary hover:text-white transition-all">
                                        <Facebook className="w-5 h-5" />
                                    </a>
                                    <a href="https://www.instagram.com/boucherievaz/" target="_blank" rel="noopener noreferrer" className="p-2 bg-primary/10 rounded-full text-primary hover:bg-primary hover:text-white transition-all">
                                        <Instagram className="w-5 h-5" />
                                    </a>
                                </div>
                                <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-border/50">
                                    {[
                                        { code: 'fr', label: 'FRANÇAIS' },
                                        { code: 'en', label: 'ENGLISH' },
                                        { code: 'de', label: 'DEUTSCH' },
                                        { code: 'it', label: 'ITALIANO' }
                                    ].map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => { changeLanguage(lang.code); setMobileMenuOpen(false); }}
                                            className={`py-3 px-4 rounded-xl font-bold text-sm transition-all border ${i18n.language === lang.code
                                                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                                                    : 'bg-white text-muted-foreground border-border/50 active:bg-muted'
                                                }`}
                                        >
                                            {lang.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
