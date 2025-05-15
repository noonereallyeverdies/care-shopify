#!/bin/bash

echo "🔧 Context7-Enhanced Fix Script for care•atin Shopify Project"
echo "🚀 Implementing best practices from Shopify Hydrogen documentation"
echo ""

# Step 1: Fix TypeScript Configuration
echo "📝 Step 1: Fixing TypeScript Configuration"
cat > tsconfig.json << 'EOF'
{
  "include": [
    "**/*.ts",
    "**/*.tsx", 
    "**/.server/**/*.ts",
    "**/.server/**/*.tsx",
    "**/.client/**/*.ts",
    "**/.client/**/*.tsx"
  ],
  "compilerOptions": {
    "lib": ["DOM", "DOM.Iterable", "ES6"],
    "isolatedModules": true,
    "esModuleInterop": true,
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "target": "ES2022",
    "strict": true,
    "allowJs": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "~/*": ["./app/*"]
    },
    "noEmit": true,
    "types": [
      "@shopify/oxygen-workers-types",
      "@remix-run/server-runtime",
      "vite/client"
    ]
  }
}
EOF

# Step 2: Update Vite Configuration with Remix Future Flags
echo "⚡ Step 2: Updating Vite Configuration"
cat > vite.config.ts << 'EOF'
import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {oxygen} from '@shopify/mini-oxygen/vite';
import {vitePlugin as remix} from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';

// Declare module for v3_singleFetch support
declare module "@remix-run/server-runtime" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    oxygen(),
    remix({
      presets: [hydrogen.preset()],
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_lazyRouteDiscovery: true,
        v3_singleFetch: true,
      },
    }),
    hydrogen(),
    tsconfigPaths(),
  ],
  build: {
    // Assure compatibility for build
    assetsInclude: ['**/*.css', '**/*.scss'],
  },
  ssr: {
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@shopify/hydrogen',
      ],
    },
  },
});
EOF

# Step 3: Create proper remix.env.d.ts
echo "🔧 Step 3: Creating TypeScript Environment Definitions"
cat > app/remix.env.d.ts << 'EOF'
/// <reference types="@shopify/remix-oxygen" />
/// <reference types="@shopify/oxygen-workers-types" />

// Enhance TypeScript's built-in typings.
import '@total-typescript/ts-reset';

import type {
  Storefront,
  CustomerAccount,
  HydrogenCart,
  HydrogenSessionData,
} from '@shopify/hydrogen';
import type {AppSession} from '~/lib/session.server';

declare global {
  /**
   * A global `process` object is only available during build to access NODE_ENV.
   */
  const process: {env: {NODE_ENV: 'production' | 'development'}};

  /**
   * Declare expected Env parameter in fetch handler.
   */
  interface Env {
    SESSION_SECRET: string;
    PUBLIC_STOREFRONT_API_TOKEN: string;
    PRIVATE_STOREFRONT_API_TOKEN?: string;
    PUBLIC_STORE_DOMAIN: string;
    PUBLIC_STOREFRONT_ID?: string;
    PUBLIC_STOREFRONT_API_VERSION?: string;
    PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID?: string;
    PUBLIC_CUSTOMER_ACCOUNT_API_URL?: string;
    SHOP_ID?: string;
    NODE_ENV?: string;
  }
}

declare module '@shopify/remix-oxygen' {
  /**
   * Declare local additions to the Remix loader context.
   */
  export interface AppLoadContext {
    env: Env;
    cart: HydrogenCart;
    storefront: Storefront;
    customerAccount: CustomerAccount | null;
    session: AppSession;
    waitUntil: ExecutionContext['waitUntil'];
  }

  export interface SessionData extends HydrogenSessionData {}
}
EOF

# Step 4: Update package.json with correct dependencies
echo "📦 Step 4: Adding Required Dependencies"
# Add missing dependencies for v3_routeConfig support
npm install --save-dev @remix-run/fs-routes@^2.16.1 @remix-run/route-config@^2.16.1

# Update Remix versions
npm install --save @remix-run/react@^2.16.1 @remix-run/server-runtime@^2.16.1
npm install --save-dev @remix-run/dev@^2.16.1 @remix-run/eslint-config@^2.16.1

# Step 5: Create Production-Ready Root Component with Proper Error Handling
echo "🏗️ Step 5: Creating Production-Ready Root Component"
cat > app/root.tsx << 'EOF'
import {
  defer,
  type LinksFunction,
  type LoaderFunctionArgs,
  type MetaArgs,
} from '@shopify/remix-oxygen';
import {
  isRouteErrorResponse,
  Links,
  LiveReload,
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

// Import layout utilities
import { getLayoutData } from '~/lib/layout.server';
import { seoPayload } from '~/lib/seo.server';
import { DEFAULT_LOCALE, parseMenu } from '~/lib/utils';

// Import components with proper fallbacks
import { Header, HeaderFallback } from '~/components/Shared/Header';
import { Footer, FooterFallback } from '~/components/Shared/Footer';

// CSS imports
import criticalStyles from '~/styles/critical.css?url';
import bundleStyles from '~/styles/bundle.css?url';

// Type definitions
export type RootLoader = typeof loader;

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

// Links with proper preconnects
export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://cdn.shopify.com' },
  { rel: 'preconnect', href: 'https://shop.app' },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
  { rel: 'stylesheet', href: '/fonts/fonts.css' },
  { rel: 'stylesheet', href: criticalStyles },
  { rel: 'stylesheet', href: bundleStyles },
];

