import React, { createContext, useContext, useEffect, useState } from 'react';

// Define the preferences state shape
interface PreferencesState {
  theme: 'light' | 'dark' | 'system';
  currency: string;
  language: string;
  country: string;
  cookieConsent: {
    necessary: boolean;
    functional: boolean;
    performance: boolean;
    marketing: boolean;
    accepted: boolean;
  };
  notifications: {
    orderUpdates: boolean;
    promotions: boolean;
    backInStock: boolean;
    newArrivals: boolean;
  };
  accessibility: {
    reducedMotion: boolean;
    highContrast: boolean;
    largerText: boolean;
  };
  productDisplay: {
    gridView: boolean;
    productsPerPage: number;
    showRatings: boolean;
  };
  recentSearches: string[];
}

// Define the context type
interface PreferencesContextType {
  preferences: PreferencesState;
  updatePreferences: (newPrefs: Partial<PreferencesState>) => void;
  resetPreferences: () => void;
  updateTheme: (theme: PreferencesState['theme']) => void;
  updateCurrency: (currency: string) => void;
  updateLanguage: (language: string) => void;
  updateCountry: (country: string) => void;
  updateCookieConsent: (consent: Partial<PreferencesState['cookieConsent']>) => void;
  updateNotifications: (notifications: Partial<PreferencesState['notifications']>) => void;
  updateAccessibility: (accessibility: Partial<PreferencesState['accessibility']>) => void;
  updateProductDisplay: (display: Partial<PreferencesState['productDisplay']>) => void;
  addRecentSearch: (search: string) => void;
  clearRecentSearches: () => void;
}

// Initial state
const initialState: PreferencesState = {
  theme: 'system',
  currency: 'USD',
  language: 'en',
  country: 'US',
  cookieConsent: {
    necessary: true,
    functional: false,
    performance: false,
    marketing: false,
    accepted: false,
  },
  notifications: {
    orderUpdates: true,
    promotions: false,
    backInStock: false,
    newArrivals: false,
  },
  accessibility: {
    reducedMotion: false,
    highContrast: false,
    largerText: false,
  },
  productDisplay: {
    gridView: true,
    productsPerPage: 24,
    showRatings: true,
  },
  recentSearches: [],
};

// Create the context
const PreferencesContext = createContext<PreferencesContextType | null>(null);

// Storage key for persisting preferences
const PREFERENCES_STORAGE_KEY = 'care_user_preferences';

