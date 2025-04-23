import React, {useRef, useState, useEffect, Suspense, lazy} from 'react';
import {
  defer,
  type MetaArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {
  Await,
  useLoaderData,
  Link,
  useLocation,
} from '@remix-run/react';
import {
  getSeoMeta,
  type SeoConfig,
} from '@shopify/hydrogen';
import type { Shop, MoneyV2 } from '@shopify/hydrogen/storefront-api-types';
import {
  Layers,
  Shield,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import {
  motion,
  useScroll,
  useTransform,
  useAnimation,
  useInView,
  animate
} from 'framer-motion';

import {Testimonials} from '~/components/sections/Testimonials';
import {Hero} from '~/components/sections/Hero';
import {ScienceHub} from '~/components/sections/ScienceHub';
import {FoundersVision} from '~/components/sections/FoundersVision';
import {JournalSignup} from '~/components/sections/JournalSignup';
import {seoPayload} from '~/lib/seo.server';
import {HOMEPAGE_PRODUCT_QUERY} from '~/queries/homepage';
import { LogoMarquee } from '~/components/sections/LogoMarquee';
import { FaqAccordion } from '~/components/sections/FaqAccordion';
import { Modal } from '~/components/Shared/Modal';
import { SectionWrapper } from '~/components/ui/layouts/SectionWrapper';
import { AsymmetricalSection } from '~/components/ui/layouts/AsymmetricalSection';
import { SectionIcon } from '~/components/ui/SectionIcon';
import { PulseDot } from '~/components/ui/PulseDot';
import { FeatureListItem } from '~/components/ui/FeatureListItem';
import { PrimaryButton } from '~/components/ui/buttons/PrimaryButton';
import { AnimatedCounter } from '~/components/Shared/AnimatedCounter';
import { AnimatedTextWord } from '~/components/Shared/AnimatedTextWord';

// Dynamic Imports
const TabbedContent = lazy(() => 
  import('~/components/sections/TabbedContent').then(module => ({ default: module.TabbedContent }))
);
const ResultsTimeline = lazy(() => 
  import('~/components/sections/ResultsTimeline').then(module => ({ default: module.ResultsTimeline }))
);

export const headers = {
  'Cache-Control': 'public, max-age=60',
};

interface VariantOption {
  name: string;
  value: string;
}

interface Variant {
  id: string;
  availableForSale: boolean;
  quantityAvailable?: number;
  selectedOptions: VariantOption[];
  price: MoneyV2;
  compareAtPrice?: MoneyV2;
  sku?: string;
  title: string;
  unitPrice?: MoneyV2;
  product: {title: string; handle: string};
}

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
    nodes: Variant[];
  };
  seo?: {
    title?: string;
    description?: string;
  };
}

