import { Outlet } from '@remix-run/react';
import { json, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { validateLocaleParameter } from '~/lib/locale-utils';

export async function loader({ params, context }: LoaderFunctionArgs) {
  // Try to validate locale, but continue even if it fails
  if (typeof validateLocaleParameter === 'function' && context && context.storefront) {
    try {
      validateLocaleParameter({ params, context });
    } catch (error) {
      console.error('Error validating locale parameter:', error);
      // Continue execution instead of failing
    }
  }

  // Default locale information if storefront isn't available
  const defaultLocale = {
    language: 'EN',
    country: 'US'
  };

  // Add any data needed by all routes here
  return json({
    locale: context?.storefront?.i18n || defaultLocale,
  });
}

export default function Layout() {
  return (
    <Outlet />
  );
}
