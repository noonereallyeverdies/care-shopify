import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Zap, TrendingUp, Award } from 'lucide-react';

interface Milestone {
  week: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

// Updated milestone data to match brand guidelines
const journeyMilestones = [
  {
    week: 4,
    title: "initial visible improvements",
    description: "reduced shedding and a calmer scalp as the light energy begins to awaken your dormant follicles.",
    icon: Zap,
  },
  {
    week: 8,
    title: "noticeable density & strength",
    description: "hair begins to feel fuller with improved texture as new growth emerges and existing strands are fortified.",
    icon: TrendingUp,
  },
  {
    week: 12,
    title: "complete transformation",
    description: "visibly thicker, more radiant hair. the full potential of your natural beauty, revealed through light.",
    icon: Award,
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

// Hair density visualization component
function HairDensityVisual({ week, animate = true }) {
  // Different densities based on weeks
  const getHairCount = () => {
    switch(week) {
      case 4: return 8;  // Fewer hairs, starting to improve
      case 8: return 14; // More hairs, moderate density
      case 12: return 22; // Maximum density
      default: return 6; // Base state
    }
  };
  
  const hairCount = getHairCount();
  
  return (
    <div className="w-full h-16 relative bg-neutral-50 rounded-lg overflow-hidden border border-neutral-200/70">
      {/* Create array of hairs based on density */}
      {[...Array(hairCount)].map((_, index) => {
        // Calculate positions with some randomness but evenly distributed
        const leftPosition = (index / hairCount * 100) + (Math.random() * 6 - 3);
        const heightVariation = 75 + (Math.random() * 50);
        const widthVariation = 1 + (Math.random() * 0.5);
        const delayVariation = Math.random() * 0.5;
        
        return (
          <motion.div
            key={index}
            className="absolute bottom-0 bg-neutral-700/80"
            style={{
              left: `${leftPosition}%`,
              width: `${widthVariation}px`,
              borderRadius: '1px 1px 0 0',
            }}
            initial={animate ? { height: 0 } : { height: `${heightVariation}%` }}
            animate={{ height: `${heightVariation}%` }}
            transition={{ 
              duration: 1.2, 
              delay: animate ? 0.2 + (index * 0.03) + delayVariation : 0,
              ease: "easeOut"
            }}
          />
        );
      })}
      
      {/* Simple scalp line */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-photonique-peach/20"></div>
    </div>
  );
}

// Timeline marker component
function TimelineMarker({ active, completed }) {
  return (
    <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 ${
      active ? 'bg-photonique-coral scale-125' : 
      completed ? 'bg-photonique-peach/70' : 'bg-neutral-300'
    }`}>
      {completed && <CheckCircle className="w-2 h-2 text-white" />}
    </div>
  );
}

export function TransformationJourneySection() {
  return (
    <motion.section
      className="py-20 md:py-28 bg-white relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Subtle light rays background effect */}
      <div className="absolute inset-0 overflow-hidden">
        <svg width="100%" height="100%" className="absolute top-0 opacity-10" preserveAspectRatio="none">
          <defs>
            <radialGradient id="headerGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#FF7F50" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FF7F50" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#headerGlow)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <motion.h2
            className="text-3xl md:text-4xl font-serif font-thin text-neutral-900 mb-6 lowercase tracking-wider"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            your transformation journey
          </motion.h2>
          <motion.p
            className="text-lg text-neutral-700 font-light leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            a gentle progression of light-activated renewal, week by week.
            your hair's natural potential, awakened through consistent care.
          </motion.p>
        </div>

        {/* Horizontal timeline for desktop */}
        <div className="hidden md:block mb-16">
          <div className="relative h-1 bg-neutral-200 rounded max-w-3xl mx-auto">
            {/* Timeline progress bar */}
            <motion.div 
              className="absolute top-0 left-0 h-full bg-photonique-coral rounded"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              viewport={{ once: true }}
            />
            
            {/* Timeline markers */}
            <div className="absolute -top-1.5 left-0 w-full flex justify-between">
              <TimelineMarker active={false} completed={true} />
              <TimelineMarker active={false} completed={true} />
              <TimelineMarker active={false} completed={true} />
              <TimelineMarker active={true} completed={false} />
            </div>
            
            {/* Timeline labels */}
            <div className="absolute top-4 left-0 w-full flex justify-between text-sm text-neutral-500">
              <div className="text-center -ml-2">Start</div>
              <div className="text-center">Week 4</div>
              <div className="text-center">Week 8</div>
              <div className="text-center -mr-2">Week 12</div>
            </div>
          </div>
        </div>

        {/* Journey milestones */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {journeyMilestones.map((milestone, index) => (
            <motion.div
              key={milestone.week}
              className="relative bg-white p-6 rounded-xl shadow-sm border border-neutral-100 flex flex-col"
              variants={itemVariants}
              custom={index}
            >
              {/* Week badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-photonique-coral text-white text-sm font-medium px-4 py-1 rounded-full">
                week {milestone.week}
              </div>
              
              <div className="flex items-start mb-4 pt-3">
                <div className="mr-4 mt-1 p-2 rounded-full bg-photonique-peach/20">
                  <milestone.icon className="w-5 h-5 text-photonique-coral" />
                </div>
                <h3 className="text-xl font-medium text-neutral-800 lowercase">{milestone.title}</h3>
              </div>
              
              <p className="text-neutral-600 text-sm leading-relaxed mb-5 font-light">
                {milestone.description}
              </p>
              
              {/* Hair density visualization */}
              <div className="mt-auto">
                <p className="text-xs text-neutral-500 mb-2">hair density visualization</p>
                <HairDensityVisual week={milestone.week} />
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Consistency reminder */}
        <motion.div 
          className="max-w-xl mx-auto mt-16 p-5 bg-photonique-peach/5 border border-photonique-peach/20 rounded-lg text-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-neutral-700 text-sm leading-relaxed">
            consistent use (10 minutes, three times weekly) is key to achieving optimal results. individual results may vary.
          </p>
        </motion.div>
        
        {/* Optional link to before/after - uncomment if needed 
        <div className="mt-12 text-center">
          <Link
            to="/before-after"
            className="inline-flex items-center px-6 py-3 rounded-full bg-photonique-coral text-white hover:bg-photonique-coral/90 transition-colors"
          >
            view real results
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
        */}
      </div>
    </motion.section>
  );
}

// Helper function if needed
function ArrowRight(props) {
  return (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path 
        d="M5 12h14M12 5l7 7-7 7" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default TransformationJourneySection;