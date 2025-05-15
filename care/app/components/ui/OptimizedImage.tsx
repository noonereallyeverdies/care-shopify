import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  loading?: 'eager' | 'lazy';
  placeholder?: 'blur' | 'skeleton' | 'none';
  blurDataURL?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '100vw',
  loading = 'lazy',
  placeholder = 'skeleton',
  blurDataURL
}: OptimizedImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate responsive sizes if not provided
  const responsiveSizes = sizes === '100vw' 
    ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
    : sizes;

  // Generate multiple image sources for different screen sizes
  const generateSrcSet = (baseSrc: string) => {
    const widths = [320, 640, 768, 1024, 1280, 1536];
    return widths
      .map(w => `${baseSrc}?w=${w}&q=75 ${w}w`)
      .join(', ');
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!priority && loading === 'lazy' && imgRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setImageLoaded(true);
              observer.disconnect();
            }
          });
        },
        { threshold: 0.1, rootMargin: '50px' }
      );

      observer.observe(imgRef.current);
      return () => observer.disconnect();
    }
  }, [priority, loading]);

  const handleLoad = () => {
    setImageLoaded(true);
  };

  const handleError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  // Render placeholder while loading
  const renderPlaceholder = () => {
    if (placeholder === 'blur' && blurDataURL) {
      return (
        <img
          src={blurDataURL}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          aria-hidden="true"
        />
      );
    }

    if (placeholder === 'skeleton') {
      return (
        <div
          className={`absolute inset-0 bg-brand-light animate-pulse transition-opacity duration-300 ${
            imageLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ width, height }}
        />
      );
    }

    return null;
  };

  const imageClasses = `
    transition-opacity duration-300 object-cover
    ${imageLoaded ? 'opacity-100' : 'opacity-0'}
    ${className}
  `;

  return (
    <div className="relative overflow-hidden">
      {renderPlaceholder()}
      
      {/* Main image */}
      <img
        ref={imgRef}
        src={imageError ? '/images/placeholder-error.jpg' : src}
        srcSet={generateSrcSet(src)}
        sizes={responsiveSizes}
        alt={alt}
        width={width}
        height={height}
        className={imageClasses}
        loading={priority ? 'eager' : loading}
        onLoad={handleLoad}
        onError={handleError}
        decoding="async"
      />

      {/* Error state */}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-brand-light">
          <p className="text-primary-text-medium text-sm">Image unavailable</p>
        </div>
      )}
    </div>
  );
}

// Pre-load critical images
export function preloadImage(src: string, priority: boolean = false) {
  const link = document.createElement('link');
  link.rel = priority ? 'preload' : 'prefetch';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
}

// Lazy load images on scroll
export function useLazyLoading(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const current = ref.current;
    if (!current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const images = entry.target.querySelectorAll('img[data-src]');
            images.forEach((img) => {
              const imageElement = img as HTMLImageElement;
              imageElement.src = imageElement.dataset.src || '';
              imageElement.removeAttribute('data-src');
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(current);
    return () => observer.disconnect();
  }, [ref]);
}