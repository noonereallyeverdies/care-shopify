// Placeholder for Problem/Solution section
// Needs icons and final copy

import { motion } from 'framer-motion';

// Import the CSS file
import './ProblemSolution.css'; 

// Placeholder data - Enhanced Solution Text
const problemSolutionData = {
  problem: {
    title: "Frustrated by Thinning Hair?",
    text: "Seeing more hair in your brush? Worried about losing volume and shine? Many factors can disrupt the hair growth cycle, leading to noticeable thinning and shedding.",
    image: "/placeholder-problem.jpg" // Placeholder image path
  },
  solution: {
    title: "The Advanced RLT Solution", // Emphasize advancement
    // Enhanced Text:
    text: "Combat thinning with Care-atin's advanced Red Light Therapy. Our clinically inspired device employs targeted wavelengths to trigger cellular regeneration, reactivate dormant follicles, and optimize the scalp microenvironment for profound, lasting results.",
    image: "/placeholder-solution.jpg" // Placeholder image path
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

// Placeholder Icon component (using class)
const Icon = ({ name }: { name: string }) => (
  <div className="placeholder-icon">{name.substring(0,1)}</div>
);

export function ProblemSolution() {
  return (
    <motion.section 
      className="problem-solution-section section-padding" // Keep existing classes
      initial={{ opacity: 0, y: 20 }} // Standardized
      whileInView={{ opacity: 1, y: 0 }} // Standardized
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1], delay: 0.1 }} // Standardized
      viewport={{ once: true }} // Standardized
    >
      <div 
        className="two-column-layout problem-solution-layout" // Added specific layout class
      >
        {/* Problem Column */}
        <motion.div 
          className="problem-column"
          variants={columnVariants('left')}
        >
          <img 
            src={problemSolutionData.problem.image}
            alt="Illustration of hair thinning problem"
            className="column-image" // Added class, removed inline style
          />
          <h2 className="column-title">
            {problemSolutionData.problem.title}
          </h2>
          <p className="column-text">
            {problemSolutionData.problem.text}
          </p>
        </motion.div>

        {/* Solution Column */}
        <motion.div 
          className="solution-column"
          variants={columnVariants('right')}
        >
           <img 
            src={problemSolutionData.solution.image}
            alt="Illustration of Care-atin RLT solution"
            className="column-image" // Added class, removed inline style
          />
          <h2 className="column-title">
            {problemSolutionData.solution.title}
          </h2>
          <p className="column-text">
            {problemSolutionData.solution.text}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
} 