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
  ShoppingCart,
  Star
} from 'lucide-react';
import {
  motion,
  useScroll,
  useTransform,
  useAnimation,
  useInView,
  animate
} from 'framer-motion';

import {Hero} from '~/components/sections/Hero';
import {seoPayload} from '~/lib/seo.server';
import {HOMEPAGE_PRODUCT_QUERY} from '~/queries/homepage';
import { ProblemSolutionSection } from "~/components/sections/ProblemSolutionSection";
import { SelfCareRitualSection } from "~/components/sections/SelfCareRitualSection";
import { VisualScienceSection } from "~/components/sections/VisualScienceSection";
import { ResultsTimeline } from "~/components/sections/ResultsTimeline";

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
  const {product} = useLoaderData<typeof loader>();

  return (
    <>
      <div className="relative">
        <Hero product={product} />
      </div>

      <ProblemSolutionSection />
      
      <SelfCareRitualSection />

      <ResultsTimeline />

      <VisualScienceSection />
    </>
  );
}
