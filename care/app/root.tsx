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
  AnalyticsPageType,
} from '@shopify/hydrogen';
import React, {Suspense} from 'react';
import invariant from 'tiny-invariant';
import type { SerializeFrom } from '@remix-run/server-runtime';
import { Partytown } from '@builder.io/partytown/react';

// Import from the correct shared path
import {HeaderFallback, Header} from '~/components/Shared/Header';
import {FooterFallback, Footer} from '~/components/Shared/Footer';

import {GenericError} from './components/GenericError';
import {NotFound} from './components/NotFound';

import favicon from '~/assets/favicon.svg';
import {seoPayload} from '~/lib/seo.server';

// Import the styles
import globalStyles from '~/styles/global.css?url';
import appStyles from '~/styles/app.css?url';
import customStyles from '~/styles/custom.css?url';
import headerStylesUrl from '~/components/Shared/Header.css?url';
import footerStylesUrl from '~/components/Shared/Footer.css?url';
import deviceSpotlightStylesUrl from '~/components/sections-active-landingpage/DeviceSpotlight.css?url';
import problemSolutionStylesUrl from '~/components/sections-active-landingpage/ProblemSolution.css?url';
import howItWorksSnippetStylesUrl from '~/components/sections-active-landingpage/HowItWorksSnippet.css?url';

import {DEFAULT_LOCALE, parseMenu} from './lib/utils';
import type {EnhancedMenu} from './lib/utils';

export type RootLoader = typeof loader;

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
    {rel: 'stylesheet', href: deviceSpotlightStylesUrl},
    {rel: 'stylesheet', href: problemSolutionStylesUrl},
    {rel: 'stylesheet', href: howItWorksSnippetStylesUrl},
  ];
};

// Export a headers function to modify response headers
export function headers({loaderHeaders}: {loaderHeaders: Headers}) {
  // Create a new Headers object based on loader headers
  const headers = new Headers(loaderHeaders);

  // Define a base CSP with explicit font-src AND data: in default-src
  const baseCsp =
    "default-src 'self' data: blob: https://cdn.shopify.com https://shopify.com; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.shopify.com http://localhost:*; " + 
    "style-src 'self' 'unsafe-inline' https://cdn.shopify.com; " + 
    "img-src 'self' data: blob: https://cdn.shopify.com; " +
    "font-src 'self' data: https://cdn.shopify.com; " + 
    "connect-src 'self' blob: https://cdn.shopify.com http://localhost:* ws://localhost:*; " +
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
      csp += " font-src 'self' data: https://cdn.shopify.com;";
    }

    // Ensure default-src allows 'data:' and 'blob:'
    if (csp.includes('default-src')) {
      if (!csp.match(/default-src[^;]*data:/)) {
        csp = csp.replace(/default-src\s+([^;]+)/, "default-src $1 data:");
      }
      if (!csp.match(/default-src[^;]*blob:/)) {
        csp = csp.replace(/default-src\s+([^;]+)/, "default-src $1 blob:");
      }
    }

    // Ensure img-src includes 'blob:'
    if (csp.includes('img-src')) {
      if (!csp.match(/img-src[^;]*blob:/)) {
        csp = csp.replace(/img-src\s+([^;]+)/, "img-src $1 blob:");
      }
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

  headers.set('Content-Security-Policy', csp);
  headers.set('X-Frame-Options', 'SAMEORIGIN');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return headers;
}

// DIAGNOSTIC FLAG - set to true to use minimal loader, false for full functionality
const USE_DIAGNOSTIC_LOADER = true;

