// Customer account API types
export interface CustomerDetailsFragment {
  id: string;
  email?: string;
  emailAddress?: string; // Alternative field name
  firstName?: string;
  lastName?: string;
  phone?: string;
  phoneNumber?: string; // Alternative field name
  defaultAddress?: Address;
  addresses: {
    nodes: Address[];
  };
}

export interface OrderCardFragment {
  id: string;
  orderNumber: number;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  currentTotalPrice: {
    amount: string;
    currencyCode: string;
  };
}

export interface OrderFragment {
  id: string;
  orderNumber: number;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  currentTotalPrice: {
    amount: string;
    currencyCode: string;
  };
  lineItems: {
    nodes: OrderLineItem[];
  };
}

interface Address {
  id: string;
  formatted: string[];
  firstName?: string;
  lastName?: string;
  company?: string;
  address1?: string;
  address2?: string;
  city?: string;
  province?: string;
  country?: string;
  zip?: string;
  phone?: string;
}

interface OrderLineItem {
  id: string;
  title: string;
  quantity: number;
  variant?: {
    id: string;
    title: string;
    image?: {
      url: string;
      altText?: string;
    };
  };
}
