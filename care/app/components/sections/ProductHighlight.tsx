import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from '~/components/Link';
import type { ProductFragment } from 'storefrontapi.generated';

interface ProductHighlightProps {
  product: ProductFragment | null;
}

// Animation variants
const fadeInCinematic = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

export function ProductHighlight({ product }: ProductHighlightProps) {
  if (!product) return null;
  
  // Updated image path
  const productImageUrl = '/images/product/lifestyle-woman.jpg';
  
  return (
    <section className="relative py-16 bg-white overflow-hidden">
      {/* Breathing glow layer */}
      <div className="absolute inset-0 bg-gradient-radial from-rose-50 to-transparent opacity-10 animate-breathe pointer-events-none"></div>

      <motion.div
        className="container mx-auto px-6 backdrop-blur-md bg-white/60 rounded-3xl shadow-[0_10px_30px_rgba(252,29,89,0.1)] grid md:grid-cols-2 gap-8 py-12"
        initial="hidden" whileInView="visible" viewport={{ once:true }}
        variants={fadeInCinematic}
      >
        {/* Text + CTA */}
        <div className="space-y-6">
          <h2 className="text-5xl font-semibold tracking-tight text-neutral-900">
            Unlock Your Hair's Fullest Potential in Just 8 Weeks
          </h2>
          <p className="text-xl text-neutral-600 leading-relaxed max-w-lg">
            Feel the transformation as your scalp absorbs our clinically-proven red light therapy. In clinical studies, 84% of users experienced visibly thicker, fuller hair after just 8 weeks of consistent use.
          </p>
          
          <div className="space-y-4 mt-6">
            <h3 className="text-lg font-medium text-neutral-800">How will you benefit?</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-rose-500 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Boost your hair density by up to 32% in 90 days</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-rose-500 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Strengthen your follicles from day one with patented RLT technology</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-rose-500 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Feel renewed confidence as shedding decreases by 62%</span>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-8">
            <button 
              className="group relative overflow-hidden px-6 py-3 bg-rose-500 text-white text-base font-medium rounded-full shadow-md"
              aria-label="Start your hair transformation"
            >
              Start Your 60-Day Risk-Free Trial
              <ArrowRight className="inline-block ml-2 transition-transform group-hover:translate-x-1" />
              {/* shine sweep */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100"
                animate={{ x: [-100,100] }} transition={{ ease:"easeInOut", duration:1 }} 
              />
            </button>

            <Link to={`/products/${product.handle}`} className="px-5 py-3 text-base font-medium border border-neutral-300 hover:border-rose-300 hover:text-rose-500 rounded-full">
              See the Science Behind Your Results
            </Link>
          </div>

          {/* social proof */}
          <div className="flex items-center space-x-3 text-sm text-neutral-500 mt-6 p-3 bg-neutral-50 rounded-lg">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg 
                  key={star} 
                  className="w-4 h-4 text-yellow-400" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div>
              <span className="font-medium">4.8/5</span> from <span className="font-medium">10,000+</span> happy customers
              <p className="text-xs mt-1 italic">"From thinning to thriving - my hair has completely transformed in 12 weeks!" - Jessica K.</p>
            </div>
          </div>
          
          <p className="text-xs text-neutral-500 mt-4">
            Backed by our 60-day money-back guarantee. Try risk-free and see the difference or receive a full refund.
          </p>
        </div>

        {/* Product Image - Updated styling for lifestyle image */}
        <motion.div className="flex justify-center"
          initial={{ scale:0.95, opacity:0 }} whileInView={{ scale:1, opacity:1 }} 
          transition={{ type:"spring", stiffness:120, damping:20 }}
        >
          <img 
            src={productImageUrl} 
            alt="Woman with healthy, vibrant hair in natural setting" 
            className="rounded-xl shadow-lg max-h-[500px] object-cover"
            loading="eager"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
