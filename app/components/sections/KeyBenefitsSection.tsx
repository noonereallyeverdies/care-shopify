import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Coffee, Smile, CheckCircle, ShieldCheck, Star, Target } from 'lucide-react'; // Added more icons for flexibility
import { Container } from '~/components/ui/Container';

const benefits = [
  {
    icon: Smile,
    headline: "sensory transformation",
    blurb: "feel the subtle warmth as light energy awakens dormant follicles. experience the quiet confidence that comes with hair that moves and shines with renewed vitality.",
  },
  {
    icon: Target,
    headline: "gentle precision",
    blurb: "precisely calibrated dual light therapy (650nm red & 850nm infrared) gently nourishes follicles at optimal depths, exactly where needed.",
  },
  {
    icon: Coffee,
    headline: "elegant simplicity",
    blurb: "ten minutes. three times weekly. a quiet moment of self-care that integrates effortlessly into your routine, creating transformation without disruption.",
  },
  // Example of a 4th card, if desired, for Social Validation or another benefit
  /*
  {
    icon: Star, // Social Validation
    headline: "Loved By Users",
    blurb: "Join thousands experiencing transformative results. Our community rates Photonique 4.8 stars for visible improvements.", // Example: 17 words
  },
  */
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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.19, 1, 0.22, 1], // Custom easing for elegant motion
    },
  },
};

export function KeyBenefitsSection() {
  return (
    <motion.section 
      className="py-12 md:py-16 lg:py-20 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-neutral-900 mb-6 lowercase tracking-wide">
            why photonique exists
          </h2>
          <p className="text-lg md:text-xl text-neutral-700 max-w-2xl mx-auto font-light leading-relaxed">
            we believe transformative hair wellness should be simple, effective, and empowering, giving you back time and confidence.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 xl:gap-20"
          variants={sectionVariants} // This applies stagger to children of this div
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className={`p-6 md:p-8 flex flex-col items-center text-center transition-all duration-500 rounded-2xl ${index % 2 === 0 ? 'bg-stone-50/50' : 'bg-rose-50/20'}`}
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
                backgroundColor: index % 2 === 0 ? "rgba(255, 127, 80, 0.05)" : "rgba(255, 127, 80, 0.1)"
              }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            >
              {React.createElement(benefit.icon as any, { className: "h-8 w-8 md:h-10 md:w-10 text-rose-500/70 mb-4" })}
              <h3 className="text-xl font-serif font-light text-neutral-800 mb-3 lowercase tracking-widest">
                {benefit.headline}
              </h3>
              <p className="text-neutral-600 leading-relaxed text-base font-light">
                {benefit.blurb}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </motion.section>
  );
}

export default KeyBenefitsSection; 