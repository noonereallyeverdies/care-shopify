/**
 * Route splitting configuration
 * 
 * This file configures route-based code splitting strategies for the application,
 * optimizing loading performance based on route type.
 */
import { createLazyRoute, createProductRoute, createCollectionRoute } from '~/utils/lazyRoutes';

// Route splitting configuration
export const ROUTE_CONFIG = {
  // Highest priority routes (load immediately)
  CRITICAL: [
    '/',
    '/collections/all',
    '/search',
    '/cart',
  ],
  
  // Product routes (use product-specific code splitting)
  PRODUCT: [
    '/products/*',
  ],
  
  // Collection routes (use collection-specific code splitting)
  COLLECTION: [
    '/collections/*',
  ],
  
  // Secondary routes (can be lazy loaded)
  SECONDARY: [
    '/pages/*',
    '/journal',
    '/account',
    '/wishlist',
  ],
};

// Creates appropriate lazy loaders for each route type
export const lazyRoutes = {
  // Home page - loads immediately with minimal code splitting
  home: () => import('~/routes/($locale)._index'),
  
  // Cart - loads immediately for better UX
  cart: () => import('~/routes/($locale).cart'),
  
  // Product route with product-specific optimizations
  product: createProductRoute(() => import('~/routes/($locale).products.$handle')),
  
  // Collection route with collection-specific optimizations
  collection: createCollectionRoute(() => import('~/routes/($locale).collections.$handle')),
  
  // Static pages that can be fully lazy loaded
  page: createLazyRoute(() => import('~/routes/($locale).pages.$handle')),
  
  // Account section
  account: createLazyRoute(() => import('~/routes/($locale).account')),
  
  // Journal/blog section
  journal: createLazyRoute(() => import('~/routes/($locale).journal')),
  
  // Wishlist feature
  wishlist: createLazyRoute(() => import('~/routes/($locale).wishlist')),
  
  // Search page - loads immediately but with optimized components
  search: () => import('~/routes/($locale).search'),
};

/**
 * Preload routes based on user navigation patterns
 * @param {string} currentRoute Current route being viewed
 */
export function preloadRelatedRoutes(currentRoute: string) {
  // Don't preload on server
  if (typeof window === 'undefined') return;
  
  // Import preloading functionality dynamically to reduce initial bundle size
  import('~/utils/lazyRoutes').then(({ preloadRoute }) => {
    // Home page - preload popular collections and featured products
    if (currentRoute === '/') {
      // Preload the all collections page
      preloadRoute(lazyRoutes.collection);
      
      // Wait until idle to preload more
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
          preloadRoute(lazyRoutes.product);
        });
      }
    }
    
    // Collection page - preload product details
    if (currentRoute.startsWith('/collections/')) {
      preloadRoute(lazyRoutes.product);
    }
    
    // Product page - preload cart and related collections
    if (currentRoute.startsWith('/products/')) {
      preloadRoute(lazyRoutes.cart);
      
      // Wait until idle to preload more
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
          preloadRoute(lazyRoutes.collection);
        });
      }
    }
    
    // Cart page - preload checkout
    if (currentRoute === '/cart') {
      // If checkout is its own route, preload it here
      // preloadRoute(lazyRoutes.checkout);
    }
  });
}

export default lazyRoutes;
