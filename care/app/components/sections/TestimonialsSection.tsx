import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@remix-run/react';
import { Card } from '~/components/ui/Card';

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.h2 
            className="brand-heading text-3xl lg:text-4xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            real customers, real results
          </motion.h2>
          <p className="brand-body text-neutral-600">
            Transforming hair stories every day
          </p>
        </div>
        
        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <motion.div 
            className="bg-white rounded-lg shadow-sm p-4 border border-neutral-100 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-3xl font-light text-rose-500 mb-2">10,000+</p>
            <p className="text-sm text-neutral-600">Happy Customers</p>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-lg shadow-sm p-4 border border-neutral-100 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-3xl font-light text-rose-500 mb-2">87%</p>
            <p className="text-sm text-neutral-600">See Results by Week 8</p>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-lg shadow-sm p-4 border border-neutral-100 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-3xl font-light text-rose-500 mb-2">4.9/5</p>
            <p className="text-sm text-neutral-600">Average Rating</p>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-lg shadow-sm p-4 border border-neutral-100 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-3xl font-light text-rose-500 mb-2">3</p>
            <p className="text-sm text-neutral-600">Clinical Studies</p>
          </motion.div>
        </div>
        
        {/* Clinical Highlight */}
        <div className="bg-neutral-50 rounded-lg p-6 md:p-10 mb-16">
          <p className="text-xl md:text-2xl text-center text-neutral-800 mb-2">
            <span className="text-rose-600 font-medium">93%</span> of users reported visible improvements in hair thickness and reduced shedding after 90 days of consistent use
          </p>
        </div>
        
        {/* Featured Testimonial with Before/After */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="order-2 lg:order-1">
            <blockquote className="bg-white rounded-lg shadow-md p-6 border border-neutral-100">
              <div className="flex mb-4">
                {/* 5 Star Rating */}
                <div className="flex text-rose-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="ml-2 text-neutral-500">5.0</span>
              </div>
              
              <p className="text-neutral-700 mb-6 italic">
                "The difference in my part line and overall thickness was undeniable. I finally felt confident enough to wear my hair down again after years of hiding it."
              </p>
              
              <footer>
                <p className="font-medium">— Elise M.</p>
                <p className="text-sm text-neutral-500">Using for 4 months • Verified Buyer</p>
              </footer>
            </blockquote>
          </div>
          
          <div className="relative order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <img 
                  src="/images/before-after/before-after-3-after.png" 
                  alt="Elise M. before using care•atin" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-2 px-4 text-white text-sm">
                  BEFORE
                </div>
                <div className="editorial-image-grain"></div>
              </div>
              
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <img 
                  src="/images/before-after/before-after-3-after.png" 
                  alt="Elise M. after using care•atin" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-rose-500/70 py-2 px-4 text-white text-sm">
                  AFTER
                </div>
                <div className="editorial-image-grain"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card variant="elevated" padding="md">
            <p className="text-neutral-700 mb-4 italic">
              "I tried everything from supplements to expensive salon treatments. Nothing worked until I found care•atin. My shedding reduced by 60% in just 6 weeks."
            </p>
            <footer>
              <p className="font-medium">— Jennifer K.</p>
              <p className="text-sm text-neutral-500">Using for 3 months • Verified Buyer</p>
            </footer>
          </Card>
          
          <Card variant="elevated" padding="md">
            <p className="text-neutral-700 mb-4 italic">
              "Within months of treatment, my confidence and hair volume were returning. The device is so easy to use as part of my evening routine."
            </p>
            <footer>
              <p className="font-medium">— Sarah T.</p>
              <p className="text-sm text-neutral-500">Using for 5 months • Verified Buyer</p>
            </footer>
          </Card>
          
          <Card variant="elevated" padding="md">
            <p className="text-neutral-700 mb-4 italic">
              "After 3 months, my hairdresser asked what I was doing differently. That's when I knew it wasn't just in my head - my hair really was getting thicker!"
            </p>
            <footer>
              <p className="font-medium">— Michael R.</p>
              <p className="text-sm text-neutral-500">Using for 4 months • Verified Buyer</p>
            </footer>
          </Card>
        </div>
        
        <div className="text-center">
          <Link 
            to="/pages/reviews"
            className="font-medium text-rose-500 hover:text-rose-600 underline underline-offset-4"
          >
            See More Transformation Stories
          </Link>
        </div>
      </div>
      
      {/* Abstract background elements */}
      <div className="absolute top-1/4 left-0 w-32 h-32 bg-rose-50 rounded-full opacity-50 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-32 h-32 bg-rose-50 rounded-full opacity-50 blur-3xl"></div>
    </section>
  );
}
