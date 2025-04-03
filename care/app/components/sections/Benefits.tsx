'use client'; // Required for hooks

import React from 'react';

import {Activity, Award, Leaf, Zap, Droplet} from 'lucide-react'; // Added Droplet, removed HeartHandshake

// Import motion
import { motion } from 'framer-motion';

import {GlowingEffect} from '~/components/ui/GlowingEffect';
import {cn} from '~/lib/utils';

export function GlowingBenefits() {
  return (
    // Using SectionWrapper styling consistency from _index.tsx
    <section className="w-full max-w-5xl mx-auto px-6 md:px-8 py-20 md:py-28 lg:py-32">
      <motion.h2 
        className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary text-center mb-16 md:mb-20 lowercase"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.6, 0.01, 0.05, 0.95] }}
      >
        rediscover your hair&apos;s natural confidence
      </motion.h2>
      {/* Apply stagger animation to the list */}
      <motion.ul 
        className="grid grid-cols-1 grid-rows-none gap-8 md:grid-cols-12 md:grid-rows-2 lg:gap-10"
        variants={{ 
          whileInView: { transition: { staggerChildren: 0.15 } } // Stagger grid items
        }}
        initial="initial" 
        whileInView="whileInView" 
        viewport={{ once: true, amount: 0.1 }} // Trigger earlier for grid
      >
        {/* Pass animation variants down to GridItem */}
        <GridItem
          area="md:[grid-area:1/1/2/5] xl:[grid-area:1/1/2/4]"
          icon={<Zap className="h-5 w-5" />}
          title="re-energize follicles"
          description="Targeted red light wavelengths encourage resting follicles back towards vitality and growth."
        />
        <GridItem
          area="md:[grid-area:1/5/2/9] xl:[grid-area:1/4/2/7]"
          icon={<Droplet className="h-5 w-5" />}
          title="boost nourishment"
          description="Precise application ensures your nourishing oils/serums reach the scalp directly, maximizing their benefits."
        />
        <GridItem
          area="md:[grid-area:1/9/2/13] xl:[grid-area:1/7/2/10]"
          icon={<Activity className="h-5 w-5" />}
          title="enhance circulation"
          description="The combination of massage and light improves delivery of vital oxygen and nutrients while calming the scalp."
        />
        <GridItem
          area="md:[grid-area:2/1/3/7] xl:[grid-area:2/1/3/6]"
          icon={<Leaf className="h-5 w-5" />}
          title="cultivate scalp health"
          description="Reduce inflammation and create a balanced, comfortable foundation for hair to truly thrive."
        />
        <GridItem
          area="md:[grid-area:2/7/3/13] xl:[grid-area:2/6/3/10]"
          icon={<Award className="h-5 w-5" />}
          title="feel stronger strands"
          description="Promotes hair that feels thicker and resists breakage, building your confidence with every touch."
        />
      </motion.ul>
    </section>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

// Grid item animation variant
const gridItemVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.6, ease: [0.6, 0.01, 0.05, 0.95] }
};

const GridItem = ({area, icon, title, description}: GridItemProps) => {
  return (
    // Wrap li in motion.li and apply variants
    <motion.li 
      className={cn('min-h-[14rem] md:min-h-[16rem] list-none', area)} // Increased min-height
      variants={gridItemVariants}
      // Initial/whileInView are inherited from parent ul
    >
      {/* Add hover effect to the outer container */}
      <motion.div 
        className="relative h-full rounded-[1.5rem] border border-primary/10 p-3 bg-contrast transition-shadow duration-300"
        whileHover={{ 
          scale: 1.03, 
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
          borderColor: "rgba(var(--color-primary) / 0.2)" // Example: slightly brighten border on hover
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }} // Spring physics for hover
      >
        {/* Glowing Effect - Consider if this interacts well with hover scale */}
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
        <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl border border-primary/5 bg-primary/5 p-5 md:p-6 shadow-sm">
          <div className="flex flex-col gap-3">
            <div className="w-fit rounded-lg border border-primary/10 bg-contrast p-2.5 text-primary"> {/* Slightly larger icon padding */} 
              {icon}
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-primary tracking-tight lowercase">
              {title}
            </h3>
          </div>
          {/* Adjusted text size and leading */}
          <p className="text-sm md:text-base leading-relaxed text-primary/80">
            {description}
          </p>
        </div>
      </motion.div>
    </motion.li>
  );
};
