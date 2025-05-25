"use client"; // Required for hooks

import React from 'react';
import { Activity, Award, HeartHandshake, Leaf, Zap } from "lucide-react"; // Changed icons
import { GlowingEffect } from "~/components/ui/GlowingEffect"; // Adjusted import
import { cn } from "~/lib/utils"; // Adjusted import
import { motion } from "framer-motion";

// Renamed component to GlowingBenefits
export function GlowingBenefits() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.165, 0.84, 0.44, 1] }}
        className="text-center space-y-6 mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-light text-primary tracking-tight lowercase">
          clinically-proven benefits
        </h2>
        <p className="text-lg text-primary/70 max-w-2xl mx-auto">
          Our technology combines the latest advances in red light therapy with precision engineering to deliver measurable results.
        </p>
      </motion.div>
      
      <ul className="grid grid-cols-1 grid-rows-none gap-8 md:grid-cols-12 md:grid-rows-2 lg:gap-10 xl:max-h-[36rem]">
        <GridItem
          area="md:[grid-area:1/1/2/5] xl:[grid-area:1/1/2/4]"
          icon={<Zap className="h-5 w-5" />}
          title="Stimulates Follicles"
          description="Clinically-proven red light wavelengths penetrate the scalp to energize dormant hair follicles."
          delay={0.1}
        />
        <GridItem
          area="md:[grid-area:1/5/2/9] xl:[grid-area:1/4/2/7]"
          icon={<Activity className="h-5 w-5" />}
          title="Boosts Circulation"
          description="Enhances blood flow, delivering vital oxygen and nutrients directly to the hair roots for optimal growth."
          delay={0.2}
        />
        <GridItem
          area="md:[grid-area:1/9/2/13] xl:[grid-area:1/7/2/10]"
          icon={<Leaf className="h-5 w-5" />}
          title="Reduces Inflammation"
          description="Calms scalp irritation and inflammation, creating a healthier environment for hair to thrive."
          delay={0.3}
        />
        <GridItem
          area="md:[grid-area:2/1/3/7] xl:[grid-area:2/1/3/6]"
          icon={<Award className="h-5 w-5" />}
          title="Strengthens Hair"
          description="Promotes the production of stronger, thicker hair strands, reducing breakage and improving overall density."
          delay={0.4}
        />
        <GridItem
          area="md:[grid-area:2/7/3/13] xl:[grid-area:2/6/3/10]"
          icon={<HeartHandshake className="h-5 w-5" />}
          title="Safe & Non-Invasive"
          description="A gentle, chemical-free approach suitable for regular use at home, complementing your existing routine."
          delay={0.5}
        />
      </ul>
    </div>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  delay?: number;
}

const GridItem = ({ area, icon, title, description, delay = 0 }: GridItemProps) => {
  return (
    <motion.li 
      className={cn("min-h-[12rem] md:min-h-[14rem] list-none", area)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.165, 0.84, 0.44, 1] }}
    >
      {/* Card container with enhanced styling */}
      <div className="relative h-full rounded-3xl border border-stone-200/50 p-2 md:p-3 bg-white shadow-glossier backdrop-blur-sm">
        {/* Glowing Effect with improved settings */}
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={1}
          variant="default"
          movementDuration={1.5}
        />
        
        {/* Content container with Apple-like styling */}
        <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-2xl bg-stone-50/80 p-5 md:p-7">
          {/* Icon and Title */}
          <div className="flex flex-col gap-3">
            <motion.div 
              className="w-fit rounded-full border border-rose-200 bg-white p-3 text-rose-500"
              whileHover={{ scale: 1.05, backgroundColor: "rgb(255, 237, 242)" }}
              transition={{ duration: 0.3 }}
            >
              {icon}
            </motion.div>
            <h3 className="text-lg md:text-xl font-medium text-primary tracking-tight">
              {title}
            </h3>
          </div>
          
          {/* Description */}
          <p className="text-sm md:text-base leading-relaxed text-primary/70">
            {description}
          </p>
        </div>
      </div>
    </motion.li>
  );
}; 