// Environment configuration utilities

export interface EnvironmentConfig {
  shopify: {
    storeDomain: string;
    storefrontToken: string;
    privateStorefrontToken?: string;
    storefrontApiVersion: string;
    storefrontId?: string;
  };
  customerAccounts?: {
    clientId: string;
    shopId: string;
  };
  session: {
    secret: string;
  };
}

export function createEnvironmentConfig(env: any): EnvironmentConfig {
  // Validate required environment variables
  const requiredVars = {
    PUBLIC_STORE_DOMAIN: env.PUBLIC_STORE_DOMAIN,
    PUBLIC_STOREFRONT_API_TOKEN: env.PUBLIC_STOREFRONT_API_TOKEN,
    SESSION_SECRET: env.SESSION_SECRET,
  };

  // Check for missing required variables
  const missingVars = Object.entries(requiredVars)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  const config: EnvironmentConfig = {
    shopify: {
      storeDomain: env.PUBLIC_STORE_DOMAIN,
      storefrontToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      privateStorefrontToken: env.PRIVATE_STOREFRONT_API_TOKEN,
      storefrontApiVersion: env.PUBLIC_STOREFRONT_API_VERSION || '2025-01',
      storefrontId: env.PUBLIC_STOREFRONT_ID,
    },
    session: {
      secret: env.SESSION_SECRET,
    },
  };

  // Add customer accounts config if available
  if (env.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID && env.SHOP_ID) {
    config.customerAccounts = {
      clientId: env.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID,
      shopId: env.SHOP_ID,
    };
  }

  return config;
}

export function isDevelopment(env: any): boolean {
  return env.NODE_ENV === 'development' || process.env.NODE_ENV === 'development';
}

export function isProduction(env: any): boolean {
  return env.NODE_ENV === 'production' || process.env.NODE_ENV === 'production';
}

export function getEnvironmentInfo(env: any) {
  return {
    environment: isDevelopment(env) ? 'development' : 'production',
    nodeEnv: env.NODE_ENV || process.env.NODE_ENV,
    hasCustomerAccounts: !!(env.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID && env.SHOP_ID),
    hasPrivateStorefront: !!env.PRIVATE_STOREFRONT_API_TOKEN,
  };
}