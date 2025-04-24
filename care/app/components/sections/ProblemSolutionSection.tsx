import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartCrack, Dna, CheckCircle, Minus, Sparkles, ZoomOut, Leaf, Clock, Repeat, Users, RefreshCw } from "lucide-react";

export function ProblemSolutionSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const scaleUp = {
    initial: { scale: 1 },
    hover: { scale: 1.03, transition: { duration: 0.2 } }
  };

  const rotateIcon = {
    initial: { rotate: 0 },
    hover: { rotate: 180, transition: { duration: 0.5 } }
  };

  const slideUp = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  const problemSolutionPairs = [
    {
      problem: "Thinning Hair",
      problemDescription: "Hair density decreases due to aging, hormonal changes, and stress",
      problemIcon: Minus,
      solution: "Cellular Revitalization",
      solutionDescription: "Red light stimulates follicle cells to produce thicker, stronger hair",
      solutionIcon: Sparkles,
      image: "/images/thinning-hair.jpg"
    },
    {
      problem: "Hair Shedding",
      problemDescription: "Excessive shedding from hormonal imbalance and nutritional deficiencies",
      problemIcon: ZoomOut,
      solution: "Extended Growth Phase",
      solutionDescription: "Prolongs the anagen (growth) phase, reducing premature hair loss",
      solutionIcon: Leaf,
      image: "/images/hair-shedding.jpg"
    },
    {
      problem: "Slow Growth",
      problemDescription: "Sluggish hair growth from poor scalp circulation and follicle dormancy",
      problemIcon: Clock,
      solution: "Enhanced Circulation",
      solutionDescription: "Increases blood flow to deliver more nutrients to the hair follicles",
      solutionIcon: Repeat,
      image: "/images/slow-growth.jpg"
    },
    {
      problem: "Dull, Brittle Hair",
      problemDescription: "Weakened hair structure from environmental damage and styling",
      problemIcon: HeartCrack,
      solution: "Protein Synthesis",
      solutionDescription: "Boosts production of keratin for stronger, more resilient hair",
      solutionIcon: Dna,
      image: "/images/brittle-hair.jpg"
    }
  ];

  // Create placeholder images if they don't exist
  const currentPair = problemSolutionPairs[activeIndex];

  const problems = [
    { icon: HeartCrack, title: "dull, brittle hair", description: "Weakened structure from environmental damage & styling", stat: "A widespread issue for adults" },
    { icon: ZoomOut, title: "excessive shedding", description: "Follicles prematurely entering resting phase", stat: "Affects 40% of women by 50" },
    { icon: Clock, title: "slow or stalled growth", description: "Reduced cellular energy & poor scalp circulation", stat: "Growth rate can slow with age" },
  ];

  const solutions = [
    { icon: Dna, title: "red light activation", description: "Energizes follicle cells & boosts circulation", stat: "Clinically studied for hair density" },
    { icon: Dna, title: "targeted nourishment", description: "Delivers essential nutrients directly to the root", stat: "Prepares scalp for absorption" },
    { icon: Dna, title: "scalp health optimization", description: "Reduces inflammation & creates ideal growth conditions", stat: "Visibly clarifies scalp" },
  ];

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-tight">
            <span className="text-neutral-400">the</span> problem <span className="text-rose-400">&</span> <span className="text-rose-500">our solution</span>
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            We designed care•atin to address the root causes of common hair concerns with 
            science-backed technology
          </p>
        </motion.div>

        {/* Navigation Pills */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          {problemSolutionPairs.map((pair, index) => (
            <motion.button
              key={`nav-${index}`}
              className={`px-6 py-3 rounded-full transition-all duration-300 text-sm md:text-base font-medium ${
                activeIndex === index 
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-200' 
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
              onClick={() => setActiveIndex(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {pair.problem}
            </motion.button>
          ))}
        </motion.div>

        {/* Featured Problem/Solution */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`featured-${activeIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left side - Problem */}
              <motion.div 
                className="lg:col-span-5 bg-neutral-100 p-8 rounded-3xl shadow-lg relative overflow-hidden"
                whileHover="hover"
                initial="initial"
                variants={scaleUp}
              >
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-neutral-200 rounded-full opacity-30" />
                <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-neutral-200 rounded-full opacity-20" />
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    {(() => {
                      const ProblemIcon = currentPair.problemIcon;
                      return <ProblemIcon size={32} className="mr-4 text-neutral-500 flex-shrink-0" strokeWidth={1.5} />;
                    })()}
                    <div className="flex-1">
                      <div className="uppercase text-xs tracking-widest text-neutral-500 mb-1">The Problem</div>
                      <h3 className="text-2xl md:text-3xl font-medium text-neutral-800">{currentPair.problem}</h3>
                    </div>
                  </div>
                  
                  <p className="text-neutral-600 text-lg mb-8">{currentPair.problemDescription}</p>
                  
                  <div className="flex items-center text-neutral-500">
                    <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="16"></line>
                    </svg>
                    <span className="text-sm font-medium">{problems[0].stat}</span>
                  </div>
                </div>
              </motion.div>
              
              {/* Middle - Arrow transform */}
              <motion.div 
                className="hidden lg:flex lg:col-span-2 justify-center items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-neutral-100 to-rose-100 rounded-full"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  <motion.div
                    className="absolute z-10"
                    animate={{ 
                      x: [0, 10, 0],
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <svg className="w-8 h-8 text-rose-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Right side - Solution */}
              <motion.div 
                className="lg:col-span-5 bg-rose-50 p-8 rounded-3xl shadow-lg relative overflow-hidden"
                whileHover="hover"
                initial="initial"
                variants={scaleUp}
              >
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-rose-100 rounded-full opacity-50" />
                <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-rose-100 rounded-full opacity-30" />
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    {(() => {
                      const SolutionIcon = currentPair.solutionIcon;
                      return <SolutionIcon size={32} className="mr-4 text-rose-500 flex-shrink-0" strokeWidth={1.5} />;
                    })()}
                    <div className="flex-1">
                      <div className="uppercase text-xs tracking-widest text-rose-500 mb-1">Our Solution</div>
                      <h3 className="text-2xl md:text-3xl font-medium text-rose-700">{currentPair.solution}</h3>
                    </div>
                  </div>
                  
                  <p className="text-rose-700 text-lg mb-8">{currentPair.solutionDescription}</p>
                  
                  <div className="flex items-center text-rose-500">
                    <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="16"></line>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                    <span className="text-sm font-medium">Clinically proven effective</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Card Grid - All Problem Solution Pairs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {problemSolutionPairs.map((pair, index) => (
            <motion.div 
              key={`card-${index}`}
              className={`rounded-xl overflow-hidden shadow-sm transition-all duration-300 cursor-pointer ${
                activeIndex === index ? 'ring-2 ring-rose-400 ring-offset-2' : 'hover:shadow-md'
              }`}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={slideUp}
              whileHover={{ y: -5 }}
            >
              <div className="h-32 bg-neutral-200 relative overflow-hidden">
                <motion.div
                  initial={{ opacity: 0.8 }}
                  animate={hoveredCard === index ? { opacity: 1 } : { opacity: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rose-500/70 to-rose-700/70 text-white text-center p-4"
                >
                  <div>
                    {(() => {
                      const SolutionIcon = pair.solutionIcon;
                      return <SolutionIcon size={24} className="mb-2 inline-block" strokeWidth={1.5} />;
                    })()}
                    <div className="font-medium">{pair.solution}</div>
                  </div>
                </motion.div>
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-medium text-lg mb-1">{pair.problem}</h3>
                <p className="text-neutral-500 text-sm">{pair.problemDescription}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="bg-neutral-50 p-8 rounded-2xl shadow-sm"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-6 md:mb-0 md:mr-8">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white shadow-lg overflow-hidden">
                <img 
                  src="/images/scientist-avatar.jpg" 
                  alt="Dr. Vincent Verzele" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="text-center md:text-left flex-1">
              <p className="text-neutral-600 italic text-lg mb-3">
                "Our clinical studies show that combining red light therapy with our proprietary scalp 
                treatments leads to optimal results in 8-12 weeks of consistent use."
              </p>
              <div>
                <div className="font-medium text-neutral-900">Dr. Vincent Verzele</div>
                <div className="text-sm text-neutral-500">Chief Scientific Officer, care•atin Labs</div>
              </div>
            </div>
            <div className="hidden md:block md:ml-8">
              <motion.div 
                className="bg-rose-500 text-white px-5 py-3 rounded-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <a href="/pages/science" className="flex items-center">
                  <span>Learn More</span>
                  <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="bg-rose-50 p-8 rounded-xl shadow-sm border border-rose-100">
          <div className="flex items-center mb-4">
            {(() => {
              const ProblemIcon = problems[0].icon;
              return <ProblemIcon className="w-8 h-8 text-rose-500 mr-4 flex-shrink-0" strokeWidth={1.5}/>;
            })()}
            <h3 className="text-xl font-medium text-rose-700 uppercase tracking-wider">the problem</h3>
          </div>
          <p className="text-neutral-600 text-sm">{problems[0].description}</p>
          <div className="flex items-center text-neutral-500">
            <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
            </svg>
            <span className="text-sm font-medium">{problems[0].stat}</span>
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="bg-emerald-50 p-8 rounded-xl shadow-sm border border-emerald-100">
          <div className="flex items-center mb-4">
            {(() => {
              const SolutionIcon = solutions[0].icon;
              return <SolutionIcon className="w-8 h-8 text-emerald-600 mr-4 flex-shrink-0" strokeWidth={1.5}/>;
            })()}
            <h3 className="text-xl font-medium text-emerald-700 uppercase tracking-wider">our solution</h3>
          </div>
          <p className="text-neutral-600 text-sm">{solutions[0].description}</p>
          <div className="flex items-center text-neutral-500">
            <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
            </svg>
            <span className="text-sm font-medium">{solutions[0].stat}</span>
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="bg-emerald-50 p-8 rounded-xl shadow-sm border border-emerald-100">
          <div className="flex items-center mb-4">
            {(() => {
              const SolutionIcon = solutions[1].icon;
              return <SolutionIcon className="w-8 h-8 text-emerald-600 mr-4 flex-shrink-0" strokeWidth={1.5}/>;
            })()}
            <h3 className="text-xl font-medium text-emerald-700 uppercase tracking-wider">our solution</h3>
          </div>
          <p className="text-neutral-600 text-sm">{solutions[1].description}</p>
          <div className="flex items-center text-neutral-500">
            <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
            </svg>
            <span className="text-sm font-medium">{solutions[1].stat}</span>
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="bg-emerald-50 p-8 rounded-xl shadow-sm border border-emerald-100">
          <div className="flex items-center mb-4">
            {(() => {
              const SolutionIcon = solutions[2].icon;
              return <SolutionIcon className="w-8 h-8 text-emerald-600 mr-4 flex-shrink-0" strokeWidth={1.5}/>;
            })()}
            <h3 className="text-xl font-medium text-emerald-700 uppercase tracking-wider">our solution</h3>
          </div>
          <p className="text-neutral-600 text-sm">{solutions[2].description}</p>
          <div className="flex items-center text-neutral-500">
            <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
            </svg>
            <span className="text-sm font-medium">{solutions[2].stat}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 