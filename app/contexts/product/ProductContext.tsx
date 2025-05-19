import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ProductContextType, ProductProviderProps } from '~/types/product';
import type { ProductFragment } from '~/types/fragments';

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({
  children,
  product,
  initialVariantId,
}: ProductProviderProps) {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(initialVariantId || null);
  const [quantity, setQuantity] = useState(1);

  // Set initial variant if not provided
  useEffect(() => {
    if (!selectedVariant && product?.variants?.nodes?.length > 0) {
      setSelectedVariant(product.variants.nodes[0].id);
    }
  }, [product, selectedVariant]);

  // Find the current variant object
  const currentVariant = useMemo(() => {
    if (!product || !selectedVariant) return null;
    return product.variants.nodes.find(variant => variant.id === selectedVariant) || null;
  }, [product, selectedVariant]);

  // Compute stock status
  const isInStock = useMemo(() => {
    if (!currentVariant) return false;
    if (currentVariant.quantityAvailable != null) {
      return currentVariant.quantityAvailable > 0;
    }
    return true; // If quantityAvailable is not provided, assume in stock
  }, [currentVariant]);

  const availableForSale = currentVariant?.availableForSale || false;

  // Select a variant by ID
  const selectVariant = (variantId: string) => {
    setSelectedVariant(variantId);
  };

  const value = {
    product,
    selectedVariant,
    quantity,
    setQuantity,
    selectVariant,
    isInStock,
    availableForSale,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

// Custom hook to use the product context
export function useProduct() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
}
