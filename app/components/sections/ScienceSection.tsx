import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, Zap, Shield, Activity, ChevronDown, Heart, Milestone, Timer } from 'lucide-react';

// Tab identifiers for the science section
type ScienceTab = 'mechanisms' | 'rhythm';

export function ScienceSection() {
  const [activeTab, setActiveTab] = useState<ScienceTab>('mechanisms');

  return (
    <section id="science" className="py-20 md:py-32 bg-stone-50 text-neutral-800 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Main Heading */}
        <div className="text-center mb-16">
          <motion.h1
            className="text-4xl md:text-5xl font-serif font-light text-neutral-900 mb-6 lowercase tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            the deep science of hair renewal
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-neutral-700 font-light leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
          >
            dive into the fascinating cellular world where red light interacts with your hair follicles to stimulate growth from within.
          </motion.p>
        </div>

        {/* Science Credentials */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-24 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-50 via-white to-stone-50 -z-10 rounded-3xl opacity-60"></div>

          {/* Nobel Prize */}
          <motion.div 
            className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-stone-100 flex flex-col items-center text-center hover:shadow-md transition-shadow duration-300"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-6">
              <Award className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-medium text-neutral-800 mb-3">Nobel Prize Foundation</h3>
            <p className="text-neutral-600 font-light">
              Our technology is based on the science that won the <span className="font-medium">2019 Nobel Prize in Physiology or Medicine</span> for understanding <span className="font-medium">how cells sense and adapt to oxygen availability</span>.
            </p>
          </motion.div>

          {/* Published Studies */}
          <motion.div 
            className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-stone-100 flex flex-col items-center text-center hover:shadow-md transition-shadow duration-300"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-medium text-neutral-800 mb-3">30+ Published Studies</h3>
            <p className="text-neutral-600 font-light">
              Red light therapy for hair growth is supported by <span className="font-medium">over 30 peer-reviewed clinical studies</span> in <span className="font-medium">respected medical journals worldwide</span>.
            </p>
          </motion.div>

          {/* FDA Recognition */}
          <motion.div 
            className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-stone-100 flex flex-col items-center text-center hover:shadow-md transition-shadow duration-300"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-6">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-medium text-neutral-800 mb-3">FDA Recognition</h3>
            <p className="text-neutral-600 font-light">
              Low-level light therapy devices like ours are <span className="font-medium">recognized by the FDA</span> as <span className="font-medium">safe and effective for stimulating hair follicles</span> and promoting growth.
            </p>
          </motion.div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-10 mb-16">
            <button
              onClick={() => setActiveTab('mechanisms')}
              className={`px-6 py-3 text-lg font-light tracking-wide rounded-full transition-colors duration-300 flex items-center justify-center
                ${activeTab === 'mechanisms' 
                  ? 'bg-photonique-peach/10 text-photonique-coral border border-photonique-peach/30' 
                  : 'text-neutral-600 hover:text-neutral-800 border border-transparent hover:bg-stone-100/50'}`}
            >
              <Zap className={`mr-2 h-5 w-5 ${activeTab === 'mechanisms' ? 'text-photonique-coral' : 'text-neutral-400'}`} />
              Understanding the Mechanisms
            </button>
            <button
              onClick={() => setActiveTab('rhythm')}
              className={`px-6 py-3 text-lg font-light tracking-wide rounded-full transition-colors duration-300 flex items-center justify-center
                ${activeTab === 'rhythm' 
                  ? 'bg-photonique-peach/10 text-photonique-coral border border-photonique-peach/30' 
                  : 'text-neutral-600 hover:text-neutral-800 border border-transparent hover:bg-stone-100/50'}`}
            >
              <Timer className={`mr-2 h-5 w-5 ${activeTab === 'rhythm' ? 'text-photonique-coral' : 'text-neutral-400'}`} />
              Understanding Your Hair's Natural Rhythm
            </button>
          </div>

          {/* Tab Content */}
          <div className="relative overflow-hidden rounded-2xl bg-white border border-stone-100 shadow-lg">
            {/* Mechanisms Content */}
            <div className={`${activeTab === 'mechanisms' ? 'block' : 'hidden'} p-8 md:p-12`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14">
                {/* Hair Follicle Structure */}
                <motion.div 
                  className="flex flex-col md:flex-row md:items-start gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-rose-600">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-neutral-800 mb-3">Hair Follicle Structure</h3>
                    <p className="text-neutral-600 font-light leading-relaxed">
                      Your hair follicle is a complex mini-organ with its own blood supply and stem cell reservoir. Red light at the precise 650-670nm wavelength penetrates the skin to reach these follicles without heat or damage, directly energizing the cells responsible for hair production.
                    </p>
                  </div>
                </motion.div>

                {/* Cellular Energy Production */}
                <motion.div 
                  className="flex flex-col md:flex-row md:items-start gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center">
                      <Zap className="h-8 w-8 text-amber-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-neutral-800 mb-3">Cellular Energy Production</h3>
                    <p className="text-neutral-600 font-light leading-relaxed">
                      Light photons activate cytochrome c oxidase in your mitochondria—the cellular powerhouses—boosting ATP production by up to 200%. This increased energy allows follicle cells to function optimally, extending the active growth phase and reducing premature shedding.
                    </p>
                  </div>
                </motion.div>

                {/* Growth Factor Activation */}
                <motion.div 
                  className="flex flex-col md:flex-row md:items-start gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                      <Activity className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-neutral-800 mb-3">Growth Factor Activation</h3>
                    <p className="text-neutral-600 font-light leading-relaxed">
                      Red light therapy triggers the release of key growth factors like IGF-1, FGF-7, and VEGF that signal follicle stem cells to activate. These factors promote new blood vessel formation around follicles, delivering more nutrients and oxygen for robust hair growth.
                    </p>
                  </div>
                </motion.div>

                {/* The Inflammation Connection */}
                <motion.div 
                  className="flex flex-col md:flex-row md:items-start gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                      <Heart className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-neutral-800 mb-3">The Inflammation Connection</h3>
                    <p className="text-neutral-600 font-light leading-relaxed">
                      Chronic micro-inflammation is a major factor in hair loss. Red light therapy reduces inflammatory cytokines and oxidative stress at the follicle level, creating an optimal environment for healthy growth and reducing damage to the delicate cellular structures.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Hair Rhythm Content */}
            <div className={`${activeTab === 'rhythm' ? 'block' : 'hidden'} p-8 md:p-12`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left Column: Illustration */}
                <div className="relative h-[400px] md:h-auto rounded-xl overflow-hidden bg-gradient-to-b from-stone-50 to-white border border-stone-100">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                    {/* Visual elements for hair growth cycle - simplified circular illustration */}
                    <div className="relative w-64 h-64 md:w-80 md:h-80">
                      {/* Outer ring */}
                      <motion.div 
                        className="absolute inset-0 rounded-full border-4 border-stone-100"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                      />
                      
                      {/* Circle segments for each phase */}
                      <svg className="absolute inset-0" viewBox="0 0 100 100">
                        {/* Anagen (growth) - largest segment ~70% */}
                        <path 
                          d="M 50 50 L 50 0 A 50 50 0 0 1 97.5 65 Z" 
                          fill="#FECDD3" 
                          stroke="#FDA4AF" 
                          strokeWidth="0.5"
                        />
                        {/* Catagen (transition) - small segment ~5% */}
                        <path 
                          d="M 50 50 L 97.5 65 A 50 50 0 0 1 85 95 Z" 
                          fill="#FEF3C7" 
                          stroke="#FDE68A" 
                          strokeWidth="0.5"
                        />
                        {/* Telogen (resting) - medium segment ~15% */}
                        <path 
                          d="M 50 50 L 85 95 A 50 50 0 0 1 20 90 Z" 
                          fill="#DBEAFE" 
                          stroke="#BFDBFE" 
                          strokeWidth="0.5"
                        />
                        {/* Exogen (shedding) - small segment ~10% */}
                        <path 
                          d="M 50 50 L 20 90 A 50 50 0 0 1 50 0 Z" 
                          fill="#D1FAE5" 
                          stroke="#A7F3D0" 
                          strokeWidth="0.5"
                        />
                      </svg>

                      {/* Center point */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center">
                        <span className="text-neutral-700 text-sm font-medium text-center">Hair Growth Cycle</span>
                      </div>

                      {/* Phase Labels */}
                      <div className="absolute top-5 right-5 bg-rose-50 px-2 py-1 rounded text-xs text-rose-700">Anagen</div>
                      <div className="absolute bottom-5 right-5 bg-amber-50 px-2 py-1 rounded text-xs text-amber-700">Catagen</div>
                      <div className="absolute bottom-5 left-5 bg-blue-50 px-2 py-1 rounded text-xs text-blue-700">Telogen</div>
                      <div className="absolute top-5 left-5 bg-green-50 px-2 py-1 rounded text-xs text-green-700">Exogen</div>
                    </div>

                    {/* Animation elements - floating hair strands */}
                    <motion.div
                      className="absolute h-32 w-px bg-gradient-to-b from-transparent via-rose-300 to-transparent"
                      style={{ top: '20%', left: '30%' }}
                      animate={{ y: [-10, 10, -10], opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="absolute h-24 w-px bg-gradient-to-b from-transparent via-rose-300 to-transparent"
                      style={{ top: '40%', left: '70%' }}
                      animate={{ y: [-8, 8, -8], opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    />
                    <motion.div
                      className="absolute h-40 w-px bg-gradient-to-b from-transparent via-rose-300 to-transparent"
                      style={{ bottom: '20%', right: '25%' }}
                      animate={{ y: [-15, 15, -15], opacity: [0.4, 0.9, 0.4] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />
                  </div>
                </div>

                {/* Right Column: Phase Descriptions */}
                <div className="space-y-8">
                  {/* Anagen Phase */}
                  <motion.div 
                    className="p-6 rounded-lg border border-rose-100 bg-rose-50/30 relative overflow-hidden"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-rose-400"></div>
                    <h3 className="text-xl font-medium text-neutral-800 mb-2 pl-2">
                      Anagen <span className="text-neutral-500 font-light">(2-7 years)</span>
                    </h3>
                    <p className="text-neutral-700 font-light leading-relaxed">
                      The active growth phase where your hair follicle is hard at work producing a new hair shaft. About 85-90% of your hair is in this phase right now!
                    </p>
                  </motion.div>

                  {/* Catagen Phase */}
                  <motion.div 
                    className="p-6 rounded-lg border border-amber-100 bg-amber-50/30 relative overflow-hidden"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-amber-400"></div>
                    <h3 className="text-xl font-medium text-neutral-800 mb-2 pl-2">
                      Catagen <span className="text-neutral-500 font-light">(2-3 weeks)</span>
                    </h3>
                    <p className="text-neutral-700 font-light leading-relaxed">
                      The transition phase where growth stops and the follicle shrinks. Think of it like your hair taking a short break to reset.
                    </p>
                  </motion.div>

                  {/* Telogen Phase */}
                  <motion.div 
                    className="p-6 rounded-lg border border-blue-100 bg-blue-50/30 relative overflow-hidden"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-400"></div>
                    <h3 className="text-xl font-medium text-neutral-800 mb-2 pl-2">
                      Telogen <span className="text-neutral-500 font-light">(3-4 months)</span>
                    </h3>
                    <p className="text-neutral-700 font-light leading-relaxed">
                      The resting phase where old hair remains in place while a new hair prepares to grow. About 10-15% of your hairs are in this phase.
                    </p>
                  </motion.div>

                  {/* Exogen Phase */}
                  <motion.div 
                    className="p-6 rounded-lg border border-green-100 bg-green-50/30 relative overflow-hidden"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-green-400"></div>
                    <h3 className="text-xl font-medium text-neutral-800 mb-2 pl-2">
                      Exogen <span className="text-neutral-500 font-light">(2-5 months)</span>
                    </h3>
                    <p className="text-neutral-700 font-light leading-relaxed">
                      The shedding phase where old hairs fall out, making room for new growth. This is why losing 50-100 hairs daily is completely normal!
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ScienceSection;