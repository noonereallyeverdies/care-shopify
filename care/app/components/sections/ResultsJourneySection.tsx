import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '~/components/ui/buttons/Button';
import { AnimatedGradient } from '~/components/ui/AnimatedGradient';
import { ClientOnly } from '~/components/utility/ClientOnly';

const journeyPoints = [
  {
    title: "day 30",
    description: "feel the difference — less shedding, healthier roots",
    snippet: "“my brush isn't full of hair anymore!”"
  },
  {
    title: "day 60",
    description: "see the difference — fuller texture, new growth visible",
    snippet: "“baby hairs! i actually see them.”"
  },
  {
    title: "day 90",
    description: "live the difference — restored confidence, effortless hair moments",
    snippet: "“finally wearing my hair down again.”"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, x: -10 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export function ResultsJourneySection() {
  const palette1 = ["#FADADD", "#FFF7F0", "#FDEFEF", "#FAF0E6"];

  return (
    <section className="relative py-24 md:py-40 text-foreground overflow-hidden bg-neutral-50">
      <div className="absolute inset-0 z-0 opacity-40">
        <ClientOnly>
          {() => <AnimatedGradient colors={palette1} />}
        </ClientOnly>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.h2 
          className="text-3xl md:text-5xl font-light mb-16 md:mb-24 max-w-4xl mx-auto lowercase tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          90 days from now, your hair could tell a different story
        </motion.h2>

        <motion.div 
          className="flex flex-col md:flex-row justify-center items-stretch gap-6 md:gap-8 max-w-5xl mx-auto mb-16 md:mb-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {journeyPoints.map((point, index) => (
            <motion.div 
              key={index} 
              className="flex-1 p-6 bg-white/60 backdrop-blur-sm rounded-lg shadow-sm border border-white/30 text-left"
              variants={itemVariants}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <h3 className="text-xl md:text-2xl font-medium text-primary mb-3 lowercase tracking-tight">{point.title}</h3>
              <p className="text-base md:text-lg text-neutral-700 lowercase leading-relaxed mb-3">{point.description}</p>
              <p className="text-sm italic text-neutral-500 lowercase">{point.snippet}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Button 
              variant="primary"
              size="lg"
              className="relative w-full sm:w-auto shadow-lg ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-300 ease-in-out px-8 py-3"
            >
              start your 90-day hair renewal →
            </Button>
          </motion.div>
          <p className="mt-5 text-xs text-neutral-500 lowercase">
            free shipping • risk-free for 90 days • ships in 24 hours.
          </p>
          {/* Secondary Inline Prompt */}
          <p className="mt-4 text-sm text-neutral-600">
            See more real results ↓
          </p>
          {/* Quiz Prompt */}
          <p className="mt-2 text-sm text-neutral-600">
             Or, take the hair quiz to personalize your journey.
          </p>
        </motion.div>
      </div>
    </section>
  );
} 