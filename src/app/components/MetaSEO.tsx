import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface MetaSEOProps {
    title?: string;
    description?: string;
    canonical?: string;
    schema?: Record<string, any>;
}

export function MetaSEO({ title, description, canonical, schema }: MetaSEOProps) {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const { lang } = useParams();

    useEffect(() => {
        // Construct the base title
        const siteName = "Boucherie-Charcuterie Vaz | Vallorbe";
        const pageTitle = title ? `${title} | ${siteName}` : siteName;
        document.title = pageTitle;

        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            const defaultDesc = t('footer.description', "Boucherie-charcuterie artisanale à Vallorbe. Viandes de qualité et spécialités maison.");
            metaDescription.setAttribute('content', description || defaultDesc);
        }

        // Update canonical link
        const canonicalLink = document.querySelector('link[rel="canonical"]');
        if (canonicalLink) {
            const url = canonical || `https://boucherie-charcuterie-vaz.ch${location.pathname}`;
            canonicalLink.setAttribute('href', url);
        }

        // Update OG tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', pageTitle);

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.setAttribute('content', `https://boucherie-charcuterie-vaz.ch${location.pathname}`);

        // Update lang attribute on html tag
        if (lang) {
            document.documentElement.setAttribute('lang', lang);
        }
    }, [title, description, canonical, location.pathname, t, lang]);

    // Inject JSON-LD
    useEffect(() => {
        if (!schema) return;

        let script = document.querySelector('script[type="application/ld+json"]#dynamic-schema');

        if (!script) {
            script = document.createElement('script');
            script.setAttribute('type', 'application/ld+json');
            script.setAttribute('id', 'dynamic-schema');
            document.head.appendChild(script);
        }

        script.textContent = JSON.stringify(schema);

        return () => {
            if (script) {
                script.textContent = '';
            }
        };
    }, [schema]);

    return null; // This component doesn't render anything
}
