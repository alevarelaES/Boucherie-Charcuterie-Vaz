import { useState, useEffect } from 'react';

/**
 * Hook optimisé pour détecter les media queries.
 * Évite les re-renders inutiles et les calculs côté serveur.
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);

        // Set initial value
        setMatches(media.matches);

        // Create listener
        const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

        // Use modern API with fallback
        if (media.addEventListener) {
            media.addEventListener('change', listener);
        } else {
            media.addListener(listener);
        }

        return () => {
            if (media.removeEventListener) {
                media.removeEventListener('change', listener);
            } else {
                media.removeListener(listener);
            }
        };
    }, [query]);

    return matches;
}

/**
 * Hook spécifique pour détecter les appareils mobiles.
 * Utilise une breakpoint de 1024px (lg).
 */
export function useIsMobile(): boolean {
    return !useMediaQuery('(min-width: 1024px)');
}

/**
 * Hook pour détecter si l'utilisateur préfère les animations réduites.
 */
export function usePrefersReducedMotion(): boolean {
    return useMediaQuery('(prefers-reduced-motion: reduce)');
}
