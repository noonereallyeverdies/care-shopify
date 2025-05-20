import React from 'react';
import { motion } from 'framer-motion';
import { ListChecks, Package, ShieldCheck } from 'lucide-react'; // Icons for subheadings

const deviceDetailsData = [
  { label: "Dimensions", value: '7.5" × 3.2" × 1.8"' },
  { label: "Weight", value: "8.4 oz (238g)" },
  { label: "Battery", value: "Rechargeable lithium-ion (12+ treatments per charge)" },
  { label: "Treatment Area", value: '3" diameter light array' },
  { label: "Treatment Time", value: "10 minutes per session" },
  { label: "Recommended Use", value: "3 sessions per week" },
];

const whatsIncludedData = [
  "photonique touch device",
  "charging base & usb-c cable",
  "protective travel case",
  "user manual & quick start guide",
  "complimentary treatment tracking app",
];

export function ProductSpecificationsSection() {
  return (
    <motion.section 
      className="py-16 md:py-24 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-neutral-900 mb-4 lowercase">
            product specifications
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 mb-12 md:mb-16">
          {/* Device Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <ListChecks className="h-8 w-8 text-rose-600 mr-3" />
              <h3 className="text-2xl font-semibold text-neutral-800">Device Details</h3>
            </div>
            <ul className="space-y-3">
              {deviceDetailsData.map((item, index) => (
                <li key={index} className="flex justify-between border-b border-neutral-200 pb-2">
                  <span className="text-neutral-600 font-medium">{item.label}:</span>
                  <span className="text-neutral-800 text-right">{item.value}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* What's Included */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <Package className="h-8 w-8 text-rose-600 mr-3" />
              <h3 className="text-2xl font-semibold text-neutral-800">What's Included</h3>
            </div>
            <ul className="space-y-3">
              {whatsIncludedData.map((item, index) => (
                <li key={index} className="flex items-center text-neutral-800">
                  <svg className="h-4 w-4 text-rose-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Warranty */}
        <motion.div 
          className="text-center border-t border-neutral-200 pt-8 mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center text-neutral-700">
            <ShieldCheck className="h-6 w-6 text-rose-600 mr-2" />
            <p className="text-lg font-medium">Warranty: 2-year manufacturer warranty with registration</p>
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
}

export default ProductSpecificationsSection; 