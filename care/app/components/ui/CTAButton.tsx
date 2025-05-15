import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';

interface CTAButtonProps {
  to: string;
  variant?: 'primary' | 'secondary' | 'ritual' | 'science';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

const variants = {
  primary: {
    base: 'bg-gradient-to-r from-acc-primary to-acc-secondary text-white border-0',
    hover: 'shadow-lg transform -translate-y-0.5',
    glow: true
  },
  secondary: {
    base: 'bg-transparent border border-acc-tech text-acc-tech',
    hover: 'bg-acc-tech text-white',
    glow: false
  },
  ritual: {
    base: 'bg-gradient-to-r from-secondary-nature-green to-secondary-sage text-white border-0',
    hover: 'shadow-lg transform -translate-y-0.5',
    glow: true
  },
  science: {
    base: 'bg-gradient-to-r from-acc-tech to-secondary-sage text-white border-0',
    hover: 'shadow-lg transform -translate-y-0.5',
    glow: true
  }
};

const sizes = {
  sm: 'px-6 py-2.5 text-sm',
  md: 'px-8 py-3 text-base',
  lg: 'px-10 py-4 text-lg'
};

export function CTAButton({ 
  to, 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  external = false 
}: CTAButtonProps) {
  const variantStyle = variants[variant];
  const sizeStyle = sizes[size];
  
  const baseClasses = `
    inline-block rounded-full font-medium transition-all duration-300 ease-out
    tracking-wide lowercase relative overflow-hidden
    ${variantStyle.base} ${sizeStyle} ${className}
  `;

  const motionProps = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 }
  };

  const buttonContent = (
    <motion.span className="relative z-10" {...motionProps}>
      {/* Tech-forward shimmer effect */}
      {variantStyle.glow && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                        -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></span>
      )}
      {children}
    </motion.span>
  );

  if (external) {
    return (
      <a 
        href={to}
        className={`${baseClasses} group`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <Link to={to} className={`${baseClasses} group`}>
      {buttonContent}
    </Link>
  );
}

// Enhanced CTA Section Component
interface CTASectionProps {
  title: string;
  subtitle?: string;
  description: string;
  primaryCTA: {
    text: string;
    to: string;
    variant?: 'primary' | 'ritual' | 'science';
  };
  secondaryCTA?: {
    text: string;
    to: string;
  };
  background?: 'gradient' | 'solid' | 'pattern';
  className?: string;
}

export function CTASection({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  background = 'gradient',
  className = ''
}: CTASectionProps) {
  const backgroundClasses = {
    gradient: 'bg-gradient-to-br from-brand-light via-secondary-nature-beige to-brand-ritual',
    solid: 'bg-primary-bg',
    pattern: 'bg-primary-bg relative'
  };

  return (
    <motion.section 
      className={`py-20 ${backgroundClasses[background]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {background === 'pattern' && (
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="h-full w-full bg-gradient-to-r from-acc-primary/10 via-transparent to-acc-tech/10"></div>
        </div>
      )}
      
      <div className="container mx-auto px-4 text-center relative z-10">
        {subtitle && (
          <motion.span 
            className="text-acc-secondary font-medium block mb-3 tracking-wider uppercase text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {subtitle}
          </motion.span>
        )}
        
        <motion.h2 
          className="text-4xl md:text-5xl font-light text-primary-text-dark mb-6 lowercase max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {title}
        </motion.h2>
        
        <motion.p 
          className="text-lg text-primary-text-medium font-light leading-relaxed max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {description}
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <CTAButton 
            to={primaryCTA.to} 
            variant={primaryCTA.variant || 'primary'} 
            size="lg"
          >
            {primaryCTA.text}
          </CTAButton>
          
          {secondaryCTA && (
            <CTAButton 
              to={secondaryCTA.to} 
              variant="secondary" 
              size="lg"
            >
              {secondaryCTA.text}
            </CTAButton>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}