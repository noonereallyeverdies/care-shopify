import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { BookOpen } from 'lucide-react';

// Spring physics config
const spring = {
  type: "spring",
  stiffness: 250,
  damping: 30,
  mass: 0.8
};

export function FoundersVision() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  return (
    <section ref={ref} className="relative py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="md:col-span-5">
            <motion.div 
              className="relative aspect-square rounded-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={controls}
              variants={{ visible: { opacity: 1, scale: 1, transition: spring } }}
            >
              <img 
                src="/images/prettyhair.jpg" 
                alt="Founder portrait" 
                className="object-cover w-full h-full"
              />
              
              {/* Signature/annotation overlay */}
              <motion.div 
                className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={controls}
                variants={{ visible: { opacity: 1, y: 0, transition: { ...spring, delay: 0.3 } } }}
              >
                <p className="text-neutral-800 text-sm font-medium">Dr. Eliza Chen</p>
                <p className="text-neutral-600 text-xs">Founder & Chief Scientist</p>
              </motion.div>
            </motion.div>
          </div>
          
          <div className="md:col-span-7">
            <div className="flex justify-start mb-8">
              <motion.div 
                className="bg-red-100 rounded-full p-4 relative"
                animate={{ 
                  boxShadow: [
                    "0 0 0 0px rgba(220, 38, 38, 0.2)",
                    "0 0 0 10px rgba(220, 38, 38, 0)",
                    "0 0 0 0px rgba(220, 38, 38, 0)"
                  ]
                }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <BookOpen className="h-8 w-8 text-rose-600 relative z-10" />
              </motion.div>
            </div>
            
            <motion.h2 
              className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-6 lowercase tracking-[0.02em]"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{ visible: { opacity: 1, y: 0, transition: spring } }}
            >
              a founder's obsession with hair science
            </motion.h2>
            
            <motion.div 
              className="space-y-6 text-lg text-neutral-700 leading-[1.618]"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{ visible: { opacity: 1, y: 0, transition: { ...spring, delay: 0.1 } } }}
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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 