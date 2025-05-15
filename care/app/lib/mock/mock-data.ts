// Mock data for development when Shopify API is not available
export const mockShop = {
  id: 'mock-shop-id',
  name: 'Care-atin',
  description: 'Advanced Hair Care Technology',
  primaryDomain: {
    url: 'https://care-atin.myshopify.com',
  },
  brand: {
    logo: {
      image: null,
    },
  },
};

export const mockMenu = {
  id: 'mock-menu-id',
  items: [
    {
      id: 'home',
      title: 'Home',
      url: 'https://care-atin.myshopify.com/',
      type: 'URL',
      resourceId: null,
      tags: [],
      items: [],
    },
    {
      id: 'products',
      title: 'Products',
      url: 'https://care-atin.myshopify.com/products',
      type: 'COLLECTION',
      resourceId: 'products-collection',
      tags: [],
      items: [],
    },
    {
      id: 'science',
      title: 'Science',
      url: 'https://care-atin.myshopify.com/pages/science',
      type: 'PAGE',
      resourceId: 'science-page',
      tags: [],
      items: [],
    },
    {
      id: 'results',
      title: 'Results',
      url: 'https://care-atin.myshopify.com/pages/results',
      type: 'PAGE',
      resourceId: 'results-page',
      tags: [],
      items: [],
    },
    {
      id: 'reviews',
      title: 'Reviews',
      url: 'https://care-atin.myshopify.com/pages/reviews',
      type: 'PAGE',
      resourceId: 'reviews-page',
      tags: [],
      items: [],
    },
    {
      id: 'faq',
      title: 'FAQ',
      url: 'https://care-atin.myshopify.com/pages/faq',
      type: 'PAGE',
      resourceId: 'faq-page',
      tags: [],
      items: [],
    },
  ],
};

export const mockFooterMenu = {
  id: 'mock-footer-menu-id',
  items: [
    {
      id: 'support',
      title: 'Support',
      url: 'https://care-atin.myshopify.com/pages/support',
      type: 'PAGE',
      resourceId: 'support-page',
      tags: [],
      items: [],
    },
    {
      id: 'contact',
      title: 'Contact',
      url: 'https://care-atin.myshopify.com/pages/contact',
      type: 'PAGE',
      resourceId: 'contact-page',
      tags: [],
      items: [],
    },
    {
      id: 'shipping',
      title: 'Shipping',
      url: 'https://care-atin.myshopify.com/pages/shipping',
      type: 'PAGE',
      resourceId: 'shipping-page',
      tags: [],
      items: [],
    },
    {
      id: 'returns',
      title: 'Returns',
      url: 'https://care-atin.myshopify.com/pages/returns',
      type: 'PAGE',
      resourceId: 'returns-page',
      tags: [],
      items: [],
    },
  ],
};

export const mockSEO = {
  title: 'Care-atin - Advanced Hair Care Technology',
  description: 'Revolutionary red light therapy and advanced hair care technology for healthier, stronger hair.',
  url: 'https://care-atin.myshopify.com',
};
