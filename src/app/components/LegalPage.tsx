import { useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Footer } from './Footer';

interface LegalPageProps {
    type: 'legal' | 'privacy';
}

export function LegalPage({ type }: LegalPageProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Force scroll to top only once on mount
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []); // Empty deps array - only run once

    const content = useMemo(() => type === 'legal' ? (
        <div className="space-y-12">
            <section>
                <h2 className="text-3xl font-serif font-bold text-primary mb-6">{t('legalContent.owner')}</h2>
                <p className="text-xl leading-relaxed whitespace-pre-line text-foreground/80">
                    {t('legalContent.ownerText')}
                </p>
            </section>
            <section>
                <h2 className="text-3xl font-serif font-bold text-primary mb-6">{t('legalContent.hosting')}</h2>
                <p className="text-xl leading-relaxed whitespace-pre-line text-foreground/80">
                    {t('legalContent.hostingText')}
                </p>
            </section>
            <section>
                <h2 className="text-3xl font-serif font-bold text-primary mb-6">{t('legalContent.termsTitle')}</h2>
                <p className="text-xl leading-relaxed text-foreground/80">
                    {t('legalContent.termsText')}
                </p>
            </section>
        </div>
    ) : (
        <div className="space-y-12">
            <section>
                <h2 className="text-3xl font-serif font-bold text-primary mb-6">{t('privacyContent.dataTitle')}</h2>
                <p className="text-xl leading-relaxed text-foreground/80">
                    {t('privacyContent.dataText')}
                </p>
            </section>
            <section>
                <h2 className="text-3xl font-serif font-bold text-primary mb-6">{t('privacyContent.cookiesTitle')}</h2>
                <p className="text-xl leading-relaxed text-foreground/80">
                    {t('privacyContent.cookiesText')}
                </p>
            </section>
            <section>
                <h2 className="text-3xl font-serif font-bold text-primary mb-6">{t('privacyContent.rightsTitle')}</h2>
                <p className="text-xl leading-relaxed text-foreground/80">
                    {t('privacyContent.rightsText')}
                </p>
            </section>
        </div>
    ), [type, t]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-background flex flex-col pt-32"
        >
            <main className="flex-grow max-w-4xl mx-auto px-6 py-20">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all mb-12 group"
                >
                    <ChevronLeft className="w-5 h-5" />
                    {t('back')}
                </button>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl md:text-7xl font-serif font-bold mb-16"
                >
                    {type === 'legal' ? t('legalContent.title') : t('privacyContent.title')}
                </motion.h1>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    {content}
                </motion.div>
            </main>
            <Footer />
        </motion.div>
    );
}
