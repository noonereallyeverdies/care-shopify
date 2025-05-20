import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Zap } from 'lucide-react'; // Zap for technology benefits, CheckCircle for clinical proof

const technologyBenefits = [
  { text: "boosts blood flow, rejuvenating follicles for a healthier scalp." },
  { text: "delivers nutrient-rich light directly to the roots, restoring vibrancy and fullness." },
  { text: "activates cellular energy production, giving your hair the vitality it needs to shine." },
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
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-neutral-900 mb-4 lowercase">
            elite light science for the modern woman
          </h2>
          <p className="text-lg md:text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed">
            photonique touch uses photobiomodulation—cutting-edge light energy that transforms hair from the inside out. our advanced technology:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center mb-12 md:mb-16">
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

          {/* Scientific Visualization Placeholder */}
          <motion.div 
            className="bg-neutral-200 rounded-xl aspect-video lg:aspect-square flex items-center justify-center text-neutral-500"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-xl p-4 text-center">Scientific visualization of light reaching follicle depths</p>
          </motion.div>
        </div>

        {/* Clinical Proof */}
        <motion.div 
          className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-rose-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-neutral-800 mb-6 text-center md:text-left">
            Clinical Proof:
          </h3>
          <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8">
            {clinicalProofData.map((item, index) => (
              <div key={index} className="flex items-start p-4 bg-rose-50 rounded-lg">
                <CheckCircle className="h-7 w-7 text-rose-600 mr-4 mt-1 flex-shrink-0" />
                <p className="text-neutral-700 text-lg leading-snug font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
}

export default ScienceTechnologySection; 