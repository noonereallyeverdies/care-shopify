import React from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { PrimaryCTA, CTAContainer } from '~/components/ui/PrimaryCTA';
import type { HomepageProduct } from '~/app/routes/($locale)._index';

interface ProductHighlightProps {
  product: HomepageProduct | null;
}

export function ProductHighlight({ product }: ProductHighlightProps) {
  const productName = product?.title || 'photonique touch™';
  const productDescription = 'Our revolutionary device combines red light therapy, scalp massage, and precise serum application for your healthiest hair.';
  const productImage = product?.featuredImage?.url || '/images/product.webp';
  
  const trustBadges = [
    {
      icon: Truck,
      text: 'free us shipping',
      description: 'on orders more than $20'
    },
    {
      icon: RotateCcw,
      text: 'no-hassle return policy',
      description: '60 days to try risk-free'
    },
    {
      icon: ShieldCheck,
      text: '1 year premium warranty',
      description: 'free replacement for any product issues'
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="brand-heading text-3xl md:text-4xl mb-3">
            start your transformation <span className="text-rose-600">today</span>
          </h2>
          <p className="brand-body max-w-2xl mx-auto">
            Don't wait until you've lost more. Every day you delay is another day without 
            progress toward the hair you deserve.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Product image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-3xl overflow-hidden shadow-lg border border-neutral-100 bg-gradient-to-br from-white to-neutral-50">
              <img 
                src={productImage} 
                alt={productName} 
                className="w-full h-auto object-contain"
              />
            </div>
            
            <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-rose-600 text-white px-4 py-2 rounded-full text-sm md:text-base font-medium shadow-md">
              30-day results
            </div>
          </motion.div>

          {/* Product info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-neutral-100">
              <h3 className="text-2xl font-medium mb-3 lowercase">
                meet <span className="text-rose-600">{productName}</span>
              </h3>
              
              <p className="text-neutral-700 mb-6">
                {productDescription}
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-2">
                  <Check size={18} className="text-rose-600" />
                  <span className="text-neutral-700">Clinically proven wavelengths for hair growth</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={18} className="text-rose-600" />
                  <span className="text-neutral-700">Simple 5-minute treatment, 3x per week</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={18} className="text-rose-600" />
                  <span className="text-neutral-700">Visible results in 8-12 weeks</span>
                </div>
              </div>
              
              <div className="border-t border-neutral-100 pt-6 mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-3xl font-semibold text-neutral-900">$199</div>
                  <div className="text-lg line-through text-neutral-400">$249</div>
                  <div className="bg-rose-100 text-rose-600 px-2 py-1 rounded text-sm">Save $50</div>
                </div>
                
                <p className="text-sm text-neutral-500 mb-6">
                  Free shipping • 60-day money back guarantee • 1-year warranty
                </p>
                
                <div className="flex flex-col gap-3">
                  <PrimaryCTA 
                    text="Add to Cart" 
                    href="/cart/add"
                    size="large"
                    className="w-full justify-center"
                  />
                  
                  <button className="text-rose-600 text-sm underline">
                    View Details
                  </button>
                </div>
              </div>
              
              <div className="bg-neutral-50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="text-sm text-neutral-600">
                    <span className="font-medium">In stock</span> - Orders ship in 1-2 business days
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Trust badges */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          {trustBadges.map((badge, index) => (
            <motion.div 
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="bg-white h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-neutral-100">
                <badge.icon size={24} className="text-rose-600" />
              </div>
              <h4 className="brand-heading text-lg mb-1">{badge.text}</h4>
              <p className="text-sm text-neutral-600">{badge.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Final CTA */}
        <div className="mt-20 text-center">
          <CTAContainer
            subtitle="Take our 60-second quiz to get a custom regimen for your unique hair concerns"
          >
            <PrimaryCTA
              text="Begin Your Journey Now"
              size="large"
            />
          </CTAContainer>
        </div>
      </div>
    </section>
  );
} 