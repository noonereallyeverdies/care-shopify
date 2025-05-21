import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Zap } from 'lucide-react'; // Zap for technology benefits, CheckCircle for clinical proof

const technologyBenefits = [
  { text: "boosts blood flow, rejuvenating follicles for a healthier scalp." },
  { text: "delivers nutrient-rich light directly to the roots, restoring vibrancy and fullness." },
  { text: "gently activates your cells' natural energy, giving your hair the vitality it needs to shine." },
  { text: "extends the hair growth cycle, so you can enjoy long-lasting results and timeless beauty." },
];

const clinicalProofData = [
  { text: "87% of users saw reduced hair loss within 6 weeks." },
  { text: "79% experienced measurable regrowth within 12 weeks." },
];

export function ScienceTechnologySection() {
  return (
    <motion.section 
      className="py-16 md:py-24 bg-neutral-50" // Light neutral background
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-medium text-neutral-900 mb-4 lowercase">
            the science of hair confidence
          </h2>
          <p className="text-lg md:text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed">
            photonique touch uses cell-renewing light energy—a cutting-edge approach that transforms hair from the inside out. our advanced technology:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center mb-16 md:mb-20">
          {/* Technology Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ul className="space-y-5 mb-6">
              {technologyBenefits.map((item, index) => (
                <li key={index} className="flex items-start">
                  <Zap className="h-6 w-6 text-rose-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-neutral-700 leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>
            <p className="text-neutral-600 leading-relaxed">
              our dual-wavelength technology (650nm red + 850nm infrared) penetrates precisely, providing the results you deserve without heat damage or side effects.
            </p>
          </motion.div>

          {/* Scientific Visualization */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg border border-rose-100 p-6 aspect-video lg:aspect-square flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Background */}
              <rect x="0" y="0" width="400" height="400" fill="white" />
              
              {/* Title */}
              <text x="200" y="40" textAnchor="middle" className="text-xl font-semibold fill-neutral-800">
                Dual-Wavelength Technology
              </text>
              
              {/* Scalp Section */}
              <rect x="50" y="250" width="300" height="120" rx="5" fill="#FFDAB9" opacity="0.8" />
              <text x="60" y="270" className="text-sm font-medium fill-neutral-700">Scalp Cross-Section</text>
              
              {/* Hair follicles */}
              {[120, 200, 280].map((x, i) => (
                <g key={i}>
                  {/* Follicle structure */}
                  <path 
                    d={`M${x} 250 Q${x} 350, ${x-10} 350 L${x} 350 L${x+10} 350 Q${x} 350, ${x} 250 Z`} 
                    fill={i === 1 ? "#FFC0CB" : "#FFD1DC"} 
                    stroke="#333"
                    strokeWidth="0.5"
                    opacity="0.9"
                  />
                  
                  {/* Hair shaft */}
                  <line x1={x} y1="250" x2={x} y2="120" stroke="#A0522D" strokeWidth={i === 1 ? "2.5" : "1.5"} />
                  
                  {/* Mitochondria in follicle */}
                  {i === 1 && [1, 2, 3, 4].map((j) => (
                    <motion.circle
                      key={j}
                      cx={x + (j % 2 === 0 ? 5 : -5)}
                      cy={280 + j * 10}
                      r="4"
                      fill="#FF7F50"
                      opacity="0.8"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ 
                        duration: 1.5, 
                        delay: j * 0.3, 
                        repeat: Infinity,
                        repeatType: "reverse" 
                      }}
                    />
                  ))}
                </g>
              ))}
              
              {/* 650nm Red Light Waves */}
              <text x="80" y="80" className="text-sm font-medium fill-rose-600">650nm Red Light</text>
              <motion.g
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.path
                    key={`red-${i}`}
                    d={`M${50 + i*10} 90 Q${200} ${130 + i*5}, ${350 - i*10} 90`}
                    stroke="#FF7F50"
                    strokeWidth="1.5"
                    strokeDasharray="3 2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ 
                      duration: 2, 
                      delay: i * 0.2, 
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  />
                ))}
              </motion.g>
              
              {/* 850nm Infrared Light Waves */}
              <text x="80" y="140" className="text-sm font-medium fill-purple-600">850nm Infrared Light</text>
              <motion.g
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.path
                    key={`ir-${i}`}
                    d={`M${50 + i*10} 150 Q${200} ${200 + i*8}, ${350 - i*10} 150`}
                    stroke="#8A2BE2"
                    strokeWidth="1.5"
                    strokeDasharray="5 3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ 
                      duration: 2.5, 
                      delay: i * 0.3, 
                      repeat: Infinity,
                      repeatDelay: 0.5
                    }}
                  />
                ))}
              </motion.g>
              
              {/* Labels */}
              <text x="250" y="270" className="text-xs fill-neutral-600">Cellular Activation Zone</text>
              <path d="M250 275 L240 290" stroke="#333" strokeWidth="0.5" />
              
              <text x="320" y="230" className="text-xs fill-neutral-600">Penetration Depth</text>
              <path d="M320 235 L300 250" stroke="#333" strokeWidth="0.5" />
              
              <text x="140" y="380" className="text-xs fill-neutral-600">ATP Production</text>
              <path d="M140 375 L150 350" stroke="#333" strokeWidth="0.5" />
              
              {/* Efficacy indicators */}
              <motion.circle
                cx="200"
                cy="200"
                r="15"
                fill="none"
                stroke="#FF7F50"
                strokeWidth="2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Citation */}
              <text x="200" y="390" textAnchor="middle" className="text-xs fill-neutral-500">
                Visualized from peer-reviewed research on photobiomodulation
              </text>
            </svg>
          </motion.div>
        </div>

        {/* Science Foundation Section - New Dedicated Science Section */}
        <motion.div 
          className="bg-white px-8 md:px-10 pt-2 md:pt-4 pb-8 md:pb-10 rounded-xl shadow-lg border border-rose-100 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-neutral-800 mb-8 text-center md:text-left lowercase">
            the science behind photonique
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Nobel Prize Foundation */}
            <div className="text-center p-6 bg-rose-50/50 rounded-lg h-full flex flex-col items-center">
              <div className="flex justify-center mb-3">
                <svg className="w-12 h-12 text-photonique-coral" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15 8L21 9L16.5 14L17 20L12 17L7 20L7.5 14L3 9L9 8L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h4 className="text-lg font-medium mb-2 lowercase">nobel prize foundation</h4>
              <p className="text-sm text-neutral-600">
                our technology is based on the science that won the 2019 nobel prize in physiology or medicine for understanding how cells sense and adapt to oxygen availability.
              </p>
            </div>
            
            {/* Published Studies */}
            <div className="text-center p-6 bg-rose-50/50 rounded-lg h-full flex flex-col items-center">
              <div className="flex justify-center mb-3">
                <svg className="w-12 h-12 text-photonique-coral" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 2H18C19.1046 2 20 2.89543 20 4V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4C4 2.89543 4.89543 2 6 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 7H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 17H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h4 className="text-lg font-medium mb-2 lowercase">30+ published studies</h4>
              <p className="text-sm text-neutral-600">
                red light therapy for hair growth is supported by over 30 peer-reviewed clinical studies in respected medical journals worldwide.
              </p>
            </div>
            
            {/* FDA Recognition */}
            <div className="text-center p-6 bg-rose-50/50 rounded-lg h-full flex flex-col items-center">
              <div className="flex justify-center mb-3">
                <svg className="w-12 h-12 text-photonique-coral" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h4 className="text-lg font-medium mb-2 lowercase">fda recognition</h4>
              <p className="text-sm text-neutral-600">
                low-level light therapy devices like ours are recognized by the fda as safe and effective for stimulating hair follicles and promoting growth.
              </p>
            </div>
          </div>
          
          {/* Clinical Proof */}
          <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8">
            {clinicalProofData.map((item, index) => (
              <div key={index} className="flex items-start p-4 bg-rose-50 rounded-lg">
                <CheckCircle className="h-7 w-7 text-rose-600 mr-4 mt-1 flex-shrink-0" />
                <p className="text-neutral-700 text-lg leading-snug font-medium lowercase">{item.text.toLowerCase()}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-neutral-500 text-center">
            results based on internal and third-party studies. <a href="#" className="text-rose-500 hover:underline">explore our research</a>
          </p>
        </motion.div>

      </div>
    </motion.section>
  );
}

export default ScienceTechnologySection; 