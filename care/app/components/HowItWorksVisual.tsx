import { motion } from 'framer-motion';

export function HowItWorksVisual() {
  const steps = [
    {
      step: "1",
      title: "Wear",
      description: "Just 15 minutes daily",
      icon: "⏱️",
      visual: "device-visual"
    },
    {
      step: "2", 
      title: "Activate",
      description: "Light therapy stimulates follicles",
      icon: "💡",
      visual: "light-visual"
    },
    {
      step: "3",
      title: "Transform",
      description: "See results in 30 days",
      icon: "✨",
      visual: "results-visual"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-light mb-4 text-gray-800">
            Simple. Effective. <span className="italic text-[#C49B7C]">Proven.</span>
          </h2>
          <p className="text-xl text-gray-600">
            Science-backed results in three easy steps
          </p>
        </motion.div>

        {/* Steps Visualization */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#C49B7C] to-[#E8B598] transform -translate-y-1/2"></div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                className="relative text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Step Circle */}
                <div className="relative mx-auto w-32 h-32 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C49B7C] to-[#E8B598] rounded-full flex items-center justify-center">
                    <span className="text-4xl text-white font-light">{step.step}</span>
                  </div>
                  
                  {/* Icon */}
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                </div>

                {/* Step Content */}
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">{step.title}</h3>
                <p className="text-gray-600 text-lg">{step.description}</p>

                {/* Visual Element */}
                <motion.div 
                  className="mt-6 h-24 bg-gray-50 rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {step.visual === 'device-visual' && (
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-400 rounded-lg"></div>
                  )}
                  {step.visual === 'light-visual' && (
                    <div className="relative">
                      <div className="w-8 h-8 bg-red-500 rounded-full opacity-75 animate-pulse"></div>
                      <div className="absolute inset-0 w-8 h-8 bg-red-400 rounded-full animate-ping"></div>
                    </div>
                  )}
                  {step.visual === 'results-visual' && (
                    <div className="flex space-x-2">
                      <div className="w-6 h-16 bg-gradient-to-t from-gray-300 to-amber-400 rounded"></div>
                      <div className="w-6 h-16 bg-gradient-to-t from-gray-300 to-amber-400 rounded"></div>
                      <div className="w-6 h-16 bg-gradient-to-t from-gray-300 to-amber-400 rounded"></div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Key Benefit */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-full border border-emerald-200">
            <span className="text-emerald-600 text-xl mr-3">⚡</span>
            <span className="text-emerald-800 font-semibold text-lg">
              Clinically proven to work in just 30 days
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
