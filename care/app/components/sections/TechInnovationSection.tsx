import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { EnhancedImage } from '../ui/EnhancedImage';
import { handleImageError, type ImageType } from '~/utils/imageErrorHandler';

// Import CSS for consistent styling
import './TechInnovationSection.css';

// Tech-forward section showcasing the science behind care•atin
export function TechInnovationSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  const techFeatures = [
    {
      title: "biomimetic polymers",
      subtitle: "nature-inspired molecules",
      description: "Our revolutionary polymers mimic the molecular structure of natural keratin, creating an optimal environment for cellular renewal and follicle activation.",
      wavelength: "650-680nm",
      efficiency: "94%",
      penetration: "4-6mm",
      visual: "/images/PRODUCTPHOTOT.webp" // Using existing image as placeholder
    },
    {
      title: "photonique touch™",
      subtitle: "precision light therapy",
      description: "Precisely calibrated red light wavelengths penetrate the scalp to enhance mitochondrial ATP production, stimulating natural hair growth mechanisms.",
      wavelength: "660nm ±5nm",
      efficiency: "98%",
      penetration: "8mm",
      visual: "/images/PRODUCTPHOTOT.webp" // Using existing image as placeholder
    },
    {
      title: "cellular activation",
      subtitle: "awakening dormant follicles",
      description: "Advanced light therapy triggers cellular regeneration pathways, revitalizing dormant hair follicles and promoting sustainable hair growth cycles.",
      wavelength: "Multi-spectrum",
      efficiency: "92%",
      penetration: "Variable",
      visual: "/images/PRODUCTPHOTOT.webp" // Using existing image as placeholder
    }
  ];

  // Auto-advance features every 5 seconds
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % techFeatures.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isInView, techFeatures.length]);

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

  return (
    <motion.section 
      ref={sectionRef}
      className="tech-innovation-section"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Animated tech background */}
      <div className="tech-innovation-background"></div>
      
      {/* Dynamic particle system */}
      <div className="particle-system">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="tech-particle"
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%"
            }}
            animate={{ 
              y: ["-10px", "10px", "-10px"],
              opacity: [0.1, 0.3, 0.1] 
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
        <motion.div className="section-header" variants={itemVariants}>
          <span className="section-tag">
            Advanced Technology
          </span>
          <h2 className="section-title">
            the science behind <span className="text-gradient-tech">innovation</span>
          </h2>
          <p className="section-subtitle">
            Discover how cutting-edge biomimetic technology and precision photonique therapy 
            work in harmony to revolutionize hair wellness
          </p>
        </motion.div>

        <div className="tech-content-grid">
          {/* Interactive feature selector */}
          <motion.div variants={itemVariants} className="tech-features">
            {techFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className={`tech-feature-card ${
                  activeFeature === index ? 'active' : ''
                }`}
                onClick={() => setActiveFeature(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="feature-content">
                  <div className={`feature-number ${
                    activeFeature === index ? 'active' : ''
                  }`}>
                    <span>{index + 1}</span>
                  </div>
                  
                  <div className="feature-info">
                    <h3 className={`feature-title ${
                      activeFeature === index ? 'active' : ''
                    }`}>
                      {feature.title}
                    </h3>
                    <p className="feature-subtitle">
                      {feature.subtitle}
                    </p>
                    
                    {activeFeature === index && (
                      <motion.div
                        className="feature-details"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="feature-description">
                          {feature.description}
                        </p>
                        
                        {/* Tech specifications */}
                        <div className="tech-specs-grid">
                          <div className="tech-spec-item">
                            <div className="spec-label">Wavelength</div>
                            <div className="spec-value">{feature.wavelength}</div>
                          </div>
                          <div className="tech-spec-item">
                            <div className="spec-label">Efficiency</div>
                            <div className="spec-value">{feature.efficiency}</div>
                          </div>
                          <div className="tech-spec-item">
                            <div className="spec-label">Penetration</div>
                            <div className="spec-value">{feature.penetration}</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
                
                {/* Progress indicator */}
                {activeFeature === index && (
                  <motion.div
                    className="feature-progress"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 5, ease: "linear" }}
                    style={{ originX: 0 }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Dynamic visualization */}
          <motion.div variants={itemVariants} className="tech-visualization">
            <div className="visualization-container">
              <EnhancedImage
                key={activeFeature}
                src={techFeatures[activeFeature].visual}
                alt={techFeatures[activeFeature].title}
                className="visualization-image"
                fallbackSrc="/images/PRODUCTPHOTOT.webp"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Tech overlay interface */}
              <div className="tech-overlay">
                {techFeatures[activeFeature].wavelength}
              </div>
              
              {/* Animated border */}
              <motion.div
                className="visualization-border"
                initial={{ borderColor: 'rgba(122, 139, 140, 0)' }}
                animate={{ 
                  borderColor: ['rgba(122, 139, 140, 0)', 'var(--c-accent-tech)', 'rgba(122, 139, 140, 0)'] 
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "linear" 
                }}
              />
            </div>

            {/* Floating tech indicators */}
            <motion.div
              className="tech-indicator indicator-1"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
            <motion.div
              className="tech-indicator indicator-2"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6] 
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5 
              }}
            />
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div variants={itemVariants} className="tech-cta">
          <motion.a
            href="/pages/science"
            className="tech-cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>explore the science</span>
            <motion.svg
              className="cta-arrow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </motion.svg>
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}