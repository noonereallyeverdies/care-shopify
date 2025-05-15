import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import CSS for sophisticated styling
import './FaqSection.css';

// Comprehensive FAQ data
const faqItems = [
  {
    question: "How does the care•atin device actually work?",
    answer: "The care•atin device uses clinically proven photonique touch™ technology (630-680nm wavelength) to stimulate cellular activity at the follicle level. This biomimetic red light therapy increases circulation to hair roots, enhances nutrient delivery, and supports the natural hair growth cycle. When used consistently, this leads to improved hair density and reduced shedding.",
    category: "technology"
  },
  {
    question: "How soon will I see results?",
    answer: "Most users notice reduced shedding within the first 3-4 weeks of consistent use. Visible improvements in hair density typically begin around 8-12 weeks. In clinical studies, participants saw an average density increase of 28% after 12 weeks, with continued improvement over 6 months of regular use.",
    category: "results"
  },
  {
    question: "Is care•atin suitable for all hair types?",
    answer: "Yes, care•atin is designed for all hair types, textures, and colors. The device works on the cellular level at the follicle, regardless of the hair's characteristics. It's effective for both men and women experiencing various forms of hair thinning, from genetic pattern loss to stress-related shedding.",
    category: "compatibility"
  },
  {
    question: "How often do I need to use the device?",
    answer: "For optimal results, we recommend using care•atin for 10-15 minutes, 3 times per week. Consistency is key - our clinical results showing 93% satisfaction rates were achieved with this usage pattern. Once desired results are achieved, many users maintain with 1-2 sessions weekly.",
    category: "usage"
  },
  {
    question: "Do I need to use special serums or products with the device?",
    answer: "The care•atin device comes with a starter botanical serum that's optimized for use with the photonique touch™ technology. While you can use your preferred light hair oils or serums, our specialized formulation enhances absorption by up to 53% when combined with the device's therapy.",
    category: "products"
  },
  {
    question: "Is care•atin FDA registered?",
    answer: "Care•atin is manufactured in FDA-registered facilities and complies with all applicable safety standards. As a cosmetic wellness device, it follows FDA guidelines for consumer safety. The photonique touch™ technology is based on extensively studied red light therapy principles.",
    category: "safety"
  },
  {
    question: "What if it doesn't work for me?",
    answer: "We stand behind our product with a 90-day satisfaction guarantee. If you don't see improvements after consistent use for 90 days, you can return the device for a full refund. Our clinical studies showed a 93% user satisfaction rate, and we're confident in the transformative potential of our technology.",
    category: "guarantee"
  },
  {
    question: "How is care•atin different from other hair wellness approaches?",
    answer: "Unlike topical solutions that work only on the surface or treatments with potential side effects, care•atin offers a non-invasive, ritual-based approach that works at the cellular level. It addresses the root causes of thinning by enhancing follicle health and creating a mindful wellness practice rather than just masking symptoms.",
    category: "comparison"
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const faqVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const faqItemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    },
  },
};

export function FAQSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  
  const toggleQuestion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  
  return (
    <motion.section 
      className="faq-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Background elements */}
      <div className="faq-background">
        <div className="faq-particle faq-particle-1"></div>
        <div className="faq-particle faq-particle-2"></div>
        <div className="faq-particle faq-particle-3"></div>
      </div>

      <div className="container">
        <motion.div variants={itemVariants} className="faq-header">
          <span className="faq-tag">Support & Guidance</span>
          <h2 className="faq-title">
            frequently asked <span className="text-gradient-primary">questions</span>
          </h2>
          <p className="faq-subtitle">
            Everything you need to know about care•atin and how it can transform your hair wellness journey. 
            Our photonique touch™ technology combines ancient wisdom with modern science.
          </p>
        </motion.div>
        
        <motion.div 
          variants={faqVariants}
          className="faq-container"
        >
          {faqItems.map((item, index) => (
            <motion.div 
              key={index}
              variants={faqItemVariants}
              className="faq-item"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <button 
                onClick={() => toggleQuestion(index)}
                className="faq-button"
              >
                <div className="faq-question-content">
                  <span className="faq-question">{item.question}</span>
                  <div className="faq-icon">
                    <motion.div
                      animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </div>
                </div>
              </button>
              
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    className="faq-answer-container"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ 
                      duration: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    <div className="faq-answer">
                      <p>{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div variants={itemVariants} className="faq-cta">
          <div className="faq-cta-content">
            <h3 className="faq-cta-title">Still have questions?</h3>
            <p className="faq-cta-subtitle">
              Our wellness specialists are here to guide you on your transformation journey.
            </p>
          </div>
          
          <motion.a 
            href="/pages/contact" 
            className="faq-cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Connect with our specialists</span>
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Export as default for compatibility
export default FAQSection;