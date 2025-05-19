import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';
import { Image } from '@shopify/hydrogen';

// UI component for the hero section (presentation only)
export function HeroSectionUI({
  headline,
  subheadline,
  ctaText,
  ctaLink,
  heroImage,
  containerVariants,
  itemVariants,
  buttonVariants,
}: {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  heroImage: {
    url: string;
    altText: string;
    width: number;
    height: number;
  };
  containerVariants: any;
  itemVariants: any;
  buttonVariants: any;
}) {
  return (
    <motion.section 
      className="hero-section"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ position: 'relative', willChange: 'opacity' }}
    >
      <Image 
        data={heroImage} 
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
        <motion.h1 variants={itemVariants} className="hero-headline" style={{ willChange: 'transform, opacity' }}>
          {headline}
        </motion.h1>
        <motion.p variants={itemVariants} className="hero-subheadline">
          {subheadline}
        </motion.p>
        <motion.div variants={itemVariants}>
           <motion.div 
             variants={buttonVariants}
             whileHover="hover"
             whileTap="tap"
             className="hero-cta-wrapper"
           >
            <Link 
              to={ctaLink} 
              className="button button--primary"
            >
              {ctaText}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}