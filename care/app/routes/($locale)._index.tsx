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
import {HairLossVisualization} from '~/components/sections/HairLossVisualization';
import {ProblemSolutionSection} from '~/components/sections/ProblemSolutionSection';
import {SelfCareRitualSection} from '~/components/sections/SelfCareRitualSection';
import {ResultsTimeline} from '~/components/sections/ResultsTimeline';
import {ProductHighlight} from '~/components/sections/ProductHighlight';
import {ClientOnly} from '~/components/utility/ClientOnly';
import {SocialProofBanner} from '~/components/sections/SocialProofBanner';
import {InteractiveScienceSection} from '~/components/sections/InteractiveScienceSection';

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
        'Cache-Control': CACHE_SHORT,
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

  const homeSeo: SeoConfig = {
    title: `care•atin Red Light Therapy Hair Growth Device | Visible Results`,
    description: `Revitalize your hair with care•atin's patented red light therapy device. Clinically proven for thicker, fuller hair growth & reduced shedding. Experience visible results & regain confidence. Shop now!`,
    ...(data?.seo ?? {}),
    titleTemplate: `%s`,
  };

  if (!data) {
    return [{title: defaultTitle}, {description: defaultDescription}];
  }

  return getSeoMeta(homeSeo);
};

export default function Homepage() {
  const {product} = useLoaderData<typeof loader>();

  // State to track dynamically loaded components
  const [BeforeAfterSection, setBeforeAfterSection] = useState<React.ComponentType<any> | null>(null);
  
  const [HairLossSection, setHairLossSection] = useState<React.ComponentType<any> | null>(null);
  
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

    // Load HairLoss component
    import('~/components/sections/HairLossVisualization')
      .then((module) => setHairLossSection(() => module.HairLossVisualization))
      .catch((error) => {
        console.error('Failed to load HairLossVisualization:', error);
      });
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
      {/* 1. HERO - Brand promise and emotional impact */}
        <Hero product={product} />
      {/* 2. PROBLEM VISUALIZATION - Showing the cost of waiting */}
      <ClientOnly>
        {HairLossSection ? <HairLossSection /> : loadingSectionFallback}
      </ClientOnly>
      {/* 3. PROBLEM CONTEXT - Detailed problem explanation */}
      <ProblemSolutionSection />
      {/* 4. SOLUTION & PROOF - Before/After transformation with real results */}
      <ClientOnly>
        {BeforeAfterSection ? <BeforeAfterSection /> : loadingSectionFallback}
      </ClientOnly>
      {/* 5. SOCIAL PROOF - Statistics and testimonials */}
      <SocialProofBanner />
      {/* 6. CONSOLIDATED SCIENCE SECTION */}
      <InteractiveScienceSection />
      {/* 7. USAGE - Simple 3-step ritual */}
      <SelfCareRitualSection />
      {/* 8. RESULTS JOURNEY - 90-day transformation timeline */}
      <div id="results-section">
      <ResultsTimeline />
      </div>
      {/* 9. CLOSING ACTION - Product showcase and final CTA */}
      <ProductHighlight product={product} />
    </>
  );
}
