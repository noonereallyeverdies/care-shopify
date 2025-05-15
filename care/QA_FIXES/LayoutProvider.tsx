import React, { createContext, useContext } from 'react';

// Create context for layout data
const LayoutContext = createContext<any>(null);

// Provider component to wrap the app and provide layout data
export function LayoutProvider({ 
  children, 
  data 
}: { 
  children: React.ReactNode; 
  data: any;
}) {
  return (
    <LayoutContext.Provider value={data}>
      {children}
    </LayoutContext.Provider>
  );
}

// Hook to use layout data in components
export function useLayoutData() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayoutData must be used within a LayoutProvider');
  }
  return context;
}

// Specific hooks for common layout data
export function useShopData() {
  const { layout } = useLayoutData();
  return layout?.shop;
}

export function useHeaderMenu() {
  const { layout } = useLayoutData();
  return layout?.headerMenu;
}

export function useFooterMenu() {
  const { layout } = useLayoutData();
  return layout?.footerMenu;
}