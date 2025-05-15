import React, { useState } from 'react';
import type { MediaImage } from '@shopify/hydrogen/storefront-api-types';
import { LazyImage } from '~/components/ui/LazyImage';

interface ProductGalleryProps {
  media: MediaImage[];
  className?: string;
}

/**
 * A client component that defines a media gallery for hosting images, 3D models, and videos of products
 * Now optimized with lazy loading for better performance
 */
export function ProductGallery({ media, className = '' }: ProductGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  if (!media || media.length === 0) {
    return null;
  }

  // Main image should load eagerly (above fold)
  const activeImage = media[activeImageIndex]?.image;

  return (
    <div className={`product-gallery ${className}`}>
      <div className="main-image-container mb-4 rounded-lg overflow-hidden relative">
        <LazyImage
          src={activeImage?.url || ''}
          alt={activeImage?.altText || `Product image ${activeImageIndex + 1}`}
          width={activeImage?.width || 800}
          height={activeImage?.height || 800}
          className="w-full h-auto object-cover aspect-square"
          sizes="(min-width: 1024px) 50vw, 100vw"
          loading="eager" // Main image loads immediately
          blurDataURL={activeImage?.url ? `${activeImage.url}?w=20&h=20&q=20` : undefined}
        />
      </div>
      
      {media.length > 1 && (
        <div className="thumbnails-container flex gap-2 overflow-x-auto pb-2">
          {media.map((item, index) => (
            <button
              key={`thumbnail-${index}`}
              className={`thumbnail-item rounded-md overflow-hidden border-2 min-w-[80px] h-[80px] transition-all ${
                index === activeImageIndex
                  ? 'border-accent-rlt opacity-100'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
              onClick={() => setActiveImageIndex(index)}
              aria-label={`View product image ${index + 1}`}
            >
              <LazyImage
                src={item.image?.url || ''}
                alt={item.image?.altText || `Product thumbnail ${index + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
                sizes="80px"
                loading="lazy" // Thumbnails load lazily
                threshold={0.1}
                blurDataURL={item.image?.url ? `${item.image.url}?w=10&h=10&q=10` : undefined}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}