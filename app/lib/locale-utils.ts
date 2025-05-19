import type { LoaderFunctionArgs } from '@shopify/remix-oxygen';

/**
 * Validates if the locale parameter is valid for the current storefront
 * @param params - Route parameters containing locale
 * @param storefront - Storefront context with i18n information
 * @returns true if locale is valid, false otherwise
 */
export function validateLocale(
  params: { locale?: string },
  storefront: { i18n?: { language: string; country: string } }
): boolean {
  // If storefront or i18n is missing, we can't validate
  if (!storefront || !storefront.i18n) {
    console.warn('Cannot validate locale: storefront or i18n missing');
    return true; // Return true to avoid errors
  }

  const { language, country } = storefront.i18n;
  const expectedLocale = `${language}-${country}`.toLowerCase();
  
  // If no locale in params, we're using the default locale
  if (!params.locale) return true;
  
  return params.locale.toLowerCase() === expectedLocale;
}

/**
 * Standardized locale validation for route loaders
 * @param args - Loader function arguments
 * @throws Response with 404 status if locale is invalid
 */
export function validateLocaleParameter({ params, context }: LoaderFunctionArgs): void {
  // Check if we have the necessary objects
  if (!params || !context || !context.storefront) {
    console.warn('Cannot validate locale parameter: missing required context');
    return; // Return without throwing to avoid errors
  }

  if (!validateLocale(params, context.storefront)) {
    throw new Response(null, { status: 404 });
  }
}