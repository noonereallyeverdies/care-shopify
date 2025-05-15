import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@remix-run/react';
import { ArrowRight } from 'lucide-react';

// Enhanced journey stages with integrated benefits and emotional impacts
const results = [
  {
    id: 'early',
    title: 'Early Results',
    timeframe: 'First 30 Days',
    benefit: 'Noticeable reduction in daily shedding as red light therapy stabilizes follicles',
    emotional: 'First feeling of relief as you notice less hair in your brush and shower drain',
    testimonial: 'I stopped counting the hairs in my shower drain—that alone was life-changing.',
    stat: { label: 'Less Shedding', value: '-62%' }
  },
  {
    id: 'visible',
    title: 'Visible Growth',
    timeframe: '30-60 Days',
    benefit: 'New hair begins to appear in thinning areas as dormant follicles reactivate',
    emotional: 'Growing excitement as you see new baby hairs along your hairline and part',
    testimonial: 'Seeing those new hairs coming in was the first moment I felt real hope again.',
    stat: { label: 'Follicle Activation', value: '+82%' }
  },
  {
    id: 'transformation',
    title: 'Full Transformation',
    timeframe: '60-90 Days',
    benefit: 'Significant improvement in overall hair density, thickness, and appearance',
    emotional: 'Renewed confidence as others notice and compliment your fuller, healthier hair',
    testimonial: 'I styled my hair for a date without thinking about hiding thin spots. I forgot what that freedom felt like.',
    stat: { label: 'Increased Density', value: '+76%' }
  }
];

export function ScienceJourneySection() {
  return (
    <section className="py-24 relative overflow-hidden" id="science-section">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="brand-heading text-3xl lg:text-4xl mb-6">
            your hair transformation journey
          </h2>
          <p className="brand-body text-neutral-600 mb-8">
            The path to thicker, healthier hair is simple with care•atin's clinically proven technology
          </p>
        </div>
        
        {/* Journey Timeline */}
        <div className="relative mb-20">
          {/* Timeline line */}
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-neutral-200 -translate-y-1/2"></div>
          
          {/* Progress markers */}
          <div className="flex justify-between relative">
            {results.map((stage, index) => (
              <div key={stage.id} className="relative text-center">
                <div className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 w-6 h-6 rounded-full bg-rose-100 border-4 border-rose-500 z-10"></div>
                <div className="mt-8 max-w-xs mx-auto">
                  <h3 className="brand-heading text-xl mb-2 text-rose-600">
                    {stage.title}
                  </h3>
                  <p className="text-neutral-500 mb-3">{stage.timeframe}</p>
                  <p className="text-neutral-600 mb-4">
                    {stage.benefit}
                  </p>
                  <div className="bg-rose-50 p-4 rounded-lg mb-4">
                    <p className="text-neutral-700 font-medium mb-1">Emotional Impact:</p>
                    <p className="text-neutral-600 mb-2">{stage.emotional}</p>
                    <p className="text-sm italic text-rose-600">"{stage.testimonial}"</p>
                  </div>
                  <div className="inline-block bg-white py-2 px-4 rounded-full shadow-sm border border-neutral-100">
                    <span className="text-xl font-light text-rose-500">{stage.stat.value}</span>
                    <span className="text-sm text-neutral-600 ml-2">{stage.stat.label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Science Explanation - Simplified */}
        <div className="bg-neutral-50 rounded-xl p-8 mb-16 max-w-4xl mx-auto">
          <h3 className="brand-heading text-2xl mb-6 text-center">The Science Behind the Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Column: Visualization */}
            <div>
              <div className="aspect-square bg-white rounded-lg overflow-hidden p-8 relative shadow-sm">
                {/* Simple follicle visualization */}
                <div className="w-full h-full flex items-center justify-center">
                  <div className="relative">
                    <svg viewBox="0 0 100 200" width="150" height="300" fill="none">
                      {/* Simplified follicle shape */}
                      <path 
                        d="M30,20 Q50,0 70,20 L70,150 Q50,180 30,150 Z" 
                        fill="#FDA4AF" 
                        strokeWidth="2"
                        stroke="#E5E7EB"
                      />
                      {/* Hair shaft */}
                      <path 
                        d="M50,20 L50,0" 
                        stroke="#4B5563" 
                        strokeWidth="3"
                        strokeOpacity="0.9"
                      />
                      {/* Energy visualization */}
                      <circle 
                        cx="50" 
                        cy="130" 
                        r="15"
                        fill="#FDA4AF"
                        opacity="0.7"
                        className="animate-pulse"
                      />
                    </svg>
                  </div>
                </div>
                
                {/* Energy visualization around follicle */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                  <div className="w-48 h-48 rounded-full bg-rose-500/30 animate-pulse"></div>
                </div>
              </div>
            </div>
            
            {/* Right Column: Text Content */}
            <div>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="mr-4 text-rose-500 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-800 mb-1">Deep Penetration</h4>
                    <p className="text-neutral-600">
                      Red light reaches deep into your hair roots (3-5mm)—unlike topical treatments 
                      that only work on the surface. This helps rejuvenate follicles that other 
                      treatments can't reach.
                    </p>
                    <p className="text-sm text-rose-600 mt-2 italic">What this means for you: No more wasted money on treatments that can't reach the real problem.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 text-rose-500 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-800 mb-1">Cellular Energy</h4>
                    <p className="text-neutral-600">
                      Increases ATP production by up to 54%, giving your follicles the power they 
                      need to create stronger, thicker hair strands from the inside out.
                    </p>
                    <p className="text-sm text-rose-600 mt-2 italic">What this means for you: Visibly fuller hair that feels stronger to the touch.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 text-rose-500 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-800 mb-1">Enhanced Blood Flow</h4>
                    <p className="text-neutral-600">
                      Increases circulation to follicles by 53%, delivering vital nutrients and oxygen 
                      for optimal hair growth and strength.
                    </p>
                    <p className="text-sm text-rose-600 mt-2 italic">What this means for you: Less daily shedding and less worry about your hair's future.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="text-center">
          <div className="inline-block bg-rose-50 rounded-lg p-4 mb-6">
            <p className="text-neutral-700 font-medium mb-1">Time-sensitive opportunity:</p>
            <p className="text-neutral-600">Every day without care•atin is another day of potential hair loss. The sooner you start, the more follicles you can save.</p>
          </div>
          
          <Link 
            to="/products/photonique-touch"
            className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-full font-medium shadow-lg transition-all hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
          >
            Start Your Transformation Today
            <ArrowRight size={18} className="ml-1" />
          </Link>
          <div className="mt-4">
            <Link 
              to="/pages/science"
              className="font-medium text-rose-500 hover:text-rose-600 underline underline-offset-4"
            >
              Learn more about the science
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
