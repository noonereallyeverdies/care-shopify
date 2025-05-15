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
      title: "Chemicals: Surface-Level Fixes",
      icon: X,
      issues: [
        "Harsh chemicals, potential damage.",
        "Only masks symptoms.",
        "Results fade quickly."
      ]
    },
    {
      title: "Drugs: Potential Trade-offs",
      icon: X,
      issues: [
        "Hormonal side effects risk.",
        "Long wait for results.",
        "Benefits reverse if stopped."
      ]
    },
    {
      title: "Cosmetics: Temporary Illusions",
      icon: X,
      issues: [
        "Only conceals, no growth.",
        "Can clog follicles.",
        "Needs constant upkeep."
      ]
    }
  ];

  // Updated solution benefits
  const solutions = [
    {
      title: "Triple-Action Synergy",
      icon: Sparkles,
      benefits: [
        "Red Light + Massage + Oil Delivery.",
        "Revitalizes follicles at the source.",
        "Treats root causes."
      ]
    },
    {
      title: "Science-Backed & Gentle",
      icon: Shield,
      benefits: [
        "Clinically proven efficacy.",
        "Expert-developed, safe outcomes.",
        "Non-invasive, drug-free."
      ]
    },
    {
      title: "Sustainable, Long-Term Health",
      icon: Clock,
      benefits: [
        "Builds lasting improvements.",
        "Results amplify with use.",
        "93% see visible improvement."
      ]
    }
  ];

  // Tabs for the problems section
  const tabs = ["Chemicals", "Drugs", "Cosmetics"];

  return (
    <section className="py-14 md:py-24 bg-gradient-to-br from-pink-50 via-pink-100 to-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-rose-700 tracking-tight mb-2">
            Why Most Hair Loss Solutions Fail
          </h2>
          <p className="font-sans text-neutral-700 text-lg">
            Most products only mask symptoms. True transformation starts deeper.
          </p>
        </div>

        {/* Problems as 3 side-by-side cards (stacked on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {problems.map((problem, idx) => (
            <div
              key={idx}
              className="backdrop-blur bg-white/70 border border-rose-200 shadow-lg rounded-2xl p-6 flex flex-col items-center text-center"
            >
              <div className="p-3 bg-rose-100 rounded-full mb-4">
                <problem.icon className="w-8 h-8 text-rose-400" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-rose-700 mb-2 font-semibold">
                {problem.title}
              </h3>
              <ul className="text-neutral-700 font-sans text-sm space-y-1">
                {problem.issues.map((issue, i) => (
                  <li key={i} className="flex items-center justify-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-rose-300"></span>
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Wavy divider or gold line */}
        <div className="flex justify-center mb-12">
          <svg height="16" width="160" className="hidden md:block">
            <path d="M0 8 Q40 0 80 8 T160 8" stroke="#eab308" strokeWidth="3" fill="none" />
          </svg>
          <div className="block md:hidden w-24 h-1 rounded-full bg-gradient-to-r from-rose-200 via-yellow-200 to-rose-200"></div>
        </div>

        {/* Solution Card */}
        <div className="flex justify-center">
          <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 border-2 border-rose-300/60 shadow-xl bg-white/80 rounded-2xl p-8 md:p-12 flex flex-col items-center text-center relative">
            <h3 className="font-serif text-2xl md:text-3xl text-rose-700 font-bold mb-6">
              How <span className="text-rose-500">Care•atin</span> Works Differently
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-8">
              {solutions.map((solution, sIndex) => {
                const SolutionIcon = solution.icon;
                return (
                  <div key={sIndex} className="flex flex-col items-center text-center">
                    <div className="p-3 bg-gradient-to-br from-rose-100 via-yellow-50 to-white rounded-full mb-3 shadow">
                      <SolutionIcon className="w-7 h-7 text-rose-400" />
                    </div>
                    <h4 className="font-serif text-lg text-rose-700 font-semibold mb-1">{solution.title}</h4>
                    <ul className="text-neutral-700 font-sans text-sm space-y-1">
                      {solution.benefits.map((benefit, bIndex) => (
                        <li key={bIndex} className="flex items-center gap-2 justify-center">
                          <span className="inline-block w-2 h-2 rounded-full bg-yellow-300"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            <Link 
              to="/products/photonique-touch" 
              className="mt-4 inline-flex items-center bg-gradient-to-r from-rose-400 via-pink-300 to-yellow-200 text-white font-bold py-4 px-10 rounded-full shadow-lg border-2 border-yellow-300 text-lg hover:scale-105 transition-transform"
            >
              Get Care•atin Now
              <Sparkles className="ml-3 w-6 h-6 text-yellow-200 animate-pulse" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}