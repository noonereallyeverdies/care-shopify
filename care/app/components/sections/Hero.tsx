import { useEffect, useRef, useState, Suspense, lazy } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
// import { animate, stagger } from "@motionone/dom"
// import { motion, useAnimation, useInView } from "framer-motion"
// import Floating, { FloatingElement } from "~/components/ui/parallax-floating"
import { Link } from "@remix-run/react"
import { Button } from "~/components/Button"
import { Money } from "@shopify/hydrogen"
import type { HomepageProduct } from '~/routes/($locale)._index';
import { Canvas } from "@react-three/fiber";
import { ClientOnly } from "~/components/utility/ClientOnly";

// Dynamically import the 3D scene component for client-side only rendering
const LazyDeviceScene = lazy(() => 
  import('~/components/3d/DeviceScene').then(module => ({ default: module.DeviceScene }))
);

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

// Define ParallaxBackground component inside Hero.tsx
const ParallaxBackground: React.FC<{ imageUrl?: string; speed?: number; overlayColor?: string }> = 
  ({ imageUrl, speed = 0.3, overlayColor = 'bg-black/40' }) => { // Adjusted default overlay
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: ref,
    offset: ["start start", "end start"] // Adjusted offset for hero
  });
  // Calculate y based on scroll progress, moving opposite direction slightly
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  if (!imageUrl) return null; // Don't render if no image

  return (
    // The outer div needs position:absolute and full coverage
    <div ref={ref} className="absolute inset-0 z-0 overflow-hidden">
      {/* The motion div handles the background image and parallax movement */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${imageUrl})`,
          y: y,
          // Scale slightly to prevent edges showing during movement
          scale: 1.1, 
        }}
      />
      {/* Overlay div remains static on top */}
      <div className={`absolute inset-0 ${overlayColor} z-10`}></div> 
    </div>
  );
};

export function Hero({ product }: HeroProps) {
  // State to track client-side mounting for dynamic import
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  // Remove state and refs related to animation/hover
  // const scope = useRef<HTMLDivElement>(null) 
  // const controls = useAnimation(); 
  // const isInViewRef = useRef(null);
  // const isInView = useInView(isInViewRef, { once: false, amount: 0.3 });
  // const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(null);

  // Remove sound effect logic
  /*
  const playInteractionSound = () => { ... };
  */

  // Remove useEffect for animation trigger
  /*
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  */

  // Remove hover handlers
  /*
  const onHoverImage = (index: number) => { ... };
  const onHoverImageEnd = () => { ... };
  */

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
  const heroImageUrl = featuredImage?.url || '/images/prettyhair.jpg'; // Fallback image

  return (
    <section 
      className="relative min-h-[80vh] md:min-h-[90vh] flex items-center justify-center text-center overflow-hidden"
      // Remove explicit background color/gradient
    >
      {/* Replace ParallaxBackground with the 3D Device Scene */}
      {/* The DeviceScene component positions itself absolutely */}
      {/* Conditionally render the scene only on the client using ClientOnly and isMounted */}
      {/* Temporarily commented out to diagnose MiniOxygen error */}
      {/* 
      <ClientOnly>
        {isMounted && (
            <Canvas
              className="absolute inset-0 z-10"
            >
              <Suspense fallback={null}>
                <LazyDeviceScene />
              </Suspense>
            </Canvas>
        )}
      </ClientOnly>
      */}

      {/* Main content container - Ensure it's above the parallax layer */}
      {/* Ensure text color contrasts with scene background (e.g., dark text on light grey) */}
      <div className="relative z-20 container mx-auto py-20 md:py-28 px-6 text-neutral-900">
        <div className="max-w-3xl mx-auto">
          {/* Content block mimicking Omiwell structure */}
          <div className="mb-8">
            {/* Subtitle (like Omiwell's h5) */}
            <h5 className="text-base md:text-lg font-light uppercase tracking-widest mb-4 font-body text-neutral-700">
              The Future of Hair Health {/* Example Subtitle */} 
            </h5>
            {/* Main Headline (like Omiwell's h2, using Playfair) */}
            <h1 className="mb-6 font-semibold"> {/* Re-using H1, styles defined in app.css */}
              the science of shine
            </h1>
            {/* Optional paragraph (Omiwell hero didn't seem to have one) */}
            {/* 
            <p
              className="text-lg md:text-xl text-neutral-700 max-w-2xl mx-auto leading-relaxed mb-8 md:mb-10"
              // initial/animate/transition/whileHover removed
            >
              Transform your relationship with hair care through our{" "}
              <span className="font-medium text-primary">revolutionary</span>{" "}
              approach to hair wellness.
            </p>
            */}
          </div>

          {/* CTA Button */}
          <div className="mt-8 md:mt-10">
            <Link to="/products/photonique-touch" className="btn-primary-refined">
              Shop Now {/* Keep text or adjust */} 
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}