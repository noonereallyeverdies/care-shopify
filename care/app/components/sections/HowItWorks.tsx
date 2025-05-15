import { motion } from "framer-motion";
import { Zap, Sprout, Sparkles } from 'lucide-react';
import { useState } from "react";
import './HowItWorksLuxury.css';

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
      className="flex flex-col items-center text-center glassy-step-card transition-transform duration-300 hover:scale-105 hover:shadow-2xl group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <div className="relative mb-6">
        <div className="w-20 h-20 bg-rose-100/70 rounded-full flex items-center justify-center shadow-lg step-icon-glow">
          <Icon className="w-10 h-10 text-rose-400 group-hover:animate-shimmer" />
        </div>
        <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-rose-300 via-pink-200 to-yellow-100 rounded-full text-white flex items-center justify-center text-xs font-bold border-2 border-white shadow">
          {step}
        </div>
      </div>
      <h3 className="luxury-serif text-xl md:text-2xl font-bold text-rose-700 mb-2 step-title-gradient">{title}</h3>
      <p className="text-neutral-700 max-w-xs text-base">{description}</p>
    </motion.div>
  );
}

export function HowItWorks() {
  const [showMoreScience, setShowMoreScience] = useState(false);
  
  return (
    <section className="py-24 bg-gradient-to-br from-pink-50 via-pink-100 to-white section-spacing">
      <div className="container mx-auto px-6">
        {/* Section Intro */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.h2 
            className="luxury-serif text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-rose-400 via-pink-300 to-yellow-200 bg-clip-text text-transparent step-title-gradient drop-shadow-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            How the Science Works
          </motion.h2>
          <motion.p 
            className="text-lg text-neutral-700 max-w-xl mx-auto"
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
        <div className="relative mb-20">
          {/* Wavy gold connector - Desktop only */}
          <div className="hidden md:block absolute left-0 right-0 top-16 z-0 pointer-events-none">
            <svg width="100%" height="32" viewBox="0 0 900 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 16 Q150 0 300 16 T600 16 T900 16" stroke="#eab308" strokeWidth="4" fill="none" />
            </svg>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
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
        </div>

        {/* Science Explanation (Expandable) */}
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="p-6 bg-white/80 rounded-2xl border-2 border-pink-200 shadow-xl section-card"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div 
              className="flex justify-between items-center cursor-pointer" 
              onClick={() => setShowMoreScience(!showMoreScience)}
            >
              <h3 className="luxury-serif text-lg font-semibold text-rose-700">The Science in Simple Terms</h3>
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