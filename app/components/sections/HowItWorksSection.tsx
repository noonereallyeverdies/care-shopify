import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const technologySteps = [
  {
    title: "massage",
    benefit: "stimulates circulation",
    image: "/images/massage-step.jpg" // Replace with actual product photos
  },
  {
    title: "light therapy", 
    benefit: "activates growth",
    image: "/images/light-therapy-step.jpg" // Replace with actual product photos
  },
  {
    title: "precision oils",
    benefit: "nourishes at root",
    image: "/images/oils-step.jpg" // Replace with actual product photos
  }
];

export function HowItWorksSection() {
  return (
    <motion.section 
      className="py-20 md:py-28 bg-white relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-serif font-light lowercase tracking-wide text-neutral-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            3-in-1 technology
          </motion.h2>
          <motion.p 
            className="text-lg text-neutral-600 font-light max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            three proven methods. one device. 10 minutes.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
          {technologySteps.map((step, index) => (
            <motion.div
              key={index}
              className="text-center group relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              {/* Connection line to next step */}
              {index < technologySteps.length - 1 && (
                <motion.div 
                  className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-photonique-coral/30 transform -translate-y-1/2"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 + (index * 0.2) }}
                />
              )}
              
              {/* Product photo */}
              <div className="relative mb-6">
                <div className="aspect-square w-48 mx-auto rounded-2xl overflow-hidden bg-neutral-100 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  {/* Placeholder for actual product photos */}
                  <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-photonique-coral/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-photonique-coral font-medium text-lg">{index + 1}</span>
                      </div>
                      <span className="text-neutral-400 text-sm">Product Photo</span>
                    </div>
                  </div>
                  {/* Replace above div with actual image when available:
                  <img 
                    src={step.image} 
                    alt={`${step.title} demonstration`}
                    className="w-full h-full object-cover"
                  />
                  */}
                </div>
                
                {/* Ambient glow */}
                <motion.div 
                  className="absolute inset-0 -z-10 bg-gradient-radial from-photonique-coral/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-serif font-light lowercase tracking-wide text-neutral-900">
                  {step.title}
                </h3>
                <div className="flex items-center justify-center">
                  <Check className="w-4 h-4 text-photonique-coral mr-2" strokeWidth={2} />
                  <p className="text-neutral-600 font-light text-sm">
                    {step.benefit}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Simple result statement */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="inline-flex items-center px-6 py-3 bg-photonique-coral/5 border border-photonique-coral/20 rounded-full">
            <div className="w-2 h-2 bg-photonique-coral rounded-full mr-3 animate-pulse"></div>
            <p className="text-neutral-700 font-light text-sm">
              clinical studies show 87% improvement in 8 weeks
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default HowItWorksSection;