export async function loader({request, context, params}: LoaderFunctionArgs) {
  const {language, country} = context.storefront.i18n;
  const {storefront, env} = context;

  if (
    params.locale &&
    params.locale.toLowerCase() !== `${language}-${country}`.toLowerCase()
  ) {
    throw new Response(null, {status: 404});
  }
  
  try {
    console.log('[Homepage Loader] Fetching product data...');
    const {shop, product: fetchedProduct} = await storefront.query<{
      shop: Shop;
      product: HomepageProduct | null;
    }>(
      HOMEPAGE_PRODUCT_QUERY,
      {
        variables: {
          handle: 'photonique-touch',
          country: country,
          language: language,
        },
      },
    );
    console.log('[Homepage Loader] Response received.');

    if (!fetchedProduct) {
      console.error('[Homepage Loader] Product not found handle: photonique-touch');
    }

    console.log('[Homepage Loader] Product data:', fetchedProduct ? `ID: ${fetchedProduct.id}` : 'null');

    const seo = seoPayload.home({url: request.url});

    const storeDomain = env.PUBLIC_STORE_DOMAIN || shop?.primaryDomain?.url || 'luminancecare.myshopify.com';
    const cleanStoreDomain = storeDomain.replace(/^https?:\/\//, '').replace(/\/$/, '');

    const deferredData = {
      shop,
      product: fetchedProduct,
      analytics: {
        pageType: 'home',
      },
      seo,
      storeDomain: cleanStoreDomain,
    };

    console.log('[Homepage Loader] Returning deferred data...');
    return defer(deferredData);
  } catch (error) {
    console.error('[Homepage Loader] Error fetching data:', error);
    throw error;
  }
}

export const meta = ({data}: MetaArgs<typeof loader>) => {
  if (!data?.seo) {
    return [
        {title: 'care•atin | The Science of Shine'},
        {description: 'Default description if SEO data is missing.'}
    ];
  }
  return getSeoMeta(data.seo as SeoConfig);
};

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={data.product} errorElement={<div>Error loading product!</div>}>
          {(resolvedProduct) => (
            <>
              <Hero product={resolvedProduct as HomepageProduct} />

              <motion.section 
                className="py-24 bg-contrast" 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="max-w-3xl mx-auto px-6 text-center">
                  <h2 className="mb-6 text-3xl md:text-4xl lg:text-5xl font-semibold text-neutral-900 tracking-tight">
                    <AnimatedTextWord text="Rooted in Science, Crafted for You" />
                     <span className="sr-only">Rooted in Science, Crafted for You</span>
                  </h2>
                  <p className="text-lg md:text-xl text-neutral-700 leading-relaxed">
                    OMI Wellbeauty merges Nobel Prize-winning science with nature's intelligence. Our IFP Hair Growth Peptide™ activates follicles at the cellular level for stronger, healthier hair.
                  </p>
                </div>
              </motion.section>

              <LogoMarquee />

              <SectionWrapper className="text-center py-24">
                <SectionIcon icon={Layers} />
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-neutral-900 mb-4 tracking-tight">
                  Feel the glow of healthy hair, multi<PulseDot />tasked
                </h2>
                <p className="text-lg md:text-xl text-neutral-700 leading-relaxed max-w-3xl mx-auto tracking-normal">
                  Rediscover confidence with hair that looks and feels full, vibrant, and resilient. Our <span className="font-medium text-rose-500">Photonique Touch</span> combines red light therapy, precise nourishment, and soothing scalp massage – working <em className="not-italic font-medium text-neutral-800">with</em> your body for healthier hair from the source.
                </p>
                <p className="text-sm text-neutral-600 mt-6 tracking-normal">
                  We believe in your hair's natural potential.
                </p>
              </SectionWrapper>
            </>
          )}
        </Await>
      </Suspense>

      {isMounted && (
        <Suspense fallback={<div>Loading Tabs...</div>}> 
          <TabbedContent />
        </Suspense>
      )}

      <AsymmetricalSection className="bg-gradient-to-b from-white via-neutral-50/50 to-neutral-50">
        <motion.div 
          className="col-span-12 md:col-span-5 lg:col-span-4 mb-12 md:mb-0 px-6 md:px-8 flex flex-col justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionIcon icon={Shield} />
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-5 tracking-tight">
            Why a multi<PulseDot />functional approach matters
          </h2>
          <p className="text-base md:text-lg text-neutral-700 mb-8 leading-relaxed">
            Traditional methods treat symptoms. Our approach addresses the <em className="not-italic font-medium text-neutral-800">complete ecosystem</em> of hair health, combining three essential actions.
          </p>
          <div className="space-y-4 mb-8">
             <FeatureListItem icon={Shield} text="Clinically tested and dermatologist approved" />
             <FeatureListItem icon={Sparkles} text="94% reported increased shine and vitality" />
             <FeatureListItem icon={Layers} text="Visible results in as little as 14 days" />
          </div>
          
          <div className="mt-10 pt-8 border-t border-neutral-200/60 grid grid-cols-2 gap-6 text-center">
            <div>
              <div className="text-4xl font-semibold text-rose-600 mb-1">
                <AnimatedCounter targetValue={94} suffix="%" />
              </div>
              <p className="text-sm text-neutral-600">Increased Shine & Vitality</p>
            </div>
            <div>
              <div className="text-4xl font-semibold text-rose-600 mb-1">
                <AnimatedCounter targetValue={88} suffix="%" />
              </div>
              <p className="text-sm text-neutral-600">Stronger, Fuller Looking Hair</p>
            </div>
          </div>

          <div className="mt-12">
            <PrimaryButton to="/products/photonique-touch" text="Discover the device" icon={ArrowUpRight} />
          </div>
        </motion.div>
        <motion.div  
          className="col-span-12 md:col-span-7 lg:col-span-8 overflow-hidden relative min-h-[400px] md:min-h-0 h-[60vh] md:h-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <img src="/images/nature_shot.jpg" alt="Natural hair care ingredients" className="absolute inset-0 w-full h-full object-cover object-center rounded-l-3xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-end p-8 md:p-12">
            <blockquote className="text-white max-w-lg" >
              <p className="text-lg md:text-xl font-light italic mb-3 leading-snug"> "Nature doesn't create in isolation. Neither should your hair care." </p>
              <p className="text-xs uppercase tracking-wider font-medium opacity-80"> Dr. Elena Rostova — Lead Formulator </p>
            </blockquote>
          </div>
        </motion.div>
      </AsymmetricalSection>

      {/* Render ResultsTimeline dynamically */}
      {isMounted && (
        <Suspense fallback={<div>Loading Timeline...</div>}> 
          <ResultsTimeline />
        </Suspense>
      )}

      <ScienceHub />

      <FoundersVision />

      <SectionWrapper 
        className="text-center bg-neutral-50 relative z-0"
      >
        <SectionIcon icon={Sparkles} />
        <h2 
          className="text-3xl md:text-4xl lg:text-5xl font-semibold text-neutral-900 mb-5 tracking-tight text-center"
        >
           Experience the benefits
         </h2>
         <p  
           className="text-lg text-center md:text-xl text-neutral-700 mb-10 max-w-2xl mx-auto leading-relaxed tracking-normal"
         >
           See why our 3-in-1 technology is revolutionizing proactive hair care.
         </p>
         
         <button 
            onClick={() => setIsInfoModalOpen(true)}
            className="btn-primary-refined mx-auto"
          >
            Learn More (Open Modal)
         </button>
      </SectionWrapper>

      <Testimonials />

      <FaqAccordion />

      <JournalSignup />

      <Modal 
        isOpen={isInfoModalOpen} 
        onClose={() => setIsInfoModalOpen(false)} 
        title="Informational Modal"
      >
        <div>
          <p className="text-sm text-neutral-600 mb-4">
            This is a demonstration of the base modal component. You can put any content here, such as detailed information, forms, or even other components.
          </p>
          <p className="text-sm text-neutral-600">
            Click the overlay or the 'X' button to close.
          </p>
          <div className="mt-6 text-right">
            <button 
              onClick={() => setIsInfoModalOpen(false)} 
              className="btn-glossier" 
            >
              Got it!
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
