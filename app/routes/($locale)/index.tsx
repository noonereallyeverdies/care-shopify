import React, { Suspense, lazy } from 'react';
import { json, defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, type MetaFunction } from '@remix-run/react';
import { AnalyticsPageType, Seo } from '@shopify/hydrogen';

import { SectionDivider } from '~/components/sections/SectionDivider';
import { HeroSection } from '~/components/sections/HeroSection';
import { KeyBenefitsSection } from '~/components/sections/KeyBenefitsSection';

// Existing lazy-loaded sections
const DeviceShowcaseSection = React.lazy(() => import('~/components/sections/DeviceShowcaseSection'));
// SignatureFeatureShowcaseSection REMOVED
const ParallaxLightVisualizationSequence = React.lazy(() => import('~/components/sections-active-landingpage/ParallaxLightVisualizationSequence'));
const InteractiveBeforeAfterTool = React.lazy(() => import('~/components/sections/InteractiveBeforeAfterTool'));
const EmotionalStorytellingStripSection = React.lazy(() => import('~/components/sections/EmotionalStorytellingStripSection'));

// HowItWorks REMOVED
const TestimonialsSection = React.lazy(() => import('~/components/sections/TestimonialsSection').then(module => ({ default: module.TestimonialsSection })) );
const SocialProofSection = React.lazy(() => import('~/components/sections/SocialProofSection').then(module => ({ default: module.SocialProofSection })) );
const FounderStorySection = React.lazy(() => import('~/components/sections/FounderStorySection').then(module => ({ default: module.FounderStorySection })) );
const ProductSpecificationsSection = React.lazy(() => import('~/components/sections/ProductSpecificationsSection').then(module => ({ default: module.ProductSpecificationsSection })) );
const FAQSection = React.lazy(() => import('~/components/sections/FAQSection').then(module => ({ default: module.FAQSection })) );
// ScienceHub REMOVED
const FinalConversionSection = React.lazy(() => import('~/components/sections/FinalConversionSection').then(module => ({ default: module.FinalConversionSection })) );
const TransformationJourneySection = React.lazy(() => import('~/components/sections/TransformationJourneySection').then(module => ({ default: module.TransformationJourneySection })) );
const StatisticsSection = React.lazy(() => import('~/components/sections/StatisticsSection').then(module => ({ default: module.StatisticsSection })) );

