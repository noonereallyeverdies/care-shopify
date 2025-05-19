import React, { useState } from 'react';
import type { MediaImage } from '@shopify/hydrogen/storefront-api-types';
import { ProductGalleryUI } from '~/components/ui/product/ProductGalleryUI';

interface ProductGalleryContainerProps {
  media: MediaImage[];
  className?: string;
}

export function ProductGalleryContainer({ 
  media, 
  className = ''
}: ProductGalleryContainerProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  return (
    <ProductGalleryUI
      media={media}
      className={className}
      activeImageIndex={activeImageIndex}
      setActiveImageIndex={setActiveImageIndex}
    />
  );
}
