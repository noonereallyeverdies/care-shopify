import { validateLocaleParameter } from "~/lib/locale-utils";
import React, {lazy, Suspense} from 'react';
import {
  json,
  defer,
  type LoaderFunctionArgs,
  type MetaArgs,
} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {
  AnalyticsPageType,
  getSeoMeta,
  type SeoConfig,
} from '@shopify/hydrogen';
import {
  type Shop,
} from '@shopify/hydrogen/storefront-api-types';
import {motion} from 'framer-motion';

import {CACHE_SHORT, routeHeaders} from '~/data/cache';
import {seoPayload} from '~/lib/seo.server';
import {HOMEPAGE_PRODUCT_QUERY} from '~/queries/homepage';
import {Hero} from '~/components/sections/Hero';

// New Section Imports
import { KeyBenefitsSection } from '~/components/sections/KeyBenefitsSection';
import { DeviceShowcaseSection } from '~/components/sections/DeviceShowcaseSection';
import { ResultsTimelineSection } from '~/components/sections/ResultsTimelineSection';
import { ScienceTechnologySection } from '~/components/sections/ScienceTechnologySection';
import { TestimonialsSection } from '~/components/sections/TestimonialsSection';
import { FounderStorySection } from '~/components/sections/FounderStorySection';
import { ProductSpecificationsSection } from '~/components/sections/ProductSpecificationsSection';
import { FAQSection } from '~/components/sections/FAQSection';
import { FinalConversionSection } from '~/components/sections/FinalConversionSection';

// Components above the fold are imported directly
// import {ProblemSolutionSection} from '~/components/sections-active-landingpage/ProblemSolutionSection';
// import {SocialProofBanner} from '~/components/sections-active-landingpage/SocialProofBanner';

// Lazy load components that are below the fold
/* // Commenting out old lazy-loaded sections for now
// REMOVED ALL LAZY IMPORT STATEMENTS THAT WERE HERE
*/

export const headers = {
  'Cache-Control': 'public, max-age=60',
};

export interface HomepageProduct {
  id: string;
  title: string;
  handle: string;
  descriptionHtml?: string;
  featuredImage?: {
    url: string;
    altText?: string;
    width?: number;
    height?: number;
  };
  variants: {
    nodes: any[];
  };
  seo?: {
    title?: string;
    description?: string;
  };
}

