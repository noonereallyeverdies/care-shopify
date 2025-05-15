import { 
  type LinksFunction,
  type LoaderFunctionArgs,
  type MetaArgs,
} from '@shopify/remix-oxygen';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
  useRouteError,
  isRouteErrorResponse,
  type ShouldRevalidateFunction,
} from '@remix-run/react';
import {
  useNonce,
  Analytics,
  getShopAnalytics,
  getSeoMeta,
} from '@shopify/hydrogen';
import { Suspense } from 'react';
import invariant from 'tiny-invariant';

// Simplified imports - only what we need
import { Header } from '~/components/Shared/Header';
import { Footer } from '~/components/Shared/Footer';
import { LayoutProvider } from '~/components/LayoutProvider';
import { ErrorBoundary as CustomErrorBoundary } from '~/components/ErrorBoundary';

// CSS imports
import criticalStyles from '~/styles/critical.css?url';
import bundleStyles from '~/styles/bundle.css?url';

// Utilities
import { DEFAULT_LOCALE, parseMenu } from './lib/utils';
import { seoPayload } from '~/lib/seo.server';
import { getLayoutData } from '~/lib/layout.server';

// Types
export type RootLoader = typeof loader;

// Revalidation strategy
export const shouldRevalidate: ShouldRevalidateFunction = ({
  formMethod,
  currentUrl,
  nextUrl,
}) => {
  if (formMethod && formMethod !== 'GET') return true;
  if (currentUrl.toString() === nextUrl.toString()) return true;
  return false;
};

// Links function - simplified and secure
export const links: LinksFunction = () => [
  // Preconnect to external resources
  { rel: 'preconnect', href: 'https://cdn.shopify.com' },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  
  // Favicon
  { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
  
  // Fonts
  { rel: 'stylesheet', href: '/fonts/fonts.css' },
  
  // Critical CSS
  { rel: 'stylesheet', href: criticalStyles },
  
  // Main styles - with proper loading strategy
  { 
    rel: 'stylesheet', 
    href: bundleStyles,
    media: 'print',
    onLoad: "this.media='all'",
  },
  
  // Preload non-critical styles
  { rel: 'preload', href: bundleStyles, as: 'style' },
];

// Secure headers function
export function headers() {
  const headers = new Headers();
  
  // Secure CSP - NO unsafe-inline or unsafe-eval
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'nonce-{nonce}' https://cdn.shopify.com",
    "style-src 'self' 'nonce-{nonce}' https://fonts.googleapis.com",
    "img-src 'self' data: https://cdn.shopify.com",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://cdn.shopify.com",
    "frame-src 'self' https://cdn.shopify.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');
  
  headers.set('Content-Security-Policy', csp);
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-XSS-Protection', '1; mode=block');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  return headers;
}

// Simplified loader
export async function loader(args: LoaderFunctionArgs) {
  const { request, context } = args;
  
  try {
    // Get layout data
    const layout = await getLayoutData(context);
    
    // Parse menus
    const headerMenu = layout.headerMenu 
      ? parseMenu(layout.headerMenu, context.env.PUBLIC_STORE_DOMAIN, context.env)
      : undefined;
      
    const footerMenu = layout.footerMenu
      ? parseMenu(layout.footerMenu, context.env.PUBLIC_STORE_DOMAIN, context.env)
      : undefined;
    
    // Create clean data structure
    return {
      layout: {
        shop: layout.shop,
        headerMenu,
        footerMenu,
      },
      seo: seoPayload.root({
        shop: layout.shop,
        url: request.url,
      }),
      analytics: getShopAnalytics({
        storefront: context.storefront,
        publicStorefrontId: context.env.PUBLIC_STOREFRONT_ID,
      }),
      consent: {
        checkoutDomain: context.env.PUBLIC_STORE_DOMAIN,
        storefrontAccessToken: context.env.PUBLIC_STOREFRONT_API_TOKEN,
        withPrivacyBanner: true,
      },
      selectedLocale: context.storefront.i18n,
    };
  } catch (error) {
    console.error('Root loader error:', error);
    throw new Response('Failed to load page data', { status: 500 });
  }
}

// Clean layout component
function Layout({ children, data }: { children: React.ReactNode; data: any }) {
  const { layout } = data;
  
  return (
    <LayoutProvider data={data}>
      <Header header={layout.headerMenu} />
      <main role="main" id="mainContent" className="flex-grow">
        {children}
      </main>
      <Footer footer={layout.footerMenu} />
    </LayoutProvider>
  );
}

// Main App component - simplified
export default function App() {
  const data = useRouteLoaderData<typeof loader>('root');
  invariant(data, 'Root loader data is required');
  
  const nonce = useNonce();
  const { selectedLocale, analytics } = data;
  
  return (
    <html lang={selectedLocale.language.toLowerCase()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <CustomErrorBoundary>
          <Layout data={data}>
            <Outlet />
          </Layout>
        </CustomErrorBoundary>
        
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        
        {/* Analytics - simplified */}
        {analytics && (
          <Analytics.Provider
            cart={Promise.resolve(null)}
            shop={analytics.shop}
            consent={data.consent}
          >
            <></>
          </Analytics.Provider>
        )}
      </body>
    </html>
  );
}

// Clean error boundary - FIXED to handle SSR safely
export function ErrorBoundary() {
  // Check if we're in a client context where router hooks work
  let error: unknown;
  let errorMessage = 'Something went wrong';
  let errorStatus = 500;
  let nonce = '';
  
  // Try to get error details safely
  try {
    error = useRouteError();
    nonce = useNonce();
    
    if (isRouteErrorResponse(error)) {
      errorStatus = error.status;
      errorMessage = error.data?.message || error.statusText || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
  } catch (hookError) {
    // If hooks fail (SSR context), use default values
    console.warn('Error boundary hooks failed, using defaults:', hookError);
  }
  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Error - care•atin</title>
        {/* Try to include Links, but handle potential failures */}
        {(() => {
          try {
            return <Links />;
          } catch {
            return (
              <>
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <link rel="stylesheet" href="/fonts/fonts.css" />
              </>
            );
          }
        })()}
      </head>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              {errorStatus === 404 ? 'Page Not Found' : 'Server Error'}
            </h1>
            <p className="text-gray-700 mb-4">{errorMessage}</p>
            <a 
              href="/"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block"
            >
              Return Home
            </a>
            {/* Show error details in development */}
            {process.env.NODE_ENV === 'development' && error instanceof Error && (
              <details className="mt-4">
                <summary className="cursor-pointer text-sm text-gray-600">
                  Error Details (Development)
                </summary>
                <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
        {/* Try to include Scripts, but handle potential failures */}
        {(() => {
          try {
            return <Scripts nonce={nonce} />;
          } catch {
            return null;
          }
        })()}
      </body>
    </html>
  );
}

// SEO meta function
export const meta = ({ data }: MetaArgs<typeof loader>) => {
  if (!data?.seo) {
    return [
      { title: 'care•atin' },
      { name: 'description', content: 'Revolutionary hair wellness technology' },
    ];
  }
  return getSeoMeta(data.seo);
};
