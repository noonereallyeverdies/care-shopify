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
  type LanguageCode,
  type CountryCode,
} from '@shopify/hydrogen';

import { AppSession } from '~/lib/session.server';

function getLocaleFromRequest(request: Request): {language: LanguageCode; country: CountryCode} {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/').filter(Boolean);
  
  // Default locale
  let language: LanguageCode = 'EN';
  let country: CountryCode = 'US';
  
  // Check for locale in path
  if (pathParts[0] && pathParts[0].match(/^[a-z]{2}-[a-z]{2}$/i)) {
    const [lang, ctry] = pathParts[0].toUpperCase().split('-');
    language = lang as LanguageCode;
    country = ctry as CountryCode;
  }
  
  return { language, country };
}

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
        customerAccount: customerAccount || undefined,
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
