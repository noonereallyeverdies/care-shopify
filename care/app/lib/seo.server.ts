export const seoPayload = {
  root: ({ shop, url }: { shop: any; url: string }) => ({
    title: shop?.name || 'care•atin',
    description: shop?.description || 'Advanced hair wellness solutions that restore hair health naturally',
    url,
    type: 'website' as const,
    siteName: shop?.name || 'care•atin',
  }),
  
  collection: ({ collection, url }: { collection: any; url: string }) => ({
    title: collection?.title || 'Collection',
    description: collection?.description || '',
    url,
    type: 'website' as const,
  }),
  
  product: ({ product, selectedVariant, url }: { product: any; selectedVariant?: any; url: string }) => ({
    title: product?.title || 'Product',
    description: product?.description || '',
    url,
    type: 'product' as const,
    image: selectedVariant?.image?.url || product?.images?.[0]?.url,
  }),
};
