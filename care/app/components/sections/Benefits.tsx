import React from "react";
import { motion } from "framer-motion";
import { AnimatedGradient } from "~/components/ui/AnimatedGradient";
import { Section } from "~/components/Text";
import { CheckCircle, Zap, ShieldCheck, Clock } from 'lucide-react';
import { cn } from '~/lib/utils';

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

const benefitsData = [
  {
    id: 'growth',
    icon: Zap,
    title: "Promotes Hair Growth",
    description: "Stimulates follicles at a cellular level for new growth cycles.",
  },
  {
    id: 'thinning',
    icon: CheckCircle,
    title: "Reduces Hair Thinning",
    description: "Strengthens existing hair, improving density for a fuller look.",
  },
  {
    id: 'sessions',
    icon: Clock,
    title: "Quick & Easy Sessions",
    description: "Just 15 minutes daily fits seamlessly into any routine.",
  },
  {
    id: 'safety',
    icon: ShieldCheck,
    title: "Safe & Non-Invasive",
    description: "A natural, drug-free approach, gentle enough for all.",
  }
];

export function Benefits() {
  const redGradients = {
    light: ["#FFE4E6", "#FECDD3", "#FDA4AF"],
    medium: ["#FDA4AF", "#FB7185", "#F43F5E"],
    deep: ["#FB7185", "#F43F5E", "#E11D48"],
  };

  return (
    <Section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="text-3xl md:text-4xl font-medium text-neutral-800 text-center mb-12 md:mb-16 font-sans">
          Real Results, Real Science
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {benefitsData.map((benefit, index) => (
            <div 
              key={benefit.id} 
              className={cn(
                "flex flex-col items-start rounded-3xl border border-neutral-200/60 p-8 shadow-sm",
                index === 0 
                  ? "bg-neutral-800 text-white"
                  : "bg-neutral-50 text-neutral-800"
              )}
            >
              <benefit.icon className={cn(
                "h-10 w-10 mb-4",
                index === 0 ? "text-red-400" : "text-red-500"
              )} />
              <h3 className={cn(
                "font-sans text-2xl mb-2",
                index === 0 ? "font-semibold text-white" : "font-medium text-neutral-800"
              )}>
                {benefit.title}
              </h3>
              <p className={cn(
                "font-sans text-base leading-relaxed",
                index === 0 ? "text-neutral-300" : "text-neutral-600"
              )}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
} 