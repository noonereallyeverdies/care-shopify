import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@remix-run/react';
import { ArrowRight } from 'lucide-react';
import type { HomepageProduct } from '~/routes/($locale)._index';

interface ProductHighlightProps {
  product: HomepageProduct | null;
}

export function ProductHighlight({ product }: ProductHighlightProps) {
  if (!product) {
    console.log('ProductHighlight: Product data not available, rendering fallback');
    return (
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="brand-heading text-3xl lg:text-4xl mb-6">
              our revolutionary device
            </h2>
            <p className="brand-body text-neutral-600">
              Elegantly designed, scientifically engineered for maximum results with minimal effort.
            </p>
            <div className="mt-8">
              <Link 
                to="/collections/all"
                className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-full font-medium shadow-lg transition-all hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 text-center text-lg"
              >
                Browse Collection
                <ArrowRight size={18} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const featuredImage = product?.featuredImage?.url || '/images/PRODUCTPHOTOT.webp';
  
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="brand-heading text-3xl lg:text-4xl mb-6">
            revolutionary technology for exceptional results
          </h2>
          <p className="brand-body text-neutral-600">
            Elegantly designed, scientifically engineered for maximum results with minimal effort.
            Transform your hair in just 15 minutes, 3 times a week.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            {/* Product image with editorial styling */}
            <div className="relative aspect-square overflow-hidden">
              <img 
                src={featuredImage}
                alt="Care•atin device with editorial styling" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[url('/textures/film-grain.png')] opacity-20 mix-blend-overlay"></div>
            </div>
            
            {/* Floating product specs */}
            <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 bg-white p-6 shadow-lg w-64 hidden lg:block">
              <p className="text-sm text-neutral-500 mb-2">Wavelength</p>
              <p className="brand-heading text-xl">630-660 nm</p>
              <p className="text-sm text-neutral-600 mb-4">Scientifically proven to stimulate follicle renewal</p>
              
              <p className="text-sm text-neutral-500 mb-2">Treatment Time</p>
              <p className="brand-heading text-xl">15 min</p>
              <p className="text-sm text-neutral-600 mb-4">Just 3 times per week while watching your favorite show</p>
              
              <p className="text-sm text-neutral-500 mb-2">Results Timeline</p>
              <p className="brand-heading text-xl">90 days</p>
              <p className="text-sm text-neutral-600">To see visible transformation and renewed confidence</p>
            </div>
          </div>
          
          <div>
            <h3 className="brand-heading text-3xl mb-6">
              precision engineered for results
            </h3>
            
            <ul className="space-y-6">
              <li className="flex">
                <div className="mr-4 text-rose-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="brand-heading text-xl mb-2">medical-grade light therapy</h4>
                  <p className="brand-body text-neutral-600">
                    Precisely calibrated LEDs deliver the exact wavelength needed for cellular activation, 
                    giving you results that drugstore products simply can't match.
                  </p>
                </div>
              </li>
              
              <li className="flex">
                <div className="mr-4 text-rose-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="brand-heading text-xl mb-2">effortless integration</h4>
                  <p className="brand-body text-neutral-600">
                    Lightweight, comfortable design fits seamlessly into your routine—use while 
                    watching TV, reading, or checking emails. No disruption to your daily life.
                  </p>
                </div>
              </li>
              
              <li className="flex">
                <div className="mr-4 text-rose-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="brand-heading text-xl mb-2">proven & trusted</h4>
                  <p className="brand-body text-neutral-600">
                    Backed by 7+ years of research and multiple clinical studies, with 
                    93% of users reporting significant improvements in their hair confidence.
                  </p>
                </div>
              </li>
            </ul>
            
            <div className="mt-10">
              <div className="text-center mb-4 text-rose-600">
                <p className="text-sm font-medium">
                  <span className="animate-pulse inline-block mr-2">●</span>
                  Limited units available at current pricing
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 justify-center mb-6">
                <div className="flex items-center bg-neutral-50 px-4 py-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-500 mr-2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  <span className="text-sm">60-Day Guarantee</span>
                </div>
                <div className="flex items-center bg-neutral-50 px-4 py-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-500 mr-2">
                    <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                    <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                    <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                    <line x1="12" y1="20" x2="12" y2="20"></line>
                  </svg>
                  <span className="text-sm">Free Shipping</span>
                </div>
                <div className="flex items-center bg-neutral-50 px-4 py-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-500 mr-2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span className="text-sm">1-Year Warranty</span>
                </div>
              </div>
              
              <Link 
                to={`/products/${product?.handle || 'photonique-touch'}`}
                className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-full font-medium shadow-lg transition-all hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 text-center text-lg"
              >
                Start Your Transformation Today
                <ArrowRight size={18} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
