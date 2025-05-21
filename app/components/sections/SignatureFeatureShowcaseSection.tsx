import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Target, Zap, CheckCircle, ChevronDown, Info } from 'lucide-react'; // Added ChevronDown, Info

// --- ProductType Definition (copied from DeviceShowcaseSection for consistency) ---
interface ProductImage {
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
}

interface ProductPrice {
  amount: string;
  currencyCode: string;
}

interface ProductVariant {
  id: string;
  availableForSale: boolean;
  title: string;
  price: ProductPrice;
}

interface ProductType {
  id: string;
  title: string;
  descriptionHtml?: string | null;
  description?: string | null;
  handle: string;
  vendor?: string | null;
  featuredImage?: ProductImage | null;
  variants: {
    nodes: ProductVariant[];
  };
  metafields?: {
    nodes: Array<{ key: string; value: string; }>;
  } | null;
}
// --- End ProductType Definition ---

interface SignatureFeatureShowcaseSectionProps {
  product: ProductType | null;
}

const hotspotTooltips = [
  "Deep follicle targeting.",
  "Optimized light wavelength.",
  "Boosts cellular activity.",
];

// Placeholder for a more complex SVG animation or graphic
const FeatureVisual = () => {
  const [hoveredHotspot, setHoveredHotspot] = useState<number | null>(null);
  const [isRotating, setIsRotating] = useState(false);

  return (
    <motion.div 
      className="relative w-full max-w-md mx-auto aspect-square bg-gradient-to-br from-rose-50 to-neutral-50 rounded-2xl flex items-center justify-center shadow-xl p-8 overflow-hidden"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.5 }}
      onHoverStart={() => setIsRotating(true)}
      onHoverEnd={() => setIsRotating(false)}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="180" stroke="#FF7F50" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.2" />
          <circle cx="200" cy="200" r="150" stroke="#FF7F50" strokeWidth="0.8" strokeDasharray="1 3" opacity="0.3" />
          <circle cx="200" cy="200" r="120" stroke="#FF7F50" strokeWidth="1" strokeDasharray="1 2" opacity="0.4" />
        </svg>
      </div>
      
      {/* Product Image */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10"
        animate={{ 
          rotate: isRotating ? 360 : 0 
        }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
      >
        <div className="relative w-3/4 h-3/4">
          {/* Simulated asymmetric product shape */}
          <div className="absolute left-[15%] top-[15%] w-[70%] h-[70%] bg-white rounded-full shadow-xl" />
          
          {/* Product handle */}
          <div className="absolute left-[40%] top-[10%] w-[20%] h-[35%] bg-white rounded-full shadow-xl transform -skew-y-12" />
          
          {/* Glowing treatment area */}
          <motion.div 
            className="absolute left-[25%] top-[25%] w-[50%] h-[50%] bg-rose-500 rounded-full opacity-30"
            animate={{ 
              opacity: [0.2, 0.6, 0.2],
              scale: [0.95, 1.05, 0.95] 
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Tech nodules */}
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * 2 * Math.PI;
            const radius = 32; // % from center
            const xPos = 50 + Math.cos(angle) * radius; // 50% + offset
            const yPos = 50 + Math.sin(angle) * radius; // 50% + offset
            
            return (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-rose-600 rounded-full shadow-sm"
                style={{ 
                  left: `${xPos}%`, 
                  top: `${yPos}%`,
                  transform: 'translate(-50%, -50%)' 
                }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
              />
            );
          })}
        </div>
      </motion.div>

      {/* Premium material indicator */}
      <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-neutral-700 shadow-sm z-20 flex items-center">
        <span className="w-2 h-2 bg-rose-500 rounded-full mr-2"></span>
        Precision Technology
      </div>
      
      {/* Central Target Icon representing precision */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        <Target className="text-rose-500 opacity-10 w-3/4 h-3/4" />
      </motion.div>
      
      {/* Inner core element */}
      <motion.div 
        className="relative z-10 bg-white/90 backdrop-blur p-6 rounded-xl shadow-2xl w-2/3 h-1/2 flex flex-col items-center justify-center text-center"
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "backOut" }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="relative"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Zap className="h-12 w-12 text-rose-600 mb-2" />
          <motion.div 
            className="absolute inset-0 bg-rose-500 rounded-full blur-xl opacity-20"
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        <h3 className="text-lg font-sans font-semibold text-neutral-800 uppercase tracking-wider mb-1">
          Precision Light Matrix
        </h3>
        <p className="text-xs text-neutral-500 font-medium">Patented Technology</p>
      </motion.div>

      {/* Animated "Hotspots" with Tooltips */}
      {[...Array(3)].map((_, i) => {
        const angle = (i / 3) * 2 * Math.PI;
        const xPos = Math.cos(angle) * 40; // 40% from center
        const yPos = Math.sin(angle) * 40;

        // Determine tooltip position based on hotspot quadrant
        let tooltipXClass = xPos > 0 ? 'left-full ml-2' : 'right-full mr-2';
        let tooltipYClass = 'top-1/2 -translate-y-1/2';
        if (Math.abs(yPos) > Math.abs(xPos) * 1.5) { // More vertical than horizontal
            tooltipXClass = 'left-1/2 -translate-x-1/2';
            tooltipYClass = yPos > 0 ? 'top-full mt-2' : 'bottom-full mb-2';
        }

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{ 
              x: `${xPos}%`, 
              y: `${yPos}%`, 
              // Small offset to center the hotspot itself if its origin is top-left
              translateX: '-50%', 
              translateY: '-50%' 
            }}
            onHoverStart={() => setHoveredHotspot(i)}
            onHoverEnd={() => setHoveredHotspot(null)}
          >
            <motion.div
              className="relative z-20"
            >
              <motion.div
                className="absolute inset-0 bg-rose-400 rounded-full blur-md"
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5 + 0.8,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="relative bg-rose-600 rounded-full w-4 h-4 shadow-md cursor-pointer"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </motion.div>
            <AnimatePresence>
              {hoveredHotspot === i && (
                <motion.div
                  className={`absolute ${tooltipXClass} ${tooltipYClass} w-max max-w-xs bg-neutral-900 text-white text-xs rounded-md px-3 py-2 shadow-lg z-30 pointer-events-none`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  {hotspotTooltips[i]}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

// Define the WavelengthPenetrationDiagram component here
const WavelengthPenetrationDiagram = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const waveVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (delay = 0) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 2, bounce: 0, delay },
        opacity: { duration: 0.5, delay },
      },
    }),
  };

  return (
    <div ref={ref} className="my-6 p-2 sm:p-4 bg-stone-50 rounded-lg border border-stone-200 flex justify-center items-center min-h-[280px] sm:min-h-[320px] overflow-hidden">
      <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs sm:max-w-sm font-sans">
        <defs>
          <linearGradient id="redWaveGradientSvg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#FCA5A5', stopOpacity: 0.8 }} /> {/* red-300 */}
            <stop offset="100%" style={{ stopColor: '#EF4444', stopOpacity: 1 }} /> {/* red-500 */}
          </linearGradient>
          <linearGradient id="nirWaveGradientSvg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#FDE047', stopOpacity: 0.7 }} /> {/* yellow-300 */}
            <stop offset="100%" style={{ stopColor: '#F59E0B', stopOpacity: 1 }} /> {/* amber-500 */}
          </linearGradient>
          <filter id="svgGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Scalp Layers */}
        <rect x="0" y="30" width="300" height="40" fill="#F5F5F4" /> {/* stone-100 */}
        <text x="10" y="55" fontSize="10" fill="#57534E" className="font-medium">epidermis</text>
        
        <rect x="0" y="70" width="300" height="60" fill="#EDEBE9" /> {/* stone-200 */}
        <text x="10" y="100" fontSize="10" fill="#57534E" className="font-medium">dermis</text>

        <rect x="0" y="130" width="300" height="70" fill="#E7E5E4" /> {/* stone-300 */}
        
        <path d="M150 180 C 140 170, 140 90, 150 80 C 160 90, 160 170, 150 180 Z" fill="#D6D3D1" /> {/* stone-400 */}
        <circle cx="150" cy="175" r="8" fill="#A8A29E" /> {/* stone-500 */}
        <text x="160" y="150" fontSize="9" fill="#57534E" className="font-medium">hair follicle</text>

        <circle cx="150" cy="15" r="10" fill="#FFFAF0" stroke="#FED7AA" strokeWidth="1.5" />
        <text x="150" y="20" textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="#D97706" className="font-semibold">device</text>

        <motion.path 
          d="M150 30 Q 130 50, 150 70 T 150 110" 
          stroke="url(#redWaveGradientSvg)" 
          strokeWidth="3"
          fill="none" 
          strokeLinecap="round"
          variants={waveVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.2} // delay
          style={{ filter: 'url(#svgGlow)'}}
        />
        <text x="100" y="45" fontSize="10" fill="#EF4444" className="font-bold">650nm</text>
        <text x="100" y="57" fontSize="8" fill="#EF4444">(red light)</text>

        <motion.path 
          d="M150 30 Q 170 70, 150 110 T 150 170" 
          stroke="url(#nirWaveGradientSvg)" 
          strokeWidth="3.5" 
          fill="none" 
          strokeLinecap="round"
          strokeDasharray="4 2"
          variants={waveVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.7} // delay
          style={{ filter: 'url(#svgGlow)'}}
        />
        <text x="190" y="90" fontSize="10" fill="#F59E0B" className="font-bold">850nm</text>
        <text x="190" y="102" fontSize="8" fill="#F59E0B">(nir light)</text>
      </svg>
    </div>
  );
};

