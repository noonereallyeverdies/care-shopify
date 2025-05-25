import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from '@shopify/remix-oxygen';

// Redirect to the default locale cart
export async function loader({ context }: LoaderFunctionArgs) {
  // Get the default locale from context
  const defaultLocale = 'en-us'; // Match the URL structure being used
  return redirect(`/${defaultLocale}/cart`);
}

// We don't need to re-export the action since this is just a redirect route
