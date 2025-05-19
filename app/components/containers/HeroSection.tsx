import { useMemo } from 'react';
import { HeroSectionUI } from '~/components/ui/sections/HeroSectionUI';

// Container component that manages the data and business logic
export function HeroSection() {
  // Extracted data that could come from props, context, or API
  const heroData = useMemo(() => ({
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
  }), []);

  // Animation variants for Framer Motion - business logic for animations
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Slightly reduced stagger time
        delayChildren: 0.1,
        ease: 'easeOut',
        duration: 0.4,
      },
    },
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4, // Faster animation
        ease: "easeOut",
      },
    },
  }), []);

  const buttonVariants = useMemo(() => ({
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.98,
    },
  }), []);

  return (
    <HeroSectionUI
      headline={heroData.headline}
      subheadline={heroData.subheadline}
      ctaText={heroData.ctaText}
      ctaLink={heroData.ctaLink}
      heroImage={heroData.heroImage}
      containerVariants={containerVariants}
      itemVariants={itemVariants}
      buttonVariants={buttonVariants}
    />
  );
}