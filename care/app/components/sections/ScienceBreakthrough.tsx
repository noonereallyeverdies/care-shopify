import { motion } from 'framer-motion';

export default function ScienceBreakthrough() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-extralight mb-6 text-white">
              Breakthrough
              <span className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text italic">
                Science
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Proprietary photonique touch™ technology engineered at MIT, validated at Harvard Medical
            </p>
          </motion.div>

          {/* Technology Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Left - Visual */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="aspect-square bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl border border-white/10 p-8">
                <div className="relative h-full">
                  {/* Animated Light Waves */}
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="w-48 h-48 border-2 border-blue-400/50 rounded-full"></div>
                  </motion.div>
                  
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      scale: [1.05, 1.1, 1.05],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  >
                    <div className="w-64 h-64 border-2 border-purple-400/30 rounded-full"></div>
                  </motion.div>
                  
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      scale: [1.1, 1.15, 1.1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  >
                    <div className="w-80 h-80 border-2 border-pink-400/20 rounded-full"></div>
                  </motion.div>
                  
                  {/* Center Device */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-white to-gray-200 rounded-xl shadow-2xl">
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl opacity-80"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-2">Precision Wavelength</h3>
                  <p className="text-gray-400">
                    Engineered 650nm frequency precisely targets follicle mitochondria, 
                    optimizing cellular energy production for hair growth activation.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-2">Adaptive Pulsing</h3>
                  <p className="text-gray-400">
                    AI-driven pulse modulation adapts to individual follicle response patterns, 
                    maximizing efficacy while maintaining safety protocols.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-2">Biomarker Tracking</h3>
                  <p className="text-gray-400">
                    Real-time monitoring of cellular activity provides personalized 
                    treatment optimization for each user's unique physiology.
                  </p>
                </div>
              </div>

              {/* Technical Specs */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">650nm</div>
                  <div className="text-gray-500 text-sm">Wavelength</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">5mW</div>
                  <div className="text-gray-500 text-sm">Power Density</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-400">74</div>
                  <div className="text-gray-500 text-sm">LED Array</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">15min</div>
                  <div className="text-gray-500 text-sm">Treatment Time</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Research Partners */}
          <motion.div 
            className="mt-16 pt-8 border-t border-white/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-gray-400 text-center mb-6">Research partnerships</p>
            <div className="flex justify-center items-center gap-12 opacity-60">
              <div className="text-white font-medium">MIT</div>
              <div className="text-white font-medium">Harvard Medical</div>
              <div className="text-white font-medium">Stanford</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
