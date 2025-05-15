/**
 * Design System for Care•atin
 * This file contains typography, colors, and component styles to maintain 
 * visual consistency throughout the application.
 */

export const typography = {
  heading: {
    primary: "font-serif font-light tracking-wide text-neutral-900",
    secondary: "font-sans font-medium tracking-normal text-neutral-800",
    accent: "font-serif font-light italic tracking-wide text-rose-600"
  },
  body: {
    primary: "font-sans font-light leading-relaxed text-neutral-700",
    secondary: "font-sans font-light leading-relaxed text-neutral-600",
    accent: "font-sans font-medium leading-relaxed text-rose-700"
  }
};

export const colorSystem = {
  primary: {
    light: "#FCE7EC", // Lighter rose for backgrounds
    medium: "#F9BECF", // Medium rose for accents
    deep: "#D4627C", // Deep rose for CTAs and highlights
  },
  neutrals: {
    white: "#FFFFFF",
    lightest: "#F9F9FA",
    light: "#F1F1F4",
    medium: "#E4E4E9",
    dark: "#75757A",
    darkest: "#1F1F23",
  },
  accents: {
    green: "#B8E1BD", // For success states and guarantees
    blue: "#B8D4E1", // For scientific elements
    gold: "#E1D0B8", // For premium highlights
  }
};

export const buttons = {
  primary: "bg-rose-600 text-white hover:bg-rose-700 transition-colors font-light tracking-wide rounded-full",
  secondary: "bg-neutral-800 text-white hover:bg-neutral-900 transition-colors font-light tracking-wide rounded-full",
  tertiary: "bg-white border border-neutral-200 text-neutral-800 hover:bg-neutral-50 transition-colors font-light tracking-wide rounded-full",
  accent: "bg-rose-100 text-rose-700 hover:bg-rose-200 transition-colors font-light tracking-wide rounded-full"
};

export const shadows = {
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  primary: "shadow-lg shadow-rose-200/50",
  premium: "shadow-xl shadow-neutral-200/70"
};

export const animations = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  },
  stagger: {
    container: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { 
          staggerChildren: 0.1,
          delayChildren: 0.2
        }
      }
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
      }
    }
  }
};

// Common component styles
export const cards = {
  base: "bg-white rounded-xl overflow-hidden",
  elevated: "bg-white rounded-xl overflow-hidden shadow-lg",
  premium: "bg-gradient-to-b from-white to-neutral-50 rounded-xl overflow-hidden shadow-lg border border-neutral-100"
};

export const sections = {
  default: "py-16 md:py-24",
  premium: "py-20 md:py-32 relative overflow-hidden"
};
