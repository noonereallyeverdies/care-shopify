import { validateLocaleParameter } from "~/lib/locale-utils";
import {
  json,
  type MetaArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {getSeoMeta} from '@shopify/hydrogen';

import {PageHeader} from '~/components/Text';
import {routeHeaders} from '~/data/cache';
import {seoPayload} from '~/lib/seo.server';

export const headers = routeHeaders;

export async function loader({request, context}: LoaderFunctionArgs) {
  validateLocaleParameter(args);  const seo = seoPayload.page({
    page: {
      title: 'Our Story | care•atin',
      seo: {
        title: 'Our Story | care•atin',
        description: 'Discover our journey to create clinically-proven red light therapy devices that transform your hair from the inside out.',
      }
    },
    url: request.url,
  });

  return json({seo});
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function OurStory() {
  return (
    <>
      <div className="our-story-page max-w-4xl mx-auto px-4">
        <section className="text-center py-16 md:py-24">
          <h1 className="text-3xl md:text-5xl font-serif font-medium lowercase mb-8">our story: a journey to healthier hair through nature and science</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">At care•atin, we believe that beautiful hair begins with a healthy scalp and strong follicles. Our journey started with a simple question: why do most hair treatments focus only on styling the visible hair, rather than nourishing the living cells where hair actually grows?</p>
        </section>
        
        <section className="mb-20">
          <div className="bg-rose-50 rounded-3xl overflow-hidden mb-8">
            <img src="https://cdn.shopify.com/s/files/1/0123/4567/8901/files/founder-image.jpg" alt="Our founder Yvonne" className="w-full h-auto" loading="lazy" />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-serif font-medium lowercase mb-6">our founders' story</h2>
          
          <p className="mb-6">Our founder, Yvonne, struggled with thinning hair for years after hormonal changes and stress took their toll. After trying countless products with minimal results, she discovered the transformative power of red light therapy through her background in biomedical engineering.</p>
          
          <blockquote className="border-l-4 border-rose-300 pl-6 italic my-8 text-lg">
            "I was amazed that something so gentle could create such profound changes at the cellular level. But the existing devices were either clinical-grade expensive or consumer versions that lacked the right specifications. I knew there had to be a better way to make this technology accessible to everyone."
          </blockquote>
          
          <p>Working with a team of hair scientists, dermatologists, and product engineers, care•atin was born – bringing clinical-grade red light therapy into an elegant, easy-to-use home device that delivers real results.</p>
        </section>
        
        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-serif font-medium lowercase mb-10">our philosophy</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-medium mb-4 lowercase">gentle power</h3>
              <p>We believe the most effective solutions often come from working with your body's natural processes, not forcing change through harsh chemicals. Red light therapy enhances your cells' own regenerative abilities, working in harmony with your body's wisdom.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-medium mb-4 lowercase">science-backed beauty</h3>
              <p>Every product decision we make is grounded in peer-reviewed research. We've studied the science extensively to ensure our devices deliver the optimal wavelengths, energy levels, and treatment protocols for maximum efficacy without compromising safety.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-medium mb-4 lowercase">thoughtful design</h3>
              <p>Beauty tools should be a joy to use. We've created devices that you'll want to display proudly on your vanity – not hide away in a drawer. From sustainable materials to intuitive interfaces, every detail has been considered with care.</p>
            </div>
          </div>
        </section>
        
        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-serif font-medium lowercase mb-10">our commitment to you</h2>
          
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4">
                <h3 className="text-xl font-medium mb-2 lowercase">transparency</h3>
              </div>
              <div className="md:w-3/4">
                <p>We'll always be honest about what our products can and cannot do. We share the research behind our technology and provide realistic timelines for results, because we believe educated customers make empowered decisions.</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4">
                <h3 className="text-xl font-medium mb-2 lowercase">continuous improvement</h3>
              </div>
              <div className="md:w-3/4">
                <p>We're constantly integrating new research and customer feedback to make our products even better. Hair science is evolving, and so are we.</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4">
                <h3 className="text-xl font-medium mb-2 lowercase">community care</h3>
              </div>
              <div className="md:w-3/4">
                <p>Your hair journey matters to us. That's why we've built a supportive community where you can share experiences, track progress, and get personalized advice from our team of hair care specialists.</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="mb-20 text-center bg-rose-50 rounded-3xl p-10 md:p-16">
          <h2 className="text-2xl md:text-3xl font-serif font-medium lowercase mb-6">join us on this journey</h2>
          
          <p className="mb-6 max-w-3xl mx-auto">We're more than just a hair care brand – we're a community dedicated to helping you nurture your hair from the inside out. Whether you're dealing with thinning, damage, slow growth, or simply want to maintain healthy hair, care•atin is here to support your unique hair journey.</p>
          
          <p className="text-lg font-serif">Welcome to a new chapter in your relationship with your hair.</p>
          
          <p className="mt-10 italic">With care,<br/>
          The care•atin team</p>
          
          <div className="mt-12">
            <a href="/collections/all" className="inline-block bg-rose-500 text-white px-8 py-3 rounded-full hover:bg-rose-600 transition-colors">shop our products</a>
          </div>
        </section>
      </div>
    </>
  );
} 