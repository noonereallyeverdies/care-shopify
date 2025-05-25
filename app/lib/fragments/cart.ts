/**
 * GraphQL fragments for cart queries
 */
export const CART_QUERY_FRAGMENT = `#graphql
  fragment CartLine on CartLine {
    id
    quantity
    attributes {
      key
      value
    }
    cost {
      totalAmount {
        amount
        currencyCode
      }
      amountPerQuantity {
        amount
        currencyCode
      }
      compareAtAmountPerQuantity {
        amount
        currencyCode
      }
    }
    merchandise {
      ... on ProductVariant {
        id
        availableForSale
        compareAtPrice {
          amount
          currencyCode
        }
        price {
          amount
          currencyCode
        }
        requiresShipping
        title
        image {
          url
          altText
          width
          height
        }
        product {
          handle
          title
          id
        }
        selectedOptions {
          name
          value
        }
      }
    }
    sellingPlanAllocation {
      sellingPlan {
        id
        name
        options {
          name
          value
        }
        priceAdjustments {
          adjustmentValue {
            ... on SellingPlanFixedAmountPriceAdjustment {
              __typename
              adjustmentAmount {
                amount
                currencyCode
              }
            }
            ... on SellingPlanFixedPriceAdjustment {
              __typename
              price {
                amount
                currencyCode
              }
            }
            ... on SellingPlanPercentagePriceAdjustment {
              __typename
              adjustmentPercentage
            }
          }
          orderCount
        }
      }
    }
  }
  
  fragment CartApiQuery on Cart {
    id
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalDutyAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
    buyerIdentity {
      countryCode
      customer {
        id
        email
        firstName
        lastName
        displayName
      }
      email
      phone
    }
    lines(first: 100) {
      nodes {
        ...CartLine
      }
    }
    attributes {
      key
      value
    }
    discountCodes {
      code
      applicable
    }
    checkoutUrl
    totalQuantity
  }
`;

/**
 * A simpler cart fragment for use in the shopping cart component
 */
export const CART_COMPONENT_FRAGMENT = `#graphql
  fragment CartComponentFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      nodes {
        id
        quantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        merchandise {
          ... on ProductVariant {
            id
            title
            selectedOptions {
              name
              value
            }
            product {
              title
              handle
            }
            image {
              url
              altText
              width
              height
            }
            price {
              amount
              currencyCode
            }
          }
        }
        sellingPlanAllocation {
          sellingPlan {
            id
            name
          }
        }
      }
    }
  }
`; 