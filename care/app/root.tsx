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
import {Suspense, useState, useEffect} from 'react';
import invariant from 'tiny-invariant';
import type { SerializeFrom } from '@remix-run/server-runtime';

// Import from the correct shared path
import {HeaderFallback, Header} from '~/components/Shared/Header';
import {FooterFallback, Footer} from '~/components/Shared/Footer';

// Remove unused components if not needed for basic layout
// import {PageLayout} from '~/components/PageLayout';
import {GenericError} from './components/GenericError';
import {NotFound} from './components/NotFound';

// Import the new global components
import { StickyCtaBar } from '~/components/StickyCtaBar';
import { FloatingCartIcon } from '~/components/FloatingCartIcon';
// Note: QuizLauncher might be better placed within the Header or specific sections,
// but we'll add it globally for now as per US1.5. Adjust placement later if needed.
import { QuizLauncher } from '~/components/QuizLauncher';
import { ShopPayFix } from '~/components/Shop/ShopPayFix.client';

import favicon from '~/assets/favicon.svg';
import {seoPayload} from '~/lib/seo.server';

// Import the new global styles
import globalStyles from '~/styles/global.css?url';
// Keep app.css if it contains utility classes or specific styles you want to preserve
import appStyles from '~/styles/app.css?url';
import customStyles from '~/styles/custom.css?url';
import headerStylesUrl from '~/components/Shared/Header.css?url';
import footerStylesUrl from '~/components/Shared/Footer.css?url';
import heroStylesUrl from '~/components/HeroSection.css?url';
import deviceSpotlightStylesUrl from '~/components/DeviceSpotlight.css?url';
import problemSolutionStylesUrl from '~/components/ProblemSolution.css?url';
import howItWorksSnippetStylesUrl from '~/components/HowItWorksSnippet.css?url';

import {DEFAULT_LOCALE, parseMenu, getStoreDomainWithProtocol} from './lib/utils';
import type {EnhancedMenu} from './lib/utils';

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
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
    {rel: 'stylesheet', href: globalStyles},
    {rel: 'stylesheet', href: appStyles},
    {rel: 'stylesheet', href: customStyles},
    {rel: 'stylesheet', href: headerStylesUrl},
    {rel: 'stylesheet', href: footerStylesUrl},
    {rel: 'stylesheet', href: heroStylesUrl},
    {rel: 'stylesheet', href: deviceSpotlightStylesUrl},
    {rel: 'stylesheet', href: problemSolutionStylesUrl},
    {rel: 'stylesheet', href: howItWorksSnippetStylesUrl},
    // Consider adding font preloads here once fonts are finalized
    // Example:
    // {
    //   rel: 'preconnect',
    //   href: 'https://fonts.gstatic.com',
    //   crossOrigin: 'anonymous',
    // },
    // {
    //   rel: 'preconnect',
    //   href: 'https://fonts.googleapis.com',
    //   crossOrigin: 'anonymous',
    // },
    // {
    //   rel: 'stylesheet',
    //   href: 'https://fonts.googleapis.com/css2?family=Inter:wght@700&family=Manrope:wght@400;700&display=swap',
    // },
  ];
};

