import { motion } from 'framer-motion';

export function SelfCareRitualSection() {
  return (
    <section className="py-16 md:py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-stone-800">Your Hair Care Ritual</h2>
          <p className="text-lg text-stone-600 max-w-3xl mx-auto">
            Just a few minutes, three times a week, to transform your hair health.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="relative">
            {/* Image placeholder */}
            <div className="bg-stone-100 rounded-lg h-96 flex items-center justify-center">
              <span className="text-stone-400">Product Image</span>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-rose-50 rounded-full -z-10"></div>
          </div>
          
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-light mb-6 text-stone-800">Simple, Effective, Relaxing</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-rose-50 rounded-full w-10 h-10 flex items-center justify-center mr-4 shrink-0">
                  <span className="text-rose-500 font-medium">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-stone-800">Prepare</h4>
                  <p className="text-stone-600">Start with clean, dry hair. For best results, use after washing with a gentle, sulfate-free shampoo.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-rose-50 rounded-full w-10 h-10 flex items-center justify-center mr-4 shrink-0">
                  <span className="text-rose-500 font-medium">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-stone-800">Treat</h4>
                  <p className="text-stone-600">Gently move the care•atin device across your scalp in slow, steady motions for 8-10 minutes.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-rose-50 rounded-full w-10 h-10 flex items-center justify-center mr-4 shrink-0">
                  <span className="text-rose-500 font-medium">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-stone-800">Repeat</h4>
                  <p className="text-stone-600">Use 3 times per week consistently. Most users see initial results within 8-12 weeks.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SelfCareRitualSection;