import { defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, type MetaFunction } from '@remix-run/react';
import { AnalyticsPageType, Seo } from '@shopify/hydrogen';
import { json } from '@shopify/remix-oxygen';
import React, { Suspense } from 'react';

// Import the HeroSection component from its correct path
import { HeroSection } from '~/components/containers/HeroSection';
// Import the HowItWorksSnippet component from its correct path
import { HowItWorksSnippet } from '~/components/sections-active-landingpage/HowItWorksSnippet';
// Import the ProblemSolution component from its correct path
import { ProblemSolution } from '~/components/sections-active-landingpage/ProblemSolution';
// Import the SocialProofLogos component
import { SocialProofLogos } from '~/components/SocialProofLogos';

// Lazy load less critical components
const TestimonialSlider = React.lazy(() => import('~/components/sections-active-landingpage/TestimonialSlider'));
const BeforeAfter = React.lazy(() => import('~/components/sections-active-landingpage/BeforeAfter'));
const DeviceSpotlight = React.lazy(() => import('~/components/sections-active-landingpage/DeviceSpotlight'));
const FinalCta = React.lazy(() => import('~/components/sections-active-landingpage/FinalCta'));

export const meta: MetaFunction = () => {
  return [
    { title: 'Care-atin | Red Light Therapy for Hair Growth' },
    {
      name: 'description',
      content:
        'Revitalize your hair with Care-atin\'s science-backed Red Light Therapy device. Promote healthier, fuller hair naturally.',
    },
  ];
};

// Loader to fetch data needed specifically for the landing page sections
export async function loader({ context }: LoaderFunctionArgs) {
  const { storefront } = context;
  // Fetch the product data
  const { product } = await storefront.query(PRODUCT_QUERY, {
    variables: {
      handle: 'care-atin-rlt-device', // Ensure this handle is correct
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
    // Optional: Add caching
    cache: storefront.CacheShort()
  });

  if (!product?.id) {
    // Log a warning if the product isn't found, but don't crash the page
    console.warn(`Product with handle 'care-atin-rlt-device' not found. DeviceSpotlight might not render correctly.`);
  }

  const analytics = { pageType: AnalyticsPageType.home };
  
  // Return both product and analytics data
  // Use defer if you want analytics or other non-critical data to load later
  return json({ product: product || null, analytics }); 
}

export default function Homepage() {
  // Destructure product along with analytics
  const { product, analytics } = useLoaderData<typeof loader>();

  return (
    <>
      <Seo type="homepage" data={analytics} />
      
      <HeroSection />
      <HowItWorksSnippet />
      <ProblemSolution />
      <SocialProofLogos />

      <Suspense fallback={<div style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p>Loading section...</p></div>}>
        <TestimonialSlider />
      </Suspense>

      <Suspense fallback={<div style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p>Loading section...</p></div>}>
        <BeforeAfter />
      </Suspense>

      {/* Render DeviceSpotlight only if product data exists */}
      {product && (
        <Suspense fallback={<div style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p>Loading section...</p></div>}>
          <DeviceSpotlight product={product} />
        </Suspense>
      )}

      <Suspense fallback={<div style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p>Loading section...</p></div>}>
        <FinalCta />
      </Suspense>
    </>
  );
}

// Basic GraphQL query to fetch product info
const PRODUCT_QUERY = `#graphql
  query HomepageProductQuery(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      descriptionHtml # Ensure we fetch HTML description
      description # Keep plain text as fallback
      handle # Ensure handle is fetched for the link
      vendor # Added vendor
      featuredImage {
        url
        altText
        width
        height
      }
      variants(first: 1) {
        nodes {
          id
          availableForSale
          title # Added variant title
          price {
            amount
            currencyCode
          }
          # compareAtPrice { ... } # Uncomment if needed
        }
      }
    }
  }
`; 