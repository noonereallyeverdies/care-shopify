import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from '@remix-run/react';
import { Card, CardHeader, CardContent, CardFooter } from '~/components/ui/Card';

export function InteractiveScienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showDetails, setShowDetails] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  return (
    <section ref={sectionRef} className="py-24 bg-neutral-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="brand-heading text-3xl lg:text-4xl mb-6">
            the science of light therapy
          </h2>
          <p className="brand-body text-neutral-600">
            Our revolutionary approach uses precisely calibrated red light (630-660nm) 
            to stimulate cellular energy production and reawaken dormant hair follicles.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card variant="elevated" padding="lg" hoverable>
            <div className="mb-6 h-48 bg-neutral-100 relative overflow-hidden">
              {/* Follicle model visualization */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="relative">
                  <svg viewBox="0 0 100 200" width="100" height="200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Simplified follicle shape */}
                    <path 
                      d="M30,20 Q50,0 70,20 L70,150 Q50,180 30,150 Z" 
                      fill="#FEE2E2" 
                      strokeWidth="2"
                      stroke="#E5E7EB"
                    />
                    {/* Hair shaft */}
                    <path 
                      d="M50,20 L50,0" 
                      stroke="#4B5563" 
                      strokeWidth="3"
                    />
                    {/* Animation effect */}
                    <circle 
                      cx="50" 
                      cy="130" 
                      r="15"
                      fill="#FECDD3"
                      opacity="0.7"
                      className="animate-pulse"
                    />
                  </svg>
                  
                  {/* Red light rays */}
                  <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-40 h-40">
                    <div className="w-full h-full rounded-full bg-rose-500/20 animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              {/* Film grain overlay for visual consistency */}
              <div className="absolute inset-0 bg-[url('/textures/film-grain.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            </div>
            <h3 className="brand-heading text-2xl mb-4">follicle reactivation</h3>
            <p className="brand-body text-neutral-600">
              Light energy penetrates to the exact cellular depth needed to reactivate 
              mitochondrial function in dormant follicles.
            </p>
          </Card>
          
          <Card variant="elevated" padding="lg" hoverable>
            <div className="mb-6 h-48 bg-neutral-100 relative overflow-hidden">
              {/* ATP visualization */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="relative">
                  <svg viewBox="0 0 160 160" width="140" height="140" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* ATP molecule simplified representation */}
                    <circle cx="80" cy="80" r="50" fill="white" stroke="#E5E7EB" strokeWidth="2" />
                    <circle cx="80" cy="80" r="40" fill="#FEE2E2" />
                    <circle cx="80" cy="80" r="25" fill="#FECDD3" className="animate-pulse" />
                    
                    {/* Electron chains */}
                    <circle cx="80" cy="40" r="8" fill="#F87171" />
                    <circle cx="115" cy="80" r="8" fill="#F87171" />
                    <circle cx="80" cy="120" r="8" fill="#F87171" />
                    <circle cx="45" cy="80" r="8" fill="#F87171" />
                    
                    <line x1="80" y1="48" x2="80" y2="72" stroke="#F87171" strokeWidth="2" />
                    <line x1="107" y1="80" x2="88" y2="80" stroke="#F87171" strokeWidth="2" />
                    <line x1="80" y1="112" x2="80" y2="88" stroke="#F87171" strokeWidth="2" />
                    <line x1="53" y1="80" x2="72" y2="80" stroke="#F87171" strokeWidth="2" />
                    
                    <text x="75" y="85" fill="#F87171" fontSize="12" fontWeight="bold">ATP</text>
                  </svg>
                </div>
              </div>
              
              {/* Film grain overlay */}
              <div className="absolute inset-0 bg-[url('/textures/film-grain.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            </div>
            <h3 className="brand-heading text-2xl mb-4">atp production</h3>
            <p className="brand-body text-neutral-600">
              Cellular energy (ATP) increases by up to 200%, providing the resources 
              needed for healthy hair growth.
            </p>
          </Card>
          
          <Card variant="elevated" padding="lg" hoverable>
            <div className="mb-6 h-48 bg-neutral-100 relative overflow-hidden">
              {/* Growth cycle visualization */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="relative">
                  <svg viewBox="0 0 200 150" width="180" height="140" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Timeline arrow */}
                    <path d="M20,75 L180,75" stroke="#D1D5DB" strokeWidth="2" />
                    <path d="M180,75 L170,70 L170,80 Z" fill="#D1D5DB" />
                    
                    {/* Cycle phases */}
                    <circle cx="40" cy="75" r="10" fill="#FECDD3" stroke="#F87171" strokeWidth="2" />
                    <text x="40" y="55" fill="#374151" fontSize="12" textAnchor="middle">Anagen</text>
                    <text x="40" y="105" fill="#6B7280" fontSize="10" textAnchor="middle">Growth</text>
                    
                    <circle cx="100" cy="75" r="8" fill="#FEE2E2" stroke="#F87171" strokeWidth="1" />
                    <text x="100" y="55" fill="#374151" fontSize="12" textAnchor="middle">Catagen</text>
                    <text x="100" y="105" fill="#6B7280" fontSize="10" textAnchor="middle">Transition</text>
                    
                    <circle cx="160" cy="75" r="8" fill="#FEE2E2" stroke="#F87171" strokeWidth="1" />
                    <text x="160" y="55" fill="#374151" fontSize="12" textAnchor="middle">Telogen</text>
                    <text x="160" y="105" fill="#6B7280" fontSize="10" textAnchor="middle">Resting</text>
                    
                    {/* Extension indicator */}
                    <path d="M50,75 L150,75" stroke="#F87171" strokeWidth="4" strokeDasharray="4 2" className="animate-pulse" />
                  </svg>
                </div>
              </div>
              
              {/* Film grain overlay */}
              <div className="absolute inset-0 bg-[url('/textures/film-grain.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
            </div>
            <h3 className="brand-heading text-2xl mb-4">growth cycle restoration</h3>
            <p className="brand-body text-neutral-600">
              Hair follicles return to a healthy growth cycle, extending the anagen phase 
              for thicker, stronger hair.
            </p>
          </Card>
        </div>
        
        {/* Scientific details toggle */}
        <div className="mt-16 text-center">
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="font-medium text-rose-500 hover:text-rose-600 underline underline-offset-4"
          >
            {showDetails ? 'Hide scientific details' : 'Explore the science deeper'}
          </button>
        </div>
        
        {/* Scientific details panel */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-12 overflow-hidden"
            >
              <div className="bg-white rounded-lg shadow-md p-8 border border-neutral-100">
                <h3 className="brand-heading text-2xl mb-6">The Science Behind Care•atin</h3>
                
                <div className="space-y-8">
                  {/* Cellular Energy Production */}
                  <div>
                    <h4 className="text-lg font-medium text-neutral-800 mb-2">Cellular Energy Production</h4>
                    <p className="text-neutral-600 mb-4">
                      Red light (630-660nm) is absorbed by cytochrome c oxidase in mitochondria, 
                      boosting ATP synthesis by <strong className="text-rose-600">37-54%</strong>. 
                      This provides the energy needed for protein synthesis and extending the 
                      anagen (growth) phase of the hair cycle.
                    </p>
                    <div className="bg-neutral-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-neutral-600">ATP Production Increase</span>
                        <span className="text-sm font-medium">54%</span>
                      </div>
                      <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-500 rounded-full" style={{width: '54%'}}></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Optimal Penetration Depth */}
                  <div>
                    <h4 className="text-lg font-medium text-neutral-800 mb-2">Optimal Penetration Depth</h4>
                    <p className="text-neutral-600 mb-4">
                      Our specific wavelengths reach <strong className="text-rose-600">3-5mm below the scalp</strong>, 
                      directly targeting follicle cells without harmful heat, unlike infrared or UV light therapies.
                      This precise depth is critical for activating dormant follicles.
                    </p>
                    <div className="bg-neutral-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-neutral-600">Light Penetration Depth</span>
                        <span className="text-sm font-medium">3-5mm</span>
                      </div>
                      <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-500 rounded-full" style={{width: '70%'}}></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Clinical Results */}
                  <div>
                    <h4 className="text-lg font-medium text-neutral-800 mb-2">Verified Clinical Results</h4>
                    <p className="text-neutral-600 mb-4">
                      Double-blind studies show significant improvement across multiple metrics: 
                      <strong className="text-rose-600"> 28% increase in hair count</strong>, 
                      <strong className="text-rose-600"> 32% improvement in thickness</strong>, and 
                      <strong className="text-rose-600"> 62% reduction in daily shedding</strong>.
                    </p>
                    <div className="bg-neutral-50 p-4 rounded-lg">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-neutral-600">Hair Count</span>
                            <span className="text-sm font-medium">+28%</span>
                          </div>
                          <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                            <div className="h-full bg-rose-500 rounded-full" style={{width: '28%'}}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-neutral-600">Thickness</span>
                            <span className="text-sm font-medium">+32%</span>
                          </div>
                          <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                            <div className="h-full bg-rose-500 rounded-full" style={{width: '32%'}}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-neutral-600">Less Shedding</span>
                            <span className="text-sm font-medium">-62%</span>
                          </div>
                          <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                            <div className="h-full bg-rose-500 rounded-full" style={{width: '62%'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <Link 
                    to="/pages/science" 
                    className="inline-flex items-center bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-full font-medium shadow-md transition-all hover:-translate-y-0.5"
                  >
                    explore the full research
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Subtle wavelength visualization background */}
      <div className="absolute inset-x-0 bottom-0 h-32 opacity-20 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-r from-rose-500/10 via-transparent to-rose-500/10"></div>
      </div>
    </section>
  );
}
