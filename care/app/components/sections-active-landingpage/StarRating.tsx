import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  starSize?: number;
  className?: string;
  activeColor?: string;
  inactiveColor?: string;
}

export function StarRating({
  rating,
  maxStars = 5,
  starSize = 16,
  className = '',
  activeColor = 'text-rose-400 fill-rose-400',
  inactiveColor = 'text-neutral-300',
}: StarRatingProps) {
  return (
    <div className={`flex ${className}`}>
      {[...Array(maxStars)].map((_, i) => (
        <Star
          key={i}
          size={starSize}
          className={i < rating ? activeColor : inactiveColor}
        />
      ))}
    </div>
  );
} 