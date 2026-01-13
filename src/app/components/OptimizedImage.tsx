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
                rootMargin: '50px', // Start loading 50px before entering viewport
                threshold: 0.01
            }
        );

        observer.observe(imgRef.current);

        return () => observer.disconnect();
    }, [priority]);

    // Generate WebP alternative if available
    const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const originalExt = src.match(/\.(jpg|jpeg|png)$/i)?.[1];

    return (
        <picture ref={imgRef as any}>
            {/* WebP version for modern browsers */}
            {isInView && (
                <source
                    srcSet={webpSrc}
                    type="image/webp"
                />
            )}

            {/* Fallback to original format */}
            <img
                src={isInView ? src : undefined}
                alt={alt}
                className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'
                    } ${className}`}
                width={width}
                height={height}
                loading={priority ? 'eager' : 'lazy'}
                decoding="async"
                onLoad={() => setIsLoaded(true)}
                style={{
                    backgroundColor: '#f3f4f6', // Placeholder color
                    minHeight: height ? `${height}px` : 'auto'
                }}
            />
        </picture>
    );
}
