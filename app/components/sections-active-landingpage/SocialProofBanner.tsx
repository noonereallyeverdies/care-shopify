import { motion } from 'framer-motion';

export function SocialProofBanner() {
  return (
    <section className="py-12 bg-rose-50">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-light mb-6 text-stone-800 relative">
            Trusted by thousands of customers worldwide
          </h3>
          
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-light text-rose-500">98%</span>
              <span className="text-sm text-stone-600">Satisfaction Rate</span>
            </div>
            
            <div className="flex flex-col items-center">
              <span className="text-4xl font-light text-rose-500">10k+</span>
              <span className="text-sm text-stone-600">Happy Customers</span>
            </div>
            
            <div className="flex flex-col items-center">
              <span className="text-4xl font-light text-rose-500">92%</span>
              <span className="text-sm text-stone-600">Would Recommend</span>
            </div>
            
            <div className="flex flex-col items-center">
              <span className="text-4xl font-light text-rose-500">4.8/5</span>
              <span className="text-sm text-stone-600">Average Rating</span>
            </div>
          </div>
          
          <div className="mt-8 max-w-3xl mx-auto">
            <p className="italic text-stone-600">
              "I've tried everything for my thinning hair, but nothing worked until I found care•atin. 
              After just 8 weeks, I started seeing visible results. My hair feels thicker, 
              looks fuller, and I've regained my confidence."
            </p>
            <p className="mt-4 text-stone-500 font-light">— Sarah T., Verified Customer</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SocialProofBanner;