import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';

export default function UrgencyFinalCTA() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-900 via-black to-purple-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Scarcity Warnings */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-400 font-semibold">Stock Alert</span>
              </div>
              <div className="text-white">
                <span className="text-2xl font-bold">2,347</span>
                <span className="text-gray-300 ml-2">units remaining</span>
              </div>
              <div className="text-red-400 text-sm mt-1">
                87% sold in first week
              </div>
            </div>
            
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-orange-400 font-semibold">Flash Sale Ends</span>
              </div>
              <div className="flex gap-2 text-white">
                <div className="bg-orange-500/20 px-3 py-2 rounded-lg">
                  <span className="text-xl font-bold">23</span>
                </div>
                <span className="self-center">:</span>
                <div className="bg-orange-500/20 px-3 py-2 rounded-lg">
                  <span className="text-xl font-bold">47</span>
                </div>
                <span className="self-center">:</span>
                <div className="bg-orange-500/20 px-3 py-2 rounded-lg">
                  <span className="text-xl font-bold">23</span>
                </div>
              </div>
              <div className="text-orange-400 text-sm mt-1">
                Save $200 on first order
              </div>
            </div>
          </motion.div>

          {/* Main CTA Section */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-5xl md:text-7xl font-light text-white mb-6 leading-tight">
              Your moment is
              <span className="block text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text italic">
                right now
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Stop waiting for the "perfect time." Your transformation begins the moment you decide.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link 
              to="/products/photonique-touch"
              className="group relative overflow-hidden bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-12 py-6 rounded-full font-bold text-xl transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              <span className="relative z-10 flex items-center gap-3">
                Secure Your Transformation
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <div className="text-center text-gray-400">
              <div className="text-sm">Or</div>
              <Link 
                to="/learn-more"
                className="text-blue-400 hover:text-blue-300 underline transition-colors"
              >
                Learn more about the science
              </Link>
            </div>
          </motion.div>

          {/* Risk Reversal */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-center bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
              <svg className="w-12 h-12 text-green-400 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div className="font-bold text-white mb-1">90-Day Guarantee</div>
              <div className="text-gray-400 text-sm">See results or full refund</div>
            </div>
            
            <div className="text-center bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
              <svg className="w-12 h-12 text-blue-400 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              <div className="font-bold text-white mb-1">Free Shipping</div>
              <div className="text-gray-400 text-sm">Worldwide delivery</div>
            </div>
            
            <div className="text-center bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
              <svg className="w-12 h-12 text-purple-400 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="font-bold text-white mb-1">Expert Support</div>
              <div className="text-gray-400 text-sm">24/7 assistance</div>
            </div>
          </motion.div>

          {/* Final Emotional Push */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <blockquote className="text-xl md:text-2xl text-gray-300 italic mb-6 max-w-2xl mx-auto">
              "The best time to start was yesterday. The second best time is right now."
            </blockquote>
            
            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Secure checkout • 256-bit SSL encryption</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
