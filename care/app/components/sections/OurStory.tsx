import React from 'react';
import { Link } from '@remix-run/react';

export function OurStory() {
  return (
    <section className="py-12 md:py-24 bg-contrast relative section-spacing">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section Title */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-neutral-900 text-center mb-4 md:mb-6 tracking-tight brand-heading">
          our story
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Left Column: Image */}
          <div className="md:col-span-5 order-2 md:order-1">
            <div className="relative">
              <img 
                src="/images/founder-story.jpg" 
                alt="care•atin founder with her aunt, the inspiration behind our mission" 
                className="w-full rounded-lg shadow-sm"
              />
              <div className="absolute -bottom-4 -right-4 bg-rose-100 rounded-lg p-4 shadow-sm hidden md:block">
                <img 
                  src="/images/founder-aunt.jpg" 
                  alt="founder's aunt during cancer treatment" 
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            </div>
          </div>
          
          {/* Right Column: Story */}
          <div className="md:col-span-7 order-1 md:order-2">
            <h3 className="text-xl md:text-2xl font-light mb-4 text-neutral-800 brand-heading">
              when it became personal
            </h3>
            
            <div className="space-y-4 text-sm md:text-base text-neutral-700 leading-relaxed brand-body">
              <p>
                everything changed when my aunt sarah was diagnosed with stage 3 breast cancer. watching her fight through treatment was both heartbreaking and inspiring, but nothing prepared me for how devastated she felt when she lost her hair.
              </p>
              
              <p>
                "it's not just hair," she told me through tears. "it's my identity."
              </p>
              
              <p>
                that same year, i was struggling with my own hair loss from stress and hormonal changes. the market was flooded with products making empty promises, and i couldn't find anything backed by real science that actually worked.
              </p>
              
              <p>
                i became obsessed with finding a solution—not just for myself, but for my aunt and millions of others facing similar struggles. after two years of research, i discovered the transformative power of red light therapy for hair regeneration and growth.
              </p>
              
              <p>
                care<span className="brand-dot">•</span>atin was born from this deeply personal journey. we've combined cutting-edge technology with clinical research to create devices that not only promote hair growth but restore confidence and identity.
              </p>
              
              <p>
                today, my aunt is cancer-free with beautiful regrown hair, and i've reversed my own hair loss. but more importantly, we've helped thousands reclaim their confidence, one strand at a time.
              </p>
              
              <div className="mt-6 pt-4 border-t border-neutral-200">
                <Link to="/products/advanced-hair-growth-system" className="inline-block px-6 py-3 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition-colors brand-body">
                  discover our solution
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 