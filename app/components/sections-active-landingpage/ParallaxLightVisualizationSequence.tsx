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
    title: 'The Challenge: Hair Thinning Begins',
    description: 'Follicles weaken, leading to visible thinning and reduced vitality. The growth cycle is disrupted.',
    Icon: Lightbulb, // Placeholder
    visualizationSrc: '/visuals/stage1_thinning_follicles.svg', // Example path
  },
  {
    id: 2,
    title: 'Photonique Activation: Dual-Light Precision',
    description: 'Targeted 650nm red and 850nm infrared light waves penetrate the scalp, reaching follicles at optimal depths.',
    Icon: Zap,
    visualizationSrc: '/visuals/stage2_light_activation.svg',
  },
  {
    id: 3,
    title: 'Cellular Rejuvenation: The Core Process',
    description: 'Light energy stimulates mitochondria, boosting cellular activity and promoting nutrient uptake for follicle repair.',
    Icon: Leaf,
    visualizationSrc: '/visuals/stage3_cellular_regeneration.svg',
  },
  {
    id: 4,
    title: 'Visible Transformation: Renewed Fullness',
    description: 'Hair emerges stronger, thicker, and more vibrant as follicles regain health and the growth cycle is restored.',
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
        {/* Light Wave Elements (Conceptual) */}
        <motion.div 
          className="absolute top-1/4 left-0 w-1/2 h-1 bg-rose-500/50 rounded-full blur-sm"
          style={{ x: lightWaveX, opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]) }}
          aria-hidden="true"
        />
        <motion.div 
          className="absolute top-1/3 right-0 w-1/3 h-1.5 bg-red-400/50 rounded-full blur-md"
          style={{ x: useTransform(scrollYProgress, [0,1], ['100%', '-100%']), opacity: useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]) }}
          aria-hidden="true"
        />

        {/* Stage Content Transition */} 
        {stages.map((stage, index) => (
          <motion.div
            key={stage.id}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
            style={{
              opacity: useTransform(currentStageIndex, (latest) => (latest === index ? 1 : 0)),
              scale: useTransform(currentStageIndex, (latest) => (latest === index ? 1 : 0.95)),
              transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
            }}
          >
            <stage.Icon className="w-16 h-16 mb-6 text-rose-400" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4 max-w-2xl">{stage.title}</h2>
            <p className="text-lg md:text-xl text-neutral-300 max-w-xl mb-8">{stage.description}</p>
            {/* Placeholder for detailed visualization */}
            <div className="w-full max-w-md h-64 bg-neutral-800 rounded-lg shadow-xl flex items-center justify-center">
              <p className="text-neutral-500">Visualization for: {stage.title}</p>
              {/* <img src={stage.visualizationSrc} alt={stage.title} className="object-contain h-full w-full" /> */}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ParallaxLightVisualizationSequence; 