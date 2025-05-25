# Migration Guide: Component Consolidation

## Overview
This guide helps you migrate from the old duplicated components to the new consolidated structure.

## 🔄 Import Migrations

### Cart Components

#### AddToCartButton Consolidation
**Replace these imports:**
```typescript
// OLD - Multiple scattered imports
import { AddToCartButton } from '~/components/AddToCart/AddToCartButton';
import { AddToCartButton } from '~/components/AddToCartButton';
import { SimpleAddToCartButton } from '~/components/SimpleAddToCartButton';
import { StandaloneAddToCart } from '~/components/StandaloneAddToCart';
import { AddToCartButton } from '~/components/containers/AddToCartButton';
```

**With this single import:**
```typescript
// NEW - Consolidated import
import { AddToCartButton } from '~/components/features/cart';
```

### Header Components

#### Header Consolidation
**Replace these imports:**
```typescript
// OLD - Multiple header implementations
import { Header } from '~/components/Header';
import { Header } from '~/components/Layout/Header';
import { Header } from '~/components/Shared/Header';
```

**With this single import:**
```typescript
// NEW - Consolidated import
import { Header } from '~/components/shared';
```

### UI Components

#### New Optimized Image Component
**For timeline/gallery images:**
```typescript
// NEW - Performance optimized images
import { OptimizedTimelineImage } from '~/components/ui/OptimizedTimelineImage';
```

## 🛠️ Component API Changes

### AddToCartButton API
The new consolidated AddToCartButton supports all previous functionality:

```typescript
interface AddToCartButtonProps {
  /** Product variant ID (required) */
  variantId: string;
  /** Quantity to add (default: 1) */
  quantity?: number;
  /** Whether the product is available for sale (default: true) */
  available?: boolean;
  /** Custom button text (default: 'Add to cart') */
  children?: React.ReactNode;
  /** Analytics data for tracking */
  analytics?: Record<string, unknown>;
  /** Optional selling plan ID for subscriptions */
  sellingPlanId?: string;
  /** Whether to automatically open cart after adding (default: true) */
  openCartOnAdd?: boolean;
  /** Show different text when item already in cart (default: true) */
  showCartStatus?: boolean;
  /** Standard button props */
  disabled?: boolean;
  className?: string;
}
```

**Migration examples:**

```typescript
// OLD - Various implementations
<SimpleAddToCartButton variantId="123" quantity={1} />
<StandaloneAddToCart variantId="123" quantity={1} available={true} />
<AddToCartButton variantId="123" analytics={{product_id: "123"}} />

// NEW - Single component handles all cases
<AddToCartButton variantId="123" quantity={1} />
<AddToCartButton variantId="123" available={true} />
<AddToCartButton variantId="123" analytics={{product_id: "123"}} />
```

### Header API
The new Header component maintains the same interface:

```typescript
interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

// Usage remains the same
<Header 
  header={header} 
  cart={cart} 
  isLoggedIn={isLoggedIn} 
  publicStoreDomain={publicStoreDomain} 
/>
```

## 📁 File Cleanup

### Safe Deletion List
After migrating imports, these files can be safely deleted:

```
app/components/
├── AddToCart/                    # Can delete entire folder
│   ├── AddToCartButton.tsx
│   ├── AddToCartButtonWithContext.tsx
│   └── index.tsx
├── AddToCartButton.tsx           # Can delete
├── SimpleAddToCartButton.tsx     # Can delete
├── StandaloneAddToCart.tsx       # Can delete
├── Layout/
│   └── Header.tsx               # Can delete (keep Footer.tsx if used)
└── Shared/
    └── Header.tsx               # Can delete (keep other shared components)
```

### Backup Location
Old files have been backed up with `.old` suffix:
- `eslint.config.old.js` - Original ESLint configuration

## 🔍 Testing Migration

### 1. Search and Replace
Use your IDE to find and replace import statements:

**Search for:**
```regex
import.*AddToCartButton.*from.*components/(AddToCart|containers)
```

**Replace with:**
```typescript
import { AddToCartButton } from '~/components/features/cart';
```

### 2. Verify Functionality
Test these critical paths:
- [ ] Add to cart functionality works
- [ ] Cart drawer opens correctly
- [ ] Header navigation works
- [ ] Mobile menu functions
- [ ] Image loading in timeline section

### 3. Performance Check
Monitor these metrics:
- [ ] Bundle size (should be smaller)
- [ ] ESLint performance (should be faster)
- [ ] Image loading times (should be optimized)

## 🚨 Rollback Plan

If issues arise:

1. **Restore old ESLint config:**
   ```bash
   mv eslint.config.js eslint.config.new.js
   mv eslint.config.old.js eslint.config.js
   ```

2. **Revert to old components:**
   - Old component files are preserved
   - Simply change import paths back
   - No data loss or functionality impact

## 🎯 Benefits After Migration

### Performance
- **Reduced bundle size** through eliminated duplication
- **Faster ESLint** with simplified configuration  
- **Optimized images** with proper loading strategies

### Developer Experience
- **Single source of truth** for each component type
- **Cleaner import statements** with logical grouping
- **Better TypeScript** support with consolidated types
- **Easier maintenance** with reduced code duplication

### Code Quality
- **Follows Hydrogen best practices** for component architecture
- **Modern React patterns** with hooks and performance optimization
- **Accessibility improvements** built into consolidated components
- **Analytics integration** standardized across components

## 🆘 Support

If you encounter issues during migration:

1. Check the console for TypeScript errors
2. Verify import paths match the new structure
3. Test component functionality in development
4. Use the rollback plan if needed
5. All old functionality is preserved in new components
