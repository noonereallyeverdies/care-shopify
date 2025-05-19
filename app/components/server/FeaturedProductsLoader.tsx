import { useShopQuery } from '@shopify/hydrogen';
import { ReactNode } from 'react';
import { FEATURED_PRODUCTS_QUERY } from '~/queries/homepage';

// This is a server component that fetches data and provides it to its children
export function FeaturedProductsLoader({
  children,
  count = 4
}: {
  children: (props: { products: any }) => ReactNode;
  count?: number;
}) {
  // Fetch data using Hydrogen's server components
  const { data } = useShopQuery({
    query: FEATURED_PRODUCTS_QUERY,
    variables: {
      count
    },
    preload: true,
    cache: {
      maxAge: 60 * 60, // 1 hour
      staleWhileRevalidate: 60 * 60 * 24 // 24 hours
    }
  });

  // Pass the fetched data to the children
  return children({ products: data?.products });
}