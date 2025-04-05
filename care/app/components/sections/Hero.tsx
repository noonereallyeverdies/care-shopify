import { useEffect, useRef, useState } from "react"
import { animate, stagger } from "@motionone/dom"
import { motion, useAnimation, useInView } from "framer-motion"
import Floating, { FloatingElement } from "~/components/ui/parallax-floating"
import { Link } from "@remix-run/react"
import { Button } from "~/components/Button"
import { Money } from "@shopify/hydrogen"
import type { HomepageProduct } from '~/routes/($locale)._index';

// Original hardcoded images - We'll keep the structure but replace URLs later
const heroImagesData = [
  { depth: 0.5, position: "top-[15%] left-[8%]", size: "w-24 h-24 md:w-32 md:h-32" },
  { depth: 1,   position: "top-[12%] right-[12%]", size: "w-32 h-32 md:w-40 md:h-40" },
  { depth: 2,   position: "top-[45%] left-[15%]", size: "w-28 h-28 md:w-36 md:h-36" },
  { depth: 1,   position: "top-[35%] right-[8%]", size: "w-24 h-24 md:w-32 md:h-32" },
  { depth: 0.5, position: "bottom-[20%] left-[12%]", size: "w-32 h-32 md:w-40 md:h-40" }, // Adjusted depth
  { depth: 1.5, position: "bottom-[25%] right-[15%]", size: "w-28 h-28 md:w-36 md:h-36" }, // Adjusted depth
];

// Your specified image URLs
const IMAGE_URL_1 = '/images/prettyhair.jpg';
const IMAGE_URL_2 = '/images/Subject 4.png';
// Add constants for the other unique images
const IMAGE_URL_3 = '/images/PRODUCTPHOTOT.png';
const IMAGE_URL_4 = '/images/hair.jpg';
const IMAGE_URL_5 = '/images/model-shot.jpeg';

// Create an array of the unique image URLs
const uniqueHeroImageUrls = [
  IMAGE_URL_1,
  IMAGE_URL_2,
  IMAGE_URL_3,
  IMAGE_URL_4,
  IMAGE_URL_5,
];

// Use heroImagesData structure from incorrect version for floating images
const heroFloatingImagesData = [
  { x: '5%', y: '15%', size: '20vw', delay: 0, rotation: -3 },
  { x: '75%', y: '25%', size: '28vw', delay: 0.2, rotation: 2 },
  { x: '20%', y: '70%', size: '22vw', delay: 0.5, rotation: 1 },
  { x: '65%', y: '65%', size: '24vw', delay: 0.3, rotation: -2 },
  { x: '40%', y: '40%', size: '18vw', delay: 0.7, rotation: 3 },
];

// Use gridItems from incorrect version for background pattern
const gridItems = [
  { width: 'col-span-5', height: 'h-64', bgColor: 'bg-red-50/30' },
  { width: 'col-span-7', height: 'h-48', bgColor: 'bg-neutral-50/20' },
  { width: 'col-span-4', height: 'h-56', bgColor: 'bg-neutral-50/30' },
  { width: 'col-span-8', height: 'h-40', bgColor: 'bg-red-50/20' },
];

interface HeroProps {
  product: HomepageProduct | null;
}

// Spring physics config from incorrect version
const spring = {
  type: "spring",
  stiffness: 250,
  damping: 30,
  mass: 0.8
};

