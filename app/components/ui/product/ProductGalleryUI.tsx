import React from 'react';
import type { MediaImage } from '@shopify/hydrogen/storefront-api-types';
import { Suspense } from 'react';
import { LazyHydrate } from '~/components/LazyHydrate';
import { EnhancedProductImage, EnhancedHeroImage } from '~/components/EnhancedImage';

interface ProductGalleryUIProps {
  media: MediaImage[];
  className?: string;
  activeImageIndex: number;
  setActiveImageIndex: (index: number) => void;
}

export function ProductGalleryUI({ 
  media, 
  className = '',
  activeImageIndex,
  setActiveImageIndex
}: ProductGalleryUIProps) {
  if (!media || media.length === 0) {
    return (
      <div className={`product-gallery-empty ${className}`}>
        <div className="bg-neutral-100 rounded-lg w-full aspect-square flex items-center justify-center">
          <p className="text-neutral-500">No images available</p>
        </div>
      </div>
    );
  }

  const activeMedia = media[activeImageIndex];

  return (
    <div className={`product-gallery ${className}`}>
      <Suspense fallback={
        <div className="main-image-container mb-4 rounded-lg overflow-hidden relative bg-neutral-100 aspect-square animate-pulse"></div>
      }>
        <div className="main-image-container mb-4 rounded-lg overflow-hidden relative">
          <EnhancedHeroImage 
            data={activeMedia?.image}
            className="w-full h-auto object-cover"
            sizes="(min-width: 1536px) 800px, (min-width: 1024px) 50vw, (min-width: 768px) 70vw, 100vw"
            alt={activeMedia?.image?.altText || 'Product image'}
            // First image is high priority
            priority={activeImageIndex === 0}
          />
          
          {/* Image zoom hint */}
          <div className="absolute bottom-3 right-3 bg-white bg-opacity-80 rounded-full p-2 shadow-sm">
            <svg className="w-5 h-5 text-neutral-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </Suspense>

      {/* Thumbnail gallery */}
      <div className="thumbnail-gallery grid grid-cols-5 gap-2">
        {media.map((item, index) => (
          <LazyHydrate whenVisible key={`thumbnail-${index}`}>
            <button
              className={`thumbnail-item rounded-md overflow-hidden border-2 transition-all ${
                index === activeImageIndex ? 'border-neutral-800 ring-2 ring-neutral-300' : 'border-transparent'
              }`}
              onClick={() => setActiveImageIndex(index)}
              aria-label={`View product image ${index + 1}`}
              aria-current={index === activeImageIndex}
            >
              <EnhancedProductImage
                data={item.image}
                className="w-full h-auto aspect-square object-cover"
                alt=""
                sizes="80px"
                generatePlaceholder={false}
              />
            </button>
          </LazyHydrate>
        ))}
      </div>
    </div>
  );
}
