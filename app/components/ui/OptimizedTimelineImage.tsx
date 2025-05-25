import React, {useState} from 'react';
import {Image} from '@shopify/hydrogen';

interface OptimizedTimelineImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  priority?: boolean;
}

/**
 * Optimized Timeline Image Component
 * 
 * Features:
 * - Uses Shopify's optimized Image component when possible
 * - Fallback to regular img tag for non-Shopify images
 * - Loading states and error handling
 * - Responsive image loading
 * - Performance optimized with lazy loading
 */
export function OptimizedTimelineImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  priority = false,
}: OptimizedTimelineImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Check if this is a Shopify CDN image that can use the Image component
  const isShopifyImage = src?.includes('cdn.shopify.com') || src?.includes('shopify.com');

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  // Loading placeholder
  if (imageLoading && !imageError) {
    return (
      <div className={`bg-neutral-200 animate-pulse flex items-center justify-center ${className}`}>
        <div className="text-neutral-400">
          <svg
            className="w-8 h-8"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    );
  }

  // Error state
  if (imageError) {
    return (
      <div className={`bg-neutral-100 flex items-center justify-center text-neutral-500 ${className}`}>
        <div className="text-center p-4">
          <div className="text-neutral-400 mb-2">
            <svg
              className="w-8 h-8 mx-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="text-sm">{alt}</p>
        </div>
      </div>
    );
  }

  // Use Shopify's optimized Image component for Shopify images
  if (isShopifyImage) {
    try {
      return (
        <Image
          data={{
            url: src,
            altText: alt,
            width: 800,
            height: 600,
          }}
          className={className}
          loading={loading}
          sizes="(min-width: 768px) 40vw, 90vw"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      );
    } catch (error) {
      // Fall back to regular img if Image component fails
      console.warn('Shopify Image component failed, falling back to img tag:', error);
    }
  }

  // Fallback to regular img tag
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      onLoad={handleImageLoad}
      onError={handleImageError}
      decoding="async"
      style={{
        // Ensure proper aspect ratio while loading
        aspectRatio: '4/3',
        objectFit: 'cover',
      }}
    />
  );
}