const techDeepDiveContent = [
  {
    question: "what is the precision light matrix?",
    answer: (
      <p>
        our patented precision light matrix uses a carefully blended range of light wavelengths. this ensures the optimal energy gently reaches your hair follicles at various depths for thorough revitalization, all while ensuring uniform coverage for maximum effectiveness.
      </p>
    ),
  },
  {
    question: "dual-wavelength precision: how it works",
    answer: (
      <div>
        <p className="mb-4 text-neutral-700 font-light">
          photonique touch harnesses the power of two clinically-proven wavelengths, each playing a distinct role in hair follicle rejuvenation. this dual approach ensures a comprehensive treatment, addressing hair health from the surface to the root.
        </p>
        <WavelengthPenetrationDiagram />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 mt-6">
          <div>
          <h4 className="font-semibold text-photonique-coral mb-2">650nm red light: gentle surface renewal</h4>
          <p className="text-sm text-neutral-600 font-light">
          Reaches the upper layers of your scalp with care. This light gently improves circulation, soothes irritation, and creates the perfect environment for your hair to thrive. Think of it as a warm, nurturing embrace for your scalp.
          </p>
          </div>
            <div>
              <h4 className="font-semibold text-photonique-gold mb-2">850nm near-infrared light: deep awakening</h4>
              <p className="text-sm text-neutral-600 font-light">
                Travels deeper to reach the heart of your hair follicles. This gentle light awakens your cells' natural energy, encouraging dormant follicles to stir back to life. It's like a whispered invitation for your hair to grow with renewed vitality.
              </p>
            </div>
        </div>
        <p className="text-sm text-neutral-700 font-light">
          together, these wavelengths create a synergistic effect, promoting a healthier scalp, stronger follicles, and ultimately, visibly thicker and more vibrant hair. this is the science of light, precisely delivered.
        </p>
      </div>
    ),
  },
  {
    question: "is it safe and comfortable?",
    answer: (
      <p>
        absolutely. photonique is designed for gentle, comfortable use with no heat or side effects, just soothing warmth.
      </p>
    ),
  },
  {
    question: "how does it compare to other treatments?",
    answer: (
      <p>
        photonique offers a unique approach by working gently with your body\'s natural processes. unlike harsh chemicals or invasive procedures, it uses soothing light to effectively revitalize hair without discomfort or downtime.
      </p>
    ),
  },
];

