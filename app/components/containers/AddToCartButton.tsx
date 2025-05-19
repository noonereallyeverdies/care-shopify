import { useState } from 'react';
import { useProduct } from '~/contexts/product/ProductContext';
import { AddToCartButtonUI } from '~/components/ui/cart/AddToCartButtonUI';
import { useFetcher } from '@remix-run/react';
import type { AddToCartButtonProps } from '~/types/product';

// Container component with business logic
export function AddToCartButton({
  variantId,
  available,
  label,
  className,
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { quantity, selectedVariant } = useProduct();
  const fetcher = useFetcher();

  // Determine which variant to use
  const finalVariantId = variantId || selectedVariant;
  
  // Determine if button should be disabled
  const isDisabled = !finalVariantId || !available;

  // Handle add to cart action
  const handleAddToCart = () => {
    if (isDisabled || isLoading) return;

    setIsLoading(true);
    
    // Prepare cart data
    const cartData = {
      lines: [
        {
          merchandiseId: finalVariantId,
          quantity,
        },
      ],
    };

    // Submit to cart action
    fetcher.submit(
      { cartData: JSON.stringify(cartData) },
      { method: 'post', action: '/cart/action' }
    );

    // Set timeout to prevent loading state from flashing
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  return (
    <AddToCartButtonUI
      isDisabled={isDisabled}
      isLoading={isLoading}
      onClick={handleAddToCart}
      label={label}
      className={className}
    />
  );
}