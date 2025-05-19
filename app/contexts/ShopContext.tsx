import React, { createContext, useContext } from 'react';
import type { Shop } from '@shopify/hydrogen/storefront-api-types';

// Create a context for shop data
type ShopContextType = {
  shop: Partial<Shop> | null;
};

const ShopContext = createContext<ShopContextType>({ shop: null });

export function ShopProvider({ 
  children, 
  shop 
}: { 
  children: React.ReactNode;
  shop: Partial<Shop> | null;
}) {
  return (
    <ShopContext.Provider value={{ shop }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  return useContext(ShopContext);
}
