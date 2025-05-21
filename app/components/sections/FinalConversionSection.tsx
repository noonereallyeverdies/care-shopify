import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from '@remix-run/react';
import { ShoppingCart, AlertTriangle, Zap, ShieldCheck, Package, Repeat, ArrowRight } from 'lucide-react';

export function FinalConversionSection() {
  const priceControls = useAnimation();
  const msrpControls = useAnimation();
  const [animatePrice, setAnimatePrice] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  useEffect(() => {
    if(animatePrice) {
      priceControls.start({
        opacity: 1,
        y: 0,
        color: ["#FECDD3", "#F43F5E"],
        transition: { duration: 0.7, delay: 0.3, ease: "circOut" }
      });
      msrpControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: 0.4, ease: "circOut" }
      });
    }
  }, [animatePrice, priceControls, msrpControls]);

  // Animation variants for button particle effects
  const particleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: [0, 0.8, 0],
      scale: [0, 1, 0],
      x: Math.random() * 60 - 30,
      y: Math.random() * 60 - 30,
      transition: {
        delay: Math.random() * 0.3,
        duration: 1.2 + Math.random() * 0.5,
        repeat: Infinity,
        repeatDelay: Math.random() * 1 + 1
      }
    })
  };

  return (
    <motion.section 
      className="py-20 md:py-28 bg-gradient-to-b from-rose-50 via-white to-stone-50 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      viewport={{ once: true }}
      onViewportEnter={() => setAnimatePrice(true)}
    >
      {/* Subtle light rays background effect */}
      <div className="absolute inset-0 overflow-hidden">
        <svg width="100%" height="100%" className="absolute top-0 opacity-10" preserveAspectRatio="none">
          <defs>
            <radialGradient id="finalSectionGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#FF7F50" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FF7F50" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#finalSectionGlow)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 text-center max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-light lowercase tracking-wide text-neutral-900 mb-6">
            your quiet ritual awaits.
          </h2>
          <p className="text-lg md:text-xl text-neutral-700 max-w-xl mx-auto leading-relaxed mb-12">
            embrace the gentle warmth, the visible results, and the renewed confidence that comes with photonique touch. your journey to vibrant hair starts now.
          </p>
        </motion.div>

        {/* Price Anchoring with Animation */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2}} 
          viewport={{ once: true }}
        >
          <motion.span 
            className="text-5xl md:text-6xl font-bold text-rose-600 tracking-tight"
            initial={{opacity: 0, y: 15}}
            animate={priceControls}
          >
            $89
          </motion.span>
          <motion.span 
            className="ml-2 text-2xl md:text-3xl text-neutral-500 line-through align-middle tracking-tight"
            initial={{opacity: 0, y: 15}}
            animate={msrpControls}
          >
            $129
          </motion.span>
          <p className="mt-2 text-md text-neutral-700 font-medium">limited time launch offer</p>
        </motion.div>

        {/* Scarcity Block - Enhanced */}
        <motion.div
          className="bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50 border-t-4 border-b-4 border-rose-400 p-6 rounded-lg shadow-lg max-w-lg mx-auto mb-12 transform hover:scale-105 transition-transform duration-300"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-rose-500 mr-3 shrink-0" aria-hidden="true" />
            <div className="text-left">
              <p className="text-lg font-semibold text-rose-800">
                exclusive launch: only <span className="text-2xl font-bold text-rose-600 mx-1">500</span> devices!
              </p>
              <p className="text-sm text-rose-700 mt-1">
                secure yours before they vanish & embrace vibrant hair.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Guarantee & Inclusions Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-3xl mx-auto text-left mb-16 text-sm bg-rose-50/20 p-6 md:p-8 rounded-xl"
          initial={{ opacity: 0, y:20 }}
          whileInView={{ opacity: 1, y:0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut'}}
          viewport={{once: true}}
        >
          <div className="flex items-start p-4 md:p-5 bg-white/60 backdrop-blur-sm rounded-lg shadow-subtle border border-stone-200/60 h-full">
            <ShieldCheck className="h-7 w-7 text-photonique-coral mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-neutral-800 mb-2">60-day guarantee</h4>
              <p className="text-neutral-600 font-light">love your results or your money back. risk-free transformation.</p>
            </div>
          </div>
          <div className="flex items-start p-4 md:p-5 bg-white/60 backdrop-blur-sm rounded-lg shadow-subtle border border-stone-200/60 h-full">
            <Package className="h-7 w-7 text-photonique-coral mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-neutral-800 mb-2">what's included?</h4>
              <p className="text-neutral-600 font-light">photonique touch device, USB-C charger, silk travel pouch, & quick start guide.</p>
            </div>
          </div>
          <div className="flex items-start p-4 md:p-5 bg-white/60 backdrop-blur-sm rounded-lg shadow-subtle border border-stone-200/60 h-full">
            <Repeat className="h-7 w-7 text-photonique-coral mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-neutral-800 mb-2">free shipping & returns</h4>
              <p className="text-neutral-600 font-light">enjoy complimentary shipping and hassle-free returns on all orders.</p>
            </div>
          </div>
        </motion.div>
        
        {/* Enhanced CTA Button with Premium Effects */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Light particles around button (only visible on hover) */}
          {isButtonHovered && (
            <>
              {[...Array(10)].map((_, i) => (
                <motion.div 
                  key={i}
                  className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-photonique-peach"
                  variants={particleVariants}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                />
              ))}
            </>
          )}
          
          <div 
            className="relative inline-block"
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            {/* Button glow effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-rose-300/20 to-amber-300/20 rounded-full blur-xl"
              animate={isButtonHovered ? 
                { scale: 1.2, opacity: 0.8 } : 
                { scale: 0.9, opacity: 0 }
              }
              transition={{ duration: 0.4 }}
            />
            
            {/* Main CTA Button */}
            <Link
              to="/products/photonique-touch-device"
              prefetch="intent"
              className="group relative inline-flex items-center justify-center px-10 py-4 text-xl font-semibold text-white rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-rose-300/50 transform transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 w-full sm:w-auto min-w-[280px] z-10 overflow-hidden"
            >
              {/* Button gradient background */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-rose-500 to-photonique-coral"
                animate={isButtonHovered ? 
                  { backgroundPosition: ['0% 50%', '100% 50%'] } : 
                  { backgroundPosition: '0% 50%' }
                }
                transition={{ duration: 1.5, repeat: isButtonHovered ? Infinity : 0 }}
                style={{ backgroundSize: '200% 100%' }}
              />
              
              {/* Button content */}
              <span className="relative flex items-center">
                <motion.span
                  animate={isButtonHovered ? 
                    { y: [-1, 1, -1], x: [-1, 1, -1] } : 
                    { y: 0, x: 0 }
                  }
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Zap className="h-6 w-6 mr-2.5 transform transition-transform duration-300 group-hover:rotate-[15deg] group-hover:scale-110" />
                </motion.span>
                <span>activate your hair renewal</span>
                <motion.span
                  className="ml-2 opacity-0 group-hover:opacity-100"
                  initial={{ x: -5, opacity: 0 }}
                  animate={isButtonHovered ? 
                    { x: 0, opacity: 1 } : 
                    { x: -5, opacity: 0 }
                  }
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.span>
              </span>
            </Link>
          </div>
          
          <p className="mt-4 text-xs text-neutral-400">secure checkout · encrypted payment · fast delivery</p>
        </motion.div>

      </div>
    </motion.section>
  );
}

export default FinalConversionSection;