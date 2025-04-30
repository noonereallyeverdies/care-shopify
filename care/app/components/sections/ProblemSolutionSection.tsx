import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Check, X, Clock, Sparkles, Shield } from 'lucide-react';
import { Link } from '@remix-run/react';

export function ProblemSolutionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [activeTab, setActiveTab] = useState(0);

  // Main animation variants
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1
      }
    }
  };

  // Updated data with concise shortcomings
  const problems = [
    {
      title: "Traditional Treatments: Surface-Level Fixes",
      icon: X,
      issues: [
        "Harsh chemicals, potential damage.",
        "Mask symptoms, ignore follicle health.",
        "Temporary results, fade over time.",
        "Limited, one-dimensional approach.",
      ]
    },
    {
      title: "Prescriptions: Potential Trade-offs",
      icon: X,
      issues: [
        "Risk of unwanted hormonal side effects.",
        "Long commitment before seeing results.",
        "Benefits reverse when treatment stops.",
        "Target only one specific pathway.",
      ]
    },
    {
      title: "Cosmetic Solutions: Temporary Illusions",
      icon: X,
      issues: [
        "Temporary visual concealment only.",
        "Can clog follicles, worsen health.",
        "No actual hair structure/growth improvement.",
        "Unnatural look, constant upkeep.",
      ]
    }
  ];

  // Updated solution benefits
  const solutions = [
    {
      title: "Triple-Action Synergy",
      icon: Sparkles,
      benefits: [
        "Combines Red Light + Massage + Oil Delivery.",
        "Revitalizes follicles at the cellular source.",
        "Treats root causes for hair wellness.",
        "Synergistic effects for enhanced results.",
      ]
    },
    {
      title: "Science-Backed & Gentle",
      icon: Shield,
      benefits: [
        "Clinically researched, proven efficacy.",
        "Expert-developed for safe outcomes.",
        "Precise wavelengths (650-680nm).",
        "Non-invasive, drug-free, zero side effects.",
      ]
    },
    {
      title: "Sustainable, Long-Term Health",
      icon: Clock,
      benefits: [
        "Builds lasting improvements, not temp fixes.",
        "Results amplify with consistent use.",
        "Strengthens hair structure (root to tip).",
        "Supports a healthy growth cycle.",
        "93% report visible improvement (8 weeks).",
      ]
    }
  ];

  // Tabs for the problems section
  const tabs = ["Traditional Treatments", "Prescriptions", "Cosmetic Solutions"];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-neutral-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16 md:mb-20 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-light mb-3">
            Why Old Methods Don't Deliver Lasting Results
          </h2>
          <p className="text-neutral-600 text-lg md:text-xl">
            Many treatments only address symptoms, not the root cause of hair health.
          </p>
        </motion.div>

        <div className="md:hidden mb-8">
          <div className="flex overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`px-4 py-2 whitespace-nowrap mr-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === index
                    ? 'bg-rose-500 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
                onClick={() => setActiveTab(index)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-stretch">
          <motion.div
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="problem-side"
          >
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-md border border-neutral-100 h-full flex flex-col">
              <div className="hidden md:flex mb-6 space-x-2">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeTab === index
                        ? 'bg-rose-500 text-white'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                    onClick={() => setActiveTab(index)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <h3 className="text-xl md:text-2xl font-medium mb-6 text-neutral-800">
                {problems[activeTab].title}
              </h3>

              <div className="space-y-4 flex-grow">
                {problems[activeTab].issues.map((issue, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start"
                    variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                  >
                    <div className="bg-red-100 p-1 rounded-full mr-3 mt-0.5 flex-shrink-0">
                      <X className="w-4 h-4 text-red-500" />
                    </div>
                    <p className="text-neutral-700 text-sm">{issue}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className="mt-8 p-4 bg-red-50 rounded-lg border border-red-100"
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} 
                transition={{ delay: 0.5 }}
              >
                <p className="text-sm text-red-700 italic">
                  "I've tried everything and nothing works long-term. It's frustrating to see initial results fade, leaving me back at square one."
                </p>
                <p className="text-xs text-right mt-2 text-red-500 font-medium">— Common Customer Frustration</p>
              </motion.div>
            </div>
          </motion.div>

          <div className="md:col-span-2 text-center py-6 md:py-0">
            <motion.p 
              className="text-neutral-600 italic max-w-lg mx-auto"
              initial={{ opacity: 0}}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.4 }}
            >
              These conventional approaches treat symptoms rather than causes. It's time for an approach that works with your body, at the cellular level where hair health begins.
            </motion.p>
          </div>

          <motion.div
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="solution-side md:col-start-2"
          >
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-md border border-green-200 border-l-4 h-full flex flex-col">
              <h3 className="text-xl md:text-2xl font-medium mb-6 text-neutral-800">
                How <span className="text-rose-500">care•atin</span> Rewrites the Story
              </h3>

              <div className="space-y-6 flex-grow">
                {solutions.map((solution, sIndex) => {
                  const SolutionIcon = solution.icon;
                  return (
                    <motion.div 
                      key={sIndex} 
                      className="pb-6 border-b border-neutral-100 last:border-0 last:pb-0"
                      variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
                    >
                      <h4 className="flex items-center text-lg font-medium mb-3 text-neutral-800">
                        <SolutionIcon className="w-5 h-5 text-rose-500 mr-2 flex-shrink-0" />
                        {solution.title}
                      </h4>
                      <div className="space-y-2 pl-7">
                        {solution.benefits.map((benefit, bIndex) => (
                          <div key={bIndex} className="flex items-start">
                            <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5 flex-shrink-0">
                              <Check className="w-3 h-3 text-green-600" />
                            </div>
                            <p className="text-neutral-700 text-sm">{benefit}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div 
                className="mt-6 text-center"
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} 
                transition={{ delay: 0.7 }}
              >
                <p className="text-sm text-neutral-600 mb-2">Ready to see the science behind this transformation?</p>
                <Link 
                  to="/pages/science" 
                  className="inline-flex items-center text-rose-600 font-medium hover:text-rose-700 transition-colors group"
                >
                  Explore Our Technology
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}