// GraphQL query to fetch basic product information
const PRODUCT_QUERY = `#graphql
  query ProductQuery(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      description
      handle
      featuredImage {
        url
        altText
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
          title
          price {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

export const meta: MetaFunction<typeof loader> = ({data}) => {
  const productTitle = data?.product?.title ?? 'Photonique Touch Hair Device';
  return [
    {title: `Photonique | Illuminate Your Best Hair Ever`},
    {name: 'description', content: `Discover Photonique Touch, the revolutionary hair wellness device. Feel the warmth, see the radiance, and unlock your best hair ever. Shop now for clinically proven results.`}
    // Can add more meta tags here, like keywords or Open Graph tags
    // {tagName: 'link', rel: 'alternate', hrefLang: 'es', href: '/'}
  ];
};

export async function loader({ params, context, request }: LoaderFunctionArgs) {
  const locale = params.locale as string;
  const { storefront } = context;

  try {
    let product;
    try {
      const result = await storefront.query(PRODUCT_QUERY, {
        variables: {
          handle: 'photonique-touch', // Correct product handle
          country: storefront.i18n.country,
          language: storefront.i18n.language,
        },
        cache: storefront.CacheShort(),
      });
      // Add console log to inspect the raw result from storefront.query
      console.log("[LOADER DIAGNOSTIC] Raw storefront.query result:", JSON.stringify(result, null, 2));

      if (!result || result.errors || !result.data) {
        console.error("[LOADER ERROR] GraphQL query failed or returned errors. Result:", JSON.stringify(result, null, 2));
        // Potentially throw a new error here to be caught by the outer catch, or handle directly
        // For now, let it proceed to product = result.product to see if that causes a more specific error
      }
      product = result.product; // This might fail if result.data is null/undefined
    } catch (error: any) {
      console.error("[LOADER ERROR] Error during storefront.query execution:", error);
      throw error; // Rethrow to be handled by the catch block below
    }

    if (!product) {
      console.warn(`[ACTUAL LOADER] Product with handle 'photonique-touch' not found. Please verify this handle exists in your Shopify store.`);
    }

    const analytics = { pageType: AnalyticsPageType.home, locale, productGid: product?.id };

    return defer({
      product: product || null,
      analytics,
      locale,
    }); 

  } catch (error: any) {
    console.error("[ACTUAL LOADER] Error fetching product data:", error);
    console.error("[ACTUAL LOADER] Full error details:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    // Fallback or error state
    const errorMessage = error instanceof Error ? error.message : 'Failed to load product';
    return json({ product: null, analytics: { pageType: AnalyticsPageType.home, locale, productGid: null }, locale, error: errorMessage }, { status: 500 });
  }
}

// Basic diagnostic component to verify system health
function DiagnosticPanel() {
  return (
    <div style={{margin: '20px 0', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '5px'}}>
      <h3>System Diagnostics</h3>
      <ul>
        <li>Client rendering: <span style={{color: 'green'}}>✓ Working</span></li>
        <li>Component mounting: <span style={{color: 'green'}}>✓ Working</span></li>
        <li>React hooks: <span style={{color: 'green'}}>✓ Working</span></li>
        <li>Current time: {new Date().toLocaleTimeString()}</li>
        <li>Environment: {process.env.NODE_ENV}</li>
      </ul>
  </div>
);
}

export default function Homepage() {
  const { product, analytics, locale } = useLoaderData<typeof loader>();
  
  const sectionFallback = <div className="flex items-center justify-center min-h-[300px] w-full"><p>Loading Section...</p></div>;

  return (
    <div className="landing-page">
      {/* 1. Hook (Hero) */}
      <HeroSection />

      {/* Section Divider: Hero to Benefits */}
      <SectionDivider fromColor="bg-black" toColor="bg-white" height={16} />

      {/* 2. Core Emotional Benefits */}
      <KeyBenefitsSection />

      {/* Product Showcase - Moved higher as requested */}
      {product && (
        <Suspense fallback={<div className="h-[80vh] bg-neutral-100" />}>
          <DeviceShowcaseSection product={product} />
        </Suspense>
      )}

      {/* Science sections REMOVED from here */}
      
      {/* Section Divider: Features to Visualization (or relevant next section) */}
      <SectionDivider fromColor="bg-white" toColor="bg-black" height={20} flip={true} />
      
      <Suspense fallback={sectionFallback}><ParallaxLightVisualizationSequence /></Suspense>
      
      {/* Section Divider: Visualization to Transformation */}
      <SectionDivider fromColor="bg-black" toColor="bg-neutral-50" height={24} />

      {/* Transformation Journey - Placed after science/how-it-works and before social proof */}
      <Suspense fallback={<div className="h-[60vh] bg-neutral-50" />}>
        <TransformationJourneySection />
      </Suspense>

      {/* DataVisualizationTimeline / ResultsTimelineSection are to be integrated or explicitly added later if needed */}

      {/* 5. Results & Social Proof - Consolidated results section */}
      <Suspense fallback={sectionFallback}><StatisticsSection /></Suspense>
      <Suspense fallback={sectionFallback}><InteractiveBeforeAfterTool /></Suspense>
      <Suspense fallback={sectionFallback}><TestimonialsSection /></Suspense>
      <Suspense fallback={sectionFallback}><SocialProofSection /></Suspense>
      <Suspense fallback={sectionFallback}><EmotionalStorytellingStripSection /></Suspense>
      <Suspense fallback={sectionFallback}><FounderStorySection /></Suspense>
      
      {/* 6. Technical Details & FAQs - Consolidated technical details */}
      <Suspense fallback={sectionFallback}><ProductSpecificationsSection /></Suspense>
      <Suspense fallback={sectionFallback}><FAQSection /></Suspense>
      {/* ScienceHub rendering REMOVED */}

      {/* Section Divider before Final CTA */}
      <SectionDivider fromColor="bg-white" toColor="bg-rose-50" height={20} />

      {/* 7. Final CTA */}
      <Suspense fallback={sectionFallback}><FinalConversionSection /></Suspense>

    </div>
  );
} 