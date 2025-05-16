import React, { useRef, useState, useEffect, useMemo } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  Variants,
} from 'framer-motion';
import { Zap, Waves, Droplet, ChevronDown, ExternalLink } from 'lucide-react';
import { Link } from '@remix-run/react';
import { useMediaQuery } from '~/utils/useMediaQuery';
import { FollicleAnimation } from './InteractiveScienceSection/FollicleAnimation';
import { ScienceStep, StepConfig } from './InteractiveScienceSection/ScienceStep';
import { DeepDiveContent } from './InteractiveScienceSection/DeepDiveContent';
import { AnimatedCounter } from '~/components/Shared/AnimatedCounter';
import './InteractiveScienceSection.css';

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// Step configuration
const STEPS: StepConfig[] = [
  {
    id: 1,
    title: 'Red Light Boost',
    icon: Zap,
    color: 'rose-500',
    mobileText: '630-660nm wavelengths recharge cellular energy by 54%',
    desktopText: 'Energizing wavelengths penetrate to boost cellular energy production by up to 54% for follicle revitalization.'
  },
  {
    id: 2,
    title: 'Biomimetic Massage',
    icon: Waves,
    color: 'blue-500',
    mobileText: 'Enhances blood flow by 53% and clears buildup',
    desktopText: 'Gentle micro-vibrations improve blood circulation by 53%, clearing pathways for optimal nutrient delivery.'
  },
  {
    id: 3,
    title: 'Targeted Nourishment',
    icon: Droplet,
    color: 'green-500',
    mobileText: 'Precision delivery where follicles need it most',
    desktopText: 'Our smart delivery system ensures nutrients reach the core of your follicles for maximum absorption and impact.'
  }
];

export function InteractiveScienceSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [animationState, setAnimationState] = useState('dormant');
  const [showDeepDive, setShowDeepDive] = useState(false);

  const isMobile = useMediaQuery('(max-width: 767px)');
  const isReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start center', 'end end']
  });

  const stepOpacities = STEPS.map((_, index) => {
    const stepStart = index / STEPS.length;
    const stepEnd = (index + 1) / STEPS.length;
    return useTransform(
      scrollYProgress,
      [stepStart - 0.1, stepStart, stepEnd, stepEnd + 0.1],
      [0, 1, 1, 0]
    );
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const stepIndex = Math.min(STEPS.length -1, Math.max(0, Math.floor(latest * STEPS.length)));
      setCurrentStep(stepIndex);

      if (latest < 0.05) setAnimationState('dormant');
      else if (stepIndex === 0) setAnimationState('penetration');
      else if (stepIndex === 1) setAnimationState('activation');
      else if (stepIndex === 2) setAnimationState('nourishment');
      if (latest > 0.95) setAnimationState('growth');
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const toggleDeepDive = () => {
    setShowDeepDive(!showDeepDive);
  };
  
  const stats = useMemo(() => [
    { targetValue: 54, label: 'Cellular Energy Boost', unit: '%', note: 'from red light therapy' },
    { targetValue: 47, label: 'Nutrient Absorption', unit: '%', note: 'increase with massage & serum' },
    { targetValue: 92, label: 'Users Saw Vitality', unit: '%', note: 'in overall hair health' },
  ], []);

  return (
    <section 
      id="science-behind-careatin" 
      className="relative py-16 md:py-24 bg-cream-light overflow-hidden antialiased"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="mb-12 md:mb-16 text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-charcoal-primary sm:text-4xl md:text-5xl">
            The <span className="text-rose-600">Science</span> of Radiance
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-charcoal-secondary md:text-xl max-w-2xl mx-auto">
            Discover how care•atin's multi-action approach revitalizes your hair from the inside out, grounded in proven scientific principles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start" ref={targetRef}>
          <div className={`md:sticky md:top-24 self-start ${isMobile ? 'mb-8' : ''} flex justify-center`}>
            <FollicleAnimation animationState={animationState} />
          </div>

          <div className="relative min-h-[150vh] md:min-h-[180vh]">
            {STEPS.map((step, index) => (
              <ScienceStep 
                key={step.id} 
                step={step} 
                opacity={isReducedMotion ? (index === currentStep ? 1: 0) : stepOpacities[index]} 
                isMobile={isMobile} 
              />
            ))}
          </div>
        </div>
        
        <motion.div 
          className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="p-6 bg-white rounded-xl shadow-soft-lg border border-rose-100/50"
              variants={fadeInUp}
            >
              <div className="text-4xl md:text-5xl font-bold text-rose-600">
                <AnimatedCounter 
                  targetValue={stat.targetValue} 
                  suffix={stat.unit}
                  duration={isReducedMotion ? 0 : 2.5}
                />
              </div>
              <p className="mt-2 text-sm font-semibold text-charcoal-primary">{stat.label}</p>
              {stat.note && <p className="text-xs text-charcoal-secondary mt-1">{stat.note}</p>}
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 md:mt-24 text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <button
            onClick={toggleDeepDive}
            className="inline-flex items-center rounded-lg bg-transparent px-6 py-3 text-sm font-medium text-rose-600 border-2 border-rose-500 transition-all hover:bg-rose-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
            aria-expanded={showDeepDive}
            aria-controls="science-deep-dive"
          >
            {showDeepDive ? 'Hide' : 'Understand the Details'}
            <ChevronDown 
              size={20} 
              className={`ml-2 transform transition-transform duration-300 ${showDeepDive ? 'rotate-180' : ''}`} 
            />
          </button>
          <AnimatePresence>
            {showDeepDive && (
              <motion.div 
                id="science-deep-dive"
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: '2rem', transition: { duration: 0.5, ease: 'easeInOut' } }}
                exit={{ opacity: 0, height: 0, marginTop: 0, transition: { duration: 0.4, ease: 'easeInOut' } }}
                className="overflow-hidden"
              >
                <DeepDiveContent isMobile={isMobile} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
      
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-rose-50 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-sky-50 rounded-full opacity-20 blur-3xl animate-pulse-slower delay-2000"></div>
      </div>

    </section>
  );
} 