// Provider component
export function PreferencesProvider({ 
  children,
  initialPreferences = {}
}: { 
  children: React.ReactNode;
  initialPreferences?: Partial<PreferencesState>;
}) {
  // Initialize state with data from localStorage if available
  const [preferences, setPreferences] = useState<PreferencesState>(() => {
    // Server-side rendering check
    if (typeof window === 'undefined') {
      return { ...initialState, ...initialPreferences };
    }
    
    try {
      // Try to load preferences from localStorage
      const storedPreferences = localStorage.getItem(PREFERENCES_STORAGE_KEY);
      const parsedPreferences = storedPreferences ? JSON.parse(storedPreferences) : {};
      
      return { 
        ...initialState, 
        ...parsedPreferences,
        ...initialPreferences 
      };
    } catch (error) {
      console.error('Error loading preferences from localStorage:', error);
      return { ...initialState, ...initialPreferences };
    }
  });
  
  // Persist preferences to localStorage whenever they change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(preferences));
      
      // Apply theme to document
      if (preferences.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else if (preferences.theme === 'light') {
        document.documentElement.classList.remove('dark');
      } else {
        // System preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      
      // Apply accessibility preferences
      if (preferences.accessibility.reducedMotion) {
        document.documentElement.classList.add('motion-reduce');
      } else {
        document.documentElement.classList.remove('motion-reduce');
      }
      
      if (preferences.accessibility.highContrast) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
      
      if (preferences.accessibility.largerText) {
        document.documentElement.classList.add('text-lg');
      } else {
        document.documentElement.classList.remove('text-lg');
      }
      
    } catch (error) {
      console.error('Error saving preferences to localStorage:', error);
    }
  }, [preferences]);
  
  // Update preferences
  const updatePreferences = (newPrefs: Partial<PreferencesState>) => {
    setPreferences(prev => ({
      ...prev,
      ...newPrefs,
    }));
  };
  
  // Reset preferences
  const resetPreferences = () => {
    setPreferences(initialState);
  };
  
  // Theme updater
  const updateTheme = (theme: PreferencesState['theme']) => {
    setPreferences(prev => ({
      ...prev,
      theme,
    }));
  };
  
  // Currency updater
  const updateCurrency = (currency: string) => {
    setPreferences(prev => ({
      ...prev,
      currency,
    }));
  };
  
  // Language updater
  const updateLanguage = (language: string) => {
    setPreferences(prev => ({
      ...prev,
      language,
    }));
  };
  
  // Country updater
  const updateCountry = (country: string) => {
    setPreferences(prev => ({
      ...prev,
      country,
    }));
  };
  
  // Cookie consent updater
  const updateCookieConsent = (consent: Partial<PreferencesState['cookieConsent']>) => {
    setPreferences(prev => ({
      ...prev,
      cookieConsent: {
        ...prev.cookieConsent,
        ...consent,
      },
    }));
  };
  
  // Notifications updater
  const updateNotifications = (notifications: Partial<PreferencesState['notifications']>) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        ...notifications,
      },
    }));
  };
  
  // Accessibility updater
  const updateAccessibility = (accessibility: Partial<PreferencesState['accessibility']>) => {
    setPreferences(prev => ({
      ...prev,
      accessibility: {
        ...prev.accessibility,
        ...accessibility,
      },
    }));
  };
  
  // Product display updater
  const updateProductDisplay = (display: Partial<PreferencesState['productDisplay']>) => {
    setPreferences(prev => ({
      ...prev,
      productDisplay: {
        ...prev.productDisplay,
        ...display,
      },
    }));
  };
  
  // Add recent search
  const addRecentSearch = (search: string) => {
    if (!search) return;
    
    setPreferences(prev => {
      // Don't add duplicates and keep most recent first
      const filtered = prev.recentSearches.filter(s => s !== search);
      const updated = [search, ...filtered].slice(0, 10); // Keep only 10 most recent
      
      return {
        ...prev,
        recentSearches: updated,
      };
    });
  };
  
  // Clear recent searches
  const clearRecentSearches = () => {
    setPreferences(prev => ({
      ...prev,
      recentSearches: [],
    }));
  };
  
  // Context value
  const value: PreferencesContextType = {
    preferences,
    updatePreferences,
    resetPreferences,
    updateTheme,
    updateCurrency,
    updateLanguage,
    updateCountry,
    updateCookieConsent,
    updateNotifications,
    updateAccessibility,
    updateProductDisplay,
    addRecentSearch,
    clearRecentSearches,
  };
  
  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

// Hook for using the preferences context
export function usePreferences() {
  const context = useContext(PreferencesContext);
  
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  
  return context;
}

// Specialized hooks for specific preferences
export function useTheme() {
  const { preferences, updateTheme } = usePreferences();
  return { theme: preferences.theme, updateTheme };
}

export function useCurrency() {
  const { preferences, updateCurrency } = usePreferences();
  return { currency: preferences.currency, updateCurrency };
}

export function useLocale() {
  const { preferences, updateLanguage, updateCountry } = usePreferences();
  return { 
    language: preferences.language, 
    country: preferences.country,
    updateLanguage,
    updateCountry,
  };
}

export function useCookieConsent() {
  const { preferences, updateCookieConsent } = usePreferences();
  return { 
    cookieConsent: preferences.cookieConsent, 
    updateCookieConsent,
    hasAccepted: preferences.cookieConsent.accepted,
  };
}

export function useAccessibility() {
  const { preferences, updateAccessibility } = usePreferences();
  return { 
    accessibility: preferences.accessibility,
    updateAccessibility,
  };
}

export function useProductDisplay() {
  const { preferences, updateProductDisplay } = usePreferences();
  return { 
    productDisplay: preferences.productDisplay,
    updateProductDisplay,
  };
}

export function useRecentSearches() {
  const { preferences, addRecentSearch, clearRecentSearches } = usePreferences();
  return { 
    recentSearches: preferences.recentSearches,
    addRecentSearch,
    clearRecentSearches,
  };
} 