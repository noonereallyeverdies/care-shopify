/**
 * Hydrogen cache utility for optimized cache policies
 */
import {CacheShort, CacheLong, CacheNone, CacheCustom} from '@shopify/hydrogen';

/**
 * Route-based caching utility for optimal performance
 * Returns appropriate cache headers based on the route pattern
 * 
 * @param request - The incoming request
 * @param pathname - The current route pathname
 * @returns Appropriate cache policy headers
 */
export function getRouteCache(request: Request, pathname: string) {
  const url = new URL(request.url);
  const path = pathname || url.pathname;
  
  // Check for search params that should bypass cache
  if (url.searchParams.has('preview') || url.searchParams.has('design_mode')) {
    return CacheNone();
  }
  
  // User-specific routes - no caching
  if (
    path.includes('/account') || 
    path.includes('/cart') || 
    path.includes('/orders') ||
    path.includes('/api/') ||
    path.includes('/webhooks/') 
  ) {
    return CacheNone();
  }
  
  // Static content routes - long cache
  if (
    path.match(/\.(js|css|woff2?|ttf|otf|svg|png|jpe?g|gif|webp|avif|ico)$/i) ||
    path.match(/^\/(about|terms|privacy|faq|shipping|returns)/i) ||
    path.match(/^\/(blogs\/[^\/]+\/[^\/]+)$/i) // Individual blog posts
  ) {
    return CacheLong({
      staleWhileRevalidate: 60 * 60 * 24, // 24 hours
    });
  }
  
  // Collection and Product routes - short cache with revalidation
  if (
    path.match(/^\/(collections|products)\/[^\/]+$/i)
  ) {
    return CacheShort({
      staleWhileRevalidate: 60 * 60, // 1 hour
    });
  }
  
  // Collection listings - medium cache
  if (
    path.match(/^\/(collections(\/[^\/]+)?)?$/i) ||
    path.match(/^\/(products)$/i)
  ) {
    return CacheCustom({
      maxAge: 60 * 10, // 10 minutes
      staleWhileRevalidate: 60 * 60, // 1 hour
    });
  }
  
  // Homepage - balance between fresh and fast
  if (
    path === '/' || 
    path === '/index.html' || 
    path.match(/^\/(en|fr)$/)
  ) {
    return CacheCustom({
      maxAge: 60 * 5, // 5 minutes
      staleWhileRevalidate: 60 * 30, // 30 minutes
    });
  }
  
  // Default for all other routes - short cache
  return CacheShort();
}

/**
 * Apply route-specific cache headers to a Response
 * 
 * @param response - The response to modify
 * @param request - The original request
 * @param pathname - The route pathname
 * @returns Modified response with appropriate cache headers
 */
export function applyCacheHeaders(
  response: Response,
  request: Request,
  pathname: string
): Response {
  const cache = getRouteCache(request, pathname);
  const headers = new Headers(response.headers);
  
  // Apply cache headers from the cache policy
  const cacheHeaders = cache.headers;
  cacheHeaders.forEach((value, key) => {
    headers.set(key, value);
  });
  
  // Return new response with updated headers
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

/**
 * Determine if a path is eligible for stale-while-revalidate strategy
 * 
 * @param pathname - The route pathname
 * @returns Whether the path should use SWR strategy
 */
export function isSwrEligible(pathname: string): boolean {
  // Paths that benefit from stale-while-revalidate
  return Boolean(
    pathname.match(/^\/(collections|products)/i) ||
    pathname.match(/^\/(blogs)/i) ||
    pathname === '/' ||
    pathname.match(/^\/(en|fr)$/)
  );
}

/**
 * Get cache TTL (time to live) for a specific route in seconds
 * 
 * @param pathname - The route pathname
 * @returns Cache TTL in seconds
 */
export function getRouteTtl(pathname: string): number {
  // Static assets - 7 days
  if (pathname.match(/\.(js|css|woff2?|ttf|otf|svg|png|jpe?g|gif|webp|avif|ico)$/i)) {
    return 60 * 60 * 24 * 7;
  }
  
  // Static pages - 1 day
  if (pathname.match(/^\/(about|terms|privacy|faq|shipping|returns)/i)) {
    return 60 * 60 * 24;
  }
  
  // Blog posts - 12 hours
  if (pathname.match(/^\/(blogs\/[^\/]+\/[^\/]+)$/i)) {
    return 60 * 60 * 12;
  }
  
  // Product pages - 1 hour
  if (pathname.match(/^\/(products)\/[^\/]+$/i)) {
    return 60 * 60;
  }
  
  // Collection pages - 30 minutes
  if (pathname.match(/^\/(collections)\/[^\/]+$/i)) {
    return 60 * 30;
  }
  
  // Homepage - 5 minutes
  if (pathname === '/' || pathname === '/index.html' || pathname.match(/^\/(en|fr)$/)) {
    return 60 * 5;
  }
  
  // Default - 2 minutes
  return 60 * 2;
}
