import React from "react";
import { ReactNode } from 'react';
import { ProductProvider } from "../contexts/product/ProductContext";

/**
 * Wrapper component that provides product context with proper type handling
 * Makes it easier to wrap product-related components
 */
export function ProductContextWrapper({
  product,
  initialVariantId,
  children,
}: {
  product: any;
  initialVariantId?: string;
  children: ReactNode;
}) {
  return (
    <ProductProvider
      product={product}
      initialVariantId={initialVariantId}
    >
      {children}
    </ProductProvider>
  );
} 