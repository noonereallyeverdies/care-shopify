/**
 * CriticalCSS Component
 * 
 * This component handles the critical CSS implementation:
 * 1. Inlines critical CSS for the current route in the document head
 * 2. Loads the full CSS asynchronously to avoid render-blocking
 * 3. Provides debugging information in development mode
 */
import React, { useEffect } from 'react';
import { useMatches } from '@remix-run/react';
import { useRouteLoaderData } from '@remix-run/react';
import { getCriticalCSSForRoute } from '~/lib/critical-css';

export const CriticalCSS: React.FC = () => {
  // Get the current route
  const matches = useMatches();
  const currentRoute = matches[matches.length - 1];
  
  // Get the data we need for critical CSS
  const routeId = currentRoute?.id || '';
  const isLoggedIn = useRouteLoaderData('root')?.isLoggedIn || false;
  
  // Create a unique ID for this route's critical CSS
  const criticalCssId = `critical-css-${routeId}${isLoggedIn ? '-auth' : ''}`;
  
  // In development, log the critical CSS information
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      console.log('[CriticalCSS] Route:', routeId);
      console.log('[CriticalCSS] Auth state:', isLoggedIn ? 'logged in' : 'guest');
      
      // Measure CSS loading performance
      const cssLoadStartTime = performance.now();
      const fullCssLinks = document.querySelectorAll('link[rel="stylesheet"]');
      
      fullCssLinks.forEach(link => {
        // Check when each stylesheet loads
        link.addEventListener('load', () => {
          const loadTime = performance.now() - cssLoadStartTime;
          console.log(`[CriticalCSS] Full CSS loaded: ${(link as HTMLLinkElement).href} (${loadTime.toFixed(2)}ms)`);
        });
      });
    }
  }, [routeId, isLoggedIn]);
  
  // Static critical CSS from the build process - in a real implementation,
  // this would be populated during the build
  const staticCriticalCSS = getStaticCriticalCSS(routeId);
  
  return (
    <>
      {/* Inline critical CSS */}
      <style 
        id={criticalCssId} 
        dangerouslySetInnerHTML={{ __html: staticCriticalCSS }}
        suppressHydrationWarning
      />
      
      {/* Load full CSS asynchronously */}
      <noscript>
        {/* Fallback for users with JavaScript disabled */}
        <link rel="stylesheet" href="/styles/global.css" />
        <link rel="stylesheet" href="/styles/app.css" />
      </noscript>
      
      {/* Script to load non-critical CSS asynchronously */}
      {process.env.NODE_ENV === 'production' && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Load the full stylesheets asynchronously
                var loadStylesheet = function(href) {
                  var link = document.createElement('link');
                  link.rel = 'stylesheet';
                  link.href = href;
                  document.head.appendChild(link);
                };
                
                // Load stylesheets asynchronously
                if (window.requestIdleCallback) {
                  window.requestIdleCallback(function() {
                    loadStylesheet('/styles/global.css');
                    loadStylesheet('/styles/app.css');
                  });
                } else {
                  // Fallback for browsers that don't support requestIdleCallback
                  setTimeout(function() {
                    loadStylesheet('/styles/global.css');
                    loadStylesheet('/styles/app.css');
                  }, 1);
                }
              })();
            `
          }}
        />
      )}
    </>
  );
};

/**
 * Get static critical CSS for a specific route
 * In a real implementation, this would be generated during the build
 * and baked into the server-rendered HTML
 */
function getStaticCriticalCSS(routeId: string): string {
  // Simplified demo implementation:
  // In production, these would be pre-generated critical CSS snippets
  
  // Common critical CSS for all routes
  const commonCriticalCSS = `
    /* Base critical styles */
    :root {
      --color-primary: #2563eb;
      --color-secondary: #7c3aed;
      --color-background: #ffffff;
      --color-text: #111827;
      --spacing-unit: 0.25rem;
    }
    
    html, body {
      margin: 0;
      padding: 0;
      font-family: system-ui, -apple-system, sans-serif;
      color: var(--color-text);
      background: var(--color-background);
    }
    
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }
    
    /* Layout critical styles */
    .container {
      width: 100%;
      max-width: 1280px;
      margin-left: auto;
      margin-right: auto;
      padding-left: 1rem;
      padding-right: 1rem;
    }
    
    .flex {
      display: flex;
    }
    
    .flex-col {
      flex-direction: column;
    }
    
    .items-center {
      align-items: center;
    }
    
    .justify-between {
      justify-content: space-between;
    }
  `;
  
  // Route-specific critical CSS
  let routeCriticalCSS = '';
  
  switch(routeId) {
    case 'routes/index':
    case 'routes/($locale)._index':
      // Home page critical CSS
      routeCriticalCSS = `
        /* Header and hero styles */
        .header {
          position: sticky;
          top: 0;
          z-index: 50;
          background-color: var(--color-background);
          border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        
        .hero {
          padding-top: 2rem;
          padding-bottom: 3rem;
        }
        
        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        
        /* Product card grid */
        .product-card {
          display: flex;
          flex-direction: column;
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
      `;
      break;
      
    case 'routes/cart':
    case 'routes/($locale).cart':
      // Cart page critical CSS
      routeCriticalCSS = `
        /* Cart styles */
        .cart {
          width: 100%;
          padding-top: 2rem;
        }
        
        .cart-item {
          display: flex;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        
        .cart-summary {
          position: sticky;
          top: 5rem;
          padding: 1.5rem;
          background-color: rgba(0,0,0,0.02);
          border-radius: 0.5rem;
        }
        
        .checkout-button {
          width: 100%;
          padding: 0.75rem 1rem;
          background-color: var(--color-primary);
          color: white;
          font-weight: 600;
          border-radius: 0.375rem;
          border: none;
          cursor: pointer;
        }
      `;
      break;
      
    case 'routes/products/$handle':
    case 'routes/($locale).products.$handle':
      // Product detail page critical CSS
      routeCriticalCSS = `
        /* Product detail styles */
        .product-details {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        
        @media (min-width: 768px) {
          .product-details {
            flex-direction: row;
          }
        }
        
        .product-gallery {
          flex: 1;
        }
        
        .product-image {
          width: 100%;
          height: auto;
          border-radius: 0.5rem;
          overflow: hidden;
        }
        
        .product-title {
          font-size: 1.875rem;
          font-weight: 700;
          margin-top: 0;
          margin-bottom: 0.5rem;
        }
        
        .product-price {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        
        .add-to-cart {
          padding: 0.75rem 1.5rem;
          background-color: var(--color-primary);
          color: white;
          font-weight: 600;
          border-radius: 0.375rem;
          border: none;
          cursor: pointer;
          margin-top: 1rem;
        }
      `;
      break;
      
    default:
      // Default critical CSS for other routes
      routeCriticalCSS = '';
  }
  
  return commonCriticalCSS + routeCriticalCSS;
}
