/**
 * Cache control utility for setting appropriate cache headers
 */

// Cache durations in seconds
export const CACHE_SHORT = 'public, max-age=60, stale-while-revalidate=600'; // 1 minute + 10 min stale
export const CACHE_MEDIUM = 'public, max-age=3600, stale-while-revalidate=86400'; // 1 hour + 1 day stale
export const CACHE_LONG = 'public, max-age=86400, stale-while-revalidate=604800'; // 1 day + 1 week stale
export const CACHE_ASSETS = 'public, max-age=31536000, immutable'; // 1 year for static assets

// Cache-Control headers for routes
export const routeHeaders = {
  'Vary': 'Accept, Accept-Language, Cookie, x-shopify-preview',
  'Cache-Control': CACHE_SHORT
};

// Cache headers for different content types
export function getCacheControlHeaders(
  contentType: 'html' | 'image' | 'font' | 'json' | 'css' | 'js' | 'other' = 'html'
): HeadersInit {
  const headers: HeadersInit = { ...routeHeaders };

  switch (contentType) {
    case 'html':
      headers['Cache-Control'] = CACHE_SHORT;
      break;
    case 'image':
      headers['Cache-Control'] = CACHE_LONG;
      break;
    case 'font':
      headers['Cache-Control'] = CACHE_ASSETS;
      break;
    case 'json':
      headers['Cache-Control'] = CACHE_MEDIUM;
      break;
    case 'css':
    case 'js':
      headers['Cache-Control'] = CACHE_ASSETS;
      break;
    default:
      headers['Cache-Control'] = CACHE_SHORT;
  }

  return headers;
}

// Function to apply headers to a Response
export function applyCacheHeaders(
  response: Response,
  contentType: 'html' | 'image' | 'font' | 'json' | 'css' | 'js' | 'other' = 'html'
): Response {
  const cacheHeaders = getCacheControlHeaders(contentType);
  
  Object.entries(cacheHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  return response;
}