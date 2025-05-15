import {
  defer,
  type LinksFunction,
  type LoaderFunctionArgs,
  type MetaFunction,
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
} from '@shopify/hydrogen';
import { Suspense } from 'react';
import invariant from 'tiny-invariant';

// Import styles
import styles from './styles/app.css?url';

// Import components with fallbacks
import { Header, HeaderFallback } from '~/components/Shared/Header';
import { Footer, FooterFallback } from '~/components/Shared/Footer';

// Type definitions
export type RootLoader = typeof loader;

// Links with proper preconnects
export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://cdn.shopify.com' },
  { rel: 'preconnect', href: 'https://shop.app' },
  { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
  { rel: 'stylesheet', href: styles },
];

// Revalidation strategy
export const shouldRevalidate: ShouldRevalidateFunction = ({
  formMethod,
  currentUrl,
  nextUrl,
}) => {
  // revalidate when a mutation is performed e.g add to cart, login...
  if (formMethod && formMethod !== 'GET') return true;

  // revalidate when manually revalidating via useRevalidator
  if (currentUrl.toString() === nextUrl.toString()) return true;

  return false;
};

// Loader with proper error handling and defer
export async function loader({ request, context }: LoaderFunctionArgs) {
  try {
    // Import server-only modules inside the loader function
    const { getLayoutData } = await import('~/lib/layout.server');
    const { seoPayload } = await import('~/lib/seo.server');
    const { DEFAULT_LOCALE, parseMenu } = await import('~/lib/utils');
    
    // Start fetching non-critical data without blocking time to first byte
    const deferredData = loadDeferredData(context);

    // Await the critical data required to render initial state of the page
    const criticalData = await loadCriticalData({ 
      request, 
      context, 
      getLayoutData, 
      seoPayload, 
      DEFAULT_LOCALE, 
      parseMenu 
    });

    return defer({
      ...deferredData,
      ...criticalData,
    });
  } catch (error) {
    console.error('Loader error:', error);
    // Return fallback data if there's an error
    return defer({
      layout: {
        shop: { name: 'care•atin', description: 'Revolutionary hair wellness' },
        headerMenu: null,
        footerMenu: null,
      },
      seo: {
        title: 'care•atin',
        description: 'Revolutionary hair wellness technology',
      },
      analytics: null,
      consent: {
        checkoutDomain: context.env.PUBLIC_STORE_DOMAIN,
        storefrontAccessToken: context.env.PUBLIC_STOREFRONT_API_TOKEN,
        withPrivacyBanner: true,
      },
      selectedLocale: { language: 'EN', country: 'US' },
      cart: null,
      isLoggedIn: false,
    });
  }
}

/**
 * Load data necessary for rendering content above the fold
 */
async function loadCriticalData({ 
  request, 
  context, 
  getLayoutData, 
  seoPayload, 
  DEFAULT_LOCALE, 
  parseMenu 
}: LoaderFunctionArgs & { 
  getLayoutData: any; 
  seoPayload: any; 
  DEFAULT_LOCALE: any; 
  parseMenu: any; 
}) {
  const { storefront, env } = context;
  
  try {
    const layout = await getLayoutData(context).catch(() => ({
      shop: { name: 'care•atin', description: 'Revolutionary hair wellness' },
      headerMenu: null,
      footerMenu: null,
    }));

    const headerMenu = layout.headerMenu
      ? parseMenu(layout.headerMenu, env.PUBLIC_STORE_DOMAIN, env)
      : null; 

    const footerMenu = layout.footerMenu
      ? parseMenu(layout.footerMenu, env.PUBLIC_STORE_DOMAIN, env)
      : null;

    const shop = layout.shop || { name: 'care•atin', description: 'Revolutionary hair wellness' };

    const seo = seoPayload.root({
      shop,
      url: request.url,
    });

    return {
      layout: {
        shop,
        headerMenu,
        footerMenu,
      },
      seo,
      analytics: getShopAnalytics({
        storefront,
        publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
      }).catch(() => null),
      consent: {
        checkoutDomain: env.PUBLIC_STORE_DOMAIN,
        storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
        withPrivacyBanner: true,
      },
      selectedLocale: storefront?.i18n || DEFAULT_LOCALE,
    };
  } catch (error) {
    console.error('Critical data loading error:', error);
    // Return fallback data
    return {
      layout: {
        shop: { name: 'care•atin', description: 'Revolutionary hair wellness' },
        headerMenu: null,
        footerMenu: null,
      },
      seo: {
        title: 'care•atin',
        description: 'Revolutionary hair wellness technology',
      },
      analytics: null,
      consent: {
        checkoutDomain: env.PUBLIC_STORE_DOMAIN,
        storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
        withPrivacyBanner: true,
      },
      selectedLocale: DEFAULT_LOCALE,
    };
  }
}

/**
 * Load data for rendering content below the fold
 */
function loadDeferredData({ cart, customerAccount }: any) {
  const cartPromise = cart?.get?.() || Promise.resolve(null);
  const isLoggedInPromise = customerAccount?.isLoggedIn?.() || Promise.resolve(false);
  
  return {
    isLoggedIn: isLoggedInPromise,
    cart: cartPromise,
  };
}

// Layout component with proper error boundaries
export function Layout({ children }: { children?: React.ReactNode }) {
  const nonce = useNonce();
  const data = useRouteLoaderData<typeof loader>('root');

  return (
    <html lang={data?.selectedLocale?.language?.toLowerCase() || 'en'}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen flex flex-col">
        {children}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

// App component
export default function App() {
  const data = useRouteLoaderData<typeof loader>('root');

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">care•atin</h1>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const { layout } = data;

  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={<HeaderFallback />}>
        <Await resolve={data.cart} errorElement={<HeaderFallback />}>
          {(cart) => (
            <Header
              header={{
                shop: layout.shop,
                menu: layout.headerMenu,
              }}
              cart={cart}
              isLoggedIn={false}
            />
          )}
        </Await>
      </Suspense>
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer footer={layout.footerMenu} />
      
      {/* Analytics */}
      {data.analytics && (
        <Suspense>
          <Await resolve={data.analytics}>
            {(analytics) => (
              analytics && (
                <Analytics.Provider
                  cart={data.cart}
                  shop={analytics.shop}
                  consent={data.consent}
                >
                  <></>
                </Analytics.Provider>
              )
            )}
          </Await>
        </Suspense>
      )}
    </div>
  );
}

// Error boundary with proper error handling
export function ErrorBoundary() {
  const error = useRouteError();
  
  let errorMessage = 'Something went wrong';
  let errorStatus = 500;
  
  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorMessage = error.data?.message || error.statusText || errorMessage;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }
  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Error - care•atin</title>
        <Links />
      </head>
      <body className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            {errorStatus === 404 ? 'Page Not Found' : 'Server Error'}
          </h1>
          <p className="text-gray-700 mb-4">{errorMessage}</p>
          <a 
            href="/"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Return Home
          </a>
        </div>
        <Scripts />
      </body>
    </html>
  );
}

// Meta function using getSeoMeta
export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.seo) {
    return [
      { title: 'care•atin' },
      { name: 'description', content: 'Revolutionary hair wellness technology' },
    ];
  }
  return getSeoMeta(data.seo);
};
