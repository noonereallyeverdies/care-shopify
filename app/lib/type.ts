export type I18nLocale = {
  language: string;
  country: string;
  label: string;
  currency: string;
  pathPrefix?: string;
};

export type Env = {
  PUBLIC_STORE_DOMAIN: string;
  PUBLIC_STOREFRONT_API_TOKEN: string;
  PUBLIC_STOREFRONT_API_VERSION?: string;
  PUBLIC_STOREFRONT_ID?: string;
  PUBLIC_CHECKOUT_DOMAIN?: string;
  [key: string]: any;
};
