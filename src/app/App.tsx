import { Header } from './components/Header';
import { ScrollToTop } from './components/ScrollToTop';
import { ScrollRestoration } from './components/ScrollRestoration';
import { CustomScrollbar } from './components/CustomScrollbar';
import { CookieBanner } from './components/CookieBanner';
import { TransitionOverlay } from './components/TransitionOverlay';
import { PageContent } from './components/PageContent';
import { WelcomeMessage } from './components/WelcomeMessage';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { AnimatePresence } from 'motion/react';

const LegalPage = lazy(() => import('./components/LegalPage').then(m => ({ default: m.LegalPage })));
const CateringPage = lazy(() => import('./components/CateringPage').then(m => ({ default: m.CateringPage })));
const RecipesPage = lazy(() => import('./components/RecipesPage').then(m => ({ default: m.RecipesPage })));

export default function App() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const supportedLangs = ['fr', 'en', 'de', 'it'];
  const [pendingLang, setPendingLang] = useState<string | null>(null);

  const currentPathLang = location.pathname.split('/')[1];
  const isFirstSync = useRef(true);

  // Sync i18n with URL with a dramatic transition overlay
  useEffect(() => {
    if (supportedLangs.includes(currentPathLang) && i18n.language !== currentPathLang) {
      if (isFirstSync.current) {
        // Silent sync on first mount to avoid flicker
        i18n.changeLanguage(currentPathLang);
        document.documentElement.lang = currentPathLang;
        isFirstSync.current = false;
      } else {
        // Dramatic staggered overlay for subsequent changes
        setPendingLang(currentPathLang);
        const timer = setTimeout(() => {
          i18n.changeLanguage(currentPathLang);
          document.documentElement.lang = currentPathLang;

          // Keep overlay a bit longer for the reveal effect
          setTimeout(() => {
            setPendingLang(null);
          }, 800);
        }, 400); // Wait for strips to cover screen
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
      <ScrollRestoration />
      <CookieBanner />
      <WelcomeMessage />
      <TransitionOverlay pendingLang={pendingLang} />

      <AnimatePresence mode="wait">
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes location={location} key={isLanguageRoute ? currentPathLang : 'redirect'}>
            <Route path="/:lang" element={<PageContent />} />
            <Route path="/:lang/traiteur" element={<CateringPage />} />
            <Route path="/:lang/recettes" element={<RecipesPage />} />
            <Route path="/:lang/mentions-legales" element={<LegalPage type="legal" />} />
            <Route path="/:lang/politique-confidentialite" element={<LegalPage type="privacy" />} />
            <Route path="/" element={<Navigate to={`/${finalLang}`} replace />} />
            <Route path="*" element={<Navigate to={`/${finalLang}`} replace />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </div>
  );
}
