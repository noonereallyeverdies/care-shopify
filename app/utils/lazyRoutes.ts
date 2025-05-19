/**
 * Lazy route utilities for optimized code splitting
 * 
 * This file contains utilities for creating optimized route loaders
 * that implement various code-splitting strategies.
 */

import type { RouteImpl } from '@remix-run/react/dist/components';

/**
 * Creates a lazy-loaded route with standard delay parameters
 * @param routeImport The route module import function
 */
export function createLazyRoute(routeImport: () => Promise<any>): () => Promise<RouteImpl> {
  return () => {
    // Add a small delay to prioritize critical routes
    if (typeof window !== 'undefined' && !window.requestIdleCallback) {
      // For browsers that don't support requestIdleCallback
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(routeImport());
        }, 100);
      });
    }
    
    return routeImport();
  };
}

/**
 * Creates a product route with product-specific optimizations
 * @param routeImport The route module import function
 */
export function createProductRoute(routeImport: () => Promise<any>): () => Promise<RouteImpl> {
  // You might add product-specific optimizations here
  return routeImport;
}

/**
 * Creates a collection route with collection-specific optimizations
 * @param routeImport The route module import function
 */
export function createCollectionRoute(routeImport: () => Promise<any>): () => Promise<RouteImpl> {
  // You might add collection-specific optimizations here
  return routeImport;
}

/**
 * Preloads a route module in the background
 * @param routeLoader The route loader function
 */
export function preloadRoute(routeLoader: () => Promise<any>): void {
  if (typeof window === 'undefined') return;
  
  try {
    // Start loading the route in the background
    routeLoader().catch(() => {
      // Silently ignore preload errors
    });
  } catch (e) {
    // Silently ignore preload errors
  }
}
