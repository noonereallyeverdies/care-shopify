import { motion } from 'framer-motion';

export function ProblemSolutionMinimal() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Problem Side */}
          <motion.div 
            className="text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-light mb-6 text-gray-800">
              Before care•atin
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center text-gray-600">
                <span className="text-red-400 mr-3">✗</span>
                <span>Thinning, patchy hair</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="text-red-400 mr-3">✗</span>
                <span>Hiding under hats</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="text-red-400 mr-3">✗</span>
                <span>Low confidence</span>
              </div>
            </div>

            {/* Visual representation */}
            <div className="relative h-64 bg-gray-100 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-200 to-gray-300"></div>
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-400 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-500 text-lg font-medium">Thinning Hair</span>
              </div>
            </div>
          </motion.div>

          {/* Solution Side */}
          <motion.div 
            className="text-center md:text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-light mb-6 text-gray-800">
              After care•atin
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center text-gray-800">
                <span className="text-green-500 mr-3">✓</span>
                <span>Fuller, thicker hair</span>
              </div>
              <div className="flex items-center text-gray-800">
                <span className="text-green-500 mr-3">✓</span>
                <span>Renewed confidence</span>
              </div>
              <div className="flex items-center text-gray-800">
                <span className="text-green-500 mr-3">✓</span>
                <span>Natural-looking results</span>
              </div>
            </div>

            {/* Visual representation */}
            <div className="relative h-64 bg-gradient-to-br from-amber-50 to-orange-100 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-100 via-orange-100 to-amber-200"></div>
              <div className="absolute inset-0 pattern-dots pattern-amber-300 pattern-bg-transparent pattern-size-4 pattern-opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-amber-800 text-lg font-medium">Healthy Hair</span>
              </div>
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                30 Days
              </div>
            </div>
          </motion.div>
        </div>

        {/* Center Arrow */}
        <motion.div 
          className="flex justify-center mt-8"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="bg-[#C49B7C] text-white rounded-full p-4">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
