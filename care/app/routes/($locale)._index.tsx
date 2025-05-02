import React, {useRef, useState, useEffect, Suspense} from 'react';
import {
  json,
  defer,
  type LoaderFunctionArgs,
  type MetaArgs,
} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link, useLocation} from '@remix-run/react';
import {
  AnalyticsPageType,
  flattenConnection,
  getSeoMeta,
  type SeoConfig,
} from '@shopify/hydrogen';
import {
  type Collection,
  type Product,
  type Shop,
  type MoneyV2,
} from '@shopify/hydrogen/storefront-api-types';
import {
  Layers,
  Shield,
  Sparkles,
  ArrowUpRight,
  ShoppingCart,
  Star,
} from 'lucide-react';
import {
  motion,
  useScroll,
  useTransform,
  useAnimation,
  useInView,
  animate,
} from 'framer-motion';

import {CACHE_SHORT, routeHeaders} from '~/data/cache';
import {seoPayload} from '~/lib/seo.server';
import {HOMEPAGE_PRODUCT_QUERY} from '~/queries/homepage';
import {Hero} from '~/components/sections/Hero';
import {BeforeAfterSliderSection} from '~/components/sections/BeforeAfterSliderSection';
import {SelfCareRitualSection} from '~/components/sections/SelfCareRitualSection';
import {ProductHighlight} from '~/components/sections/ProductHighlight';
import {ClientOnly} from '~/components/utility/ClientOnly';
import {InteractiveScienceSection} from '~/components/sections/InteractiveScienceSection';
import {HowItWorksSection} from '~/components/HowItWorksSection';
import {ComparisonSection} from '~/components/ComparisonSection';
import { EmotionalCtaSection } from '~/components/sections/EmotionalCtaSection';
import { HairStagesSection } from '~/components/sections/HairStagesSection';
import { ResultsJourneySection } from '~/components/sections/ResultsJourneySection';
import { PricingSection } from '~/components/sections/PricingSection';

export const headers = {
  'Cache-Control': 'public, max-age=60',
};

export interface HomepageProduct {
  id: string;
  title: string;
  handle: string;
  descriptionHtml: string;
  description: string;
  vendor?: string;
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
  availableForSale?: boolean;
  priceRange?: {
    minVariantPrice: MoneyV2;
  };
}

// --- Type Definitions for Loader Response ---
interface ErrorResponse {
  message: string;
  error: string;
}

// Type guard to check for our specific error response structure
function isErrorResponse(response: any): response is ErrorResponse {
  return (
    response &&
    typeof response === 'object' &&
    typeof response.message === 'string' &&
    typeof response.error === 'string'
  );
}
// --- End Type Definitions ---

export async function loader({params, context}: LoaderFunctionArgs) {
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
      storeDomain: storeDomain,
    };
    
    return defer(deferredData, {
      headers: {
        'Cache-Control': CACHE_SHORT,
        ...routeHeaders,
      },
    });
  } catch (error) {
    console.error('[Homepage Loader] Error fetching data:', error);
    
    // Determine status code based on error type if possible
    const status = error instanceof Response ? error.status : 500;
    const message = error instanceof Error ? error.message : 'Internal server error';

    // Always return a new, valid JSON Response
    return new Response(JSON.stringify({ message, error: String(error) }), {
      status: status,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store', // Don't cache errors
      },
    });
  }
}

// Type MetaArgs data as SuccessData | ErrorResponse | undefined
export const meta = ({data}: MetaArgs<typeof loader>) => {
  // Use the type guard
  if (isErrorResponse(data)) {
    return [{ title: 'Error' }, { description: data.message }];
  }
  
  // Proceed assuming inferred shape (or null/undefined), keep using optional chaining
  const shopName = data?.shop?.name ?? 'care•atin';
  const defaultTitle = `${shopName} | The Science of Shine`;
  const defaultDescription = `Discover ${shopName}'s innovative approach to hair care, combining red light therapy and science for healthier, stronger hair.`;

  const homeSeo = data?.seo
    ? {
        title: `care•atin Red Light Therapy Hair Growth Device | Visible Results`,
        description: `Revitalize your hair with care•atin's patented red light therapy device. Clinically proven for thicker, fuller hair growth & reduced shedding. Experience visible results & regain confidence. Shop now!`,
        ...(data.seo ?? {}),
        titleTemplate: `%s`,
      } as SeoConfig
    : { title: defaultTitle, description: defaultDescription };

  // Adjust check slightly - if data exists and is not error, check seo
  if (!data || isErrorResponse(data) || !data.seo) {
    return [{title: defaultTitle}, {description: defaultDescription}];
  }

  return getSeoMeta(homeSeo);
};

