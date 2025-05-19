import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from '@remix-run/react';

// Define the shape of the user state
interface UserState {
  isLoggedIn: boolean;
  customerAccessToken: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  id: string | null;
  addresses: any[] | null;
  defaultAddress: any | null;
  orders: any[] | null;
  lastViewedProducts: string[];
  preferences: {
    marketingConsent: boolean;
    communicationPreferences: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    productRecommendations: boolean;
  };
}

// Define the shape of the context
interface UserContextType {
  user: UserState;
  isAuthenticated: boolean;
  login: (token: string, userData: any) => void;
  logout: () => void;
  updateUserInfo: (userData: Partial<UserState>) => void;
  addViewedProduct: (productId: string) => void;
  updatePreferences: (preferences: Partial<UserState['preferences']>) => void;
}

// Initial state
const initialState: UserState = {
  isLoggedIn: false,
  customerAccessToken: null,
  firstName: null,
  lastName: null,
  email: null,
  id: null,
  addresses: null,
  defaultAddress: null,
  orders: null,
  lastViewedProducts: [],
  preferences: {
    marketingConsent: false,
    communicationPreferences: {
      email: false,
      sms: false,
      push: false,
    },
    productRecommendations: true,
  },
};

// Create the context
const UserContext = createContext<UserContextType | null>(null);

// Storage key for persisting user data
const USER_STORAGE_KEY = 'care_user_data';
const VIEWED_PRODUCTS_KEY = 'care_viewed_products';
const USER_PREFERENCES_KEY = 'care_user_preferences';

// Provider component
export function UserProvider({ 
  children,
  initialUserData = {}
}: { 
  children: React.ReactNode;
  initialUserData?: Partial<UserState>;
}) {
  // Initialize state with data from localStorage if available
  const [user, setUser] = useState<UserState>(() => {
    // Server-side rendering check
    if (typeof window === 'undefined') {
      return { ...initialState, ...initialUserData };
    }
    
    try {
      // Try to load user data from localStorage
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      const storedViewedProducts = localStorage.getItem(VIEWED_PRODUCTS_KEY);
      const storedPreferences = localStorage.getItem(USER_PREFERENCES_KEY);
      
      const parsedUser = storedUser ? JSON.parse(storedUser) : {};
      const parsedViewedProducts = storedViewedProducts ? JSON.parse(storedViewedProducts) : [];
      const parsedPreferences = storedPreferences ? JSON.parse(storedPreferences) : initialState.preferences;
      
      return { 
        ...initialState, 
        ...parsedUser,
        lastViewedProducts: parsedViewedProducts,
        preferences: {
          ...initialState.preferences,
          ...parsedPreferences
        },
        ...initialUserData 
      };
    } catch (error) {
      console.error('Error loading user data from localStorage:', error);
      return { ...initialState, ...initialUserData };
    }
  });
  
  const navigate = useNavigate();
  
  // Persist user data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      // Don't store sensitive data
      const { customerAccessToken, isLoggedIn, firstName, lastName, email, id } = user;
      
      if (isLoggedIn && customerAccessToken) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify({
          customerAccessToken,
          isLoggedIn,
          firstName,
          lastName,
          email,
          id,
        }));
      }
      
      localStorage.setItem(VIEWED_PRODUCTS_KEY, JSON.stringify(user.lastViewedProducts));
      localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(user.preferences));
    } catch (error) {
      console.error('Error saving user data to localStorage:', error);
    }
  }, [user]);
  
  // Login function
  const login = (token: string, userData: any) => {
    setUser(prev => ({
      ...prev,
      isLoggedIn: true,
      customerAccessToken: token,
      firstName: userData.firstName || null,
      lastName: userData.lastName || null,
      email: userData.email || null,
      id: userData.id || null,
      addresses: userData.addresses || null,
      defaultAddress: userData.defaultAddress || null,
      orders: userData.orders || null,
    }));
  };
  
  // Logout function
  const logout = () => {
    setUser(prev => ({
      ...initialState,
      lastViewedProducts: prev.lastViewedProducts,
      preferences: prev.preferences,
    }));
    
    // Remove sensitive data from localStorage
    localStorage.removeItem(USER_STORAGE_KEY);
    
    // Redirect to home page
    navigate('/');
  };
  
  // Update user info
  const updateUserInfo = (userData: Partial<UserState>) => {
    setUser(prev => ({
      ...prev,
      ...userData,
    }));
  };
  
  // Add viewed product
  const addViewedProduct = (productId: string) => {
    if (!productId) return;
    
    setUser(prev => {
      // Don't add duplicates and keep most recent first
      const filtered = prev.lastViewedProducts.filter(id => id !== productId);
      const updated = [productId, ...filtered].slice(0, 20); // Keep only 20 most recent
      
      return {
        ...prev,
        lastViewedProducts: updated,
      };
    });
  };
  
  // Update user preferences
  const updatePreferences = (preferences: Partial<UserState['preferences']>) => {
    setUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        ...preferences,
      },
    }));
  };
  
  // Context value
  const value: UserContextType = {
    user,
    isAuthenticated: user.isLoggedIn && !!user.customerAccessToken,
    login,
    logout,
    updateUserInfo,
    addViewedProduct,
    updatePreferences,
  };
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Hook for using the user context
export function useUser() {
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
}

// Specialized hooks for specific user data
export function useAuthentication() {
  const { isAuthenticated, login, logout } = useUser();
  return { isAuthenticated, login, logout };
}

export function useUserProfile() {
  const { user, updateUserInfo } = useUser();
  
  return {
    profile: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      id: user.id,
      addresses: user.addresses,
      defaultAddress: user.defaultAddress,
    },
    updateProfile: updateUserInfo,
  };
}

export function useViewedProducts() {
  const { user, addViewedProduct } = useUser();
  return {
    viewedProducts: user.lastViewedProducts,
    addViewedProduct,
  };
}

export function useUserPreferences() {
  const { user, updatePreferences } = useUser();
  return {
    preferences: user.preferences,
    updatePreferences,
  };
} 