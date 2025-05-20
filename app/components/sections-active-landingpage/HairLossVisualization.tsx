import { motion } from 'framer-motion';

export function HairLossVisualization() {
  return (
    <section className="py-16 md:py-24 bg-stone-50 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-stone-800">Understanding Hair Loss</h2>
          <p className="text-lg text-stone-600 max-w-3xl mx-auto">
            Hair loss occurs when the natural growth cycle is disrupted. care•atin works by addressing the root causes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Stage 1 */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="h-40 bg-stone-100 rounded-lg mb-4 flex items-center justify-center">
              {/* Placeholder for visualization */}
              <span className="text-stone-400">Stage 1 Visualization</span>
            </div>
            <h3 className="text-xl font-light mb-2 text-stone-800">Healthy Hair Cycle</h3>
            <p className="text-stone-600">
              Normal hair follicles cycle through growth, transition, and rest phases. Each hair grows for 2-7 years before naturally shedding.
            </p>
          </div>
          
          {/* Stage 2 */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="h-40 bg-stone-100 rounded-lg mb-4 flex items-center justify-center">
              {/* Placeholder for visualization */}
              <span className="text-stone-400">Stage 2 Visualization</span>
            </div>
            <h3 className="text-xl font-light mb-2 text-stone-800">Disrupted Cycle</h3>
            <p className="text-stone-600">
              When factors like genetics, hormones, or stress disrupt the cycle, hair growth phases shorten, resulting in thinner, weaker hair.
            </p>
          </div>
          
          {/* Stage 3 */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="h-40 bg-stone-100 rounded-lg mb-4 flex items-center justify-center">
              {/* Placeholder for visualization */}
              <span className="text-stone-400">Stage 3 Visualization</span>
            </div>
            <h3 className="text-xl font-light mb-2 text-stone-800">Restoration with care•atin</h3>
            <p className="text-stone-600">
              Red light therapy stimulates cellular energy production, increases blood flow, and extends the growth phase for healthier, fuller hair.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HairLossVisualization;