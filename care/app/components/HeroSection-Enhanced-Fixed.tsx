import { Link } from '@remix-run/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';

// Import the enhanced CSS file
import './HeroSection-Enhanced.css';

// Enhanced hero data with pattern interrupts and loss aversion
const heroData = {
  headline: "Stop Hair Loss. Start Growing.",
  subheadline: "Every day you wait, you lose 150+ hair strands. That's 4,500 every month.",
  ctaText: "Begin Your Transformation",
  startQuizText: "Take Hair Assessment",
  backgroundVideo: "/hair-homepage.mp4",
  supportingStats: {
    average: "The average woman loses 55% of volume",
    before: "before taking action",
    metaphor: "Don't wait until it's visible to everyone else"
  }
};

// Animation variants with enhanced pattern interrupts
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const headlineVariants = {
  hidden: { 
    y: 60, 
    opacity: 0,
    filter: "blur(8px)"
  },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const sublineVariants = {
  hidden: { 
    y: 30, 
    opacity: 0,
    scale: 0.95
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.2,
    },
  },
};

const ctaGroupVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.4,
    },
  },
};

const buttonVariants = {
  idle: {
    scale: 1,
    boxShadow: "0 4px 14px rgba(220, 38, 38, 0.4)",
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 6px 20px rgba(220, 38, 38, 0.6)",
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.98,
  },
};

// Hair strand counter component for pattern interrupt - FIXED
const HairStrandCounter = () => {
  const [count, setCount] = useState(0);
  const targetRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let hasAnimated = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          let start = 0;
          
          const increment = () => {
            start += Math.floor(Math.random() * 50) + 25;
            if (start < 4500) {
              setCount(start);
              animationFrameRef.current = requestAnimationFrame(increment);
            } else {
              setCount(4500);
            }
          };
          
          // Start the animation with a slight delay
          timeoutRef.current = setTimeout(() => {
            increment();
          }, 100);
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = targetRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Cleanup function
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <motion.div 
      ref={targetRef}
      className="hair-strand-counter"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <span className="counter-number">{count.toLocaleString()}</span>
      <span className="counter-label">strands lost monthly</span>
    </motion.div>
  );
};

export function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -150]);
  const blurValue = useTransform(scrollY, [0, 300], [0, 5]);

  // Video error handling
  const handleVideoError = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    console.warn('Hero video failed to load:', e);
    setVideoLoaded(false);
  }, []);

  const handleVideoLoad = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  // Cleanup motion transforms on unmount
  useEffect(() => {
    return () => {
      // Clean up motion values if needed
      if (parallaxY) parallaxY.destroy?.();
      if (blurValue) blurValue.destroy?.();
    };
  }, [parallaxY, blurValue]);

  return (
    <motion.section 
      className="hero-section-enhanced"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background Video with Parallax - IMPROVED ERROR HANDLING */}
      <motion.div 
        className="hero-video-container"
        style={{ y: parallaxY, filter: `blur(${blurValue}px)` }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className={`hero-video ${videoLoaded ? 'loaded' : ''}`}
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          preload="metadata"
        >
          <source src={heroData.backgroundVideo} type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          Your browser does not support the video tag.
        </video>
        <div className="hero-video-overlay" />
      </motion.div>

      <div className="hero-content-container">
        <motion.h1 variants={headlineVariants} className="hero-headline">
          {heroData.headline}
        </motion.h1>

        <motion.p variants={sublineVariants} className="hero-subheadline">
          {heroData.subheadline}
        </motion.p>

        {/* Loss Aversion Stats */}
        <motion.div 
          className="loss-aversion-box"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p className="loss-stat">{heroData.supportingStats.average}</p>
          <p className="loss-stat-small">{heroData.supportingStats.before}</p>
          <p className="loss-metaphor">{heroData.supportingStats.metaphor}</p>
        </motion.div>

        {/* Hair Strand Counter Pattern Interrupt - FIXED */}
        <HairStrandCounter />

        {/* Enhanced CTA Group */}
        <motion.div variants={ctaGroupVariants} className="hero-cta-group">
          <motion.div 
            variants={buttonVariants}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
            className="cta-primary-wrapper"
          >
            <Link 
              to="/products/care-atin-device" 
              className="button button--primary hero-cta-primary"
            >
              {heroData.ctaText}
              <svg className="cta-arrow" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
              </svg>
            </Link>
          </motion.div>

          <motion.div 
            className="cta-secondary-wrapper"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Link 
              to="/hair-assessment" 
              className="button button--secondary hero-cta-secondary"
            >
              {heroData.startQuizText}
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll hint with animation */}
        <motion.div 
          className="scroll-hint"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
        >
          <svg className="scroll-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.41 8.84L12 13.42l4.59-4.58L18 10.25l-6 6-6-6z" />
          </svg>
          <span>Discover how it works</span>
        </motion.div>
      </div>
    </motion.section>
  );
}
