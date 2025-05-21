import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@remix-run/react';
import { CheckCircle, ChevronDown, Zap, LayoutGrid, Aperture } from 'lucide-react'; // Added more icons for specs
import { Container } from '~/components/ui/Container';
import { ProductSpotlight } from '~/components/ui/ProductSpotlight';

// Define a type for the product prop based on the GraphQL query
// This should ideally be generated or a more complete type from Shopify types
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
  // Add other fields if used, e.g., metafields from the query
  metafields?: {
    nodes: Array<{ key: string; value: string; }>;
  } | null;
}

interface DeviceShowcaseSectionProps {
  product: ProductType | null; // Allow product to be null if not found
}

// Simple ArrowRight component (can be moved to a shared util if used in multiple places)
function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props} className={`ml-2 h-5 w-5 ${props.className || ''}`}>
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Updated deviceEssentials to match brand wording and add emotional benefits
const deviceEssentials = [
  { text: "sleek design that fits into your life, effortlessly elevating your self-care ritual.", icon: CheckCircle },
  { text: "one-month battery life for uninterrupted routines, so you never miss a moment of transformation.", icon: CheckCircle },
  { text: "one-touch operation for ultimate simplicity, letting you focus on the experience, not the device.", icon: CheckCircle },
  { text: "travel-ready elegance, your wellness companion anywhere—because your confidence shouldn't be limited by location.", icon: CheckCircle },
];

// Condensed FAQs with emotional framing
const faqs = [
  {
    question: "how will photonique fit into my routine?",
    answer: "beautifully and effortlessly. just 10 minutes, 3 times a week is all it takes. many users incorporate it during their morning routine or evening wind-down—creating a moment of calm that benefits both hair and mind.",
  },
  {
    question: "is it safe for all hair types?",
    answer: "absolutely. our gentle light therapy works with all hair types and colors, nurturing growth at the cellular level without discrimination. it's a universal approach to hair wellness that celebrates your unique beauty.",
  },
  {
    question: "when will i see my transformation begin?",
    answer: "your journey starts immediately, with visible results unfolding over time. many notice reduced shedding in 3-4 weeks, new growth around 6 weeks, and transformative fullness by 8-12 weeks. everyone's path is unique, but confidence is the destination for all.",
  },
  {
    question: "is this a lasting investment?",
    answer: "yes—photonique touch requires no refills or hidden costs. it's a one-time investment in your hair's future and your confidence, designed to deliver years of transformative results.",
  },
];

interface AccordionItemProps {
  index: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ index, question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-neutral-200 last:border-b-0">
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full py-4 text-left text-neutral-800 hover:text-rose-600 transition-colors"
      >
        <span className="font-medium text-md">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
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
              open: { opacity: 1, height: "auto", marginTop: '0px', marginBottom: '16px' },
              collapsed: { opacity: 0, height: 0, marginTop: '0px', marginBottom: '0px' },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <p className="text-neutral-600 text-sm leading-relaxed pr-4">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function DeviceShowcaseSection({ product }: DeviceShowcaseSectionProps) {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const handleAccordionClick = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <motion.section 
      className="py-20 md:py-28 bg-stone-50" // Light stone background for warmth
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-serif font-light lowercase tracking-wide text-neutral-800 mb-6"
            initial={{ opacity: 0, y:10 }}
            whileInView={{ opacity: 1, y:0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            the gentle science of self-care
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-neutral-700 font-light leading-relaxed max-w-xl mx-auto"
            initial={{ opacity: 0, y:10 }}
            whileInView={{ opacity: 1, y:0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            no side effects. no learning curve. no compromise. just a moment of care that transforms your hair and elevates your confidence.
          </motion.p>
        </div>

        {/* Asymmetrical Layout: Device Visual (Left), Details (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 md:gap-16 lg:gap-20 items-center">
          
          {/* Device Visual Column (Larger) */}
          <motion.div 
            className="lg:col-span-3 bg-gradient-to-br from-white via-stone-50 to-rose-50 rounded-2xl shadow-xl p-6 md:p-8 aspect-[4/3] flex flex-col items-center justify-center relative overflow-hidden group"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            {/* Enhanced product visualization with ProductSpotlight component */}
            <ProductSpotlight
              productImage={product?.featuredImage?.url || '/images/device-placeholder-large.png'}
              altText={product?.title || 'Photonique Device'}
              className="w-full h-full"
            />
            {/* Subtle light effect placeholder */}
            <div className="absolute inset-0 -z-10 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-photonique-gold/50 rounded-full blur-[80px] animate-pulse group-hover:opacity-50 transition-opacity" style={{animationDuration: '7s'}}></div>
                <div className="absolute bottom-1/4 right-1/4 w-2/5 h-2/5 bg-photonique-coral/40 rounded-full blur-[70px] animate-pulse group-hover:opacity-40 transition-opacity" style={{animationDuration: '9s', animationDelay: '1s'}}></div>
            </div>
            <p className="absolute bottom-4 left-4 text-xs text-neutral-500/70">Interactive 3D model coming soon</p>
          </motion.div>

          {/* Details Column (Smaller) */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-serif font-semibold text-neutral-900 mb-6 lowercase tracking-wide">
              device essentials:
            </h3>
            <ul className="space-y-5 mb-10">
              {deviceEssentials.map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300"
                  initial={{ opacity: 0, x: 15}}
                  whileInView={{ opacity: 1, x: 0}}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.5, ease: "easeOut"}}
                  viewport={{once: true}}
                  whileHover={{ scale: 1.03 }}
                >
                  <item.icon className="h-6 w-6 text-photonique-coral mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-neutral-700 font-light leading-relaxed">{item.text}</span>
                </motion.li>
              ))}
            </ul>
            
            {/* Scientific Specs - Enhanced */}
            <div className="mb-10">
                <h4 className="text-xl font-serif font-semibold text-neutral-900 mb-4 lowercase tracking-wide">key specifications:</h4>
                <div className="grid grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow-sm border border-stone-100">
                  {[
                    { label: "Wavelength", value: "650-670nm", icon: Zap },
                    { label: "Technology", value: "LED Matrix", icon: LayoutGrid },
                    { label: "Coverage", value: "Full Scalp", icon: Aperture }
                  ].map((spec, i) => (
                    <motion.div 
                      key={i} 
                      className="relative p-4 rounded-lg hover:bg-rose-50/50 transition-colors duration-300 flex flex-col items-center text-center"
                      whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <spec.icon className="w-6 h-6 mb-2 text-rose-400 mx-auto" />
                      <p className="text-xs text-neutral-500 uppercase tracking-wider">{spec.label}</p>
                      <p className="text-md font-medium text-photonique-coral">{spec.value}</p>
                    </motion.div>
                  ))}
                </div>
            </div>

            {/* FAQ Section */}
            <div>
              <h3 className="text-2xl font-semibold text-neutral-800 mb-6 lowercase">questions? answered.</h3>
              <div className="bg-white rounded-xl shadow-sm border border-stone-100">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    index={index}
                    question={faq.question.toLowerCase()}
                    answer={faq.answer}
                    isOpen={openAccordion === index}
                    onClick={() => handleAccordionClick(index)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
}

export default DeviceShowcaseSection; 