interface AccordionItemProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

const TechAccordionItem: React.FC<AccordionItemProps> = ({ question, answer, isOpen, onClick, index }) => {
  return (
    <div className="border-b border-neutral-200/70 last:border-b-0">
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={`tech-accordion-content-${index}`}
        className="flex justify-between items-center w-full py-5 text-left text-neutral-800 hover:text-photonique-coral transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-photonique-coral/50 rounded-sm"
      >
        <span className="font-medium text-md md:text-lg lowercase">{question}</span>
        <motion.div 
          className={`w-5 h-5 flex items-center justify-center rounded-full ${isOpen ? 'bg-rose-100 text-rose-600' : 'bg-neutral-100 text-neutral-400'}`}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className={`h-3 w-3 transform transition-transform duration-300`} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto", marginTop: '0px', marginBottom: '16px' },
              collapsed: { opacity: 0, height: 0, marginTop: '0px', marginBottom: '0px' },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
            id={`tech-accordion-content-${index}`}
            role="region"
            aria-labelledby={`tech-accordion-button-${index}`}
          >
            <div className="pt-1 pb-5 pr-4 text-neutral-700 font-light text-sm md:text-base leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function SignatureFeatureShowcaseSection({ product }: SignatureFeatureShowcaseSectionProps) {
  const [openTechAccordion, setOpenTechAccordion] = useState<number | null>(0); // Default open the first item

  const handleTechAccordionClick = (index: number) => {
    setOpenTechAccordion(openTechAccordion === index ? null : index);
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section 
      className="py-16 md:py-24 bg-gradient-to-br from-rose-50 via-white to-neutral-50 overflow-hidden relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="720" cy="400" r="600" stroke="#FF7F50" strokeWidth="1" strokeDasharray="2 6" opacity="0.1" />
          <circle cx="720" cy="400" r="400" stroke="#FF7F50" strokeWidth="1" strokeDasharray="3 9" opacity="0.07" />
          <circle cx="720" cy="400" r="200" stroke="#FF7F50" strokeWidth="1" strokeDasharray="4 12" opacity="0.05" />
        </svg>
      </div>
      
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-left md:text-left mb-16 max-w-3xl"
          variants={itemVariants}
        >
          <div className="inline-block mb-3 bg-rose-100 px-3 py-1 rounded-full">
            <span className="text-sm font-medium text-rose-600">Photonique Touch Exclusive</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-medium text-neutral-900 mb-6 lowercase leading-tight">
            the <span className="text-rose-600 relative">
              <span className="relative z-10">touch</span>
              <motion.svg 
                className="absolute -bottom-1 left-0 w-full z-0"
                width="100%"
                height="8"
                viewBox="0 0 100 8"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <path 
                  d="M0 4 Q25 0, 50 4 Q75 8, 100 4" 
                  stroke="#FFCCCB" 
                  strokeWidth="6" 
                  fill="none"
                />
              </motion.svg>
            </span> difference
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <p className="text-lg text-neutral-700 leading-relaxed font-serif">
              At the heart of your transformation is our <strong className="font-semibold text-rose-700">Precision Light Matrix</strong>, intelligently delivering therapeutic light exactly where your follicles need it most.
            </p>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center mr-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
                      stroke="#FF7F50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-sm font-medium text-neutral-800">Designed by Women, for Women</span>
              </div>
              <p className="text-sm text-neutral-600 ml-11">
                Our all-female engineering team crafted this technology specifically for your unique hair needs.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Asymmetrical layout */}
          <motion.div 
            className="lg:col-span-7 lg:col-start-1 lg:row-span-2 relative"
            variants={itemVariants}
          >
            <div className="lg:pr-12">
              <FeatureVisual />
            </div>
            
            {/* Floating badge */}
            <motion.div 
              className="hidden lg:block absolute -right-4 bottom-1/4 bg-white px-4 py-3 rounded-xl shadow-xl border border-neutral-100 z-20 max-w-xs"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-rose-500 mr-2">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h4 className="font-medium text-neutral-800">Did You Know?</h4>
              </div>
              <p className="text-sm text-neutral-600">
                Our Precision Light Matrix covers 3x more area than competitors, for faster, more effective treatments.
              </p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-5 lg:col-start-8 lg:row-start-1"
            variants={itemVariants}
          >
            <motion.div 
              className="bg-white p-6 md:p-8 rounded-xl shadow-xl border border-rose-100 mb-8 relative"
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="absolute -top-3 -right-3 w-16 h-16">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <path d="M0 64V20C0 8.954 8.954 0 20 0H64L0 64Z" fill="#FECDD3" />
                </svg>
              </div>
              
              <CheckCircle className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-2xl font-sans font-bold text-neutral-800 mb-3">
                proven results, faster.
              </h3>
              <div className="flex items-center">
                <span className="text-4xl md:text-5xl font-bold text-rose-600 mr-3">93%</span>
                <div className="text-neutral-700 font-serif leading-snug text-sm">
                  saw visible improvement<br />in hair density and fullness
                </div>
              </div>
              
              <div className="mt-4 border-t border-neutral-100 pt-3">
                <div className="flex items-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-neutral-400 mr-2">
                    <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <p className="text-xs text-neutral-500 font-serif">
                    Based on an 8-week clinical study with 120 participants
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Technical Accordion - Restyled version */}
            <motion.div 
              className="bg-white p-6 md:p-6 rounded-xl shadow-xl border border-neutral-100 mb-8"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-rose-50 rounded-full flex items-center justify-center mr-3">
                  <Info className="h-4 w-4 text-rose-600" />
                </div>
                <h3 className="text-lg font-sans font-semibold text-neutral-800">
                  the technical edge
                </h3>
              </div>
              <div className="border-t border-dashed border-neutral-200">
                {techDeepDiveContent.map((item, index) => (
                  <TechAccordionItem
                    key={index}
                    question={item.question.toLowerCase()}
                    answer={item.answer}
                    isOpen={openTechAccordion === index}
                    onClick={() => handleTechAccordionClick(index)}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          {/* Product Overview Card - Asymmetrically placed */}
          <motion.div 
            className="lg:col-span-5 lg:col-start-8 lg:row-start-2"
            variants={itemVariants}
          >
            <motion.div 
              className="bg-gradient-to-br from-rose-600 to-rose-500 p-6 md:p-8 rounded-xl shadow-xl text-white relative overflow-hidden"
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              {/* Background pattern */}
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
                <svg width="100%" height="100%" viewBox="0 0 100 200" fill="none">
                  <circle cx="150" cy="50" r="100" fill="white" />
                  <circle cx="50" cy="150" r="50" fill="white" />
                </svg>
              </div>
              
              <h3 className="text-xl font-sans font-bold mb-4 relative z-10">
                touch product overview
              </h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4 relative z-10">
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                  <span className="block text-xs text-white/70 mb-1">Wavelength</span>
                  <span className="block text-lg font-medium">650-670nm</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                  <span className="block text-xs text-white/70 mb-1">Power</span>
                  <span className="block text-lg font-medium">12W</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                  <span className="block text-xs text-white/70 mb-1">Coverage</span>
                  <span className="block text-lg font-medium">Full Scalp</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                  <span className="block text-xs text-white/70 mb-1">Session</span>
                  <span className="block text-lg font-medium">10 min</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center relative z-10">
                <a
                  href="/product-detail"
                  className="inline-flex items-center text-white font-medium group"
                >
                  Explore Product
                  <svg className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
                
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2"/>
                    <path d="M15 9L9 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 9L15 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Bottom "Learn More" element */}
        <motion.div 
          className="mt-12 text-center relative z-10"
          variants={itemVariants}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-block bg-white px-6 py-4 rounded-full shadow-lg border border-neutral-100">
            <a
              href="/science"
              className="inline-flex items-center text-rose-700 font-semibold group"
            >
              <span className="mr-3 w-8 h-8 bg-rose-50 rounded-full flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-rose-500">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                  <path d="M12 16V12" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 8H12.01" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              learn more about our technology
              <svg className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default SignatureFeatureShowcaseSection; 