import { useState } from 'react';
import { motion } from 'framer-motion';

export function InteractiveScienceSection() {
  const [activeTab, setActiveTab] = useState('energy');

  const tabs = [
    { id: 'energy', label: 'Cellular Energy' },
    { id: 'blood', label: 'Blood Flow' },
    { id: 'inflammation', label: 'Inflammation Reduction' },
    { id: 'growth', label: 'Growth Cycles' }
  ];

  const tabContent = {
    energy: {
      title: 'Enhanced Cellular Energy',
      description: 'Red light therapy optimizes the function of mitochondria, the cellular powerhouses. This increases ATP production, providing more energy for hair follicle cells to grow stronger, healthier hair.',
      fact: 'Studies show up to 200% increase in ATP production in cells exposed to red light therapy.',
      image: '/images/science/cellular-energy.jpg'
    },
    blood: {
      title: 'Improved Blood Flow',
      description: 'Red light stimulates the formation of new capillaries, increasing circulation to hair follicles. Better blood flow means more oxygen and nutrients delivered to your scalp.',
      fact: 'Clinical studies demonstrate up to 54% increase in local circulation after red light therapy treatment.',
      image: '/images/science/blood-flow.jpg'
    },
    inflammation: {
      title: 'Reduced Inflammation',
      description: 'Chronic inflammation contributes to hair loss. Red light therapy helps calm inflammatory processes in the scalp, creating a healthier environment for hair growth.',
      fact: 'Red light therapy has been shown to reduce inflammatory markers by up to 70% in clinical studies.',
      image: '/images/science/inflammation.jpg'
    },
    growth: {
      title: 'Extended Growth Cycles',
      description: 'Hair grows in cycles. Red light therapy extends the active growth phase (anagen) of hair follicles, allowing hair to grow longer and stronger before entering the resting phase.',
      fact: 'Clinical research shows up to 35% more hairs in the active growth phase after red light therapy treatment.',
      image: '/images/science/growth-cycles.jpg'
    }
  };

  const currentTab = tabContent[activeTab as keyof typeof tabContent];

  return (
    <section className="py-16 md:py-24 bg-stone-50 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-stone-800">The Science Behind care•atin</h2>
          <p className="text-lg text-stone-600 max-w-3xl mx-auto">
            Our red light technology is backed by decades of research and clinical studies.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-8 gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeTab === tab.id
                    ? 'bg-rose-500 text-white'
                    : 'bg-white text-stone-700 hover:bg-stone-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image Side */}
              <div className="bg-stone-200 h-64 md:h-auto">
                {/* Placeholder for tab-specific image */}
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-stone-500">{currentTab.title} Visualization</span>
                </div>
              </div>
              
              {/* Content Side */}
              <div className="p-8">
                <h3 className="text-2xl font-light text-stone-800 mb-4">{currentTab.title}</h3>
                <p className="text-stone-600 mb-6">{currentTab.description}</p>
                <div className="bg-stone-50 p-4 rounded-lg">
                  <h4 className="font-medium text-stone-800 mb-2">Science Fact</h4>
                  <p className="text-stone-600 italic">{currentTab.fact}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <a 
              href="/pages/science" 
              className="inline-flex items-center text-rose-500 font-medium hover:text-rose-600 transition-colors"
            >
              Explore the research behind our technology
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="ml-2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InteractiveScienceSection;