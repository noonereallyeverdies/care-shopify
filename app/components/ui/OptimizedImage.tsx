/**
 * Optimized image component that builds on Hydrogen's Image with better performance
 */
import { memo, useState, useEffect, useRef } from 'react';
import { Image as HydrogenImage } from '@shopify/hydrogen';
import type { ImageSizeOptions, ImageLoaderOptions } from '@shopify/hydrogen';
import { observe } from '~/utils/performance';

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  aspectRatio?: string;
  sizes?: string;
  loading?: 'eager' | 'lazy';
  className?: string;
  priority?: boolean;
  onLoad?: () => void;
  decoding?: 'async' | 'sync' | 'auto';
  fetchpriority?: 'high' | 'low' | 'auto';
  loaderOptions?: ImageLoaderOptions;
  quality?: number;
  crop?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  placeholderStyle?: 'blur' | 'dominant-color' | 'none';
}

export const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  width,
  height,
  aspectRatio,
  sizes = '100vw',
  loading = 'lazy',
  className = '',
  priority = false,
  onLoad,
  decoding = 'async',
  fetchpriority = 'auto',
  loaderOptions,
  quality = 85,
  crop = 'center',
  objectFit = 'cover',
  placeholderStyle = 'blur',
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isIntersected, setIsIntersected] = useState(false);
  
  // If priority is true, consider it always intersected
  useEffect(() => {
    if (priority) {
      setIsIntersected(true);
    }
  }, [priority]);

  // Set up intersection observer for non-priority images
  useEffect(() => {
    if (priority || !imageRef.current) return;
    
    // Set up intersection observer
    const cleanupObserver = observe(
      imageRef.current,
      (entry) => {
        if (entry.isIntersecting) {
          setIsIntersected(true);
        }
      },
      {
        rootMargin: '200px', // Start loading images when they're 200px from viewport
        threshold: 0.01,
      }
    );
    
    return cleanupObserver;
  }, [priority]);

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  // Determine effective loading strategy
  const effectiveLoading = priority ? 'eager' : loading;
  const effectiveFetchPriority = priority ? 'high' : fetchpriority;

  // Prepare image data for Hydrogen Image
  const imageData = {
    url: src,
    altText: alt,
    width: width || 1000,
    height: height || (aspectRatio ? Math.round((width || 1000) / parseAspectRatio(aspectRatio)) : 1000),
  };

  // Prepare loader options
  const optimizedLoaderOptions: ImageLoaderOptions = {
    crop,
    scale: 2,
    width: width || 1000,
    height: height || (aspectRatio ? Math.round((width || 1000) / parseAspectRatio(aspectRatio)) : 1000),
    ...loaderOptions,
  };

  return (
    <div className={`relative overflow-hidden ${className}`} ref={imageRef}>
      {/* Placeholder until image is loaded */}
      {!isLoaded && placeholderStyle !== 'none' && (
        <div
          className="absolute inset-0 bg-gray-100 animate-pulse"
          style={{
            aspectRatio: aspectRatio || (width && height ? `${width}/${height}` : undefined),
          }}
        />
      )}
      
      {/* Only render the actual image when in viewport (or priority) */}
      {isIntersected && (
        <HydrogenImage
          data={imageData}
          className={`w-full h-full object-${objectFit} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          aspectRatio={aspectRatio}
          sizes={sizes}
          loading={effectiveLoading}
          loaderOptions={optimizedLoaderOptions}
          onLoad={handleLoad}
          decoding={decoding}
          fetchpriority={effectiveFetchPriority}
        />
      )}
    </div>
  );
});

// Utility function to parse aspect ratio string (e.g., "16/9" -> 16/9)
function parseAspectRatio(aspectRatio: string): number {
  if (!aspectRatio.includes('/')) return 1;
  
  const [width, height] = aspectRatio.split('/').map(Number);
  return width / height;
}

export default OptimizedImage;
