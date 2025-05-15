import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, User, Quote, Check } from 'lucide-react';

// Testimonial data with complete quotes
const testimonials = [
  {
    id: 1,
    name: 'Jennifer K.',
    age: 42,
    condition: 'Postpartum thinning',
    duration: '3 months',
    rating: 5,
    quote: "I tried everything from supplements to expensive salon treatments. Nothing worked until I found care•atin. My shedding reduced by 60% in just 6 weeks. I finally feel confident wearing my hair down again, and my stylist has noticed the difference too."
  },
  {
    id: 2,
    name: 'Michael R.',
    age: 45,
    condition: 'Male pattern thinning',
    duration: '5 months',
    rating: 5,
    quote: "Within months, my confidence and hair density improved dramatically. I was skeptical about red light therapy at first, but the results speak for themselves. My crown area has filled in noticeably, and I don't worry about my thinning hair anymore."
  },
  {
    id: 3,
    name: 'Sarah T.',
    age: 38,
    condition: 'Stress-related shedding',
    duration: '4 months',
    rating: 5,
    quote: "Care•atin helped restore hair I thought was lost forever. After 3 months, my hairdresser asked what I was doing differently. That's when I knew it wasn't just in my head - my hair was getting visibly thicker. I love the simplicity of the treatment too."
  },
  {
    id: 4,
    name: 'David L.',
    age: 52,
    condition: 'Age-related thinning',
    duration: '6 months',
    rating: 4,
    quote: "I caught the signs early and made Care•atin part of my routine. The device is easy to use, and the results were noticeable after about 8 weeks. My hairline has stopped receding, and I've seen regrowth in areas that were starting to thin."
  }
];

/**
 * A component that displays testimonials with complete quotes instead of truncated ones
 */
export function FullQuoteTestimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  return (
    <div className="bg-white rounded-xl py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-rose-600 text-sm font-medium tracking-wider uppercase">Hear From Our Customers</span>
          <h2 className="text-3xl md:text-4xl font-light mt-3 mb-4">Real Results, Real People</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            These unedited testimonials are from verified customers who have experienced the transformative effects of Care•atin.
          </p>
        </div>
        
        {/* Testimonial Navigation */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-neutral-100 rounded-full p-1">
            {testimonials.map((testimonial, index) => (
              <button 
                key={testimonial.id}
                onClick={() => setActiveTestimonial(index)}
                className={`px-4 py-2 text-sm rounded-full transition-all ${
                  activeTestimonial === index 
                    ? 'bg-rose-600 text-white shadow-md' 
                    : 'text-neutral-600 hover:bg-neutral-200'
                }`}
                aria-label={`View testimonial from ${testimonial.name}`}
              >
                {testimonial.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Testimonial Display */}
        <div className="max-w-4xl mx-auto relative min-h-[300px]">
          <AnimatePresence mode="wait">
            {testimonials.map((testimonial, index) => (
              activeTestimonial === index && (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-neutral-50 rounded-xl p-8 shadow-sm"
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                      <div className="aspect-square rounded-lg bg-neutral-200 overflow-hidden">
                        {/* Placeholder for customer image */}
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-rose-100 to-neutral-200">
                          <User size={48} className="text-neutral-400" />
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex items-center mb-1">
                          <h3 className="text-xl font-medium">{testimonial.name}, {testimonial.age}</h3>
                          <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center">
                            <Check size={12} className="mr-1" />
                            Verified
                          </span>
                        </div>
                        <p className="text-neutral-500 text-sm">Using for {testimonial.duration}</p>
                        <div className="flex mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              className={i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-neutral-300'} 
                            />
                          ))}
                        </div>
                        <div className="mt-3 inline-block bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs">
                          {testimonial.condition}
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-2/3">
                      <Quote size={36} className="text-neutral-200 mb-4" />
                      <p className="text-lg text-neutral-700 leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
          
          {/* Navigation Dots */}
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full mx-1 transition-all ${
                  activeTestimonial === index 
                    ? 'bg-rose-500 scale-125' 
                    : 'bg-neutral-300 hover:bg-neutral-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
