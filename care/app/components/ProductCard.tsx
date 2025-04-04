import {Image, Money, ShopifyAnalyticsProduct} from '@shopify/hydrogen';
import {Link} from '@remix-run/react';
import {motion} from 'framer-motion';
import React, {useState} from 'react';
import type {MoneyV2, Product} from '@shopify/hydrogen/storefront-api-types';

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
  loading?: HTMLImageElement['loading'];
  onClick?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  let cardLabel;

  const firstVariant = product.variants.nodes[0];
  if (!firstVariant) return null;

  const {price, compareAtPrice} = firstVariant;
  if (label) {
    cardLabel = label;
  } else if (compareAtPrice) {
    cardLabel = 'Sale';
  } else if (product.isNew) {
    cardLabel = 'New';
  }

  const productAnalytics: ShopifyAnalyticsProduct = {
    productGid: product.id,
    variantGid: firstVariant.id,
    name: product.title,
    variantName: firstVariant.title,
    brand: product.vendor,
    price: firstVariant.price.amount,
    quantity: 1,
  };

  return (
    <motion.div
      ref={cardRef}
      className={`group relative flex flex-col rounded-2xl overflow-hidden ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{opacity: 0, y: 20}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: "-50px"}}
      transition={{duration: 0.6, ease: [0.165, 0.84, 0.44, 1]}}
    >
      {/* Add subtle glass background with soft shadow */}
      <div className="absolute inset-0 bg-stone-50/40 backdrop-blur-sm -z-10"></div>
      
      <Link
        onClick={onClick}
        to={`/products/${product.handle}`}
        prefetch="intent"
      >
        {/* Image container with smooth animation */}
        <div className="relative rounded-xl overflow-hidden mb-4 bg-white">
          {cardLabel && (
            <motion.div 
              className="absolute top-2 left-2 z-10 px-3 py-1.5 text-xs font-medium rounded-full bg-rose-50 text-rose-600"
              initial={{opacity: 0, y: -10}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.2}}
            >
              {cardLabel}
            </motion.div>
          )}
          
          <motion.div 
            className="aspect-[4/5] bg-white relative"
            whileHover={{scale: 1.03}}
            transition={{duration: 0.4, ease: [0.165, 0.84, 0.44, 1]}}
          >
            {product.featuredImage && (
              <Image
                className="object-cover w-full h-full"
                sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
                aspectRatio="4/5"
                data={product.featuredImage}
                alt={product.featuredImage.altText || product.title}
                loading={loading}
              />
            )}
          </motion.div>
        </div>

        <div className="px-4 pb-6">
          {/* Vendor with subtle styling */}
          <div className="text-primary/60 text-xs tracking-wide uppercase mb-1">
            {product.vendor}
          </div>
          
          {/* Title with improved typography */}
          <h3 className="text-primary text-base font-medium mb-1 leading-tight">
            {product.title}
          </h3>
          
          {/* Price with sale indicator */}
          <div className="flex gap-3 items-center">
            <span className="text-lg font-medium text-primary">
              <Money 
                withoutTrailingZeros 
                data={price as MoneyV2} 
              />
            </span>
            
            {compareAtPrice && (
              <span className="text-sm text-primary/60 line-through">
                <Money 
                  withoutTrailingZeros 
                  data={compareAtPrice as MoneyV2} 
                />
              </span>
            )}
          </div>
        </div>
      </Link>
      
      {/* Add-to-cart action button with hover effect */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 flex justify-center transform translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out pb-4"
        initial={{y: 20, opacity: 0}}
        animate={isHovered ? {y: 0, opacity: 1} : {y: 20, opacity: 0}}
        transition={{duration: 0.3}}
      >
        <button 
          className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors shadow-apple-sm"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = `/cart?lines=${firstVariant.id}:1`;
          }}
        >
          Add to Cart
        </button>
      </motion.div>
    </motion.div>
  );
}
