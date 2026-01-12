import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Cleanup after each test case
afterEach(() => {
    cleanup();
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