export default function Homepage() {
  // Revert useLoaderData type
  const loaderData = useLoaderData<typeof loader>();

  // Use the type guard
  if (isErrorResponse(loaderData)) {
    console.error("Error loading homepage data:", loaderData.error);
    return (
      <div className="container mx-auto px-6 py-20 text-center text-critical">
        <h1 className="text-2xl font-bold mb-4">error loading page</h1>
        <p>{loaderData.message || 'an unexpected error occurred.'}</p>
        <p>please try refreshing the page.</p>
      </div>
    );
  }

  // If not error, assume inferred shape
  const product = loaderData?.product;
  const storeDomain = loaderData?.storeDomain;

  // Add check for storeDomain as well, though less critical for render
  if (!storeDomain) {
    console.warn("Homepage storeDomain is missing from loader data.");
    // Decide if this is critical enough to block render, maybe not.
  }

  if (!product) {
     console.error("Homepage product data is missing after loader resolution.");
     return (
      <div className="container mx-auto px-6 py-20 text-center text-warning">
        <h1 className="text-2xl font-bold mb-4">product data unavailable</h1>
        <p>we couldn't load the product information for this page.</p>
        <p>please try again later.</p>
      </div>
    );
  }

  // State to track dynamically loaded components
  const [BeforeAfterSection, setBeforeAfterSection] = useState<React.ComponentType<any> | null>(null);
  
  // Remove state for HairLossVisualization
  // const [HairLossSection, setHairLossSection] = useState<React.ComponentType<any> | null>(null);
  
  // Load components on the client side
  useEffect(() => {
    // Load Before/After component
    import('~/components/sections/BeforeAfterSliderSection')
      .then((module) => 
        setBeforeAfterSection(() => module.BeforeAfterSliderSection),
      )
      .catch((error) => {
        console.error('Failed to load BeforeAfterSliderSection:', error);
      });

    // Remove loading logic for HairLossVisualization
    // import('~/components/sections/HairLossVisualization')
    //   .then((module) => setHairLossSection(() => module.HairLossVisualization))
    //   .catch((error) => {
    //     console.error('Failed to load HairLossVisualization:', error);
    //   });
  }, []);

  // Basic loading fallback UI
  const loadingSectionFallback = (
    <div className="text-center py-16 md:py-24 bg-contrast">
      <div className="container mx-auto px-6">
        <div className="animate-pulse">
          <div className="h-8 bg-neutral-200 max-w-md mx-auto rounded mb-8"></div>
          <div className="h-4 bg-neutral-200 max-w-sm mx-auto rounded mb-4"></div>
          <div className="h-4 bg-neutral-200 max-w-lg mx-auto rounded"></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Section Order Updated: */}
      
      {/* 1. HERO */}
      <Hero product={product} />

      {/* 3. How It Works (Section 2) */}
      <HowItWorksSection />

      {/* 4. Testimonials (Section 3) */}
      <ClientOnly>
        {BeforeAfterSection ? <BeforeAfterSection /> : loadingSectionFallback}
      </ClientOnly>

      {/* 5. Emotional CTA (Section 6) - Replaces Social Proof */}
      <EmotionalCtaSection />

      {/* 6. Science (Section 4) */}
      <InteractiveScienceSection />
      
      {/* 7. Comparison Table (Section 5) - Replaces ProblemSolution */}
      <ComparisonSection />

      {/* 8. Hair Stages (Section 7) - Replaces HairLossVisualization */}
      <HairStagesSection />

      {/* 9. Ritual (Section 8) */}
      <SelfCareRitualSection />

      {/* 10. Results Journey (Section 10) - Replaces ResultsTimeline */}
      <ResultsJourneySection />

      {/* 11. Pricing (Section 9) */}
      {storeDomain && product ? (
         <PricingSection product={product} storeDomain={storeDomain} /> 
      ) : (
         <div className="text-center py-10 text-neutral-500">Pricing unavailable.</div>
      )}
      
      {/* 12. Final CTA (Section 10 - Product Focus) */}
      <ProductHighlight product={product as any} />
    </>
  );
}

