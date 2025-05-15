import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Star, Quote, Calendar, CheckCircle } from 'lucide-react';

interface EnhancedTestimonialCardProps {
  name: string;
  avatar?: string;
  rating: number;
  usageDuration: string;
  quote: string;
  issue?: string;
  results?: string;
  isVerified?: boolean;
}

/**
 * An improved testimonial card that displays the full quote with expand/collapse functionality
 * Replaces the problematic truncated testimonials
 */
export function EnhancedTestimonialCard({
  name,
  avatar,
  rating,
  usageDuration,
  quote,
  issue,
  results,
  isVerified = true
}: EnhancedTestimonialCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // If quote is short, no need for expansion
  const needsExpansion = quote.length > 120;
  
  // Create a collapsed version that includes a complete thought
  const createCollapsedVersion = () => {
    if (!needsExpansion) return quote;
    
    // Find a sensible breakpoint around 100 chars (at the end of a sentence if possible)
    const breakPoints = ['.', '!', '?', ',', ' '];
    let breakIndex = 100;
    
    for (const point of breakPoints) {
      const index = quote.indexOf(point, 80);
      if (index > 0 && index < 120) {
        breakIndex = index + 1;
        break;
      }
    }
    
    return quote.substring(0, breakIndex).trim();
  };
  
  const collapsedQuote = createCollapsedVersion();
  const displayQuote = isExpanded || !needsExpansion ? quote : collapsedQuote;
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6 overflow-hidden">
      {/* Header with user info */}
      <div className="flex items-center mb-4">
        {avatar ? (
          <img 
            src={avatar} 
            alt={name} 
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mr-4 text-neutral-400">
            <User size={20} />
          </div>
        )}
        
        <div>
          <div className="flex items-center">
            <h4 className="font-medium text-neutral-800">{name}</h4>
            {isVerified && (
              <span className="ml-2 text-blue-500" title="Verified Customer">
                <CheckCircle size={14} />
              </span>
            )}
          </div>
          
          <div className="flex items-center text-sm text-neutral-500">
            <span className="flex mr-3">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={12} 
                  className={i < rating ? 'text-amber-400 fill-amber-400' : 'text-neutral-300'} 
                />
              ))}
            </span>
            <span className="flex items-center">
              <Calendar size={12} className="mr-1" />
              {usageDuration}
            </span>
          </div>
        </div>
      </div>
      
      {/* Tags for issue and results if provided */}
      {(issue || results) && (
        <div className="flex flex-wrap gap-2 mb-3">
          {issue && (
            <span className="inline-block bg-neutral-100 text-neutral-600 text-xs px-2 py-1 rounded-full">
              {issue}
            </span>
          )}
          {results && (
            <span className="inline-block bg-green-50 text-green-600 text-xs px-2 py-1 rounded-full">
              {results}
            </span>
          )}
        </div>
      )}
      
      {/* Testimonial quote with read more toggle */}
      <div className="relative mb-2">
        <Quote size={18} className="text-neutral-200 absolute -left-1 -top-1" aria-hidden="true" />
        <p className="text-neutral-700 pl-5 relative">
          {displayQuote}
          {needsExpansion && !isExpanded && '...'}
        </p>
      </div>
      
      {/* Expand/collapse button if needed */}
      {needsExpansion && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-rose-600 hover:text-rose-700 mt-1 font-medium focus:outline-none"
        >
          {isExpanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
}
