import { motion } from "framer-motion";
import { Zap, Sprout, Sparkles } from 'lucide-react';
import { useState } from "react";

interface StepCardProps {
  icon: typeof Zap;
  title: string;
  description: string;
  step: number;
  delay: number;
}

function StepCard({ icon: Icon, title, description, step, delay }: StepCardProps) {
  return (
    <motion.div 
      className="flex flex-col items-center text-center px-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <div className="relative mb-6 group">
        <div className="w-18 h-18 bg-rose-50 rounded-full flex items-center justify-center shadow-md">
          <Icon className="w-8 h-8 text-rose-500" />
          <motion.div 
            className="absolute inset-0 rounded-full bg-rose-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 rounded-full text-white flex items-center justify-center text-xs font-semibold shadow-sm">
          {step}
        </div>
      </div>
      <h3 className="text-xl md:text-2xl font-medium text-neutral-900 mb-3 brand-heading">{title}</h3>
      <div className="w-10 h-0.5 bg-rose-300 mb-3" />
      <p className="text-neutral-600 max-w-xs brand-body leading-relaxed">{description}</p>
    </motion.div>
  );
}

// Separate SVG connector component to reduce nesting
function StepConnector() {
  return (
    <div className="hidden md:block absolute top-8 left-0 right-0 h-16 -z-10">
      <svg width="100%" height="100%" viewBox="0 0 1000 64" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Path from step 1 to 2 */}
        <motion.path 
          d="M200 32 Q375 10, 500 32"
          stroke="url(#gradient1)"
          strokeWidth="2"
          strokeDasharray="5 5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
          viewport={{ once: true }}
        />
        {/* Path from step 2 to 3 */}
        <motion.path 
          d="M500 32 Q625 54, 800 32"
          stroke="url(#gradient2)"
          strokeWidth="2"
          strokeDasharray="5 5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
        />
        <defs>
          <linearGradient id="gradient1" x1="200" y1="32" x2="500" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFDAB9" stopOpacity="0.1"/>
            <stop offset="0.5" stopColor="#FF7F50" />
            <stop offset="1" stopColor="#FFDAB9" stopOpacity="0.1"/>
          </linearGradient>
          <linearGradient id="gradient2" x1="500" y1="32" x2="800" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFDAB9" stopOpacity="0.1"/>
            <stop offset="0.5" stopColor="#FF7F50" />
            <stop offset="1" stopColor="#FFDAB9" stopOpacity="0.1"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Separate component for the scientific visualization
function ScienceVisualization() {
  return (
    <motion.svg 
      className="w-full md:w-2/3 h-auto max-h-[150px]"
      viewBox="0 0 300 120" 
      fill="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <defs>
        <linearGradient id="lightWaveGradient" gradientTransform="rotate(90)">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FF7F50" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      
      {/* Scalp/Skin Layer */}
      <rect x="50" y="70" width="200" height="30" rx="2" fill="#FFDAB9" opacity="0.6" />
      <text x="150" y="90" textAnchor="middle" className="text-[10px] font-semibold fill-neutral-700 lowercase">scalp layer</text>
      
      {/* Hair Follicle */}
      <motion.path 
        d="M150 100 Q150 120, 145 120 L150 120 L155 120 Q150 120, 150 100 Z" 
        fill="#FFC0CB"
        opacity="0.8"
        initial={{ scale: 0.9, y: 5 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      />
      <text x="175" y="110" textAnchor="start" className="text-[10px] font-semibold fill-neutral-700 lowercase">follicle</text>
      
      {/* Hair Shaft */}
      <line x1="150" y1="70" x2="150" y2="30" stroke="#8B4513" strokeWidth="2.5" />
      <text x="160" y="50" textAnchor="start" className="text-[10px] font-semibold fill-neutral-700 lowercase">hair</text>
      
      {/* Light Waves */}
      <motion.path
        d="M70 15 Q150 43, 230 15"
        stroke="url(#lightWaveGradient)"
        strokeWidth="2"
        strokeDasharray="4 2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 1, 0] }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity, 
          repeatDelay: 1.5, 
          delay: 0 
        }}
      />
      <motion.path
        d="M90 15 Q150 51, 210 15"
        stroke="url(#lightWaveGradient)"
        strokeWidth="2"
        strokeDasharray="4 2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 1, 0] }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity, 
          repeatDelay: 1.5, 
          delay: 0.3
        }}
      />
      <motion.path
        d="M110 15 Q150 59, 190 15"
        stroke="url(#lightWaveGradient)"
        strokeWidth="2"
        strokeDasharray="4 2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 1, 0] }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity, 
          repeatDelay: 1.5, 
          delay: 0.6
        }}
      />
      
      {/* Mitochondria in follicle */}
      <motion.circle
        cx="145"
        cy="105"
        r="3"
        fill="#FF7F50"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ 
          duration: 2, 
          delay: 0, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      <motion.circle
        cx="150"
        cy="105"
        r="3"
        fill="#FF7F50"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ 
          duration: 2, 
          delay: 0.7, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      <motion.circle
        cx="155"
        cy="105"
        r="3"
        fill="#FF7F50"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ 
          duration: 2, 
          delay: 1.4, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      
      {/* Energy Indicator */}
      <text x="20" y="20" className="text-[10px] font-medium fill-rose-500">Light Energy (650-670nm)</text>
      <text x="230" y="105" className="text-[10px] font-medium fill-rose-500">ATP Energy</text>
      <motion.path 
        d="M220 105 L240 105" 
        stroke="#FF7F50" 
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.path 
        d="M225 100 L235 105 L225 110" 
        stroke="#FF7F50" 
        strokeWidth="1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      />
    </motion.svg>
  );
}

