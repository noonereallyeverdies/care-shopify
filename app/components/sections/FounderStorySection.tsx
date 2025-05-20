import React from 'react';
import { motion } from 'framer-motion';

export function FounderStorySection() {
  return (
    <motion.section 
      className="py-16 md:py-24 bg-rose-50" // Using a subtle brand color for background
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
          {/* Image Placeholder for Founder */}
          <motion.div 
            className="lg:col-span-5 bg-neutral-200 rounded-xl aspect-[3/4] flex items-center justify-center text-neutral-500 lg:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-xl p-4 text-center">Elegant portrait of founder</p>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            className="lg:col-span-7 lg:order-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-neutral-900 mb-6 lowercase">
              our mission
            </h2>
            <p className="text-lg text-neutral-700 leading-relaxed mb-6">
              when our founder, dr. amelia chen, experienced her own hair loss journey, she discovered the gap between clinical treatments and accessible home solutions.
            </p>
            
            <blockquote className="my-8 p-6 bg-white border-l-4 border-rose-500 shadow-md rounded-r-lg">
              <p className="text-xl italic text-neutral-800 leading-relaxed">
                "hair loss isn't just a physical experience—it impacts how we see ourselves. i created care•atin to bring professional-grade technology into people's homes, making effective treatment accessible to everyone struggling with hair loss and thinning."
              </p>
              <cite className="block text-right mt-4 text-neutral-600 font-medium">— Dr. Amelia Chen, Founder of care•atin</cite>
            </blockquote>
            
            <p className="text-lg text-neutral-700 leading-relaxed">
              today, care•atin continues to innovate at the intersection of beauty and technology, with the photonique touch representing our commitment to evidence-based solutions that deliver real results.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default FounderStorySection; 