// Export a headers function to modify response headers
export function headers({loaderHeaders}: {loaderHeaders: Headers}) {
  // Create a new Headers object based on loader headers
  const headers = new Headers(loaderHeaders);

  // Define a base CSP with explicit font-src AND data: in default-src
  const baseCsp =
    "default-src 'self' data: blob: https://cdn.shopify.com https://shopify.com; " + // Added blob: here
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.shopify.com https://shopify.com https://www.google-analytics.com https://www.googletagmanager.com http://localhost:*; " + 
    "style-src 'self' 'unsafe-inline' https://cdn.shopify.com https://fonts.googleapis.com; " + 
    "img-src 'self' data: blob: https://cdn.shopify.com; " + // Added blob: to img-src
    "font-src 'self' data: https://cdn.shopify.com https://fonts.googleapis.com https://fonts.gstatic.com; " + 
    "connect-src 'self' blob: https://cdn.shopify.com http://localhost:* ws://localhost:*; " + // Added blob: to connect-src
    "frame-src 'self' https://cdn.shopify.com;";

  let csp = headers.get('Content-Security-Policy');

  if (csp) {
    // If a CSP already exists, ensure font-src and default-src allow 'data:' and 'blob:'
    
    // Ensure font-src allows 'data:'
    if (csp.includes('font-src')) {
      if (!csp.match(/font-src[^;]*data:/)) {
         csp = csp.replace(/font-src\s+([^;]+)/, "font-src $1 data:");
      }
      if (!csp.match(/font-src[^;]*fonts\.googleapis\.com/)) {
         csp = csp.replace(/font-src\s+([^;]+)/, "font-src $1 https://fonts.googleapis.com https://fonts.gstatic.com");
      }
    } else {
      csp = csp.trimRight();
      if (csp.slice(-1) !== ';') { csp += ';'; }
      csp += " font-src 'self' data: https://cdn.shopify.com https://fonts.googleapis.com https://fonts.gstatic.com;";
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

    // Ensure style-src includes fonts.googleapis.com
    if (csp.includes('style-src')) {
      if (!csp.match(/style-src[^;]*fonts\.googleapis\.com/)) {
        csp = csp.replace(/style-src\s+([^;]+)/, "style-src $1 https://fonts.googleapis.com");
      }
    } else {
      csp = csp.trimRight();
      if (csp.slice(-1) !== ';') { csp += ';'; }
      csp += " style-src 'self' 'unsafe-inline' https://cdn.shopify.com https://fonts.googleapis.com;";
    }

    // Ensure script-src has necessary sources
    if (csp.includes('script-src')) {
      // Add missing sources if needed
      const scriptSources = [
        "'unsafe-inline'", 
        "'unsafe-eval'", 
        "https://shopify.com", 
        "https://www.google-analytics.com", 
        "https://www.googletagmanager.com"
      ];
      
      // Check and add each source if missing
      for (const source of scriptSources) {
        if (!csp.match(new RegExp(`script-src[^;]*${source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`))) {
          csp = csp.replace(/script-src\s+([^;]+)/, `script-src $1 ${source}`);
        }
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
  
  // Fetch layout data (handles errors internally, returns default structure on failure)
  const layout = await getLayoutData(context);

  // Explicitly check for menus before parsing
  let headerMenu: EnhancedMenu | undefined = undefined;
  if (layout?.headerMenu) {
    try {
      // Only call parseMenu if layout.headerMenu is truthy
      headerMenu = parseMenu(layout.headerMenu, env.PUBLIC_STORE_DOMAIN, env) ?? undefined;
    } catch (e) {
      console.error('Error parsing header menu:', e);
      // Keep headerMenu as undefined
    }
  }

  let footerMenu: EnhancedMenu | undefined = undefined;
  if (layout?.footerMenu) {
    try {
      // Only call parseMenu if layout.footerMenu is truthy
      footerMenu = parseMenu(layout.footerMenu, env.PUBLIC_STORE_DOMAIN, env) ?? undefined;
    } catch (e) {
      console.error('Error parsing footer menu:', e);
      // Keep footerMenu as undefined
    }
  }

  // Ensure shop exists, providing a fallback if layout itself failed completely
  const shop = layout?.shop ?? { name: 'Care-atin Fallback', description: '' };

  // Use seoPayload if available, otherwise a basic fallback
  const seo = seoPayload.root({
      shop, // Use the potentially fallback shop
      url: request.url,
    }) || {
      title: shop?.name ?? 'Care-atin',
      description: shop?.description ?? 'Red Light Therapy for Hair Growth',
    };

  return {
    layout: {
      shop, // Pass shop data
      headerMenu, // Pass potentially undefined parsed menu
      footerMenu, // Pass potentially undefined parsed menu
    },
    seo,
    shop: getShopAnalytics({
      storefront,
      publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
    }),
    consent: {
      checkoutDomain: getStoreDomainWithProtocol(env.PUBLIC_STORE_DOMAIN),
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      withPrivacyBanner: true, // Or false, depending on requirements
    },
    selectedLocale: storefront.i18n,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  const {cart, customerAccount} = context;

  return {
    isLoggedIn: customerAccount.isLoggedIn(),
    cart: cart.get(),
  };
}

// Define props for Layout component
interface LayoutProps {
  children?: React.ReactNode;
  layout: SerializeFrom<typeof loader>['layout'];
  // Cart is now resolved and passed directly
  cart: Awaited<SerializeFrom<typeof loader>['cart']>;
}

// Layout receives the RESOLVED cart
function Layout({children, layout, cart}: LayoutProps) {
  const {headerMenu, footerMenu} = layout;
  // Access totalQuantity from the resolved cart object
  const cartCount = cart?.totalQuantity || 0;
  const nonce = useNonce(); 

  // US1.6: Tracking Integration Placeholder
  useEffect(() => {
    // --- PostHog Integration --- 
    // Option 1: Using posthog-js library (install required: npm install posthog-js)
    /*
    posthog.init('YOUR_POSTHOG_API_KEY', {
      api_host: 'https://app.posthog.com', // or your self-hosted instance
      // Enable session recording and heatmaps if needed (confirm requirements)
      // capture_pageview: true, // default
      // autocapture: true, // default
      // session_recording: {
      //   maskAllInputs: true,
      // },
      // loaded: (posthogInstance) => {
      //   // Enable feature flags if using them
      //   // posthogInstance.opt_in_capturing(); // if needed
      // }
    });
    */

    // Option 2: Injecting PostHog Snippet (use if not using the library directly)
    /*
    const posthogScript = document.createElement('script');
    posthogScript.text = `
      !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
      posthog.init('YOUR_POSTHOG_API_KEY', {api_host: 'https://app.posthog.com'});
    `;
    posthogScript.nonce = nonce; // Apply nonce for CSP if needed
    document.body.appendChild(posthogScript);
    */

    // --- Hotjar Integration --- 
    // Use script URL approach instead of inline script to avoid CSP issues
    if (typeof window !== 'undefined') {
      // Create a script element with nonce
      const hotjarScript = document.createElement('script');
      hotjarScript.src = "https://static.hotjar.com/c/hotjar-000000.js?sv=6"; // Replace 000000 with your actual Hotjar ID
      hotjarScript.async = true;
      hotjarScript.nonce = nonce; // Apply nonce properly
      
      // Append to head
      document.head.appendChild(hotjarScript);
    }

    // Cleanup function if needed
    return () => {
      // Nothing specific to clean up for Hotjar
    };
  }, [nonce]); // Re-run if nonce changes (should be stable)

  return (
    <>
      {/* Fix for Shop Pay URL issues */}
      <ShopPayFix />
      
      {/* Pass menu data to HeaderFallback if needed, or remove prop */}
      <Suspense fallback={<HeaderFallback /* header={headerMenu} - Removed for now */ />}>
        {/* Pass resolved cart to Header */}
        <Header header={headerMenu} cart={cart} />
        </Suspense>
      <main role="main" id="mainContent" className="flex-grow">
        {children}
      </main>
      {/* Pass menu data to FooterFallback if needed, or remove prop */}
      <Suspense fallback={<FooterFallback /* footer={footerMenu} - Removed for now */ />}>
        {/* Pass shop data if Footer requires it, check component definition */}
        <Footer footer={footerMenu} /* shop={layout.shop} - Removed for now */ />
        </Suspense>
      {/* Render Global UI Elements */}
      <StickyCtaBar />
      <FloatingCartIcon cartItemCount={cartCount} />
      <QuizLauncher />
    </>
  );
}

export default function App() {
  const data = useRouteLoaderData<typeof loader>('root');
  invariant(data, 'Root loader data is required');
  // Destructure directly from data, not data.layout
  const {analytics, layout, seo, cart, isLoggedIn, selectedLocale, consent} = data;

  const nonce = useNonce();
  // Ensure selectedLocale has a fallback if data retrieval fails partially
  const localeToUse = selectedLocale ?? DEFAULT_LOCALE;

  // Cart promise is still data.cart
  const cartPromise = cart; 
  const analyticsPromise = analytics;

  return (
    <html lang={localeToUse.language.toLowerCase()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {/* Pass resolved cart to Layout */}
        <Suspense fallback={<LayoutFallback layout={layout} />}>
          <Await resolve={cartPromise}>
            {(resolvedCart) => (
              // Ensure layout has fallback defaults if critical data failed
              <Layout layout={layout ?? { shop: { name: 'Fallback Shop'}, headerMenu: null, footerMenu: null }} cart={resolvedCart}>
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
                  cart={cartPromise} // Provider might expect the promise
                  shop={resolvedAnalytics.shop}
                  // Use consent directly from data, ensure it has fallback
                  consent={consent ?? { checkoutDomain: '', storefrontAccessToken: '', withPrivacyBanner: false }}
                  cookieDomain={resolvedAnalytics.analytics.domain}
                >
                  <Analytics.SubscribeToPageViews />
                </Analytics.Provider>
              ) : null
            )}
          </Await>
        </Suspense>
      </body>
    </html>
  );
}

// Updated LayoutFallback props based on usage in App
function LayoutFallback({ layout }: { layout?: SerializeFrom<typeof loader>['layout'] }) {
  return (
    <>
      {/* Removed props assuming they aren't needed */}
      <HeaderFallback />
      <main role="main" id="mainContent" className="flex-grow">
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      </main>
      <FooterFallback />
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const rootData = useRouteLoaderData<SerializeFrom<RootLoader>>('root');
  const nonce = useNonce();
  let errorMessage = 'Unknown error';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  // Provide default layout structure for error page
  const errorLayout = rootData?.layout ?? { shop: { name: 'Hydrogen Store Error' }, headerMenu: null, footerMenu: null };
  // Provide default locale for error page
  const errorLocale = rootData?.selectedLocale ?? DEFAULT_LOCALE;
  // Provide dummy resolved cart for error layout
  const errorCart = null; // Or a default cart structure if Layout requires it

  return (
    <html lang={errorLocale.language.toLowerCase()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {/* Pass dummy resolved cart to Layout in ErrorBoundary */}
        <Layout layout={errorLayout} cart={errorCart}>
          {errorStatus === 404 ? (
            <NotFound type="page" />
          ) : (
            <GenericError error={{ message: errorMessage }} />
          )}
        </Layout>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

// Simplified getLayoutData - now fetches menus too
async function getLayoutData({storefront, env}: AppLoadContext) {
  try {
  const data = await storefront.query(LAYOUT_QUERY, {
    variables: {
      headerMenuHandle: 'main-menu', // This handle is correct
      footerMenuHandle: 'support', // Use the 'support' handle for the footer menu
      language: storefront.i18n.language,
    },
    // TODO: Add caching strategy
    // cache: storefront.CacheLong(),
  });

  invariant(data, 'No data returned from layout query');

    // Optional: Check for GraphQL errors within the response if the API returns them gracefully
    // if (data.errors) {
    //   console.error('GraphQL Errors:', JSON.stringify(data.errors, null, 2));
    //   throw new Error('Error fetching layout data from Shopify.');
    // }

  // Process data, potentially add fallbacks if menus don't exist
    // Ensure the structure is what we expect before destructuring
    if (!data.shop || !data.headerMenu || !data.footerMenu) {
        console.warn('Layout data fetched but missing expected fields (shop, headerMenu, footerMenu). Data:', JSON.stringify(data, null, 2));
        // Decide how to handle this: throw, return defaults, etc.
        // Returning potentially partial data for now:
        return {
            shop: data.shop || { name: 'Care-atin Default', description: ''}, // Provide defaults
            headerMenu: data.headerMenu || null, // Allow null menus
            footerMenu: data.footerMenu || null
        };
    }

  const { shop, headerMenu, footerMenu } = data;

  // Return shop and raw menu data
  return { shop, headerMenu, footerMenu };

  } catch (error: any) {
    console.error(`Error fetching layout data from Shopify: ${error.message}`);
    // Re-throw the error to let the ErrorBoundary handle it, 
    // or return a default layout object if preferred.
    // throw error; // Option 1: Re-throw

    // Option 2: Return a safe default structure to allow the page to render minimally
    console.error('Returning default layout structure due to fetch error.');
    return {
      shop: { name: 'Care-atin Error Fallback', description: '' },
      headerMenu: null, // Default to null menus
      footerMenu: null
    };
  }
}

// Use getSeoMeta
export const meta = ({data}: MetaArgs<typeof loader>) => {
  // Ensure data and seo payload exist
  if (!data?.seo) {
    return [{ title: 'Care-atin' }, { description: 'Fallback description' }];
  }
  // Use getSeoMeta utility
  return getSeoMeta(data.seo);
};
