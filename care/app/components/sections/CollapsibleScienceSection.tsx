import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Sparkles, Zap, Dna } from 'lucide-react';

export function CollapsibleScienceSection() {
  const [expandedPanel, setExpandedPanel] = useState<number | null>(null);

  const togglePanel = (panelIndex: number) => {
    setExpandedPanel(expandedPanel === panelIndex ? null : panelIndex);
  };

  // Science panels - these would be populated with content from your existing Science sections
  const sciencePanels = [
    {
      title: "Red Light Technology",
      icon: <Sparkles className="h-6 w-6 text-rose-500" />,
      shortDescription: "Clinically proven wavelengths that stimulate follicle regeneration",
      expandedContent: (
        <div className="space-y-4">
          <p className="text-neutral-700">
            Our proprietary technology uses specialized 650nm wavelength red light, 
            clinically proven to penetrate the scalp at the optimal depth for follicle stimulation.
          </p>
          <div className="bg-neutral-50 p-4 rounded-lg">
            <h4 className="font-medium text-neutral-800 mb-2">Clinical Research</h4>
            <p className="text-sm text-neutral-600">
              In studies published in the Journal of Dermatological Science, red light therapy at this 
              wavelength demonstrated a 29% increase in hair density over a 16-week period.
            </p>
          </div>
          {/* Placeholder for diagrams or further details that would be added later */}
          <div className="aspect-video bg-neutral-100 rounded-lg flex items-center justify-center">
            <span className="text-neutral-400">Interactive diagram coming soon</span>
          </div>
        </div>
      )
    },
    {
      title: "How It Stimulates Hair Growth",
      icon: <Zap className="h-6 w-6 text-rose-500" />,
      shortDescription: "Increases cellular energy production and blood flow",
      expandedContent: (
        <div className="space-y-4">
          <p className="text-neutral-700">
            Care•atin's red light therapy works by increasing ATP production in cells and
            improving circulation to hair follicles, delivering essential nutrients and oxygen.
          </p>
          <ul className="space-y-2 text-neutral-700">
            <li className="flex items-start">
              <span className="text-rose-500 mr-2">•</span>
              <span>Increases mitochondrial function in cells</span>
            </li>
            <li className="flex items-start">
              <span className="text-rose-500 mr-2">•</span>
              <span>Stimulates cytochrome c oxidase, a key cellular energy enzyme</span>
            </li>
            <li className="flex items-start">
              <span className="text-rose-500 mr-2">•</span>
              <span>Improves microcirculation to deliver nutrients to follicles</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      title: "The Science Behind Results",
      icon: <Dna className="h-6 w-6 text-rose-500" />,
      shortDescription: "How our technology transforms your hair cycle",
      expandedContent: (
        <div className="space-y-4">
          <p className="text-neutral-700">
            Care•atin's technology targets the hair growth cycle at multiple points, extending the 
            anagen (growth) phase and shortening the telogen (resting) phase.
          </p>
          <div className="grid grid-cols-3 gap-4 my-6">
            <div className="text-center">
              <div className="h-16 w-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-rose-600 font-medium">1</span>
              </div>
              <p className="mt-2 text-sm text-neutral-700">Extends active growth phase</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-rose-600 font-medium">2</span>
              </div>
              <p className="mt-2 text-sm text-neutral-700">Awakens dormant follicles</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-rose-600 font-medium">3</span>
              </div>
              <p className="mt-2 text-sm text-neutral-700">Strengthens hair structure</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white" id="science-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">The Science</h2>
          <p className="text-lg text-neutral-600">
            Advanced technology backed by clinical research
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {sciencePanels.map((panel, index) => (
            <div 
              key={index} 
              className={`border-b border-neutral-200 ${
                expandedPanel === index ? '' : 'hover:bg-neutral-50'
              }`}
            >
              <button
                onClick={() => togglePanel(index)}
                className="w-full px-4 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <div className="flex items-center">
                  <div className="mr-4">{panel.icon}</div>
                  <div>
                    <h3 className="font-medium text-lg text-neutral-800">{panel.title}</h3>
                    <p className="text-sm text-neutral-600">{panel.shortDescription}</p>
                  </div>
                </div>
                {expandedPanel === index ? (
                  <ChevronUp className="h-5 w-5 text-neutral-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-neutral-500" />
                )}
              </button>
              
              <AnimatePresence>
                {expandedPanel === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-6 pt-2">
                      {panel.expandedContent}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <button className="text-rose-600 font-medium flex items-center mx-auto hover:text-rose-700 transition-colors">
            <span>View full research</span>
            <ChevronDown className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </section>
  );
}