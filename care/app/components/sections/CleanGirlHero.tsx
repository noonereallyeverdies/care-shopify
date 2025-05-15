import React from 'react';
import { Link } from '@remix-run/react';

type HeroData = {
  headline: string;
  subheadline: string;
  urgencyText: string;
  socialProof: string;
  ctaText: string;
  ctaSecondary: string;
};

export default function CleanGirlHero({ data }: { data: HeroData }) {
  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-light mb-6">{data.headline}</h1>
        <p className="text-xl mb-8">{data.subheadline}</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/products/photonique-touch" 
            className="px-8 py-4 rounded-full bg-[#C49B7C] text-white"
          >
            {data.ctaText}
          </Link>
          <Link 
            to="/results" 
            className="px-8 py-4 rounded-full border border-[#C49B7C] text-[#C49B7C]"
          >
            {data.ctaSecondary}
          </Link>
        </div>
        
        <p className="mt-8 text-sm">{data.socialProof}</p>
        <p className="mt-4 text-sm text-red-500">{data.urgencyText}</p>
      </div>
    </section>
  );
}
