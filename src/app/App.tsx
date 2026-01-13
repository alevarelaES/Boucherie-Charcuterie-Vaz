import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProduitsSection } from './components/ProduitsSection';
import { ValeursSection } from './components/ValeursSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { CustomScrollbar } from './components/CustomScrollbar';
import { CookieBanner } from './components/CookieBanner';
import { LegalPage } from './components/LegalPage';
import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Premium Transition Overlay
function TransitionOverlay({ isChanging }: { isChanging: boolean }) {
  return (
    <AnimatePresence>
      {isChanging && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-primary origin-top pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
}

function PageContent() {
  const location = useLocation();
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const [activeLang] = useState(lang);
  const isInitialMount = useRef(true);

  // Handle anchor scrolling and scroll-to-top
  useEffect(() => {
    // On initial mount, we force scroll to top and skip hash scrolling
    if (isInitialMount.current) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      // Clear hash from URL to be clean if it's a hard refresh
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
      return;
    }

    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const timeout = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return () => clearTimeout(timeout);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.pathname, location.hash, activeLang]);

  useEffect(() => {
    isInitialMount.current = false;
  }, []);

  return (
    <motion.div
      initial={isInitialMount.current ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.4,
        ease: "easeOut"
      }}
    >
      <main>
        <div id="accueil">
          <Hero />
        </div>
        <div id="a-propos">
          <ValeursSection />
        </div>
        <div id="produits">
          <ProduitsSection />
        </div>
        <div id="contact">
          <ContactSection />
        </div>
      </main>
      <Footer />
    </motion.div>
  );
}

export default function App() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const supportedLangs = ['fr', 'en', 'de', 'it'];
  const [isChanging, setIsChanging] = useState(false);

  const currentPathLang = location.pathname.split('/')[1];

  const isFirstSync = useRef(true);

  // Sync i18n with URL with a small delay to handle transitions better
  useEffect(() => {
    if (supportedLangs.includes(currentPathLang) && i18n.language !== currentPathLang) {
      if (isFirstSync.current) {
        // Silent sync on first mount to avoid flicker
        i18n.changeLanguage(currentPathLang);
        document.documentElement.lang = currentPathLang;
        isFirstSync.current = false;
      } else {
        // Dramatic overlay for subsequent changes
        setIsChanging(true);
        const timer = setTimeout(() => {
          i18n.changeLanguage(currentPathLang);
          document.documentElement.lang = currentPathLang;
          setIsChanging(false);
        }, 300);
        return () => clearTimeout(timer);
      }
    } else {
      isFirstSync.current = false;
    }
  }, [currentPathLang, i18n]);

  const getInitialLang = () => {
    const detected = i18n.language.split('-')[0];
    return supportedLangs.includes(detected) ? detected : 'fr';
  };

  const finalLang = getInitialLang();
  const isLanguageRoute = supportedLangs.includes(currentPathLang);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <CustomScrollbar />
      <Header />
      <ScrollToTop />
      <CookieBanner />
      <TransitionOverlay isChanging={isChanging} />

      <AnimatePresence mode="wait">
        <Routes location={location} key={isLanguageRoute ? currentPathLang : 'redirect'}>
          <Route path="/:lang" element={<PageContent />} />
          <Route path="/:lang/mentions-legales" element={<LegalPage type="legal" />} />
          <Route path="/:lang/politique-confidentialite" element={<LegalPage type="privacy" />} />
          <Route path="/" element={<Navigate to={`/${finalLang}`} replace />} />
          <Route path="*" element={<Navigate to={`/${finalLang}`} replace />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
