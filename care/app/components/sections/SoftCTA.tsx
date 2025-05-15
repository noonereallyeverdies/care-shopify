import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';

export default function SoftCTA() {
  return (
    <section className="section-clean bg-stone-50">
      <div className="container-clean">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-extralight text-stone-800 mb-8">
            ready to begin<br />
            <span className="text-transparent bg-gradient-to-r from-rose-200 via-amber-200 to-stone-300 bg-clip-text">
              your journey?
            </span>
          </h2>
          
          <p className="text-xl text-stone-600 mb-12 leading-relaxed">
            join thousands who've made healthy hair part of their daily self-care routine
          </p>

          {/* Soft Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-rose-100 to-amber-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-stone-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <p className="text-stone-600 text-sm">30-day trial period</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-100 to-stone-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-stone-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3h18v18H3V3z"/>
                </svg>
              </div>
              <p className="text-stone-600 text-sm">free shipping worldwide</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-stone-100 to-rose-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-stone-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <p className="text-stone-600 text-sm">expert support included</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                to="/products/photonique-touch"
                className="inline-flex items-center gap-3 bg-stone-800 text-white px-12 py-4 rounded-full font-light text-lg transition-all duration-300 hover:bg-stone-700 shadow-lg hover:shadow-xl"
              >
                <span>start your glow up</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </motion.div>
            
            <p className="text-stone-500 text-sm">
              starting at $299 • payment plans available
            </p>
          </div>

          {/* Trust Indicators */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex justify-center items-center gap-8 text-stone-400 text-sm">
              <span>fda cleared</span>
              <div className="w-1 h-1 bg-stone-300 rounded-full"></div>
              <span>clinically proven</span>
              <div className="w-1 h-1 bg-stone-300 rounded-full"></div>
              <span>47k+ satisfied customers</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}