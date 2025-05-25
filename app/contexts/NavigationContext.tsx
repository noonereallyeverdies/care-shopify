import React, { createContext, useContext, ReactNode } from 'react';
import { useLocation } from '@remix-run/react';
import { getCurrentLocale, localizeUrl } from '../lib/locale-utils';

interface NavigationContextType {
  locale: string;
  localizeUrl: (url: string) => string;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const locale = getCurrentLocale(location.pathname);
  
  const contextValue: NavigationContextType = {
    locale,
    localizeUrl: (url: string) => localizeUrl(url, locale),
  };
  
  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}

// Helper hook for locale-aware links
export function useLocalizedLink(baseUrl: string): string {
  const { localizeUrl } = useNavigation();
  return localizeUrl(baseUrl);
}
