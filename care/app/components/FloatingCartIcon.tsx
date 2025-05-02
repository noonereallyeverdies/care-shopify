import React from 'react';
import { Link } from '@remix-run/react';
// Assuming you have an SVG icon component or path
// import CartIcon from '~/assets/icons/cart.svg';

interface FloatingCartIconProps {
  cartItemCount: number;
}

// Basic placeholder for an icon
const CartIconPlaceholder = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function FloatingCartIcon({ cartItemCount }: FloatingCartIconProps) {
  const isActive = cartItemCount > 0;

  // Use Tailwind class for animation if active
  const animationClass = isActive ? 'animate-[pulse-slow_2s_infinite_ease-in-out]' : '';

  // Add TODO for countdown timer based on user feedback

  return (
    <Link
      to="/cart" // Assuming standard cart path
      aria-label={`cart with ${cartItemCount} items`}
      // Replace inline styles with Tailwind classes
      className={`floating-cart-icon fixed z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-contrast shadow-apple-md transition-transform duration-200 ease-in-out hover:scale-105 
        ${animationClass} 
        bottom-4 right-4 md:bottom-auto md:top-4 md:right-4` // Responsive positioning
      }
    >
      <CartIconPlaceholder />
      {isActive && (
        <span
          // Style badge with Tailwind
          className="absolute -top-1 -right-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-white"
        >
          {cartItemCount}
        </span>
      )}
      {/* TODO: Add countdown timer element here if confirmed */}
    </Link>
  );
} 