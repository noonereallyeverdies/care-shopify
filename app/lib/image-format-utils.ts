/**
 * Advanced Image Format Utilities
 * 
 * Provides utilities for handling modern image formats like AVIF and WebP
 * with proper fallbacks for browser compatibility.
 */

/**
 * Image format options for the enhanced image component
 */
export enum ImageFormat {
  AVIF = 'avif',
  WEBP = 'webp',
  JPEG = 'jpeg',
  PNG = 'png',
  DEFAULT = 'auto'
}

/**
 * Image optimization quality presets
 */
export enum ImageQuality {
  LOW = 60,
  MEDIUM = 75,
  HIGH = 85,
  MAXIMUM = 95
}

/**
 * Interface for image format preferences
 */
export interface ImageFormatPreferences {
  formats: ImageFormat[];
  quality: ImageQuality | number;
  autoBestFormat: boolean;
  enableLazyLoading: boolean;
  placeholderSize: number;
}

/**
 * Default image format preferences
 */
export const defaultImagePreferences: ImageFormatPreferences = {
  formats: [ImageFormat.AVIF, ImageFormat.WEBP, ImageFormat.JPEG],
  quality: ImageQuality.HIGH,
  autoBestFormat: true,
  enableLazyLoading: true,
  placeholderSize: 16
};

/**
 * Check if a browser supports a specific image format
 * To be used client-side only
 */
export function isFormatSupported(format: ImageFormat): boolean {
  if (typeof document === 'undefined') return false; // Server-side check
  
  if (format === ImageFormat.AVIF) {
    return hasAvifSupport();
  } else if (format === ImageFormat.WEBP) {
    return hasWebPSupport();
  }
  
  // Default formats (JPEG, PNG) are always supported
  return true;
}

/**
 * Check for AVIF support
 */
function hasAvifSupport(): boolean {
  const canvas = document.createElement('canvas');
  if (canvas && typeof canvas.toDataURL === 'function') {
    return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
  }
  return false;
}

/**
 * Check for WebP support
 */
function hasWebPSupport(): boolean {
  const canvas = document.createElement('canvas');
  if (canvas && typeof canvas.toDataURL === 'function') {
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  return false;
}

/**
 * Determine the best image format for the current browser
 */
export function getBestImageFormat(preferences: ImageFormatPreferences = defaultImagePreferences): ImageFormat {
  if (!preferences.autoBestFormat || typeof document === 'undefined') {
    return preferences.formats[0] || ImageFormat.JPEG;
  }
  
  // If we're in a browser, check which formats are supported in order of preference
  for (const format of preferences.formats) {
    if (isFormatSupported(format)) {
      return format;
    }
  }
  
  // Fallback to JPEG if nothing else is supported
  return ImageFormat.JPEG;
}

/**
 * Generate URL parameters for Shopify CDN images
 */
export function getShopifyCdnParams(
  format: ImageFormat,
  quality: number = ImageQuality.HIGH,
  width?: number,
  height?: number
): string {
  const params = new URLSearchParams();
  
  // Format parameter
  if (format !== ImageFormat.DEFAULT) {
    params.append('format', format);
  }
  
  // Quality parameter
  params.append('quality', quality.toString());
  
  // Dimensions
  if (width) params.append('width', width.toString());
  if (height) params.append('height', height.toString());
  
  return params.toString();
}

/**
 * Get appropriate dimensions for placeholder/blur-up image
 */
export function getPlaceholderDimensions(
  originalWidth: number,
  originalHeight: number,
  placeholderSize: number = defaultImagePreferences.placeholderSize
): { width: number, height: number } {
  // Calculate aspect ratio
  const aspectRatio = originalWidth / originalHeight;
  
  // If landscape image (width > height)
  if (aspectRatio > 1) {
    return {
      width: placeholderSize,
      height: Math.round(placeholderSize / aspectRatio)
    };
  }
  
  // If portrait or square image
  return {
    width: Math.round(placeholderSize * aspectRatio),
    height: placeholderSize
  };
}

/**
 * Create a base64 placeholder image
 * @param color Background color in hex format
 */
export function createSolidPlaceholder(color: string = '#f3f4f6'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" width="1" height="1">
    <rect width="1" height="1" fill="${color}"/>
  </svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Generate srcset values for responsive images
 */
export function generateSrcSet(
  baseUrl: string,
  format: ImageFormat,
  quality: number = ImageQuality.HIGH,
  widths: number[] = [320, 640, 960, 1280, 1600, 1920]
): string {
  return widths
    .map(width => {
      const params = getShopifyCdnParams(format, quality, width);
      return `${baseUrl}?${params} ${width}w`;
    })
    .join(', ');
}

/**
 * Create an image delivery URL with the appropriate format and quality
 */
export function createOptimizedImageUrl(
  url: string,
  format: ImageFormat = ImageFormat.WEBP,
  quality: number = ImageQuality.HIGH,
  width?: number,
  height?: number
): string {
  if (!url) return '';
  
  // Check if this is a Shopify CDN URL
  const isShopifyImage = url.includes('cdn.shopify.com');
  
  if (isShopifyImage) {
    const params = getShopifyCdnParams(format, quality, width, height);
    return `${url}?${params}`;
  }
  
  // For non-Shopify images, just return the original URL
  // In a real implementation, you might want to process these differently
  return url;
}

/**
 * Detect if an image is likely to benefit from AVIF format
 * AVIF works best with photographic content, while WebP is often
 * better for illustrations, graphics, and text
 */
export function shouldUseAvif(imageType?: string): boolean {
  if (!imageType) return true; // Default to true if we don't know
  
  // Types that typically benefit from AVIF
  const avifFriendlyTypes = [
    'photograph', 'photo', 'image', 'banner', 'hero',
    'background', 'product', 'landscape', 'portrait'
  ];
  
  // Check if the image type contains any AVIF-friendly keywords
  return avifFriendlyTypes.some(type => imageType.toLowerCase().includes(type));
}

/**
 * Get optimal image formats based on image content type
 */
export function getOptimalFormats(imageType?: string): ImageFormat[] {
  if (shouldUseAvif(imageType)) {
    return [ImageFormat.AVIF, ImageFormat.WEBP, ImageFormat.JPEG];
  }
  
  // For illustrations, graphics, etc., prefer WebP first
  return [ImageFormat.WEBP, ImageFormat.PNG, ImageFormat.JPEG];
}

/**
 * Get ideal compression quality based on image content
 */
export function getIdealQuality(imageType?: string): number {
  if (!imageType) return ImageQuality.HIGH;
  
  // Higher quality for product images and critical visuals
  if (
    imageType.toLowerCase().includes('product') ||
    imageType.toLowerCase().includes('logo') ||
    imageType.toLowerCase().includes('hero')
  ) {
    return ImageQuality.HIGH;
  }
  
  // Medium quality is fine for most content
  if (
    imageType.toLowerCase().includes('banner') ||
    imageType.toLowerCase().includes('category')
  ) {
    return ImageQuality.MEDIUM;
  }
  
  // Use lower quality for thumbnails and previews
  if (
    imageType.toLowerCase().includes('thumbnail') ||
    imageType.toLowerCase().includes('preview')
  ) {
    return ImageQuality.LOW;
  }
  
  return ImageQuality.MEDIUM;
} 