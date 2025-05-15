/// <reference types="vite/client" />
/// <reference types="@shopify/remix-oxygen" />
/// <reference types="@shopify/oxygen-workers-types" />

import type {
  WithCache,
  HydrogenCart,
  HydrogenSessionData,
} from '@shopify/hydrogen';
import type {Storefront, CustomerAccount} from '~/lib/type';
import type {AppSession} from '~/lib/session.server';

declare global {
  /**
   * A global `process` object is only available during build to access NODE_ENV.
   */
  const process: {env: {NODE_ENV: 'production' | 'development'}};

  /**
   * Declare expected Env parameter in fetch handler.
   * This interface defines all environment variables used in the application.
   */
  interface Env {
    // Shopify Configuration (Required)
    SESSION_SECRET: string;
    PUBLIC_STOREFRONT_API_TOKEN: string;
    PUBLIC_STORE_DOMAIN: string;
    PUBLIC_STOREFRONT_API_VERSION?: string;
    PUBLIC_STOREFRONT_ID?: string;
    
    // Optional Shopify Configuration
    PRIVATE_STOREFRONT_API_TOKEN?: string;
    PUBLIC_CHECKOUT_DOMAIN?: string;
    
    // Customer Account API (Optional)
    PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID?: string;
    PUBLIC_CUSTOMER_ACCOUNT_API_URL?: string;
    SHOP_ID?: string;
    
    // Analytics (Optional)
    GA_MEASUREMENT_ID?: string;
    GTM_CONTAINER_ID?: string;
    CLARITY_PROJECT_ID?: string;
    FACEBOOK_PIXEL_ID?: string;
    
    // Application Configuration
    NODE_ENV?: 'development' | 'production' | 'staging';
    DEBUG_MODE?: string;
    ENABLE_PERFORMANCE_MONITORING?: string;
    ENABLE_AB_TESTING?: string;
    
    // Error Tracking (Optional)
    SENTRY_DSN?: string;
  }
}

declare module '@shopify/remix-oxygen' {
  /**
   * Declare local additions to the Remix loader context.
   */
  export interface AppLoadContext {
    waitUntil: ExecutionContext['waitUntil'];
    session: AppSession;
    storefront: Storefront;
    customerAccount: CustomerAccount;
    cart: HydrogenCart;
    env: Env;
  }

  /**
   * Declare local additions to the Remix session data.
   */
  interface SessionData extends HydrogenSessionData {}
}

// Needed to make this file a module.
export {};
