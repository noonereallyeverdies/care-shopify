import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {redirect} from '@shopify/remix-oxygen';

/**
 * This is the main entry point for your app.
 * It redirects to the default locale route.
 */
export async function loader({context}: LoaderFunctionArgs) {
  try {
    if (context && context.storefront && context.storefront.i18n) {
      const {language, country} = context.storefront.i18n;
      
      // Redirect to the appropriate localized route
      return redirect(`/${language}-${country.toLowerCase()}`);
    } else {
      // Fallback to a default locale path if storefront i18n info isn't available
      console.warn('Storefront i18n information not available, using default locale');
      return redirect('/en-us');
    }
  } catch (error) {
    console.error('Error in root loader:', error);
    // Default fallback
    return redirect('/en-us');
  }
}

export default function Index() {
  // This component won't render - we always redirect
  return null;
}
