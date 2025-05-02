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

  query homepageProduct($handle: String!, $country: CountryCode, $language: LanguageCode) 
    @inContext(country: $country, language: $language) {
    shop {
      name
      description
      primaryDomain {
        url
      }
    }
    product(handle: $handle) {
      ...HomepageProduct
    }
  }
`; 