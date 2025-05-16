import { defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, type MetaFunction } from '@remix-run/react';
import { AnalyticsPageType, Seo } from '@shopify/hydrogen';
import { json } from '@shopify/remix-oxygen';
import React, { Suspense } from 'react';

// Import the planned section components (create these next)
// import { HeroSection } from '~/components/HeroSection';
// import { ProblemSolution } from '~/components/ProblemSolution';
// import { HowItWorksSnippet } from '~/components/HowItWorksSnippet';
// import { DeviceSpotlight } from '~/components/DeviceSpotlight';
// import { TestimonialSlider } from '~/components/TestimonialSlider';
// import { BeforeAfter } from '~/components/BeforeAfter';
// import { SocialProofLogos } from '~/components/SocialProofLogos';
// import { FinalCta } from '~/components/FinalCta';

// Import the HeroSection component
import { HeroSection } from '~/components/HeroSection';
// Import the HowItWorksSnippet component
import { HowItWorksSnippet } from '~/components/HowItWorksSnippet';
// Import the ProblemSolution component
import { ProblemSolution } from '~/components/ProblemSolution';
// Import the TestimonialSlider component
const TestimonialSlider = React.lazy(() => import('~/components/TestimonialSlider'));
// Import the BeforeAfter component
const BeforeAfter = React.lazy(() => import('~/components/BeforeAfter'));
// Import the DeviceSpotlight component
const DeviceSpotlight = React.lazy(() => import('~/components/DeviceSpotlight'));
// Import the FinalCta component
const FinalCta = React.lazy(() => import('~/components/FinalCta'));
// Import the SocialProofLogos component
import {SocialProofLogos} from '~/components/SocialProofLogos';

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

      {/* === Other Homepage Sections Go Here === */}
      {/* Example:
      <FeaturedProducts products={data.featuredProducts} />
      */}
      
      {/* Temporary placeholder content */}
      {/* <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Homepage Content Placeholder</h2>
        <p>Other sections like Featured Products will go here.</p>
      </div> */}

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