import {MEDIA_FRAGMENT, PRODUCT_VARIANT_FRAGMENT} from './fragments';

export const HOMEPAGE_FEATURED_PRODUCTS_QUERY = `#graphql
  query homepageFeaturedProducts($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    products(first: 8) {
      nodes {
        id
        title
        handle
        featuredImage {
          url
          altText
          width
          height
        }
        variants(first: 1) {
          nodes {
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export const HOMEPAGE_PRODUCT_QUERY = `#graphql
  query homepageProduct($handle: String!, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    shop {
      name
      primaryDomain {
        url
      }
    }
    product(handle: $handle) {
      id
      title
      handle
      descriptionHtml
      featuredImage {
        url
        altText
        width
        height
      }
      variants(first: 5) {
        nodes {
          id
          title
          availableForSale
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
      seo {
        title
        description
      }
    }
  }
`; 