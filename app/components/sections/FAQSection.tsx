import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  categoryTitle: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    categoryTitle: "Usage Questions",
    items: [
      {
        question: "How often should I use the photonique touch?",
        answer: "For optimal results, we recommend three 10-minute sessions per week. consistency is key for seeing improvement."
      },
      {
        question: "Is the photonique touch safe for all hair types?",
        answer: "Yes, the device is designed to be effective and safe for all hair types, textures, and colors."
      },
      {
        question: "Can I use it with other hair growth products?",
        answer: "Yes, the photonique touch can enhance the effectiveness of topical treatments by improving absorption and cellular response."
      }
    ]
  },
  {
    categoryTitle: "Results Questions",
    items: [
      {
        question: "How soon will I see results?",
        answer: "Most users notice reduced shedding within 4 weeks and visible new growth within 8-12 weeks of consistent use."
      },
      {
        question: "Will results disappear if I stop using the device?",
        answer: "We recommend maintenance treatments 1-2 times weekly after achieving your desired results to maintain hair health."
      },
      {
        question: "Is this effective for complete baldness?",
        answer: "The photonique touch works best for thinning hair and early to moderate hair loss. areas with complete hair loss may see limited results."
      }
    ]
  },
  {
    categoryTitle: "Technical Questions",
    items: [
      {
        question: "Does the light therapy cause any side effects?",
        answer: "The photonique touch uses safe, non-uv light that does not burn or damage the skin. some users report mild, temporary scalp warmth during treatment."
      },
      {
        question: "How long does the battery last?",
        answer: "A full charge provides approximately 12 treatments (120 minutes of use). the device automatically powers off after each 10-minute session."
      }
    ]
  }
];

const AccordionItem: React.FC<{ item: FAQItem, isOpen: boolean, onClick: () => void }> = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-neutral-200">
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full py-5 text-left text-lg font-medium text-neutral-800 hover:text-rose-600 transition-colors"
      >
        <span>{item.question}</span>
        <ChevronDown 
          className={`h-6 w-6 text-rose-500 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto", marginTop: '0px', marginBottom: '20px' },
              collapsed: { opacity: 0, height: 0, marginTop: '0px', marginBottom: '0px' }
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <p className="text-neutral-700 leading-relaxed pr-6">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openCategoryIndex, setOpenCategoryIndex] = useState<number | null>(null);

  const handleAccordionClick = (categoryIdx: number, itemIdx: number) => {
    const uniqueIndex = categoryIdx * 1000 + itemIdx; // Create a unique index for each item across categories
    if (openIndex === uniqueIndex) {
      setOpenIndex(null);
    } else {
      setOpenIndex(uniqueIndex);
      setOpenCategoryIndex(categoryIdx);
    }
  };

  return (
    <motion.section 
      className="py-16 md:py-24 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-neutral-900 mb-4 lowercase">
            frequently asked questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqData.map((category, categoryIdx) => (
            <div key={category.categoryTitle} className="mb-10">
              <h3 className="text-2xl font-semibold text-neutral-800 mb-6 border-b-2 border-rose-200 pb-2">
                {category.categoryTitle}
              </h3>
              {category.items.map((item, itemIdx) => (
                <AccordionItem 
                  key={item.question}
                  item={item}
                  isOpen={openIndex === (categoryIdx * 1000 + itemIdx)}
                  onClick={() => handleAccordionClick(categoryIdx, itemIdx)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default FAQSection; 