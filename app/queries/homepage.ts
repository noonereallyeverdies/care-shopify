export interface HomepageProduct {
  id: string;
  title: string;
  description?: string;
  descriptionHtml?: string;
  vendor?: string;
  handle: string;
  availableForSale: boolean;
  featuredImage?: {
    url: string;
    altText?: string;
    width?: number;
    height?: number;
  };
  priceRange?: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: {
    nodes: {
      id: string;
      availableForSale: boolean;
      title: string;
      price: {
        amount: string;
        currencyCode: string;
      };
      compareAtPrice?: {
        amount: string;
        currencyCode: string;
      } | null;
      selectedOptions: {
        name: string;
        value: string;
      }[];
    }[];
  };
}

export const HOMEPAGE_PRODUCT_QUERY = `#graphql
  fragment HomepageProduct on Product {
    id
    title
    description
    descriptionHtml
    vendor
    handle
    availableForSale
    featuredImage {
      url
      altText
      width
      height
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 1) {
      nodes {
        id
        availableForSale
        title
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
      }
    }
  }

  query homepageProduct($handle: String!, $country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language) {
    shop {
      name
      description
      primaryDomain {
        url
      }
    }
    products(first: 1, query: "available_for_sale:true") {
      nodes {
        handle
      }
    }
    product(handle: $handle) {
      ...HomepageProduct
    }
  }
`;