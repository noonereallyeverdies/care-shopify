# Performance Optimization Implementation Guide

## Quick Start

### 1. Using LazyImage

Replace standard images with optimized lazy loading:

```typescript
// Before
<img src={imageUrl} alt={alt} />

// After
import { LazyImage } from '~/components/ui/LazyImage';

<LazyImage
  src={imageUrl}
  alt={alt}
  width={400}
  height={300}
  blurDataURL={`${imageUrl}?w=20&h=20&q=10`}
  loading={isPriority ? 'eager' : 'lazy'}
/>
```

### 2. Using LazyComponent

Wrap heavy components for below-fold lazy loading:

```typescript
// Before
<HeavyComponent {...props} />

// After
import { LazyComponent } from '~/components/ui/LazyComponent';

<LazyComponent
  component={HeavyComponent}
  componentProps={props}
  threshold={0.2}
  fallback={<SkeletonLoader />}
  strategy="lazy"
/>
```

### 3. Using Virtual Scrolling

For large lists and grids:

```typescript
// Before
{products.map(product => <ProductCard product={product} />)}

// After
import { VirtualScroll } from '~/components/ui/VirtualScroll';

<VirtualScroll
  items={products}
  itemHeight={300}
  containerHeight={600}
  renderItem={(product, index) => (
    <ProductCard product={product} priority={index < 4} />
  )}
  overscan={5}
/>
```

## Component Examples

### Product Gallery with Lazy Loading

```typescript
// app/components/ProductGallery.tsx
import { LazyImage } from '~/components/ui/LazyImage';

export function ProductGallery({ media }: { media: MediaImage[] }) {
  return (
    <div className="product-gallery">
      <LazyImage
        src={mainImage.url}
        alt={mainImage.altText}
        loading="eager" // Main image loads immediately
        blurDataURL={`${mainImage.url}?w=20&h=20&q=20`}
      />
      {thumbnails.map((thumb, index) => (
        <LazyImage
          key={index}
          src={thumb.url}
          alt={thumb.altText}
          loading="lazy" // Thumbnails load lazily
        />
      ))}
    </div>
  );
}
```

### Lazy Loaded Page Sections

```typescript
// app/routes/($locale)._index.tsx
import { LazyComponent } from '~/components/ui/LazyComponent';

// Lazy load below-fold sections
const LazyTestimonials = React.lazy(() => 
  import('~/components/sections/TestimonialsSection')
);

export default function Homepage() {
  return (
    <div>
      {/* Above fold - loads immediately */}
      <HeroSection />
      <ProblemSolution />
      
      {/* Below fold - lazy loaded */}
      <LazyComponent
        component={LazyTestimonials}
        threshold={0.2}
        rootMargin="100px"
        fallback={<TestimonialsSkeleton />}
      />
    </div>
  );
}
```

### Virtual Product Grid

```typescript
// app/components/VirtualizedProductGrid.tsx
import { VirtualGrid } from '~/components/ui/VirtualScroll';
import { LazyImage } from '~/components/ui/LazyImage';

export function VirtualizedProductGrid({ products }: { products: Product[] }) {
  return (
    <VirtualGrid
      items={products}
      itemWidth={280}
      itemHeight={420}
      containerWidth={1200}
      containerHeight={600}
      gap={20}
      renderItem={(product, index, row, col) => (
        <ProductCard product={product} priority={row === 0} />
      )}
    />
  );
}

function ProductCard({ product, priority }: { product: Product; priority: boolean }) {
  return (
    <div className="product-card">
      <LazyImage
        src={product.featuredImage?.url}
        alt={product.title}
        loading={priority ? 'eager' : 'lazy'}
        width={280}
        height={280}
      />
      <h3>{product.title}</h3>
      <Money data={product.priceRange.minVariantPrice} />
    </div>
  );
}
```

## Best Practices

### 1. Loading Strategies

```typescript
// Critical above-fold images
<LazyImage loading="eager" />

// Below-fold images with preload on hover
<LazyImage 
  loading="lazy"
  onMouseEnter={() => preloadImage(nextImageUrl)}
/>

// Product thumbnails with lower priority
<LazyImage 
  loading="lazy"
  threshold={0.1}
  rootMargin="50px"
/>
```

### 2. Error Handling

```typescript
<LazyComponent
  component={Component}
  errorFallback={({ error, retry }) => (
    <div className="error-state">
      <p>Failed to load: {error.message}</p>
      <button onClick={retry}>Retry</button>
    </div>
  )}
/>
```

### 3. Performance Monitoring

```typescript
// Add to specific pages for monitoring
import { PerformanceMonitor } from '~/lib/performance-utils';

export function ProductPage() {
  useEffect(() => {
    const timer = PerformanceMonitor.startTiming('product-page-load');
    return timer; // Cleanup automatically tracks load time
  }, []);

  return <ProductLayout />;
}
```

## Advanced Usage

### Dynamic Route Loading

```typescript
// app/lib/lazy-loading.ts
export const LazyProductPage = lazy(() => 
  import('~/routes/($locale).products.$handle').then(module => ({
    default: module.default
  }))
);

// With prefetching
export function createLazyRoute(importFn, prefetchDelay = 2000) {
  const LazyComponent = lazy(importFn);
  
  // Prefetch after delay
  setTimeout(() => {
    importFn().catch(() => {});
  }, prefetchDelay);
  
  return LazyComponent;
}
```

### Responsive Virtual Scrolling

```typescript
export function ResponsiveProductGrid({ products }) {
  const { width } = useWindowSize();
  const itemsPerRow = width > 1200 ? 4 : width > 768 ? 3 : 2;
  const itemWidth = (width - (itemsPerRow - 1) * 20) / itemsPerRow;

  return (
    <VirtualGrid
      items={products}
      itemWidth={itemWidth}
      itemHeight={420}
      containerWidth={width}
      // ... other props
    />
  );
}
```

### Conditional Optimization

```typescript
// Only virtualize for large lists
export function ConditionalProductGrid({ products }) {
  const shouldVirtualize = products.length > 50;
  
  if (shouldVirtualize) {
    return <VirtualizedProductGrid products={products} />;
  }
  
  return (
    <div className="grid">
      {products.map(product => (
        <LazyComponent
          key={product.id}
          component={() => <ProductCard product={product} />}
        />
      ))}
    </div>
  );
}
```

## Troubleshooting

### Common Issues

1. **Images not loading**
   - Check intersection observer support
   - Verify image URLs are accessible
   - Check network tab for 404 errors

2. **Components not lazy loading**
   - Ensure component is wrapped in LazyComponent
   - Check if component is above fold (adjust threshold)
   - Verify fallback content is rendering

3. **Virtual scrolling performance**
   - Use fixed item heights when possible
   - Reduce overscan for better performance
   - Check for memory leaks in item components

### Debugging Tips

```typescript
// Enable debug logging
<LazyImage 
  src={src}
  onLoad={() => console.log('Image loaded:', src)}
  onError={() => console.log('Image failed:', src)}
/>

// Monitor virtual scroll performance
<VirtualScroll
  items={items}
  onScroll={(offset) => console.log('Scroll offset:', offset)}
  // ... other props
/>
```

This implementation guide provides practical examples for integrating the performance optimizations throughout your application. Each component is designed to be drop-in replacements for standard implementations with minimal configuration required.
