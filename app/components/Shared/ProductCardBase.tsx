import {Money} from '@shopify/hydrogen';
import {Link} from '@remix-run/react';
import type {Product} from '@shopify/hydrogen/storefront-api-types';
import { LazyHydrate } from '~/components/LazyHydrate';
import { EnhancedProductImage } from '~/components/EnhancedImage';

/**
 * Shared UI component for product cards
 * Can be used across product listings, featured products, and related products
 */
export function ProductCardBase({
  product,
  label,
  className,
  loading,
  onClick,
  isDiscounted,
  price,
  compareAtPrice,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  renderActionButton,
}: {
  product: Product;
  label?: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  onClick?: () => void;
  isDiscounted: boolean;
  price: any;
  compareAtPrice?: any;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  renderActionButton?: (product: Product) => React.ReactNode;
}) {
  const priority = loading === 'eager';
  
  return (
    <div 
      className={`group relative flex flex-col rounded-2xl overflow-hidden ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] rounded-2xl -z-10"></div>
      
      <Link
        onClick={onClick}
        to={`/products/${product.handle}`}
        prefetch="intent"
      >
        <div className="relative pt-6 px-6 pb-3 z-10">
          <div className="rounded-xl overflow-hidden bg-neutral-50 relative aspect-4/5">
            {label === 'Sale' && (
              <div className="absolute top-3 right-3 bg-rose-500 text-white text-xs font-medium px-2 py-1 rounded-full z-10">
                Sale
              </div>
            )}
            {label && label !== 'Sale' && (
              <div className="absolute top-3 left-3 z-10 px-3 py-1.5 text-xs font-medium rounded-full bg-neutral-100 text-neutral-800">
                {label}
              </div>
            )}

            {product.featuredImage && (
              <div className={`h-full w-full transition-transform duration-300 ${isHovered ? 'scale-105' : 'scale-100'}`}>
                <EnhancedProductImage
                  data={product.featuredImage}
                  alt={product.featuredImage.altText || product.title}
                  className="object-cover w-full h-full"
                  sizes="(min-width: 1536px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  priority={priority}
                  width={600}
                  height={750}
                  imageType="product"
                />
              </div>
            )}
          </div>

          <div className="mt-4 space-y-1 text-left relative z-10">
            {product?.vendor && (
              <p className="text-neutral-500 text-xs tracking-wider uppercase">
                {product.vendor}
              </p>
            )}
            <h3 className="text-neutral-900 font-medium text-base md:text-base lowercase tracking-wide">
              {product.title}
            </h3>
            <div className="flex items-baseline gap-2">
              <span className={`${isDiscounted ? 'text-rose-600' : 'text-neutral-900'} text-sm font-medium`}>
                <Money data={price} withoutTrailingZeros />
              </span>
              {isDiscounted && compareAtPrice && (
                <span className="line-through text-neutral-400 text-sm">
                  <Money data={compareAtPrice} withoutTrailingZeros />
                </span>
              )}
            </div>
          </div>
        </div>

        <LazyHydrate whenVisible>
          <div className={`px-6 pb-6 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            {renderActionButton ? (
              renderActionButton(product)
            ) : (
              <button
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-medium py-2 px-4 rounded-full mt-2 transition-colors shadow-sm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (onClick) {
                    onClick();
                  } else {
                    const firstVariant = product.variants.nodes[0];
                    if (firstVariant) {
                      window.location.href = `/cart/${firstVariant.id}:1`;
                    }
                  }
                }}
              >
                Add to bag
              </button>
            )}
          </div>
        </LazyHydrate>
      </Link>
    </div>
  );
}
