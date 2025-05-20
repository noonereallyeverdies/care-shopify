import { motion } from 'framer-motion';

export function BeforeAfterSliderSection() {
  return (
    <section className="py-16 md:py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-stone-800">Real Results</h2>
          <p className="text-lg text-stone-600 max-w-3xl mx-auto">
            See the visible difference that care•atin makes for our customers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Before/After Example 1 */}
          <div className="bg-stone-50 rounded-lg overflow-hidden shadow-lg">
            <div className="h-64 bg-stone-300 relative">
              {/* Placeholder for before/after slider component */}
              <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-medium">
                Before/After Slider
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-light mb-2 text-stone-800">Emma, 42</h3>
              <p className="text-stone-600">
                "After 3 months of consistent use, I noticed significantly less shedding and new baby hairs along my hairline."
              </p>
            </div>
          </div>
          
          {/* Before/After Example 2 */}
          <div className="bg-stone-50 rounded-lg overflow-hidden shadow-lg">
            <div className="h-64 bg-stone-300 relative">
              {/* Placeholder for before/after slider component */}
              <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-medium">
                Before/After Slider
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-light mb-2 text-stone-800">Michael, 38</h3>
              <p className="text-stone-600">
                "I was skeptical at first, but after 8 weeks my hair looks and feels thicker. The thinning crown area is noticeably improved."
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="/pages/results" 
            className="inline-flex items-center text-rose-500 font-medium hover:text-rose-600 transition-colors"
          >
            See more success stories
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="ml-2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default BeforeAfterSliderSection;