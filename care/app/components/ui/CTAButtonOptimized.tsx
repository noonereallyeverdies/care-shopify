import React from 'react';
import { Link } from '@remix-run/react';
import { ChevronDown } from 'lucide-react';

interface CTAButtonOptimizedProps {
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

/**
 * Optimized CTA Button - Replaced Framer Motion with CSS animations
 * Performance improvement: ~50KB bundle size reduction per component
 */
export function CTAButtonOptimized({ 
  to, 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  external = false 
}: CTAButtonOptimizedProps) {
  const variantStyle = variants[variant];
  const sizeStyle = sizes[size];
  
  const baseClasses = `
    inline-block rounded-full font-medium
    tracking-wide lowercase relative overflow-hidden
    transform-gpu transition-smooth animate-scale-button
    ${variantStyle.glow ? 'animate-glow-hover' : ''}
    ${variantStyle.base} ${sizeStyle} ${className}
  `;

  const buttonContent = (
    <span className="relative z-10">
      {/* CSS-based shimmer effect instead of Framer Motion */}
      {variantStyle.glow && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                        -skew-x-12 opacity-0 group-hover:opacity-100 
                        animate-pulse"></span>
      )}
      {children}
    </span>
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

/**
 * Example of Accordion optimized with CSS instead of Framer Motion
 */
interface AccordionOptimizedProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

export function AccordionOptimized({ title, children, isOpen, onClick }: AccordionOptimizedProps) {
  return (
    <div className="border-b border-neutral-200 last:border-b-0">
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
      >
        <span className="text-md font-medium text-neutral-700 hover:text-rose-600 transition-colors">
          {title}
        </span>
        {/* CSS rotation instead of Framer Motion */}
        <ChevronDown 
          className={`w-5 h-5 text-neutral-500 animate-chevron-down ${
            isOpen ? 'open text-rose-600' : ''
          }`} 
        />
      </button>
      
      {/* CSS height transition instead of AnimatePresence */}
      <div 
        className={`accordion-content ${isOpen ? 'open' : ''}`}
        style={{
          maxHeight: isOpen ? '1000px' : '0',
          transition: 'max-height 0.3s ease, opacity 0.3s ease',
          overflow: 'hidden',
          opacity: isOpen ? 1 : 0
        }}
      >
        <div className="pb-4 text-neutral-600 text-sm leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Optimized Product Card - Replacing simple Framer Motion animations with CSS
 */
interface ProductCardOptimizedProps {
  title: string;
  price: string;
  image: string;
  href: string;
}

export function ProductCardOptimized({ title, price, image, href }: ProductCardOptimizedProps) {
  return (
    <Link to={href} className="block">
      <div className="group relative flex flex-col rounded-2xl overflow-hidden 
                      transform-gpu transition-smooth hover-lift animate-scale-hover">
        <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] rounded-2xl -z-10"></div>
        
        <div className="relative pt-6 px-6 pb-3 z-10">
          <div className="rounded-xl overflow-hidden bg-neutral-50 relative aspect-[4/5]">
            <img
              className="object-cover w-full h-full transition-transform duration-300 
                         group-hover:scale-105"
              src={image}
              alt={title}
            />
          </div>

          <div className="mt-4 space-y-1 text-left relative z-10">
            <h3 className="text-neutral-900 font-medium text-base lowercase tracking-wide 
                           transition-transform duration-300 group-hover:-translate-y-1">
              {title}
            </h3>
            <div className="text-neutral-900 text-sm font-medium 
                           transition-transform duration-300 group-hover:-translate-y-1">
              {price}
            </div>
          </div>
        </div>

        {/* CSS-only button reveal */}
        <div className="px-6 pb-6 opacity-0 translate-y-2 
                        transition-all duration-300 group-hover:opacity-100 
                        group-hover:translate-y-0">
          <button className="w-full bg-neutral-900 hover:bg-neutral-800 text-white 
                           text-sm font-medium py-2 px-4 rounded-full mt-2 
                           transition-colors shadow-sm button-press">
            Add to bag
          </button>
        </div>
      </div>
    </Link>
  );
}

/**
 * Optimized Hero Section Animation
 * Uses CSS keyframes instead of Framer Motion stagger
 */
export function HeroSectionOptimized() {
  return (
    <section className="hero-section">
      {/* Staggered reveal using CSS animations */}
      <div className="hero-content-container animate-stagger">
        <div className="brand-tagline animate-fade-in">
          rooted in science, powered by care.
        </div>
        <h1 className="hero-headline animate-slide-up">
          mindful. beauty. <span className="highlight">renewal</span>.
        </h1>
        <p className="hero-subheadline animate-slide-up">
          Experience the revolutionary photonique touch™ where biomimetic science meets ancient wisdom.
        </p>
        <div className="animate-fade-in">
          <CTAButtonOptimized to="/products/photonique-touch" variant="primary" size="lg">
            Begin Your Transformation
          </CTAButtonOptimized>
        </div>
      </div>
    </section>
  );
}
