import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

import i18n from '../i18n';

// Cleanup after each test case
afterEach(async () => {
    cleanup();
    await i18n.changeLanguage('fr');
    localStorage.clear();
});

// Mock IntersectionObserver for Motion
const IntersectionObserverMock = class IntersectionObserver {
    readonly root: Element | null = null;
    readonly rootMargin: string = '';
    readonly thresholds: ReadonlyArray<number> = [];

    constructor(public callback: IntersectionObserverCallback, public options?: IntersectionObserverInit) { }

    observe = vi.fn((element: Element) => {
        // Simulate immediate intersection for testing
        this.callback([{
            isIntersecting: true,
            target: element,
            intersectionRatio: 1,
            boundingClientRect: element.getBoundingClientRect(),
            intersectionRect: element.getBoundingClientRect(),
            rootBounds: element.getBoundingClientRect(),
            time: Date.now()
        }] as unknown as IntersectionObserverEntry[], this);
    });

    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = vi.fn();
};

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

// Mock Scroll functionality
Object.defineProperty(window, 'scrollTo', { value: vi.fn(), writable: true });
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

// Mock localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};

    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value.toString();
        },
        removeItem: (key: string) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        }
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});
