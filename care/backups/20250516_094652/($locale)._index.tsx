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

      {/* 2. PROBLEM VISUALIZATION - "Hair Journey - The Stages" */}
      <motion.section
        className="py-16 md:py-24 bg-neutral-50"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-neutral-800">
            See the Stages &amp; Critical Window to Act
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto mb-12">
            Understanding where you are in your hair journey helps tailor the most effective care•atin approach.
          </p>
        </div>
        <ClientOnly>
          {HairLossSection ? <HairLossSection /> : loadingSectionFallback}
        </ClientOnly>
      </motion.section>

      {/* 3. PROBLEM CONTEXT - "Traditional Treatments / Why Old Methods" - Headline is in the component */}
      <ProblemSolutionSection /> 

      {/* 4. SOLUTION & PROOF - Before/After transformation with real results */}
      <ClientOnly>
        {BeforeAfterSection ? <BeforeAfterSection /> : loadingSectionFallback}
      </ClientOnly>

      {/* 5. SOCIAL PROOF - Statistics and testimonials */}
      <SocialProofBanner />

      {/* 6. CONSOLIDATED SCIENCE SECTION - "How Care•atin Works" */}
      <motion.section
        className="py-16 md:py-24 bg-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
         <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-neutral-800">
            The Science of Shine: How care•atin Works
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto mb-12">
            Unlock the secrets to healthier hair with our Triple-Action Synergy: Red Light Therapy, Scalp Massage, and Nutrient-Rich Oil Delivery.
          </p>
        </div>
        <InteractiveScienceSection />
      </motion.section>

      {/* 7. USAGE - Simple 3-step ritual */}
      <SelfCareRitualSection />

      {/* 8. RESULTS JOURNEY - "90-Day Transformation" */}
      <motion.section
        className="py-16 md:py-24 bg-neutral-50"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 text-center" id="results-section">
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-neutral-800">
            The care•atin Glow-Up: Your 90-Day Transformation
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto mb-12">
            Witness the science-backed journey to radiant, revitalized hair. Real users, real progress—see what's possible.
          </p>
        </div>
        <ResultsTimeline />
      </motion.section>
      
      {/* 9. CLOSING ACTION - Product showcase and final CTA */}
      <ProductHighlight product={product} />
    </>
  );
}
