import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  return (
    <motion.div 
      className="relative w-full max-w-md mx-auto aspect-square bg-neutral-100 rounded-full flex items-center justify-center shadow-xl p-8"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.5 }}
    >
      {/* Central Target Icon representing precision */}
      <Target className="absolute text-rose-500 opacity-30 h-full w-full animate-pulse_slow" />
      
      {/* Inner core element */}
      <motion.div 
        className="relative z-10 bg-white p-6 rounded-full shadow-2xl w-3/4 h-3/4 flex flex-col items-center justify-center text-center"
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "backOut" }}
        viewport={{ once: true }}
      >
        <Zap className="h-16 w-16 text-rose-600 mb-4" />
        <p className="text-sm font-sans font-semibold text-neutral-700 uppercase tracking-wider">
          Precision Light Matrix
        </p>
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
              className="bg-rose-500 rounded-full w-4 h-4 shadow-md cursor-pointer"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5 + 0.8,
                ease: "easeInOut",
              }}
            />
            <AnimatePresence>
              {hoveredHotspot === i && (
                <motion.div
                  className={`absolute ${tooltipXClass} ${tooltipYClass} w-max max-w-xs bg-neutral-800 text-white text-xs rounded-md px-3 py-1.5 shadow-lg z-20 pointer-events-none`}
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

const techAccordionData = [
  {
    question: "What wavelengths of light does the Matrix use?",
    answer: "The Precision Light Matrix utilizes a proprietary blend of specific red (660nm) and near-infrared (850nm) wavelengths, clinically proven to stimulate hair follicle cells, improve circulation, and reduce inflammation for optimal hair regrowth."
  },
  {
    question: "How does it ensure full scalp coverage?",
    answer: "Our ergonomic device design, combined with the strategic placement and density of over 300 high-intensity LEDs within the Matrix, ensures comprehensive and uniform light distribution across the entire scalp during each session."
  },
  {
    question: "Is this technology patented or unique to Photonique?",
    answer: "Yes, the core design of the Precision Light Matrix and its energy delivery system are proprietary to Photonique, developed through extensive research to maximize efficacy and user comfort. Several aspects are patent-pending."
  },
];

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const TechAccordionItem: React.FC<AccordionItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-neutral-200 last:border-b-0">
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full py-3.5 text-left text-neutral-700 hover:text-rose-700 transition-colors group"
      >
        <span className="font-sans font-medium text-sm group-hover:text-rose-600">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className={`h-5 w-5 transform transition-transform duration-300 ${isOpen ? 'text-rose-600' : 'text-neutral-500'}`} />
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
              open: { opacity: 1, height: "auto", marginTop: '0px', marginBottom: '12px' },
              collapsed: { opacity: 0, height: 0, marginTop: '0px', marginBottom: '0px' },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <p className="text-neutral-600 text-xs leading-relaxed pr-4 font-serif">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function SignatureFeatureShowcaseSection({ product }: SignatureFeatureShowcaseSectionProps) {
  const [openTechAccordion, setOpenTechAccordion] = useState<number | null>(null);

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
      className="py-16 md:py-24 bg-rose-50 overflow-hidden" // Subtle texture/color accent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-neutral-900 mb-4 lowercase">
            The Science of Radiance: {product ? product.title : "Photonique's Core"}
          </h2>
          <p className="text-lg md:text-xl text-neutral-700 leading-relaxed font-serif">
            At the heart of your transformation is our <strong className="font-semibold text-rose-700">Precision Light Matrix</strong>, intelligently delivering therapeutic light exactly where your follicles need it most.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-start">
          <motion.div 
            className="lg:col-span-3"
            variants={itemVariants} // Individual animation for the visual block
          >
            <FeatureVisual />
          </motion.div>
          
          <motion.div 
            className="lg:col-span-2 lg:pl-8"
            // variants={sectionVariants} // Let children handle their own animation via itemVariants
          >
            <motion.div 
              className="bg-white p-6 md:p-8 rounded-xl shadow-xl border border-neutral-200 mb-8"
              variants={itemVariants}
            >
              <CheckCircle className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-2xl font-sans font-bold text-neutral-800 mb-3">
                Proven Results, Faster.
              </h3>
              <p className="text-4xl md:text-5xl font-bold text-rose-600 mb-2">
                93%
              </p>
              <p className="text-neutral-700 font-serif leading-relaxed mb-1">
                saw visible improvement in hair density and fullness.
              </p>
              <p className="text-xs text-neutral-500 font-serif">
                *Based on an 8-week clinical study with 120 participants.
              </p>
            </motion.div>

            {/* Technical Accordion */}
            <motion.div 
              className="bg-white p-6 md:p-8 rounded-xl shadow-xl border border-neutral-200 mb-8"
              variants={itemVariants} // Animate this block
            >
              <div className="flex items-center mb-4">
                <Info className="h-6 w-6 text-rose-600 mr-3" />
                <h3 className="text-xl font-sans font-semibold text-neutral-800">
                  Technical Deep Dive
                </h3>
              </div>
              <div className="border-t border-neutral-200">
                {techAccordionData.map((item, index) => (
                  <TechAccordionItem
                    key={index}
                    question={item.question}
                    answer={item.answer}
                    isOpen={openTechAccordion === index}
                    onClick={() => handleTechAccordionClick(index)}
                  />
                ))}
              </div>
            </motion.div>
            
            <motion.div className="text-center lg:text-left" variants={itemVariants}>
                <a
                    href="/science" // Link to a potential science/technology page
                    className="inline-flex items-center text-rose-700 font-semibold group"
                >
                    Learn More About Our Technology
                    <svg className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </a>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default SignatureFeatureShowcaseSection; 