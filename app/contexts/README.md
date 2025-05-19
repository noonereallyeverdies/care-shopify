# State Management Architecture

This directory contains the context providers used for state management in the Care•atin application. The architecture has been redesigned to address the issues identified in the technical audit, specifically:

- Limited context usage
- Cart state coupling
- Missing client state persistence

## Context Providers

### 1. ShopContext

The `ShopContext` provides shop-related information from Shopify, such as the shop name, domain, and policies.

```tsx
import { useShop } from '~/contexts/ShopContext';

function MyComponent() {
  const { shop } = useShop();
  return <div>{shop.name}</div>;
}
```

### 2. CartContext

The `CartContext` provides an enhanced cart experience with:

- Cart UI state (open/closed)
- Cart operations (add, update, remove)
- Loading states and error handling
- Recently added items tracking

```tsx
import { useCartContext, useEnhancedCart, useCartUI } from '~/contexts/CartContext';

function AddToCartButton({ productId, quantity }) {
  const { addItem, isPending } = useEnhancedCart();
  
  return (
    <button 
      onClick={() => addItem(productId, quantity)}
      disabled={isPending}
    >
      {isPending ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}

function CartToggle() {
  const { isOpen, toggleCart, totalItems } = useCartUI();
  
  return (
    <button onClick={toggleCart}>
      Cart ({totalItems})
    </button>
  );
}
```

### 3. UserContext

The `UserContext` manages user-related state:

- Authentication status
- User profile information
- Viewed products history
- User preferences

```tsx
import { useUser, useAuthentication, useUserProfile } from '~/contexts/UserContext';

function ProfileButton() {
  const { isAuthenticated, logout } = useAuthentication();
  const { profile } = useUserProfile();
  
  if (!isAuthenticated) {
    return <Link to="/account/login">Login</Link>;
  }
  
  return (
    <div>
      <span>Hello, {profile.firstName}</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### 4. PreferencesContext

The `PreferencesContext` manages user preferences with local storage persistence:

- Theme preferences (light/dark/system)
- Accessibility settings
- Currency and language preferences
- Cookie consent
- Product display preferences

```tsx
import { usePreferences, useTheme } from '~/contexts/PreferencesContext';

function ThemeToggle() {
  const { theme, updateTheme } = useTheme();
  
  return (
    <button onClick={() => updateTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
}
```

## Integration with Hydrogen

The context providers are integrated with Hydrogen's built-in hooks and utilities:

- `useCart.ts` bridges between Hydrogen's cart API and our custom CartContext
- Context providers are initialized with data from the root loader
- State is persisted using localStorage where appropriate

## Usage Guidelines

1. Use the specialized hooks instead of the general context hooks when possible
2. For cart operations, prefer the enhanced hooks over direct Hydrogen APIs
3. Always wrap components that use these contexts within the appropriate providers
4. Use the persistence features for maintaining state between page navigations

## Benefits

- **Decoupled State**: Each context manages a specific concern
- **Enhanced Developer Experience**: Specialized hooks make state access more intuitive
- **Persistent State**: User preferences and cart state persist between sessions
- **Optimized Performance**: State updates are optimized to minimize re-renders
- **Type Safety**: Full TypeScript support for all contexts and hooks 