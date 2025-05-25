import type { Product, ProductVariant, Image } from "@shopify/hydrogen/storefront-api-types";
import type { ReactNode } from 'react';

export type ProductProviderProps = {
  children: ReactNode;
  product: any; // Using any for now, will be refined later
  initialVariantId?: string;
};

export type ProductContextType = {
  product: any; // Using any for now, will be refined later
  selectedVariant: string | null;
  quantity: number;
  setQuantity: (quantity: number) => void;
  selectVariant: (variantId: string) => void;
  isInStock: boolean;
  availableForSale: boolean;
  currentVariant?: ProductVariant;
  currentVariantImage?: Image | null;
  getCurrentVariantImage: () => Image | null;
};

export type AddToCartButtonProps = {
  variantId?: string;
  available?: boolean;
  label?: string;
  className?: string;
};

export type AddToCartButtonUIProps = {
  isDisabled: boolean;
  isLoading: boolean;
  onClick: () => void;
  label?: string;
  className?: string;
}; 