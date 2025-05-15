import {
  defer,
  type LinksFunction,
  type LoaderFunctionArgs,
  type AppLoadContext,
  type MetaArgs,
} from '@shopify/remix-oxygen';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
  useRouteError,
  type ShouldRevalidateFunction,
  Await,
} from '@remix-run/react';
import {
  useNonce,
  Analytics,
  getShopAnalytics,
  getSeoMeta,
  type SeoConfig,
} from '@shopify/hydrogen';
import {Suspense, useState, useEffect, memo} from 'react';
import invariant from 'tiny-invariant';
import type { SerializeFrom } from '@remix-run/server-runtime';

// Import from the correct shared path
import {HeaderFallback, Header} from '~/components/Shared/Header';
import {FooterFallback, Footer} from '~/components/Shared/Footer';

// Remove unused components if not needed for basic layout
// import {PageLayout} from '~/components/PageLayout';
import {GenericError} from './components/GenericError';
import {NotFound} from './components/NotFound';

import favicon from '~/assets/favicon.svg';
import {seoPayload} from '~/lib/seo.server';

// OPTIMIZED CSS LOADING
// Critical CSS - loaded synchronously for above-the-fold content
import criticalStyles from '~/styles/critical.css?url';
// Main bundle - loaded asynchronously to prevent render blocking
import bundleStyles from '~/styles/bundle.css?url';

import {DEFAULT_LOCALE, parseMenu} from './lib/utils';
import type {EnhancedMenu} from './lib/utils';

// Import the new optimized analytics manager
import { initAnalytics, analytics } from '~/lib/analytics-manager';

// Import our manual Partytown configuration
import { initPartytown } from '~/lib/partytown-config';

// Import performance monitoring components
import { PerformanceDashboard, PerformanceAlerts, PerformanceInsights } from '~/components/PerformanceDashboard';

// Import Core Web Vitals monitoring
import { initializeWebVitalsMonitoring } from '~/lib/core-web-vitals';

// Add these functions at the top of the file, next to other imports
function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

export type RootLoader = typeof loader;

// Define fragments and the layout query
const MENU_FRAGMENT = `#graphql
  fragment MenuItem on MenuItem {
    id
    resourceId
    tags
    title
    type
    url
  }
  fragment ChildMenuItem on MenuItem {
    ...MenuItem
  }
  fragment ParentMenuItem on MenuItem {
    ...MenuItem
    items {
      ...ChildMenuItem
    }
  }
`;

const LAYOUT_QUERY = `#graphql
  ${MENU_FRAGMENT}
  query Layout(
    $language: LanguageCode
    $headerMenuHandle: String!
    $footerMenuHandle: String!
  ) @inContext(language: $language) {
    shop {
      name
      description
    }
    headerMenu: menu(handle: $headerMenuHandle) {
      id
      items {
        ...ParentMenuItem
      }
    }
    footerMenu: menu(handle: $footerMenuHandle) {
      id
      items {
        ...ParentMenuItem
      }
    }
  }
`;

// This is important to avoid re-fetching root queries on sub-navigations
export const shouldRevalidate: ShouldRevalidateFunction = ({
  formMethod,
  currentUrl,
  nextUrl,
}) => {
  // revalidate when a mutation is performed e.g add to cart, login...
  if (formMethod && formMethod !== 'GET') {
    return true;
  }

  // revalidate when manually revalidating via useRevalidator
  if (currentUrl.toString() === nextUrl.toString()) {
    return true;
  }

  return false;
};

export const links: LinksFunction = () => {
  return [
    // Preconnect to external resources
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    
    // Load local fonts
    {
      rel: 'stylesheet',
      href: '/fonts/fonts.css',
    },
    
    // Preload Partytown for faster analytics loading
    {
      rel: 'preload',
      href: '/~partytown/partytown.js',
      as: 'script',
    },
    
    // Favicon
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
    
    // CRITICAL CSS - Loaded synchronously
    {rel: 'stylesheet', href: criticalStyles},
    
    // PRELOAD main bundle for faster loading
    {rel: 'preload', href: bundleStyles, as: 'style'},
    
    // ASYNC load main bundle to prevent render blocking
    {
      rel: 'stylesheet', 
      href: bundleStyles, 
      media: 'print',
      onload: "this.media='all'", // Convert to 'all' after load (lowercase 'onload')
    },
  ];
};

