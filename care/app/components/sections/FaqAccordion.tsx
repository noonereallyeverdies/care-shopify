import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// 1. Define interface for FAQ item data
interface FaqItem {
  question: string;
  answer: string;
}

// Placeholder FAQ data
const faqData: FaqItem[] = [
  {
    question: "How soon can I expect to see results?",
    answer: "While individual results vary, many users report noticeable improvements in hair feel and reduced shedding within 4-6 weeks. Significant changes in density and growth are typically observed around 90 days with consistent daily use."
  },
  {
    question: "Is the Photonique Touch safe for all hair types?",
    answer: "Yes, the Photonique Touch is designed to be safe and effective for all hair types and colors. The red light therapy is non-invasive and targets the follicle at a cellular level."
  },
  {
    question: "How often should I use the device?",
    answer: "For optimal results, we recommend using the Photonique Touch for 10-15 minutes daily. Consistency is key to activating and supporting the hair growth cycle."
  },
  {
    question: "Can I use my own hair serums with the device?",
    answer: "The device is designed for optimal synergy with Care-atin serums, which are formulated to work with red light therapy. While other serums might be usable, we recommend our formulations for the best results."
  }
];

// 2. Define interface for AccordionItem props
interface AccordionItemProps {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}

// Accordion Item Component - 3. Apply Props type
function AccordionItem({ item, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-neutral-200">
      <h2>
        <button
          type="button"
          className="flex w-full items-center justify-between py-5 px-1 text-left font-medium text-primary focus:outline-none focus-visible:ring focus-visible:ring-rose-500 focus-visible:ring-opacity-75"
          onClick={onToggle}
          aria-expanded={isOpen}
        >
          <span className="text-base md:text-lg">{item.question}</span>
          <ChevronDown 
            className={`h-5 w-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </h2>
      {/* Collapsible Panel using max-height for transition */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
        style={{ transitionProperty: 'max-height' }} // Explicitly transition max-height
      >
        <div className="pb-5 px-1 pt-2 text-base text-neutral-600 leading-relaxed">
          {item.answer}
        </div>
      </div>
    </div>
  );
}

// Main FAQ Accordion Component
export function FaqAccordion() {
  // State to track open items (allow multiple open)
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const handleToggle = (index: number) => {
    setOpenIndexes(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="py-24 bg-contrast"> {/* Or bg-neutral-50 for alternation */}
      <div className="container mx-auto max-w-3xl px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center text-primary mb-12">
          Frequently Asked Questions
        </h2>
        <div className="w-full rounded-lg bg-white p-2 shadow-sm border border-neutral-100">
          {faqData.map((item, index) => (
            <AccordionItem 
              key={index}
              item={item}
              isOpen={openIndexes.includes(index)}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 