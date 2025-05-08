const cleanStoreDomain = storeDomain
  .replace(/^https?:\/\//, '')
  .replace(/\/$/, '');

// Construct Product Review Schema
const productReviewSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": fetchedProduct.title || "care•atin Red Light Therapy Hair Growth Device",
  "image": fetchedProduct.featuredImage?.url || (shop?.primaryDomain?.url ? `${shop.primaryDomain.url}/images/default-product-image.jpg` : '/images/default-product-image.jpg'), // Fallback image
  "description": fetchedProduct.seo?.description || fetchedProduct.descriptionHtml?.replace(/<[^>]+>/g, '') || "Revitalize your hair with care•atin's patented red light therapy device.",
  "sku": fetchedProduct.variants?.nodes[0]?.sku || fetchedProduct.id, // Example SKU
  "mpn": fetchedProduct.id, // Example MPN
  "brand": {
    "@type": "Brand",
    "name": shop?.name || "care•atin"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8", // Placeholder - fetch from actual review data
    "reviewCount": "10000"  // Placeholder - fetch from actual review data
  },
  "review": [
    {
      "@type": "Review",
      "author": {"@type": "Person", "name": "Jennifer K."}, // Placeholder
      "datePublished": "2024-03-15", // Placeholder
      "reviewBody": "I tried everything from supplements to expensive salon treatments. Nothing worked until I found care•atin. My shedding reduced by 60% in just 6 weeks.", // Placeholder
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5" // Placeholder
      }
    }
    // Add more review items or fetch dynamically
  ]
  // Potentially add "offers" if price information is readily available and simple
};

const deferredData = {
  shop,
  product: fetchedProduct,
  analytics: {
    pageType: AnalyticsPageType.home,
  },
  seo,
  storeDomain: cleanStoreDomain,
  productReviewSchema, // Add schema to deferred data
};

console.log('[Homepage Loader] Returning deferred data...');

export const meta = ({data}: MetaArgs<typeof loader>) => {
  const shopName = data?.shop?.name || 'care•atin';
  const defaultTitle = `${shopName} | The Science of Shine`;
  const defaultDescription = `Discover ${shopName}'s innovative approach to hair care, combining red light therapy and science for healthier, stronger hair.`;

  const homeSeo: SeoConfig = {
    title: `care•atin Red Light Therapy Hair Growth Device | Visible Results`,
    description: `Revitalize your hair with care•atin's patented red light therapy device. Clinically proven for thicker, fuller hair growth & reduced shedding. Experience visible results & regain confidence. Shop now!`,
    ...(data?.seo ?? {}),
    titleTemplate: `%s`,
  };

  let seoMetaData = getSeoMeta(homeSeo);

  if (!data) {
    return [{title: defaultTitle}, {description: defaultDescription}];
  }
  
  // Add Product Review Schema if available
  if (data.productReviewSchema) {
    seoMetaData = [
      ...seoMetaData,
      {
        tagName: 'script',
        type: 'application/ld+json',
        innerHTML: JSON.stringify(data.productReviewSchema),
      },
    ];
  }

  return seoMetaData;
};

export default function Homepage() {
  // ... existing code ...
} 