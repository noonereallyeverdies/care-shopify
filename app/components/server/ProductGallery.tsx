import type { MediaImage } from '@shopify/hydrogen/storefront-api-types';
import { ProductGalleryContainer } from '~/components/containers/product/ProductGalleryContainer';

interface ProductGalleryProps {
  media: MediaImage[];
  className?: string;
}

/**
 * A client component that defines a media gallery for hosting images, 3D models, and videos of products
 * Enhanced with responsive images, proper dimensions, and eager loading for LCP optimization
 */
export function ProductGallery({ 
  media, 
  className = ''
}: ProductGalleryProps) {
  // In a real server component, you might fetch additional data here
  // before passing to the container component
  
  return (
    <ProductGalleryContainer
      media={media}
      className={className}
    />
  );
}
