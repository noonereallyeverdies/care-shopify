import {Image} from '@shopify/hydrogen';
import type {Image as ImageType} from '@shopify/hydrogen/storefront-api-types';

type EnhancedImageProps = {
  image: ImageType;
  className?: string;
  sizes?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  alt?: string;
  isAboveFold?: boolean;
  quality?: number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
};

/**
 * Generate a CDN URL for an image with optimizations
 * 
 * @param url Original image URL
 * @param options Options for the CDN
 * @returns Optimized CDN URL
 */
export function generateCdnUrl(url: string, options: {
  width?: number;
  height?: number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  quality?: number;
}) {
  // If the URL is already a Shopify CDN URL, modify it
  if (url.includes('cdn.shopify.com')) {
    const { width, height, format, quality } = options;
    let cdnUrl = new URL(url);
    
    // Add width parameter if specified
    if (width) {
      cdnUrl.searchParams.set('width', width.toString());
    }
    
    // Add height parameter if specified
    if (height) {
      cdnUrl.searchParams.set('height', height.toString());
    }
    
    // Add format parameter if specified
    if (format && format !== 'auto') {
      cdnUrl.searchParams.set('format', format);
    }
    
    // Add quality parameter if specified
    if (quality) {
      cdnUrl.searchParams.set('quality', quality.toString());
    }
    
    return cdnUrl.toString();
  }
  
  // For third-party URLs, we could integrate with Cloudinary, Imgix, etc.
  // This is a simplified example for now
  return url;
}

/**
 * A CDN-enabled image component with advanced optimization features
 * that provides responsive images with proper loading strategies
 */
export function EnhancedImage({
  image,
  className = '',
  sizes = '100vw',
  width,
  height,
  loading,
  priority = false,
  alt,
  isAboveFold = false,
  quality = 80,
  format = 'auto'
}: EnhancedImageProps) {
  if (!image?.url) {
    return (
      <div 
        className={`bg-neutral-100 ${className}`} 
        style={{aspectRatio: '1/1'}}
        role="img"
        aria-label={alt || "Image placeholder"}
      />
    );
  }

  // Default to image's dimensions, fallback to standard values
  const imageWidth = width || image.width || 800;
  const imageHeight = height || image.height || 800;
  const altText = alt || image.altText || '';
  
  // Determine loading strategy
  const loadingStrategy = loading || (isAboveFold || priority ? 'eager' : 'lazy');
  
  // Generate responsive image widths for srcSet
  const widths = [400, 800, 1200, 1600];
  
  // Generate srcSet with CDN URLs
  const srcSet = widths.map(w => {
    const cdnUrl = generateCdnUrl(image.url, {
      width: w,
      format,
      quality
    });
    return `${cdnUrl} ${w}w`;
  }).join(', ');
  
  // Generate optimized src URL
  const src = generateCdnUrl(image.url, {
    width: imageWidth,
    format,
    quality
  });

  return (
    <Image
      src={src}
      srcSet={srcSet}
      alt={altText}
      width={imageWidth}
      height={imageHeight}
      className={className}
      sizes={sizes}
      loading={loadingStrategy}
      loaderOptions={{
        scale: 2,
        crop: 'center',
      }}
    />
  );
}

/**
 * EnhancedProductImage specifically designed for product images
 * with format, quality and aspect ratio optimizations
 */
export function EnhancedProductImage({ 
  image, 
  isAboveFold = false,
  sizes = '(min-width: 768px) 50vw, 100vw',
  quality = 80,
  widths = [400, 800, 1200],
  className = '',
  format = 'auto',
}: {
  image: ImageType;
  isAboveFold?: boolean;
  sizes?: string;
  quality?: number;
  widths?: number[];
  className?: string;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
}) {
  if (!image?.url) {
    return (
      <div 
        className={`bg-neutral-100 ${className}`} 
        style={{aspectRatio: '1/1'}}
        role="img"
        aria-label="Product image placeholder"
      />
    );
  }
  
  // Generate srcSet with CDN URLs
  const srcSet = widths.map(width => {
    const url = generateCdnUrl(image.url, {
      width,
      format,
      quality
    });
    return `${url} ${width}w`;
  }).join(', ');

  return (
    <Image
      src={generateCdnUrl(image.url, { width: 800, format, quality })}
      srcSet={srcSet}
      sizes={sizes}
      width={image.width || 800}
      height={image.height || 800}
      loading={isAboveFold ? 'eager' : 'lazy'}
      alt={image.altText || ''}
      className={className}
      loaderOptions={{
        scale: 2,
        crop: 'center',
      }}
    />
  );
}

/**
 * Enhanced gallery image with different default sizes and optimizations
 */
export function EnhancedGalleryImage({
  image,
  isAboveFold = false,
  className = '',
  sizes = '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw',
  quality = 85,
  format = 'auto',
}: {
  image: ImageType;
  isAboveFold?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
}) {
  return EnhancedProductImage({
    image,
    isAboveFold,
    className,
    sizes,
    quality,
    format,
  });
}</parameter>
</invoke>