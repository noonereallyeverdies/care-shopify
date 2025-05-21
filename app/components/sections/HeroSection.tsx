import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from '@remix-run/react';
import { Container } from '~/components/ui/Container';

// Simple ArrowRight component (can be moved to a shared util if used elsewhere)
function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props} className={`ml-2 h-5 w-5 ${props.className || ''}`}>
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HeroSection() {
  const videoUrl = "/hair-homepage.mp4"; // Corrected local video path

  const { scrollYProgress } = useScroll(); // No target needed for viewport scroll
  const parallaxY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -25, -50]); // Reduced parallax intensity for a more subtle feel

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4, // Slightly slower stagger for a gentler feel
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 }, // Subtle upward drift, reduced from 30
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2, // Slightly longer for more grace
        ease: [0.25, 0.1, 0.25, 1], // Smoother ease (quartic in/out)
      },
    },
  };

  // Variant for a subtle text glow on hover for the CTA
  const ctaGlowVariant = {
    hover: {
      textShadow: "0 0 12px rgba(255, 255, 255, 0.6)", // Subtle white glow
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.section
      className="relative flex items-center justify-center min-h-screen text-white overflow-hidden"
      // Removed initial/animate/variants from section for continuous parallax effect
    >
      {/* Background Video */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full"
        />
        {/* Gradient overlay: Darker top, subtle warmth at bottom, suggesting gentle light */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/70 via-black/50 to-photonique-coral/20"></div>
        
        {/* Enhanced light shimmer effects */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 mix-blend-plus-lighter">
          {/* Central soft pulse */}
          <div 
            className="absolute top-1/2 left-1/2 w-3/5 h-3/5 bg-rose-300 rounded-full blur-[100px] animate-pulse"
            style={{ animationDuration: '10s', animationDelay: '1s', transform: 'translate(-50%, -50%)' }}
          ></div>
          {/* Slow moving shimmer blob 1 */}
          <motion.div 
            className="absolute w-1/3 h-1/3 bg-photonique-peach rounded-full blur-[80px] opacity-50"
            animate={{
              x: ['20%', '80%', '20%'],
              y: ['30%', '70%', '30%'],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
          ></motion.div>
           {/* Slow moving shimmer blob 2 */}
          <motion.div 
            className="absolute w-1/4 h-1/4 bg-photonique-gold rounded-full blur-[70px] opacity-40"
            animate={{
              x: ['70%', '30%', '70%'],
              y: ['20%', '60%', '20%'],
              scale: [1, 0.7, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", repeatType: "mirror", delay: 5 }}
          ></motion.div>
        </div>
      </div>

      {/* Content Overlay with Parallax */}
      <motion.div 
        className="relative z-10 w-full flex items-center justify-center"
        style={{ y: parallaxY }} // Apply the parallax effect here
      >
        <Container narrow>
          <motion.div
            className="flex flex-col items-center text-center py-6"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-thin mb-6 md:mb-8 tracking-[0.08em] md:tracking-[0.1em] lowercase [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]"
              variants={itemVariants}
            >
              transform. radiate. confidence.
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-neutral-100 font-light mb-4 md:mb-6 max-w-xl md:max-w-2xl leading-relaxed [text-shadow:0_2px_4px_rgba(0,0,0,0.4)]"
              variants={itemVariants}
            >
              because your hair transformation should be as effortless as it is effective.
            </motion.p>
            <motion.p 
              className="text-md sm:text-lg text-neutral-200 font-light mb-8 md:mb-10 max-w-md md:max-w-lg leading-relaxed [text-shadow:0_2px_4px_rgba(0,0,0,0.4)]"
              variants={itemVariants}
            >
              subtle warmth. quiet confidence. ten minutes, three times weekly. that's it.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col items-center">
              <motion.div whileHover="hover" variants={ctaGlowVariant}>
                <Link
                  to="/products/photonique-touch-device" // Ensure this handle is correct
                  prefetch="intent"
                  className="inline-flex items-center justify-center bg-rose-500/80 border border-rose-300/70 px-10 py-4 text-lg font-medium text-white rounded-md hover:bg-rose-500 hover:border-rose-300 transition-all duration-300 ease-out tracking-wider shadow-lg hover:shadow-rose-500/40 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 focus:ring-offset-black/50 lowercase"
                >
                  discover your hair renewal
                  <ArrowRight className="opacity-80 ml-3 w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-0 right-0 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 1],
          y: [0, 10, 0]
        }}
        transition={{ 
          opacity: { delay: 2, duration: 1 },
          y: { delay: 3, duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="flex flex-col items-center">
          <span className="text-white/60 text-sm mb-2 lowercase tracking-wider">discover more</span>
          <svg width="24" height="24" viewBox="0 0 24 24" className="text-white/70">
            <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </motion.div>
    </motion.section>
  );
}

// export default HeroSection; // This line is now commented out or removed 