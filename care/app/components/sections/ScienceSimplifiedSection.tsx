import React from 'react';

export function ScienceSimplifiedSection() {
  // TODO: Ensure image paths are correct and images exist in /public/images/science/
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 tracking-tight">
            The Science, Simplified
          </h2>
          <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
            Understand how Care•atin revitalizes your hair from the core, unlike conventional approaches.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200 shadow-sm">
              <h3 className="font-semibold text-xl mb-4 text-neutral-700">Conventional Treatments</h3>
              <img 
                src="/images/science/conventional-diagram.svg" 
                alt="Diagram showing how conventional treatments work on the surface level" 
                className="mb-4 w-full h-auto rounded-md aspect-[4/3] object-contain"
              />
              <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
                Most treatments work from the outside in, targeting symptoms rather than root causes. Like watering a plant with damaged roots, the benefits are often temporary and superficial.
              </p>
            </div>
            
            <div className="bg-rose-50 p-6 rounded-lg border border-rose-200 shadow-sm">
              <h3 className="font-semibold text-xl mb-4 text-rose-700">Care•atin Technology</h3>
              <img 
                src="/images/science/careatin-diagram.svg" 
                alt="Diagram showing how care•atin works at the cellular level" 
                className="mb-4 w-full h-auto rounded-md aspect-[4/3] object-contain"
              />
              <p className="text-rose-700 text-sm md:text-base leading-relaxed">
                Care•atin works from the inside out, delivering cellular energy directly to hair follicles. Like repairing the roots of a plant, this approach aims to create sustainable, natural growth by addressing the core issue.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 