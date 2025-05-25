import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Waves, Droplet } from 'lucide-react';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6 }
  }
};

const waveAnimation = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1,
    transition: { 
      duration: 1.5,
      ease: "easeInOut"
    }
  }
};

// Animation for tab highlight
const highlightAnimation = {
  initial: { width: 0 },
  animate: { width: '100%', transition: { duration: 0.3 } },
  exit: { width: 0, transition: { duration: 0.3 } }
};

export function VisualScienceSection() {
  const [activeTab, setActiveTab] = useState(0);
  
  // Triple action technology data
  const tripleActionData = [
    {
      title: "Red Light Therapy",
      icon: Zap,
      description: "Clinically proven wavelengths (630-660nm) penetrate the scalp to energize cells, stimulate circulation, and reduce inflammation.",
      benefits: [
        "Enhances cellular energy (ATP) production",
        "Stimulates dormant follicles to reactivate",
        "Extends the active growth phase (anagen) of hair"
      ],
      scientificFact: "Our patented light array delivers precise wavelengths that have been shown in clinical studies to support increased hair count and density."
    },
    {
      title: "Therapeutic Scalp Massage",
      icon: Waves,
      description: "Our gentle vibration technology provides a soothing massage that enhances blood flow and product absorption.",
      benefits: [
        "Increases nutrient delivery to follicles",
        "Relieves tension that can contribute to hair loss",
        "Creates a relaxing self-care ritual"
      ],
      scientificFact: "Mechanical stimulation, like gentle massage, may support dermal papilla cell activity, a key factor in hair growth cycles."
    },
    {
      title: "Precision Oil Application",
      icon: Droplet,
      description: "Our innovative delivery system ensures nourishing oils reach the exact areas where they're needed most.",
      benefits: [
        "Targeted delivery of active ingredients",
        "Prevents product waste and mess",
        "Creates perfect environment for follicle health"
      ],
      scientificFact: "Combining red light therapy with our specialized oil formulation may enhance the scalp's receptiveness to key nutrients compared to topical application alone."
    }
  ];

  return (
    <section className="bg-gradient-to-b from-[#fff5f8] to-white py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-light mb-2">triple-action technology</h2>
          <h3 className="text-xl md:text-2xl font-light text-rose-500 mb-6">the science of transformative hair care</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            care•atin's revolutionary 3-in-1 system combines <span className="text-rose-500 font-medium">red light therapy</span>, 
            <span className="text-rose-500 font-medium"> therapeutic scalp massage</span>, and 
            <span className="text-rose-500 font-medium"> precision oil application</span> to deliver 
            transformative results that no single-approach product can match.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-neutral-100 rounded-full p-1">
            {tripleActionData.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="relative">
                  <button
                    onClick={() => setActiveTab(index)}
                    className={`relative z-10 px-4 md:px-6 py-3 rounded-full text-sm md:text-base font-medium transition-colors duration-300 flex items-center gap-2 ${
                      activeTab === index 
                        ? 'text-white' 
                        : 'text-neutral-500 hover:text-neutral-700'
                    }`}
                  >
                    <IconComponent size={16} className="opacity-80"/>
                    <span>{item.title}</span>
                  </button>
                  {activeTab === index && (
                    <motion.div
                      layoutId="activeTechnology"
                      className="absolute inset-0 bg-rose-500 rounded-full"
                      initial={false}
                      transition={{ type: 'spring', duration: 0.4 }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12"
          >
            {/* Left side visualization */}
            <div className="relative order-2 md:order-1">
              {activeTab === 0 && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  className="relative"
                >
                  <div className="relative aspect-square rounded-full overflow-hidden border-8 border-[#ffecf2]">
                    <div className="absolute inset-0 flex justify-center items-center">
                      <svg viewBox="0 0 200 200" className="w-full h-full">
                        {/* Hair follicle diagram */}
                        <g transform="translate(100, 100)">
                          <motion.path
                            d="M0,-30 C-20,-10 -30,10 -20,40 C-10,70 10,80 20,40 C30,10 20,-10 0,-30"
                            fill="none"
                            stroke="#d4627c"
                            strokeWidth="2"
                            variants={waveAnimation}
                          />
                          <motion.circle
                            cx="0"
                            cy="-40"
                            r="8"
                            fill="#ffecf2"
                            stroke="#d4627c"
                            strokeWidth="2"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                          />
                          {/* Light waves */}
                          {[1, 2, 3, 4, 5].map((i) => (
                            <motion.path
                              key={i}
                              d={`M${-60 + i * 20},-60 Q${-40 + i * 20},0 ${-60 + i * 20},60`}
                              fill="none"
                              stroke="#f8b6cf"
                              strokeWidth="1.5"
                              strokeDasharray="4 4"
                              initial={{ opacity: 0, pathLength: 0 }}
                              animate={{ opacity: 0.7, pathLength: 1 }}
                              transition={{ delay: 0.2 * i, duration: 1 }}
                            />
                          ))}
                        </g>
                      </svg>
                    </div>
                  </div>
                  {/* Wavelength indicators */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-6">
                    <div className="text-center">
                      <div className="w-4 h-4 rounded-full bg-[#d4627c] mx-auto"></div>
                      <span className="text-sm mt-2 block">630nm</span>
                    </div>
                    <div className="text-center">
                      <div className="w-4 h-4 rounded-full bg-[#ac3b5a] mx-auto"></div>
                      <span className="text-sm mt-2 block">660nm</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 1 && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  className="relative aspect-square flex justify-center items-center"
                >
                  <div className="w-4/5 h-4/5 rounded-full bg-rose-100 flex justify-center items-center relative overflow-hidden">
                    <div className="absolute w-full h-full">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-full h-full rounded-full border border-rose-300"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ 
                            scale: [0, 1.5], 
                            opacity: [0.8, 0],
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            delay: i * 0.4,
                            ease: "easeOut"
                          }}
                        />
                      ))}
                    </div>
                    <motion.div 
                      className="w-32 h-32 bg-white rounded-full shadow-lg flex justify-center items-center text-rose-400 z-10"
                      animate={{ 
                        scale: [1, 1.03, 1],
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        repeatType: "reverse" 
                      }}
                    >
                      <Waves size={48} strokeWidth={1.5} />
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {activeTab === 2 && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  className="relative aspect-square flex justify-center items-center"
                >
                  <div className="w-4/5 h-4/5 rounded-full border-8 border-[#ffecf2] flex justify-center items-center relative overflow-hidden">
                    <motion.div
                      className="absolute top-1/4 w-2 h-2 rounded-full bg-rose-400"
                      animate={{
                        y: [0, 100],
                        scale: [1, 0.8],
                        opacity: [1, 0.8, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 0.5
                      }}
                    />
                    
                    <motion.div
                      className="absolute top-1/4 right-1/3 w-2 h-2 rounded-full bg-rose-400"
                      animate={{
                        y: [0, 120],
                        scale: [1, 0.7],
                        opacity: [1, 0.8, 0]
                      }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        delay: 0.3,
                        repeatDelay: 0.5
                      }}
                    />
                    
                    <motion.div
                      className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full bg-rose-400"
                      animate={{
                        y: [0, 110],
                        scale: [1, 0.6],
                        opacity: [1, 0.8, 0]
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        delay: 0.7,
                        repeatDelay: 0.5
                      }}
                    />
                    
                    <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-rose-200 to-transparent opacity-60" />
                    
                    <div className="w-16 h-24 absolute top-10 bg-rose-400 rounded-t-full opacity-20" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right side content */}
            <div className="order-1 md:order-2">
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="space-y-6"
              >
                <div className="bg-white p-8 rounded-xl shadow-md border border-[#f8d6e3]">
                  <div className="flex items-center mb-4">
                    {(() => {
                      const ActiveIcon = tripleActionData[activeTab].icon;
                      return <ActiveIcon size={24} className="mr-4 text-rose-500 flex-shrink-0" />;
                    })()}
                    <h3 className="text-2xl font-medium text-rose-600">{tripleActionData[activeTab].title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6 text-lg">
                    {tripleActionData[activeTab].description}
                  </p>
                  
                  <h4 className="text-sm uppercase tracking-wider text-neutral-500 mb-3">Key Benefits</h4>
                  <ul className="space-y-3 mb-6">
                    {tripleActionData[activeTab].benefits.map((benefit, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className="flex items-start"
                      >
                        <svg className="w-5 h-5 text-rose-500 mt-1 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-100">
                    <h4 className="text-sm text-rose-500 font-medium mb-2">The Science</h4>
                    <p className="text-sm text-neutral-700 italic">
                      {tripleActionData[activeTab].scientificFact}
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-neutral-500">
                    {activeTab + 1} of 3
                  </div>
                  
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => setActiveTab(prev => (prev === 0 ? 2 : prev - 1))}
                      className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
                      aria-label="Previous technology"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    
                    <button 
                      onClick={() => setActiveTab(prev => (prev === 2 ? 0 : prev + 1))}
                      className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
                      aria-label="Next technology"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          className="text-center pt-8 border-t border-neutral-100"
        >
          <h3 className="text-xl md:text-2xl font-light mb-4">
            The sum is greater than its parts
          </h3>
          <p className="text-neutral-600 max-w-3xl mx-auto mb-8">
            While each technology offers significant benefits on its own, the 
            <span className="font-medium"> combination of all three technologies</span> creates a 
            synergistic effect, potentially accelerating results compared to single-approach treatments.
          </p>
          
          <motion.a 
            href="/pages/science" 
            className="inline-flex items-center bg-rose-500 text-white px-8 py-3 rounded-full hover:bg-rose-600 transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="mr-2">discover the full science</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
} 