export async function loader(args: LoaderFunctionArgs) {
  try {
    console.log('[ROOT LOADER] Starting loader execution');
    
    if (USE_DIAGNOSTIC_LOADER) {
      // TEMPORARY DIAGNOSTIC: Return minimal hardcoded data
      console.log('[ROOT LOADER] Using diagnostic mode with hardcoded data');
      const {storefront, env} = args.context;
      
      return defer({
        layout: {
          shop: { name: 'Care-atin', description: 'Red Light Therapy for Hair Growth' },
          headerMenu: undefined,
          footerMenu: undefined,
          selectedLocale: storefront.i18n,
        },
        seo: { title: 'Care-atin', description: 'Red Light Therapy for Hair Growth' },
        isLoggedIn: false,
        cart: Promise.resolve(null),
        analytics: {
          shop: getShopAnalytics({
            storefront,
            publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
          }),
        },
        consent: {
          checkoutDomain: env.PUBLIC_STORE_DOMAIN,
          storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
          withPrivacyBanner: false,
        },
        env,
        selectedLocale: storefront.i18n,
      });
    }

    // FULL LOADER: Normal operation
    console.log('[ROOT LOADER] Using full loader with real data fetching');
    
    // Start fetching non-critical data without blocking time to first byte
    const deferredData = loadDeferredData(args);

    // Await the critical data required to render initial state of the page
    const criticalData = await loadCriticalData(args);

    return defer({
      ...deferredData,
      ...criticalData,
    });

  } catch (error) {
    console.error('[ROOT LOADER] Error in root loader:', error);
    
    // Return a safe fallback response instead of throwing
    const {storefront, env} = args.context;
    return defer({
      layout: {
        shop: { name: 'Care-atin', description: 'Red Light Therapy for Hair Growth' },
        headerMenu: undefined,
        footerMenu: undefined,
        selectedLocale: storefront.i18n,
      },
      seo: { title: 'Care-atin', description: 'Red Light Therapy for Hair Growth' },
      isLoggedIn: false,
      cart: Promise.resolve(null),
      analytics: {
        shop: getShopAnalytics({
          storefront,
          publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
        }),
      },
      consent: {
        checkoutDomain: env.PUBLIC_STORE_DOMAIN,
        storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
        withPrivacyBanner: false,
      },
      env,
      selectedLocale: storefront.i18n,
    });
  }
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({request, context}: LoaderFunctionArgs) {
  console.log('[ROOT LOADER] Loading critical data...');
  const {storefront, env} = context;
  
  try {
    const [layout] = await Promise.all([
      getLayoutData(context),
    ]);

    console.log('[ROOT LOADER] Layout data fetched successfully');
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
        selectedLocale: storefront.i18n,
      },
      seo,
      analytics: {
        shop: getShopAnalytics({
          storefront,
          publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
        }),
      },
      consent: {
        checkoutDomain: env.PUBLIC_STORE_DOMAIN,
        storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
        withPrivacyBanner: true,
      },
      env,
      selectedLocale: storefront.i18n,
    };
  } catch (error) {
    console.error('[ROOT LOADER] Error in loadCriticalData:', error);
    throw error; // Re-throw to trigger the catch in main loader
  }
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  console.log('[ROOT LOADER] Loading deferred data...');
  const {cart, customerAccount} = context;

  return {
    isLoggedIn: customerAccount.isLoggedIn(),
    cart: cart.get(),
  };
}

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

// Simplified getLayoutData - now fetches menus too
async function getLayoutData({storefront, env}: AppLoadContext) {
  console.log('[ROOT LOADER] Fetching layout data from Shopify...');
  try {
    const data = await storefront.query(LAYOUT_QUERY, {
      variables: {
        headerMenuHandle: 'main-menu',
        footerMenuHandle: 'support',
        language: storefront.i18n.language,
      },
    });

    console.log('[ROOT LOADER] Shopify query completed successfully');
    invariant(data, 'No data returned from layout query');

    // Process data, potentially add fallbacks if menus don't exist
    const { shop, headerMenu, footerMenu } = data;

    // Return shop and raw menu data
    return { shop, headerMenu, footerMenu };
  } catch (error) {
    console.error('[ROOT LOADER] Error fetching layout data from Shopify:', error);
    // Enhanced error logging
    if (error && typeof error === 'object') {
      if ('response' in error) {
        console.error('[ROOT LOADER] Shopify API response status:', (error as any).response?.status);
      }
      if ('networkError' in error) {
        console.error('[ROOT LOADER] Network error:', (error as any).networkError);
      }
      if ('graphQLErrors' in error) {
        console.error('[ROOT LOADER] GraphQL errors:', (error as any).graphQLErrors);
      }
    }
    // Re-throw the error to be caught by the parent try-catch
    throw error;
  }
}

