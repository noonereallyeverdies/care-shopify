import React, { useState } from 'react';
import { WrittenTestimonials } from '~/components/testimonials/WrittenTestimonials';
import { VideoTestimonials } from '~/components/testimonials/VideoTestimonials';
import { BeforeAfterGallery } from '~/components/testimonials/BeforeAfterGallery';
import { ExpertReviews } from '~/components/testimonials/ExpertReviews';

const TABS = [
  { name: 'Written', component: WrittenTestimonials },
  { name: 'Video', component: VideoTestimonials },
  { name: 'Before/After', component: BeforeAfterGallery },
  { name: 'Expert Reviews', component: ExpertReviews }
];

export function ComprehensiveTestimonials() {
  const [activeTab, setActiveTab] = useState(0);

  const ActiveComponent = TABS[activeTab].component;

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 tracking-tight">
            Trusted by Thousands, Endorsed by Experts
          </h2>
          <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
            Real stories from our community and insights from leading hair care professionals.
          </p>
        </div>

        <div className="testimonial-tabs max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center space-x-1 sm:space-x-2 border-b border-neutral-200 mb-6 sm:mb-8">
            {TABS.map((tab, index) => (
              <button
                key={index}
                className={`px-3 sm:px-4 py-2 text-sm font-medium transition-colors focus:outline-none whitespace-nowrap ${
                  activeTab === index
                    ? 'text-rose-600 border-b-2 border-rose-600'
                    : 'text-neutral-600 hover:text-neutral-900 hover:border-b-2 hover:border-neutral-300'
                }`}
                onClick={() => setActiveTab(index)}
              >
                {tab.name}
              </button>
            ))}
          </div>
          
          <div className="testimonial-content min-h-[300px]">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </section>
  );
}