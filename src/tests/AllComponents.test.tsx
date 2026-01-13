import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { Header } from '../app/components/Header';
import { Footer } from '../app/components/Footer';
import { Hero } from '../app/components/Hero';
import { ContactSection } from '../app/components/ContactSection';
import { ProduitsSection } from '../app/components/ProduitsSection';
import { ValeursSection } from '../app/components/ValeursSection';
import { LegalPage } from '../app/components/LegalPage';
import { CookieBanner } from '../app/components/CookieBanner';
import { ScrollToTop } from '../app/components/ScrollToTop';
import { OptimizedImage } from '../app/components/OptimizedImage';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
    <I18nextProvider i18n={i18n}>
        <BrowserRouter>
            {children}
        </BrowserRouter>
    </I18nextProvider>
);

describe('Header Component', () => {
    it('should render without crashing', () => {
        render(<Header />, { wrapper: TestWrapper });
        expect(document.querySelector('header')).toBeInTheDocument();
    });

    it('should have navigation links', () => {
        render(<Header />, { wrapper: TestWrapper });
        const links = screen.getAllByRole('link');
        expect(links.length).toBeGreaterThan(0);
    });
});

describe('Footer Component', () => {
    it('should render footer', () => {
        render(<Footer />, { wrapper: TestWrapper });
        expect(document.querySelector('footer')).toBeInTheDocument();
    });

    it('should have links', () => {
        render(<Footer />, { wrapper: TestWrapper });
        const links = screen.getAllByRole('link');
        expect(links.length).toBeGreaterThan(0);
    });
});

describe('Hero Component', () => {
    it('should render hero section', () => {
        render(<Hero />, { wrapper: TestWrapper });
        expect(screen.getByRole('heading')).toBeInTheDocument();
    });
});

describe('ContactSection Component', () => {
    it('should render contact form', () => {
        render(<ContactSection />, { wrapper: TestWrapper });
        expect(document.querySelector('form')).toBeInTheDocument();
    });
});

describe('ProduitsSection Component', () => {
    it('should render products section', () => {
        render(<ProduitsSection />, { wrapper: TestWrapper });
        const heading = screen.getByRole('heading', { level: 2 });
        expect(heading).toBeInTheDocument();
    });
});

describe('ValeursSection Component', () => {
    it('should render values section', () => {
        render(<ValeursSection />, { wrapper: TestWrapper });
        const heading = screen.getByRole('heading', { level: 2 });
        expect(heading).toBeInTheDocument();
    });
});

describe('LegalPage Component', () => {
    beforeEach(() => {
        window.scrollTo = vi.fn();
    });

    it('should render legal content', () => {
        render(<LegalPage type="legal" />, { wrapper: TestWrapper });
        expect(screen.getByRole('heading')).toBeInTheDocument();
    });

    it('should render privacy content', () => {
        render(<LegalPage type="privacy" />, { wrapper: TestWrapper });
        expect(screen.getByRole('heading')).toBeInTheDocument();
    });

    it('should scroll to top on mount', () => {
        render(<LegalPage type="legal" />, { wrapper: TestWrapper });
        expect(window.scrollTo).toHaveBeenCalled();
    });
});

describe('CookieBanner Component', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('should render cookie banner', () => {
        render(<CookieBanner />, { wrapper: TestWrapper });
        expect(document.body).toBeInTheDocument();
    });
});

describe('ScrollToTop Component', () => {
    beforeEach(() => {
        window.scrollTo = vi.fn();
    });

    it('should render scroll button', () => {
        render(<ScrollToTop />, { wrapper: TestWrapper });
        expect(document.body).toBeInTheDocument();
    });
});

describe('OptimizedImage Component', () => {
    it('should render image', () => {
        render(<OptimizedImage src="/test.jpg" alt="Test" />);
        expect(document.querySelector('picture')).toBeInTheDocument();
    });

    it('should have alt attribute', () => {
        render(<OptimizedImage src="/test.jpg" alt="Test Image" />);
        const img = screen.getByAltText('Test Image');
        expect(img).toBeInTheDocument();
    });

    it('should set loading attribute based on priority', () => {
        const { rerender } = render(<OptimizedImage src="/test.jpg" alt="Test" priority={true} />);
        let img = screen.getByAltText('Test');
        expect(img).toHaveAttribute('loading', 'eager');

        rerender(<OptimizedImage src="/test.jpg" alt="Test" priority={false} />);
        img = screen.getByAltText('Test');
        expect(img).toHaveAttribute('loading', 'lazy');
    });
});

describe('I18n Tests', () => {
    it('should load i18n configuration', () => {
        expect(i18n).toBeDefined();
        expect(i18n.language).toBeDefined();
    });

    it('should support multiple languages', () => {
        expect(i18n.options.supportedLngs).toContain('fr');
        expect(i18n.options.supportedLngs).toContain('en');
        expect(i18n.options.supportedLngs).toContain('de');
        expect(i18n.options.supportedLngs).toContain('it');
    });

    it('should change language', async () => {
        await i18n.changeLanguage('en');
        expect(i18n.language).toBe('en');

        await i18n.changeLanguage('fr');
        expect(i18n.language).toBe('fr');
    });
});

describe('Settings', () => {
    it('should load settings file', async () => {
        const settings = await import('../settings.json');
        expect(settings).toBeDefined();
        expect(settings.default).toBeDefined();
    });
});
