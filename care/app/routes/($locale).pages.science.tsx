import React from 'react';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {Seo} from '@shopify/hydrogen';

// import {SplineSceneBasic} from '~/components/ui/SplineSceneBasic'; // Removed import
import {PageHeader, Section} from '~/components/Text'; // Reusable Section component

// Define loader data and SEO - Minimal for now
export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;
  // You could fetch page data from Shopify here if needed
  // const {page} = await storefront.query(PAGE_QUERY, {variables: {handle: 'science'}});
  const seo = seoPayload.page({title: 'The Science - Care•Atin', url: '/pages/science'});

  return defer({ seo });
}

// Define the page component
export default function SciencePage() {
  const {seo} = useLoaderData<typeof loader>();

  return (
    <>
      <Seo type="page" data={seo} />
      {/* Hero Section removed */}
      {/* <SplineSceneBasic /> */}

      {/* Use PageHeader as the main title now */}
       <PageHeader
        heading="The Science Behind Photonique Touch"
        className="text-3xl md:text-4xl font-bold text-primary py-12 md:py-16 lg:py-20 text-center bg-contrast"
      />

      {/* Placeholder for subsequent sections about the science */}
      <Section padding="all" className="py-12 md:py-20">
        <h2 className="text-3xl font-bold text-primary text-center mb-8">How It Works</h2>
        <p className="max-w-2xl mx-auto text-center text-lg leading-relaxed">
          Here you can explain the mechanisms of red light therapy, the specific wavelengths used by Photonique Touch, and the clinical evidence supporting its efficacy for hair health. Use clear, concise language and consider adding diagrams or illustrations.
        </p>
        {/* Add more content blocks, maybe using Grid or FeatureText components */}
      </Section>

      <Section padding="all" className="py-12 md:py-20 bg-primary/5">
        <h2 className="text-3xl font-bold text-primary text-center mb-8">Clinical Studies</h2>
        <p className="max-w-2xl mx-auto text-center text-lg leading-relaxed">
          Link to or summarize relevant clinical studies that validate the claims made about the product. Transparency builds trust.
        </p>
      </Section>
      
      {/* Add more sections as needed */}
    </>
  );
}

// If fetching page content from Shopify, add the query here:
// const PAGE_QUERY = `#graphql ...`;

// Helper for SEO - Assuming you have this utility
const seoPayload = {
  page: ({title, url}: {title: string, url: string}) => ({
    title,
    url,
    handle: url.substring(url.lastIndexOf('/') + 1),
    // Add other SEO properties as needed
  }),
}; 