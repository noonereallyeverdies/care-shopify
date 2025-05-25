import React from "react";
import {CartForm} from "@shopify/hydrogen/dist/index.js";
import {Button} from './Button';
import {useState, useEffect} from 'react';
import {useCartContext} from "../app/contexts/CartContext";
import {useFetcher} from '@remix-run/react';

/**
 * A very simple AddToCartButton that doesn't rely on any context
 * Uses direct CartForm submission for maximum compatibility
 */
export function SimpleAddToCartButton({
  variantId,
  quantity = 1,
  className = '',
  children,
  ...props
}: {
  variantId: string;
  quantity?: number;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const {openCart} = useCartContext();
  const fetcher = useFetcher();
  
  // Check for successful cart addition and open cart drawer
  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data && addedToCart) {
      openCart();
      setAddedToCart(false);
    }
  }, [fetcher.state, fetcher.data, addedToCart, openCart]);

  const handleClick = () => {
    setIsAdding(true);
    setAddedToCart(true);
    setTimeout(() => setIsAdding(false), 1000);
  };

  const buttonText = isAdding ? 'Adding...' : (children || 'Add to Cart');

  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesAdd}
      inputs={{
        lines: [{merchandiseId: variantId, quantity}]
      }}
      fetcher={fetcher}
    >
      <Button
        as="button"
        type="submit"
        variant="primary"
        width="full"
        className={`${className} ${isAdding ? 'opacity-80' : ''}`}
        disabled={isAdding}
        onClick={handleClick}
        {...props}
      >
        {buttonText}
        {isAdding && (
          <span className="ml-2">
            <svg className="animate-spin h-4 w-4 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
        )}
      </Button>
    </CartForm>
  );
} 