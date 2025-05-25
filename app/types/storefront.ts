// Storefront API types
export interface CartApiQueryFragment {
  id: string;
  totalQuantity: number;
  checkoutUrl?: string;
  appliedGiftCards?: Array<{
    id: string;
    lastCharacters: string;
    amountUsed: {
      amount: string;
      currencyCode: string;
    };
  }>;
  lines: {
    nodes: CartLine[];
  };
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  discountCodes: Array<{
    code: string;
    applicable: boolean;
  }>;
}

export interface HomepageFeaturedProductsQuery {
  products: {
    nodes: Product[];
  };
}

export interface HomepageFeaturedCollectionsQuery {
  collections: {
    nodes: Collection[];
  };
}

export interface CollectionContentFragment {
  id: string;
  title: string;
  description: string;
  handle: string;
  image?: {
    url: string;
    altText?: string;
  };
}

export interface PredictiveSearchQuery {
  predictiveSearch?: {
    queries: Array<{
      text: string;
      styledText: string;
    }>;
    products: Array<Product>;
    collections: Array<Collection>;
    pages: Array<{
      id: string;
      title: string;
      handle: string;
    }>;
    articles: Array<{
      id: string;
      title: string;
      handle: string;
    }>;
  };
}

export interface RegularSearchQuery {
  products: {
    nodes: Product[];
  };
  pages: {
    nodes: Array<{
      id: string;
      title: string;
      handle: string;
    }>;
  };
  articles: {
    nodes: Array<{
      id: string;
      title: string;
      handle: string;
    }>;
  };
}

interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    image?: {
      url: string;
      altText?: string;
      width?: number;
      height?: number;
    };
    selectedOptions: Array<{
      name: string;
      value: string;
    }>;
    product: {
      id: string;
      title: string;
      handle: string;
    };
  };
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
}

interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  featuredImage?: {
    url: string;
    altText?: string;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: {
    nodes: ProductVariant[];
  };
}

interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: {
    amount: string;
    currencyCode: string;
  };
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
}

interface Collection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image?: {
    url: string;
    altText?: string;
  };
}
