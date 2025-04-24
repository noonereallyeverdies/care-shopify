import React, { useState } from 'react';
import { Image } from '@shopify/hydrogen';
import type { MediaImage } from '@shopify/hydrogen/storefront-api-types';

interface ProductGalleryProps {
  media: MediaImage[];
  className?: string;
}

/**
 * A client component that defines a media gallery for hosting images, 3D models, and videos of products
 */
export function ProductGallery({ media, className = '' }: ProductGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  if (!media || media.length === 0) {
    return null;
  }

  return (
    <div className={`product-gallery ${className}`}>
      <div className="main-image-container mb-4 rounded-lg overflow-hidden relative">
        <Image 
          data={media[activeImageIndex]?.image} 
          className="w-full h-auto object-cover aspect-square"
          sizes="(min-width: 1024px) 50vw, 100vw"
          loading="eager"
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
              <Image
                data={item.image}
                className="w-full h-full object-cover"
                width={80}
                height={80}
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
