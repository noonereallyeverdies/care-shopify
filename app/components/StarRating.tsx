import React from 'react';

interface StarRatingProps {
  rating: number;
  size?: number;
  color?: string;
}

export function StarRating({ rating, size = 16, color = 'var(--c-accent-rlt)' }: StarRatingProps) {
  // Make sure rating is between 0 and 5
  const safeRating = Math.min(5, Math.max(0, rating));
  
  // Create array of 5 stars
  const stars = Array.from({ length: 5 }, (_, i) => {
    const isFilled = i < Math.floor(safeRating);
    const isHalf = !isFilled && i < Math.ceil(safeRating) && safeRating % 1 !== 0;
    
    return (
      <span 
        key={i} 
        style={{ 
          color,
          fontSize: `${size}px`,
          lineHeight: 1,
          display: 'inline-block'
        }}
        aria-hidden="true"
      >
        {isFilled ? '★' : isHalf ? '⯪' : '☆'}
      </span>
    );
  });
  
  return (
    <div 
      className="star-rating" 
      aria-label={`${safeRating} out of 5 stars`}
    >
      {stars}
    </div>
  );
} 