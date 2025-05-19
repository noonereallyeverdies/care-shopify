import { validateLocaleParameter } from "~/lib/locale-utils";
import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';

import {CACHE_LONG} from '~/data/cache';
import {countries} from '~/data/countries';

export async function loader(args: LoaderFunctionArgs) {
  try {
    // Safely handle validateLocaleParameter
    if (typeof validateLocaleParameter === 'function') {
      validateLocaleParameter(args);
    }
    
    return json(
      {
        ...countries,
      },
      {
        headers: {
          'cache-control': CACHE_LONG,
        },
      },
    );
  } catch (error) {
    console.error('Error in countries route:', error);
    return json(
      {
        error: 'Failed to load countries data',
        countries: countries, // Return data anyway
      },
      {
        status: 500,
        headers: {
          'cache-control': 'no-cache',
        },
      }
    );
  }
}

// no-op
export default function CountriesApiRoute() {
  return null;
}
