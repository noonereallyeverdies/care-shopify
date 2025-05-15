import React from 'react';
import { ArrowRight } from 'lucide-react';

export function RealResultsIntroSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-neutral-800 mb-6">
              Real Results from <span className="font-medium text-rose-600">Real People</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              See the visible transformation our customers experience with consistent use of the photonique touch™ device.
            </p>
          </div>
          
          {/* Featured image with before/after */}
          <div className="relative rounded-2xl shadow-xl overflow-hidden mb-16">
            <div className="bg-white bg-opacity-95 absolute inset-0 z-10 flex flex-col items-center justify-center p-6 md:p-12 text-center">
              <div className="w-16 h-16 mb-6 rounded-full bg-rose-50 flex items-center justify-center">
                <ArrowRight className="h-8 w-8 text-rose-500" />
              </div>
              <h3 className="text-2xl md:text-3xl font-medium text-neutral-800 mb-4">
                See the Transformation
              </h3>
              <p className="text-lg text-neutral-600 max-w-xl mb-8">
                Our before and after gallery showcases real, unretouched results from customers who have incorporated care•atin into their regular routine.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#results-section" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-rose-600 text-white rounded-lg font-medium shadow-sm hover:bg-rose-700 transition-colors"
                >
                  View Before & After
                </a>
                <a 
                  href="#testimonials-section-id" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-rose-600 border border-rose-200 rounded-lg font-medium shadow-sm hover:bg-rose-50 transition-colors"
                >
                  Read Testimonials
                </a>
              </div>
            </div>
            
            {/* Background image - w3-after.png */}
            <img 
              src="/images/before-after/before-after-3-after.png" 
              alt="Stunning results from photonique touch™" 
              className="w-full object-cover h-[600px]"
            />
          </div>
          
          {/* Statistics section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "93%",
                text: "of users reported visible improvement in hair density within 90 days"
              },
              {
                number: "4.9/5",
                text: "average rating from over 10,000 verified customer reviews"
              },
              {
                number: "87%",
                text: "would recommend care•atin to friends or family experiencing hair concerns"
              }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-md border border-neutral-100">
                <div className="text-3xl md:text-4xl font-medium text-rose-600 mb-2">
                  {stat.number}
                </div>
                <p className="text-neutral-700">
                  {stat.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
