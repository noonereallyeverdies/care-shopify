import React from 'react';

export enum ProductNameVariant {
  FULL = 'full', // "Care•atin Photonique Touch"
  SHORT = 'short', // "Photonique Touch"
  BRAND_ONLY = 'brand', // "Care•atin"
  DESCRIPTIVE = 'descriptive', // "Red Light Therapy Device"
}

interface ProductNameFormatterProps {
  variant?: ProductNameVariant;
  className?: string;
}

/**
 * Standardizes all product name references throughout the site
 * Eliminates inconsistencies like "photonique touch device" vs "hair renewal system" 
 */
export function ProductNameFormatter({ 
  variant = ProductNameVariant.FULL,
  className = '',
}: ProductNameFormatterProps) {
  let displayText = '';
  
  switch (variant) {
    case ProductNameVariant.SHORT:
      displayText = 'Photonique Touch';
      break;
    case ProductNameVariant.BRAND_ONLY:
      displayText = 'Care•atin';
      break;
    case ProductNameVariant.DESCRIPTIVE:
      displayText = 'Red Light Therapy Device';
      break;
    case ProductNameVariant.FULL:
    default:
      displayText = 'Care•atin Photonique Touch';
      break;
  }
  
  return <span className={className}>{displayText}</span>;
}

/**
 * Convenience function to get the product name as string
 */
export function getProductName(variant: ProductNameVariant = ProductNameVariant.FULL): string {
  switch (variant) {
    case ProductNameVariant.SHORT:
      return 'Photonique Touch';
    case ProductNameVariant.BRAND_ONLY:
      return 'Care•atin';
    case ProductNameVariant.DESCRIPTIVE:
      return 'Red Light Therapy Device';
    case ProductNameVariant.FULL:
    default:
      return 'Care•atin Photonique Touch';
  }
}
