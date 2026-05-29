import { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    priority?: boolean;
    quality?: number;
}

/**
 * Derives a WebP source URL from the original image URL.
 * - Sanity CDN: appends fm=webp (+ q param) to the query string
 * - Local/static images: replaces jpg/jpeg/png extension with .webp
 */
function getWebpSrc(src: string, quality: number): string | null {
    if (src.includes('cdn.sanity.io')) {
        const separator = src.includes('?') ? '&' : '?';
        return `${src}${separator}fm=webp&q=${quality}`;
    }
    const match = src.match(/\.(jpe?g|png)(\?.*)?$/i);
    if (match) {
        return src.replace(/\.(jpe?g|png)(\?.*)?$/i, `.webp${match[2] ?? ''}`);
    }
    return null;
}

/**
 * Appends quality param to a Sanity CDN URL (no-op for other URLs).
 */
function applyQuality(src: string, quality: number): string {
    if (!src.includes('cdn.sanity.io')) return src;
    const separator = src.includes('?') ? '&' : '?';
    return `${src}${separator}q=${quality}`;
}

export function OptimizedImage({
    src,
    alt,
    className = '',
    width,
    height,
    priority = false,
    quality = 80
}: OptimizedImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(priority);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (priority || !imgRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: '50px',
                threshold: 0.01
            }
        );

        observer.observe(imgRef.current);

        return () => observer.disconnect();
    }, [priority]);

    const resolvedSrc = isInView ? applyQuality(src, quality) : undefined;
    const webpSrc = isInView ? getWebpSrc(src, quality) : null;

    return (
        <picture
            ref={imgRef as any}
            className="flex items-center justify-center w-full h-full"
        >
            {webpSrc && (
                <source srcSet={webpSrc} type="image/webp" />
            )}
            <img
                src={resolvedSrc}
                alt={alt}
                className={`${className} transition-opacity duration-500 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                width={width}
                height={height}
                loading={priority ? 'eager' : 'lazy'}
                decoding="async"
                onLoad={() => setIsLoaded(true)}
                style={{
                    minHeight: height ? `${height}px` : 'auto'
                }}
            />
        </picture>
    );
}
