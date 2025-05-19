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

// Export a component that renders all the icons
function HeaderIcons({ isScrolled }: { isScrolled: boolean }) {
  const iconClass = `transition-colors ${isScrolled ? 'text-neutral-600 hover:text-rose-500' : 'text-neutral-200 hover:text-white'}`;
  
  return (
    <>
      <Link to="/search" className={iconClass} aria-label="Search" prefetch="intent">
        <SearchIcon />
      </Link>
      
      <Link to="/wishlist" className={iconClass} aria-label="Wishlist" prefetch="intent">
        <HeartIcon />
      </Link>
      
      <Link to="/account" className={iconClass} aria-label="Account" prefetch="intent">
        <UserIcon />
      </Link>
    </>
  );
}

export default memo(HeaderIcons);
