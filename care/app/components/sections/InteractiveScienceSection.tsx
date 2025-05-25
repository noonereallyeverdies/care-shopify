import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, Variants } from 'framer-motion';
import { Zap, Waves, Droplet, ChevronDown, Battery, ExternalLink, CheckCircle } from 'lucide-react';
import { Link } from '@remix-run/react';
import { AnimatedCounter } from '~/components/Shared/AnimatedCounter';

// Types
type StepConfig = {
  id: number;
  title: string;
  icon: React.ElementType;
  color: string;
  mobileText: string;
  desktopText: string;
};

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const breathe: Variants = {
  initial: { opacity: 0.8 },
  animate: { opacity: [0.8, 1, 0.8], scale: [1, 1.03, 1], transition: { duration: 15, repeat: Infinity, ease: 'easeInOut' } }
};

// Simple variant for reduced motion users
const noMotion: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
};

// Step configuration
const STEPS: StepConfig[] = [
  {
    id: 1,
    title: 'Red Light Boost',
    icon: Zap,
    color: 'rose-500',
    mobileText: '630-660nm wavelengths recharge cellular energy by 54%',
    desktopText: '630-660nm wavelengths penetrate to recharge cellular energy production by up to 54%'
  },
  {
    id: 2,
    title: 'Biomimetic Massage',
    icon: Waves,
    color: 'blue-500',
    mobileText: 'Enhances blood flow by 53% and clears buildup',
    desktopText: 'Gentle vibrations enhance blood flow by 53% and clear buildup for optimal nutrient absorption'
  },
  {
    id: 3,
    title: 'Targeted Nourishment',
    icon: Droplet,
    color: 'green-500',
    mobileText: 'Precision delivery where follicles need it most',
    desktopText: 'Precision oil delivery system maximizes absorption where your follicles need it most'
  }
];

/**
 * Custom hook for media queries with debounce
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const media = window.matchMedia(query);
    setMatches(media.matches);
    
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const handler = (e: MediaQueryListEvent) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setMatches(e.matches), 16);
    };
    
    if (media.addEventListener) {
      media.addEventListener('change', handler);
    } else {
      // @ts-ignore - For older browsers
      media.addListener(handler);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (media.removeEventListener) {
        media.removeEventListener('change', handler);
      } else {
        // @ts-ignore - For older browsers
        media.removeListener(handler);
      }
    };
  }, [query]);
  
  return matches;
}

/**
 * FollicleAnimation Component
 */
interface FollicleAnimationProps {
  animationState: string;
}

