import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@remix-run/react';
import { CheckCircle, ChevronDown } from 'lucide-react'; // Using CheckCircle for list items

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

const deviceEssentials = [
  { text: "ergonomic, sleek design for effortless use—because elegance should feel effortless." },
  { text: "precise light matrix that targets follicles with unrivaled accuracy and power." },
  { text: "one-month battery life, ensuring your routine stays uninterrupted." },
  { text: "one-touch operation, no learning curve—because you've got better things to do." },
  { text: "travel-ready and chic, the ultimate companion for your busy, stylish lifestyle." },
];

const faqs = [
  {
    question: "How often should I use the Photonique device?",
    answer: "For optimal results, we recommend using the Photonique device for 10 minutes, three times a week. Consistency is key to achieving visible improvements in hair density and health.",
  },
  {
    question: "Is the light therapy safe for all hair types?",
    answer: "Yes, our advanced light therapy is designed to be safe and effective for all hair types and colors. It targets the follicle at a cellular level, promoting growth regardless of hair texture.",
  },
  {
    question: "When can I expect to see results?",
    answer: "Many users report noticing a reduction in shedding and an improvement in hair texture within 4-6 weeks. Significant improvements in density and fullness are typically observed after 8-12 weeks of consistent use.",
  },
  {
    question: "Does the device require any consumables or refills?",
    answer: "No, the Photonique device is a one-time purchase. It uses durable, long-lasting LED technology and does not require any cartridges, refills, or additional consumables.",
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
      className="py-16 md:py-24 bg-neutral-50" // Light neutral background
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-neutral-900 mb-4 lowercase">
            revolutionizing your hair routine
          </h2>
          <p className="text-lg md:text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed">
            salon-quality results from the comfort of your home. in just 10 minutes, three times a week, get the hair you deserve without compromising your time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Interactive 3D Device Model Placeholder */}
          <motion.div 
            className="bg-neutral-200 rounded-xl aspect-square flex items-center justify-center text-neutral-500"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* TODO: Integrate Interactive 3D Device Model Here */}
            <p className="text-xl">{product ? product.title : 'Interactive 3D Device Model'}</p>
          </motion.div>

          {/* Device Essentials */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-neutral-800 mb-6">
              Device Essentials:
            </h3>
            <ul className="space-y-4 mb-8">
              {deviceEssentials.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-rose-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-neutral-700 leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>

            {/* FAQ Accordion */}
            <div className="mt-10 mb-8">
              <h3 className="text-xl font-semibold text-neutral-800 mb-5">
                Got Questions? We've Got Answers.
              </h3>
              <div className="border-t border-neutral-200">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    index={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openAccordion === index}
                    onClick={() => handleAccordionClick(index)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col items-start space-y-4">
              <Link
                to="/products/photonique-touch"
                prefetch="intent"
                className="inline-flex items-center justify-center bg-rose-600 px-8 py-4 text-lg font-medium text-white rounded-full hover:bg-rose-700 transition-colors shadow-md hover:shadow-lg"
              >
                discover the details
                <ArrowRight />
              </Link>
              <Link 
                to="/product-manual" // Replace with your actual link
                prefetch="intent"
                className="text-sm text-rose-600 hover:text-rose-700 font-medium group inline-flex items-center"
              >
                View Full Specifications & Device Manual
                <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default DeviceShowcaseSection; 