import { Menu } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import defaultSettings from '../../settings.json';
import { useSiteSettings } from '../../hooks/useSanity';
import { urlFor } from '../../lib/sanity/image';
import { TopBar } from './header/TopBar';
import { MobileMenu } from './header/MobileMenu';
import { Logo } from './ui/Logo';

export function Header() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const { data: sanitySettings } = useSiteSettings();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showTopBar, setShowTopBar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [activeSection, setActiveSection] = useState('accueil');

    const currentLang = (i18n.language as 'fr' | 'de') || 'fr';

    // Prepare data with fallbacks
    const siteName = sanitySettings?.siteName?.[currentLang] || "Boucherie Vaz";
    const siteCity = sanitySettings?.contact?.address?.city || "Vallorbe";

    // Contact Info Preparation
    const address = sanitySettings?.contact?.address
        ? `${sanitySettings.contact.address.street}, ${sanitySettings.contact.address.postalCode} ${sanitySettings.contact.address.city}`
        : defaultSettings.info.address;

    // Generate map link if missing (simplified logic)
    const addressMap = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address + ' Boucherie Vaz')}`;

    const phone = sanitySettings?.contact?.phone || defaultSettings.info.phone;
    const phoneRaw = phone.replace(/\s+/g, '');

    const contactInfo = {
        address,
        addressMap,
        phone,
        phoneRaw
    };

    const socialLinks = {
        facebook: sanitySettings?.socialMedia?.facebook || defaultSettings.info.facebook,
        instagram: sanitySettings?.socialMedia?.instagram || defaultSettings.info.instagram
    };

    const logoUrl = sanitySettings?.logo
        ? urlFor(sanitySettings.logo).width(200).url()
        : defaultSettings.images.logo;


    // Scroll and Section Detection
    const lastScrollYRef = useRef(0);
    useEffect(() => {
        const handleScroll = () => {
            // Secure scroll detection for mobile (prevent negative scroll bounce)
            const currentScrollY = Math.max(window.scrollY, 0);

            // Lower threshold for mobile to ensure it becomes white quickly
            setScrolled(currentScrollY > 10);

            // Desktop top bar show/hide logic - skip on mobile for simplicity
            if (window.innerWidth >= 1024) {
                if (currentScrollY < 10) {
                    setShowTopBar(true);
                } else if (currentScrollY < lastScrollYRef.current) {
                    setShowTopBar(true);
                } else if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
                    setShowTopBar(false);
                }
            }
            lastScrollYRef.current = currentScrollY;
        };

        const handleResize = () => {
            if (window.innerWidth >= 1024) setMobileMenuOpen(false);
        };

        // Passive listener is better for scroll performance
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);

        // Observer for active section highlighting
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -40% 0px',
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
    }, []);

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

    const isTransparent = !scrolled && activeSection === 'accueil' && location.pathname.length <= 4;

    // CLASSES LOGIC: More robust mobile header with hardware acceleration
    // Added 'transform-gpu' and 'top-0' explicit to fix Chrome Mobile disappearing issues
    const headerBaseClasses = "fixed top-0 left-0 right-0 z-[9999] px-4 md:px-8 transform-gpu backface-hidden";

    // On mobile, keep it simple: if scrolled, it's a solid white bar. No floating stuff that bugs out.
    // Removed backdrop-blur on mobile if scrolled to avoid rendering glitches on some androids? kept for now but with solid opacity.
    const headerStyleClasses = isTransparent
        ? "py-3 bg-transparent border-transparent text-white"
        : "py-2 lg:py-3 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-md text-foreground lg:mx-0";

    return (
        <>
            <TopBar
                show={showTopBar}
                isTransparent={isTransparent}
                scrolled={scrolled}
                currentLang={i18n.language}
                onLanguageChange={changeLanguage}
                contactInfo={contactInfo}
                socialLinks={socialLinks}
            />

            <motion.header
                className={`${headerBaseClasses} ${headerStyleClasses}`}
                initial={false}
                animate={{
                    y: (showTopBar || !scrolled) ? (window.innerWidth >= 1024 ? 35 : 0) : 0
                }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo Section */}
                    <a
                        href={`/${i18n.language}#accueil`}
                        className="flex items-center group transition-transform active:scale-95"
                        onClick={(e) => {
                            const targetPath = `/${i18n.language}`;
                            if (location.pathname === targetPath || location.pathname === `${targetPath}/`) {
                                e.preventDefault();
                                document.getElementById('accueil')?.scrollIntoView({ behavior: 'smooth' });
                                window.history.pushState(null, '', `/${i18n.language}#accueil`);
                            } else {
                                e.preventDefault();
                                navigate(`/${i18n.language}#accueil`);
                            }
                        }}
                    >
                        <Logo isTransparent={isTransparent} logoUrl={logoUrl} />
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-12">
                        <ul className="flex items-center gap-10 font-sans text-xs font-bold tracking-[0.2em] uppercase">
                            {navItems.map((item) => (
                                <li key={item.id}>
                                    <a
                                        href={`/${i18n.language}${item.href}`}
                                        onClick={(e) => {
                                            const targetPath = `/${i18n.language}`;
                                            if (location.pathname === targetPath || location.pathname === `${targetPath}/`) {
                                                e.preventDefault();
                                                const id = item.href.replace('#', '');
                                                const element = document.getElementById(id);
                                                if (element) {
                                                    element.scrollIntoView({ behavior: 'smooth' });
                                                    window.history.pushState(null, '', `/${i18n.language}${item.href}`);
                                                }
                                            } else {
                                                e.preventDefault();
                                                navigate(`/${i18n.language}${item.href}`);
                                            }
                                        }}
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
                                            transition={{ duration: 0.2 }}
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
            </motion.header>

            <MobileMenu
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                navItems={navItems}
                activeSection={activeSection}
                currentLang={i18n.language}
                onLanguageChange={changeLanguage}
                contactInfo={contactInfo}
            />
        </>
    );
}
