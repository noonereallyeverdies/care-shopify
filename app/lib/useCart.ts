import { useCart as useHydrogenCart } from '@shopify/hydrogen';
import { useCartContext } from '~/contexts/CartContext';

/**
 * A hook that provides access to the cart functionality.
 * This is a wrapper around Hydrogen's useCart hook that adds additional functionality.
 * 
 * If used within a CartProvider, it will return the enhanced cart context.
 * Otherwise, it falls back to Hydrogen's useCart.
 */
export function useCart() {
  try {
    // Try to use our enhanced cart context first
    return useCartContext();
  } catch (error) {
    // If not within a CartProvider, fall back to Hydrogen's useCart
    return useHydrogenCart();
  }
} 