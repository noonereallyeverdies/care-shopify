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
} from '@remix-run/react';
import {
  useNonce,
  Analytics,
  getShopAnalytics,
  getSeoMeta,
  type SeoConfig,
} from '@shopify/hydrogen';
import {Suspense} from 'react';
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

// Import the new global styles
import globalStyles from '~/styles/global.css?url';
// Keep app.css if it contains utility classes or specific styles you want to preserve
import appStyles from '~/styles/app.css?url';

import {DEFAULT_LOCALE, parseMenu} from './lib/utils';
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
    // Add the global styles link
    {rel: 'stylesheet', href: globalStyles},
    // Keep app styles if needed
    {rel: 'stylesheet', href: appStyles},
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
  try {
    // --- Temporary Simplification: Fetch only shop name --- 
    // const [layoutData] = await Promise.all([
    //   getLayoutData(context), // Fetches shop, headerMenu, footerMenu
    //   // Add other queries here, so that they are loaded in parallel
    // ]);
    //
    // if (!layoutData || !layoutData.shop /* || !layoutData.headerMenu || !layoutData.footerMenu */) {
    //   // Temporarily removed menu check
    //   throw new Error('Failed to load essential layout data (shop or menus).');
    // }
    const shop = { name: 'Care-atin (Temp)' }; // Static shop data
    // --- End Temporary Simplification ---

    // Use placeholder SEO for now, real SEO handled by specific routes
    const seo = {
      title: 'Care-atin | Red Light Therapy for Hair', // Placeholder Title
      description:
        'Discover clinically inspired Red Light Therapy for healthier, fuller hair. Science-backed care for radiant growth.', // Placeholder Description
    } as SeoConfig;

    // If seoPayload.root exists and works, prefer that, but use placeholders if needed
    // const seo = seoPayload.root({
    //   shop: layoutData.shop,
    //   url: request.url,
    // });

    const {storefront, env} = context;
    
    // Parse the menus
    // --- Temporary Simplification: Use static menus --- 
    // const headerMenu = layoutData.headerMenu ? parseMenu(layoutData.headerMenu, env.PUBLIC_STORE_DOMAIN, env) : undefined;
    // const footerMenu = layoutData.footerMenu ? parseMenu(layoutData.footerMenu, env.PUBLIC_STORE_DOMAIN, env) : undefined;
    const headerMenu = null; // Static null menu
    const footerMenu = null; // Static null menu
    // --- End Temporary Simplification ---

    return {
      layout: {
        shop: shop, // Use static shop data
        headerMenu,
        footerMenu,
      },
      seo,
      shop: getShopAnalytics({
        storefront,
        publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
      }),
      consent: {
        checkoutDomain: env.PUBLIC_CHECKOUT_DOMAIN,
        storefrontAccessToken: env.PUBLIC_STOREFRONT_API_TOKEN,
        withPrivacyBanner: true, // Or false, depending on requirements
      },
      selectedLocale: storefront.i18n,
    };
  } catch (error) {
    console.error('Error in loadCriticalData:', error);
    // Return a minimal data object with default values
    return {
      layout: null,
      seo: {
        title: 'Care-atin | Red Light Therapy for Hair', // Placeholder Title
        description:
          'Discover clinically inspired Red Light Therapy for healthier, fuller hair. Science-backed care for radiant growth.', // Placeholder Description
        url: request.url,
      } as SeoConfig,
      shop: null,
      consent: {
        checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
        storefrontAccessToken: context.env.PUBLIC_STOREFRONT_API_TOKEN,
        withPrivacyBanner: true,
      },
      selectedLocale: context.storefront.i18n,
    };
  }
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

export const meta = ({data}: MetaArgs<typeof loader>) => {
  return [
    {title: data?.seo?.title ?? 'Care-atin'},
    {description: data?.seo?.description ?? 'Red Light Therapy for Hair Growth'},
  ];
};

function Layout({children}: {children?: React.ReactNode}) {
  const nonce = useNonce();
  const data = useRouteLoaderData<typeof loader>('root');
  invariant(data, "Root loader data is missing"); // Add invariant check
  // Now locale should always be present if data exists
  const locale = data.selectedLocale ?? DEFAULT_LOCALE;
  const shopData = data?.shop;
  const cartData = data?.cart ?? null;
  const consentData = data?.consent;

  return (
    // Use locale directly
    <html lang={locale.language}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {/* --- Temporarily Removed Header --- */}
        {data.layout?.headerMenu && (
          <Suspense fallback={<HeaderFallback />}>
            <Header header={data.layout.headerMenu} />
          </Suspense>
        )}
        <main role="main" id="mainContent" className="flex-grow">
          {children}
        </main>
        {/* --- Temporarily Removed Footer --- */}
        {data.layout?.footerMenu && (
          <Suspense fallback={<FooterFallback />}>
            <Footer footer={data.layout.footerMenu} />
          </Suspense>
        )}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        {/* 
          --- Analytics Provider Temporarily Removed --- 
          {shopData && consentData ? (
            <Analytics.Provider
              cart={cartData} 
              shop={shopData}
              consent={consentData}
            >
              Analytics helpers go here
            </Analytics.Provider>
          ) : null}
        */}
      </body>
    </html>
  );
}

export default function App() {
  const data = useRouteLoaderData<typeof loader>('root');

  if (!data) {
    // Handle the case where data is null, perhaps render a minimal layout or error message
    // This might happen if loadCriticalData fails severely
    return (
      <Layout>
        <GenericError error={{ message: 'Failed to load essential data' }} />
      </Layout>
    );
  }

  // Keep existing layout logic if PageLayout was used, otherwise use Outlet directly
  // If PageLayout was used:
  // return (
  //   <PageLayout {...data.layout}>
  //     <Outlet />
  //   </PageLayout>
  // );

  // If using direct Outlet within Layout:
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const rootData = useRouteLoaderData<RootLoader>('root');
  const errorBoundaryLocale = rootData?.selectedLocale ?? DEFAULT_LOCALE;
  
  let title = 'Error';
  let pageType = 'page';
  let status = 500; // Default status

  if (isRouteErrorResponse(error)) {
    title = 'Not found';
    status = error.status;
    if (error.status === 404) pageType = error.data || pageType;
  }

  // Safely construct the message
  let errorMessage = `We found an error while loading this page.`;
  if (isRouteErrorResponse(error)) {
    errorMessage = `${status}: ${ typeof error.data === 'string' ? error.data : 'An unexpected error occurred.' }`;
  }
  else if (error instanceof Error) {
    errorMessage = error.message;
  }

  // Pass the constructed message and potential stack trace
  const errorForGeneric = error instanceof Error 
    ? { message: errorMessage, stack: error.stack } 
    : { message: errorMessage };

  return (
    <html lang={errorBoundaryLocale?.language ?? 'en'}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Suspense fallback={
          <div className="flex items-center justify-center w-full h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        }>
          {status === 404 ? (
            <NotFound type={pageType} />
          ) : (
            // Pass the safely constructed error object
            <GenericError error={errorForGeneric} />
          )}
        </Suspense>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// Simplified getLayoutData - now fetches menus too
async function getLayoutData({storefront, env}: AppLoadContext) {
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

  // Process data, potentially add fallbacks if menus don't exist
  const { shop, headerMenu, footerMenu } = data;

  // Return shop and raw menu data
  return { shop, headerMenu, footerMenu };
}
