import {gql} from '@shopify/hydrogen';

// Basic Customer Account queries

export const CUSTOMER_ACCOUNT_QUERY = gql`
  query CustomerAccount {
    customer {
      id
      firstName
      lastName
      emailAddress {
        emailAddress
      }
      defaultAddress {
        id
        formatted
        firstName
        lastName
        company
        address1
        address2
        city
        province
        zip
        country
      }
      addresses(first: 10) {
        edges {
          node {
            id
            formatted
            firstName
            lastName
            company
            address1
            address2
            city
            province
            zip
            country
            # Add any other fields you need
          }
        }
      }
      orders(first: 10) {
        edges {
          node {
            id
            number
            processedAt
            fulfillmentStatus
            statusPageUrl
            totalPrice {
              amount
              currencyCode
            }
            # Add any other fields you need
          }
        }
      }
    }
  }
`;

export const CUSTOMER_UPDATE_MUTATION = gql`
  mutation CustomerUpdate($input: CustomerUpdateInput!) {
    customerUpdate(input: $input) {
      customer {
        id
        firstName
        lastName
        emailAddress {
          emailAddress
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;
