import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';
import type { HomepageProduct } from '~/queries/homepage';

interface ProductHighlightProps {
  product: HomepageProduct;
}

export function ProductHighlight({ product }: ProductHighlightProps) {
  // Format currency
  const formatPrice = (amount: string, currencyCode: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
    }).format(parseFloat(amount));
  };

  // Get price from product
  const price = product?.priceRange?.minVariantPrice ? 
    formatPrice(
      product.priceRange.minVariantPrice.amount,
      product.priceRange.minVariantPrice.currencyCode
    ) : 
    '$299';

  return (
    <section className="py-16 md:py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <h2 className="text-3xl md:text-4xl font-light mb-4 text-stone-800">The Photonique Touch</h2>
            <p className="text-lg text-stone-600 mb-6">
              Our cutting-edge red light therapy device designed for effective, at-home hair restoration.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="text-rose-500 mr-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-stone-700">Clinical-grade red light technology (650-670nm wavelength)</p>
              </div>
              <div className="flex items-start">
                <div className="text-rose-500 mr-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-stone-700">FDA-cleared and dermatologist recommended</p>
              </div>
              <div className="flex items-start">
                <div className="text-rose-500 mr-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-stone-700">Cordless design with 30+ treatments per charge</p>
              </div>
              <div className="flex items-start">
                <div className="text-rose-500 mr-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-stone-700">Built-in timer and automatic shut-off</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="bg-stone-50 p-4 rounded-lg flex-1 text-center">
                <span className="block text-stone-500 text-sm mb-1">Starting at</span>
                <span className="text-2xl font-light text-stone-800">{price}</span>
              </div>
              <div className="bg-stone-50 p-4 rounded-lg flex-1 text-center">
                <span className="block text-stone-500 text-sm mb-1">Free Shipping</span>
                <span className="text-stone-800">US & Canada</span>
              </div>
              <div className="bg-stone-50 p-4 rounded-lg flex-1 text-center">
                <span className="block text-stone-500 text-sm mb-1">Warranty</span>
                <span className="text-stone-800">1 Year</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={`/products/${product.handle}`}
                className="bg-rose-500 text-white text-center py-3 px-8 rounded-full hover:bg-rose-600 transition-colors font-medium"
              >
                Shop Now
              </Link>
              <Link
                to="/pages/faq"
                className="bg-white border border-stone-300 text-stone-700 text-center py-3 px-8 rounded-full hover:bg-stone-50 transition-colors font-medium"
              >
                Learn More
              </Link>
            </div>
          </div>
          
          <div className="relative">
            {/* Product image placeholder */}
            <div className="bg-stone-100 rounded-lg aspect-square flex items-center justify-center">
              {product.featuredImage?.url ? (
                <img 
                  src={product.featuredImage.url} 
                  alt={product.featuredImage.altText || product.title}
                  className="object-cover w-full h-full rounded-lg"
                />
              ) : (
                <span className="text-stone-400">Product Image</span>
              )}
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-rose-50 rounded-full -z-10"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-stone-100 rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductHighlight;