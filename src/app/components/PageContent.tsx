import { motion } from 'motion/react';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Hero } from './Hero';
import { ValeursSection } from './ValeursSection';
import { ProduitsSection } from './ProduitsSection';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';

export function PageContent() {
    const location = useLocation();
    const { lang } = useParams();
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
            isInitialMount.current = false;
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
    }, [location.pathname, location.hash, lang]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 0.4,
                ease: "easeOut"
            }}
        >
            <main>
                <Hero />
                <ValeursSection />
                <ProduitsSection />
                <ContactSection />
            </main>
            <Footer />
        </motion.div>
    );
}
