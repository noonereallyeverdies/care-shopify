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
import {getLocaleFromRequest} from '~/lib/utils';

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
      console.log('[SERVER] Request received:', request.url);
      
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

      // Log all environment variables for debugging (masking sensitive values)
      console.log('[SERVER] Environment variables debug:', {
        PUBLIC_STORE_DOMAIN: env.PUBLIC_STORE_DOMAIN,
        PUBLIC_STOREFRONT_ID: env.PUBLIC_STOREFRONT_ID,
        PUBLIC_STOREFRONT_API_TOKEN: env.PUBLIC_STOREFRONT_API_TOKEN ? '***' : undefined,
        PRIVATE_STOREFRONT_API_TOKEN: env.PRIVATE_STOREFRONT_API_TOKEN ? '***' : undefined,
        PUBLIC_CHECKOUT_DOMAIN: env.PUBLIC_CHECKOUT_DOMAIN,
        SESSION_SECRET: env.SESSION_SECRET ? '***' : undefined,
      });

      /**
       * Create Hydrogen's Storefront client with explicit validation.
       */
      if (!env.PUBLIC_STORE_DOMAIN) {
        throw new Error('Missing required environment variable: PUBLIC_STORE_DOMAIN');
      }
      if (!env.PUBLIC_STOREFRONT_API_TOKEN) {
        throw new Error('Missing required environment variable: PUBLIC_STOREFRONT_API_TOKEN');
      }
      if (!env.PRIVATE_STOREFRONT_API_TOKEN) {
        console.warn('[SERVER] Missing PRIVATE_STOREFRONT_API_TOKEN - some functionality may be limited');
      }
      if (!env.PUBLIC_STOREFRONT_ID) {
        throw new Error('Missing required environment variable: PUBLIC_STOREFRONT_ID');
      }
      
      console.log('[SERVER] Creating storefront client with:');
      console.log(`- storeDomain: https://${env.PUBLIC_STORE_DOMAIN}`);
      console.log(`- storefrontId: ${env.PUBLIC_STOREFRONT_ID}`);
      
      // Create the storefront client with explicit configuration
      const i18n = getLocaleFromRequest(request);
      console.log(`- i18n:`, i18n);
      
      const storefrontClient = createStorefrontClient({
        cache,
        waitUntil,
        i18n,
        publicStorefrontToken: env.PUBLIC_STOREFRONT_API_TOKEN,
        privateStorefrontToken: env.PRIVATE_STOREFRONT_API_TOKEN,
        storeDomain: `https://${env.PUBLIC_STORE_DOMAIN}`,
        storefrontId: env.PUBLIC_STOREFRONT_ID,
        storefrontHeaders: getStorefrontHeaders(request),
      });
      
      // Validate the storefront client
      if (!storefrontClient || !storefrontClient.storefront) {
        throw new Error('Failed to create a valid storefront client');
      }
      
      console.log('[SERVER] Storefront client created successfully');
      
      // Extract the storefront from the client
      const {storefront} = storefrontClient;

      /**
       * Create a client for Customer Account API.
       */
      // Get actual host and protocol from request
      const url = new URL(request.url);
      const host = url.host;
      const protocol = url.protocol;
      
      // Make sure the customerAccountId is provided
      if (!env.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID) {
        console.warn('[SERVER] Missing PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID');
      }
      
      const customerAccount = createCustomerAccountClient({
        waitUntil,
        request,
        session,
        customerAccountId: env.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID,
        shopId: env.SHOP_ID,
        customerAccountUrl: env.PUBLIC_CUSTOMER_ACCOUNT_API_URL,
        // Set the redirect URI based on the current host
        redirectUriScheme: protocol.replace(':', ''),
        redirectUriHost: host,
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
      const getLoadContext = () => {
        const context = {
          session,
          waitUntil,
          storefront,
          customerAccount,
          cart,
          env,
          request,
        };
        
        // Verify storefront is included in the context
        if (!context.storefront || typeof context.storefront.query !== 'function') {
          console.error('[SERVER] CRITICAL ERROR: storefront is not properly initialized in the loader context');
          console.error('[SERVER] Context keys available:', Object.keys(context));
          throw new Error('Storefront client not properly initialized in context');
        }
        
        return context;
      };
      
      const handleRequest = createRequestHandler({
        build: remixBuild,
        mode: process.env.NODE_ENV,
        getLoadContext,
      });

      console.log('[SERVER] Handling request with Remix...');
      const response = await handleRequest(request);
      console.log('[SERVER] Response status:', response.status);

      if (session.isPending) {
        response.headers.set('Set-Cookie', await session.commit());
      }

      if (response.status === 404) {
        /**
         * Check for redirects only when there's a 404 from the app.
         * If the redirect doesn't exist, then `storefrontRedirect`
         * will pass through the 404 response.
         */
        console.log('[SERVER] 404 response, checking for redirects...');
        return storefrontRedirect({request, response, storefront});
      }

      return response;
    } catch (error) {
      console.error('[SERVER] Uncaught error:', error);
      
      // Provide specific error page for Shopify configuration issues
      if (error instanceof Error && 
          (error.message.includes('Missing required') || 
           error.message.includes('storefront') || 
           error.message.includes('Shopify') ||
           error.message.includes('context'))) {
        return new Response(
          `<!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Shopify Configuration Error</title>
            <style>
              body { font-family: system-ui, sans-serif; padding: 2rem; line-height: 1.5; }
              .error-box { max-width: 800px; margin: 0 auto; padding: 2rem; border: 1px solid #e0e0e0; border-radius: 8px; }
              h1 { color: #D82C0D; }
              pre { background: #f5f5f5; padding: 1rem; overflow-x: auto; border-radius: 4px; }
              .tip { background: #EAF5FE; padding: 1rem; border-left: 4px solid #428BCA; margin: 1rem 0; }
            </style>
          </head>
          <body>
            <div class="error-box">
              <h1>Shopify Storefront Configuration Error</h1>
              <p>Your application couldn't connect to the Shopify storefront. Please check your environment variables.</p>
              
              <h2>Error Details</h2>
              <pre>${error.message}</pre>
              
              <div class="tip">
                <strong>Tip:</strong> Check that your .env file has the correct values for:
                <ul>
                  <li>PUBLIC_STORE_DOMAIN</li>
                  <li>PUBLIC_STOREFRONT_API_TOKEN</li>
                  <li>PRIVATE_STOREFRONT_API_TOKEN</li>
                  <li>PUBLIC_STOREFRONT_ID</li>
                </ul>
                <p>After updating the .env file, restart your development server.</p>
              </div>
            </div>
          </body>
          </html>`,
          {
            status: 500,
            headers: { 'Content-Type': 'text/html' },
          }
        );
      }
      
      // Return JSON for other unexpected errors
      const errorPayload = JSON.stringify({
        error: 'An unexpected server error occurred.',
        details: error instanceof Error ? error.message : String(error)
      });
      return new Response(errorPayload, {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
};
