import { motion } from 'framer-motion';

export default function TransformationProof() {
  return (
    <section className="py-24 bg-gray-50">
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
            <h2 className="text-5xl md:text-6xl font-extralight mb-6 text-gray-900">
              Transformation, 
              <span className="block text-blue-600 italic">Not Promises</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Clinical trials across 847 participants demonstrate unprecedented efficacy in hair restoration
            </p>
          </motion.div>

          {/* Before/After Grid */}
          <motion.div 
            className="grid md:grid-cols-2 gap-12 mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
              <div className="bg-gray-200 h-96 rounded-xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-b from-gray-300 to-gray-400 flex items-center justify-center">
                  <span className="text-gray-600 text-lg">Before Treatment</span>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="bg-red-500/80 backdrop-blur px-3 py-1 rounded-full text-sm font-medium">
                  Day 0
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
              <div className="bg-amber-50 h-96 rounded-xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-b from-amber-100 to-amber-200 flex items-center justify-center relative">
                  <span className="text-amber-800 text-lg">After Treatment</span>
                  <div className="absolute inset-0 bg-[url('/images/hair-pattern.svg')] opacity-20"></div>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="bg-green-500/80 backdrop-blur px-3 py-1 rounded-full text-sm font-medium">
                  Day 90
                </div>
              </div>
            </div>
          </motion.div>

          {/* Clinical Results */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
              <div className="text-3xl font-bold text-gray-900 mb-2">93%</div>
              <div className="text-gray-600 text-sm">Visible Improvement</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
              <div className="text-3xl font-bold text-gray-900 mb-2">67%</div>
              <div className="text-gray-600 text-sm">Increased Density</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
              <div className="text-3xl font-bold text-gray-900 mb-2">89%</div>
              <div className="text-gray-600 text-sm">Would Recommend</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
              <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
              <div className="text-gray-600 text-sm">Side Effect Free</div>
            </div>
          </motion.div>

          {/* Testimonial */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <blockquote className="text-2xl md:text-3xl font-light text-gray-700 mb-6 italic max-w-4xl mx-auto">
              "The results weren't just visible—they were life-changing. As a dermatologist, I've never seen technology this effective."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full"></div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Dr. Sarah Chen, MD</div>
                <div className="text-gray-600 text-sm">Stanford Dermatology</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
