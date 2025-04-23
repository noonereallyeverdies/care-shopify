import React, { useState } from 'react';
import { Zap, Droplet, HandHeart } from 'lucide-react'; // Restore icons import

// Restore original feature-based tab data
const tabs = [
  {
    title: "Light Therapy",
    icon: Zap,
    content: "Precise red light wavelengths (650-670nm) optimize cellular energy (ATP boost) and awaken tired follicles for healthier growth cycles. Non-invasive and safe for all hair types."
  },
  {
    title: "Targeted Nourishment",
    icon: Droplet,
    content: "The integrated applicator delivers specialized Care-atin serums directly to the root where they're needed most, minimizing waste and maximizing absorption for effective follicle nourishment."
  },
  {
    title: "Scalp Massage",
    icon: HandHeart,
    content: "Gentle vibrations boost scalp microcirculation, delivering more oxygen and nutrients while creating a relaxing experience and the optimal environment for healthy hair growth."
  }
];

export function TabbedContent() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <section className="py-24 bg-gradient-to-b from-white via-neutral-50/50 to-neutral-50">
      <div className="container mx-auto max-w-4xl px-4"> 
        {/* Original Section Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-neutral-900 text-center mb-6 tracking-tight">
           How 3-in-1 care unlocks visibly fuller hair
        </h2>
        <p className="text-lg md:text-xl text-center text-neutral-700 mb-12 max-w-2xl mx-auto leading-relaxed tracking-normal">
          Experience how the Photonique Touch combines three essential actions in one seamless gesture.
        </p>

        {/* Original Horizontal Tab List - Use original tabs data */}
        <div className="border-b border-neutral-200 mb-8">
          <nav className="-mb-px flex justify-center space-x-6 md:space-x-8" aria-label="Tabs">
            {tabs.map((tab, index) => ( // Use original tabs data
              <button
                key={tab.title}
                onClick={() => setActiveTabIndex(index)}
                // Original styling for horizontal tabs
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ease-in-out flex items-center gap-2 
                  ${activeTabIndex === index
                    ? 'border-rose-500 text-rose-600' 
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                  }
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 rounded-t-md
                `}
                aria-current={activeTabIndex === index ? 'page' : undefined}
              >
                {/* Restore Icon */}
                <tab.icon className="h-5 w-5" aria-hidden="true" /> 
                {tab.title} 
              </button>
            ))}
          </nav>
        </div>

        {/* Original Tab Content Panels - Use original tabs data */}
        <div className="mt-8">
          {tabs.map((tab, index) => ( // Use original tabs data
            <div 
              key={tab.title} 
              className={`tab-panel ${activeTabIndex === index ? 'block' : 'hidden'}`}
              role="tabpanel"
              tabIndex={0}
              aria-labelledby={`tab-${index}`}
            >
              {/* Original Content Layout: Centered Text */}
              <p className="text-base md:text-lg text-neutral-700 leading-relaxed text-center">
                 {tab.content} 
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 