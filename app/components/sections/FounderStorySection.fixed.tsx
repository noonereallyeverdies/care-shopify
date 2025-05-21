import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react'; // Example icon for product mention

// Placeholder for founder image - replace with actual path
const FOUNDER_IMAGE_URL = '/images/dr-amelia-chen-placeholder.jpg'; // e.g., /images/dr-amelia-chen.jpg

export function FounderStorySection() {
  return (
    <motion.section 
      className="py-20 md:py-28 bg-white overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-serif font-thin text-neutral-800 mb-10 md:mb-12 text-center lowercase tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            our genesis
          </motion.h2>

          <div className="md:grid md:grid-cols-5 md:gap-12 lg:gap-16 items-center">
            {/* Image Column */}
            <motion.div 
              className="md:col-span-2 mb-8 md:mb-0"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[3/4] bg-stone-100 rounded-lg shadow-lg overflow-hidden relative group hover:shadow-xl transition-shadow duration-300 border border-stone-200/80">
                <img 
                  src={FOUNDER_IMAGE_URL} 
                  alt="Dr. Amelia Chen, Founder of Photonique"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/400x533.png/f0f0f0/cccccc?text=Dr.+Amelia+Chen')} // Fallback placeholder
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/90 to-black/40 text-white">
                  <p className="text-xs md:text-sm font-light">Dr. Chen in her research lab, 2023</p>
                </div>
              </div>
            </motion.div>

            {/* Text Content Column */}
            <motion.div 
              className="md:col-span-3"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p className="text-neutral-700 font-light leading-relaxed mb-6 text-lg md:text-xl">
                <span className="font-medium text-photonique-coral">dr. amelia chen</span>, a biomedical engineer with a passion for holistic wellness, witnessed firsthand the profound impact hair health has on confidence and self-perception. frustrated by the lack of gentle, effective, and scientifically-backed solutions for hair revitalization, she embarked on a personal mission.
              </p>
              <p className="text-neutral-700 font-light leading-relaxed mb-8 text-lg md:text-xl">
                her journey led her deep into the science of <span className="italic">photobiomodulation</span>, exploring how targeted light wavelengths could naturally stimulate cellular regeneration within the hair follicle. <span className="font-medium">photonique touch</span> is the culmination of that research – a device born from empathy, rigorous science, and a desire to make transformative hair wellness accessible to all.
              </p>
              
              <blockquote className="relative border-l-4 border-photonique-peach pl-6 py-4 mb-8 bg-stone-50/70 shadow-sm rounded-r-lg">
                <motion.div
                  className="absolute -left-1 top-4 bottom-4 w-1 bg-photonique-coral/80"
                  animate={{ height: ["0%", "95%", "0%"] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <p className="text-xl md:text-2xl font-serif italic text-neutral-800 leading-relaxed">
                  "my goal was simple: to create something truly effective, that people could trust and easily integrate into their lives. seeing the joy and confidence it brings is the greatest reward."
                </p>
                <p className="mt-4 text-md font-medium text-neutral-600">- dr. amelia chen, founder</p>
              </blockquote>

              {/* Optional: Link to a more detailed About Us page */}
              {/* 
              <Link to="/about-us" className="text-photonique-coral hover:text-rose-700 font-medium inline-flex items-center group">
                learn more about our story
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link> 
              */}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default FounderStorySection;