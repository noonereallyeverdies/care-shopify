import React from "react";
import { motion } from "framer-motion";
import { AnimatedGradient } from "~/components/ui/AnimatedGradient";
import { Section } from "~/components/Text";

interface BentoCardProps {
  title: string;
  value: string;
  subtitle?: string;
  colors: string[];
  delay: number;
}

const BentoCard: React.FC<BentoCardProps> = ({
  title,
  value,
  subtitle,
  colors,
  delay,
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay + 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="relative overflow-hidden h-full bg-contrast"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <AnimatedGradient colors={colors} speed={0.05} blur="medium" />
      <motion.div
        className="relative z-10 p-6 md:p-8 text-primary backdrop-blur-sm h-full"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h3 
          className="text-sm md:text-base uppercase tracking-wide" 
          variants={item}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-xl md:text-2xl font-light mt-2 mb-4"
          variants={item}
        >
          {value}
        </motion.p>
        {subtitle && (
          <motion.p 
            className="text-sm text-primary/70" 
            variants={item}
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export function Benefits() {
  const redGradients = {
    light: ["#FFE4E6", "#FECDD3", "#FDA4AF"],
    medium: ["#FDA4AF", "#FB7185", "#F43F5E"],
    deep: ["#FB7185", "#F43F5E", "#E11D48"],
  };

  return (
    <Section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-light text-primary text-center mb-12">
          the science of <span className="font-normal">transformation</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <BentoCard
              title="Clinically Proven"
              value="Visible Results in 12 Weeks"
              subtitle="93% of users reported improved hair thickness and reduced shedding"
              colors={redGradients.light}
              delay={0.2}
            />
          </div>
          <BentoCard
            title="Red Light Power"
            value="660nm Wavelength"
            subtitle="Optimal spectrum for deep follicle penetration"
            colors={redGradients.medium}
            delay={0.4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BentoCard
            title="Treatment Time"
            value="15 Minutes"
            subtitle="Quick daily sessions for maximum effectiveness"
            colors={redGradients.deep}
            delay={0.6}
          />
          <div className="md:col-span-2">
            <BentoCard
              title="Safety First"
              value="FDA Cleared Technology"
              subtitle="Gentle, non-invasive treatment suitable for all hair types"
              colors={redGradients.light}
              delay={0.8}
            />
          </div>
        </div>
      </div>
    </Section>
  );
} 