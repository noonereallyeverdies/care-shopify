import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@remix-run/react';
import { Tag, CheckCircle, ShieldCheck, ShoppingCart, CreditCard } from 'lucide-react'; // Icons for various elements

// Simple ArrowRight component (can be moved to a shared util if used in multiple places)
function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props} className={`ml-2 h-5 w-5 ${props.className || ''}`}>
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FinalConversionSection() {
  return (
    <motion.section 
      className="py-16 md:py-24 bg-gradient-to-b from-rose-50 via-white to-white" // Subtle gradient background
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-neutral-900 mb-6 lowercase">
            begin your hair restoration journey
          </h2>
          <p className="text-lg md:text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed mb-8">
            transform your hair with professional-grade light therapy in the comfort of your home. the photonique touch offers clinically proven technology at a fraction of in-office treatment costs.
          </p>
        </motion.div>

        {/* Pricing & Offer Block */}
        <motion.div 
          className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-rose-200 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="mb-6">
            <span className="text-4xl md:text-5xl font-bold text-rose-600">$89.00</span>
            <span className="ml-2 text-xl text-neutral-500 line-through">$129.00</span>
          </div>
          <div className="mb-6">
            <div className="inline-flex items-center bg-rose-100 text-rose-700 px-4 py-2 rounded-full font-medium text-lg">
              <Tag className="h-5 w-5 mr-2" />
              Special Offer: use code <strong className="mx-1">NEWGROWTH</strong> for free shipping
            </div>
          </div>
          <div className="flex items-center justify-center text-neutral-700">
            <ShieldCheck className="h-6 w-6 text-green-600 mr-2" />
            <p className="font-medium">90-day satisfaction guarantee—if you don't see improvement, return for a full refund.</p>
          </div>
        </motion.div>

        {/* Purchase Options & Trust Badges */}
        <motion.div 
          className="max-w-xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold text-neutral-800 mb-4">Purchase Options:</h3>
          <ul className="space-y-2 text-neutral-700 list-disc list-inside text-left inline-block mb-6">
            <li>One-time purchase</li>
            <li>Subscribe & save 15% on replacement parts and accessories</li>
          </ul>
          
          {/* Trust Badges Placeholder */}
          <div className="my-6 py-4 border-y border-neutral-200">
            <p className="text-neutral-500 text-sm italic">
              (Trust badges showing secure payment, satisfaction guarantee, and free shipping)
            </p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link
            to="/products/photonique-touch" // Example product link, update as needed
            prefetch="intent"
            className="inline-flex items-center justify-center bg-rose-600 px-10 py-4 text-xl font-medium text-white rounded-full hover:bg-rose-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto mb-4 sm:mb-0 sm:mr-4"
          >
            <ShoppingCart className="h-6 w-6 mr-2" />
            shop now
          </Link>
          <Link
            to="/financing-options" // Placeholder link
            prefetch="intent"
            className="inline-flex items-center justify-center border-2 border-rose-500 text-rose-600 px-8 py-3.5 text-lg font-medium rounded-full hover:bg-rose-500 hover:text-white transition-colors w-full sm:w-auto"
          >
            learn more about financing options
          </Link>
        </motion.div>

      </div>
    </motion.section>
  );
}

export default FinalConversionSection; 