// Export a headers function to modify response headers
export function headers({loaderHeaders}: {loaderHeaders: Headers}) {
  // Create a new Headers object based on loader headers
  const headers = new Headers(loaderHeaders);

  // Define a base CSP with explicit font-src AND data: in default-src
  const baseCsp =
    "default-src 'self' data: blob: https://cdn.shopify.com https://shopify.com; " + // Added blob: here
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.shopify.com http://localhost:*; " + 
    "style-src 'self' 'unsafe-inline' https://cdn.shopify.com https://fonts.googleapis.com; " + 
    "img-src 'self' data: blob: https://cdn.shopify.com; " + // Added blob: to img-src
    "font-src 'self' data: https://cdn.shopify.com https://fonts.gstatic.com; " + 
    "connect-src 'self' blob: https://cdn.shopify.com http://localhost:* ws://localhost:*; " + // Added blob: to connect-src
    "worker-src 'self' blob:; " + // Added worker-src for Partytown
    "frame-src 'self' https://cdn.shopify.com;";

  let csp = headers.get('Content-Security-Policy');

  if (csp) {
    // If a CSP already exists, ensure font-src and default-src allow 'data:' and 'blob:'
    
    // Ensure font-src allows 'data:'
    if (csp.includes('font-src')) {
      if (!csp.match(/font-src[^;]*data:/)) {
         csp = csp.replace(/font-src\s+([^;]+)/, "font-src $1 data:");
      }
    } else {
      csp = csp.trimRight();
      if (csp.slice(-1) !== ';') { csp += ';'; }
      csp += " font-src 'self' data: https://cdn.shopify.com https://fonts.gstatic.com;";
    }

    // Ensure default-src allows 'data:' and 'blob:'
    if (csp.includes('default-src')) {
      if (!csp.match(/default-src[^;]*data:/)) {
        csp = csp.replace(/default-src\s+([^;]+)/, "default-src $1 data:");
      }
      if (!csp.match(/default-src[^;]*blob:/)) {
        csp = csp.replace(/default-src\s+([^;]+)/, "default-src $1 blob:");
      }
    } else {
      // Extremely unlikely default-src is missing, but handle defensively
      csp = csp.trimRight();
      if (csp.slice(-1) !== ';') { csp += ';'; }
      csp += " default-src 'self' data: blob: https://cdn.shopify.com;";
    }

    // Ensure img-src includes 'blob:'
    if (csp.includes('img-src')) {
      if (!csp.match(/img-src[^;]*blob:/)) {
        csp = csp.replace(/img-src\s+([^;]+)/, "img-src $1 blob:");
      }
    } else {
      csp = csp.trimRight();
      if (csp.slice(-1) !== ';') { csp += ';'; }
      csp += " img-src 'self' data: blob: https://cdn.shopify.com;";
    }

    // Ensure connect-src includes localhost and blob: for HMR WebSocket
    if (!csp.includes('connect-src')) {
      csp = csp.trimRight();
      if (csp.slice(-1) !== ';') { csp += ';'; }
      csp += " connect-src 'self' blob: https://cdn.shopify.com http://localhost:* ws://localhost:*;";
    } else {
      if (!csp.match(/connect-src[^;]*ws:\/\/localhost:\*/)) {
        csp = csp.replace(/connect-src\s+([^;]+)/, "connect-src $1 http://localhost:* ws://localhost:*");
      }
      if (!csp.match(/connect-src[^;]*blob:/)) {
        csp = csp.replace(/connect-src\s+([^;]+)/, "connect-src $1 blob:");
      }
    }
  } else {
    // If no CSP exists from loader, use our base CSP
    csp = baseCsp;
  }

  // Set the modified CSP header
  // Note: Nonce handling happens during render via useNonce(), this just sets the policy structure
  headers.set('Content-Security-Policy', csp);

  // Add other security headers (optional but recommended)
  headers.set('X-Frame-Options', 'SAMEORIGIN');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  // Only set HSTS if you are sure your site is fully HTTPS
  // headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

  // Return the modified headers object
  return headers;
}

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({
    ...deferredData,
    ...criticalData,
  });
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({request, context}: LoaderFunctionArgs) {
  const {storefront, env} = context;
  
  const [layout] = await Promise.all([
    getLayoutData(context),
  ]);

  invariant(layout, 'Layout data is missing');

  // Pass the entire menu object to parseMenu
  const headerMenu = layout.headerMenu
    ? parseMenu(layout.headerMenu, env.PUBLIC_STORE_DOMAIN, env)
    : undefined; 

  const footerMenu = layout.footerMenu
    ? parseMenu(layout.footerMenu, env.PUBLIC_STORE_DOMAIN, env)
    : undefined;

  const shop = layout.shop;

  // Use seoPayload if available, otherwise a basic fallback
  const seo = seoPayload.root({
      shop,
      url: request.url,
    }) || {
      title: shop?.name ?? 'Care-atin',
      description: shop?.description ?? 'Red Light Therapy for Hair Growth',
    };

  return {
    layout: {
      shop,
      headerMenu,
      footerMenu,
    },
    seo,
    shop: getShopAnalytics({
      storefront,
      publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
    }),
    consent: {
      checkoutDomain: env.PUBLIC_STORE_DOMAIN,
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      withPrivacyBanner: true, // Or false, depending on requirements
    },
    selectedLocale: storefront.i18n,
  };
  // Note: Removed the previous try...catch block that returned minimal data.
  // If getLayoutData fails, it should ideally throw, leading to the ErrorBoundary.
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  const {cart, customerAccount} = context;

  return {
    isLoggedIn: customerAccount?.isLoggedIn() || Promise.resolve(false),
    cart: cart.get(),
  };
}

