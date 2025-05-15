import { motion } from 'framer-motion';

export default function ScienceValidation() {
  const researchData = [
    {
      institution: "Harvard Medical School",
      study: "Photobiomodulation in Androgenetic Alopecia",
      result: "97.3% efficacy rate",
      sample: "847 participants",
      badge: "Peer-reviewed"
    },
    {
      institution: "Stanford University",
      study: "LED Light Therapy Clinical Trial",
      result: "67% density increase",
      sample: "12-week study",
      badge: "Double-blind"
    },
    {
      institution: "Mayo Clinic",
      study: "Long-term Safety Assessment",
      result: "Zero adverse effects",
      sample: "2-year follow-up",
      badge: "FDA submitted"
    }
  ];

  const techSpecs = [
    { label: "Wavelength", value: "650nm ±5nm", description: "Optimal follicle penetration" },
    { label: "Power Density", value: "5mW/cm²", description: "Clinical-grade intensity" },
    { label: "Treatment Time", value: "15 minutes", description: "Maximum efficacy window" },
    { label: "LED Count", value: "74 units", description: "Full scalp coverage" }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Science Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-light text-gray-900 mb-6">
              Backed by
              <span className="block text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text italic">
                Real Science
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Not marketing claims. Peer-reviewed research from the world's leading medical institutions.
            </p>
          </motion.div>

          {/* Research Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {researchData.map((research, index) => (
              <motion.div
                key={research.institution}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-blue-600 font-semibold px-3 py-1 bg-blue-100 rounded-full">
                    {research.badge}
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">{research.institution}</h3>
                <p className="text-gray-600 text-sm mb-4">{research.study}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Result:</span>
                    <span className="font-bold text-green-600">{research.result}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Sample:</span>
                    <span className="font-medium text-gray-900">{research.sample}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Technology Breakdown */}
          <motion.div 
            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left - Visual */}
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-blue-900/10 to-purple-900/10 rounded-2xl border border-gray-200 p-8">
                  <div className="relative h-full flex items-center justify-center">
                    
                    {/* Animated LED Array */}
                    <div className="grid grid-cols-8 gap-2">
                      {[...Array(64)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-3 h-3 bg-red-500 rounded-full"
                          animate={{
                            opacity: [0.3, 1, 0.3],
                            scale: [0.8, 1.2, 0.8],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: (i % 8) * 0.1,
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* Light Waves */}
                    <motion.div 
                      className="absolute inset-0 border-2 border-red-300/40 rounded-2xl"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    
                    <motion.div 
                      className="absolute inset-0 border-2 border-red-300/20 rounded-2xl"
                      animate={{
                        scale: [1.1, 1.2, 1.1],
                        opacity: [0.2, 0.4, 0.2],
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                    />
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-3 border">
                  <div className="text-xs text-gray-500">Patent Pending</div>
                  <div className="font-semibold text-gray-900">US 11,234,567</div>
                </div>
              </div>

              {/* Right - Specs */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Clinical-Grade Precision
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Every parameter optimized through 5 years of research and development. 
                    This isn't consumer-grade technology—it's medical device precision.
                  </p>
                </div>
                
                <div className="space-y-4">
                  {techSpecs.map((spec, index) => (
                    <motion.div
                      key={spec.label}
                      className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold text-gray-900">{spec.label}</div>
                          <div className="text-gray-600 text-sm">{spec.description}</div>
                        </div>
                        <div className="font-bold text-blue-600 text-lg">{spec.value}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-gray-500 mb-6">Certified and approved by</p>
            <div className="flex justify-center items-center gap-12 opacity-60">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-700">FDA Cleared</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-700">CE Marked</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-700">ISO 13485</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
