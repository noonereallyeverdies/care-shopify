import { motion } from 'framer-motion';

export function ResultsTimeline() {
  return (
    <section className="py-16 md:py-24 bg-stone-50 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-stone-800">Your Hair Transformation Journey</h2>
          <p className="text-lg text-stone-600 max-w-3xl mx-auto">
            Here's what to expect when you incorporate care•atin into your routine.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-rose-100 -translate-x-1/2 hidden md:block"></div>
          
          {/* Week 1-4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 relative">
            <div className="md:text-right md:pr-16">
              <h3 className="text-2xl font-light text-rose-500 mb-2">Weeks 1-4</h3>
              <h4 className="text-xl text-stone-800 mb-3">Foundation Phase</h4>
              <p className="text-stone-600">
                You may not see visible changes yet, but at the cellular level, red light therapy is already increasing energy production and improving circulation to your hair follicles.
              </p>
            </div>
            <div className="hidden md:block">
              {/* Timeline bullet */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2 w-6 h-6 rounded-full bg-rose-400 border-4 border-white"></div>
              {/* Image placeholder */}
              <div className="bg-white rounded-lg shadow-lg h-48 flex items-center justify-center">
                <span className="text-stone-400">Image Placeholder</span>
              </div>
            </div>
          </div>
          
          {/* Week 5-8 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 relative">
            <div className="hidden md:block">
              {/* Image placeholder */}
              <div className="bg-white rounded-lg shadow-lg h-48 flex items-center justify-center">
                <span className="text-stone-400">Image Placeholder</span>
              </div>
            </div>
            <div className="md:pl-16">
              {/* Timeline bullet */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2 w-6 h-6 rounded-full bg-rose-400 border-4 border-white hidden md:block"></div>
              <h3 className="text-2xl font-light text-rose-500 mb-2">Weeks 5-8</h3>
              <h4 className="text-xl text-stone-800 mb-3">Early Results</h4>
              <p className="text-stone-600">
                You'll begin to notice reduced shedding and improved hair texture. Some users report seeing baby hairs starting to appear along the hairline and part.
              </p>
            </div>
          </div>
          
          {/* Week 9-12 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 relative">
            <div className="md:text-right md:pr-16">
              <h3 className="text-2xl font-light text-rose-500 mb-2">Weeks 9-12</h3>
              <h4 className="text-xl text-stone-800 mb-3">Visible Transformation</h4>
              <p className="text-stone-600">
                This is when most users see the most dramatic results. Hair appears visibly thicker, fuller, and healthier. Thinning areas show improved coverage.
              </p>
            </div>
            <div className="hidden md:block">
              {/* Timeline bullet */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2 w-6 h-6 rounded-full bg-rose-400 border-4 border-white"></div>
              {/* Image placeholder */}
              <div className="bg-white rounded-lg shadow-lg h-48 flex items-center justify-center">
                <span className="text-stone-400">Image Placeholder</span>
              </div>
            </div>
          </div>
          
          {/* Week 13+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            <div className="hidden md:block">
              {/* Image placeholder */}
              <div className="bg-white rounded-lg shadow-lg h-48 flex items-center justify-center">
                <span className="text-stone-400">Image Placeholder</span>
              </div>
            </div>
            <div className="md:pl-16">
              {/* Timeline bullet */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2 w-6 h-6 rounded-full bg-rose-400 border-4 border-white hidden md:block"></div>
              <h3 className="text-2xl font-light text-rose-500 mb-2">Week 13+</h3>
              <h4 className="text-xl text-stone-800 mb-3">Maintenance & Continued Improvement</h4>
              <p className="text-stone-600">
                Continue using care•atin 2-3 times weekly to maintain and enhance your results. Many users report continued improvement beyond the initial 12 weeks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResultsTimeline;