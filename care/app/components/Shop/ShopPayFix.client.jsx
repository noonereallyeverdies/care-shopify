/**
 * This component ensures Shop Pay always has a valid URL by patching the global Shop Pay configuration
 * It should be included in the app's layout component
 */
export function ShopPayFix() {
  // Only run in the browser
  if (typeof window === 'undefined') return null;

  // Fix Shop Pay's URL handling if needed
  if (window.Shopify && !window.Shopify.__shopPayFixed) {
    // Mark that we've applied the fix to avoid duplicate patching
    window.Shopify.__shopPayFixed = true;
    
    // Original domain might be missing protocol
    const originalDomain = window.Shopify?.shop?.url || '';
    
    // Ensure the domain has a protocol
    if (originalDomain && !originalDomain.startsWith('http')) {
      // Store a patched version with protocol
      if (window.Shopify.shop) {
        window.Shopify.shop.url = `https://${originalDomain}`;
      }
      
      // Replace any URL constructors used in Shop Pay with a patched version
      const originalURL = window.URL;
      window.URL = function(...args) {
        // If the first argument might be a shop domain missing protocol
        if (typeof args[0] === 'string' && 
            args[0].includes('myshopify.com') && 
            !args[0].startsWith('http')) {
          args[0] = `https://${args[0]}`;
        }
        return new originalURL(...args);
      };
      window.URL.prototype = originalURL.prototype;
    }
  }
  
  // No visible content
  return null;
} 