/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as CustomerAccountAPI from '@shopify/hydrogen/customer-account-api-types';

export type CustomerAccountQueryVariables = CustomerAccountAPI.Exact<{
  [key: string]: never;
}>;

export type CustomerAccountQuery = {
  customer: Pick<
    CustomerAccountAPI.Customer,
    'id' | 'firstName' | 'lastName'
  > & {
    emailAddress?: CustomerAccountAPI.Maybe<
      Pick<CustomerAccountAPI.CustomerEmailAddress, 'emailAddress'>
    >;
    defaultAddress?: CustomerAccountAPI.Maybe<
      Pick<
        CustomerAccountAPI.CustomerAddress,
        | 'id'
        | 'formatted'
        | 'firstName'
        | 'lastName'
        | 'company'
        | 'address1'
        | 'address2'
        | 'city'
        | 'province'
        | 'zip'
        | 'country'
      >
    >;
    addresses: {
      edges: Array<{
        node: Pick<
          CustomerAccountAPI.CustomerAddress,
          | 'id'
          | 'formatted'
          | 'firstName'
          | 'lastName'
          | 'company'
          | 'address1'
          | 'address2'
          | 'city'
          | 'province'
          | 'zip'
          | 'country'
        >;
      }>;
    };
    orders: {
      edges: Array<{
        node: Pick<
          CustomerAccountAPI.Order,
          | 'id'
          | 'number'
          | 'processedAt'
          | 'fulfillmentStatus'
          | 'statusPageUrl'
        > & {
          totalPrice: Pick<
            CustomerAccountAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
        };
      }>;
    };
  };
};

export type CustomerUpdateMutationVariables = CustomerAccountAPI.Exact<{
  input: CustomerAccountAPI.CustomerUpdateInput;
}>;

export type CustomerUpdateMutation = {
  customerUpdate?: CustomerAccountAPI.Maybe<{
    customer?: CustomerAccountAPI.Maybe<
      Pick<CustomerAccountAPI.Customer, 'id' | 'firstName' | 'lastName'> & {
        emailAddress?: CustomerAccountAPI.Maybe<
          Pick<CustomerAccountAPI.CustomerEmailAddress, 'emailAddress'>
        >;
      }
    >;
    userErrors: Array<
      Pick<CustomerAccountAPI.UserErrorsCustomerUserErrors, 'field' | 'message'>
    >;
  }>;
};

interface GeneratedQueryTypes {
  '\n  query CustomerAccount {\n    customer {\n      id\n      firstName\n      lastName\n      emailAddress {\n        emailAddress\n      }\n      defaultAddress {\n        id\n        formatted\n        firstName\n        lastName\n        company\n        address1\n        address2\n        city\n        province\n        zip\n        country\n      }\n      addresses(first: 10) {\n        edges {\n          node {\n            id\n            formatted\n            firstName\n            lastName\n            company\n            address1\n            address2\n            city\n            province\n            zip\n            country\n            # Add any other fields you need\n          }\n        }\n      }\n      orders(first: 10) {\n        edges {\n          node {\n            id\n            number\n            processedAt\n            fulfillmentStatus\n            statusPageUrl\n            totalPrice {\n              amount\n              currencyCode\n            }\n            # Add any other fields you need\n          }\n        }\n      }\n    }\n  }\n': {
    return: CustomerAccountQuery;
    variables: CustomerAccountQueryVariables;
  };
}

interface GeneratedMutationTypes {
  '\n  mutation CustomerUpdate($input: CustomerUpdateInput!) {\n    customerUpdate(input: $input) {\n      customer {\n        id\n        firstName\n        lastName\n        emailAddress {\n          emailAddress\n        }\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n': {
    return: CustomerUpdateMutation;
    variables: CustomerUpdateMutationVariables;
  };
}

declare module '@shopify/hydrogen' {
  interface CustomerAccountQueries extends GeneratedQueryTypes {}
  interface CustomerAccountMutations extends GeneratedMutationTypes {}
}
