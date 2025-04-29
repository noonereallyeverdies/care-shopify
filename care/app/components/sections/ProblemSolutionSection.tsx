import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartCrack, Dna, CheckCircle, Minus, Sparkles, ZoomOut, Leaf, Clock, Repeat, Users, RefreshCw } from "lucide-react";
import { Link } from 'react-router-dom';

export function ProblemSolutionSection() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Simplified animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  const scaleUp = {
    initial: { scale: 1 },
    hover: { 
      scale: prefersReducedMotion ? 1 : 1.02, 
      transition: { duration: 0.15, type: 'spring', stiffness: 300 } 
    }
  };

  const slideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut'
      }
    })
  };

  const problemSolutionPairs = [
    {
      problem: "Is Your Hair Thinning?",
      problemDescription: "Are you noticing more scalp visibility and feeling self-conscious about your hair's declining volume? The natural aging process, your hormonal balance, and daily stress all contribute to your hair's density loss.",
      problemIcon: Minus,
      solution: "Revitalize Your Follicles",
      solutionDescription: "Within 4 weeks, our red light technology stimulates your dormant follicle cells, boosting your natural hair production by 28%. Your thicker, fuller hair growth becomes noticeable to others by week 8.",
      solutionIcon: Sparkles,
      image: "/images/thinning-hair.jpg",
      problemStat: "76% of users were concerned about visible scalp",
      solutionStat: "92% saw improved hair density in clinical trials"
    },
    {
      problem: "Excessive Shedding?",
      problemDescription: "Do you dread seeing hair in your brush or shower drain? When your hormones fluctuate and your nutrition lacks key elements, your hair's growth cycle shortens, leading to premature shedding and thinning.",
      problemIcon: ZoomOut,
      solution: "Extend Your Hair's Growth Phase",
      solutionDescription: "Our targeted red light extends your hair's active growth period by up to 37%, giving you noticeably less shedding in just 21 days. You'll see stronger roots and improved retention in your daily life.",
      solutionIcon: Leaf,
      image: "/images/hair-shedding.jpg",
      problemStat: "Shedding increases by 30% from poor nutrient absorption",
      solutionStat: "Reduced hair loss by 62% in our 12-week study"
    },
    {
      problem: "Slow-Growing Hair?",
      problemDescription: "Frustrated by hair that barely seems to grow? When your scalp circulation diminishes and your follicles become dormant, your hair growth stalls, leaving you waiting months for minimal results.",
      problemIcon: Clock,
      solution: "Accelerate Your Growth Cycle",
      solutionDescription: "Our patented technology increases blood flow to your scalp by 55%, delivering essential nutrients directly to your follicles. Users report up to 34% faster growth in just 60 days of consistent use.",
      solutionIcon: Repeat,
      image: "/images/slow-growth.jpg",
      problemStat: "Poor circulation reduces growth rate by up to 40%",
      solutionStat: "84% of users saw faster growth within 8 weeks"
    },
    {
      problem: "Brittle, Fragile Hair?",
      problemDescription: "Does your hair break easily when styling? Environmental damage and heat styling deplete your hair's natural proteins, leaving each strand weakened and vulnerable to breakage and split ends.",
      problemIcon: HeartCrack,
      solution: "Fortify Each Hair Strand",
      solutionDescription: "Our technology boosts your natural keratin production, creating hair that's up to 3x more resistant to breakage. You'll feel the difference when styling and see visibly healthier hair within 30 days.",
      solutionIcon: Dna,
      image: "/images/brittle-hair.jpg",
      problemStat: "Brittle hair is 78% more prone to breakage",
      solutionStat: "97% decrease in breakage after 8 weeks"
    }
  ];

  const currentPair = problemSolutionPairs[activeIndex];

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-neutral-50 overflow-hidden relative">
      {/* Ambient background - single subtle vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white via-white to-neutral-100" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Main Heading */}
        <motion.div 
          className="text-center mb-16 md:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <h2 className="text-4xl lg:text-5xl font-medium text-[#111827] mb-6 tracking-tight">
            <span className="text-neutral-400">Transform</span> <span className="text-[#111827]">Your Hair Challenges</span> <span className="text-[#D4627C]">Into</span> <span className="text-[#D4627C]">Your Success Story</span>
          </h2>
          <p className="text-lg text-[#111827]/70 max-w-2xl mx-auto">
            Identify your specific hair concerns below and discover how our clinically-proven technology delivers your personalized solution in as little as 4 weeks.
          </p>
        </motion.div>

        {/* Navigation Pills */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-16 md:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          role="tablist"
          aria-label="Problem and Solution Navigation"
        >
          {problemSolutionPairs.map((pair, index) => (
            <motion.button
              key={`nav-${index}`}
              className={`px-4 py-2 rounded-full transition-all duration-200 text-sm md:text-base font-medium
                focus:outline-none focus:ring-2 focus:ring-[#D4627C] focus:ring-offset-2
                ${activeIndex === index 
                  ? 'bg-[#D4627C] text-white shadow-sm' 
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              onClick={() => setActiveIndex(index)}
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.03 }}
              whileTap={{ scale: 0.98 }}
              role="tab"
              aria-selected={activeIndex === index}
              aria-controls={`problem-solution-${index}`}
              id={`tab-${index}`}
            >
              {pair.problem}
            </motion.button>
          ))}
        </motion.div>

        {/* Featured Problem/Solution */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`featured-${activeIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-24"
            id={`problem-solution-${activeIndex}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeIndex}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left side - Problem */}
              <motion.div 
                className="lg:col-span-5 bg-white p-8 md:p-10 rounded-2xl shadow-sm relative overflow-hidden border border-gray-200"
                whileHover="hover"
                initial="initial"
                variants={scaleUp}
              >
                <div className="relative z-10">
                  <div className="flex items-center mb-8">
                    {(() => {
                      const ProblemIcon = currentPair.problemIcon;
                      return (
                        <div className="mr-5 p-3 bg-[#D4627C]/10 rounded-full flex-shrink-0">
                          <ProblemIcon size={32} className="text-[#D4627C]" strokeWidth={1.5} />
                        </div>
                      );
                    })()}
                    <div className="flex-1">
                      <div className="uppercase text-xs tracking-widest text-[#D4627C] font-medium mb-1">The Problem</div>
                      <h3 className="text-2xl md:text-3xl font-medium text-[#111827]">{currentPair.problem}</h3>
                    </div>
                  </div>
                  
                  <p className="text-[#111827]/80 text-lg leading-relaxed mb-8">{currentPair.problemDescription}</p>
                  
                  <div className="inline-flex items-center bg-neutral-100 px-4 py-2 rounded-full text-[#111827]">
                    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="16"></line>
                    </svg>
                    <span className="text-sm font-medium">{currentPair.problemStat}</span>
                  </div>
                </div>
              </motion.div>
              
              {/* Middle - Arrow transform */}
              <motion.div 
                className="hidden lg:flex lg:col-span-2 justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-10 h-10 text-[#D4627C]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
              
              {/* Right side - Solution */}
              <motion.div 
                className="lg:col-span-5 bg-white p-8 md:p-10 rounded-2xl shadow-sm relative overflow-hidden border border-gray-200"
                whileHover="hover"
                initial="initial"
                variants={scaleUp}
              >
                {/* Solution accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D4627C]"></div>
                
                <div className="relative z-10 pl-3">
                  <div className="flex items-center mb-8">
                    {(() => {
                      const SolutionIcon = currentPair.solutionIcon;
                      return (
                        <div className="mr-5 p-3 bg-[#D4627C]/10 rounded-full flex-shrink-0">
                          <SolutionIcon size={32} className="text-[#D4627C]" strokeWidth={1.5} />
                        </div>
                      );
                    })()}
                    <div className="flex-1">
                      <div className="uppercase text-xs tracking-widest text-[#D4627C] font-medium mb-1">Our Solution</div>
                      <h3 className="text-2xl md:text-3xl font-medium text-[#111827]">{currentPair.solution}</h3>
                    </div>
                  </div>
                  
                  <p className="text-[#111827]/80 text-lg leading-relaxed mb-8">{currentPair.solutionDescription}</p>
                  
                  <div className="inline-flex items-center bg-[#D4627C]/10 px-4 py-2 rounded-full text-[#D4627C]">
                    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="16"></line>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                    <span className="text-sm font-medium">{currentPair.solutionStat}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Mobile Arrow for Stack Layout */}
            <div className="flex lg:hidden justify-center my-6">
              <motion.div 
                className="relative w-16 h-16 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <svg className="w-8 h-8 text-[#D4627C]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5l7 7-7 7" />
                  <path d="M5 12h14" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Card Grid - All Problem Solution Pairs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {problemSolutionPairs.map((pair, index) => (
            <motion.div 
              key={`card-${index}`}
              className={`rounded-xl overflow-hidden shadow-sm transition-all duration-200 cursor-pointer bg-white
                focus:outline-none focus:ring-2 focus:ring-[#D4627C] focus:ring-offset-2
                ${activeIndex === index 
                  ? 'ring-2 ring-[#D4627C] ring-offset-2' 
                  : 'hover:shadow-md border border-gray-200'}`}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={slideUp}
              whileHover={{ y: prefersReducedMotion ? 0 : -4 }}
              tabIndex={0}
              role="button"
              aria-pressed={activeIndex === index}
            >
              {/* Card content */}
              <div className="bg-white p-6 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  {(() => {
                    const ProblemIcon = pair.problemIcon;
                    return (
                      <div className="mr-3 p-2 bg-[#D4627C]/10 rounded-full flex-shrink-0">
                        <ProblemIcon size={24} className="text-[#D4627C]" strokeWidth={1.5} />
                      </div>
                    );
                  })()}
                  <h3 className="text-lg font-medium text-[#111827]">{pair.problem}</h3>
                </div>
                <p className="text-[#111827]/70 text-sm mt-auto">
                  {pair.problemShortDescription || pair.problemDescription.substring(0, 75) + '...'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Call to action */}
        <motion.div 
          className="text-center" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <Link 
            to="/pages/science" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4627C] text-white rounded-full hover:bg-[#C24161] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4627C] focus:ring-offset-2"
          >
            See How Our Technology Transforms Your Hair
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <p className="mt-4 text-sm text-neutral-600">
            Backed by 3 clinical studies with 10,000+ participants and our 60-day satisfaction guarantee
          </p>
        </motion.div>
      </div>
    </section>
  );
}