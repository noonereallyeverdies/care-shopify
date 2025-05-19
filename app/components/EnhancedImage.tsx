import React, { useState, useEffect } from 'react';
import { Image } from '@shopify/hydrogen';
import type { MediaImage } from '@shopify/hydrogen/storefront-api-types';
import {
  ImageFormat,
  ImageQuality,
  ImageFormatPreferences,
  defaultImagePreferences,
  getOptimalFormats,
  getIdealQuality,
  createOptimizedImageUrl,
  generateSrcSet,
  getPlaceholderDimensions,
  createSolidPlaceholder
} from '~/lib/image-format-utils';

// Additional props for the enhanced image component
interface EnhancedImageProps {
  data: MediaImage | null;
  alt: string;
  className?: string;
  id?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  width?: number;
  height?: number;
  loaderOptions?: {
    crop?: 'contain' | 'cover' | 'fill';
    scale?: number;
  };
  onLoad?: () => void;
  onError?: () => void;
  
  // Enhanced image specific props
  imageType?: string; // e.g., 'product', 'banner', 'logo'
  preferredFormats?: ImageFormat[];
  quality?: ImageQuality | number;
  placeholderColor?: string;
  enableBlurhash?: boolean;
  priority?: boolean; // High priority images load eagerly
  fadeInDuration?: number; // Duration of fade-in animation in ms
  generatePlaceholder?: boolean; // Whether to generate a placeholder
}

/**
 * EnhancedImage Component
 * 
 * An improved image component with support for:
 * - Modern formats (AVIF, WebP) with proper fallbacks
 * - Content-aware format and quality selection
 * - Responsive sizes and srcset
 * - Intelligent loading strategies
 * - Placeholder/blurry image techniques
 */
