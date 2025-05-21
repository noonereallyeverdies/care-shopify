import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Zap, TrendingUp, Award } from 'lucide-react'; // Example icons

interface Milestone {
  week: number;
  title: string;
  description: string;
  icon: React.ElementType;
  visual?: string; // Path to an abstract visual if needed
}

const journeyMilestones: Milestone[] = [
  {
    week: 4,
    title: "a gentle awakening",
    description: "experience reduced shedding and a healthier-feeling scalp as your follicles begin to awaken. you'll notice less hair in your brush and a renewed sense of possibility.",
    icon: Zap, // Represents initial activation/spark
  },
  {
    week: 8,
    title: "noticeable new life",
    description: "your hair begins to feel fuller and stronger as new growth emerges. run your fingers through your hair and feel the difference—this is where confidence begins to return.",
    icon: TrendingUp, // Represents growth and progress
  },
  {
    week: 12,
    title: "your full radiance revealed",
    description: "witness visibly thicker, more radiant hair that moves with natural vitality. embrace the full transformation and the renewed confidence that comes with truly loving your hair again.",
    icon: Award, // Represents achievement/peak results
  },
];

const listItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const visualVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.2 + 0.1, // Slightly after text
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export function TransformationJourneySection() {
  return (
    <motion.section
      className="py-20 md:py-28 bg-white" // Clean white background
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-20">
          <motion.h2
            className="text-3xl md:text-4xl font-serif font-light lowercase tracking-wide text-neutral-800 mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            your transformation revealed
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-neutral-700 font-light leading-relaxed max-w-xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            watch as your hair transforms week by week. this journey isn't just about hair—it's about rediscovering confidence and embracing your natural radiance.
          </motion.p>
        </div>

        <div className="relative">
          {/* Enhanced: Connecting line for timeline with visual elements */}
          <div className="hidden md:block absolute top-10 bottom-10 left-1/2 -translate-x-1/2">
            {/* Main vertical line */}
            <div className="absolute inset-0 w-px bg-gradient-to-b from-photonique-peach/30 via-photonique-peach/60 to-photonique-peach/30"></div>
            
            {/* Subtle pulse effect along the line */}
            <motion.div 
              className="absolute top-0 w-px h-full bg-photonique-coral/70"
              animate={{ 
                scaleY: [0, 0.3, 0],
                y: [0, 400, 0],
                opacity: [0, 0.8, 0]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1
              }}
            />
          </div>

          <div className="space-y-16 md:space-y-0 md:grid md:grid-cols-1 md:gap-y-24 lg:gap-y-28">
            {journeyMilestones.map((milestone, index) => (
              <motion.div
                key={milestone.week}
                className="relative md:flex md:items-start md:space-x-8"
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {/* Milestone Visual Indicator (Enhanced Circle on Line) */}
                <motion.div 
                  className="hidden md:flex absolute top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-photonique-peach to-photonique-coral border-2 border-white shadow-lg group-hover:shadow-rose-200/50 transition-shadow duration-300"
                  variants={visualVariants}
                  custom={index}
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full opacity-30 bg-photonique-peach"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <milestone.icon className="w-4 h-4 text-white" />
                </motion.div>
                
                {/* Mobile: Icon above text */}
                <div className="md:hidden flex items-center mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-photonique-peach/10 mr-4">
                        <milestone.icon className="w-6 h-6 text-photonique-coral" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-800">
                      week {milestone.week}: <span className="font-normal">{milestone.title}</span>
                    </h3>
                </div>


                {/* Content Block */}
                <motion.div 
                  className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 md:ml-auto md:text-left' : 'md:pl-8 md:text-left'}`}
                  variants={listItemVariants} // Use listItemVariants for the content block
                  custom={index}
                >
                  {/* Desktop: Title inside content block */}
                  <h3 className="hidden md:block text-2xl font-semibold text-neutral-800 mb-2">
                    week {milestone.week}: <span className="font-normal">{milestone.title}</span>
                  </h3>
                  <p className="text-neutral-600 font-light leading-relaxed text-base md:text-lg">
                    {milestone.description}
                  </p>
                  {/* Placeholder for abstract visual related to density */}
                  {milestone.visual && (
                    <motion.img
                      src={milestone.visual}
                      alt={`Visual for Week ${milestone.week}`}
                      className="mt-4 rounded-lg shadow-sm w-full h-auto max-w-xs mx-auto md:mx-0"
                      variants={visualVariants}
                      custom={index}
                    />
                  )}
                </motion.div>
                
                {/* Spacer for alternating layout on desktop - this is a bit tricky with flex order, 
                    might need to adjust structure or use grid more effectively if complex alignment is needed.
                    For a simple centered timeline, this approach is okay.
                    If we want true alternating left/right text blocks, the structure needs `order` or two columns.
                */}
                 <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8 md:order-first'}`}>
                    {/* This div helps with spacing, content is in the other div */}
                 </div>


              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Optional: Link to Before & After Tool */}
        {/* <div className="mt-16 md:mt-24 text-center">
          <Link 
            to="/before-after" // Adjust link as needed
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-photonique-coral hover:bg-rose-700 transition-colors"
          >
            See the Transformation
            <ArrowRight className="ml-2" />
          </Link>
        </div> */}

      </div>
    </motion.section>
  );
}

// Helper for ArrowRight if not globally available (copied from DeviceShowcase for now)
function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props} className={`ml-2 h-5 w-5 ${props.className || ''}`}>
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}


export default TransformationJourneySection; 