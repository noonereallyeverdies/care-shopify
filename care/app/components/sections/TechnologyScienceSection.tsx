import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Download, ExternalLink, ChevronDown, ChevronUp, Zap, Droplets, BarChart3 } from 'lucide-react';
import { Link } from '@remix-run/react';

export function TechnologyScienceSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleExpanded = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  // Scientific mechanism tabs
  const scienceTabs = [
    { 
      name: "Cellular Activation", 
      icon: <Zap className="w-5 h-5" />,
      description: "How red light stimulates mitochondria" 
    },
    { 
      name: "Nutrient Delivery", 
      icon: <Droplets className="w-5 h-5" />,
      description: "Enhanced absorption of essential compounds" 
    },
    { 
      name: "Growth Cycle", 
      icon: <BarChart3 className="w-5 h-5" />,
      description: "Extending the anagen phase for healthier hair" 
    }
  ];

  // Expanded research data
  const researchData = [
    {
      title: "Mitochondrial Function Enhancement",
      content: "Red light at 650-680nm wavelengths stimulates cytochrome c oxidase, increasing ATP production by 28%, which enhances cellular energy available for hair follicle regeneration.",
      laymansTerms: "Like a power boost for your hair cells, giving them more energy to grow stronger and healthier.",
      studyRef: "Journal of Photochemistry and Photobiology, 2018"
    },
    {
      title: "Microcirculation Improvement",
      content: "Combined massage and red light therapy increases local blood flow by up to 54%, delivering more oxygen and nutrients to hair follicles.",
      laymansTerms: "Better blood flow brings more nutrients to your hair roots, like improving the soil for a plant.",
      studyRef: "Dermatology Research and Practice, 2020"
    },
    {
      title: "Extended Growth Phase",
      content: "Regular application extends the anagen (active growth) phase of hair follicles by approximately 35%, reducing premature shedding.",
      laymansTerms: "Keeps your hair in its growth stage longer, so it has more time to grow before naturally shedding.",
      studyRef: "International Journal of Trichology, 2021"
    }
  ];

  return (
    <section className="py-16 md:py-24 overflow-hidden relative">
      {/* Add subtle wave pattern for visual interest */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full" 
             style={{
               backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e11d48' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
               backgroundSize: "60px 60px"
             }}
        ></div>
      </div>
      
      {/* Editorial film grain overlay */}
      <div className="editorial-image-grain"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-rose-600 font-medium block mb-2">Advanced Technology</span>
          <h2 className="heading-lg brand-heading mb-4">
            The Science of Hair Renewal
          </h2>
          <p className="text-feature text-neutral-700">
            Our clinically-backed approach works at the cellular level to revitalize follicles and promote natural hair growth.
          </p>
        </div>

        {/* Interactive Science Mechanism - Enhanced with glass effect and better visuals */}
        <div className="max-w-5xl mx-auto mb-16 bg-white/80 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-md border border-rose-100">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {scienceTabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center px-6 py-4 rounded-lg transition-all ${
                  activeTab === idx 
                    ? 'bg-rose-600 text-white shadow-lg' 
                    : 'bg-white text-neutral-700 hover:bg-neutral-50 border border-neutral-100'
                }`}
              >
                <span className="mr-3">{tab.icon}</span>
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              {activeTab === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <h3 className="heading-md text-neutral-800">Cellular Activation</h3>
                  <p className="text-feature text-neutral-600">
                    Red light at specific wavelengths (650-680nm) penetrates the scalp to reach hair follicles, where it stimulates mitochondria—your cells' power generators.
                  </p>
                  <div className="flex items-center bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <Brain className="text-blue-500 w-6 h-6 mr-3 flex-shrink-0" />
                    <p className="text-sm text-blue-700">
                      <strong>In simple terms:</strong> Like recharging a battery, the light energizes your hair cells to perform better.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <h3 className="heading-md text-neutral-800">Nutrient Delivery</h3>
                  <p className="text-feature text-neutral-600">
                    Care•atin's massage technology enhances deep absorption of essential nutrients by improving microcirculation and temporarily opening cellular pathways.
                  </p>
                  <div className="flex items-center bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <Brain className="text-blue-500 w-6 h-6 mr-3 flex-shrink-0" />
                    <p className="text-sm text-blue-700">
                      <strong>In simple terms:</strong> The gentle massage helps nutrients reach deeper into your scalp, like watering a plant at its roots rather than just the surface.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <h3 className="heading-md text-neutral-800">Growth Cycle</h3>
                  <p className="text-feature text-neutral-600">
                    By reducing DHT sensitivity and extending the anagen (growth) phase of the hair cycle, Care•atin helps maintain healthy follicles for longer periods.
                  </p>
                  <div className="flex items-center bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <Brain className="text-blue-500 w-6 h-6 mr-3 flex-shrink-0" />
                    <p className="text-sm text-blue-700">
                      <strong>In simple terms:</strong> Your hair stays in the growing phase longer, rather than prematurely entering the resting and shedding phases.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="relative">
              <img 
                src={`/images/science/mechanism-${activeTab + 1}.png`} 
                alt={`Visual diagram of ${scienceTabs[activeTab].name}`}
                className="rounded-lg shadow-md w-full"
              />
              <div className="absolute -bottom-4 -right-4 bg-rose-600 text-white py-2 px-4 rounded-lg shadow-lg text-sm font-medium transform hover:scale-105 transition-transform duration-300">
                Simple Visual Explanation
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Results - Enhanced with better visual hierarchy */}
        <div className="mb-16">
          <h3 className="heading-md text-center mb-8">Visible Results Backed by Science</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8 border border-rose-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-5xl font-bold text-rose-600 mb-3">93%</div>
              <p className="text-neutral-800 font-medium">Reported Visible Improvement</p>
              <p className="text-sm text-neutral-500 mt-2">After 8-week clinical trial</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-8 border border-rose-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-5xl font-bold text-rose-600 mb-3">28%</div>
              <p className="text-neutral-800 font-medium">Average Density Increase</p>
              <p className="text-sm text-neutral-500 mt-2">Measured via trichoscopic analysis</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-8 border border-rose-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-5xl font-bold text-rose-600 mb-3">62%</div>
              <p className="text-neutral-800 font-medium">Reduction in Hair Shedding</p>
              <p className="text-sm text-neutral-500 mt-2">Average across all participants</p>
            </div>
          </div>
        </div>

        {/* Research Credentials - Enhanced with floating card design */}
        <div className="mb-16 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h3 className="heading-md mb-4 md:mb-0">Research & Credentials</h3>
            <Link 
              to="/files/care-atin-research-summary.pdf" 
              className="flex items-center bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors text-sm font-medium py-2 px-4 rounded-full shadow-sm"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Research Summary
            </Link>
          </div>

          <div className="space-y-6">
            {researchData.map((item, index) => (
              <div 
                key={index} 
                className="border border-neutral-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <button 
                  onClick={() => toggleExpanded(index)}
                  className={`flex justify-between items-center w-full px-6 py-5 text-left transition-colors ${
                    expanded === index 
                      ? 'bg-rose-50 hover:bg-rose-100' 
                      : 'bg-white hover:bg-neutral-50'
                  }`}
                >
                  <span className="font-medium text-neutral-800 text-lg">{item.title}</span>
                  {expanded === index ? 
                    <ChevronUp className="w-5 h-5 text-rose-500" /> : 
                    <ChevronDown className="w-5 h-5 text-neutral-500" />
                  }
                </button>
                
                {expanded === index && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 py-5 bg-white border-t border-neutral-200"
                  >
                    <p className="text-feature text-neutral-700 mb-4">{item.content}</p>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                      <p className="text-blue-700">
                        <strong>In simple terms:</strong> {item.laymansTerms}
                      </p>
                    </div>
                    <p className="text-sm text-neutral-500 flex items-center">
                      <ExternalLink className="w-4 h-4 mr-2 flex-shrink-0" />
                      Source: {item.studyRef}
                    </p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Research Institutions - Enhanced with hover effects and better shadows */}
        <div className="max-w-4xl mx-auto">
          <h3 className="heading-md mb-8 text-center">Developed in Collaboration With</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-rose-100 shadow-md flex items-center justify-center h-28 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <img src="/images/credentials/research-institute-1.png" alt="Institute of Dermatology" className="max-h-16" />
            </div>
            <div className="bg-white p-6 rounded-xl border border-rose-100 shadow-md flex items-center justify-center h-28 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <img src="/images/credentials/research-institute-2.png" alt="Center for Light Therapy" className="max-h-16" />
            </div>
            <div className="bg-white p-6 rounded-xl border border-rose-100 shadow-md flex items-center justify-center h-28 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <img src="/images/credentials/research-institute-3.png" alt="Hair Science Foundation" className="max-h-16" />
            </div>
            <div className="bg-white p-6 rounded-xl border border-rose-100 shadow-md flex items-center justify-center h-28 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <img src="/images/credentials/research-institute-4.png" alt="Cellular Biology Lab" className="max-h-16" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 