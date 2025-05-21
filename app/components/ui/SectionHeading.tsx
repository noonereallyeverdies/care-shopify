import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  decorative?: boolean;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Consistent heading component for section titles
 */
export function SectionHeading({
  title,
  subtitle,
  centered = true,
  decorative = true,
  children,
  className = '',
}: SectionHeadingProps) {
  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const decorativeVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: 48,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      <motion.h2
        className="text-3xl md:text-4xl font-serif font-thin text-neutral-800 mb-2 lowercase tracking-wider"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={headingVariants}
      >
        {title}
      </motion.h2>

      {decorative && (
        <motion.div
          className={`h-0.5 bg-photonique-coral/70 mb-6 ${centered ? 'mx-auto' : ''}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={decorativeVariants}
          style={{ width: '48px' }}
        />
      )}

      {subtitle && (
        <motion.p
          className="text-lg md:text-xl text-neutral-700 font-light leading-relaxed max-w-2xl mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          {subtitle}
        </motion.p>
      )}

      {children}
    </div>
  );
}

export default SectionHeading;
