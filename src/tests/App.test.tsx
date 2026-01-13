import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import App from '../app/App';
import '../i18n';
import '@testing-library/jest-dom';

describe('App', () => {
    it('renders without crashing', () => {
        render(
            <MemoryRouter initialEntries={['/fr']}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getAllByText(/Boucherie Vaz/i).length).toBeGreaterThan(0);
    });

    it('renders the Hero section', async () => {
        render(
            <MemoryRouter initialEntries={['/fr']}>
                <App />
            </MemoryRouter>
        );
        // Use async find to wait for translations and animations to settle
        const title = await screen.findByText(/La boucherie/i, {}, { timeout: 4000 });
        expect(title).toBeInTheDocument();
    });
});
