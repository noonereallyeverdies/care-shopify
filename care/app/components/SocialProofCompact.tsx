import { motion } from 'framer-motion';

export function SocialProofCompact() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Single Powerful Testimonial */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-2xl md:text-3xl font-light text-gray-700 mb-8 leading-relaxed">
              "I haven't felt this confident in years. The transformation wasn't just physical—it was emotional. care•atin gave me my life back."
            </blockquote>
            
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full"></div>
              <div className="text-left">
                <div className="font-semibold text-gray-800">Sarah M.</div>
                <div className="text-gray-600">Verified Customer</div>
                <div className="flex text-yellow-400 text-sm">
                  ★★★★★
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Before/After Visual */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative bg-white rounded-2xl p-6 shadow-lg">
            <div className="absolute top-4 left-4 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
              Before
            </div>
            <div className="h-64 bg-gradient-to-b from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
              <span className="text-gray-500">Thinning Hair</span>
            </div>
          </div>
          
          <div className="relative bg-white rounded-2xl p-6 shadow-lg">
            <div className="absolute top-4 left-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              After 30 Days
            </div>
            <div className="h-64 bg-gradient-to-b from-amber-50 to-amber-100 rounded-xl flex items-center justify-center">
              <span className="text-amber-700">Fuller Hair</span>
            </div>
          </div>
        </motion.div>

        {/* Key Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-[#C49B7C] mb-2">93%</div>
            <div className="text-gray-600">See results in 30 days</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-[#C49B7C] mb-2">50K+</div>
            <div className="text-gray-600">Happy customers</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-[#C49B7C] mb-2">4.8/5</div>
            <div className="text-gray-600">Customer rating</div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-8 mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-center space-x-2 text-gray-600">
            <span className="text-green-500">🛡️</span>
            <span className="font-medium">FDA Cleared</span>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-600">
            <span className="text-blue-500">🔬</span>
            <span className="font-medium">Clinically Tested</span>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-600">
            <span className="text-purple-500">🏆</span>
            <span className="font-medium">Award Winning</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