// Separate component for the expanded science section
function ExpandedScienceSection() {
  return (
    <motion.div 
      className="mt-6 pt-6 border-t border-neutral-200/70 text-neutral-700 font-light leading-relaxed space-y-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Scientific Visualization & Sunlight Analogy */}
      <div className="my-6 p-4 bg-rose-50/50 rounded-lg border border-rose-100/70">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Conceptual Sunlight Analogy Visual */}
          <motion.div 
            className="w-full md:w-1/3 text-center p-2"
            initial={{ opacity:0, x: -15}}
            animate={{ opacity:1, x: 0}}
            transition={{duration: 0.7, delay: 0.2}}
          >
            <Sprout className="w-16 h-16 text-green-500/70 mx-auto mb-2" />
            <p className="text-sm text-green-700/90">like a plant absorbing sunlight, your follicles draw in light energy.</p>
          </motion.div>
          
          {/* Follicle Visualization */}
          <ScienceVisualization />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-rose-50 p-5 rounded-lg">
            <h4 className="font-medium text-rose-600 mb-2">Light Absorption</h4>
            <p className="text-sm text-neutral-700 brand-body leading-relaxed">
              the <strong className="font-medium text-photonique-coral/90">photonique touch</strong> device delivers specific wavelengths of red and near-infrared light. this light energy is absorbed by cells in your hair follicles, much like plants absorb sunlight for photosynthesis. 
            </p>
          </div>
          
          <div className="bg-rose-50 p-5 rounded-lg">
            <h4 className="font-medium text-rose-600 mb-2">Cellular Energy</h4>
            <p className="text-sm text-neutral-700 brand-body leading-relaxed">
              this gentle stimulation boosts cellular activity, improving circulation and nutrient delivery to the follicle. the result is a healthier environment that encourages dormant follicles to re-enter the growth phase, leading to the emergence of stronger, fuller hair over time.
            </p>
          </div>
          
          <div className="bg-rose-50 p-5 rounded-lg">
            <h4 className="font-medium text-rose-600 mb-2">Hair Growth</h4>
            <p className="text-sm text-neutral-700 brand-body leading-relaxed">
              with more energy, follicle cells can increase protein production, improve 
              circulation, and extend the growth phase of the hair cycle - resulting in 
              visibly thicker, stronger hair.
            </p>
          </div>
        </div>
        
        <div className="mt-6 text-sm text-center text-neutral-500">
          <p>Want to learn more? <a href="#" className="text-rose-600 font-medium hover:underline">Read our full scientific white paper</a></p>
        </div>
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  const [showMoreScience, setShowMoreScience] = useState(false);
  
  return (
    <section className="py-20 bg-white section-spacing">
      <div className="container mx-auto px-6">
        {/* Section Intro */}
        <div className="max-w-3xl mx-auto text-center mb-20 md:mb-24">
          <motion.h2 
            className="text-3xl md:text-4xl font-serif font-thin text-neutral-800 mb-6 lowercase tracking-wider"
            initial={{ opacity: 0, y:10 }}
            whileInView={{ opacity: 1, y:0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            the science, simplified
          </motion.h2>
          {/* Removed animated underline, will use spacing and typography for emphasis */}
          <motion.p 
            className="text-lg md:text-xl text-neutral-700 font-light leading-relaxed mb-8"
            initial={{ opacity: 0, y:10 }}
            whileInView={{ opacity: 1, y:0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            our photonique touch device works with your body's natural processes—like plants growing toward sunlight. nothing artificial. just cell-renewing light energy that creates change from within.
          </motion.p>
          
          {/* Clinically Validated Badge - Enhanced */}
          <motion.div 
            className="mt-8 bg-white border border-photonique-peach/50 rounded-lg p-4 md:p-5 inline-flex flex-col sm:flex-row items-center text-center sm:text-left shadow-subtle hover:shadow-md transition-shadow duration-300 max-w-md mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <span className="text-3xl mr-0 sm:mr-3 mb-2 sm:mb-0">🔬</span>
            <div>
              <p className="text-md font-medium text-neutral-800">clinically validated. real results.</p>
              {/* Optional: Link to studies page if available */}
              {/* <a href="/studies" className="text-sm text-rose-600 hover:underline font-medium">Learn more about our research</a> */}
            </div>
          </motion.div>
        </div>

        {/* 3-Step Process - Title added */}
        <motion.h3 
            className="text-2xl md:text-3xl font-serif font-light text-neutral-800 text-center mb-12 md:mb-16 lowercase tracking-normal"
            initial={{ opacity: 0, y:10 }}
            whileInView={{ opacity: 1, y:0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
        >
            how it transforms
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16 md:gap-y-20 mb-16 relative">
          {/* Enhanced Arrow Connector - Extracted to separate component */}
          <StepConnector />

          <StepCard 
            icon={Zap} 
            title="energize" 
            description="gentle red light awakens dormant follicles and energizes cells deep within your scalp."
            step={1}
            delay={0.2}
          />
          <StepCard 
            icon={Sparkles}
            title="restore" 
            description="this energy boost enhances scalp circulation, delivering vital nutrients for optimal hair health."
            step={2}
            delay={0.4}
          />
          <StepCard 
            icon={Sprout} 
            title="emerge"
            description="rejuvenated follicles begin to produce stronger, thicker, more vibrant strands, revealing your hair's natural radiance."
            step={3}
            delay={0.6}
          />
        </div>

        {/* Science Explanation (Expandable) */}
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="p-8 bg-white rounded-xl shadow-md border border-neutral-100 section-card"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div 
              className="flex justify-between items-center cursor-pointer" 
              onClick={() => setShowMoreScience(!showMoreScience)}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-rose-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 3H5C3.89543 3 3 3.89543 3 5V9C3 10.1046 3.89543 11 5 11H9C10.1046 11 11 10.1046 11 9V5C11 3.89543 10.1046 3 9 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M19 3H15C13.8954 3 13 3.89543 13 5V9C13 10.1046 13.8954 11 15 11H19C20.1046 11 21 10.1046 21 9V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M9 13H5C3.89543 13 3 13.8954 3 15V19C3 20.1046 3.89543 21 5 21H9C10.1046 21 11 20.1046 11 19V15C11 13.8954 10.1046 13 9 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M19 13H15C13.8954 13 13 13.8954 13 15V19C13 20.1046 13.8954 21 15 21H19C20.1046 21 21 20.1046 21 19V15C21 13.8954 20.1046 13 19 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <h3 className="text-lg md:text-xl font-medium text-neutral-800 brand-heading lowercase">the science in simple terms</h3>
              </div>
              <div className={`flex items-center justify-center w-7 h-7 rounded-full transition-colors duration-300 ${showMoreScience ? 'bg-rose-100 text-rose-600' : 'bg-neutral-100 text-neutral-500'}`}>
                <span className="text-lg">
                  {showMoreScience ? '−' : '+'}
                </span>
              </div>
            </div>
            
            {showMoreScience && <ExpandedScienceSection />}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;