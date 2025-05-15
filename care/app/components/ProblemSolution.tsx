// Placeholder for Problem/Solution section
// Needs icons and final copy

import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';

// Import the CSS file
import './ProblemSolution.css'; 

// Sophisticated wellness journey content aligned with care•atin brand identity
const wellnessJourneyData = {
  ritual: {
    title: "A Ritual of Transformation",
    subtitle: "where mindfulness meets innovation",
    text: "Elevate your daily practice beyond routine. Each session with care•atin becomes a moment of intentional self-care, harmonizing ancient wellness wisdom with cutting-edge technology. Experience the profound connection between inner tranquility and outer radiance.",
    benefits: [
      "Cultivate mindful presence through sacred practice", 
      "Integrate holistic wellness into daily life", 
      "Achieve harmony between inner peace and outer beauty"
    ],
    icon: "✦"
  },
  science: {
    title: "Biomimetic Innovation",
    subtitle: "the science of cellular awakening",
    text: "Our revolutionary photonique touch™ technology transcends traditional approaches by mimicking nature's own healing patterns. Advanced biomimetic polymers work in concert with precisely calibrated red light wavelengths to awaken dormant follicles and restore your hair's natural vitality.",
    benefits: [
      "Enhance cellular ATP production for optimal hair health", 
      "Stimulate natural keratin synthesis pathways", 
      "Activate dormant follicles through targeted light therapy"
    ],
    icon: "◈"
  }
};

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

const columnVariants = (direction = 'left') => ({
  hidden: { x: direction === 'left' ? -50 : 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
});

// Add the missing itemVariants definition
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Placeholder Icon component (using class)
const Icon = ({ name }: { name: string }) => (
  <div className="placeholder-icon">{name.substring(0,1)}</div>
);

export function ProblemSolution() {
  return (
    <motion.section 
      className="wellness-journey-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} 
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4">
        {/* Section introduction */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <span className="text-primary-500 font-medium block mb-2 tracking-wider uppercase text-sm">
            The Philosophy
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4 lowercase">
            where science meets soul
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Care•atin represents more than technology—it's a philosophy that honors both the precision of modern science and the wisdom of ancient wellness traditions.
          </p>
        </motion.div>

        <div className="wellness-journey-layout">
          {/* Ritual Column */}
          <motion.div 
            className="ritual-column"
            variants={columnVariants('left')}
          >
            <div className="column-icon ritual-icon">{wellnessJourneyData.ritual.icon}</div>
            <h3 className="column-title ritual-title">
              {wellnessJourneyData.ritual.title}
            </h3>
            <h4 className="column-subtitle">
              {wellnessJourneyData.ritual.subtitle}
            </h4>
            <p className="column-text">
              {wellnessJourneyData.ritual.text}
            </p>
            <ul className="benefits-list">
              {wellnessJourneyData.ritual.benefits.map((benefit, index) => (
                <li key={index} className="benefit-item">
                  <span className="benefit-symbol">•</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Science Column */}
          <motion.div 
            className="science-column"
            variants={columnVariants('right')}
          >
            <div className="column-icon science-icon">{wellnessJourneyData.science.icon}</div>
            <h3 className="column-title science-title">
              {wellnessJourneyData.science.title}
            </h3>
            <h4 className="column-subtitle">
              {wellnessJourneyData.science.subtitle}
            </h4>
            <p className="column-text">
              {wellnessJourneyData.science.text}
            </p>
            <ul className="benefits-list">
              {wellnessJourneyData.science.benefits.map((benefit, index) => (
                <li key={index} className="benefit-item">
                  <span className="benefit-symbol">•</span>
                  {benefit}
                </li>
              ))}
            </ul>
            <motion.div 
              className="science-cta"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/the-science" className="btn-secondary">
                Explore the Science
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Tech-forward visual separator */}
        <motion.div 
          className="mt-16 flex justify-center"
          variants={itemVariants}
        >
          <div className="flex items-center space-x-4 opacity-30">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent"></div>
            <div className="w-2 h-2 rounded-full bg-primary-600 animate-pulse"></div>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
} 