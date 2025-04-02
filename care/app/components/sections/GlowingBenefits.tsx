"use client"; // Required for hooks

import React from 'react';
import { Activity, Award, HeartHandshake, Leaf, Zap } from "lucide-react"; // Changed icons
import { GlowingEffect } from "~/components/ui/GlowingEffect"; // Adjusted import
import { cn } from "~/lib/utils"; // Adjusted import

// Renamed component to GlowingBenefits
export function GlowingBenefits() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12 md:mb-16">Revitalize Your Hair from Within</h2>
      <ul className="grid grid-cols-1 grid-rows-none gap-6 md:grid-cols-12 md:grid-rows-2 lg:gap-8 xl:max-h-[34rem]">
        {/* Updated content for actual benefits */}
        <GridItem
          area="md:[grid-area:1/1/2/5] xl:[grid-area:1/1/2/4]"
          icon={<Zap className="h-5 w-5" />}
          title="Stimulates Follicles"
          description="Clinically-proven red light wavelengths penetrate the scalp to energize dormant hair follicles."
        />
        <GridItem
          area="md:[grid-area:1/5/2/9] xl:[grid-area:1/4/2/7]"
          icon={<Activity className="h-5 w-5" />}
          title="Boosts Circulation"
          description="Enhances blood flow, delivering vital oxygen and nutrients directly to the hair roots for optimal growth."
        />
        <GridItem
          area="md:[grid-area:1/9/2/13] xl:[grid-area:1/7/2/10]"
          icon={<Leaf className="h-5 w-5" />}
          title="Reduces Inflammation"
          description="Calms scalp irritation and inflammation, creating a healthier environment for hair to thrive."
        />
        <GridItem
          area="md:[grid-area:2/1/3/7] xl:[grid-area:2/1/3/6]"
          icon={<Award className="h-5 w-5" />}
          title="Strengthens Hair"
          description="Promotes the production of stronger, thicker hair strands, reducing breakage and improving overall density."
        />
        <GridItem
          area="md:[grid-area:2/7/3/13] xl:[grid-area:2/6/3/10]"
          icon={<HeartHandshake className="h-5 w-5" />}
          title="Safe & Non-Invasive"
          description="A gentle, chemical-free approach suitable for regular use at home, complementing your existing routine."
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
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={cn("min-h-[12rem] md:min-h-[14rem] list-none", area)}>
      {/* Card container: Use contrast bg, subtle border */}
      <div className="relative h-full rounded-[1.25rem] border border-primary/10 p-2 md:rounded-[1.5rem] md:p-3 bg-contrast">
        {/* Glowing Effect: Ensure borderWidth is 1 */}
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false} // Enable the effect
          proximity={64}
          inactiveZone={0.01}
          borderWidth={1} // Use 1px border
          variant="default" // Keep multi-color
          movementDuration={1.5}
        />
        {/* Content container: subtle inner border, primary/5 bg tint */}
        <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl border border-primary/5 bg-primary/5 p-4 md:p-6 shadow-sm">
           {/* Icon and Title: Primary text, subtle bg */}
          <div className="flex flex-col gap-3">
            <div className="w-fit rounded-lg border border-primary/10 bg-contrast p-2 text-primary">
              {icon}
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-primary tracking-tight">
              {title}
            </h3>
          </div>
           {/* Description: Primary text muted */}
          <p className="text-sm md:text-base leading-relaxed text-primary/80">
            {description}
          </p>
        </div>
      </div>
    </li>
  );
}; 