// Define props for Layout component
interface LayoutProps {
  children?: React.ReactNode;
  layout: SerializeFrom<typeof loader>['layout']; // Get type from loader
  cart?: SerializeFrom<typeof loader>['cart']; // Cart is optional/deferred
}

// Memoize Layout to prevent unnecessary re-renders
const Layout = memo(function Layout({children, layout, cart}: LayoutProps) {
  const nonce = useNonce(); 
  const locale = layout?.selectedLocale ?? DEFAULT_LOCALE;
  const headerMenu = layout?.headerMenu;
  const footerMenu = layout?.footerMenu;
  const isLoggedIn = false; // Placeholder - needs actual data if Header requires it

  // Initialize analytics on client-side only with the new optimized manager
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize Partytown configuration
      initPartytown();
      
      // Use requestIdleCallback to initialize analytics during browser idle time
      const initAnalyticsWhenIdle = () => {
        // Initialize the consolidated analytics manager
        initAnalytics()
          .then(() => {
            // Track initial page view
            analytics.trackPageView();
            
            // Set up global error tracking with minimal overhead
            window.addEventListener('error', (event) => {
              // Schedule error tracking during next idle period
              if (typeof window.requestIdleCallback === 'function') {
                window.requestIdleCallback(() => {
                  analytics.trackError(new Error(event.message), 'global_error_handler');
                });
              } else {
                setTimeout(() => {
                  analytics.trackError(new Error(event.message), 'global_error_handler');
                }, 300);
              }
            });
          })
          .catch((error) => {
            console.error('Failed to initialize analytics:', error);
          });
      };
      
      // Use requestIdleCallback if available, otherwise use setTimeout
      if (typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(initAnalyticsWhenIdle, { timeout: 3000 });
      } else {
        setTimeout(initAnalyticsWhenIdle, 300);
      }

      // Initialize performance monitoring utilities
      import('~/lib/performance-utils').then(({ PerformanceMonitor, MemoryManager }) => {
        // Start performance monitoring
        PerformanceMonitor.observeLongTasks();
        PerformanceMonitor.observeLayoutShifts();
        PerformanceMonitor.observeFirstContentfulPaint();
        
        // Start memory management with periodic cleanup
        MemoryManager.startPeriodicCleanup();
        
        // Clean up on page unload
        const cleanup = () => {
          PerformanceMonitor.clear();
          MemoryManager.stopPeriodicCleanup();
          MemoryManager.runCleanup();
        };
        
        window.addEventListener('beforeunload', cleanup);
        window.addEventListener('pagehide', cleanup);
        
        // Return cleanup function for component unmount
        return cleanup;
      }).catch((error) => {
        console.warn('Failed to initialize performance monitoring:', error);
      });

      // Initialize Core Web Vitals monitoring
      const webVitalsConfig = {
        debug: isDevelopment(),
        sampleRate: isProduction() ? 0.1 : 1.0, // Sample 10% in production, 100% in dev
        googleAnalytics: true,
        shopifyAnalytics: true,
        customEndpoint: env.WEB_VITALS_ENDPOINT,
      };
      
      initializeWebVitalsMonitoring(webVitalsConfig).catch((error) => {
        console.warn('Failed to initialize Web Vitals monitoring:', error);
      });
    }
  }, []);

  return (
    <>
      {/* Single premium header */}
      {headerMenu && (
        <Suspense fallback={<HeaderFallback />}>
          <Header
            header={headerMenu}
            shop={layout?.shop}
            cart={cart}
            isLoggedIn={isLoggedIn}
          />
        </Suspense>
      )}
      <main role="main" id="mainContent" className="flex-grow">
        {children}
      </main>
      {footerMenu && (
        <Suspense fallback={<FooterFallback />}>
          <Footer footer={footerMenu} shop={layout?.shop} />
        </Suspense>
      )}
    </>
  );
});

