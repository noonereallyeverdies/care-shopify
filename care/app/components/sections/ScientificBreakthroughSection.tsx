import React from 'react';

export function ScientificBreakthroughSection() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-neutral-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1 bg-rose-50 rounded-full text-rose-700 text-sm font-medium mb-4">
            Scientific Breakthrough
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-neutral-800 mb-6">
            Understanding Hair Thinning & The Care•atin Solution
          </h2>
          <p className="text-lg text-neutral-600">
            Our research-backed approach addresses the root causes of hair thinning at the cellular level.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-400 via-rose-500 to-amber-500"></div>
            
            <div className="grid md:grid-cols-12 gap-0">
              {/* Problem visualization - 5 columns */}
              <div className="md:col-span-5 bg-gradient-to-br from-neutral-800 to-neutral-900 text-white p-8">
                <h3 className="font-medium text-xl mb-6 flex items-center">
                  <span className="inline-block w-6 h-6 rounded-full bg-neutral-700 flex items-center justify-center text-sm mr-2">1</span>
                  The Challenge
                </h3>
                
                <div className="relative aspect-square bg-neutral-800 rounded-lg mb-6 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-600">
                    <img 
                      src="/images/before-after/before-after-1-before.png" 
                      alt="Hair thinning visualization" 
                      className="w-full h-full object-cover opacity-60"
                    />
                  </div>
                  
                  {/* Technical overlay */}
                  <div className="absolute inset-0 p-4">
                    <div className="absolute top-4 left-4 flex items-center">
                      <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                      <span className="text-xs text-white bg-neutral-900/70 px-2 py-1 rounded">Diminished blood flow</span>
                    </div>
                    
                    <div className="absolute bottom-4 right-4 flex items-center">
                      <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                      <span className="text-xs text-white bg-neutral-900/70 px-2 py-1 rounded">Reduced cellular energy</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <p className="text-neutral-300 text-sm">
                    Hair follicles gradually lose vitality due to decreased cellular metabolism, reduced circulation, and hormonal factors.
                  </p>
                  
                  <div className="pt-4 grid grid-cols-2 gap-3">
                    <div className="bg-neutral-800 rounded p-3">
                      <div className="text-2xl text-red-400 font-light">-67%</div>
                      <div className="text-xs text-neutral-400">Cellular activity</div>
                    </div>
                    <div className="bg-neutral-800 rounded p-3">
                      <div className="text-2xl text-red-400 font-light">+85%</div>
                      <div className="text-xs text-neutral-400">DHT sensitivity</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Middle connector - 2 columns */}
              <div className="md:col-span-2 bg-gradient-to-b from-neutral-900 to-neutral-100 flex flex-col items-center justify-center p-4">
                <div className="h-16 w-px bg-gradient-to-b from-neutral-600 to-rose-400"></div>
                <div className="my-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-rose-500">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="h-16 w-px bg-gradient-to-b from-rose-400 to-neutral-300"></div>
              </div>
              
              {/* Solution visualization - 5 columns */}
              <div className="md:col-span-5 p-8">
                <h3 className="font-medium text-xl mb-6 text-neutral-800 flex items-center">
                  <span className="inline-block w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 text-sm mr-2">2</span>
                  The Solution
                </h3>
                
                <div className="relative aspect-square bg-rose-50 rounded-lg mb-6 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src="/images/before-after/before-after-1-after.png" 
                      alt="Photonique technology results" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Technical overlay */}
                  <div className="absolute inset-0 p-4">
                    <div className="absolute top-4 right-4 flex items-center">
                      <span className="text-xs bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-rose-600">Enhanced circulation</span>
                      <div className="w-2 h-2 rounded-full bg-rose-500 ml-2"></div>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 flex items-center">
                      <span className="text-xs bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-rose-600">ATP production</span>
                      <div className="w-2 h-2 rounded-full bg-rose-500 ml-2"></div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <p className="text-neutral-700 text-sm">
                    Our photonique touch™ technology delivers precisely calibrated wavelengths that penetrate to the follicle level, reactivating cellular function and natural growth cycles.
                  </p>
                  
                  <div className="pt-4 grid grid-cols-2 gap-3">
                    <div className="bg-rose-50 rounded p-3">
                      <div className="text-2xl text-rose-600 font-light">+150%</div>
                      <div className="text-xs text-neutral-600">Cellular regeneration</div>
                    </div>
                    <div className="bg-rose-50 rounded p-3">
                      <div className="text-2xl text-rose-600 font-light">95%</div>
                      <div className="text-xs text-neutral-600">Satisfaction rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom statistical section */}
            <div className="bg-neutral-50 border-t border-neutral-100 grid grid-cols-3 divide-x divide-neutral-200">
              <div className="p-6 text-center">
                <div className="text-3xl font-light text-rose-600">650nm</div>
                <div className="text-sm text-neutral-600 mt-1">Optimal wavelength</div>
              </div>
              <div className="p-6 text-center">
                <div className="text-3xl font-light text-rose-600">12 min</div>
                <div className="text-sm text-neutral-600 mt-1">Treatment time</div>
              </div>
              <div className="p-6 text-center">
                <div className="text-3xl font-light text-rose-600">93%</div>
                <div className="text-sm text-neutral-600 mt-1">Clinical efficacy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
