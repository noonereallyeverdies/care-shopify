import React from "react";
import {
  CartForm,
} from "@shopify/hydrogen/dist/index.js";
import { Button } from "../app/components/Button";
import { useState } from 'react';

/**
 * A standalone Add to Cart button that doesn't require ProductContext
 * Can be used directly in any component with the proper props
 */
export function StandaloneAddToCart({
  variantId,
  quantity,
  available = true,
  children,
  className = '',
  ...props
}: {
  variantId: string;
  quantity: number;
  available?: boolean;
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}) {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleAddToCart = () => {
    if (!available || isLoading || !variantId) return;
    setIsLoading(true);
    
    // Reset loading state after a delay
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const buttonContent = (
    <>
      {children ?? 'Add to cart'}
      {isLoading && (
        <div className="ml-3">
          <div className="w-5 h-5 border-2 border-white border-opacity-40 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
    </>
  );

  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesAdd}
      inputs={{
        lines: [
          {
            merchandiseId: variantId,
            quantity
          }
        ]
      }}
    >
      <Button
        as="button"
        type="submit"
        className={className}
        variant="primary"
        disabled={isLoading || !available}
        onClick={handleAddToCart}
        {...props}
      >
        {buttonContent}
      </Button>
    </CartForm>
  );
} 