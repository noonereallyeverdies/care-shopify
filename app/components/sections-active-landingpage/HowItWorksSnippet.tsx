import { motion } from 'framer-motion';

// Import the CSS file
import './HowItWorksSnippet.css';

// Placeholder data - Enhanced steps content
const stepsData = [
  {
    icon: '⚡️', // Changed icon - more energy/activation
    title: 'Targeted Follicle Activation', // More specific title
    description: 'Precisely calibrated wavelengths initiate cellular responses, awakening dormant follicles and signaling the start of the growth phase.'
  },
  {
    icon: '🔄', // Changed icon - circulation/optimization
    title: 'Optimized Scalp Microcirculation', // More specific title
    description: 'Enhanced blood flow delivers a surge of vital nutrients and oxygen, creating the optimal bio-environment for follicle nourishment and robust hair production.'
  },
  {
    icon: '✅', // Changed icon - results/confirmation
    title: 'Visible Revitalization & Strength', // More specific title
    description: 'Experience demonstrably reduced shedding and increased thickness. Achieve fortified follicles in days, with profound, visible growth emerging within 90 days.'
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren", // Ensure container animates before children
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function HowItWorksSnippet() {
  return (
    <motion.section 
      className="how-it-works-snippet section-padding" // Keep existing classes
      initial={{ opacity: 0, y: 20 }} // Standardized
      whileInView={{ opacity: 1, y: 0 }} // Standardized
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1], delay: 0.1 }} // Standardized
      viewport={{ once: true }} // Standardized
    >
      <motion.h2 variants={itemVariants} className="how-it-works-heading">
        The Science of Care-atin RLT
      </motion.h2>
      <motion.p variants={itemVariants} className="how-it-works-subtitle">
        Discover how our advanced RLT technology works synergistically with your body's intricate cellular processes for unparalleled hair revitalization.
      </motion.p>
      
      <div className="how-it-works-steps-container">
        {stepsData.map((step, index) => (
          <motion.div 
            key={index} 
            className="how-it-works-step"
            variants={itemVariants}
          >
            <div className="step-icon">{step.icon}</div>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-description">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
} 