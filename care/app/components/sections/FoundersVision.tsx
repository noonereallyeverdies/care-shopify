import React from 'react';
import { motion } from 'framer-motion';
import { 
  // useRef, useEffect // Removed hooks
 } from 'react';
import { BookOpen } from 'lucide-react';

// Spring physics config (keep for now, might be used later)
const spring = {
  type: "spring",
  stiffness: 250,
  damping: 30,
  mass: 0.8
};

export function FoundersVision() {
  // Remove animation hooks
  // const controls = useAnimation();
  // const ref = useRef(null);
  // const isInView = useInView(ref, { once: true, amount: 0.2 });
  // useEffect(() => { ... });

  return (
    <motion.section 
      className="py-24 bg-contrast relative z-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="md:col-span-5">
            {/* Remove motion.div */}
            <div 
              className="relative aspect-square rounded-2xl overflow-hidden"
              // initial/animate/variants removed
            >
              <img 
                src="/images/prettyhair.jpg" 
                alt="Founder portrait" 
                className="object-cover w-full h-full"
              />
              
              {/* Signature/annotation overlay - Remove motion.div */}
              <div 
                className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm"
                // initial/animate/variants removed
              >
                <p className="text-neutral-800 text-sm font-medium">Dr. Eliza Chen</p>
                <p className="text-neutral-600 text-xs">Founder & Chief Scientist</p>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-7">
            <div className="flex justify-start mb-8">
              {/* Remove motion.div */}
              <div 
                className="bg-rose-100 rounded-full p-4 relative"
                // animate/transition removed
              >
                <BookOpen className="h-8 w-8 text-rose-600 relative z-10" />
              </div>
            </div>
            
            {/* Remove motion.h2 */}
            <h2 
              className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-6 lowercase tracking-[0.02em]"
              // initial/animate/variants removed
            >
              a founder's obsession with hair science
            </h2>
            
            {/* Remove motion.div */}
            <div 
              className="space-y-6 text-lg text-neutral-700 leading-[1.618]"
              // initial/animate/variants removed
            >
              <p>
                "As a dermatological researcher specializing in follicular health, I was frustrated by the gap between scientific understanding and consumer products. For years, effective clinical treatments remained inaccessible while over-promised, under-delivered retail solutions dominated the market."
              </p>
              
              <p>
                "We founded care•atin with a radical premise: bring medical-grade technology to everyone in a format that feels like a beautiful ritual, not a clinical treatment. Our device embodies the culmination of decades of research in cellular regeneration, combining precise light therapy, targeted serum delivery, and gentle stimulation."
              </p>
              
              <p className="font-medium text-neutral-900">
                Our mission is simple: transform hair care from a cosmetic quick-fix into a health-first approach that respects your body's natural processes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
} 