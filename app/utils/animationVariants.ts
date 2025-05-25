// Standard animation variants for consistent animations across the site
export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.1 + customDelay,
      ease: [0.19, 1, 0.22, 1]
    }
  })
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: customDelay,
      ease: "easeInOut"
    }
  })
};

export const staggerChildrenVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

export const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.19, 1, 0.22, 1]
    }
  },
  hover: {
    y: -8,
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
    transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] }
  }
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: 0.2 + customDelay,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

export const slideInRightVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: 0.4 + customDelay,
      ease: "easeOut"
    }
  })
};