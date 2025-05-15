/**
 * Shopify Configuration
 * 
 * This file contains default Shopify configuration values.
 * Environment-specific values should be set in .env files.
 */

export default {
  // Default configuration - can be overridden by environment variables
  storeDomain: process.env.PUBLIC_STORE_DOMAIN || '548e73-2.myshopify.com',
  storefrontToken: process.env.PUBLIC_STOREFRONT_API_TOKEN,
  storefrontApiVersion: process.env.PUBLIC_STOREFRONT_API_VERSION || '2025-01',
  storefrontId: process.env.PUBLIC_STOREFRONT_ID || undefined,
  
  // Internationalization
  i18n: {
    language: 'EN',
    country: 'US',
  },
  
  // Feature flags and experimental features
  future: {
    // Enable long cache with stale-while-revalidate
    unstable_enableCacheLongWithStaleWhileRevalidate: true,
    // Enable customer account API
    customerAccountApi: !!process.env.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID,
  },
  
  // Analytics configuration
  analytics: {
    googleAnalytics: {
      enabled: !!process.env.GA_MEASUREMENT_ID,
      measurementId: process.env.GA_MEASUREMENT_ID,
    },
    googleTagManager: {
      enabled: !!process.env.GTM_CONTAINER_ID,
      containerId: process.env.GTM_CONTAINER_ID,
    },
    clarity: {
      enabled: !!process.env.CLARITY_PROJECT_ID,
      projectId: process.env.CLARITY_PROJECT_ID,
    },
    facebookPixel: {
      enabled: !!process.env.FACEBOOK_PIXEL_ID,
      pixelId: process.env.FACEBOOK_PIXEL_ID,
    },
  },
  
  // Development settings
  development: {
    debugMode: process.env.DEBUG_MODE === 'true',
    performanceMonitoring: process.env.ENABLE_PERFORMANCE_MONITORING === 'true',
    hotReload: true,
  },
  
  // Production settings
  production: {
    debugMode: false,
    performanceMonitoring: process.env.ENABLE_PERFORMANCE_MONITORING !== 'false',
    caching: {
      enabled: true,
      ttl: 3600, // 1 hour
    },
  },
  
  // Error tracking
  errorTracking: {
    sentry: {
      enabled: !!process.env.SENTRY_DSN,
      dsn: process.env.SENTRY_DSN,
    },
  },
};