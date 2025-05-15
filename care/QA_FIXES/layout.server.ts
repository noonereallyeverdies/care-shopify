import { AppLoadContext } from '@shopify/remix-oxygen';
import invariant from 'tiny-invariant';

// Define the layout query as a constant
const LAYOUT_QUERY = `#graphql
  fragment MenuItem on MenuItem {
    id
    resourceId
    tags
    title
    type
    url
  }
  fragment ChildMenuItem on MenuItem {
    ...MenuItem
  }
  fragment ParentMenuItem on MenuItem {
    ...MenuItem
    items {
      ...ChildMenuItem
    }
  }
  query Layout(
    $language: LanguageCode
    $headerMenuHandle: String!
    $footerMenuHandle: String!
  ) @inContext(language: $language) {
    shop {
      id
      name
      description
      brand {
        logo {
          image {
            url
          }
        }
      }
    }
    headerMenu: menu(handle: $headerMenuHandle) {
      id
      items {
        ...ParentMenuItem
      }
    }
    footerMenu: menu(handle: $footerMenuHandle) {
      id
      items {
        ...ParentMenuItem
      }
    }
  }
`;

// Types for the layout data
export interface LayoutData {
  shop: {
    id: string;
    name: string;
    description?: string;
    brand?: {
      logo?: {
        image?: {
          url: string;
        };
      };
    };
  };
  headerMenu?: any;
  footerMenu?: any;
}

/**
 * Fetch layout data (shop info, menus) from Shopify Storefront API
 * Returns clean, typed data or throws with a helpful error message
 */
export async function getLayoutData(context: AppLoadContext): Promise<LayoutData> {
  const { storefront } = context;
  
  try {
    const data = await storefront.query(LAYOUT_QUERY, {
      variables: {
        headerMenuHandle: 'main-menu',
        footerMenuHandle: 'footer',
        language: storefront.i18n.language,
      },
      cache: storefront.CacheLong(), // Cache for 1 hour
    });

    invariant(data, 'No layout data returned from Shopify');
    invariant(data.shop, 'Shop data is missing from layout query');

    return {
      shop: data.shop,
      headerMenu: data.headerMenu,
      footerMenu: data.footerMenu,
    };
    
  } catch (error) {
    console.error('Failed to fetch layout data:', error);
    
    // In development, you might want to return mock data
    // In production, we should throw to trigger error boundaries
    if (process.env.NODE_ENV === 'development') {
      console.warn('Using fallback layout data in development');
      return {
        shop: {
          id: 'mock-shop-id',
          name: 'care•atin',
          description: 'Revolutionary hair wellness technology',
        },
        headerMenu: {
          id: 'mock-header-menu',
          items: [
            { id: '1', title: 'Home', url: '/', type: 'HTTP' },
            { id: '2', title: 'Shop', url: '/products', type: 'HTTP' },
            { id: '3', title: 'About', url: '/pages/our-story', type: 'HTTP' },
          ],
        },
        footerMenu: {
          id: 'mock-footer-menu',
          items: [
            { id: '1', title: 'Support', url: '/pages/support', type: 'HTTP' },
            { id: '2', title: 'Privacy', url: '/policies/privacy-policy', type: 'HTTP' },
          ],
        },
      };
    }
    
    throw new Error(`Failed to load layout data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}