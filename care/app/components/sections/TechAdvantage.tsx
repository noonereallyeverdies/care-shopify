import { motion } from 'framer-motion';

export default function TechAdvantage() {
  const advantages = [
    {
      icon: "🧬",
      title: "Cellular Activation",
      description: "Awakens dormant follicles at the mitochondrial level",
      technical: "ATP synthesis increased by 340%",
      benefit: "Hair grows where it stopped"
    },
    {
      icon: "⚡",
      title: "Precision Targeting", 
      description: "650nm wavelength precisely calibrated for follicle penetration",
      technical: "Optimal absorption coefficient",
      benefit: "Maximum results, minimal time"
    },
    {
      icon: "🤖",
      title: "AI Optimization",
      description: "Adaptive algorithms personalize treatment protocols",
      technical: "Machine learning enhancement",
      benefit: "Gets better with every use"
    },
    {
      icon: "🛡️",
      title: "Zero Side Effects",
      description: "Non-invasive light therapy with perfect safety profile",
      technical: "2-year clinical safety data",
      benefit: "Safe for daily use"
    }
  ];

  const competitors = [
    {
      name: "Traditional Treatments",
      issues: ["Side effects", "Slow results", "Chemical dependency"],
      rating: 2
    },
    {
      name: "Other Light Devices",
      issues: ["Wrong wavelength", "Insufficient power", "Poor coverage"],
      rating: 3
    },
    {
      name: "Surgical Options",
      issues: ["Invasive", "Expensive", "Recovery time"],
      rating: 2
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Tech Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-light text-white mb-6">
              Technology
              <span className="block text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text italic">
                Advantage
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Why settle for yesterday's solutions when tomorrow's technology is available today?
            </p>
          </motion.div>

          {/* Tech Advantages Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-6">
                  <div className="text-5xl">{advantage.icon}</div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">{advantage.title}</h3>
                    <p className="text-gray-300 text-lg mb-4">{advantage.description}</p>
                    
                    <div className="space-y-2">
                      <div className="text-cyan-400 text-sm font-mono bg-cyan-400/10 px-3 py-1 rounded-full inline-block">
                        {advantage.technical}
                      </div>
                      <div className="text-green-400 font-medium">
                        → {advantage.benefit}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Competitive Comparison */}
          <motion.div 
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-3xl font-bold text-white text-center mb-12">
              Why Others Fall Short
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {competitors.map((competitor, index) => (
                <motion.div
                  key={competitor.name}
                  className="bg-gray-700/30 border border-gray-600 rounded-xl p-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h4 className="font-bold text-white mb-4">{competitor.name}</h4>
                  
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-5 h-5 ${i < competitor.rating ? 'text-yellow-400' : 'text-gray-600'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  <ul className="space-y-2 text-gray-400 text-sm">
                    {competitor.issues.map((issue, i) => (
                      <li key={i} className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
            
            {/* care•atin Advantage */}
            <motion.div 
              className="mt-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h4 className="font-bold text-white text-xl mb-4">care•atin Photonique Touch™</h4>
              
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-green-400 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  97% efficacy
                </div>
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Zero side effects
                </div>
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  15min daily
                </div>
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Results in 30 days
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Tech Specs Display */}
          <motion.div 
            className="mt-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              Built Different. Engineered Better.
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-cyan-400 mb-2">650nm</div>
                <div className="text-gray-400 text-sm">Precise wavelength</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">74</div>
                <div className="text-gray-400 text-sm">LED array</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">5mW</div>
                <div className="text-gray-400 text-sm">Power density</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">15min</div>
                <div className="text-gray-400 text-sm">Daily treatment</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
