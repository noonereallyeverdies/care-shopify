import React from 'react';
import {
  defer,
  type MetaArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {Await, useLoaderData} from '@remix-run/react';
import {getSeoMeta, type SeoConfig} from '@shopify/hydrogen';
import {Testimonials} from '~/components/sections/Testimonials';
import {seoPayload} from '~/lib/seo.server';
import {Suspense} from 'react';
import {Hero} from '~/components/sections/Hero';
import {Benefits} from '~/components/sections/Benefits';
import {LampDemo} from '~/components/ui/Lamp';
import {HOMEPAGE_PRODUCT_QUERY} from '~/queries/homepage';
import type {Shop, MoneyV2} from '@shopify/hydrogen/storefront-api-types';

export const headers = {
  'Cache-Control': 'public, max-age=60',
};

export type HomepageProduct = {
  id: string;
  title: string;
  description: string;
  handle: string;
  featuredImage?: {
    url: string;
    altText: string;
    width: number;
    height: number;
  } | null;
  priceRange: {
    minVariantPrice: MoneyV2;
  };
  variants: {
    nodes: Array<{
      id: string;
      availableForSale: boolean;
      price: MoneyV2;
      compareAtPrice?: MoneyV2 | null;
      selectedOptions: Array<{
        name: string;
        value: string;
      }>;
    }>;
  };
};

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront, request, env} = context;
  
  try {
    console.log('Fetching product data...');
    const response = await storefront.query<{
      product: HomepageProduct | null;
      products: {
        nodes: Array<{ handle: string }>;
      };
      shop: Shop | null;
    }>(HOMEPAGE_PRODUCT_QUERY, {
      variables: {
        handle: 'photonique-touch',
      },
    });

    console.log('Response received:', JSON.stringify(response, null, 2));

    // If the specified product is not found, try to use the first available product
    let product = response.product;
    if (!product && response.products?.nodes?.length > 0) {
      console.log('Trying first available product...');
      const firstProductHandle = response.products.nodes[0].handle;
      const fallbackResponse = await storefront.query<{
        product: HomepageProduct | null;
      }>(HOMEPAGE_PRODUCT_QUERY, {
        variables: {
          handle: firstProductHandle,
        },
      });
      product = fallbackResponse.product;
    }

    if (!product) {
      console.error('No products found in response:', response);
      throw new Response('No products found', {
        status: 404,
        statusText: 'No products found in store',
      });
    }

    // Get the store domain from env or shop data
    const storeDomain = env.PUBLIC_STORE_DOMAIN || response.shop?.primaryDomain?.url || 'luminancecare.myshopify.com';
    const cleanStoreDomain = storeDomain.replace(/^https?:\/\//, '').replace(/\/$/, '');

    // Safely construct the URL
    let url: string;
    try {
      if (request?.url) {
        url = new URL(request.url).toString();
      } else if (env.PUBLIC_STORE_DOMAIN) {
        // Make sure the domain has a protocol
        const domain = env.PUBLIC_STORE_DOMAIN.startsWith('http') 
          ? env.PUBLIC_STORE_DOMAIN 
          : `https://${env.PUBLIC_STORE_DOMAIN}`;
        url = domain;
      } else {
        url = 'https://luminancecare.com'; // Fallback URL
      }
    } catch (urlError) {
      console.error('Error constructing URL:', urlError);
      url = 'https://luminancecare.com'; // Fallback URL
    }

    const seo: SeoConfig = {
      title: 'Red Light Therapy Device | Luminance Care',
      description: 'Experience the power of red light therapy with our advanced device. Enhance your hair growth and skin health naturally.',
      handle: 'home',
      url,
      titleTemplate: '%s | Luminance Care',
      robots: {
        noIndex: false,
        noFollow: false,
      },
    };

    return defer({ 
      product,
      shop: response.shop,
      seo,
      storeDomain: cleanStoreDomain,
    });
  } catch (error) {
    console.error('Error in homepage loader:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
      });
    }
    throw new Response('Error loading homepage data', {
      status: 500,
      statusText: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

export const meta = ({data}: MetaArgs<typeof loader>) => {
  if (!data) {
    return [
      {title: 'Red Light Therapy Device | Luminance Care'},
      {description: 'Experience the power of red light therapy with our advanced device. Enhance your hair growth and skin health naturally.'},
    ];
  }
  return getSeoMeta(data.seo as SeoConfig);
};

export default function Homepage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={data.product}>
          {(product) => <Hero product={product} />}
        </Await>
      </Suspense>
      <LampDemo />
      <Benefits />
      <Testimonials />
    </>
  );
}
