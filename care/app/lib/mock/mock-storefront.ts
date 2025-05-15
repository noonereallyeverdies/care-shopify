import type { I18nLocale } from '@shopify/hydrogen';
import { mockShop, mockMenu, mockFooterMenu } from './mock-data';

// Mock storefront methods
const mockStorefront = {
  query: async (query: string, options?: any) => {
    // Check if this is the Layout query
    if (query.includes('Layout')) {
      return {
        shop: mockShop,
        headerMenu: mockMenu,
        footerMenu: mockFooterMenu,
      };
    }
    
    // Default response for other queries
    throw new Error(`Mock data not available for query: ${query}`);
  },
  
  // Add i18n property to match the expected structure
  i18n: {
    language: 'EN',
    country: 'US',
    pathPrefix: '',
  } as I18nLocale,
};

export function createMockStorefrontClient() {
  return { storefront: mockStorefront };
}
