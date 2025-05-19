import React from 'react';
import { Suspense } from 'react';
import { Await } from '@remix-run/react';

interface DataFallbackProps<T> {
  /** The data promise from the loader (to await) */
  data: Promise<T>;
  
  /** Component to show when data is loaded successfully */
  children: React.ReactNode | ((data: T) => React.ReactNode);
  
  /** Component to show while loading */
  fallback?: React.ReactNode;
  
  /** Component to show on error */
  errorElement?: React.ReactNode | ((error: unknown) => React.ReactNode);
  
  /** Optional ID for the container */
  id?: string;
  
  /** Optional className for styling */
  className?: string;
}

/**
 * Generic component for handling async data with proper fallbacks
 * Makes it easy to implement suspense and error handling in a consistent way
 * 
 * @example
 * ```tsx
 * <DataFallback 
 *   data={productPromise} 
 *   fallback={<ProductSkeleton />}
 *   errorElement={(error) => <ProductError error={error} />}
 * >
 *   {(product) => <ProductDetail product={product} />}
 * </DataFallback>
 * ```
 */
export function DataFallback<T>({
  data,
  children,
  fallback = <DefaultFallback />,
  errorElement = <DefaultError />,
  id,
  className,
}: DataFallbackProps<T>) {
  return (
    <div id={id} className={className}>
      <Suspense fallback={fallback}>
        <Await 
          resolve={data} 
          errorElement={typeof errorElement === 'function' 
            ? ({ error }) => (errorElement as (error: unknown) => React.ReactNode)(error)
            : errorElement
          }
        >
          {(resolvedData) => {
            return typeof children === 'function'
              ? (children as (data: T) => React.ReactNode)(resolvedData)
              : children;
          }}
        </Await>
      </Suspense>
    </div>
  );
}

/**
 * Default loading fallback
 */
export function DefaultFallback() {
  return (
    <div className="animate-pulse p-4 max-w-full overflow-hidden">
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2.5"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2.5"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2.5"></div>
      <div className="h-10 bg-gray-200 rounded w-1/4 mt-4"></div>
    </div>
  );
}

/**
 * Default error component
 */
export function DefaultError() {
  return (
    <div className="p-4 border border-red-100 rounded bg-red-50 text-red-700">
      <h3 className="text-lg font-medium mb-2">Unable to load data</h3>
      <p className="text-sm">
        There was a problem loading this content. Please try refreshing the page.
      </p>
    </div>
  );
}

/**
 * Export specialized fallbacks for different content types
 */
export const Fallbacks = {
  Product: () => (
    <div className="animate-pulse p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <div className="aspect-square bg-gray-200 rounded"></div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2.5"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2.5"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="h-12 bg-gray-200 rounded w-1/3 mt-4"></div>
        </div>
      </div>
    </div>
  ),
  
  Cart: () => (
    <div className="animate-pulse p-4">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex border-b py-4 mb-4">
          <div className="w-20 h-20 bg-gray-200 rounded"></div>
          <div className="flex-1 ml-4">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/6"></div>
          </div>
          <div className="w-24">
            <div className="h-5 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      ))}
      <div className="flex justify-end mt-6">
        <div className="w-1/3">
          <div className="flex justify-between mb-2">
            <div className="h-5 bg-gray-200 rounded w-1/3"></div>
            <div className="h-5 bg-gray-200 rounded w-1/3"></div>
          </div>
          <div className="h-12 bg-gray-200 rounded w-full mt-4"></div>
        </div>
      </div>
    </div>
  ),
  
  Collections: () => (
    <div className="animate-pulse grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="aspect-square bg-gray-200 rounded"></div>
      ))}
    </div>
  ),
  
  Search: () => (
    <div className="animate-pulse p-4">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col">
            <div className="aspect-square bg-gray-200 rounded mb-2"></div>
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  ),
  
  Account: () => (
    <div className="animate-pulse p-4">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
      <div className="flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-12 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  ),
};
