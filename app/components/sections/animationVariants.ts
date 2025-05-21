/**
 * Shared animation variants for consistent animation patterns across components
 */

// For paragraphs and text content
export const paragraphVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    } 
  }
};

// For images and visual elements
export const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  }
};

// For cards and product displays
export const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.7,
      ease: [0.19, 1, 0.22, 1]
    } 
  }
};

// For section headings
export const headingVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    } 
  }
};

// For buttons and interactive elements
export const buttonVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    } 
  },
  hover: { 
    scale: 1.05,
    boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
    transition: { 
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  tap: { 
    scale: 0.98,
    transition: { 
      duration: 0.1
    }
  }
};

// For staggered container animations
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// For list items in staggered animations
export const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.5
    } 
  }
};

// For section dividers and decorative elements
export const decorativeVariants = {
  hidden: { opacity: 0, width: 0 },
  visible: { 
    opacity: 1, 
    width: "100%",
    transition: { 
      duration: 1,
      ease: [0.16, 1, 0.3, 1]
    } 
  }
};
