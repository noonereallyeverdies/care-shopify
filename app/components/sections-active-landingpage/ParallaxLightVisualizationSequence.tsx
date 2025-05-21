import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Lightbulb, Zap, Leaf, Sparkles } from 'lucide-react'; // Placeholder icons

interface Stage {
  id: number;
  title: string;
  description: string;
  Icon: React.ElementType;
  visualizationSrc: string; // Placeholder for actual SVG/image path
}

const stages: Stage[] = [
  {
    id: 1,
    title: 'dormancy: the beginning',
    description: 'follicles enter a state of rest, reducing their activity and causing visible thinning. circulation diminishes, limiting essential nutrients and oxygen.',
    Icon: Lightbulb,
    visualizationSrc: '/visuals/stage1_thinning_follicles.svg',
  },
  {
    id: 2,
    title: 'illumination: the awakening',
    description: 'precisely calibrated 650nm red and 850nm infrared wavelengths penetrate to different tissue depths, creating a matrix of revitalizing energy.',
    Icon: Zap,
    visualizationSrc: '/visuals/stage2_light_activation.svg',
  },
  {
    id: 3,
    title: 'cellular renaissance: the invisible transformation',
    description: 'light energy converts to cellular energy, stimulating mitochondria and initiating ATP production. circulation improves, nourishing follicles from within.',
    Icon: Leaf,
    visualizationSrc: '/visuals/stage3_cellular_regeneration.svg',
  },
  {
    id: 4,
    title: 'emergence: the visible metamorphosis',
    description: 'renewed follicles produce thicker, more resilient hair with greater density and natural luster. the growth cycle extends, allowing hair to reach its full potential.',
    Icon: Sparkles,
    visualizationSrc: '/visuals/stage4_visible_results.svg',
  },
];

const ParallaxLightVisualizationSequence: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'], // Track scroll from start to end of the section
  });

  // Determine current stage based on scroll progress
  const currentStageIndex = useTransform(scrollYProgress, (value) => {
    return Math.min(stages.length - 1, Math.floor(value * stages.length));
  });

  // Example of transforming scroll progress for an animation (e.g., light wave movement)
  const lightWaveX = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={sectionRef} className="relative bg-neutral-900 text-white py-24" style={{ height: `${stages.length * 100}vh` }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Advanced SVG Light Wave Visualization */}
        <motion.svg 
          className="absolute w-full h-full" 
          viewBox="0 0 1000 1000" 
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Red 650nm wave with sophisticated gradient */}
          <motion.path
            d="M0,500 C200,450 300,550 500,500 C700,450 800,550 1000,500"
            fill="none"
            stroke="url(#redGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1 }}
            style={{ 
              x: lightWaveX,
              opacity: useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]),
              filter: 'drop-shadow(0 0 8px rgba(249, 93, 148, 0.3))'
            }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          />
          
          {/* Infrared 850nm wave with subtle shimmer */}
          <motion.path
            d="M0,600 C150,630 350,570 500,600 C650,630 850,570 1000,600"
            fill="none"
            stroke="url(#infraredGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1 }}
            style={{ 
              x: useTransform(scrollYProgress, [0,1], ['100%', '-100%']),
              opacity: useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]),
              filter: 'drop-shadow(0 0 12px rgba(207, 31, 93, 0.2))'
            }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
          />
          
          {/* Add sophisticated gradients */}
          <defs>
            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(249, 93, 148, 0.2)" />
              <stop offset="50%" stopColor="rgba(249, 93, 148, 0.8)" />
              <stop offset="100%" stopColor="rgba(249, 93, 148, 0.2)" />
            </linearGradient>
            <linearGradient id="infraredGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(207, 31, 93, 0.1)" />
              <stop offset="50%" stopColor="rgba(207, 31, 93, 0.6)" />
              <stop offset="100%" stopColor="rgba(207, 31, 93, 0.1)" />
            </linearGradient>
          </defs>
        </motion.svg>
        
        {/* Particle effect for light energy visualization */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 12 }).map((_, index) => (
            <motion.div 
              key={index}
              className="absolute w-2 h-2 bg-rose-300/30 rounded-full"
              style={{
                top: `${20 + (index * 5)}%`,
                left: `${10 + (index * 7)}%`,
                filter: 'blur(3px)',
                opacity: useTransform(scrollYProgress, 
                  [0, 0.3, 0.7, 1], 
                  [0, 0.3 * (index % 3 + 1), 0.3 * (index % 3 + 1), 0])
              }}
              animate={{
                y: [-10, 10],
                x: [index % 2 ? -5 : 5, index % 2 ? 5 : -5],
              }}
              transition={{
                duration: 2 + (index % 3),
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Stage Content Transition */} 
        {stages.map((stage, index) => (
          <motion.div
            key={stage.id}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
            style={{
              opacity: useTransform(currentStageIndex, (latest) => (latest === index ? 1 : 0)),
              scale: useTransform(currentStageIndex, (latest) => (latest === index ? 1 : 0.98)),
              transition: 'opacity 0.8s cubic-bezier(0.19, 1, 0.22, 1), transform 0.8s cubic-bezier(0.19, 1, 0.22, 1)',
            }}
          >
            <stage.Icon className="w-12 h-12 mb-10 text-rose-400/70" />
            <h2 className="text-3xl md:text-4xl font-serif font-light lowercase tracking-wide mb-6 max-w-2xl">{stage.title}</h2>
            <p className="text-lg md:text-xl text-white/70 max-w-xl mb-12 font-light leading-relaxed tracking-wide">{stage.description}</p>
            {/* Sophisticated visualization container */}
            <motion.div 
              className="w-full max-w-xl h-72 bg-neutral-900/50 border border-neutral-800 rounded-none overflow-hidden relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            >
              {/* Scientific measurement markers */}
              <div className="absolute left-0 top-0 h-full w-8 flex flex-col justify-between items-center py-4 text-neutral-500 text-xs">  
                <span>0mm</span>
                <span>4mm</span>
                <span>8mm</span>
              </div>
              
              {/* Visualization placeholder with premium styling */}
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-neutral-400 lowercase tracking-widest text-sm font-light">visualization: {stage.title.split(':')[0]}</p>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute bottom-4 right-4 flex space-x-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-1.5 h-1.5 rounded-full ${i === index ? 'bg-rose-500' : 'bg-neutral-700'}`}
                  ></div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ParallaxLightVisualizationSequence; 