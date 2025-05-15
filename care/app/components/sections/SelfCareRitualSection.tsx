import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Download, Play, Clock, Zap, Heart, ChevronDown } from 'lucide-react';
import { Link } from '@remix-run/react';
import { ImprovedFAQ } from '~/components/Shared/ImprovedFAQ';

// Remove unused animation components
// const FillAnimation = () => { ... };
// const MassageAnimation = () => { ... };

export function SelfCareRitualSection() {
  const [activeWeek, setActiveWeek] = useState(1);

  // Usage steps with detailed information and supplies
  const usageSteps = [
    {
      id: 1,
      title: "Fill & Prepare",
      description: "Apply your preferred hair oil or our specialized Care•atin serum to the device reservoir.",
      image: "/images/before-after/before-after-3-after.png", // Using existing image
      tips: "The device works with most light oils and serums. Our Care•atin Revitalizing Serum is specially formulated for optimal results, but you can use your preferred product.",
      supplies: [
        { name: "Care•atin Revitalizing Serum", optional: false },
        { name: "Alternative: Argan, Jojoba, or Rosemary Oil", optional: true }
      ]
    },
    {
      id: 2,
      title: "Massage & Activate",
      description: "Gently move the device in circular motions across your scalp, focusing on target areas.",
      image: "/images/before-after/before-after-3-after.png", // Using existing image
      tips: "Use light pressure - just enough to maintain contact with the scalp. The device automatically activates red light therapy when in contact with your skin.",
      supplies: []
    },
    {
      id: 3,
      title: "Relax & Transform",
      description: "Continue for 10 minutes, 3 times weekly. Feel free to meditate or relax during your session.",
      image: "/images/before-after/before-after-3-after.png", // Using existing image
      tips: "Consistency is key. Set a regular schedule - many users choose Monday, Wednesday, and Friday evenings as part of their self-care routine.",
      supplies: []
    }
  ];

  // Journey timeline with detailed explanations
  const journeyWeeks = [
    {
      id: 1,
      label: "Weeks 1-2",
      title: "Foundation Phase",
      description: "Your scalp is getting accustomed to treatment. Cellular energy production begins increasing, though visual changes aren't yet visible.",
      metrics: [
        { name: "Blood Flow", value: "+18%", explanation: "Increased circulation delivers more nutrients to your follicles" },
        { name: "Scalp Comfort", value: "Improved", explanation: "Many users report reduced irritation and dryness" }
      ],
      image: "/images/before-after/before-after-3-after.png" // Using existing image
    },
    {
      id: 2,
      label: "Weeks 3-4",
      title: "Activation Phase",
      description: "Cellular metabolism has increased. You may notice less shedding and a healthier scalp environment.",
      metrics: [
        { name: "Shedding Reduction", value: "Up to 30%", explanation: "Fewer hairs in your brush and shower drain" },
        { name: "ATP Production", value: "+37%", explanation: "More cellular energy means healthier follicle function" }
      ],
      image: "/images/before-after/before-after-3-after.png" // Using existing image
    },
    {
      id: 3,
      label: "Weeks 5-8",
      title: "Improvement Phase",
      description: "Initial visible improvements often appear. Hair feels stronger and existing hair may appear thicker.",
      metrics: [
        { name: "Hair Strength", value: "+25%", explanation: "Stronger strands that resist breakage better" },
        { name: "Visible Density", value: "Noticeable", explanation: "Many users report fuller-looking hair" }
      ],
      image: "/images/before-after/before-after-3-after.png" // Using existing image
    },
    {
      id: 4,
      label: "Weeks 9-12",
      title: "Transformation Phase",
      description: "Maximum results start to manifest. New growth becomes more visible and existing hair is notably stronger.",
      metrics: [
        { name: "Blood Flow", value: "+53%", explanation: "Optimal nutrient delivery to follicles" },
        { name: "User Satisfaction", value: "93%", explanation: "Percentage of users reporting visible improvement" }
      ],
      image: "/images/before-after/before-after-3-after.png" // Using existing image
    }
  ];

  // FAQ entries for common questions
  const faqItems = [
    {
      question: "Do I need to purchase your specialized serum or can I use my own products?",
      answer: "While our Care•atin Revitalizing Serum is formulated to work optimally with the device, you can use your own light oils or serums. We recommend natural oils like jojoba, argan, or rosemary that have hair-nurturing properties. Avoid thick creams or heavy oils that might clog the device."
    },
    {
      question: "How will I know if I'm using the device correctly?",
      answer: "The device has indicator lights that confirm proper contact with your scalp. A steady blue light means it's on, while a pulsing red light means the therapy is active. You should feel a gentle warmth but never any discomfort. The mobile app also provides usage guidance and tracking."
    },
    {
      question: "What if I miss a treatment session?",
      answer: "Consistency is important, but missing an occasional session won't significantly impact your results. If you miss a scheduled day, simply continue with your next planned session. Try not to miss more than 2-3 consecutive sessions for optimal results."
    },
    {
      question: "How long should I continue using Care•atin?",
      answer: "For best results, we recommend an initial 12-week intensive period, followed by a maintenance schedule of 1-2 times weekly. Many users incorporate Care•atin into their long-term hair care routine because the benefits continue to improve and sustain with ongoing use."
    },
    {
      question: "Can I use Care•atin if I have existing hair treatments like color or keratin?",
      answer: "Yes, Care•atin is safe to use with colored or chemically treated hair. In fact, many users report that it helps maintain the health of treated hair. We recommend waiting 48 hours after any chemical treatment before using the device."
    }
  ];

  return (
    <section className="py-10 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header - Condensed */}
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <span className="text-rose-600 font-medium block mb-1 text-sm">Your Journey to Fuller Hair</span>
          <h2 className="text-2xl md:text-3xl font-light mb-2">
            The Self-Care Ritual That Transforms
          </h2>
          <p className="text-neutral-600 text-sm mb-3">
            Just 10 minutes, three times weekly, to revitalize your hair from the follicle up.
          </p>
          <Link 
            to="/files/care-atin-quick-start-guide.pdf" 
            className="inline-flex items-center bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-full transition-colors shadow-sm text-sm"
          >
            <Download className="w-4 h-4 mr-1" />
            Download Quick-Start Guide
          </Link>
        </div>

        {/* Usage Process - More Compact Layout */}
        <div className="mb-10">
          <h3 className="text-xl font-medium mb-6 text-center">Your Simple 3-Step Ritual</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {usageSteps.map((step, index) => (
              <div 
                key={step.id} 
                className="bg-white rounded-lg shadow-sm p-4 border border-neutral-100 relative"
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-rose-600 text-white rounded-full flex items-center justify-center font-bold shadow-md text-sm">
                  {step.id}
                </div>
                
                {/* Step Content */}
                <div className="pt-4">
                  <div className="aspect-video rounded-lg overflow-hidden mb-3">
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  
                  <h4 className="text-lg font-medium text-neutral-800 mb-1">{step.title}</h4>
                  <p className="text-neutral-600 mb-2 text-xs">{step.description}</p>
                  
                  {/* Additional Info */}
                  <div className="text-2xs text-neutral-500 mb-2">
                    <strong>Pro Tip:</strong> {step.tips}
                  </div>
                  
                  {/* Required Supplies */}
                  {step.supplies.length > 0 && (
                    <div className="mt-2">
                      <h5 className="text-xs font-medium text-neutral-700 mb-1">Supplies:</h5>
                      <ul className="text-2xs space-y-0.5">
                        {step.supplies.map((supply, sidx) => (
                          <li key={sidx} className="flex items-start">
                            <span className={`inline-block w-1.5 h-1.5 rounded-full mt-1 mr-1 ${supply.optional ? 'bg-blue-400' : 'bg-rose-500'}`}></span>
                            {supply.name}
                            {supply.optional && <span className="text-blue-500 ml-1">(Optional)</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                {/* Arrow to next step */}
                {index < usageSteps.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-5 h-5 text-rose-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Usage Calendar Link */}
          <div className="text-center mt-4">
            <Link 
              to="/files/care-atin-usage-calendar.pdf" 
              className="inline-flex items-center text-rose-600 hover:text-rose-700 transition-colors text-xs font-medium"
            >
              <Clock className="w-3 h-3 mr-1" />
              Download Usage Calendar
            </Link>
          </div>
        </div>

        {/* Transformation Journey - Condensed Timeline */}
        <div className="mb-10">
          <h3 className="text-xl font-medium mb-5 text-center">Your Transformation Journey</h3>
          
          {/* Timeline Navigation - More Compact */}
          <div className="max-w-3xl mx-auto mb-6">
            <div className="grid grid-cols-4 gap-1">
              {journeyWeeks.map((week) => (
                <button
                  key={week.id}
                  onClick={() => setActiveWeek(week.id)}
                  className={`relative py-2 px-1 transition-all duration-300 rounded-lg ${
                    activeWeek === week.id 
                      ? 'bg-rose-600 text-white shadow-md ring-2 ring-rose-100 transform scale-105' 
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  <div className="text-2xs md:text-xs font-medium">{week.label}</div>
                  
                  {/* Interactive indicators */}
                  {activeWeek === week.id && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2"
                    >
                      <ArrowDown className="w-3 h-3 text-rose-600" />
                    </motion.div>
                  )}
                  
                  {/* Play button indicator for interactivity */}
                  {activeWeek !== week.id && (
                    <div className="absolute bottom-1 right-1 w-3 h-3 bg-neutral-200 rounded-full flex items-center justify-center opacity-70">
                      <Play className="w-1.5 h-1.5 text-neutral-600" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Active Week Details - More Compact */}
          <motion.div 
            key={activeWeek}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white rounded-lg shadow-sm p-4 border border-neutral-100">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* Image Column */}
                <div className="md:col-span-2 order-2 md:order-1">
                  <div className="aspect-video md:aspect-square rounded-lg overflow-hidden">
                    <img 
                      src={journeyWeeks[activeWeek - 1].image} 
                      alt={journeyWeeks[activeWeek - 1].title} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                
                {/* Text Content Column */}
                <div className="md:col-span-3 order-1 md:order-2">
                  <div className="flex items-center mb-2">
                    <div className="bg-rose-600 text-white font-medium text-xs w-5 h-5 rounded-full flex items-center justify-center mr-2">
                      {activeWeek}
                    </div>
                    <h4 className="text-lg font-medium text-neutral-800">{journeyWeeks[activeWeek - 1].title}</h4>
                  </div>
                  
                  <div className="text-neutral-500 text-xs font-medium mb-1">{journeyWeeks[activeWeek - 1].label}</div>
                  
                  <p className="text-neutral-700 text-sm mb-4">
                    {journeyWeeks[activeWeek - 1].description}
                  </p>
                  
                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-2">
                    {journeyWeeks[activeWeek - 1].metrics.map((metric, midx) => (
                      <div key={midx} className="bg-neutral-50 p-2 rounded-md">
                        <div className="flex justify-between mb-1">
                          <div className="text-2xs text-neutral-500">{metric.name}</div>
                          <div className="text-sm font-bold text-rose-600">{metric.value}</div>
                        </div>
                        <div className="text-2xs text-neutral-600">{metric.explanation}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section - Condensed */}
        <div className="max-w-3xl mx-auto mb-4">
          <h3 className="text-xl font-medium mb-4 text-center">Common Questions</h3>
          
          <div className="space-y-2">
            {faqItems.slice(0, 3).map((item, index) => (
              <div key={index} className="bg-neutral-50 rounded-lg">
                <button
                  className="flex justify-between items-center w-full text-left px-4 py-3 rounded-lg focus:outline-none"
                  onClick={() => {}}
                >
                  <h4 className="font-medium text-sm text-neutral-800">{item.question}</h4>
                  <ChevronDown className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                </button>
                <div className="px-4 pb-3">
                  <p className="text-xs text-neutral-600">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* View All FAQs Link */}
          <div className="text-center mt-4">
            <Link
              to="/pages/faq"
              className="inline-flex items-center text-rose-600 hover:text-rose-700 text-xs font-medium"
            >
              View All FAQs
              <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-8 text-center">
          <h4 className="text-base font-medium mb-3">Need More Help?</h4>
          <div className="flex flex-wrap justify-center gap-3">
            <Link 
              to="/pages/troubleshooting" 
              className="inline-flex items-center bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-lg transition-colors text-xs"
            >
              Troubleshooting Guide
            </Link>
            <Link 
              to="/pages/video-tutorials" 
              className="inline-flex items-center bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-lg transition-colors text-xs"
            >
              Video Tutorials
            </Link>
            <Link 
              to="/pages/community" 
              className="inline-flex items-center bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-lg transition-colors text-xs"
            >
              User Community
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
