import React, { createContext, useContext, useReducer, useEffect, Suspense, lazy } from 'react';
import { useCart as useHydrogenCart } from '@shopify/hydrogen';
import { useCartFetchers } from '~/hooks/useCartFetchers';
import { CartForm } from '@shopify/hydrogen';
import { useFetcher } from '@remix-run/react';
import { useHydrationAnalysis } from '~/lib/HydrationUsage';
import type { CartLine, CartType } from '@shopify/hydrogen/storefront-api-types';

import { LazyHydrate } from '~/components/LazyHydrate';

interface CartState {
  isOpen: boolean;
  isPending: boolean;
  lastAddedItem: string | null;
  totalItems: number;
  recentlyAddedItems: Array<{id: string, timestamp: number}>;
  error: string | null;
}

type CartAction = 
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'SET_PENDING', value: boolean }
  | { type: 'SET_LAST_ADDED_ITEM', itemId: string }
  | { type: 'SET_ERROR', message: string | null }
  | { type: 'SET_TOTAL_ITEMS', count: number };

interface CartContextType extends CartState {
  // Actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  
  // Enhanced cart operations with feedback
  addItem: (merchandiseId: string, quantity: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  
  // The underlying cart from Hydrogen
  cart: ReturnType<typeof useHydrogenCart>;
  
  // Utility methods
  isItemInCart: (productId: string) => boolean;
  getItemQuantity: (productId: string) => number;
}

const initialState: CartState = {
  isOpen: false,
  isPending: false,
  lastAddedItem: null,
  totalItems: 0,
  recentlyAddedItems: [],
  error: null,
};

const CartContext = createContext<CartContextType | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'SET_PENDING':
      return { ...state, isPending: action.value };
    case 'SET_LAST_ADDED_ITEM':
      const recentlyAddedItems = [
        { id: action.itemId, timestamp: Date.now() },
        ...state.recentlyAddedItems.filter(item => item.id !== action.itemId)
      ].slice(0, 5); // Keep only the 5 most recent items
      
      return { 
        ...state, 
        lastAddedItem: action.itemId,
        recentlyAddedItems
      };
    case 'SET_ERROR':
      return { ...state, error: action.message };
    case 'SET_TOTAL_ITEMS':
      return { ...state, totalItems: action.count };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const cart = useHydrogenCart();
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const fetcher = useFetcher();
  const { trackInteraction } = useHydrationAnalysis(
    'cart-context-provider',
    'CartProvider',
    'cart',
    'onMount'
  );
  
  // Track cart modifications
  const addToCartFetchers = useCartFetchers(CartForm.ACTIONS.LinesAdd);
  const isAddingToCart = addToCartFetchers.length > 0;
  
  const updateCartFetchers = useCartFetchers(CartForm.ACTIONS.LinesUpdate);
  const isUpdatingCart = updateCartFetchers.length > 0;
  
  const removeFromCartFetchers = useCartFetchers(CartForm.ACTIONS.LinesRemove);
  const isRemovingFromCart = removeFromCartFetchers.length > 0;

  // Update the isPending state based on cart operations
  useEffect(() => {
    dispatch({ type: 'SET_PENDING', value: isAddingToCart || isUpdatingCart || isRemovingFromCart });
  }, [isAddingToCart, isUpdatingCart, isRemovingFromCart]);

  // Update total items count
  useEffect(() => {
    if (cart.totalQuantity !== undefined) {
      dispatch({ type: 'SET_TOTAL_ITEMS', count: cart.totalQuantity });
    }
  }, [cart.totalQuantity]);
  
  // Track cart interactions for analytics
  useEffect(() => {
    if (state.isOpen) {
      trackInteraction();
    }
  }, [state.isOpen, trackInteraction]);

  // Enhanced cart methods with local state management
  const addItem = async (merchandiseId: string, quantity: number) => {
    try {
      dispatch({ type: 'SET_PENDING', value: true });
      
      await cart.linesAdd([{ merchandiseId, quantity }]);
      
      dispatch({ type: 'SET_LAST_ADDED_ITEM', itemId: merchandiseId });
      dispatch({ type: 'OPEN_CART' });
      dispatch({ type: 'SET_ERROR', message: null });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', message: 'Failed to add item to cart' });
      console.error('Error adding item to cart:', error);
    } finally {
      dispatch({ type: 'SET_PENDING', value: false });
    }
  };

  const updateItem = async (lineId: string, quantity: number) => {
    try {
      dispatch({ type: 'SET_PENDING', value: true });
      
      if (quantity === 0) {
        await cart.linesRemove([lineId]);
      } else {
        await cart.linesUpdate([{ id: lineId, quantity }]);
      }
      
      dispatch({ type: 'SET_ERROR', message: null });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', message: 'Failed to update cart' });
      console.error('Error updating cart:', error);
    } finally {
      dispatch({ type: 'SET_PENDING', value: false });
    }
  };

  const removeItem = async (lineId: string) => {
    try {
      dispatch({ type: 'SET_PENDING', value: true });
      
      await cart.linesRemove([lineId]);
      
      dispatch({ type: 'SET_ERROR', message: null });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', message: 'Failed to remove item from cart' });
      console.error('Error removing item from cart:', error);
    } finally {
      dispatch({ type: 'SET_PENDING', value: false });
    }
  };

  // Utility methods
  const isItemInCart = (productId: string): boolean => {
    if (!cart.lines) return false;
    
    return cart.lines.nodes.some(line => {
      return line.merchandise.product.id === productId;
    });
  };

  const getItemQuantity = (productId: string): number => {
    if (!cart.lines) return 0;
    
    return cart.lines.nodes.reduce((total, line) => {
      if (line.merchandise.product.id === productId) {
        return total + line.quantity;
      }
      return total;
    }, 0);
  };

  const value: CartContextType = {
    ...state,
    cart,
    openCart: () => dispatch({ type: 'OPEN_CART' }),
    closeCart: () => dispatch({ type: 'CLOSE_CART' }),
    toggleCart: () => dispatch({ type: 'TOGGLE_CART' }),
    addItem,
    updateItem,
    removeItem,
    isItemInCart,
    getItemQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
}

// Specialized hook for cart operations
export function useEnhancedCart() {
  const { cart, addItem, updateItem, removeItem, isItemInCart, getItemQuantity } = useCartContext();
  
  return {
    cart,
    addItem,
    updateItem,
    removeItem,
    isItemInCart,
    getItemQuantity,
  };
}

// Specialized hook for cart UI state
export function useCartUI() {
  const { isOpen, openCart, closeCart, toggleCart, isPending, lastAddedItem, totalItems, error } = useCartContext();
  
  return {
    isOpen,
    openCart,
    closeCart,
    toggleCart,
    isPending,
    lastAddedItem,
    totalItems,
    error,
  };
} 