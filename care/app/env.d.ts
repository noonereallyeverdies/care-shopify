/// <reference types="@shopify/remix-oxygen" />
/// <reference types="@shopify/oxygen-workers-types" />

// Enhance TypeScript's built-in typings.
import '@total-typescript/ts-reset';

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

declare global {
  const ENV: Env;
  interface Window {
    ENV: Env;
  }
}

export {};
