import React from 'react';
import { Button } from '~/components/ui/buttons/Button'; // Corrected path
import { motion } from 'framer-motion'; // Import motion

// Define standard fade-in-up variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export function EmotionalCtaSection() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden text-foreground">
      {/* Placeholder for video background */}
      <div className="absolute inset-0 bg-neutral-100 z-0">
        {/* Replace with actual video or looping animation later */}
        {/* Optional: Add subtle pattern or texture */}
        {/* <div className="absolute inset-0 bg-[url('/path/to/subtle-pattern.svg')] opacity-10"></div> */}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-6 py-12 md:py-20 max-w-3xl">
        {/* Add motion wrapper to the content box */}
        <motion.div 
          className="bg-white/60 backdrop-blur-md p-8 md:p-12 rounded-lg shadow-xl text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          
          {/* Main Headline */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            ⏳ you're not just losing hair. you're losing time.
          </h2>

          {/* Descriptive Text */}
          <p className="text-base md:text-lg text-neutral-700 mb-6">
            waiting makes hair recovery harder. every day dormant follicles shrink further. but the good news? your scalp still remembers how to grow — it just needs the right signal.
          </p>

          {/* Doctor's Quote */}
          <blockquote className="border-l-4 border-primary pl-4 italic text-neutral-600 mb-8 text-left max-w-xl mx-auto normal-case">
            "the earlier you begin intervention, the better your chances. but we've seen regrowth at all stages."
            <footer className="mt-2 text-sm text-neutral-500 not-italic">
              — dr. karen hansen, board-certified trichologist
            </footer>
          </blockquote>

          {/* CTA Button */}
          <Button 
            variant="primary" 
            size="lg" 
            className="w-full sm:w-auto"
            // onClick={() => console.log('CTA Clicked!')} // Add action later
          >
            start your hair recovery journey
          </Button>

          {/* Optional: Countdown Timer Placeholder */}
          {/* <div className="mt-6 text-sm text-neutral-500">
            Special offer ends in: [Countdown Timer Placeholder]
          </div> */}
        </motion.div>
      </div>
    </section>
  );
} 