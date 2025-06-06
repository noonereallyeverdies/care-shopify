import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';

// Placeholder data
const ctaData = {
  headline: "Ready for Your Hair Transformation?",
  text: "Join thousands experiencing the confidence that comes with healthier, fuller hair. Invest in your hair's future today.",
  ctaText: "Shop Care-atin Now",
  ctaLink: "/products/care-atin-rlt-device" // Link to product page or collection
};

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut", delay: 0.1 } 
  }
};

const buttonVariants = {
  hover: {
     scale: 1.05,
     // Add boxShadow here directly if preferred for motion.div
     // boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)', 
     transition: { duration: 0.2, ease: "easeOut" }, // Ensure easeOut is present
   },
   tap: {
     scale: 0.95, // Adjusted to 0.95 to match other CTAs
   },
 };

export function FinalCta() {
  return (
    <motion.section
      className="final-cta-section section-padding"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
      style={{
        padding: 'var(--space-xl) var(--space-md)',
        backgroundColor: 'var(--c-bg-accent, #f0e8e0)', // Example accent background
        textAlign: 'center'
      }}
    >
      <div className="cta-content-container" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'var(--text-heading)', marginBottom: 'var(--space-sm)' }}>
          {ctaData.headline}
        </h2>
        <p style={{ fontSize: 'var(--text-body)', marginBottom: 'var(--space-lg)' }}>
          {ctaData.text}
        </p>
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          style={{ 
            display: 'inline-block', // Needed for transform origin
            boxShadow: '0px 0px 0px rgba(0,0,0,0)', // Initial shadow for smooth transition
          }} 
          onHoverStart={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0px 8px 15px rgba(0, 0, 0, 0.1)';
          }}
          onHoverEnd={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = '0px 0px 0px rgba(0,0,0,0)';
          }}
        >
          <Link
            to={ctaData.ctaLink}
            className="button button--primary button--large" // Primary button style
          >
            {ctaData.ctaText}
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
} 