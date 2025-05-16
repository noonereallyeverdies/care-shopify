import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';
import { Image } from '@shopify/hydrogen';

// Import the CSS file
import './HeroSection.css';

// Placeholder data - Enhanced science content
const heroData = {
  headline: "Cellular Activation for Advanced Hair Revitalization",
  subheadline: "Harness clinically inspired Red Light Therapy to activate follicle receptors at the cellular level. Experience fortified follicles and profound results.",
  ctaText: "Unlock Your Hair's Potential",
  ctaLink: "/products/care-atin-device",
  heroImage: {
    url: '/images/hero-bg.jpg',
    altText: 'Hero background showing a subtle texture or lifestyle imagery related to hair care',
    width: 1920,
    height: 1080,
  }
};

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger animation of children
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const buttonVariants = {
 hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.98,
  },
};

export function HeroSection() {
  return (
    <motion.section 
      className="hero-section"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ position: 'relative' }}
    >
      <Image 
        data={heroData.heroImage} 
        className="hero-background-image"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1
        }}
        sizes="(min-width: 45em) 50vw, 100vw"
      />
      <div className="hero-content-container">
        <motion.h1 variants={itemVariants} className="hero-headline">
          {heroData.headline}
        </motion.h1>
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
            >
              {heroData.ctaText}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
} 