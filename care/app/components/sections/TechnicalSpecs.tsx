import { motion } from 'framer-motion';

export default function TechnicalSpecs() {
  const specs = [
    {
      category: "Optical Engineering",
      specs: [
        { label: "Wavelength", value: "650nm ±10nm", description: "Optimized for follicle penetration" },
        { label: "Power Density", value: "5mW/cm²", description: "FDA cleared intensity" },
        { label: "Beam Divergence", value: "<30°", description: "Precise targeting" },
        { label: "Coherence", value: "Partially coherent", description: "Enhanced tissue interaction" }
      ]
    },
    {
      category: "Hardware Architecture",
      specs: [
        { label: "LED Array", value: "74 units", description: "Full scalp coverage" },
        { label: "Controller", value: "ARM Cortex-M7", description: "Real-time processing" },
        { label: "Memory", value: "128MB DDR4", description: "Pattern storage" },
        { label: "Connectivity", value: "WiFi 6 + BLE 5.0", description: "Seamless sync" }
      ]
    },
    {
      category: "Treatment Protocol",
      specs: [
        { label: "Session Duration", value: "15 minutes", description: "Daily treatment" },
        { label: "Adaptive Pulsing", value: "10-40Hz", description: "AI-optimized frequency" },
        { label: "Temperature Control", value: "±0.5°C", description: "Thermal safety" },
        { label: "Treatment Cycles", value: "90 days", description: "Full restoration protocol" }
      ]
    }
  ];

  return (
    <section className="py-24 bg-white">
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
              Engineering
              <span className="block text-blue-600 italic">Excellence</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every component engineered for precision, validated through rigorous testing protocols
            </p>
          </motion.div>

          {/* Specifications Grid */}
          <div className="grid lg:grid-cols-3 gap-12">
            {specs.map((category, categoryIndex) => (
              <motion.div 
                key={category.category}
                className="space-y-6"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              >
                <h3 className="text-2xl font-semibold text-gray-900 pb-4 border-b border-gray-200">
                  {category.category}
                </h3>
                
                <div className="space-y-4">
                  {category.specs.map((spec, specIndex) => (
                    <div 
                      key={spec.label}
                      className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-gray-900">{spec.label}</span>
                        <span className="text-blue-600 font-semibold">{spec.value}</span>
                      </div>
                      <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                        {spec.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Device Visualization */}
          <motion.div 
            className="mt-20 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="relative max-w-2xl mx-auto">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-2xl overflow-hidden">
                {/* Device Render Placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg"></div>
                  
                  {/* Animated Light Rings */}
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-48 h-48 border-2 border-blue-300/30 rounded-full"></div>
                  </motion.div>
                  
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-64 h-64 border-2 border-purple-300/20 rounded-full"></div>
                  </motion.div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-3 border">
                <div className="text-sm font-medium text-gray-900">Patent Pending</div>
                <div className="text-xs text-gray-600">US Application #11,234,567</div>
              </div>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div 
            className="mt-16 pt-8 border-t border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p className="text-gray-500 text-center mb-6">Certifications & Compliance</p>
            <div className="flex justify-center items-center gap-8 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                FDA Cleared
              </span>
              <span className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
                CE Marked
              </span>
              <span className="flex items-center gap-2">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                </div>
                ISO 13485
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
