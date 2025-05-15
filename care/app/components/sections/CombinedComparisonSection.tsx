import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@remix-run/react';
import { ArrowRight } from 'lucide-react';

export function CombinedComparisonSection() {
  return (
    <section className="py-24 bg-neutral-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="brand-heading text-3xl lg:text-4xl mb-6">
            Hair loss doesn't just change your appearance—it changes how you feel
          </h2>
          <p className="brand-body text-neutral-600 mb-6">
            The gradual thinning, increasing visibility of your scalp, and limited styling options 
            impact your confidence in ways others might not understand.
          </p>
          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <p className="italic text-neutral-700 mb-2">
              "Every day without effective treatment means more follicles at risk of permanent miniaturization. 
              The emotional toll of watching your hair thin compounds over time."
            </p>
            <p className="text-sm font-medium text-neutral-500">Dr. Karen Hansen, Trichologist</p>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="brand-heading text-3xl lg:text-4xl mb-6">
            why care<span className="brand-dot">•</span>atin is different
          </h2>
          <p className="brand-body text-neutral-600">
            Most hair loss treatments only mask symptoms. Care•atin targets the root cause.
          </p>
        </div>
        
        {/* Main comparison grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
          {/* Left column: Traditional Solutions */}
          <div>
            <motion.h3 
              className="brand-heading text-2xl mb-8 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              traditional solutions fall short
            </motion.h3>
            
            <div className="space-y-6">
              <motion.div 
                className="bg-white rounded-lg shadow-sm p-6 border border-neutral-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h4 className="brand-heading text-xl mb-3">topical chemicals</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-neutral-400 mr-2">•</span>
                    <span className="text-neutral-600">Only affect surface layers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-neutral-400 mr-2">•</span>
                    <span className="text-neutral-600">Potential scalp irritation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-neutral-400 mr-2">•</span>
                    <span className="text-neutral-600">Benefits stop when discontinued</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-lg shadow-sm p-6 border border-neutral-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h4 className="brand-heading text-xl mb-3">hormonal medications</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-neutral-400 mr-2">•</span>
                    <span className="text-neutral-600">Potential sexual side effects</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-neutral-400 mr-2">•</span>
                    <span className="text-neutral-600">Can take 12+ months to see results</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-neutral-400 mr-2">•</span>
                    <span className="text-neutral-600">Hair loss resumes if discontinued</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-lg shadow-sm p-6 border border-neutral-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h4 className="brand-heading text-xl mb-3">cosmetic concealers</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-neutral-400 mr-2">•</span>
                    <span className="text-neutral-600">Only mask appearance, not solution</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-neutral-400 mr-2">•</span>
                    <span className="text-neutral-600">Can clog follicles, worsening problem</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-neutral-400 mr-2">•</span>
                    <span className="text-neutral-600">Require daily reapplication</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
          
          {/* Right column: Care•atin Solution */}
          <div>
            <motion.h3 
              className="brand-heading text-2xl mb-8 text-center lg:text-left text-rose-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              care<span className="brand-dot">•</span>atin's triple-action science
            </motion.h3>
            
            <div className="space-y-6">
              <motion.div 
                className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-rose-500 border-t border-r border-b"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h4 className="brand-heading text-xl mb-3 text-rose-600">red light therapy</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-rose-500 mr-2">•</span>
                    <span className="text-neutral-700">Reaches deep to the follicle roots (3-5mm) where topical treatments can't reach</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-500 mr-2">•</span>
                    <span className="text-neutral-700">Energizes hair follicles by 54%, giving you the thick, healthy hair you remember</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-500 mr-2">•</span>
                    <span className="text-neutral-700">Non-invasive, zero side effects—unlike medications that can impact your health</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-rose-500 border-t border-r border-b"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h4 className="brand-heading text-xl mb-3 text-rose-600">targeted massage</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-rose-500 mr-2">•</span>
                    <span className="text-neutral-700">Boosts scalp circulation by 53%, creating the ideal environment for hair growth</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-500 mr-2">•</span>
                    <span className="text-neutral-700">Delivers essential nutrients directly to your follicles for maximum nourishment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-500 mr-2">•</span>
                    <span className="text-neutral-700">Removes buildup and excess oil that can suffocate follicles and stunt growth</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-rose-500 border-t border-r border-b"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h4 className="brand-heading text-xl mb-3 text-rose-600">clinically validated</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-rose-500 mr-2">•</span>
                    <span className="text-neutral-700">76% more hair density means no more visible scalp and renewed styling confidence</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-500 mr-2">•</span>
                    <span className="text-neutral-700">See visible transformation starting in just 90 days—not years like other solutions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-500 mr-2">•</span>
                    <span className="text-neutral-700">93% of users report feeling more confident and satisfied with their hair</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Expert Quote Section - Adds credibility */}
        <div className="bg-white rounded-lg shadow-md p-8 border border-neutral-100 max-w-3xl mx-auto mb-16">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-neutral-100 flex-shrink-0 overflow-hidden">
              <img 
                src="/images/expert.jpg" 
                alt="Dr. Karen Hansen" 
                className="w-full h-full object-cover"
                // onError={(e) => {
                //   e.currentTarget.src = '/images/placeholder-expert.jpg';
                // }}
              />
            </div>
            <div>
              <blockquote className="text-neutral-700 italic mb-4">
                "The most effective hair loss treatments address the follicle at the cellular level. 
                Red light therapy is one of the few non-invasive methods clinically proven to reactivate dormant follicles 
                and restore natural growth cycles."
              </blockquote>
              <p className="font-medium">Dr. Karen Hansen</p>
              <p className="text-sm text-neutral-500">Trichologist, Hair Research Institute</p>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="text-center">
          <div className="text-center mb-3">
            <span className="text-sm text-rose-600 font-medium inline-flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-rose-500 mr-2 animate-pulse"></span>
              Limited units available at current pricing
            </span>
          </div>
          <Link 
            to="/products/photonique-touch"
            className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-full font-medium shadow-lg transition-all hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
          >
            Start Your Transformation Today
            <ArrowRight size={18} className="ml-1" />
          </Link>
        </div>
      </div>
      
      {/* Abstract background elements */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-rose-100 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-rose-100 rounded-full opacity-30 blur-3xl"></div>
    </section>
  );
}
