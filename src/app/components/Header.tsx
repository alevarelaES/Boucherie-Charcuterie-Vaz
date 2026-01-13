import { Menu } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import settings from '../../settings.json';
import { TopBar } from './header/TopBar';
import { MobileMenu } from './header/MobileMenu';
import { Logo } from './ui/Logo';

export function Header() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showTopBar, setShowTopBar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [activeSection, setActiveSection] = useState('accueil');

    // Scroll and Section Detection
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrolled(currentScrollY > 50);

            // Desktop top bar show/hide logic
            if (currentScrollY < 10) {
                setShowTopBar(true);
            } else if (currentScrollY < lastScrollY) {
                setShowTopBar(true);
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setShowTopBar(false);
            }
            setLastScrollY(currentScrollY);
        };

        const handleResize = () => {
            if (window.innerWidth >= 1024) setMobileMenuOpen(false);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);

        // Observer for active section highlighting
        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -40% 0px',
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) setActiveSection(entry.target.id);
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const sections = ['accueil', 'a-propos', 'produits', 'contact'];

        const timeoutId = setTimeout(() => {
            sections.forEach((id) => {
                const el = document.getElementById(id);
                if (el) observer.observe(el);
            });
        }, 800);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            observer.disconnect();
            clearTimeout(timeoutId);
        };
    }, [lastScrollY]);

    // Body scroll lock
    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [mobileMenuOpen]);

    const navItems = [
        { id: 'accueil', label: t('nav.home', 'Accueil'), href: '#accueil' },
        { id: 'a-propos', label: t('nav.about', 'À propos'), href: '#a-propos' },
        { id: 'produits', label: t('nav.products', 'Produits'), href: '#produits' },
        { id: 'contact', label: t('nav.contact', 'Contact'), href: '#contact' }
    ];

    const changeLanguage = (newLang: string) => {
        const pathParts = location.pathname.split('/');
        pathParts[1] = newLang;
        navigate(pathParts.join('/') + location.hash);
    };

    const isTransparent = !scrolled && activeSection === 'accueil';

    // CLASSES LOGIC: Separation between Mobile Floating and Desktop Traditional
    const headerBaseClasses = "fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out px-4 md:px-8";
    const headerStyleClasses = isTransparent
        ? "top-0 lg:top-10 py-5 bg-transparent border-transparent text-white"
        : "top-2 mx-2 md:mx-auto lg:top-0 lg:mx-0 max-w-[calc(100%-1rem)] lg:max-w-none bg-white/90 lg:bg-white/95 backdrop-blur-xl border border-gray-200/50 lg:border-b lg:border-x-0 lg:border-t-0 shadow-lg rounded-[2rem] lg:rounded-none py-2 lg:py-4 text-foreground";

    return (
        <>
            <TopBar
                show={showTopBar}
                isTransparent={isTransparent}
                scrolled={scrolled}
                currentLang={i18n.language}
                onLanguageChange={changeLanguage}
            />

            <header className={`${headerBaseClasses} ${headerStyleClasses}`}>
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo Section - Circular Brand Emblem */}
                    <a href={`/${i18n.language}/#accueil`} className="flex items-center gap-3 md:gap-4 group">
                        <Logo isTransparent={isTransparent} />
                        <div className="flex flex-col">
                            <span className={`font-serif text-lg md:text-2xl font-black leading-none tracking-tight ${!isTransparent ? 'text-primary' : 'text-white'}`}>
                                Boucherie Vaz
                            </span>
                            <span className={`text-[9px] md:text-xs uppercase tracking-[0.25em] font-sans font-bold ${!isTransparent ? 'text-muted-foreground' : 'text-white/90'}`}>
                                Vallorbe
                            </span>
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-12">
                        <ul className="flex items-center gap-10 font-sans text-xs font-bold tracking-[0.2em] uppercase">
                            {navItems.map((item) => (
                                <li key={item.id}>
                                    <a
                                        href={`/${i18n.language}/${item.href}`}
                                        className={`relative py-2 transition-all duration-300 group ${activeSection === item.id
                                            ? (isTransparent ? 'text-gold' : 'text-primary')
                                            : (isTransparent ? 'text-white/90 hover:text-white' : 'text-foreground/70 hover:text-primary')
                                            }`}
                                    >
                                        {item.label}
                                        <motion.span
                                            className="absolute bottom-0 left-0 h-0.5 bg-primary"
                                            initial={false}
                                            animate={{ width: activeSection === item.id ? '100%' : '0%' }}
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Mobile Menu Button - STRICTLY HIDDEN ON DESKTOP */}
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className={`lg:hidden p-3 rounded-full transition-all active:scale-95 ${!isTransparent ? 'bg-primary/5 text-primary' : 'bg-white/10 text-white border border-white/20'}`}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </header>

            <MobileMenu
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                navItems={navItems}
                activeSection={activeSection}
                currentLang={i18n.language}
                onLanguageChange={changeLanguage}
            />
        </>
    );
}
