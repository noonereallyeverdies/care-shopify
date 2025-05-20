import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Coffee, Smile } from 'lucide-react'; // Example icons

const benefits = [
  {
    icon: Zap,
    headline: "Fast Results",
    blurb: "Experience visibly healthier, fuller hair in weeks. Our technology accelerates your journey to radiance.",
  },
  {
    icon: Coffee, // Using coffee as a metaphor for an easy daily ritual
    headline: "Easy Routine",
    blurb: "Just 10 minutes, 3 times a week. Seamlessly integrate Photonique into your life, effortlessly.",
  },
  {
    icon: Smile,
    headline: "Lasting Confidence",
    blurb: "Unlock the vibrant, confident you. Great hair is just the beginning of your transformation.",
  },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function KeyBenefitsSection() {
  return (
    <motion.section 
      className="py-16 md:py-24 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-neutral-900 mb-4 lowercase">
            why photonique exists
          </h2>
          <p className="text-lg md:text-xl text-neutral-700 max-w-2xl mx-auto leading-relaxed">
            We believe transformative hair wellness should be simple, effective, and empowering, giving you back time and confidence.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          variants={sectionVariants} // This applies stagger to children of this div
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-neutral-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
              variants={cardVariants}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <benefit.icon className="h-12 w-12 text-rose-600 mb-6" />
              <h3 className="text-xl font-sans font-semibold text-neutral-800 mb-3 uppercase tracking-wider">
                {benefit.headline}
              </h3>
              <p className="text-neutral-600 leading-relaxed text-sm">
                {benefit.blurb}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default KeyBenefitsSection; 