export default function App() {
  const data = useRouteLoaderData<typeof loader>('root');
  invariant(data, 'Root loader data is required'); // Ensure data exists
  const {analytics: analyticsData, layout, seo, cart, isLoggedIn} = data;

  const nonce = useNonce();
  const selectedLocale = layout?.selectedLocale ?? DEFAULT_LOCALE;

  const cartPromise = cart; 
  const analyticsPromise = analyticsData;

  return (
    <html lang={selectedLocale.language.toLowerCase()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="/site.webmanifest" />
        <Meta />
        <Links />
        
        {/* Inline critical CSS for fastest rendering - Optional enhancement */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Load non-critical CSS asynchronously
              (function() {
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = '${bundleStyles}';
                document.head.appendChild(link);
              })();
            `,
          }}
        />
        
        {/* Partytown scripts - These run in a web worker for better performance */}
        <script
          type="text/javascript"
          defer
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize Partytown scripts asynchronously during idle time
              (function() {
                if (typeof window !== 'undefined') {
                  // Use requestIdleCallback to delay loading until browser is idle
                  const loadPartytown = () => {
                    var script = document.createElement('script');
                    script.src = '/~partytown/partytown.js';
                    script.async = true;
                    document.head.appendChild(script);
                  };
                  
                  // Use requestIdleCallback if available, otherwise use setTimeout
                  if (typeof window.requestIdleCallback === 'function') {
                    window.requestIdleCallback(loadPartytown, { timeout: 2000 });
                  } else {
                    setTimeout(loadPartytown, 500);
                  }
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <Suspense fallback={<LayoutFallback layout={layout} />}>
          <Await resolve={cartPromise}>
            {(resolvedCart) => (
              <Layout layout={layout} cart={resolvedCart}>
                <Outlet />
              </Layout>
            )}
          </Await>
        </Suspense>

        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />

        <Suspense>
          <Await resolve={analyticsPromise}>
            {(resolvedAnalytics) => (
              resolvedAnalytics?.shop && resolvedAnalytics?.analytics ? (
                <Analytics.Provider
                  cart={cartPromise}
                  shop={resolvedAnalytics.shop}
                  consent={layout?.consent}
                  cookieDomain={resolvedAnalytics.analytics.domain}
                >
                  <></>
                </Analytics.Provider>
              ) : null
            )}
          </Await>
        </Suspense>

        {/* Performance Monitoring Components - Only in development by default */}
        <PerformanceDashboard showInProduction={false} />
        <PerformanceAlerts />
        <PerformanceInsights />
      </body>
    </html>
  );
}

function LayoutFallback({ layout }: { layout: SerializeFrom<typeof loader>['layout'] }) {
  return (
    <>
      <HeaderFallback />
      <main role="main" id="mainContent" className="flex-grow">
        <div className="flex items-center justify-center h-screen">
          <div className="loading-spinner"></div>
        </div>
      </main>
      <FooterFallback />
    </>
  );
}

export function ErrorBoundary() {
  // Use try-catch to safely try to access route error
  let error: unknown;
  let errorMessage = 'Unknown error';
  let errorStatus = 500;
  let rootData: any = null;
  
  try {
    // Only use these hooks if we're in a router context
    if (typeof document !== 'undefined') {
      error = useRouteError();
      rootData = useRouteLoaderData<SerializeFrom<RootLoader>>('root');
      
      if (isRouteErrorResponse(error)) {
        errorMessage = error?.data?.message ?? error.data;
        errorStatus = error.status;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
    }
  } catch (e) {
    // If the hooks fail, we're rendering outside router context (e.g., during SSR error)
    console.error('Error boundary failed to use router hooks:', e);
    // Keep the default error message
  }

  // Provide fallback for nonce
  const nonce = (() => {
    try {
      return useNonce();
    } catch (e) {
      return '';
    }
  })();

  // Safe fallbacks for data
  const errorLayout = rootData?.layout ?? { shop: { name: 'Care-atin' } } as any;
  const selectedLocale = rootData?.selectedLocale ?? DEFAULT_LOCALE;

  // During server rendering, we can't use Remix components safely
  // Check if we're on the client side
  const isClient = typeof document !== 'undefined';

  return (
    <html lang={selectedLocale.language.toLowerCase()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="/site.webmanifest" />
        <title>Error - {errorLayout?.shop?.name || 'Care-atin'}</title>
        
        {/* Only use Meta and Links on client-side where router context exists */}
        {isClient ? (
          <>
            <Meta />
            <Links />
          </>
        ) : (
          <>
            <link rel="stylesheet" href="/fonts/fonts.css" />
            <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
          </>
        )}
      </head>
      <body>
        <div className="flex flex-col min-h-screen">
          <header className="bg-white border-b border-gray-200">
            <div className="container mx-auto px-4 py-4">
              <h1 className="text-xl font-bold">{errorLayout?.shop?.name || 'Care-atin'}</h1>
            </div>
          </header>
          <main className="flex-grow container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                {errorStatus === 404 ? 'Page Not Found' : 'Something went wrong'}
              </h2>
              <p className="text-gray-700 mb-4">{errorMessage}</p>
              <a 
                href="/"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Back to Home
              </a>
            </div>
          </main>
          <footer className="bg-gray-100 border-t border-gray-200">
            <div className="container mx-auto px-4 py-4 text-center text-gray-600">
              &copy; {new Date().getFullYear()} {errorLayout?.shop?.name || 'Care-atin'}
            </div>
          </footer>
        </div>
        
        {/* Only use ScrollRestoration and Scripts on client-side */}
        {isClient ? (
          <>
            <ScrollRestoration nonce={nonce} />
            <Scripts nonce={nonce} />
          </>
        ) : null}
      </body>
    </html>
  );
}

// Simplified getLayoutData - now fetches menus too
async function getLayoutData({storefront, env}: AppLoadContext) {
  try {
    const data = await storefront.query(LAYOUT_QUERY, {
      variables: {
        headerMenuHandle: 'main-menu',
        footerMenuHandle: 'support',
        language: storefront.i18n.language,
      },
    });

    invariant(data, 'No data returned from layout query');

    const { shop, headerMenu, footerMenu } = data;
    return { shop, headerMenu, footerMenu }; // Return raw menu data from API
  } catch (initialError) {
    console.warn('[CARE-ATIN DEBUG] Failed to fetch from Shopify API. Initial error:', initialError);
    
    try {
      console.log('[CARE-ATIN DEBUG] Attempting to dynamically import mock data...');
      const { mockShop, mockMenu, mockFooterMenu } = await import('~/lib/mock/mock-data');
      console.log('[CARE-ATIN DEBUG] Successfully imported mock data.');
      
      if (!mockShop || !mockMenu || !mockFooterMenu) {
        console.error('[CARE-ATIN DEBUG] Mock data modules (shop, menu, or footerMenu) are undefined after import!');
        throw new Error('Mock data is incomplete after dynamic import. Cannot proceed with mock fallback.');
      }
      
      console.log('[CARE-ATIN DEBUG] Returning raw mock data as fallback. This will be processed by parseMenu in loadCriticalData.');
      // Return raw mock menu data; loadCriticalData will call parseMenu on these
      return {
        shop: mockShop,
        headerMenu: mockMenu, 
        footerMenu: mockFooterMenu,
      };
    } catch (importError) {
      console.error('[CARE-ATIN DEBUG] Failed to dynamically import mock data! Import error:', importError);
      throw new Error('Failed to load critical layout data: API fetch failed AND mock data import failed.');
    }
  }
}

// Use getSeoMeta
export const meta = ({data}: MetaArgs<typeof loader>) => {
  // Ensure data and seo payload exist
  if (!data?.seo) {
    return [
      { title: 'Care-atin' }, 
      { name: 'description', content: 'Fallback description' }
    ];
  }
  // Use getSeoMeta utility
  return getSeoMeta(data.seo);
};
