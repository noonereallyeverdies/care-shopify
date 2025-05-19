import { motion } from "framer-motion";
import { Zap, Sprout, Sparkles } from 'lucide-react';
import { useState } from "react";

interface StepCardProps {
  icon: typeof Zap;
  title: string;
  description: string;
  step: number;
  delay: number;
}

function StepCard({ icon: Icon, title, description, step, delay }: StepCardProps) {
  return (
    <motion.div 
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <div className="relative mb-6">
        <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center">
          <Icon className="w-8 h-8 text-rose-500" />
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 rounded-full text-white flex items-center justify-center text-xs font-medium">
          {step}
        </div>
      </div>
      <h3 className="text-xl font-medium text-neutral-900 mb-2 brand-heading">{title}</h3>
      <p className="text-neutral-600 max-w-xs brand-body">{description}</p>
    </motion.div>
  );
}

export function HowItWorks() {
  const [showMoreScience, setShowMoreScience] = useState(false);
  
  return (
    <section className="py-20 bg-white section-spacing">
      <div className="container mx-auto px-6">
        {/* Section Intro */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-light text-neutral-900 mb-4 brand-heading"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            how the science works
          </motion.h2>
          <motion.p 
            className="text-lg text-neutral-700 brand-body"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Our care<span className="brand-dot">•</span>atin device 
            uses the same natural principles that help plants grow toward sunlight.
            No complex chemicals – just gentle light energy your body recognizes.
          </motion.p>
        </div>

        {/* 3-Step Process */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 relative">
          {/* Arrow Connector - Hidden on Mobile */}
          <div className="hidden md:block absolute top-8 left-[25%] right-[25%] h-1 bg-linear-to-r from-rose-100 via-rose-300 to-rose-100"></div>
          
          <StepCard 
            icon={Zap} 
            title="energize" 
            description="Red light waves gently penetrate your scalp, energizing the mitochondria in hair follicle cells."
            step={1}
            delay={0}
          />
          <StepCard 
            icon={Sparkles} 
            title="restore" 
            description="This energy boost activates cellular repair processes and improves blood circulation to your scalp."
            step={2}
            delay={0.2}
          />
          <StepCard 
            icon={Sprout} 
            title="grow" 
            description="Rejuvenated follicles produce stronger, thicker hair strands with improved shine and resilience."
            step={3}
            delay={0.4}
          />
        </div>

        {/* Science Explanation (Expandable) */}
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="p-6 bg-neutral-50 rounded-xl section-card"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div 
              className="flex justify-between items-center cursor-pointer" 
              onClick={() => setShowMoreScience(!showMoreScience)}
            >
              <h3 className="text-lg font-light text-neutral-900 brand-heading">the science in simple terms</h3>
              <span className="text-rose-500">
                {showMoreScience ? '−' : '+'}
              </span>
            </div>
            
            {showMoreScience && (
              <div className="mt-4 pt-4 border-t border-neutral-100/50">
                <p className="mb-3 text-neutral-700 brand-body">
                  Our technology uses specific wavelengths of red light (650-670nm) that can 
                  penetrate the skin to reach hair follicles. 
                </p>
                <p className="mb-3 text-neutral-700 brand-body">
                  The light is absorbed by a part of your cells called mitochondria 
                  (think of them as tiny batteries). This stimulates ATP production - the energy 
                  currency your cells need to function optimally.
                </p>
                <p className="text-neutral-700 brand-body">
                  With more energy, follicle cells can increase protein production, improve 
                  circulation, and extend the growth phase of the hair cycle - resulting in 
                  visibly thicker, stronger hair.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 