// Loader with proper error handling and defer
export async function loader({ request, context }: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(context);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData({ request, context });

  return defer({
    ...deferredData,
    ...criticalData,
  });
}

/**
 * Load data necessary for rendering content above the fold
 */
async function loadCriticalData({ request, context }: LoaderFunctionArgs) {
  const { storefront, env } = context;
  
  const [layout] = await Promise.all([
    getLayoutData(context),
  ]);

  invariant(layout, 'Layout data is required');

  const headerMenu = layout.headerMenu
    ? parseMenu(layout.headerMenu, env.PUBLIC_STORE_DOMAIN, env)
    : undefined; 

  const footerMenu = layout.footerMenu
    ? parseMenu(layout.footerMenu, env.PUBLIC_STORE_DOMAIN, env)
    : undefined;

  const shop = layout.shop;

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
    }),
    consent: {
      checkoutDomain: env.PUBLIC_STORE_DOMAIN,
      storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      withPrivacyBanner: true,
    },
    selectedLocale: storefront.i18n,
  };
}

/**
 * Load data for rendering content below the fold
 */
function loadDeferredData({ cart, customerAccount }: { cart: any; customerAccount: any }) {
  return {
    isLoggedIn: customerAccount?.isLoggedIn() || Promise.resolve(false),
    cart: cart.get(),
  };
}

// Layout component with proper error boundaries
export function Layout({ children }: { children?: React.ReactNode }) {
  const nonce = useNonce();
  const data = useRouteLoaderData<typeof loader>('root');

  // Safe fallback if data isn't available
  if (!data) {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <HeaderFallback />
          <main className="flex-grow">
            {children}
          </main>
          <FooterFallback />
          <ScrollRestoration nonce={nonce} />
          <Scripts nonce={nonce} />
          <LiveReload nonce={nonce} />
        </body>
      </html>
    );
  }

  const { layout, selectedLocale } = data;

  return (
    <html lang={selectedLocale.language.toLowerCase()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex flex-col min-h-screen">
          <Suspense fallback={<HeaderFallback />}>
            <Await resolve={Promise.resolve(data.cart)} errorElement={<HeaderFallback />}>
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
          
          <main role="main" id="mainContent" className="flex-grow">
            {children}
          </main>
          
          <Suspense fallback={<FooterFallback />}>
            <Footer footer={layout.footerMenu} />
          </Suspense>
        </div>
        
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        <LiveReload nonce={nonce} />
        
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
      </body>
    </html>
  );
}

// App component
export default function App() {
  return <Outlet />;
}

// Error boundary with proper SSR handling
export function ErrorBoundary() {
  const nonce = useNonce();
  
  // Safely get error info
  let error: unknown;
  let errorMessage = 'Something went wrong';
  let errorStatus = 500;
  
  try {
    error = useRouteError();
    
    if (isRouteErrorResponse(error)) {
      errorStatus = error.status;
      errorMessage = error.data?.message || error.statusText || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
  } catch (hookError) {
    // If hooks fail, use defaults
    console.warn('Error boundary hooks failed:', hookError);
  }
  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Error - care•atin</title>
        <Links />
      </head>
      <body>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
            {/* Show stack trace in development */}
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
        <Scripts nonce={nonce} />
        <LiveReload nonce={nonce} />
      </body>
    </html>
  );
}

// Meta function using getSeoMeta
export const meta = ({ data }: MetaArgs<typeof loader>) => {
  if (!data?.seo) {
    return [
      { title: 'care•atin' },
      { name: 'description', content: 'Revolutionary hair wellness technology' },
    ];
  }
  return getSeoMeta(data.seo);
};
EOF

