import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from '../app/App';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

describe('App Routes Integration Tests', () => {
    it('should render home page on root route', async () => {
        render(
            <I18nextProvider i18n={i18n}>
                <MemoryRouter initialEntries={['/fr']}>
                    <App />
                </MemoryRouter>
            </I18nextProvider>
        );

        await waitFor(() => {
            expect(document.querySelector('main')).toBeInTheDocument();
        });
    });

    it('should navigate to legal page', async () => {
        render(
            <I18nextProvider i18n={i18n}>
                <MemoryRouter initialEntries={['/fr/mentions-legales']}>
                    <App />
                </MemoryRouter>
            </I18nextProvider>
        );

        await waitFor(() => {
            const headings = screen.getAllByRole('heading');
            const hasLegalHeading = headings.some(h =>
                h.textContent.includes('Mentions') ||
                h.textContent.includes('Legal')
            );
            expect(hasLegalHeading).toBe(true);
        });
    });

    it('should navigate to privacy policy page', async () => {
        render(
            <I18nextProvider i18n={i18n}>
                <MemoryRouter initialEntries={['/fr/politique-confidentialite']}>
                    <App />
                </MemoryRouter>
            </I18nextProvider>
        );

        await waitFor(() => {
            const headings = screen.getAllByRole('heading');
            const hasPrivacyHeading = headings.some(h =>
                h.textContent.includes('Confidentialité') ||
                h.textContent.includes('Privacy')
            );
            expect(hasPrivacyHeading).toBe(true);
        });
    });

    it('should handle language routing for all supported languages', async () => {
        const languages = ['fr', 'en', 'de', 'it'];

        for (const lang of languages) {
            const { unmount } = render(
                <I18nextProvider i18n={i18n}>
                    <MemoryRouter initialEntries={[`/${lang}`]}>
                        <App />
                    </MemoryRouter>
                </I18nextProvider>
            );

            await waitFor(() => {
                expect(document.querySelector('main')).toBeInTheDocument();
            });

            unmount();
        }
    });

    it('should redirect unknown routes to home', async () => {
        render(
            <I18nextProvider i18n={i18n}>
                <MemoryRouter initialEntries={['/unknown-route']}>
                    <App />
                </MemoryRouter>
            </I18nextProvider>
        );

        await waitFor(() => {
            expect(document.querySelector('main')).toBeInTheDocument();
        });
    });

    it('should handle anchor navigation within home page', async () => {
        render(
            <I18nextProvider i18n={i18n}>
                <MemoryRouter initialEntries={['/fr/#produits']}>
                    <App />
                </MemoryRouter>
            </I18nextProvider>
        );

        await waitFor(() => {
            const produitsSection = document.getElementById('produits');
            expect(produitsSection).toBeInTheDocument();
        });
    });

    it('should have all required sections on home page', async () => {
        render(
            <I18nextProvider i18n={i18n}>
                <MemoryRouter initialEntries={['/fr']}>
                    <App />
                </MemoryRouter>
            </I18nextProvider>
        );

        await waitFor(() => {
            expect(document.getElementById('accueil')).toBeInTheDocument();
            expect(document.getElementById('a-propos')).toBeInTheDocument();
            expect(document.getElementById('produits')).toBeInTheDocument();
            expect(document.getElementById('contact')).toBeInTheDocument();
        });
    });
});