export async function loader({params, context}: LoaderFunctionArgs) {
  validateLocaleParameter({ params, context } as LoaderFunctionArgs);
  const {language, country} = context.storefront.i18n;

  if (
    params.locale &&
    params.locale.toLowerCase() !== `${language}-${country}`.toLowerCase()
  ) {
    throw new Response(null, {status: 404});
  }
  
  try {
    console.log('[Homepage Loader] Fetching product data...');
    const {shop, product: fetchedProduct} = await context.storefront.query<{
      shop: Shop;
      product: HomepageProduct | null;
    }>(HOMEPAGE_PRODUCT_QUERY, {
        variables: {
          handle: 'photonique-touch',
        country,
        language,
      },
    });
    console.log('[Homepage Loader] Response received.');

    if (!fetchedProduct) {
      console.error(
        '[Homepage Loader] Product not found handle: photonique-touch',
      );
      throw new Response(JSON.stringify({message: 'Product not found'}), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const seo = seoPayload.home({url: shop?.primaryDomain?.url || ''});

    const storeDomain =
      context.env.PUBLIC_STORE_DOMAIN ||
      shop?.primaryDomain?.url ||
      'luminancecare.myshopify.com';
    const cleanStoreDomain = storeDomain
      .replace(/^https?:\/\//, '')
      .replace(/\/$/, '');

    const deferredData = {
      shop,
      product: fetchedProduct,
      analytics: {
        pageType: AnalyticsPageType.home,
      },
      seo,
      storeDomain: cleanStoreDomain,
    };

    console.log('[Homepage Loader] Returning deferred data...');
    return defer(deferredData, {
      headers: {
        ...routeHeaders,
      },
    });
  } catch (error) {
    console.error('[Homepage Loader] Error fetching data:', error);
    if (error instanceof Response) {
      throw error;
    }
    throw new Response(JSON.stringify({message: 'Internal server error'}), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export const meta = ({data}: MetaArgs<typeof loader>) => {
  const shopName = data?.shop?.name || 'care•atin';
  const defaultTitle = `${shopName} | The Science of Shine`;
  const defaultDescription = `Discover ${shopName}'s innovative approach to hair care, combining red light therapy and science for healthier, stronger hair.`;

  const dataSeo = data?.seo ?? {};

  const homeSeo: SeoConfig = {
    title: dataSeo.title ?? defaultTitle,
    description: dataSeo.description ?? defaultDescription,
    titleTemplate: dataSeo.titleTemplate ?? (shopName ? `%s | ${shopName}` : '%s'),
  };

  if (dataSeo.media !== undefined) {
    homeSeo.media = dataSeo.media;
  }
  if (dataSeo.jsonLd !== undefined) {
    homeSeo.jsonLd = dataSeo.jsonLd;
  }

  if (dataSeo.robots) {
    homeSeo.robots = {}; // Initialize if not already
    if (dataSeo.robots.noIndex !== undefined) homeSeo.robots.noIndex = dataSeo.robots.noIndex;
    if (dataSeo.robots.noFollow !== undefined) homeSeo.robots.noFollow = dataSeo.robots.noFollow;
    if (dataSeo.robots.noArchive !== undefined) homeSeo.robots.noArchive = dataSeo.robots.noArchive;
    if (dataSeo.robots.noSnippet !== undefined) homeSeo.robots.noSnippet = dataSeo.robots.noSnippet;
    if (dataSeo.robots.noImageIndex !== undefined) homeSeo.robots.noImageIndex = dataSeo.robots.noImageIndex;
    if (dataSeo.robots.maxImagePreview !== undefined) homeSeo.robots.maxImagePreview = dataSeo.robots.maxImagePreview;
    if (dataSeo.robots.maxSnippet !== undefined) homeSeo.robots.maxSnippet = dataSeo.robots.maxSnippet;
    if (dataSeo.robots.maxVideoPreview !== undefined) homeSeo.robots.maxVideoPreview = dataSeo.robots.maxVideoPreview;
    if (dataSeo.robots.unavailableAfter !== undefined) homeSeo.robots.unavailableAfter = dataSeo.robots.unavailableAfter;
    // Add any other specific RobotsOptions properties here
  }

  if (dataSeo.alternates !== undefined) {
    if (Array.isArray(dataSeo.alternates)) {
      homeSeo.alternates = dataSeo.alternates.map(alt => {
        const newAlt: { language: string; default?: boolean; url: string } = { // Explicitly type newAlt
          language: alt.language,
          url: alt.url,
        };
        if (alt.default !== undefined) {
          newAlt.default = alt.default;
        }
        return newAlt;
      });
    } else {
      // Single object case
      const singleAlt: { language: string; default?: boolean; url: string } = { // Explicitly type singleAlt
        language: dataSeo.alternates.language,
        url: dataSeo.alternates.url,
      };
      if (dataSeo.alternates.default !== undefined) {
        singleAlt.default = dataSeo.alternates.default;
      }
      homeSeo.alternates = singleAlt;
    }
  }

  if (!data) {
    return [{title: defaultTitle}, {description: defaultDescription}];
  }

  return getSeoMeta(homeSeo);
};

// Loading fallback component
const SectionFallback = () => (
  <div className="text-center py-10 md:py-16 bg-contrast">
    <div className="container mx-auto px-6">
      <div className="animate-pulse">
        <div className="h-8 bg-neutral-200 max-w-md mx-auto rounded mb-8"></div>
        <div className="h-4 bg-neutral-200 max-w-sm mx-auto rounded mb-4"></div>
        <div className="h-4 bg-neutral-200 max-w-lg mx-auto rounded"></div>
      </div>
    </div>
  </div>
);

export default function Homepage() {
  const {product} = useLoaderData<typeof loader>();

  return (
    <>
      {/* 1. HERO - Brand promise and emotional impact */}
      {product && <Hero product={product} />}

      {/* 2. KEY BENEFITS - Clear value propositions */}
      <KeyBenefitsSection />

      {/* 3. DEVICE SHOWCASE - Product in detail */}
      <DeviceShowcaseSection /> 

      {/* 4. RESULTS TIMELINE - Manage expectations, show journey */}
      <ResultsTimelineSection />

      {/* 5. SCIENCE & TECHNOLOGY - Build trust and credibility */}
      <ScienceTechnologySection />

      {/* 6. TESTIMONIALS - Social proof */}
      <TestimonialsSection />

      {/* 7. FOUNDER STORY - Connect emotionally */}
      <FounderStorySection /> 

      {/* 8. PRODUCT SPECIFICATIONS - Detailed info */}
      <ProductSpecificationsSection />

      {/* 9. FAQ - Address concerns */}
      <FAQSection />

      {/* 10. FINAL CONVERSION - Strong CTA, reinforce offer */}
      <FinalConversionSection />

      {/* Existing Lazy Loaded Sections (Commented out - decide if needed) */}
      {/* <Suspense fallback={<SectionFallback />}>
        <ProblemSolutionSection />
        <SocialProofBanner />
        <BeforeAfterSliderSection />
        <HairLossVisualization />
        <SelfCareRitualSection />
        <ResultsTimeline /> 
        <ProductHighlight product={product} />
        <InteractiveScienceSection />
      </Suspense> */}
    </>
  );
} 