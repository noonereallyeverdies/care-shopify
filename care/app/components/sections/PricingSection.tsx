import React from 'react';
import { motion } from 'framer-motion';
import {
  ShopPayButton,
  CartForm,
} from '@shopify/hydrogen';
import {
  type Product,
  type ProductVariant,
} from '@shopify/hydrogen/storefront-api-types';
import { Clock, Truck, ShieldCheck } from 'lucide-react';
import { Button } from '~/components/ui/buttons/Button';

// Assuming HomepageProduct has a similar structure to Product or required fields
import type { HomepageProduct } from '~/routes/($locale)._index'; 

// Animation variants for badges
const badgeAnimation = {
  scale: [1, 1.05, 1],
  transition: { duration: 1.5, repeat: Infinity, repeatType: 'loop' as const },
};

const truckAnimation = {
  x: [0, 3, 0, -3, 0],
  transition: { duration: 2, repeat: Infinity, repeatType: 'loop' as const, ease: 'easeInOut' },
}

// Define standard fade-in-up variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

// Define stagger container variants
const staggerContainer = {
  hidden: {}, // Can be empty
  visible: {
    transition: {
      staggerChildren: 0.15,
    }
  }
};

// Define props for the component
interface PricingSectionProps {
  product: HomepageProduct;
  storeDomain: string;
}

export function PricingSection({ product, storeDomain }: PricingSectionProps) {
  // Find the first available variant ID
  // Ensure variants and nodes exist and have length
  const firstVariant = product?.variants?.nodes?.[0];
  const firstVariantId = firstVariant?.id;

  if (!product || !firstVariantId) {
    // Handle case where product or variant ID is missing
    // You might want to return null or a placeholder
    console.error('PricingSection: Product or Variant ID is missing.');
    return null; 
  }

  const shopPayVariantIds = [firstVariantId]; // ShopPayButton expects an array

  return (
    <section className="py-16 md:py-24 bg-background text-foreground">
      <div className="container mx-auto px-6 text-center">
        {/* Optional Title */}
        {/* <h2 className="text-2xl md:text-3xl font-light mb-8 lowercase">unlock your hair's potential</h2> */}
        
        {/* Pricing Display with animation */}
        <motion.div 
          className="mb-8 md:mb-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <span className="text-5xl md:text-7xl font-serif font-medium text-primary tracking-tight">
            {firstVariant.price?.amount ? `$${parseInt(firstVariant.price.amount)}` : '$89'}
          </span>
          {firstVariant.compareAtPrice && (
            <span className="ml-3 text-2xl md:text-3xl font-serif font-normal text-neutral-400 line-through tracking-tight">
              {`$${parseInt(firstVariant.compareAtPrice.amount)}`}
            </span>
          )}
        </motion.div>

        {/* Trust Badges container with animation */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-10 mb-10 md:mb-14 text-sm text-neutral-600"
          variants={staggerContainer} // Stagger the badges
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {/* Each badge needs motion.div and item variant */}
          <motion.div variants={fadeInUp} className="flex items-center gap-2" animate={badgeAnimation}>
            <Clock className="w-5 h-5 text-primary flex-shrink-0" />
            <span>90-day money-back guarantee</span>
          </motion.div>
          <motion.div variants={fadeInUp} className="flex items-center gap-2" animate={truckAnimation}>
            <Truck className="w-5 h-5 text-primary flex-shrink-0" />
            <span>free priority shipping</span>
          </motion.div>
          <motion.div variants={fadeInUp} className="flex items-center gap-2" animate={badgeAnimation}>
            <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" />
            <span>fda-cleared technology</span>
          </motion.div>
        </motion.div>

        {/* CTA Buttons Container */}
        <motion.div
          className="max-w-xs mx-auto flex flex-col gap-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          {/* Use CartForm for Add To Cart */}
          <CartForm 
            route="/cart" 
            inputs={{ lines: [{ merchandiseId: firstVariantId, quantity: 1 }] }} 
            action={CartForm.ACTIONS.LinesAdd}
          >
            {(fetcher: any) => (
              <Button
                type="submit"
                variant="primary"
                className="w-full shadow-lg !text-base !font-semibold"
                disabled={fetcher.state !== 'idle'}
              >
                {fetcher.state !== 'idle' ? 'adding...' : `add to cart - ${firstVariant.price?.amount ? `$${parseInt(firstVariant.price.amount)}` : '$89'}`}
              </Button>
            )}
          </CartForm>

          {/* Shop Pay Button */}
          <ShopPayButton
            storeDomain={storeDomain}
            variantIds={shopPayVariantIds}
            className="w-full shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
} 