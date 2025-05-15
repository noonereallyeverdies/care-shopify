import React from 'react';
import { LoaderFunctionArgs, json } from '@shopify/remix-oxygen';
import { useLoaderData } from '@remix-run/react';

// Import our simplified component
import CleanGirlHero from '~/components/sections/CleanGirlHero';

// We'll add components back one by one after fixing the initial error

export async function loader({ context }: LoaderFunctionArgs) {
  return json({
    heroData: {
      headline: "effortless healthy hair starts today",
      subheadline: "your hair care ritual just got an upgrade",
      urgencyText: "limited early access - join the waitlist",
      socialProof: "loved by 47k+ people worldwide",
      ctaText: "start your glow up",
      ctaSecondary: "see real results"
    }
  });
}

export default function CleanGirlLanding() {
  const { heroData } = useLoaderData<typeof loader>();
  
  return (
    <main className="clean-girl-landing bg-stone-50">
      {/* Using our simplified component */}
      <CleanGirlHero data={heroData} />
      
      {/* Placeholder for other sections */}
      <div className="p-12 bg-stone-100 text-center">
        <h2 className="text-2xl font-light mb-4">More sections coming soon</h2>
        <p className="text-stone-600">We'll add the remaining sections once we've fixed the core issues.</p>
      </div>
    </main>
  );
}

export function meta() {
  return [
    { title: 'care•atin | effortless healthy hair' },
    { name: 'description', content: 'gentle light therapy for naturally fuller, healthier hair. join thousands who made healthy hair their daily ritual.' },
    { property: 'og:title', content: 'care•atin | your healthy hair glow up starts here' },
    { property: 'og:description', content: 'clinically gentle technology that fits your routine. 5 minutes daily for visibly healthier hair.' },
    { property: 'og:image', content: '/images/clean-girl-hero.jpg' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ];
}
