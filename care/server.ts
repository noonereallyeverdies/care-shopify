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

import {AppSession} from '~/lib/session.server';
import {getLocaleFromRequest, getStoreDomainWithProtocol} from '~/lib/utils';

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
      /**
       * Open a cache instance in the worker and a custom session instance.
       */
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
        storeDomain: getStoreDomainWithProtocol(env.PUBLIC_STORE_DOMAIN),
        storefrontId: env.PUBLIC_STOREFRONT_ID,
        storefrontHeaders: getStorefrontHeaders(request),
      });

      /**
       * Create a client for Customer Account API.
       */
      // Get actual host and protocol from request
      const url = new URL(request.url);
      const host = url.host;
      const protocol = url.protocol;
      
      const customerAccount = createCustomerAccountClient({
        waitUntil,
        request,
        session,
        customerAccountId: env.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID,
        shopId: env.SHOP_ID,
        // For authUrl, use a standard format
        authUrl: '/account/authorize',
        // Preserve custom settings in a compatible way
        customAuthStatusHandler: () => {
          // Default redirect behavior with a custom path
          return new Response(null, {
            status: 302,
            headers: {
              Location: `/account/login?return_to=${encodeURIComponent(url.pathname + url.search)}`,
            },
          });
        },
      });

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
          request,
        }),
      });

      const response = await handleRequest(request);

      if (session.isPending) {
        response.headers.set('Set-Cookie', await session.commit());
      }

      if (response.status === 404) {
        /**
         * Check for redirects only when there's a 404 from the app.
         * If the redirect doesn't exist, then `storefrontRedirect`
         * will pass through the 404 response.
         */
        return storefrontRedirect({request, response, storefront});
      }

      // Update Content-Security-Policy to include font-src directive
      const existingCspHeader = response.headers.get('Content-Security-Policy') || '';
      if (existingCspHeader) {
        // If there's an existing CSP header, append the font-src directive
        if (existingCspHeader.includes('font-src')) {
          // If font-src already exists, add necessary domains to it
          const updatedCsp = existingCspHeader
            .replace(/(font-src\s[^;]*)/,
             '$1 data: https://fonts.googleapis.com https://fonts.gstatic.com');
          response.headers.set('Content-Security-Policy', updatedCsp);
        } else {
          // If font-src doesn't exist, add it as a new directive
          response.headers.set('Content-Security-Policy', `${existingCspHeader}; font-src data: 'self' https://fonts.googleapis.com https://fonts.gstatic.com`);
        }
        
        // Add style-src if needed
        if (!existingCspHeader.includes('style-src')) {
          response.headers.set('Content-Security-Policy', 
            response.headers.get('Content-Security-Policy') + 
            "; style-src 'self' 'unsafe-inline' https://cdn.shopify.com https://fonts.googleapis.com");
        } else if (!existingCspHeader.includes('fonts.googleapis.com')) {
          // Add fonts.googleapis.com to existing style-src
          const updatedStyleCsp = response.headers.get('Content-Security-Policy')
            ?.replace(/(style-src\s[^;]*)/,
            '$1 https://fonts.googleapis.com');
          response.headers.set('Content-Security-Policy', updatedStyleCsp || '');
        }
      } else {
        // If no CSP exists, create a minimal one that allows Google Fonts
        response.headers.set('Content-Security-Policy', 
          "default-src 'self' https://cdn.shopify.com https://shopify.com http://localhost:*; " +
          "font-src data: 'self' https://fonts.googleapis.com https://fonts.gstatic.com; " +
          "style-src 'self' 'unsafe-inline' https://cdn.shopify.com https://fonts.googleapis.com; " +
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.shopify.com https://shopify.com https://www.google-analytics.com https://www.googletagmanager.com http://localhost:*");
      }
      
      // Make sure script-src has unsafe-inline
      if (existingCspHeader && existingCspHeader.includes('script-src') && !existingCspHeader.includes("script-src 'unsafe-inline'")) {
        const updatedScriptCsp = response.headers.get('Content-Security-Policy')
          ?.replace(/(script-src\s[^;]*)/,
          "$1 'unsafe-inline' 'unsafe-eval' https://shopify.com https://www.google-analytics.com https://www.googletagmanager.com");
        response.headers.set('Content-Security-Policy', updatedScriptCsp || '');
      }

      return response;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return new Response('An unexpected error occurred', {status: 500});
    }
  },
};
