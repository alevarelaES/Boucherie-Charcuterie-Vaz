import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollRestoration() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        // If there is no hash, scroll to top
        if (!hash) {
            window.scrollTo(0, 0);
        } else {
            // If there is a hash, let the browser handle it or manually scroll
            // We wait a bit to ensure the mountain of components is rendered
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [pathname, hash]);

    return null;
}
