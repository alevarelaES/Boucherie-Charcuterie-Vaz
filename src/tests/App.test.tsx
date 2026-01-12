import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../app/App';
import '../i18n';

describe('App', () => {
    it('renders without crashing', () => {
        render(<App />);
        // Check for Hero title presence (using a key part of the text or role)
        // Since i18n is async/needs init, we might see the fallback or key if not waited.
        // However, default i18n config here syncs imports if using resources directly.
        // Let's check for "Boucherie Vaz" text which is in Header/Footer.
        expect(screen.getAllByText(/Boucherie Vaz/i).length).toBeGreaterThan(0);
    });

    it('renders the Hero section', () => {
        render(<App />);
        // "Ouvert aujourd'hui" is a key translated as "Ouvert aujourd'hui" in fr default.
        expect(screen.getByText(/Ouvert aujourd'hui/i)).toBeInTheDocument();
    });
});
