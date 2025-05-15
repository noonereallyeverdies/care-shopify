import {Image, Money, ShopifyAnalyticsProduct} from '@shopify/hydrogen';
import {Link} from '@remix-run/react';
import {motion, useAnimation} from 'framer-motion';
import React, {useState, useEffect, useRef} from 'react';
import type {Product} from '@shopify/hydrogen/storefront-api-types';

export function ProductCard({
  product,
  label,
  className,
  loading,
  onClick,
}: {
  product: Product;
  label?: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [rewardVariant, setRewardVariant] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    if (hovered) {
      setRewardVariant(Math.floor(Math.random() * 4));
    }
  }, [hovered]);

  const playInteractionSound = () => {
    if (typeof window !== 'undefined') {
      try {
        const audio = new Audio('/sounds/interaction.mp3');
        audio.volume = 0.15;
        audio.play().catch(() => {});
      } catch (e) {}
    }
  };

  const onMouseEnter = () => {
    setHovered(true);
    playInteractionSound();
    controls.start('hover');
  };

  const onMouseLeave = () => {
    setHovered(false);
    controls.start('rest');
  };

  const firstVariant = product.variants?.nodes?.[0];
  if (!firstVariant) return null;

  // Ensure we have proper price data
  const price = firstVariant.price && typeof firstVariant.price.amount === 'string' 
    ? {
        amount: firstVariant.price.amount,
        currencyCode: firstVariant.price.currencyCode
      }
    : null;
    
  const compareAtPrice = firstVariant.compareAtPrice && typeof firstVariant.compareAtPrice.amount === 'string'
    ? {
        amount: firstVariant.compareAtPrice.amount,
        currencyCode: firstVariant.compareAtPrice.currencyCode
      }
    : null;
    
  const isDiscounted = compareAtPrice != null && 
    price != null && 
    parseFloat(compareAtPrice.amount) > parseFloat(price.amount);

  let cardLabel = label;
  if (!cardLabel) {
    if (isDiscounted) cardLabel = 'Sale';
  }

  const spring = {
    type: "spring",
    stiffness: 300,
    damping: 25,
    mass: 0.5
  };

  const getCardAnimationVariant = () => {
    switch(rewardVariant) {
      case 0: return { y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.01)", transition: spring };
      case 1: return { scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)", transition: { ...spring, stiffness: 250, damping: 20 } };
      case 2: return { y: -5, x: 2, rotate: 0.5, boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.1)", transition: spring };
      case 3: return { y: -10, boxShadow: "0 30px 40px -15px rgba(0, 0, 0, 0.1)", transition: { ...spring, stiffness: 350, damping: 30 } };
      default: return { y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.01)", transition: spring };
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`group relative flex flex-col rounded-2xl overflow-hidden ${className}`}
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{...spring, duration: 0.8, delay: Math.random() * 0.2}}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      whileHover={getCardAnimationVariant()}
    >
      <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] rounded-2xl -z-10"></div>
      
      <Link
        onClick={onClick}
        to={`/products/${product.handle}`}
        prefetch="intent"
      >
        <div className="relative pt-6 px-6 pb-3 z-10">
          <div className="rounded-xl overflow-hidden bg-neutral-50 relative aspect-[4/5]">
            {cardLabel === 'Sale' && (
              <motion.div
                className="absolute top-3 right-3 bg-rose-500 text-white text-xs font-medium px-2 py-1 rounded-full z-10"
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                transition={{...spring, duration: 0.4, delay: 0.1}}
              >
                Sale
              </motion.div>
            )}
            {cardLabel && cardLabel !== 'Sale' && (
              <motion.div 
                className="absolute top-3 left-3 z-10 px-3 py-1.5 text-xs font-medium rounded-full bg-neutral-100 text-neutral-800"
                initial={{opacity: 0, y: -10}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.2}}
              >
                {cardLabel}
              </motion.div>
            )}

            {product.featuredImage && (
              <motion.div
                className="h-full w-full"
                animate={controls}
                variants={{
                  rest: {scale: 1},
                  hover: {scale: 1.05}
                }}
                transition={spring}
              >
                <Image
                  className="object-cover w-full h-full"
                  data={product.featuredImage}
                  alt={product.featuredImage.altText || product.title}
                  aspectRatio="4/5"
                  loading={loading}
                  sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
                />
              </motion.div>
            )}
          </div>

          <div className="mt-4 space-y-1 text-left relative z-10">
            {product?.vendor && (
              <motion.p
                className="text-neutral-500 text-xs tracking-wider uppercase"
                animate={controls} variants={{rest: {y: 0}, hover: {y: -2}}} transition={spring}
              >
                {product.vendor}
              </motion.p>
            )}
            <motion.h3
              className="text-neutral-900 font-medium text-base md:text-base lowercase tracking-wide"
              animate={controls} variants={{rest: {y: 0}, hover: {y: -2}}} transition={{...spring, delay: 0.05}}
            >
              {product.title}
            </motion.h3>
            <motion.div
              className="flex items-baseline gap-2"
              animate={controls} variants={{rest: {y: 0}, hover: {y: -2}}} transition={{...spring, delay: 0.1}}
            >
              <span className={`${isDiscounted ? 'text-rose-600' : 'text-neutral-900'} text-sm font-medium`}>
                {price ? (
                  <Money data={price} withoutTrailingZeros />
                ) : (
                  'Price not available'
                )}
              </span>
              {isDiscounted && compareAtPrice && (
                <span className="line-through text-neutral-400 text-sm">
                  <Money data={compareAtPrice} withoutTrailingZeros />
                </span>
              )}
            </motion.div>
          </div>
        </div>

        <motion.div
          className="px-6 pb-6"
          animate={controls}
          variants={{
            rest: {opacity: 0, y: 10},
            hover: {opacity: 1, y: 0}
          }}
          transition={{...spring, delay: 0.1}}
        >
          <motion.button
            className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-medium py-2 px-4 rounded-full mt-2 transition-colors shadow-sm"
            whileHover={{scale: 1.02, transition: spring}}
            whileTap={{scale: 0.98, transition: spring}}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onClick) {
                onClick();
              } else {
                window.location.href = `/cart/${firstVariant.id}:1`;
              }
            }}
          >
            Add to bag
          </motion.button>
        </motion.div>
      </Link>
    </motion.div>
  );
}
