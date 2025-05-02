import React from 'react';
import { Button } from '~/components/ui/buttons/Button';
import { Sparkle, Eye, Target } from 'lucide-react'; // Updated Icons: Sparkle, Eye, Target
import { motion } from 'framer-motion'; // Import motion

const stages = [
  {
    title: 'early signs',
    duration: 'first 30 days',
    symptoms: 'slight shedding, less volume',
    successRate: '93% success rate when addressed early',
    icon: Sparkle,
    iconColor: 'text-primary',
    bgColor: 'bg-primary/10', // Lightest
  },
  {
    title: 'visible changes',
    duration: '~90 days',
    symptoms: 'thinning at temples, part widening',
    successRate: '78% experienced visible density recovery',
    icon: Eye,
    iconColor: 'text-yellow-500',
    bgColor: 'bg-primary/20', // Medium
  },
  {
    title: 'later stages',
    duration: '180+ days',
    symptoms: 'patchiness or pronounced recession',
    successRate: '62% still saw meaningful regrowth',
    icon: Target,
    iconColor: 'text-green-500',
    bgColor: 'bg-primary/30', // Darkest
  },
];

// Define animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    }
  }
};

// Pulse animation for icons
const pulseAnimation = {
  scale: [1, 1.1, 1],
  opacity: [0.8, 1, 0.8],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    repeatType: "reverse" as const, // Ensure type compatibility
    ease: "easeInOut",
  },
};

export function HairStagesSection() {
  return (
    <section className="py-16 md:py-24 bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-4"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          where are you in your hair story?
        </motion.h2>
        <motion.p 
          className="text-center text-muted-foreground mb-12 md:mb-16 max-w-xl mx-auto"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.1 }}
        >
           understanding your current stage helps tailor expectations and celebrate progress. consistency is key at every step.
        </motion.p>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line placeholder */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block"></div>

          <motion.div 
            className="space-y-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {stages.map((stage, index) => {
              const IconComponent = stage.icon; // Get the component type
              return (
              <motion.div 
                key={index} 
                className="relative md:pl-16"
                variants={fadeInUp}
              >
                {/* Node on the line */}
                <motion.div 
                  className="absolute left-[26px] top-1 w-4 h-4 bg-primary rounded-full border-4 border-background hidden md:block"
                  // Optional: Add subtle pulse to the node too?
                  // animate={{ scale: [1, 1.15, 1] }}
                  // transition={{ delay: index * 0.2, duration: 1.5, repeat: Infinity, repeatType: "reverse"}}
                ></motion.div>

                <div className={`p-6 rounded-lg shadow-md ${stage.bgColor}`}>
                  <div className="flex items-center mb-3">
                     {/* Icon for mobile - WRAPPED with motion.div for pulse */}
                     <motion.div 
                       className="md:hidden mr-3 p-2 bg-primary/20 rounded-full"
                       animate={pulseAnimation} // Apply pulse animation
                     >
                       <IconComponent className={`w-6 h-6 ${stage.iconColor}`} />
                     </motion.div>
                     {/* Icon for desktop - WRAPPED with motion.div for pulse */}
                    <motion.div 
                      className="hidden md:block absolute left-[-44px] top-[-4px] p-2 bg-background rounded-full"
                      animate={pulseAnimation} // Apply pulse animation
                    >
                      <IconComponent className={`w-6 h-6 ${stage.iconColor}`} />
                    </motion.div>
                    <h3 className="text-xl font-semibold mr-2">{stage.title}</h3>
                    <span className="text-sm text-muted-foreground">({stage.duration})</span>
                  </div>
                  <p className="text-muted-foreground mb-2">{stage.symptoms}</p>
                  <p className="text-sm font-medium text-primary mb-4">{stage.successRate}</p>
                   <Button 
                     variant="secondary" 
                     size="sm" 
                    // onClick={() => { /* Add scroll/navigation logic */ }}
                   >
                    Start Now
                  </Button>
                </div>
              </motion.div>
            ); 
          })}
          </motion.div>

          {/* Secondary Inline Prompt for Quiz */}
          <p className="text-center text-sm text-neutral-600 mt-12">
             Take the hair quiz to find your stage.
          </p>

        </div>
      </div>
    </section>
  );
} 