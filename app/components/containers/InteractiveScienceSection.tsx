import { useRef, useState, useEffect, useMemo } from 'react';
import { useScroll, useTransform, Variants } from 'framer-motion';
import { Zap, Waves, Droplet } from 'lucide-react';
import { useMediaQuery } from '~/utils/useMediaQuery';
import type { StepConfig } from '../sections-active-landingpage/InteractiveScienceSection/ScienceStep';
import { InteractiveScienceSectionUI } from '~/components/ui/science/InteractiveScienceSectionUI';

// Container component that holds all the business logic
export function InteractiveScienceSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [animationState, setAnimationState] = useState('dormant');
  const [showDeepDive, setShowDeepDive] = useState(false);

  const isMobile = useMediaQuery('(max-width: 767px)');
  const isReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  // Business logic for scroll animations
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start center', 'end end']
  });

  // Step configuration data
  const STEPS: StepConfig[] = useMemo(() => [
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
  ], []);

  // Business logic for scroll-based opacity transforms
  // Create individual transforms for each step (hooks must be at top level)
  // This must be done outside useMemo to avoid violating React's rules of hooks
  const stepOpacityTransforms = STEPS.map((_, index) => {
    const stepStart = index / STEPS.length;
    const stepEnd = (index + 1) / STEPS.length;
    
    // Create the transform for this step
    return useTransform(
      scrollYProgress,
      [stepStart - 0.1, stepStart, stepEnd, stepEnd + 0.1],
      [0, 1, 1, 0]
    );
  });
  
  const stepOpacities = stepOpacityTransforms;

  // Scroll effect to update current step and animation state
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
  }, [scrollYProgress, STEPS.length]);

  // Business logic for toggling the deep dive section
  const toggleDeepDive = () => {
    setShowDeepDive(!showDeepDive);
  };
  
  // Stats data
  const stats = useMemo(() => [
    { targetValue: 54, label: 'Cellular Energy Boost', unit: '%', note: 'from red light therapy' },
    { targetValue: 47, label: 'Nutrient Absorption', unit: '%', note: 'increase with massage & serum' },
    { targetValue: 92, label: 'Users Saw Vitality', unit: '%', note: 'in overall hair health' },
  ], []);

  // Animation variants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <InteractiveScienceSectionUI
      targetRef={targetRef}
      fadeInUp={fadeInUp}
      animationState={animationState}
      stepOpacities={stepOpacities}
      currentStep={currentStep}
      showDeepDive={showDeepDive}
      toggleDeepDive={toggleDeepDive}
      STEPS={STEPS}
      stats={stats}
      isMobile={isMobile}
      isReducedMotion={isReducedMotion}
    />
  );
}