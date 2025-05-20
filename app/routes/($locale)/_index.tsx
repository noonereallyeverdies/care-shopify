import { defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, type MetaFunction } from '@remix-run/react';
import { AnalyticsPageType, Seo } from '@shopify/hydrogen';
import { json } from '@shopify/remix-oxygen';
import React, { Suspense } from 'react';

// Corrected import paths for our landing page sections to use /sections/
import { HeroSection } from '~/components/sections/HeroSection';
import { KeyBenefitsSection } from '~/components/sections/KeyBenefitsSection';
const DeviceShowcaseSection = React.lazy(() => import('~/components/sections/DeviceShowcaseSection'));
const SignatureFeatureShowcaseSection = React.lazy(() => import('~/components/sections/SignatureFeatureShowcaseSection'));
const EmotionalStorytellingStripSection = React.lazy(() => import('~/components/sections/EmotionalStorytellingStripSection'));
// const SocialProofSection = React.lazy(() => import('~/components/sections/SocialProofSection'));
const ParallaxLightVisualizationSequence = React.lazy(() => import('~/components/sections-active-landingpage/ParallaxLightVisualizationSequence'));
// const BeforeAfter = React.lazy(() => import('~/components/sections-active-landingpage/BeforeAfter')); // Assuming this was the old one
const InteractiveBeforeAfterTool = React.lazy(() => import('~/components/sections/InteractiveBeforeAfterTool'));
// Remove SocialProofSection and add DataVisualizationTimeline
// const SocialProofSection = React.lazy(() => import('~/components/sections/SocialProofSection'));
const DataVisualizationTimeline = React.lazy(() => import('~/components/sections/DataVisualizationTimeline'));

// Comment out or remove imports from the old .bak file as they are replaced by the above
// import { HowItWorksSnippet } from '~/components/HowItWorksSnippet';
// import { ProblemSolution } from '~/components/ProblemSolution';
// const TestimonialSlider = React.lazy(() => import('~/components/TestimonialSlider'));
// const DeviceSpotlight = React.lazy(() => import('~/components/DeviceSpotlight'));
// const FinalCta = React.lazy(() => import('~/components/FinalCta'));
// import {SocialProofLogos} from '~/components/SocialProofLogos';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  // Ensure data and product are properly checked before accessing properties
  const productTitle = data?.product?.title;
  const productDescription = data?.product?.description;

  const pageTitle = productTitle
    ? `${productTitle} | Photonique`
    : 'Photonique | Radiant Hair Wellness';
  const pageDescription = productDescription || 
    'Discover Photonique: Advanced light therapy for vibrant, healthy hair. Your journey to radiance starts here.';

  return [
    { title: pageTitle },
    { name: 'description', content: pageDescription },
    // Add other meta tags as needed, e.g., Open Graph, Twitter Cards
    // { property: "og:type", content: "website" },
    // { property: "og:title", content: pageTitle },
    // { property: "og:description", content: pageDescription },
    // { property: "og:image", content: data?.product?.featuredImage?.url || '/default-og-image.jpg' }, // Ensure a default image
  ];
};

export async function loader({ context, params }: LoaderFunctionArgs) {
  console.log("Simplified loader in _index.tsx is running.Locale:", params.locale); // Added a server-side log
  const locale = params.locale as string; // Cast locale to string, it should always be present
  
  // Temporarily return minimal data to rule out data fetching issues
  return json({
    product: null, 
    analytics: { pageType: AnalyticsPageType.home, locale, productGid: null }, 
    locale 
  }); 
}

export default function Homepage() {
  // const { product } = useLoaderData<typeof loader>(); // Still commented out

  return (
    <div style={{padding: '20px', backgroundColor: 'lightgray'}}>
      <h1 style={{fontSize: '2rem', color: 'red', border: '2px solid red', padding: '10px'}}>
        HELLO WORLD - HOMEPAGE TEST. IS THIS VISIBLE? (Loader simplified, HeroSection commented out)
      </h1>
      
      {/* Test with just one section first */}
      {/* <Suspense fallback={<div style={{border: '2px solid blue', padding: '10px'}}>Loading Hero (Suspense)...</div>}> */}
      {/*   <HeroSection /> */}
      {/* </Suspense> */}

      {/* Or even simpler, without suspense if HeroSection is not lazy loaded */}
      {/* <HeroSection />  */}
      
      {/* 
      <KeyBenefitsSection />

      <Suspense fallback={<div className="flex items-center justify-center min-h-[400px]"><p>Loading Photonique Details...</p></div>}>
        <DeviceShowcaseSection product={product} />
      </Suspense>

      <Suspense fallback={<div className="flex items-center justify-center min-h-[400px]"><p>Loading Signature Features...</p></div>}>
        <SignatureFeatureShowcaseSection product={product} />
      </Suspense>

      <Suspense fallback={<div className="flex items-center justify-center min-h-[700px]"><p>Loading Light Science Visualization...</p></div>}>
        <ParallaxLightVisualizationSequence />
      </Suspense>

      <Suspense fallback={<div className="flex items-center justify-center min-h-[500px]"><p>Loading Results Showcase...</p></div>}>
        <InteractiveBeforeAfterTool />
      </Suspense>

      <Suspense fallback={<div className="flex items-center justify-center min-h-[400px]"><p>Loading Stories...</p></div>}>
        <EmotionalStorytellingStripSection />
      </Suspense>

      <Suspense fallback={<div className="flex items-center justify-center min-h-[600px]"><p>Loading Clinical Results...</p></div>}>
        <DataVisualizationTimeline />
      </Suspense>
      */}
    </div>
  );
}

// Basic GraphQL query to fetch product info (ensure this matches your product structure)
const PRODUCT_QUERY = `#graphql
  query HomepageProductQuery(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      descriptionHtml
      description 
      handle 
      vendor
      featuredImage {
        url
        altText
        width
        height
      }
      # Add other fields your sections might need, e.g., media for a gallery
      # Metafields query removed for now to resolve GraphQL validation errors
      # metafields(first: 10, namespace: "photonique_specs") { # Example namespace
      #   nodes {
      #     key
      #     value
      #   }
      # }
      variants(first: 1) {
        nodes {
          id
          availableForSale
          title 
          price {
            amount
            currencyCode
          }
          # compareAtPrice { amount currencyCode }
        }
      }
    }
  }
`;