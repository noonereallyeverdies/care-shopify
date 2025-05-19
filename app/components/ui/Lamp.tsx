import React from "react";
import { motion } from "framer-motion";
import { cn } from "~/lib/utils";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative z-0 flex min-h-[400px] flex-col items-center justify-center overflow-visible w-full rounded-md",
        className
      )}
    >
      <div className="relative z-50 flex -translate-y-48 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};

export function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative z-20 bg-gradient-to-b from-neutral-800 to-neutral-600 bg-clip-text text-center font-sans text-5xl font-medium tracking-tight text-transparent md:text-6xl lg:text-7xl"
      >
        The Science of Glow
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.4,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative z-20 mt-8 max-w-2xl text-center font-sans text-lg leading-relaxed text-neutral-600 md:text-xl"
      >
        Our revolutionary red light therapy technology harnesses the power of specific wavelengths to stimulate cellular regeneration and enhance natural hair growth processes.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative z-20 mt-24 grid w-full max-w-7xl grid-cols-1 gap-10 px-4 md:grid-cols-3 xl:px-0"
      >
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-200/60 bg-white/90 p-8 shadow-lg transition-all duration-300 ease-in-out hover:border-red-200/60 hover:shadow-xl">
          <div>
            <h3 className="font-sans text-2xl font-medium text-neutral-800">Cellular Activation</h3>
            <p className="mt-3 font-sans text-base leading-relaxed text-neutral-600">Stimulates mitochondrial function and ATP production for enhanced cellular energy and growth.</p>
          </div>
          <div className="absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-gradient-to-tl from-red-50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-70" />
        </div>

        <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-200/60 bg-white/90 p-8 shadow-lg transition-all duration-300 ease-in-out hover:border-red-200/60 hover:shadow-xl">
          <div>
            <h3 className="font-sans text-2xl font-medium text-neutral-800">Increased Blood Flow</h3>
            <p className="mt-3 font-sans text-base leading-relaxed text-neutral-600">Improves circulation to hair follicles, delivering essential nutrients for optimal hair health.</p>
          </div>
          <div className="absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-gradient-to-tl from-red-50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-70" />
        </div>

        <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-200/60 bg-white/90 p-8 shadow-lg transition-all duration-300 ease-in-out hover:border-red-200/60 hover:shadow-xl">
          <div>
            <h3 className="font-sans text-2xl font-medium text-neutral-800">Collagen Production</h3>
            <p className="mt-3 font-sans text-base leading-relaxed text-neutral-600">Boosts natural collagen synthesis for stronger, more resilient hair structure.</p>
          </div>
          <div className="absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-gradient-to-tl from-red-50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-70" />
        </div>
      </motion.div>
    </LampContainer>
  );
} 