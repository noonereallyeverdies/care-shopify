import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from '@remix-run/react';

// Simple ArrowRight component (can be moved to a shared util if used elsewhere)
function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props} className={`ml-2 h-6 w-6 ${props.className || ''}`}>
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HeroSection() {
  const videoUrl = "https://videos.pexels.com/video-files/4784098/4784098-hd_1920_1080_25fps.mp4"; // Placeholder lifestyle video

  const { scrollYProgress } = useScroll(); // No target needed for viewport scroll
  // Create a parallax effect for the content: move it up slower than the scroll
  // When scrollYProgress is 0 (top), y is 0. When scrollYProgress is 1 (scrolled 1 viewport height), y is -100px.
  // Adjust the output range (e.g., [0, -50], [0, -200]) to control the parallax intensity.
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -150]); // Content moves up 150px as user scrolls down one viewport height

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
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
        {/* Overlay to darken the video slightly for better text contrast */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
      </div>

      {/* Content Overlay with Parallax */}
      <motion.div 
        className="relative z-10 flex flex-col items-center text-center p-6 max-w-3xl"
        style={{ y: parallaxY }} // Apply the parallax effect here
        // Add initial/animate/variants here for the content itself if needed for entry animation
        initial="hidden"
        animate="visible"
        variants={containerVariants} // Use containerVariants for initial stagger of children
      >
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl font-sans font-bold mb-6 leading-tight"
          variants={itemVariants}
        >
          Your Radiant Future, Unveiled.
        </motion.h1>
        <motion.p 
          className="text-lg sm:text-xl md:text-2xl font-serif mb-10 max-w-2xl leading-relaxed"
          variants={itemVariants}
        >
          Discover Photonique: Clinically-proven light therapy for transformative hair wellness. Effortless, elegant, and designed for you.
        </motion.p>
        <motion.div variants={itemVariants}>
          <Link
            to="/products/photonique-touch" // Assuming this is your main product page
            prefetch="intent"
            className="inline-flex items-center justify-center bg-rose-600 px-10 py-4 text-lg font-medium text-white rounded-full hover:bg-rose-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Explore Photonique Touch
            <ArrowRight />
          </Link>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default HeroSection; 