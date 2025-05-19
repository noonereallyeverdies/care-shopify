# Component Architecture Guidelines

This document outlines the standardized component architecture for our Shopify Hydrogen storefront. Following these patterns will improve code maintainability, reduce prop drilling, and create a more scalable application.

## Component Types

We've established three main types of components, each with distinct responsibilities:

### 1. Server Components (`~/components/server/`)

Server components are responsible for:
- Data fetching (using Hydrogen/Remix APIs)
- Server-side operations
- Passing data to container components

Example:
```tsx
// ~/components/server/ProductList.tsx
export function ProductList({ collectionHandle }) {
  // Fetch data from Shopify
  const { products } = useShopQuery({
    query: PRODUCTS_QUERY,
    variables: { handle: collectionHandle }
  });
  
  // Pass data to container component
  return <ProductListContainer products={products} />;
}
```

### 2. Container Components (`~/components/containers/`)

Container components are responsible for:
- Business logic
- State management
- Event handlers
- Passing props to UI components

Example:
```tsx
// ~/components/containers/product/ProductListContainer.tsx
export function ProductListContainer({ products }) {
  const [sortOrder, setSortOrder] = useState('featured');
  
  // Business logic to sort products
  const sortedProducts = useMemo(() => {
    return sortProducts(products, sortOrder);
  }, [products, sortOrder]);
  
  // Event handler
  const handleSortChange = (newOrder) => {
    setSortOrder(newOrder);
  };
  
  // Pass data to UI component
  return (
    <ProductListUI 
      products={sortedProducts}
      sortOrder={sortOrder}
      onSortChange={handleSortChange}
    />
  );
}
```

### 3. UI Components (`~/components/ui/`)

UI components are responsible for:
- Presentation only
- Rendering UI elements
- Handling layout and styling
- Receiving props from container components

Example:
```tsx
// ~/components/ui/product/ProductListUI.tsx
export function ProductListUI({ products, sortOrder, onSortChange }) {
  return (
    <div className="product-list">
      <div className="sort-controls">
        <SortSelector value={sortOrder} onChange={onSortChange} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
```

## Best Practices

### Component Naming Conventions
- Server components: `ComponentName.tsx`
- Container components: `ComponentNameContainer.tsx`
- UI components: `ComponentNameUI.tsx`

### File Organization
- Group related components in subdirectories (e.g., `product`, `cart`)
- Use barrel exports for clean imports

### Props
- Use TypeScript interfaces to define prop types
- Keep props as specific as possible
- Avoid prop drilling by using composition patterns

### State Management
- Keep state as close as possible to where it's used
- Use React Context for global state or deeply nested components
- Consider Jotai or Redux for complex state requirements

### Performance
- Memoize expensive calculations with `useMemo`
- Optimize event handlers with `useCallback`
- Use React.memo() for pure UI components when appropriate

## Avoiding Prop Drilling

Instead of passing props through multiple component layers, use these techniques:

### Component Composition
Use React's children prop to compose components:

```tsx
function ProductLayout({ children }) {
  return <div className="product-container">{children}</div>;
}

function ProductPage() {
  return (
    <ProductLayout>
      <ProductHeader />
      <ProductGallery />
      <ProductDetails />
    </ProductLayout>
  );
}
```

### Context API
For more complex scenarios, use the Context API:

```tsx
// Create a context
const ProductContext = createContext();

// Provider in a parent component
function ProductProvider({ product, children }) {
  return (
    <ProductContext.Provider value={product}>
      {children}
    </ProductContext.Provider>
  );
}

// Consumer in a child component
function ProductPrice() {
  const product = useContext(ProductContext);
  return <div>{product.price}</div>;
}
```

By following these patterns consistently across the codebase, we'll achieve better code organization, improved maintainability, and reduced technical debt.
