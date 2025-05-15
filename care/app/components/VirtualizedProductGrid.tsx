import React, { useMemo } from 'react';
import { Link } from '@remix-run/react';
import { Money, Image } from '@shopify/hydrogen';
import type { Product } from '@shopify/hydrogen/storefront-api-types';
import { VirtualGrid } from '~/components/ui/VirtualScroll';
import { LazyImage } from '~/components/ui/LazyImage';
import { LazyComponent } from '~/components/ui/LazyComponent';
import { cn } from '~/lib/utils';

interface VirtualizedProductGridProps {
  products: Product[];
  className?: string;
  itemsPerRow?: number;
  itemWidth?: number;
  itemHeight?: number;
  containerHeight?: number;
  gap?: number;
  overscan?: number;
  loading?: boolean;
  emptyState?: React.ReactNode;
}

interface ProductCardProps {
  product: Product;
  index: number;
  priority?: boolean;
}

// Optimized Product Card Component
function ProductCard({ product, index, priority = false }: ProductCardProps) {
  const variant = product.variants?.nodes?.[0];
  const image = product.featuredImage;
  const price = variant?.price;

  return (
    <div className="product-card group h-full">
      <Link
        to={`/products/${product.handle}`}
        className="block h-full bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1"
      >
        {/* Product Image */}
        <div className="aspect-square overflow-hidden">
          <LazyImage
            src={image?.url || ''}
            alt={image?.altText || product.title}
            width={300}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading={priority ? 'eager' : 'lazy'}
            blurDataURL={image?.url ? `${image.url}?w=20&h=20&q=10` : undefined}
          />
        </div>

        {/* Product Details */}
        <div className="p-4">
          <h3 className="font-medium text-gray-900 group-hover:text-rose-600 transition-colors line-clamp-2">
            {product.title}
          </h3>
          
          {price && (
            <div className="mt-2">
              <Money data={price} className="text-lg font-semibold text-gray-900" />
              {variant?.compareAtPrice && (
                <Money 
                  data={variant.compareAtPrice} 
                  className="ml-2 text-sm text-gray-500 line-through" 
                />
              )}
            </div>
          )}

          {/* Product badges */}
          <div className="mt-2 flex flex-wrap gap-1">
            {variant?.availableForSale === false && (
              <span className="inline-block px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded">
                Out of Stock
              </span>
            )}
            {variant?.compareAtPrice && (
              <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded">
                Sale
              </span>
            )}
          </div>

          {/* Quick preview on hover */}
          <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="w-full px-3 py-2 text-sm font-medium text-white bg-rose-600 rounded hover:bg-rose-700 transition-colors">
              Quick View
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

/**
 * VirtualizedProductGrid Component
 * 
 * Efficiently renders large product lists using virtualization.
 * Only renders visible products to maintain smooth performance.
 */
export function VirtualizedProductGrid({
  products,
  className,
  itemsPerRow = 4,
  itemWidth = 280,
  itemHeight = 420,
  containerHeight = 600,
  gap = 20,
  overscan = 2,
  loading = false,
  emptyState,
}: VirtualizedProductGridProps) {
  // Calculate container width based on items per row
  const containerWidth = useMemo(() => {
    return itemsPerRow * itemWidth + (itemsPerRow - 1) * gap;
  }, [itemsPerRow, itemWidth, gap]);

  // Render function for each grid item
  const renderItem = useMemo(() => 
    (product: Product, index: number, row: number, col: number) => {
      // First row items get priority loading
      const priority = row === 0;
      
      return (
        <ProductCard 
          product={product} 
          index={index} 
          priority={priority}
        />
      );
    }, []
  );

  // Loading state
  if (loading) {
    return (
      <div className={cn('grid gap-4', className)} style={{
        gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)`,
        height: containerHeight
      }}>
        {Array.from({ length: itemsPerRow * 3 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
            <div className="h-4 bg-gray-200 rounded mb-2" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className={cn('flex items-center justify-center', className)}>
        {emptyState || (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn('virtualized-product-grid', className)}>
      <VirtualGrid
        items={products}
        itemWidth={itemWidth}
        itemHeight={itemHeight}
        containerWidth={containerWidth}
        containerHeight={containerHeight}
        gap={gap}
        overscan={overscan}
        renderItem={renderItem}
        className="mx-auto"
      />
    </div>
  );
}

// Standard Product Grid (non-virtualized) for smaller lists
export function ProductGrid({
  products,
  className,
  columns = 4,
  loading = false,
  emptyState,
}: {
  products: Product[];
  className?: string;
  columns?: number;
  loading?: boolean;
  emptyState?: React.ReactNode;
}) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
  };

  // Loading state
  if (loading) {
    return (
      <div className={cn('grid gap-6', gridCols[columns as keyof typeof gridCols], className)}>
        {Array.from({ length: columns * 3 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
            <div className="h-4 bg-gray-200 rounded mb-2" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className={cn('flex items-center justify-center py-12', className)}>
        {emptyState || (
          <div className="text-center">
            <p className="text-gray-500">No products found</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn('grid gap-6', gridCols[columns as keyof typeof gridCols], className)}>
      {products.map((product, index) => (
        <LazyComponent
          key={product.id}
          component={() => <ProductCard product={product} index={index} priority={index < 4} />}
          threshold={0.1}
          rootMargin="100px"
          fallback={
            <div className="animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          }
        />
      ))}
    </div>
  );
}

// Responsive Product Grid that chooses between virtualized and standard based on count
export function ResponsiveProductGrid({
  products,
  className,
  virtualizationThreshold = 50,
  ...props
}: VirtualizedProductGridProps & {
  virtualizationThreshold?: number;
}) {
  // Use virtualization for large product lists
  if (products.length > virtualizationThreshold) {
    return (
      <VirtualizedProductGrid
        products={products}
        className={className}
        {...props}
      />
    );
  }

  // Use standard grid for smaller lists
  return (
    <ProductGrid
      products={products}
      className={className}
      columns={props.itemsPerRow || 4}
      loading={props.loading}
      emptyState={props.emptyState}
    />
  );
}