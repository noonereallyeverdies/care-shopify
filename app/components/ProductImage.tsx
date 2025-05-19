import type {Image as ImageType} from '@shopify/hydrogen/storefront-api-types';
import { EnhancedProductImage, EnhancedThumbnailImage, EnhancedHeroImage } from './EnhancedImage';
import type { ImageFormat } from '~/lib/image-format-utils';
import { ImageQuality } from '~/lib/image-format-utils';
import type { MediaImage } from '@shopify/hydrogen/storefront-api-types';

type ProductImageProps = {
  image: ImageType;
  isAboveFold?: boolean;
  className?: string;
  sizes?: string;
  widthOverride?: number;
  heightOverride?: number;
  priority?: boolean;
  quality?: number | ImageQuality;
  preferredFormats?: ImageFormat[];
  placeholderColor?: string;
  enableBlurhash?: boolean;
  fadeInDuration?: number;
};

/**
 * Convert a Shopify Image to MediaImage format
 */
function convertToMediaImage(image: ImageType): MediaImage | null {
  if (!image?.url) return null;
  
  const imageWidth = image.width ? Number(image.width) : 0;
  const imageHeight = image.height ? Number(image.height) : 0;
  
  // Create a MediaImage object with all required properties
  return {
    mediaContentType: 'IMAGE' as any, // MediaContentType.IMAGE
    alt: image.altText || '',
    id: image.id || '',
    image: {
      url: image.url,
      width: imageWidth,
      height: imageHeight,
      altText: image.altText || '',
      id: image.id || '',
      originalSrc: image.url,
      src: image.url,
      transformedSrc: image.url
    },
    previewImage: {
      url: image.url,
      originalSrc: image.url,
      src: image.url,
      transformedSrc: image.url
    }
  } as MediaImage; // Cast to MediaImage to handle potential missing fields
}

/**
 * Optimized product image component with CDN and format optimizations
 * 
 * @param image - The image object from Shopify
 * @param isAboveFold - Whether the image is above the fold (visible on initial load)
 * @param className - Additional CSS classes
 * @param sizes - Responsive sizes attribute for the image
 * @param widthOverride - Override the width from the image object
 * @param heightOverride - Override the height from the image object
 * @param priority - Whether to prioritize loading this image
 * @param quality - Image quality (can be a number or an ImageQuality enum)
 * @param preferredFormats - Preferred image formats in order of preference
 */
export function ProductImage({ 
  image, 
  isAboveFold = false, 
  className = '', 
  sizes = '(min-width: 768px) 50vw, 100vw',
  widthOverride,
  heightOverride,
  priority = false,
  quality,
  preferredFormats = [],
  placeholderColor = '#f3f4f6',
  enableBlurhash = true,
  fadeInDuration = 500,
}: ProductImageProps) {
  // Convert Shopify image to MediaImage format expected by EnhancedImage
  const mediaImage = convertToMediaImage(image);

  // Extract width and height safely with proper type handling
  const width = widthOverride !== undefined ? widthOverride : 
    (image?.width ? Number(image.width) : 0);
  
  const height = heightOverride !== undefined ? heightOverride : 
    (image?.height ? Number(image.height) : 0);

  // Use the advanced EnhancedProductImage with all optimizations
  return (
    <EnhancedProductImage
      data={mediaImage}
      alt={image?.altText || ''}
      className={className}
      sizes={sizes}
      width={width}
      height={height}
      loading={isAboveFold ? 'eager' : 'lazy'}
      priority={priority}
      quality={quality || ImageQuality.HIGH}
      preferredFormats={preferredFormats}
      placeholderColor={placeholderColor}
      enableBlurhash={enableBlurhash}
      fadeInDuration={fadeInDuration}
    />
  );
}

/**
 * Optimized gallery image with different default sizes
 */
export function GalleryImage({
  image,
  isAboveFold = false,
  className = '',
  sizes = '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw',
  widthOverride,
  heightOverride,
  priority = false,
  quality,
  preferredFormats = [],
  placeholderColor = '#f3f4f6',
  enableBlurhash = true,
  fadeInDuration = 500,
}: ProductImageProps) {
  // Convert Shopify image to MediaImage format expected by EnhancedImage
  const mediaImage = convertToMediaImage(image);

  // Extract width and height safely with proper type handling
  const width = widthOverride !== undefined ? widthOverride : 
    (image?.width ? Number(image.width) : 0);
  
  const height = heightOverride !== undefined ? heightOverride : 
    (image?.height ? Number(image.height) : 0);

  // Use the advanced EnhancedHeroImage with all optimizations
  return (
    <EnhancedHeroImage
      data={mediaImage}
      alt={image?.altText || ''}
      className={className}
      sizes={sizes}
      width={width}
      height={height}
      loading={isAboveFold ? 'eager' : 'lazy'}
      quality={quality || ImageQuality.HIGH}
      preferredFormats={preferredFormats}
      placeholderColor={placeholderColor}
      enableBlurhash={enableBlurhash}
      fadeInDuration={fadeInDuration}
    />
  );
}

/**
 * Thumbnail-optimized image for product variants and small displays
 */
export function ThumbnailImage({
  image,
  className = '',
  sizes = '100px',
  widthOverride,
  heightOverride,
}: Omit<ProductImageProps, 'isAboveFold' | 'priority'>) {
  // Convert Shopify image to MediaImage format expected by EnhancedImage
  const mediaImage = convertToMediaImage(image);

  // Extract width and height safely with proper type handling
  const width = widthOverride !== undefined ? widthOverride : 
    (image?.width ? Number(image.width) : 0);
  
  const height = heightOverride !== undefined ? heightOverride : 
    (image?.height ? Number(image.height) : 0);

  // Use the specialized thumbnail image component
  return (
    <EnhancedThumbnailImage
      data={mediaImage}
      alt={image?.altText || ''}
      className={className}
      sizes={sizes}
      width={width}
      height={height}
    />
  );
} 