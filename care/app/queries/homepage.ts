export const HOMEPAGE_PRODUCT_QUERY = `#graphql
  fragment HomepageProduct on Product {
    id
    title
    description
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

  query homepageProduct($handle: String!) {
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