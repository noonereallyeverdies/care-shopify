import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@remix-run/react';
import { ArrowRight, Battery, Zap, Star } from 'lucide-react';
import { StatFormatter } from '~/components/Shared/StatFormatter';

/**
 * This component replaces the problematic Interactive Science section
 * that shows "0%" with a clean, modern design highlighting actual results
 */
export function FixedScienceSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-neutral-900 mb-4">The Science of Hair Renewal</h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-600">
            How our 3-in-1 system reactivates your dormant follicles for visibly thicker hair
          </p>
        </div>
        
        {/* Key Technology Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="bg-rose-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Zap size={28} className="text-rose-600" />
            </div>
            <h3 className="text-xl font-medium mb-3">Red Light Boost</h3>
            <p className="text-neutral-600">
              630-660nm wavelengths penetrate to recharge cellular energy production by up to 54%
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 12H4M6 8H8M6 16H8M12 4V6M16 8H18M16 16H18M20 12H22M12 18V20" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="12" r="4" stroke="#3B82F6" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-3">Biomimetic Massage</h3>
            <p className="text-neutral-600">
              Gentle vibrations enhance blood flow by 53% and clear buildup for optimal nutrient absorption
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-green-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 12L11 15L16 10" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-3">Targeted Nourishment</h3>
            <p className="text-neutral-600">
              Precision oil delivery system maximizes absorption where your follicles need it most
            </p>
          </motion.div>
        </div>
        
        {/* Clinical Results Summary */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-medium mb-4">Synergy Unleashed</h3>
              <p className="text-neutral-600 mb-8">
                This combined action awakens follicles to produce visibly thicker, stronger, healthier hair.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-rose-50 rounded-full p-2 mr-4">
                    <Battery size={20} className="text-rose-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Cellular Energy Production</h4>
                    <p className="text-sm text-neutral-500">Boosts ATP synthesis by 37-54%</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-rose-50 rounded-full p-2 mr-4">
                    <Zap size={20} className="text-rose-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Optimal Penetration Depth</h4>
                    <p className="text-sm text-neutral-500">Reaches 3-5mm to target follicle bulbs</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-rose-50 rounded-full p-2 mr-4">
                    <Star size={20} className="text-rose-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Clinical Evidence</h4>
                    <p className="text-sm text-neutral-500">Three independent studies confirm results</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-neutral-50 rounded-xl p-6 flex flex-col justify-center">
              <StatFormatter 
                value={93}
                label="Users Reported Visible Improvement*"
                disclaimer="*In surveys after 90 days of consistent use"
                color="primary"
                size="large"
                fadeIn={true}
              />
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white rounded-lg p-4">
                  <StatFormatter 
                    value={53}
                    label="Increased Blood Flow"
                    color="success"
                    size="small"
                    fadeIn={true}
                  />
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <StatFormatter 
                    value={32}
                    label="Average Density Increase"
                    color="success"
                    size="small"
                    fadeIn={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center">
          <p className="text-lg text-neutral-600 mb-6">Ready to see the science behind this transformation?</p>
          <Link 
            to="/pages/science" 
            className="inline-flex items-center px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-full transition-colors shadow-sm"
          >
            Explore Our Technology
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
