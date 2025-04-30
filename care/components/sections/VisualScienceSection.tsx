import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Waves, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

export function VisualScienceSection() {
  const [activeTab, setActiveTab] = useState('redLight');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <section className="solution-section section-padding">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="brand-heading text-3xl md:text-4xl mb-3">
            triple-action <span className="text-rose-600">technology</span>
          </h2>
          <p className="brand-body">
            care<span className="brand-dot">•</span>atin's revolutionary 3-in-1 system combines red light therapy,
            therapeutic scalp massage, and precision oil application to deliver transformative
            results that no single-approach product can match.
          </p>
        </div>

        {/* Technology tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            className={`px-6 py-3 rounded-full transition-all text-base font-medium ${
              activeTab === 'redLight'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-white shadow-sm text-neutral-700 hover:bg-neutral-50'
            }`}
            onClick={() => setActiveTab('redLight')}
          >
            <Zap size={16} className="inline-block mr-2" />
            Red Light Therapy
          </button>
          
          <button
            className={`px-6 py-3 rounded-full transition-all text-base font-medium ${
              activeTab === 'massage'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-white shadow-sm text-neutral-700 hover:bg-neutral-50'
            }`}
            onClick={() => setActiveTab('massage')}
          >
            <Waves size={16} className="inline-block mr-2" />
            Therapeutic Scalp Massage
          </button>
          
          <button
            className={`px-6 py-3 rounded-full transition-all text-base font-medium ${
              activeTab === 'oil'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-white shadow-sm text-neutral-700 hover:bg-neutral-50'
            }`}
            onClick={() => setActiveTab('oil')}
          >
            <ArrowRight size={16} className="inline-block mr-2" />
            Precision Oil Application
          </button>
        </div>

        {/* Technology content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left column - Visual */}
          <div className="lg:col-span-5">
            <div className="relative aspect-square bg-white rounded-2xl shadow-md overflow-hidden border border-neutral-100">
              {activeTab === 'redLight' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-64 h-64 rounded-full bg-rose-50 flex items-center justify-center">
                      <motion.div 
                        className="w-48 h-48 rounded-full bg-gradient-to-r from-rose-400 to-rose-600"
                        animate={{ 
                          boxShadow: ['0 0 0 0 rgba(225, 29, 72, 0.2)', '0 0 0 20px rgba(225, 29, 72, 0)'],
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatType: 'loop',
                        }}
                      >
                        <div className="w-full h-full flex items-center justify-center text-white font-medium flex-col">
                          <div className="text-xs uppercase tracking-wider mb-1">Wavelength</div>
                          <div className="text-xl font-bold">630-660nm</div>
                        </div>
                      </motion.div>
                    </div>

                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-12 mt-4">
                      <div className="text-center">
                        <div className="w-4 h-4 bg-rose-500 rounded-full mx-auto mb-1"></div>
                        <div className="text-xs text-neutral-600">630nm</div>
                      </div>
                      <div className="text-center">
                        <div className="w-4 h-4 bg-rose-600 rounded-full mx-auto mb-1"></div>
                        <div className="text-xs text-neutral-600">660nm</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'massage' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-72 h-72">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <motion.circle 
                        cx="50" cy="50" r="20" 
                        fill="none" 
                        stroke="#f43f5e" 
                        strokeWidth="1"
                        strokeDasharray="5,5"
                        animate={{ 
                          r: [20, 30, 20], 
                          opacity: [0.5, 1, 0.5] 
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          repeatType: 'loop'
                        }}
                      />
                      <motion.path 
                        d="M 20,40 Q 50,10 80,40 T 80,60 Q 50,90 20,60 Z" 
                        fill="none" 
                        stroke="#f43f5e" 
                        strokeWidth="1.5"
                        animate={{ 
                          d: [
                            "M 20,40 Q 50,10 80,40 T 80,60 Q 50,90 20,60 Z",
                            "M 20,45 Q 50,15 80,45 T 80,65 Q 50,95 20,65 Z",
                            "M 20,40 Q 50,10 80,40 T 80,60 Q 50,90 20,60 Z"
                          ]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity,
                          repeatType: 'loop'
                        }}
                      />
                      <circle cx="50" cy="50" r="10" fill="#f43f5e" />
                    </svg>
                  </div>
                </div>
              )}

              {activeTab === 'oil' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-64 h-64 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <defs>
                        <linearGradient id="oilGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#fce7f3" />
                          <stop offset="100%" stopColor="#f43f5e" />
                        </linearGradient>
                      </defs>
                      <rect x="35" y="20" width="30" height="60" rx="5" fill="white" stroke="#d1d5db" />
                      <motion.rect 
                        x="35" y="50" width="30" height="30" 
                        fill="url(#oilGradient)"
                        animate={{ y: [50, 45, 50], opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 3, repeat: Infinity, repeatType: 'loop' }}
                      />
                      <motion.circle 
                        cx="50" cy="40" r="2" 
                        fill="#f43f5e"
                        animate={{ cy: [35, 45] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
                      />
                      <motion.circle 
                        cx="45" cy="35" r="1.5" 
                        fill="#f43f5e"
                        animate={{ cy: [30, 40] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', delay: 0.5 }}
                      />
                      <motion.circle 
                        cx="55" cy="38" r="1.5" 
                        fill="#f43f5e"
                        animate={{ cy: [33, 43] }}
                        transition={{ duration: 1.8, repeat: Infinity, repeatType: 'reverse', delay: 0.2 }}
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right column - Content */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-neutral-100 h-full">
              <div className="p-8">
                <div className="mb-6">
                  <h3 className="text-xl md:text-2xl font-medium text-rose-600 mb-2 flex items-center">
                    {activeTab === 'redLight' && <Zap size={20} className="mr-2" />}
                    {activeTab === 'massage' && <Waves size={20} className="mr-2" />}
                    {activeTab === 'oil' && <ArrowRight size={20} className="mr-2" />}
                    
                    {activeTab === 'redLight' && 'Red Light Therapy'}
                    {activeTab === 'massage' && 'Therapeutic Scalp Massage'}
                    {activeTab === 'oil' && 'Precision Oil Application'}
                  </h3>
                  
                  <p className="text-neutral-700 mb-6">
                    {activeTab === 'redLight' && 'Clinically proven wavelengths (630-660nm) penetrate the scalp to energize cells, stimulate circulation, and reduce inflammation.'}
                    {activeTab === 'massage' && 'Gentle vibration stimulates follicles and increases blood flow to the scalp, delivering more nutrients to hair follicles.'}
                    {activeTab === 'oil' && 'Targeted delivery system allows active ingredients to reach precisely where they're needed, maximizing effectiveness.'}
                  </p>
                  
                  <div className="border-t border-neutral-100 pt-6">
                    <h4 className="text-sm uppercase tracking-wider text-neutral-500 mb-4">Key Benefits</h4>
                    
                    <ul className="space-y-3">
                      {activeTab === 'redLight' && (
                        <>
                          <li className="flex items-start gap-2">
                            <div className="w-5 h-5 rounded-full bg-rose-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                              <div className="w-2 h-2 rounded-full bg-rose-600"></div>
                            </div>
                            <div className="text-neutral-700">Enhances cellular energy (ATP) production</div>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-5 h-5 rounded-full bg-rose-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                              <div className="w-2 h-2 rounded-full bg-rose-600"></div>
                            </div>
                            <div className="text-neutral-700">Stimulates dormant follicles to reactivate</div>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-5 h-5 rounded-full bg-rose-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                              <div className="w-2 h-2 rounded-full bg-rose-600"></div>
                            </div>
                            <div className="text-neutral-700">Extends the active growth phase (anagen) of hair</div>
                          </li>
                        </>
                      )}
                      
                      {activeTab === 'massage' && (
                        <>
                          <li className="flex items-start gap-2">
                            <div className="w-5 h-5 rounded-full bg-rose-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                              <div className="w-2 h-2 rounded-full bg-rose-600"></div>
                            </div>
                            <div className="text-neutral-700">Improves blood circulation to the scalp</div>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-5 h-5 rounded-full bg-rose-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                              <div className="w-2 h-2 rounded-full bg-rose-600"></div>
                            </div>
                            <div className="text-neutral-700">Reduces stress that can contribute to hair loss</div>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-5 h-5 rounded-full bg-rose-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                              <div className="w-2 h-2 rounded-full bg-rose-600"></div>
                            </div>
                            <div className="text-neutral-700">Removes buildup of sebum and product residue</div>
                          </li>
                        </>
                      )}
                      
                      {activeTab === 'oil' && (
                        <>
                          <li className="flex items-start gap-2">
                            <div className="w-5 h-5 rounded-full bg-rose-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                              <div className="w-2 h-2 rounded-full bg-rose-600"></div>
                            </div>
                            <div className="text-neutral-700">Optimizes absorption of active ingredients</div>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-5 h-5 rounded-full bg-rose-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                              <div className="w-2 h-2 rounded-full bg-rose-600"></div>
                            </div>
                            <div className="text-neutral-700">Provides essential nutrients directly to follicles</div>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-5 h-5 rounded-full bg-rose-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                              <div className="w-2 h-2 rounded-full bg-rose-600"></div>
                            </div>
                            <div className="text-neutral-700">Creates ideal environment for cellular regeneration</div>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
                
                {/* Technical details - expandable section */}
                <div className="mt-6 pt-6 border-t border-neutral-100">
                  <button 
                    className="w-full flex items-center justify-between text-left"
                    onClick={() => toggleSection('science')}
                  >
                    <div className="text-sm font-medium text-neutral-800">The Science</div>
                    {expandedSection === 'science' ? (
                      <ChevronUp size={16} className="text-neutral-400" />
                    ) : (
                      <ChevronDown size={16} className="text-neutral-400" />
                    )}
                  </button>
                  
                  {expandedSection === 'science' && (
                    <div className="mt-4 pt-4 border-t border-neutral-50 text-sm text-neutral-600">
                      {activeTab === 'redLight' && (
                        <p>
                          Our patented light array delivers precise wavelengths that have been shown in clinical studies 
                          to support increased hair count and density. Red light at 630-660nm penetrates to the 
                          mitochondria in hair follicle cells, stimulating ATP production (cellular energy) which 
                          reactivates dormant follicles and extends the growth phase of the hair cycle.
                        </p>
                      )}
                      
                      {activeTab === 'massage' && (
                        <p>
                          The therapeutic vibration operates at 150Hz, which research has shown 
                          to be optimal for increasing microcirculation without causing irritation. 
                          This improves nutrient delivery to follicles by up to 54% compared to 
                          topical application alone, while also reducing cortisol levels in the scalp.
                        </p>
                      )}
                      
                      {activeTab === 'oil' && (
                        <p>
                          Our precision delivery system is engineered with biomimetic microchannels 
                          that distribute active ingredients evenly across the scalp at the optimal 
                          rate. The system is calibrated to release 0.3ml of product per minute, 
                          ensuring maximum absorption without waste.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-6 bg-neutral-50 border-t border-neutral-100">
                <div className="text-neutral-700 text-sm">
                  <span className="font-medium">The sum is greater than its parts:</span> While each technology 
                  offers significant benefits on its own, the combination of all three creates a 
                  synergistic effect, potentially accelerating results compared to single-approach treatments.
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <a href="/pages/science" className="btn-secondary inline-flex items-center gap-2">
            Discover the Full Science
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
} 