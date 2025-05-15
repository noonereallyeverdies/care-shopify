import React from 'react';
import { Link } from '@remix-run/react';
import { ProductNameFormatter, ProductNameVariant } from './ProductNameFormatter';

export enum ProductLinkType {
  MAIN = 'main', // Main product page
  COLLECTION = 'collection', // All products collection
  QUIZ = 'quiz', // Hair quiz
  ACCESSORIES = 'accessories', // Accessories
}

interface ProductLinkFormatterProps {
  type?: ProductLinkType;
  className?: string;
  showProductName?: boolean;
  children?: React.ReactNode;
  nameVariant?: ProductNameVariant;
}

/**
 * Standardizes all product URL references throughout the site
 * Ensures consistent linking to the same product pages
 */
export function ProductLinkFormatter({
  type = ProductLinkType.MAIN,
  className = '',
  showProductName = true,
  children,
  nameVariant = ProductNameVariant.FULL,
}: ProductLinkFormatterProps) {
  
  // Get the correct URL based on type
  const getUrl = (): string => {
    switch (type) {
      case ProductLinkType.COLLECTION:
        return '/collections/all';
      case ProductLinkType.QUIZ:
        return '/pages/hair-quiz';
      case ProductLinkType.ACCESSORIES:
        return '/collections/accessories';
      case ProductLinkType.MAIN:
      default:
        return '/products/photonique-touch';
    }
  };
  
  return (
    <Link to={getUrl()} className={className}>
      {showProductName && !children ? (
        <ProductNameFormatter variant={nameVariant} />
      ) : (
        children
      )}
    </Link>
  );
}

/**
 * Convenience function to get product URL as string
 */
export function getProductUrl(type: ProductLinkType = ProductLinkType.MAIN): string {
  switch (type) {
    case ProductLinkType.COLLECTION:
      return '/collections/all';
    case ProductLinkType.QUIZ:
      return '/pages/hair-quiz';
    case ProductLinkType.ACCESSORIES:
      return '/collections/accessories';
    case ProductLinkType.MAIN:
    default:
      return '/products/photonique-touch';
  }
}