export function Hero({ product }: HeroProps) {
  // Combine state and refs from both versions
  const scope = useRef<HTMLDivElement>(null) // Keep scope for potential animations
  const controls = useAnimation(); // From incorrect version
  const isInViewRef = useRef(null); // Renamed ref for clarity
  const isInView = useInView(isInViewRef, { once: false, amount: 0.3 }); // From incorrect version
  const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(null); // From incorrect version
  // const [isImageLoaded, setIsImageLoaded] = useState(false) // Remove if not used

  // Sound effect logic from incorrect version
  const playInteractionSound = () => {
    if (typeof window !== 'undefined') {
      try {
        const audio = new Audio('/sounds/interaction.mp3');
        audio.volume = 0.2;
        audio.play().catch(() => {});
      } catch (e) {}
    }
  };

  // Use effect for scroll-based animation trigger from incorrect version
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
    // Removed old animation logic
  }, [controls, isInView]);

  // Hover handler for floating images from incorrect version
  const onHoverImage = (index: number) => {
    setHoveredImageIndex(index);
    playInteractionSound();
  };

  const onHoverImageEnd = () => {
     setHoveredImageIndex(null);
  }

  // Null check from correct version
  if (!product) {
    return (
      <section className="relative w-full min-h-screen bg-contrast flex items-center justify-center">
        <div className="text-primary">Loading Hero...</div>
      </section>
    );
  }

  const firstVariant = product?.variants?.nodes[0]
  const featuredImage = product?.featuredImage

  return (
    // Use section structure and background from incorrect version
    <section ref={isInViewRef} className="relative min-h-[100vh] overflow-hidden bg-gradient-to-br from-white via-neutral-50 to-red-50/30">
      {/* Asymmetrical background grid from incorrect version */}
      <div className="absolute inset-0 grid grid-cols-12 opacity-30 pointer-events-none">
        {gridItems.map((item, index) => (
          <motion.div
            key={index}
            className={`${item.width} ${item.height} ${item.bgColor} border border-neutral-200/30`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: index * 0.2, ease: [0.165, 0.84, 0.44, 1] }}
          />
        ))}
      </div>

      {/* Visual anchoring element from incorrect version */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[35vmin] h-[35vmin] rounded-full bg-gradient-to-br from-rose-100/20 to-rose-200/30 backdrop-blur-md"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.8, 1.05, 1], opacity: [0, 0.7, 0.5] }}
          transition={{ duration: 3, ease: "easeInOut", times: [0, 0.7, 1] }}
        />
      </div>

      {/* Main content container structure from incorrect version */}
      <div className="relative z-10 container mx-auto pt-40 md:pt-48 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Headline block from incorrect version, with spring physics */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={controls} // Trigger animation on scroll
            variants={{ visible: { opacity: 1, y: 0, transition: spring } }}
          >
            <h1 className="text-8xl md:text-10xl font-light text-neutral-900 leading-[0.9] mb-6 lowercase tracking-[0.02em]">
              <motion.span className="inline-block" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.2 }}>the</motion.span>{" "}
              <motion.span className="inline-block text-rose-500" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.5 }}>•</motion.span>{" "}
              <motion.span className="inline-block" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.7 }}>science</motion.span>{" "}
              <motion.span className="inline-block text-rose-500" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.9 }}>•</motion.span>{" "}
              <motion.span className="inline-block" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 1.1 }}>of</motion.span>{" "}
              <motion.span className="inline-block text-rose-500" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 1.3 }}>•</motion.span>{" "}
              <motion.span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-rose-400" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 1.5 }}>shine</motion.span>
            </h1>
            <motion.p
              className="text-xl md:text-2xl text-neutral-700 max-w-2xl mx-auto leading-relaxed tracking-wide"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.7 }}
              whileHover={{ scale: 1.02, rotate: 0.5, transition: { duration: 0.3, ease: "easeOut" } }}
            >
              Transform your relationship with hair care through our{" "}
              <motion.span className="font-medium text-rose-500" whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}>revolutionary</motion.span>{" "}
              approach to hair wellness.
            </motion.p>
          </motion.div>

          {/* Product Display block from incorrect version, with spring physics */}
          <motion.div
            className="relative mt-16 md:mt-24 max-w-lg mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...spring, delay: 2 }}
          >
            {/* Ensure featuredImage is used if available */}
            {featuredImage && (
                <motion.img
                    // Use IMAGE_URL_3 if featuredImage isn't the desired one here, otherwise use featuredImage.url
                    src={IMAGE_URL_3} // Or featuredImage.url
                    alt={featuredImage.altText || "Care•atin Photonique Touch - The science of shine"}
                    className="w-full h-auto object-contain transform -rotate-[15deg]"
                    style={{ transformOrigin: "center bottom" }}
                    whileHover={{ rotate: "-12deg", scale: 1.03, transition: { duration: 0.4, ease: "backOut" } }}
                />
            )}
             {/* Isolation Effect tag from incorrect version */}
            <motion.div
              className="absolute -right-6 bottom-12 bg-rose-500 text-white px-4 py-2 rounded-full text-sm font-medium"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...spring, delay: 2.3 }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(225, 29, 72, 0.4)", transition: { duration: 0.2 } }}
            >
              3-in-1 technology
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Images section from incorrect version */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        {heroFloatingImagesData.map((imageData, index) => {
          const imageUrl = uniqueHeroImageUrls[index % 5];
          const imageAlt = `Hero background image ${index + 1}`;

          return (
            <motion.div
              key={index}
              className="absolute pointer-events-auto"
              style={{ left: imageData.x, top: imageData.y, width: imageData.size, height: imageData.size, zIndex: hoveredImageIndex === index ? 10 : 5 }}
              initial={{ opacity: 0, scale: 0.8, rotate: imageData.rotation }}
              animate={{ opacity: [0, 0.9, 0.8], scale: [0.8, 1.02, 1], rotate: imageData.rotation }}
              // Use a tween transition instead of spring for multi-keyframe animation
              transition={{ duration: 1.5, ease: [0.165, 0.84, 0.44, 1], delay: imageData.delay }}
              whileHover={{ scale: 1.05, rotate: hoveredImageIndex === index ? 0 : imageData.rotation, zIndex: 10, boxShadow: "0 20px 40px rgba(0,0,0,0.2)", filter: "brightness(1.1)", transition: { ...spring, stiffness: 300, damping: 20 } }}
              onHoverStart={() => onHoverImage(index)}
              onHoverEnd={onHoverImageEnd}
            >
              <motion.div className="w-full h-full overflow-hidden rounded-lg" whileHover={{ borderRadius: "12px" }}>
                <motion.img
                  src={imageUrl}
                  alt={imageAlt}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08, transition: spring }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}