import {createHydrogenContext} from '@shopify/hydrogen';
import {AppSession} from '~/lib/session';
import {CART_QUERY_FRAGMENT} from '~/lib/fragments';
import {getLocaleFromRequest} from '~/lib/utils';

/**
 * The context implementation is separate from server.ts
 * so that type can be extracted for AppLoadContext
 * */
export async function createAppLoadContext(
  request: Request,
  env: Env,
  executionContext: ExecutionContext,
) {
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

  const i18n = getLocaleFromRequest(request);
  console.log(`- i18n:`, i18n);

  const hydrogenContext = createHydrogenContext({
    env,
    request,
    cache,
    waitUntil,
    session,
    i18n,
    cart: {
      queryFragment: CART_QUERY_FRAGMENT,
    },
  });

  // Verify storefront is included in the context
  if (!hydrogenContext.storefront || typeof hydrogenContext.storefront.query !== 'function') {
    console.error('[SERVER] CRITICAL ERROR: storefront is not properly initialized in the loader context');
    console.error('[SERVER] Context keys available:', Object.keys(hydrogenContext));
    throw new Error('Storefront client not properly initialized in context');
  }

  return {
    ...hydrogenContext,
    // declare additional Remix loader context
    env,
    request,
  };
}
