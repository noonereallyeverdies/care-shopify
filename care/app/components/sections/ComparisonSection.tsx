import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@remix-run/react';

export function ComparisonSection() {
  return (
    <section className="py-24 bg-neutral-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.h2 
            className="brand-heading text-3xl lg:text-4xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            why most hair loss solutions fail
          </motion.h2>
          <p className="brand-body text-neutral-600">
            Most products only mask symptoms. True transformation starts deeper.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Card 1: Chemicals */}
          <motion.div 
            className="bg-white rounded-lg shadow-sm p-6 border border-neutral-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="brand-heading text-xl mb-4">
              chemicals: surface-level fixes
            </h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-rose-500 mr-2">•</span>
                <span className="text-neutral-600">Harsh chemicals, potential damage.</span>
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 mr-2">•</span>
                <span className="text-neutral-600">Only masks symptoms.</span>
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 mr-2">•</span>
                <span className="text-neutral-600">Results fade quickly.</span>
              </li>
            </ul>
            <div className="h-1 w-16 bg-neutral-200 rounded-full"></div>
          </motion.div>
          
          {/* Card 2: Drugs */}
          <motion.div 
            className="bg-white rounded-lg shadow-sm p-6 border border-neutral-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="brand-heading text-xl mb-4">
              drugs: potential trade-offs
            </h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-rose-500 mr-2">•</span>
                <span className="text-neutral-600">Hormonal side effects risk.</span>
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 mr-2">•</span>
                <span className="text-neutral-600">Long wait for results.</span>
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 mr-2">•</span>
                <span className="text-neutral-600">Benefits reverse if stopped.</span>
              </li>
            </ul>
            <div className="h-1 w-16 bg-neutral-200 rounded-full"></div>
          </motion.div>
          
          {/* Card 3: Cosmetics */}
          <motion.div 
            className="bg-white rounded-lg shadow-sm p-6 border border-neutral-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="brand-heading text-xl mb-4">
              cosmetics: temporary illusions
            </h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-rose-500 mr-2">•</span>
                <span className="text-neutral-600">Only conceals, no growth.</span>
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 mr-2">•</span>
                <span className="text-neutral-600">Can clog follicles.</span>
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 mr-2">•</span>
                <span className="text-neutral-600">Needs constant upkeep.</span>
              </li>
            </ul>
            <div className="h-1 w-16 bg-neutral-200 rounded-full"></div>
          </motion.div>
        </div>
        
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.h2 
            className="brand-heading text-3xl lg:text-4xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            how care<span className="brand-dot">•</span>atin works differently
          </motion.h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Triple-Action Synergy */}
          <motion.div 
            className="bg-white rounded-lg shadow-sm p-6 border border-neutral-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="brand-heading text-xl mb-4 text-rose-500">
              triple-action synergy
            </h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-rose-500 mr-2">•</span>
                <span className="text-neutral-600">Red Light + Massage + Oil Delivery.</span>
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 mr-2">•</span>
                <span className="text-neutral-600">Revitalizes follicles at the source.</span>
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 mr-2">•</span>
                <span className="text-neutral-600">Treats root causes.</span>
              </li>
            </ul>
            <div className="h-1 w-16 bg-rose-200 rounded-full"></div>
          </motion.div>
          
          {/* Card 2: Science-Backed & Gentle */}
          <motion.div 
            className="bg-white rounded-lg shadow-sm p-6 border border-neutral-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="brand-heading text-xl mb-4 text-rose-500">
              science-backed & gentle
            </h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-rose-500 mr-2">•</span>
                <span className="text-neutral-600">Clinically proven efficacy.</span>
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 mr-2">•</span>
                <span className="text-neutral-600">Expert-developed, safe outcomes.</span>
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 mr-2">•</span>
                <span className="text-neutral-600">Non-invasive, drug-free.</span>
              </li>
            </ul>
            <div className="h-1 w-16 bg-rose-200 rounded-full"></div>
          </motion.div>
          
          {/* Card 3: Sustainable, Long-Term Health */}
          <motion.div 
            className="bg-white rounded-lg shadow-sm p-6 border border-neutral-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="brand-heading text-xl mb-4 text-rose-500">
              sustainable, long-term health
            </h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-rose-500 mr-2">•</span>
                <span className="text-neutral-600">Builds lasting improvements.</span>
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 mr-2">•</span>
                <span className="text-neutral-600">Results amplify with use.</span>
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 mr-2">•</span>
                <span className="text-neutral-600">93% see visible improvement.</span>
              </li>
            </ul>
            <div className="h-1 w-16 bg-rose-200 rounded-full"></div>
          </motion.div>
        </div>
        
        <div className="mt-16 text-center">
          <Link 
            to="/products/photonique-touch"
            className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-full font-medium shadow-lg transition-all inline-flex items-center"
          >
            Get Care•atin Now
          </Link>
        </div>
      </div>
      
      {/* Abstract background element */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-rose-100 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-rose-100 rounded-full opacity-30 blur-3xl"></div>
    </section>
  );
}