# Step 6: Create entry.server.tsx with proper nonce handling
echo "🔧 Step 6: Creating entry.server.tsx"
cat > app/entry.server.tsx << 'EOF'
import type {AppLoadContext, EntryContext} from '@shopify/remix-oxygen';
import {RemixServer} from '@remix-run/react';
import {createContentSecurityPolicy} from '@shopify/hydrogen';
import {renderToReadableStream} from 'react-dom/server';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  context: AppLoadContext,
) {
  const {nonce, header, NonceProvider} = createContentSecurityPolicy();

  const body = await renderToReadableStream(
    <NonceProvider>
      <RemixServer 
        context={remixContext} 
        url={request.url}
        nonce={nonce}
      />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error: unknown) {
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (responseStatusCode !== 200) {
    responseHeaders.set('Cache-Control', 'no-cache');
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
EOF

# Step 7: Update server.ts with proper context
echo "⚙️ Step 7: Updating server.ts"
cat > server.ts << 'EOF'
// @ts-ignore
// Virtual entry point for the app
import * as remixBuild from 'virtual:remix/server-build';
import {
  createRequestHandler,
  getStorefrontHeaders,
} from '@shopify/remix-oxygen';
import {
  cartGetIdDefault,
  cartSetIdDefault,
  createCartHandler,
  createStorefrontClient,
  storefrontRedirect,
  createCustomerAccountClient,
} from '@shopify/hydrogen';

import { AppSession } from '~/lib/session.server';
import { getLocaleFromRequest } from '~/lib/utils';
import { createEnvironmentConfig, isDevelopment } from '~/lib/env.server';

/**
 * Export a fetch handler in module format.
 */
export default {
  async fetch(
    request: Request,
    env: Env,
    executionContext: ExecutionContext,
  ): Promise<Response> {
    try {
      // Validate environment configuration
      const config = createEnvironmentConfig(env);
      
      if (!env?.SESSION_SECRET) {
        throw new Error('SESSION_SECRET environment variable is not set');
      }

      const waitUntil = executionContext.waitUntil.bind(executionContext);
      const [cache, session] = await Promise.all([
        caches.open('hydrogen'),
        AppSession.init(request, [env.SESSION_SECRET]),
      ]);

      /**
       * Create Hydrogen's Storefront client.
       */
      const {storefront} = createStorefrontClient({
        cache,
        waitUntil,
        i18n: getLocaleFromRequest(request),
        publicStorefrontToken: env.PUBLIC_STOREFRONT_API_TOKEN,
        privateStorefrontToken: env.PRIVATE_STOREFRONT_API_TOKEN,
        storeDomain: env.PUBLIC_STORE_DOMAIN,
        storefrontId: env.PUBLIC_STOREFRONT_ID,
        storefrontApiVersion: env.PUBLIC_STOREFRONT_API_VERSION || '2025-01',
        storefrontHeaders: getStorefrontHeaders(request),
      });

      // Debug logging in development
      if (isDevelopment(env)) {
        console.log('🔐 Storefront config:', {
          domain: env.PUBLIC_STORE_DOMAIN,
          tokenExists: !!env.PUBLIC_STOREFRONT_API_TOKEN,
          apiVersion: env.PUBLIC_STOREFRONT_API_VERSION,
        });
      }

      /**
       * Create a client for Customer Account API.
       */
      const customerAccount = env.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID
        ? createCustomerAccountClient({
            request,
            session,
            waitUntil,
            customerAccountId: env.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID,
            shopId: env.SHOP_ID,
          })
        : null;

      const cart = createCartHandler({
        storefront,
        customerAccount,
        getCartId: cartGetIdDefault(request.headers),
        setCartId: cartSetIdDefault(),
      });

      /**
       * Create a Remix request handler and pass
       * Hydrogen's Storefront client to the loader context.
       */
      const handleRequest = createRequestHandler({
        build: remixBuild,
        mode: process.env.NODE_ENV,
        getLoadContext: () => ({
          session,
          waitUntil,
          storefront,
          customerAccount,
          cart,
          env,
        }),
      });

      const response = await handleRequest(request);

      if (session.isPending) {
        response.headers.set('Set-Cookie', await session.commit());
      }

      if (response.status === 404) {
        return storefrontRedirect({request, response, storefront});
      }

      return response;
    } catch (error) {
      console.error(error);
      return new Response('An unexpected error occurred', {status: 500});
    }
  },
};
EOF

# Step 8: Test the build
echo "🏗️ Step 8: Testing Build with Enhanced Configuration"
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCCESS! Context7-Enhanced fixes applied successfully!"
    echo ""
    echo "🎯 Key improvements implemented:"
    echo "✓ Fixed TypeScript configuration with correct types"
    echo "✓ Enabled all Remix future flags for v3 compatibility" 
    echo "✓ Added proper error boundaries with SSR support"
    echo "✓ Implemented async data loading with defer"
    echo "✓ Added LiveReload for development"
    echo "✓ Proper CSP and nonce handling"
    echo "✓ Production-ready server configuration"
    echo ""
    echo "🚀 Your care•atin project is now million-dollar ready!"
    echo ""
    echo "📝 Next steps:"
    echo "1. Start development: npm run dev"
    echo "2. Visit http://localhost:3000"
    echo "3. Add your environment variables"
    echo "4. Deploy with confidence!"
else
    echo ""
    echo "❌ Build still has issues. Let's diagnose:"
    echo "🔍 Check the specific error above"
    echo "💡 Most common issues:"
    echo "1. Missing environment variables"
    echo "2. Component import errors"
    echo "3. Circular dependencies"
    echo ""
    echo "🔧 Run 'npm run typecheck' for more details"
fi
