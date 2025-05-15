import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Waves, Droplet } from 'lucide-react';

// Import CSS for sophisticated styling
import './VisualScienceSection.css';

// Animation variants consistent with brand
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
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

export function VisualScienceSection() {
  const [activeTab, setActiveTab] = useState(0);
  
  // Triple action technology data
  const tripleActionData = [
    {
      title: "photonique touch™ therapy",
      icon: Zap,
      description: "Biomimetic red light wavelengths (630-660nm) penetrate deep into scalp tissue to energize cellular activity, stimulate circulation, and extend hair growth cycles.",
      benefits: [
        "Enhances cellular ATP production by up to 40%",
        "Awakens dormant follicles through targeted stimulation",
        "Extends anagen phase for longer, stronger hair"
      ],
      scientificFact: "Our precision-calibrated photonique touch™ technology delivers therapeutic wavelengths at optimal intensity to maximize follicle regeneration while maintaining cellular safety.",
      technicalSpecs: {
        wavelength: "630-660nm",
        penetration: "4-6mm",
        efficacy: "94%"
      }
    },
    {
      title: "therapeutic resonance",
      icon: Waves,
      description: "Advanced biomimetic vibration patterns enhance scalp microcirculation, promoting nutrient delivery and waste removal for optimal follicle environment.",
      benefits: [
        "Increases nutrient delivery through enhanced blood flow",
        "Reduces scalp tension that can restrict growth",
        "Creates meditative self-care experience"
      ],
      scientificFact: "Therapeutic resonance technology mimics natural cellular oscillations, supporting the scalp's innate healing mechanisms through gentle mechanical stimulation.",
      technicalSpecs: {
        frequency: "Variable",
        amplitude: "Gentle",
        efficacy: "89%"
      }
    },
    {
      title: "precision botanical delivery",
      icon: Droplet,
      description: "Intelligent micro-delivery system ensures botanical actives reach follicles at optimal concentrations for maximum bioavailability and therapeutic effect.",
      benefits: [
        "Targeted delivery prevents product waste",
        "Enhanced absorption through micro-emulsion technology",
        "Synergistic combination with light therapy"
      ],
      scientificFact: "Our precision delivery system increases botanical absorption by 53% compared to traditional topical application, creating ideal conditions for follicle renewal.",
      technicalSpecs: {
        delivery: "Micro-emulsion",
        absorption: "+53%",
        efficacy: "91%"
      }
    }
  ];

  return (
    <motion.section 
      className="visual-science-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Animated background elements */}
      <div className="visual-science-background">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ 
              y: ["-10px", "10px", "-10px"],
              opacity: [0.2, 0.5, 0.2] 
            }}
            transition={{ 
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2 
            }}
          />
        ))}
      </div>

      <div className="container">
        <motion.div variants={itemVariants} className="section-header">
          <span className="section-tag">Advanced Technology</span>
          <h2 className="section-title">
            the science behind <span className="text-gradient-tech">transformation</span>
          </h2>
          <p className="section-subtitle">
            Experience the revolutionary fusion of biomimetic science and ancient wellness wisdom. 
            Our photonique touch™ technology works in harmony with natural healing processes to 
            awaken your hair's potential.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div variants={itemVariants} className="tech-tabs">
          <div className="tabs-container">
            {tripleActionData.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="tab-wrapper">
                  <button
                    onClick={() => setActiveTab(index)}
                    className={`tech-tab ${activeTab === index ? 'active' : ''}`}
                  >
                    <div className="tab-icon">
                      <IconComponent size={20} />
                    </div>
                    <span className="tab-label">{item.title}</span>
                  </button>
                  {activeTab === index && (
                    <motion.div
                      layoutId="activeTab"
                      className="tab-indicator"
                      initial={false}
                      transition={{ type: 'spring', duration: 0.5 }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Content Area */}
        <div className="tech-content-grid">
          {/* Left side: Visualization */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="tech-visualization"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <div className="visualization-container">
                {activeTab === 0 && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    className="light-therapy-visual"
                  >
                    <div className="follicle-diagram">
                      <svg viewBox="0 0 300 300" className="follicle-svg">
                        <defs>
                          <radialGradient id="lightGradient" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="var(--c-accent-primary)" stopOpacity="0.8"/>
                            <stop offset="100%" stopColor="var(--c-accent-primary)" stopOpacity="0.1"/>
                          </radialGradient>
                          <linearGradient id="follicleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="var(--c-accent-tech)"/>
                            <stop offset="100%" stopColor="var(--c-secondary-sage)"/>
                          </linearGradient>
                        </defs>
                        
                        {/* Hair follicle */}
                        <motion.path
                          d="M150,80 C130,100 120,130 130,180 C140,230 160,240 170,180 C180,130 170,100 150,80"
                          fill="url(#follicleGradient)"
                          stroke="var(--c-accent-tech)"
                          strokeWidth="2"
                          variants={waveAnimation}
                        />
                        
                        {/* Hair strand */}
                        <motion.line
                          x1="150"
                          y1="80"
                          x2="150"
                          y2="40"
                          stroke="var(--c-primary-text-dark)"
                          strokeWidth="3"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                        />
                        
                        {/* Light waves */}
                        {[1, 2, 3, 4, 5].map((i) => (
                          <motion.circle
                            key={i}
                            cx="150"
                            cy="150"
                            r={30 + i * 20}
                            fill="none"
                            stroke="var(--c-accent-primary)"
                            strokeWidth="1"
                            strokeOpacity="0.4"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ 
                              scale: [0, 1],
                              opacity: [0.6, 0]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.2
                            }}
                          />
                        ))}
                        
                        {/* Central light source */}
                        <motion.circle
                          cx="150"
                          cy="150"
                          r="15"
                          fill="url(#lightGradient)"
                          initial={{ scale: 0 }}
                          animate={{ 
                            scale: [1, 1.1, 1],
                          }}
                          transition={{ 
                            duration: 1.5,
                            repeat: Infinity
                          }}
                        />
                      </svg>
                    </div>
                    
                    {/* Technical indicators */}
                    <div className="tech-indicators">
                      <div className="wavelength-indicators">
                        <div className="wavelength-item">
                          <div className="wavelength-dot light-red"></div>
                          <span>630nm</span>
                        </div>
                        <div className="wavelength-item">
                          <div className="wavelength-dot dark-red"></div>
                          <span>660nm</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 1 && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    className="resonance-visual"
                  >
                    <div className="resonance-diagram">
                      <div className="scalp-surface"></div>
                      {/* Concentric waves */}
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="resonance-wave"
                          style={{
                            width: `${100 + i * 30}px`,
                            height: `${100 + i * 30}px`,
                          }}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ 
                            scale: [0, 1.8], 
                            opacity: [0.8, 0],
                          }}
                          transition={{ 
                            duration: 2.5, 
                            repeat: Infinity, 
                            delay: i * 0.3,
                            ease: "easeOut"
                          }}
                        />
                      ))}
                      
                      <motion.div 
                        className="resonance-center"
                        animate={{ 
                          scale: [1, 1.05, 1],
                        }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity
                        }}
                      >
                        <Waves size={32} className="wave-icon" />
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 2 && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    className="delivery-visual"
                  >
                    <div className="delivery-diagram">
                      <div className="scalp-cross-section"></div>
                      
                      {/* Animated droplets */}
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="botanical-droplet"
                          style={{
                            left: `${20 + i * 15}%`,
                            top: '10%',
                          }}
                          animate={{
                            y: [0, 150],
                            scale: [1, 0.7],
                            opacity: [1, 0.8, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.4,
                            ease: "easeIn"
                          }}
                        />
                      ))}
                      
                      {/* Penetration visualization */}
                      <div className="penetration-layers">
                        <div className="layer epidermis"></div>
                        <div className="layer dermis"></div>
                        <div className="layer follicle-base"></div>
                      </div>
                      
                      <motion.div 
                        className="delivery-center"
                        animate={{ 
                          rotate: [0, 360],
                        }}
                        transition={{ 
                          duration: 8, 
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        <Droplet size={28} className="droplet-icon" />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </div>
              
              {/* Technical overlay */}
              <div className="tech-overlay">
                <div className="tech-spec">
                  {tripleActionData[activeTab].technicalSpecs.wavelength && (
                    <span className="spec-item">
                      λ {tripleActionData[activeTab].technicalSpecs.wavelength}
                    </span>
                  )}
                  <span className="spec-item">
                    {tripleActionData[activeTab].technicalSpecs.efficacy} efficacy
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right side: Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="tech-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="content-card">
                <div className="content-header">
                  <div className="content-icon">
                    {React.createElement(tripleActionData[activeTab].icon, { size: 24 })}
                  </div>
                  <h3 className="content-title">
                    {tripleActionData[activeTab].title}
                  </h3>
                </div>
                
                <p className="content-description">
                  {tripleActionData[activeTab].description}
                </p>
                
                <div className="benefits-section">
                  <h4 className="benefits-title">Key Benefits</h4>
                  <ul className="benefits-list">
                    {tripleActionData[activeTab].benefits.map((benefit, index) => (
                      <motion.li 
                        key={index}
                        className="benefit-item"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        <div className="benefit-check">
                          <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span>{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <div className="science-fact">
                  <h4 className="science-title">Scientific Foundation</h4>
                  <p className="science-text">
                    {tripleActionData[activeTab].scientificFact}
                  </p>
                </div>
                
                {/* Technical specifications */}
                <div className="tech-specs">
                  {Object.entries(tripleActionData[activeTab].technicalSpecs).map(([key, value]) => (
                    key !== 'wavelength' && (
                      <div key={key} className="spec-item">
                        <span className="spec-label">{key}</span>
                        <span className="spec-value">{value}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
              
              {/* Navigation arrows */}
              <div className="content-navigation">
                <button 
                  onClick={() => setActiveTab(prev => (prev === 0 ? 2 : prev - 1))}
                  className="nav-button nav-prev"
                  aria-label="Previous technology"
                >
                  <svg viewBox="0 0 16 16" fill="none">
                    <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                
                <div className="nav-indicator">
                  {activeTab + 1} of 3
                </div>
                
                <button 
                  onClick={() => setActiveTab(prev => (prev === 2 ? 0 : prev + 1))}
                  className="nav-button nav-next"
                  aria-label="Next technology"
                >
                  <svg viewBox="0 0 16 16" fill="none">
                    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom CTA section */}
        <motion.div variants={itemVariants} className="science-cta-section">
          <div className="cta-content">
            <h3 className="cta-title">The synergy creates transformation</h3>
            <p className="cta-subtitle">
              While each technology delivers benefits individually, their integration creates 
              exponential results, accelerating hair renewal through biomimetic harmony.
            </p>
          </div>
          
          <motion.a 
            href="/pages/science" 
            className="science-cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>explore the complete science</span>
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}
