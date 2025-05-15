import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BeforeAfterSlider } from '~/components/BeforeAfterSlider';

interface SliderCase {
  id: string;
  name: string;
  age: number;
  issue: string;
  timeframe: string;
  quote: string;
  beforeImage: string;
  afterImage: string;
}

export function BeforeAfterSliderSection() {
  const [activeCase, setActiveCase] = useState(0);
  const [showProTip, setShowProTip] = useState(false);
  
  // Show the pro tip after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProTip(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Updated cases with more specific details and timeframes
  const cases: SliderCase[] = [
    {
      id: "case1",
      name: "Jennifer K.",
      age: 42,
      issue: "Postpartum thinning",
      timeframe: "12 weeks",
      quote: "I tried everything from supplements to expensive salon treatments. Nothing worked until I found care•atin. My shedding reduced by 60% in just 6 weeks.",
      beforeImage: "/images/before-after/before-after-3-after.png", // Using existing image
      afterImage: "/images/before-after/before-after-3-after.png" // Using existing image
    },
    {
      id: "case2",
      name: "Michael R.",
      age: 38,
      issue: "Male pattern thinning",
      timeframe: "16 weeks",
      quote: "I was skeptical at first but decided to try it anyway. The crown area has filled in significantly, and my barber noticed the difference before I did.",
      beforeImage: "/images/before-after/before-after-3-after.png", // Using existing image
      afterImage: "/images/before-after/before-after-3-after.png" // Using existing image
    },
    {
      id: "case3",
      name: "Sarah T.",
      age: 35,
      issue: "Stress-induced loss",
      timeframe: "8 weeks",
      quote: "After 3 months, my hairdresser asked what I was doing differently. That's when I knew it wasn't just in my head - my hair really was getting thicker!",
      beforeImage: "/images/before-after/before-after-3-after.png", // Using existing image
      afterImage: "/images/before-after/before-after-3-after.png" // Using existing image
    }
  ];
  
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="brand-heading text-3xl lg:text-5xl mb-8">
              real results, <br />clinically verified
            </h2>
            <p className="brand-body text-neutral-600 mb-6">
              Our clinical studies show significant improvements in hair density, 
              thickness, and overall appearance in as little as 90 days.
            </p>
            
            <div className="mb-12">
              <div className="flex justify-between mb-3">
                <span className="brand-body text-sm text-neutral-600">hair density</span>
                <span className="brand-heading text-sm">+76%</span>
              </div>
              <div className="h-2 bg-neutral-100 rounded-full overflow-hidden mb-6">
                <div className="h-full bg-rose-500 rounded-full" style={{width: '76%'}}></div>
              </div>
              
              <div className="flex justify-between mb-3">
                <span className="brand-body text-sm text-neutral-600">hair diameter</span>
                <span className="brand-heading text-sm">+65%</span>
              </div>
              <div className="h-2 bg-neutral-100 rounded-full overflow-hidden mb-6">
                <div className="h-full bg-rose-500 rounded-full" style={{width: '65%'}}></div>
              </div>
              
              <div className="flex justify-between mb-3">
                <span className="brand-body text-sm text-neutral-600">anagen phase extension</span>
                <span className="brand-heading text-sm">+82%</span>
              </div>
              <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{width: '82%'}}></div>
              </div>
            </div>
            
            <blockquote className="bg-neutral-50 p-6 rounded-lg mb-8">
              <p className="italic text-neutral-600 mb-4">
                "After 3 months of using care•atin, my hair is noticeably thicker and 
                I've stopped obsessing over hair loss. The confidence I've regained is priceless."
              </p>
              <footer className="brand-heading text-sm">— sarah t., 34</footer>
            </blockquote>
            
            {/* Case Selection Tabs - Simplified */}
            <div className="flex flex-wrap gap-2">
              {cases.map((caseItem, index) => (
                <button
                  key={caseItem.id}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    activeCase === index 
                      ? 'bg-rose-100 text-rose-700 font-medium' 
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                  onClick={() => setActiveCase(index)}
                >
                  {caseItem.name}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            {/* Before/After Interactive Slider */}
            <div className="relative">
              <BeforeAfterSlider 
                beforeImage={cases[activeCase].beforeImage}
                afterImage={cases[activeCase].afterImage}
                beforeLabel="before"
                afterLabel={`after ${cases[activeCase].timeframe}`}
              />
              
              {/* Editorial film grain overlay added by the BeforeAfterSlider component */}
              
              {/* Pro tip notification - appears after delay */}
              <AnimatePresence>
                {showProTip && (
                  <motion.div 
                    className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-rose-100 rounded-full p-2 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm mb-1">Pro Tip</h5>
                        <p className="text-xs text-neutral-600">Drag the slider to compare before and after results.</p>
                        <button 
                          className="text-xs text-rose-600 mt-2 hover:text-rose-700"
                          onClick={() => setShowProTip(false)}
                        >
                          Got it
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      
      {/* Abstract wavelength background element */}
      <div className="absolute -top-24 -right-24 w-96 h-96 opacity-10">
        <div className="w-full h-full rounded-full bg-rose-300 blur-3xl"></div>
      </div>
    </section>
  );
}