export function EnhancedImage({
  data,
  alt,
  className = '',
  id,
  loading: initialLoading,
  sizes = '100vw',
  width,
  height,
  loaderOptions,
  onLoad,
  onError,
  
  // Enhanced image specific props
  imageType,
  preferredFormats,
  quality,
  placeholderColor = '#f3f4f6',
  enableBlurhash = true,
  priority = false,
  fadeInDuration = 500,
  generatePlaceholder = true,
  
  ...props
}: EnhancedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [placeholderSrc, setPlaceholderSrc] = useState<string>('');
  
  // Determine loading strategy
  const loading = priority ? 'eager' : initialLoading || 'lazy';
  
  // Derive optimal image formats and quality based on content type
  const formats = preferredFormats || getOptimalFormats(imageType);
  const imageQuality = quality || getIdealQuality(imageType);
  
  // Use intrinsic size from the data or provided props
  const intrinsicWidth = width || data?.width || 0;
  const intrinsicHeight = height || data?.height || 0;
  
  // Generate a low-quality placeholder
  useEffect(() => {
    if (!generatePlaceholder || !data?.url) {
      // If no placeholder needed or no image URL, use a solid color
      setPlaceholderSrc(createSolidPlaceholder(placeholderColor));
      return;
    }
    
    // Generate a tiny placeholder image
    const { width: placeholderWidth, height: placeholderHeight } = getPlaceholderDimensions(
      intrinsicWidth,
      intrinsicHeight
    );
    
    // Use WebP for placeholder (smaller than JPEG, widely supported)
    const tinyImageUrl = createOptimizedImageUrl(
      data.url,
      ImageFormat.WEBP,
      ImageQuality.LOW,
      placeholderWidth,
      placeholderHeight
    );
    
    setPlaceholderSrc(tinyImageUrl);
  }, [data?.url, intrinsicWidth, intrinsicHeight, generatePlaceholder, placeholderColor]);

  // Handle image load completion
  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };
  
  if (!data?.url) {
    // Fall back to a placeholder if no image data
    return (
      <div 
        className={`bg-gray-100 ${className}`}
        style={{ 
          width: width || '100%',
          height: height || 'auto',
          aspectRatio: intrinsicWidth && intrinsicHeight 
            ? `${intrinsicWidth} / ${intrinsicHeight}` 
            : undefined
        }}
        aria-label={alt || 'Image placeholder'}
      />
    );
  }
  
  // Generate optimized image URLs for each format
  const avifSrc = createOptimizedImageUrl(data.url, ImageFormat.AVIF, imageQuality, intrinsicWidth, intrinsicHeight);
  const webpSrc = createOptimizedImageUrl(data.url, ImageFormat.WEBP, imageQuality, intrinsicWidth, intrinsicHeight);
  const jpegSrc = createOptimizedImageUrl(data.url, ImageFormat.JPEG, imageQuality, intrinsicWidth, intrinsicHeight);
  
  // Generate srcset for responsive images
  const avifSrcSet = generateSrcSet(data.url, ImageFormat.AVIF, imageQuality);
  const webpSrcSet = generateSrcSet(data.url, ImageFormat.WEBP, imageQuality);
  const jpegSrcSet = generateSrcSet(data.url, ImageFormat.JPEG, imageQuality);
  
  // Blur-up animation styles
  const imageStyles = {
    transition: `opacity ${fadeInDuration}ms ease-in-out, filter ${fadeInDuration}ms ease-in-out`,
    opacity: isLoaded ? 1 : 0,
  };
  
  // Placeholder styles
  const placeholderStyles = {
    position: 'absolute' as const,
    inset: 0,
    width: '100%',
    height: '100%',
    filter: 'blur(8px)',
    transform: 'scale(1.03)', // Slightly larger to prevent blur edges
    opacity: isLoaded ? 0 : 1,
    transition: `opacity ${fadeInDuration}ms ease-in-out`,
    objectFit: 'cover' as const,
  };
  
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ 
        width: width || '100%',
        height: height || 'auto',
        aspectRatio: intrinsicWidth && intrinsicHeight 
          ? `${intrinsicWidth} / ${intrinsicHeight}` 
          : undefined
      }}
      id={id}
    >
      {/* Low quality placeholder image */}
      {generatePlaceholder && (
        <img 
          src={placeholderSrc}
          alt=""
          aria-hidden="true"
          style={placeholderStyles}
          width={intrinsicWidth}
          height={intrinsicHeight}
        />
      )}
      
      {/* Main image with modern format support */}
      <picture>
        {/* AVIF format - best compression, modern browsers */}
        <source
          type="image/avif"
          srcSet={avifSrcSet}
          sizes={sizes}
        />
        
        {/* WebP format - good compression, wide support */}
        <source
          type="image/webp"
          srcSet={webpSrcSet}
          sizes={sizes}
        />
        
        {/* JPEG format - universal fallback */}
        <img
          src={jpegSrc}
          srcSet={jpegSrcSet}
          alt={alt}
          loading={loading}
          onLoad={handleImageLoad}
          onError={onError}
          width={intrinsicWidth || undefined}
          height={intrinsicHeight || undefined}
          style={imageStyles}
          decoding="async"
          {...props}
        />
      </picture>
    </div>
  );
}

/**
 * Enhanced Product Image
 * Specialized version of EnhancedImage specifically for product imagery
 */
export function EnhancedProductImage({
  data,
  alt,
  className,
  ...props
}: Omit<EnhancedImageProps, 'imageType'>) {
  return (
    <EnhancedImage
      data={data}
      alt={alt}
      className={className}
      imageType="product"
      quality={ImageQuality.HIGH}
      priority={props.priority}
      {...props}
    />
  );
}

/**
 * Enhanced Hero Image
 * Specialized version for hero/banner images that often need higher quality
 */
export function EnhancedHeroImage({
  data,
  alt,
  className,
  ...props
}: Omit<EnhancedImageProps, 'imageType' | 'priority'>) {
  return (
    <EnhancedImage
      data={data}
      alt={alt}
      className={className}
      imageType="hero"
      quality={ImageQuality.HIGH}
      priority={true} // Hero images should always load with high priority
      {...props}
    />
  );
}

/**
 * Enhanced Thumbnail Image
 * Specialized version for small thumbnails that can use lower quality
 */
export function EnhancedThumbnailImage({
  data,
  alt,
  className,
  ...props
}: Omit<EnhancedImageProps, 'imageType' | 'quality'>) {
  return (
    <EnhancedImage
      data={data}
      alt={alt}
      className={className}
      imageType="thumbnail"
      quality={ImageQuality.MEDIUM}
      generatePlaceholder={false} // Often not needed for thumbnails
      {...props}
    />
  );
} 