// Define props for Layout component
interface LayoutProps {
  children?: React.ReactNode;
  layout: SerializeFrom<typeof loader>['layout'];
  cart?: SerializeFrom<typeof loader>['cart'];
}

// Modify Layout to accept props instead of using the hook
function Layout({children, layout, cart}: LayoutProps) {
  const nonce = useNonce(); 
  const headerMenu = layout?.headerMenu;
  const footerMenu = layout?.footerMenu;
  
  return (
    <>
      {headerMenu && (
        <Suspense fallback={<HeaderFallback />}>
          <Header
            header={headerMenu}
            shop={layout?.shop}
            cart={cart}
            isLoggedIn={false}
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
}

// interface for Document props
interface DocumentProps {
  children: React.ReactNode;
  nonce: string;
  env: Record<string, string>;
}

// Make sure the Document component definition is correct
function Document({children, nonce, env}: DocumentProps) {
  // Safely access GTM_CONTAINER_ID
  const GTM_CONTAINER_ID = env ? env.PUBLIC_GTM_CONTAINER_ID : undefined;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        {GTM_CONTAINER_ID && (
          <Partytown debug={env.NODE_ENV === 'development'} forward={['dataLayer.push']} />
        )}
        {GTM_CONTAINER_ID && (
          <script
            type="text/partytown"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');`,
            }}
          />
        )}
      </head>
      <body>
        {GTM_CONTAINER_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
              height="0"
              width="0"
              style={{display: 'none', visibility: 'hidden'}}
            ></iframe>
          </noscript>
        )}
        {children}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

// Restoring the App component's original structure with env prop
export default function App() {
  const nonce = useNonce();
  const data = useRouteLoaderData<RootLoader>('root'); 
  
  // Safe data handling
  if (!data) {
    console.error('[APP] No data received from root loader');
    return (
      <Document nonce={nonce} env={{}}>
        <div>Loading...</div>
      </Document>
    );
  }
  
  // Destructure env directly, as it's now returned by the loader
  const {layout, cart: cartPromise, analytics, consent, env} = data;
  const selectedLocale = layout?.selectedLocale ?? DEFAULT_LOCALE;

  return (
    <Document nonce={nonce} env={env}>
      <Suspense fallback={<LayoutFallback layout={layout} />}>
        <Await resolve={cartPromise} errorElement={<div>Error loading cart</div>}>
          {(cart) => (
            <Analytics.Provider cart={cartPromise} shop={analytics?.shop} consent={consent}>
              <Layout layout={layout} cart={cart}>
                <Outlet />
              </Layout>
            </Analytics.Provider>
          )}
        </Await>
      </Suspense>
    </Document>
  );
}

function LayoutFallback({ layout }: { layout: SerializeFrom<typeof loader>['layout'] }) {
  return (
    <>
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

  console.error('[ERROR BOUNDARY] Error caught:', error);

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  const errorLayout = rootData?.layout ?? { 
    shop: { name: 'Care-atin' },
    selectedLocale: { language: 'en', country: 'US' }
  } as any;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Layout layout={errorLayout}>
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

// Use getSeoMeta
export const meta = ({data}: MetaArgs<typeof loader>) => {
  // Ensure data and seo payload exist
  if (!data?.seo) {
    return [{ title: 'Care-atin' }, { description: 'Red Light Therapy for Hair Growth' }];
  }
  // Use getSeoMeta utility
  return getSeoMeta(data.seo);
};
