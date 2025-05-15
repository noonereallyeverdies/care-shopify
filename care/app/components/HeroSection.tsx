import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';

// Import the CSS file
import './HeroSection.css';

// Import client-side analytics
import { trackButtonClick, trackWellnessJourney } from '~/lib/client-analytics';

// Brand-aligned value proposition with tech-forward approach
const heroData = {
  headline: "mindful. beauty. <span class='highlight'>renewal</span>.",
  subheadline: "Experience the revolutionary photonique touch™ where biomimetic science meets ancient wisdom. Transform your hair wellness through ritual and innovation.",
  ctaText: "Begin Your Transformation",
  ctaLink: "/products/photonique-touch",
  brandTagline: "rooted in science, powered by care."
};

// Enhanced animation variants with tech-forward timing
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
      ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for sophistication
    },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  tap: {
    scale: 0.98,
  },
};

// Floating particle animation for tech effect
const particleVariants = {
  float: {
    y: [-20, 20],
    transition: {
      y: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  },
};

export function HeroSection() {
  return (
    <motion.section 
      className="hero-section"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Subtle tech particles - positioned absolutely */}
      <motion.div
        className="particle-top-left"
        variants={particleVariants}
        animate="float"
      >
        <div className="particle-element particle-primary"></div>
      </motion.div>
      <motion.div
        className="particle-top-right"
        variants={particleVariants}
        animate="float"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="particle-element particle-secondary"></div>
      </motion.div>
      
      <video
        className="hero-background-video"
        autoPlay
        muted
        loop
        playsInline
        src="/hair-homepage.mp4"
        poster="/images/hero-poster.jpg"
      >
        <source src="/hair-homepage.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="hero-content-container">
        <motion.div className="brand-tagline" variants={itemVariants}>
          {heroData.brandTagline}
        </motion.div>
        <motion.h1 
          variants={itemVariants} 
          className="hero-headline"
          dangerouslySetInnerHTML={{ __html: heroData.headline }}
        />
        <motion.p variants={itemVariants} className="hero-subheadline">
          {heroData.subheadline}
        </motion.p>
        <motion.div variants={itemVariants}>
           <motion.div 
             variants={buttonVariants}
             whileHover="hover"
             whileTap="tap"
             className="hero-cta-wrapper"
           >
            <Link 
              to={heroData.ctaLink} 
              className="button button--primary"
              onClick={() => {
                // Track the hero CTA click
                if (typeof window !== 'undefined') {
                  trackButtonClick('hero_cta');
                  trackWellnessJourney('start_transformation', 'hero_section');
                }
              }}
            >
              {heroData.ctaText}
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Subtle tech indicator */}
        <motion.div 
          className="tech-indicator"
          variants={itemVariants}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.5 }}
        >
          <div className="pulse-dot pulse-primary"></div>
          <span className="tech-label">photonique touch™ technology</span>
          <div className="pulse-dot pulse-secondary"></div>
        </motion.div>
      </div>
    </motion.section>
  );
} 