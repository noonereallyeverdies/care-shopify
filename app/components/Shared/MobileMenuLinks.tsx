import { Link } from '@remix-run/react';
import { memo } from 'react';

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m21 21-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M3 6h19l-3 10H6L3 6z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM17 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Mobile menu links with toggle function
export const MobileMenuLinks = memo(function MobileMenuLinks({ 
  cart, 
  toggleMobileMenu 
}: { 
  cart: { totalQuantity: number } | null;
  toggleMobileMenu: () => void;
}) {
  const cartQuantity = cart?.totalQuantity || 0;
  
  return (
    <>
      <Link to="/search" className="flex items-center gap-2 brand-body text-lg text-neutral-700 hover:text-rose-500 transition-colors" onClick={toggleMobileMenu} prefetch="intent">
        <SearchIcon />
        <span>search</span>
      </Link>
      
      <Link to="/wishlist" className="flex items-center gap-2 brand-body text-lg text-neutral-700 hover:text-rose-500 transition-colors" onClick={toggleMobileMenu} prefetch="intent">
        <HeartIcon />
        <span>wishlist</span>
      </Link>
      
      <Link to="/account" className="flex items-center gap-2 brand-body text-lg text-neutral-700 hover:text-rose-500 transition-colors" onClick={toggleMobileMenu} prefetch="intent">
        <UserIcon />
        <span>account</span>
      </Link>
      
      <Link to="/cart" className="flex items-center gap-2 brand-body text-lg text-neutral-700 hover:text-rose-500 transition-colors" onClick={toggleMobileMenu} prefetch="intent">
        <CartIcon />
        <span>cart</span>
        {cartQuantity > 0 && 
          <span className="text-xs bg-rose-500 text-white rounded-full px-2 py-0.5">{cartQuantity > 9 ? '9+' : cartQuantity}</span>
        }
      </Link>
    </>
  );
});

export default {
  MobileMenuLinks
};
