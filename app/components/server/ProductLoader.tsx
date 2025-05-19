import { useShopQuery, CacheLong } from '@shopify/hydrogen';
import { ReactNode } from 'react';
import { PRODUCT_QUERY } from '~/queries/product';

// This is a server component that handles data fetching and caching
export function ProductLoader({
  children,
  handle,
}: {
  children: (props: { product: any }) => ReactNode;
  handle: string;
}) {
  // Fetch data using Hydrogen's server components
  const { data } = useShopQuery({
    query: PRODUCT_QUERY,
    variables: {
      handle,
    },
    preload: true,
    cache: CacheLong(), // Use appropriate caching strategy
  });

  // Handle errors
  if (!data?.product) {
    return <div>Product not found</div>;
  }

  // Pass product data to children
  return children({ product: data.product });
}