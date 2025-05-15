import React, { useState, useRef, useEffect } from 'react';
import { cn } from '~/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Source URL for the image */
  src: string;
  /** Fallback source for error cases */
  fallbackSrc?: string;
  /** Alt text for accessibility */
  alt: string;
  /** CSS class names */
  className?: string;
  /** Width of the image (helps with layout shift prevention) */
  width?: number;
  /** Height of the image (helps with layout shift prevention) */
  height?: number;
  /** Threshold for intersection observer (0-1) */
  threshold?: number;
  /** Root margin for intersection observer */
  rootMargin?: string;
  /** Placeholder content while loading */
  placeholder?: React.ReactNode;
  /** Blur placeholder data URL */
  blurDataURL?: string;
  /** Loading strategy */
  loading?: 'lazy' | 'eager';
  /** Sizes attribute for responsive images */
  sizes?: string;
  /** srcSet for responsive images */
  srcSet?: string;
  /** Callback when image loads */
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  /** Callback when image fails to load */
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
}

/**
 * LazyImage Component
 * 
 * Provides lazy loading for images using Intersection Observer API.
 * Features:
 * - Automatic lazy loading with configurable threshold
 * - Layout shift prevention with width/height
 * - Blur placeholder support
 * - Error fallback handling
 * - Progressive loading with fade-in animation
 * - Responsive image support
 */
export function LazyImage({
  src,
  fallbackSrc,
  alt,
  className,
  width,
  height,
  threshold = 0.1,
  rootMargin = '50px',
  placeholder,
  blurDataURL,
  loading = 'lazy',
  sizes,
  srcSet,
  onLoad,
  onError,
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(loading === 'eager');
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  // Set up Intersection Observer for lazy loading
  useEffect(() => {
    if (loading === 'eager' || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (placeholderRef.current) {
      observer.observe(placeholderRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, loading, isInView]);

  // Handle image load
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoaded(true);
    onLoad?.(event);
  };

  // Handle image error
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setHasError(true);
    if (fallbackSrc && event.currentTarget.src !== fallbackSrc) {
      event.currentTarget.src = fallbackSrc;
      setHasError(false);
    } else {
      onError?.(event);
    }
  };

  // Determine what to show
  const showPlaceholder = !isInView || !isLoaded;
  const showImage = isInView;

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{ 
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
        aspectRatio: width && height ? `${width} / ${height}` : undefined
      }}
    >
      {/* Placeholder */}
      {showPlaceholder && (
        <div
          ref={placeholderRef}
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{
            backgroundImage: blurDataURL ? `url(${blurDataURL})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: blurDataURL ? 'blur(8px)' : undefined,
          }}
        >
          {placeholder && (
            <div className="absolute inset-0 flex items-center justify-center">
              {placeholder}
            </div>
          )}
          
          {/* Skeleton loader */}
          {!placeholder && !blurDataURL && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer" />
            </div>
          )}
        </div>
      )}

      {/* Actual Image */}
      {showImage && (
        <img
          ref={imgRef}
          src={hasError ? (fallbackSrc || src) : src}
          srcSet={!hasError ? srcSet : undefined}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={cn(
            'absolute inset-0 w-full h-full object-cover transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          {...props}
        />
      )}

      {/* Error state */}
      {hasError && !fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 opacity-50">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-sm">Failed to load image</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Higher-order component for easy integration with existing images
export function withLazyLoading<P extends { src: string; alt: string }>(
  Component: React.ComponentType<P>
) {
  return function LazyLoadedComponent(props: P) {
    return <LazyImage {...props} />;
  };
}

// Preload critical images
export function preloadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Preload multiple images
export function preloadImages(srcs: string[]): Promise<HTMLImageElement[]> {
  return Promise.all(srcs.map(preloadImage));
}

// Hook for preloading images
export function useImagePreloader(srcs: string[]) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (srcs.length === 0) {
      setIsLoaded(true);
      return;
    }

    preloadImages(srcs)
      .then(() => {
        setIsLoaded(true);
      })
      .catch((err) => {
        setError(err);
      });
  }, [srcs]);

  return { isLoaded, error };
}