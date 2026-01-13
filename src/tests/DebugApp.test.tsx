import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import App from '../app/App';
import '../i18n';
import '@testing-library/jest-dom';
import fs from 'fs';

describe('Debug App', () => {
    it('debugs the rendered output', async () => {
        const { container } = render(
            <MemoryRouter initialEntries={['/fr']}>
                <App />
            </MemoryRouter>
        );

        await new Promise(r => setTimeout(r, 1000));
        fs.writeFileSync('dom_debug.html', container.innerHTML);
    });
});
