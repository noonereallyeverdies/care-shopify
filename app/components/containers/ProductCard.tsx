import React, { useState } from 'react';
import type {Product} from '@shopify/hydrogen/storefront-api-types';
import { ProductCardBase } from '~/components/shared/ProductCardBase';
import { useIsHydrated } from '~/hooks/useIsHydrated';
import { playInteractionSound, isProductDiscounted } from '~/utils/ui/soundEffects';

// Container component that handles business logic
export function ProductCard({
  product,
  label,
  className,
  loading,
  onClick,
}: {
  product: Product;
  label?: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  onClick?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isHydrated = useIsHydrated();
  
  // Extract business logic
  const firstVariant = product.variants.nodes[0];
  const isDiscounted = isProductDiscounted(product);

  // Business logic to determine the label
  const cardLabel = label ? label : (isDiscounted ? 'Sale' : '');

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (isHydrated) {
      playInteractionSound();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Guard clause
  if (!firstVariant) return null;

  return (
    <ProductCardBase
      product={product}
      label={cardLabel}
      className={className}
      loading={loading}
      onClick={onClick}
      isDiscounted={isDiscounted}
      price={firstVariant.price}
      compareAtPrice={firstVariant.compareAtPrice}
      isHovered={isHovered}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
}
