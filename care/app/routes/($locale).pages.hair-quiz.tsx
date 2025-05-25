import React from 'react';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {Seo} from '@shopify/hydrogen';
import {HairQuiz} from '~/components/sections/HairQuiz';
import {PageHeader} from '~/components/Text';

// Helper for SEO
const seoPayload = {
  page: ({title, description, url}: {title: string; description: string; url: string}) => ({
    title,
    description,
    url,
    handle: url.substring(url.lastIndexOf('/') + 1),
  }),
};

// Define loader data and SEO
export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;
  const seo = seoPayload.page({
    title: 'Personalized Hair Assessment - Care•Atin',
    description: 'Take our personalized hair quiz to discover the perfect red light therapy routine tailored to your unique hair needs.',
    url: '/pages/hair-quiz'
  });

  return defer({ seo });
}

// Define the page component
export default function HairQuizPage() {
  const {seo} = useLoaderData<typeof loader>();

  return (
    <>
      <Seo type="page" data={seo} />
      
      {/* Main Title */}
      <PageHeader
        heading="Your Personalized Hair Assessment"
        className="text-3xl md:text-5xl font-light text-primary py-16 md:py-20 lg:py-20 text-center bg-contrast"
      />

      {/* Hair Quiz Component */}
      <HairQuiz />
    </>
  );
} 