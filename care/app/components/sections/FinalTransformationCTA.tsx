import React from 'react';
import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';
import { CTAButton, CTASection } from '~/components/ui/CTAButton';

export function FinalTransformationCTA() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const guaranteeItems = [
    {
      icon: "✓",
      text: "90-day transformation guarantee"
    },
    {
      icon: "♾",
      text: "Lifetime device warranty"
    },
    {
      icon: "⚡",
      text: "Free shipping & returns"
    }
  ];

  return (
    <motion.section 
      className="py-24 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Sophisticated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-acc-primary/5 via-brand-light to-acc-tech/5"></div>
      
      {/* Subtle tech particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-acc-primary to-acc-tech rounded-full opacity-10"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%" 
            }}
            animate={{ 
              y: ["-10px", "10px", "-10px"],
              opacity: [0.05, 0.15, 0.05] 
            }}
            transition={{ 
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2 
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="max-w-4xl mx-auto text-center" variants={itemVariants}>
          <span className="text-acc-primary font-medium block mb-4 tracking-wider uppercase text-sm">
            Your Transformation Awaits
          </span>
          
          <h2 className="text-4xl md:text-6xl font-light text-primary-text-dark mb-6 lowercase leading-tight">
            begin your journey to 
            <br />
            <span className="text-gradient-primary">mindful renewal</span>
          </h2>
          
          <motion.p 
            className="text-xl text-primary-text-medium font-light leading-relaxed mb-12 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Join thousands who have discovered that true transformation happens when ancient wisdom meets modern innovation. Your hair wellness journey starts with a single, mindful choice.
          </motion.p>

          {/* Guarantee Highlights */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            variants={itemVariants}
          >
            {guaranteeItems.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-acc-primary/10 shadow-sm"
                whileHover={{ y: -5, shadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-3xl text-acc-primary mb-3">{item.icon}</div>
                <p className="text-primary-text-dark font-medium">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Main CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
            variants={itemVariants}
          >
            <CTAButton 
              to="/products/care-atin-device" 
              variant="primary" 
              size="lg"
              className="group"
            >
              <span className="flex items-center space-x-2">
                <span>start your transformation</span>
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </span>
            </CTAButton>
            
            <CTAButton 
              to="/pages/science" 
              variant="secondary" 
              size="lg"
            >
              explore the science
            </CTAButton>
          </motion.div>

          {/* Social Proof */}
          <motion.div 
            className="bg-white/60 backdrop-blur-sm rounded-xl p-8 border border-acc-primary/10"
            variants={itemVariants}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="text-center">
                <p className="text-3xl font-light text-acc-primary mb-2">50,000+</p>
                <p className="text-sm text-primary-text-medium">transformations begun</p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-primary-text-medium">4.8/5 customer satisfaction</p>
              </div>
              
              <div className="text-center">
                <p className="text-3xl font-light text-acc-primary mb-2">96%</p>
                <p className="text-sm text-primary-text-medium">would recommend to a friend</p>
              </div>
            </div>
          </motion.div>

          {/* Final message */}
          <motion.p 
            className="text-primary-text-medium italic mt-8 font-light"
            variants={itemVariants}
          >
            "Your journey of renewal begins with a single, intentional step toward self-care."
          </motion.p>
        </motion.div>
      </div>

      {/* Elegant corner accents */}
      <div className="absolute top-8 left-8 w-24 h-24 border-t-2 border-l-2 border-acc-primary/20 rounded-tl-3xl"></div>
      <div className="absolute bottom-8 right-8 w-24 h-24 border-b-2 border-r-2 border-acc-tech/20 rounded-br-3xl"></div>
    </motion.section>
  );
}