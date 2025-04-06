import {redirect} from '@shopify/remix-oxygen';
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';

// Types
export interface WholesalerData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  status: 'approved' | 'pending' | 'rejected';
  businessName: string;
  businessType: string;
  taxId: string;
  website: string;
  shippingAddress: Address;
  billingAddress: Address;
  contactPreferences: ContactPreferences;
  salesTarget: number;
  accountManager: string;
  dateJoined: string;
  lastLogin: string;
}

interface Address {
  address1: string;
  address2?: string;
  city: string;
  province: string;
  zip: string;
  country: string;
}

interface ContactPreferences {
  emailNewsletter: boolean;
  emailProductUpdates: boolean;
  emailPromotions: boolean;
  smsAlerts: boolean;
}

/**
 * Require wholesaler authentication and return the customer access token
 */
export async function requireWholesaler({
  request,
  context,
  params,
}: LoaderFunctionArgs): Promise<WholesalerData> {
  // First, check if the user is authenticated as a customer
  const customerAccessToken = await context.session.get('customerAccessToken');
  
  if (!customerAccessToken) {
    throw redirect('/account/login?redirect=/wholesaler');
  }
  
  try {
    // Query the customer data from Shopify
    const { storefront } = context;
    
    const { customer } = await storefront.query(CUSTOMER_QUERY, {
      variables: {
        customerAccessToken,
      },
    });
    
    if (!customer) {
      throw redirect('/account/login?redirect=/wholesaler');
    }
    
    // Check if this customer is marked as a wholesaler
    // This would use metafields in a real implementation
    const isWholesaler = isCustomerWholesaler(customer);
    
    if (!isWholesaler) {
      // Redirect to the wholesaler application page if they're not a wholesaler
      throw redirect('/wholesaler/apply');
    }
    
    // Get wholesaler specific data
    // In a real implementation, this would come from Shopify customer metafields
    // or an external database
    return getWholesalerData(customer);
  } catch (error) {
    if (error instanceof Response) throw error;
    throw redirect('/account/login?redirect=/wholesaler');
  }
}

/**
 * Check if a customer is marked as a wholesaler
 * In a real implementation, this would check a metafield or an external database
 */
function isCustomerWholesaler(customer: any): boolean {
  // For demo purposes, we'll consider any customer with a company name as a wholesaler
  // In a real implementation, you would check a specific metafield or tag
  return Boolean(customer.company);
}

/**
 * Get wholesaler specific data for a customer
 * In a real implementation, this would fetch data from Shopify metafields
 * or an external database like Firebase or MongoDB
 */
export function getWholesalerData(customer: any): WholesalerData {
  // For demo purposes, we'll generate mock data
  // In a real implementation, this would use actual data from metafields or a database
  
  // Basic customer data from Shopify
  const { id, email, firstName, lastName, company } = customer;
  
  // Mock additional wholesaler data
  // In a real app, this would come from metafields or an external database
  return {
    id,
    email,
    firstName,
    lastName,
    company,
    status: 'approved',
    businessName: company || 'Care Wholesale LLC',
    businessType: 'Salon',
    taxId: '123-45-6789',
    website: 'https://example.com',
    shippingAddress: {
      address1: customer.defaultAddress?.address1 || '123 Main St',
      address2: customer.defaultAddress?.address2 || 'Suite 100',
      city: customer.defaultAddress?.city || 'New York',
      province: customer.defaultAddress?.province || 'NY',
      zip: customer.defaultAddress?.zip || '10001',
      country: customer.defaultAddress?.country || 'United States',
    },
    billingAddress: {
      address1: customer.defaultAddress?.address1 || '123 Main St',
      address2: customer.defaultAddress?.address2 || 'Suite 100',
      city: customer.defaultAddress?.city || 'New York',
      province: customer.defaultAddress?.province || 'NY',
      zip: customer.defaultAddress?.zip || '10001',
      country: customer.defaultAddress?.country || 'United States',
    },
    contactPreferences: {
      emailNewsletter: true,
      emailProductUpdates: true,
      emailPromotions: false,
      smsAlerts: true,
    },
    salesTarget: 50000,
    accountManager: 'John Smith',
    dateJoined: '2023-01-15',
    lastLogin: new Date().toISOString(),
  };
}

/**
 * Get featured products for the wholesaler dashboard
 */
export async function getWholesalerFeaturedProducts(context: any) {
  const { storefront } = context;
  
  const { products } = await storefront.query(FEATURED_PRODUCTS_QUERY);
  
  return products.nodes;
}

const CUSTOMER_QUERY = `#graphql
  query CustomerDetails($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      email
      phone
      acceptsMarketing
      company
      defaultAddress {
        id
        formatted
        firstName
        lastName
        company
        address1
        address2
        country
        province
        city
        zip
        phone
      }
    }
  }
`;

const FEATURED_PRODUCTS_QUERY = `#graphql
  query FeaturedProducts {
    products(first: 3, sortKey: BEST_SELLING) {
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
          }
        }
      }
    }
  }
`; 