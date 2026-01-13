import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import App from '../app/App';
import '../i18n';
import '@testing-library/jest-dom';

describe('Language Switching Integration', () => {
    it('should change content when switching from FR to EN', async () => {
        const { container } = render(
            <MemoryRouter initialEntries={['/fr']}>
                <App />
            </MemoryRouter>
        );

        // Verify initial French content
        expect(screen.getByText(/La boucherie/i)).toBeInTheDocument();

        // Find language switch buttons
        const enButton = screen.getByText(/EN/i);
        fireEvent.click(enButton);

        // Verify content changes to English
        await waitFor(() => {
            // Check for English text from translation.json
            expect(screen.getByText(/The butcher shop/i)).toBeInTheDocument();
        }, { timeout: 4000 });
    });
});