const FollicleAnimation: React.FC<FollicleAnimationProps> = ({ animationState }) => {
  // Map animation states to colors and effects
  const stateColors = {
    dormant: '#F3F4F6', // Light gray
    penetration: '#FECACA', // Light red
    activation: '#FEE2E2', // Lighter red
    nourishment: '#BBDEFB', // Light blue
    growth: '#C7E8CA' // Light green
  };
  
  return (
    <motion.div 
      className="relative h-64 w-64 overflow-hidden rounded-full md:h-80 md:w-80"
      variants={breathe}
      initial="initial"
      animate="animate"
    >
      {/* Base follicle shape */}
      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-neutral-100">
        <svg width="80%" height="80%" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Simplified follicle shape */}
          <path 
            d="M30,20 Q50,0 70,20 L70,150 Q50,180 30,150 Z" 
            fill={stateColors[animationState as keyof typeof stateColors] || stateColors.dormant} 
            strokeWidth="2"
            stroke="#E5E7EB"
            className="transition-all duration-700"
          />
          {/* Hair shaft */}
          <path 
            d="M50,20 L50,0" 
            stroke={animationState === 'growth' ? '#4B5563' : '#D1D5DB'} 
            strokeWidth={animationState === 'growth' ? "4" : "2"}
            className="transition-all duration-700"
          />
          {/* Animation effect based on state */}
          {animationState !== 'dormant' && (
            <circle 
              cx="50" 
              cy="130" 
              r={animationState === 'growth' ? "20" : "10"}
              fill={stateColors[animationState as keyof typeof stateColors]}
              opacity="0.7"
              className="animate-pulse"
            />
          )}
        </svg>
        <div className="absolute bottom-4 text-sm font-medium text-neutral-600">
          {animationState.charAt(0).toUpperCase() + animationState.slice(1)}
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Science Step Component
 */
interface ScienceStepProps {
  step: StepConfig;
  opacity: any;
  isMobile: boolean;
}

const ScienceStep: React.FC<ScienceStepProps> = ({ step, opacity, isMobile }) => {
  const Icon = step.icon;
  
  return (
    <motion.div 
      className={`pointer-events-none fixed inset-0 top-0 flex items-center justify-center ${
        isMobile ? 'h-[60vh]' : 'h-screen'
      }`}
      style={{ opacity }}
      aria-hidden={opacity === 0}
    >
      <div className="pointer-events-auto flex max-w-md flex-col items-center rounded-xl bg-white/80 p-6 text-center shadow-lg backdrop-blur-sm md:p-8">
        <Icon size={32} className={`mb-4 text-${step.color}`} aria-hidden="true" />
        <h3 className="mb-2 text-2xl font-semibold">
          {step.id}. {step.title}
        </h3>
        <p className="text-neutral-600">
          {isMobile ? step.mobileText : step.desktopText}
        </p>
      </div>
    </motion.div>
  );
};

/**
 * DeepDiveContent Component
 */
interface DeepDiveContentProps {
  isMobile: boolean;
}

const DeepDiveContent: React.FC<DeepDiveContentProps> = ({ isMobile }) => (
  <div className="rounded-lg border border-neutral-200 bg-neutral-50/50 p-6 md:p-8">
    <h4 className="mb-6 text-xl font-semibold text-neutral-800 md:text-2xl" id="science-details">
      {isMobile ? 'Science Snapshot' : 'For the Science-Minded'}
    </h4>
    
    <div className="space-y-8 text-sm leading-relaxed text-neutral-700 md:text-base">
      {/* For mobile: condensed version with essential stats only */}
      {isMobile ? (
        <div className="rounded-md border border-neutral-100 bg-white p-4">
          <h5 className="mb-3 flex items-center text-lg font-semibold">
            <CheckCircle size={18} className="mr-2 text-rose-500" aria-hidden="true" />
            <span>Key Findings</span>
          </h5>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="mr-2 text-rose-500" aria-hidden="true">•</span>
              <span>ATP production increased by 37-54%</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-rose-500" aria-hidden="true">•</span>
              <span>Hair count up 28% over 16 weeks</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-rose-500" aria-hidden="true">•</span>
              <span>Hair thickness improved by 32%</span>
            </li>
          </ul>
        </div>
      ) : (
        /* Desktop: full scientific explanation */
        <>
          {/* Section: Cellular Bioenergetics */}
          <div className="rounded-md border border-neutral-100 bg-white p-4">
            <h5 className="mb-3 flex items-center text-lg font-semibold">
              <Battery size={18} className="mr-2 text-rose-500" aria-hidden="true" />
              <span>Cellular Energy Production</span>
            </h5>
            <p>Red light (630-660nm) is absorbed by cytochrome c oxidase in mitochondria, boosting ATP synthesis by <strong className="text-rose-600">37-54%</strong>, fueling follicle growth and extending the anagen phase.</p>
          </div>

          {/* Section: Optical Tissue Penetration */}
          <div className="rounded-md border border-neutral-100 bg-white p-4">
            <h5 className="mb-3 flex items-center text-lg font-semibold">
              <Zap size={18} className="mr-2 text-rose-500" aria-hidden="true" />
              <span>Optimal Penetration Depth</span>
            </h5>
            <p>Our specific 630-660nm wavelength reaches the perfect 3-5mm depth to target hair follicle bulbs while avoiding deeper tissue damage.</p>
          </div>
          
          {/* Section: Clinical Evidence Summary */}
          <div className="rounded-md border border-neutral-100 bg-white p-4">
            <h5 className="mb-3 flex items-center text-lg font-semibold">
              <CheckCircle size={18} className="mr-2 text-rose-500" aria-hidden="true" />
              <span>Clinical Evidence</span>
            </h5>
            <p>Three independent studies demonstrated our technology increases hair count by up to 28% and thickness by 32% over 16 weeks.</p>
          </div>
        </>
      )}
    </div>
    
    <div className="mt-8 border-t border-neutral-200 pt-4">
      <Link 
        to="/pages/science" 
        className="inline-flex items-center font-medium text-rose-600 hover:text-rose-700"
        aria-label={isMobile ? 'View more research' : 'View full research papers'}
      >
        {isMobile ? 'More research' : 'View full research papers'}
        <ExternalLink size={14} className="ml-1" aria-hidden="true" />
      </Link>
    </div>
  </div>
);

/**
 * Main InteractiveScienceSection Component
 */
export function InteractiveScienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isDeepDiveOpen, setIsDeepDiveOpen] = useState(false);
  
  // Media queries for responsive design
  const isMobile = useMediaQuery('(max-width: 767px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  
  // Scroll animations setup
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  
  // Map follicle animation states to scroll position
  const follicleAnimationState = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.4, 0.6, 0.8], 
    ["dormant", "penetration", "activation", "nourishment", "growth"]
  );

  // Calculate opacities for each step
  const step1Opacity = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.45, 0.55],
    [0, 1, 1, 0],
  );
  const step2Opacity = useTransform(
    scrollYProgress,
    [0.40, 0.50, 0.70, 0.80],
    [0, 1, 1, 0],
  );
  const step3Opacity = useTransform(
    scrollYProgress,
    [0.65, 0.75, 0.95, 1.0],
    [0, 1, 1, 0],
  );
  const stepOpacities = [step1Opacity, step2Opacity, step3Opacity];
  
  // Other animation transforms
  const resultOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.1, 0.3, 0.3, 0.1]);
  const initialTextOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  
  // Dynamic height based on device and motion preference
  const sectionHeight = useMemo(() => {
    if (prefersReducedMotion) return 'auto';
    return isMobile ? '250vh' : '400vh';
  }, [isMobile, prefersReducedMotion]);
  
  const toggleDeepDive = () => {
    setIsDeepDiveOpen(!isDeepDiveOpen);
    // Auto-scroll to the expanded content when it opens
    if (!isDeepDiveOpen) {
      setTimeout(() => {
        document.getElementById('science-details')?.scrollIntoView({ 
          behavior: prefersReducedMotion ? 'auto' : 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  };
  
  // Choose appropriate animation variants based on motion preference
  const animVariants = prefersReducedMotion ? noMotion : fadeInUp;
  
  // For reduced motion users, display a simplified layout
  if (prefersReducedMotion) {
    return (
      <section 
        ref={sectionRef}
        className="relative bg-gradient-to-b from-white to-neutral-50 py-20 md:py-32"
        aria-label="Scientific explanation of our hair renewal system"
      >
        <div className="container relative z-10 mx-auto px-6">
          {/* Title section */}
          <div className="mb-16 text-center">
            <motion.h2 
              className="mb-4 text-4xl font-light text-neutral-900 md:text-6xl"
              variants={noMotion}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              The Science of Hair Renewal
            </motion.h2>
            <motion.p 
              className="mx-auto max-w-2xl text-lg text-neutral-600 md:text-xl"
              variants={noMotion}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              How our 3-in-1 system reactivates your dormant follicles for visibly thicker hair
            </motion.p>
          </div>
          
          {/* Static grid layout instead of scroll animations */}
          <div className="mb-16 grid gap-8 md:grid-cols-3">
            {STEPS.map(step => (
              <div
                key={step.id}
                className="rounded-lg bg-white p-6 text-center shadow-sm"
              >
                <step.icon size={32} className={`mx-auto mb-4 text-${step.color}`} aria-hidden="true" />
                <h3 className="mb-2 text-2xl font-semibold">
                  {step.id}. {step.title}
                </h3>
                <p className="text-neutral-600">
                  {isMobile ? step.mobileText : step.desktopText}
                </p>
              </div>
            ))}
          </div>
          
          {/* Results & Statistics */}
          <div className="mb-16 text-center">
            <h3 className="mb-4 text-3xl font-semibold text-neutral-900 md:text-4xl">
              Synergy Unleashed
            </h3>
            <p className="mx-auto mb-8 max-w-xl text-lg text-neutral-600 md:text-xl">
              This combined action awakens follicles to produce visibly thicker, stronger, healthier hair.
            </p>
            
            <div className="rounded-lg bg-neutral-50 py-8">
              <div className="mb-2 text-5xl font-bold text-rose-600 tabular-nums md:text-7xl">
                93%
              </div>
              <p className="text-neutral-600">Reported Visible Improvement*</p>
              <p className="mt-1 text-xs text-neutral-500">*In user surveys after 90 days of consistent use.</p>
            </div>
          </div>
          
          {/* Deep Dive toggle - same structure in both versions */}
          <div className="bg-white py-12 text-center">
            <button 
              className="btn-secondary inline-flex items-center gap-2 rounded-full bg-rose-100 px-6 py-3 text-rose-600 transition-all hover:bg-rose-200"
              onClick={toggleDeepDive}
              aria-expanded={isDeepDiveOpen}
              aria-controls="deep-dive-content"
            >
              {isMobile ? "See the Science" : "Explore the Clinical Details"}
              <ChevronDown 
                size={16} 
                className={`transition-transform duration-300 ${isDeepDiveOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>
            
            <AnimatePresence>
              {isDeepDiveOpen && (
                <motion.div
                  id="deep-dive-content"
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: "auto", opacity: 1, marginTop: '2rem' }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mx-auto max-w-4xl overflow-hidden text-left"
                >
                  <DeepDiveContent isMobile={isMobile} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    );
  }

  // Standard animated version for users who don't prefer reduced motion
  return (
    <section 
      ref={sectionRef} 
      className="relative overflow-hidden bg-gradient-to-b from-white to-neutral-50 py-20 md:py-32" 
      style={{ minHeight: sectionHeight }}
      aria-label="Interactive science presentation of our hair renewal system"
    >
      {/* Background elements */}
      <motion.div 
        className="absolute inset-0 z-0" 
        style={{ opacity: backgroundOpacity }}
        aria-hidden="true"
      >
        <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-rose-100 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-rose-200 opacity-20 blur-3xl"></div>
      </motion.div>
      
      <div className="container relative z-10 mx-auto px-6">
        {/* 1. Opening Hook - Peak moment 1 */}
        <div className={`flex flex-col items-center justify-center text-center ${isMobile ? 'h-[70vh]' : 'h-screen'}`}>
          <div className="relative mb-12 flex h-48 w-48 items-center justify-center">
            {/* Device visualization */}
            <svg 
              viewBox="0 0 200 200" 
              className="h-full w-full" 
              aria-label="Hair renewal device illustration"
            >
              {/* Simple device illustration */}
              <rect x="60" y="40" width="80" height="120" rx="10" fill="#E5E7EB" />
              <rect x="70" y="50" width="60" height="90" rx="5" fill="#F9FAFB" />
              <circle cx="100" cy="160" r="10" fill="#F3F4F6" />
              <circle cx="100" cy="80" r="25" fill="#FEE2E2" />
              <path d="M85,80 L115,80" stroke="#FECACA" strokeWidth="2" />
              <path d="M100,65 L100,95" stroke="#FECACA" strokeWidth="2" />
            </svg>
          </div>
          <motion.h2 
            className="mb-4 text-4xl font-light text-neutral-900 md:text-6xl"
            variants={animVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            The Science of Hair Renewal
          </motion.h2>
          <motion.p 
            className="mx-auto max-w-2xl text-lg text-neutral-600 md:text-xl"
            variants={animVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: 0.1 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            How our 3-in-1 system reactivates your dormant follicles for visibly thicker hair
          </motion.p>
        </div>

        {/* 2. Core Visual Area & Problem Statement */}
        <div 
          className="sticky top-0 flex h-screen flex-col items-center justify-center"
          aria-label="Follicle animation showing the transformation process"
        >
          <FollicleAnimation animationState={follicleAnimationState.get()} />
          <motion.p 
            className="mb-4 text-center text-xl font-medium text-neutral-700"
            style={{ opacity: initialTextOpacity }}
          >
            Thinning often starts with dormant, under-energized follicles.
          </motion.p>
        </div>

        {/* 3. Scrollytelling Steps - Mobile friendly height */}
        <div className="relative z-10" style={{ height: isMobile ? '180vh' : '300vh' }}> 
          {/* Map through steps to generate them dynamically */}
          {STEPS.map((step, index) => (
            <ScienceStep 
              key={step.id} 
              step={step} 
              opacity={stepOpacities[index]} 
              isMobile={isMobile}
            />
          ))}
        </div>
          
        {/* 4. Synergistic Result */}
        <div 
          className={`sticky bottom-0 flex flex-col items-center justify-center text-center ${isMobile ? 'h-[70vh]' : 'h-screen'}`}
          aria-label="Final results of the treatment process"
        >
          <motion.div style={{ opacity: resultOpacity }}>
            <motion.h3 
              className="mb-4 text-3xl font-semibold text-neutral-900 md:text-4xl"
            >
              Synergy Unleashed
            </motion.h3>
            <motion.p 
              className="max-w-xl text-lg text-neutral-600 md:text-xl"
            >
              This combined action awakens follicles to produce visibly thicker, stronger, healthier hair.
            </motion.p>
          </motion.div>
        </div>

        {/* 5. Proof Point with animated number */}
        <div className="relative z-20 bg-neutral-50 py-12 text-center md:py-16" aria-labelledby="stats-title">
          <div className="mb-2 text-5xl font-bold text-rose-600 tabular-nums md:text-8xl">
            <AnimatedCounter 
              targetValue={93} 
              suffix="%" 
              duration={2}
            /> 
          </div>
          <p id="stats-title" className="text-neutral-600">Reported Visible Improvement*</p>
          <p className="mt-1 text-xs text-neutral-500">*In user surveys after 90 days of consistent use.</p>
        </div>

        {/* 6. Deep Dive - Progressive disclosure */}
        <div className="relative z-20 bg-white py-12 text-center md:py-16">
          <button 
            className="btn-secondary inline-flex items-center gap-2 rounded-full bg-rose-100 px-6 py-3 text-rose-600 transition-all hover:bg-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300"
            onClick={toggleDeepDive}
            aria-expanded={isDeepDiveOpen}
            aria-controls="deep-dive-content"
          >
            {isMobile ? "See the Science" : "Explore the Clinical Details"}
            <ChevronDown 
              size={16} 
              className={`transition-transform duration-300 ${isDeepDiveOpen ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>
          
          <AnimatePresence>
            {isDeepDiveOpen && (
              <motion.div
                id="deep-dive-content"
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: '2rem' }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="mx-auto max-w-4xl overflow-hidden text-left"
              >
                <DeepDiveContent isMobile={isMobile} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
} 