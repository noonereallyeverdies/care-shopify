import { Link } from '@remix-run/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// Import the enhanced CSS file
import './HeroSection-Enhanced.css';

// Define the type for the component props
type HeroProps = {
  data: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    brandTagline?: string;
    startQuizText?: string;
    quizLink?: string;
    supportingStats?: {
      effectiveness?: string;
    };
  }
};

// Animation variants for cleaner code
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
    boxShadow: "0 4px 14px rgba(196, 155, 124, 0.4)",
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 6px 20px rgba(196, 155, 124, 0.6)",
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.98,
  },
};

export function HeroSection({ data }: HeroProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -150]);
  const blurValue = useTransform(scrollY, [0, 300], [0, 5]);
  const opacityValue = useTransform(scrollY, [0, 300], [1, 0.6]);

  // Split the title for more stylized rendering
  const titleParts = data.title.split('|');
  const mainTitle = titleParts[0] || data.title;
  const subTitle = titleParts.length > 1 ? titleParts[1] : '';

  return (
    <motion.section 
      className="hero-section-enhanced"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background with Parallax - Premium Video Background */}
      <motion.div 
        className="hero-video-container"
        style={{ y: parallaxY, filter: `blur(${blurValue}px)`, opacity: opacityValue }}
      >
        {!videoError ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-poster.jpg" 
          className={`hero-video ${videoLoaded ? 'loaded' : ''}`}
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoError(true)}
          width="1920"
          height="1080"
        >
          <source src="/hair-homepage.mp4" type="video/mp4" />
        </video>
        ) : (
          <div className="hero-image-fallback">
            <img 
              src="/images/hero-transformation.jpg" 
              alt="Hair transformation" 
              className="fallback-image"
              width="1920"
              height="1080"
            />
          </div>
        )}
        <div className="hero-video-overlay" />
      </motion.div>

      <div className="hero-content-container">
        {/* Primary headline - streamlined and powerful */}
        <motion.h1 variants={headlineVariants} className="hero-headline">
          {mainTitle}
          {subTitle && <span className="subtitle-accent">{subTitle}</span>}
        </motion.h1>

        {/* Concise subheadline */}
        <motion.p variants={sublineVariants} className="hero-subheadline">
          {data.subtitle}
        </motion.p>

        {/* Brand tagline as identity anchor */}
        {data.brandTagline && (
          <motion.div 
            className="hero-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {data.brandTagline}
          </motion.div>
        )}

        {/* Single stat for credibility */}
        {data.supportingStats?.effectiveness && (
          <motion.div 
            className="effectiveness-stat"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {data.supportingStats.effectiveness}
          </motion.div>
        )}

        {/* Streamlined CTA Group - focused on primary action */}
        <motion.div variants={ctaGroupVariants} className="hero-cta-group">
          <motion.div 
            variants={buttonVariants}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
            className="cta-primary-wrapper"
          >
            <Link 
              to={data.ctaLink} 
              className="button button--primary hero-cta-primary"
            >
              {data.ctaText}
              <svg className="cta-arrow" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
              </svg>
            </Link>
          </motion.div>

          {data.startQuizText && data.quizLink && (
            <motion.div 
              className="cta-secondary-wrapper"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Link 
                to={data.quizLink} 
                className="button button--secondary hero-cta-secondary"
              >
                {data.startQuizText}
              </Link>
            </motion.div>
          )}
        </motion.div>

        {/* Clean, focused guarantee badge */}
        <motion.div
          className="guarantee-badge"
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1.3, duration: 0.6, type: 'spring' }}
        >
          <span className="offer-text">90-Day</span>
          <span className="offer-subtext">Guarantee</span>
        </motion.div>
      </div>
    </motion.section>
  );
}
