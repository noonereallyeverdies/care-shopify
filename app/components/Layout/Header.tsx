import { Link, NavLink } from '@remix-run/react';
import { useState, useEffect, memo, useCallback, lazy, Suspense } from 'react';
import type { Menu } from '@shopify/hydrogen/storefront-api-types';

// Dynamic import for icons to reduce initial bundle size
const Icons = lazy(() => import('./HeaderIcons').then(mod => ({ default: mod })));

// Define HeaderProps based on usage
interface HeaderProps {
  header: {
    shop: {
      name: string;
    };
    menu: Menu | null;
  };
  cart: {
    totalQuantity: number;
  } | null;
  isLoggedIn: boolean;
}

// Define a type for menu items
type MenuItem = Menu['items'][number];

// Non-lazy-loaded minimal icons for critical UI elements
function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M4 12h16M4 6h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
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

export function HeaderFallback() {
  return (
    <header className="h-20 sticky top-0 z-40 w-full bg-contrast/80 backdrop-blur-lg border-b border-neutral-100/50">
      <div className="container mx-auto h-full flex justify-between items-center px-4">
        <Link to="/" className="brand-heading text-xl">
          care<span className="brand-dot">•</span>atin
        </Link>
        <div className="flex items-center gap-4">
          <div className="h-5 w-12 bg-neutral-200 rounded"></div>
          <div className="h-5 w-5 bg-neutral-200 rounded-full"></div>
          <div className="h-5 w-5 bg-neutral-200 rounded-full"></div>
        </div>
      </div>
    </header>
  );
}

// Add priority nav items - these are the core ones that should always be shown
const PRIORITY_NAV_ITEMS = [
  { id: 'shop', title: 'shop', url: '/collections/all' },
  { id: 'hair-science', title: 'hair science', url: '/pages/science' },
];

// Secondary items that can be deferred or hidden on smaller screens
const SECONDARY_NAV_ITEMS = [
  { id: 'our-story', title: 'our story', url: '/pages/our-story' },
  { id: 'quiz', title: 'hair quiz', url: '/pages/hair-quiz' },
  { id: 'journal', title: 'journal', url: '/journal' },
];

// Updated Header component using Tailwind classes
export const Header = memo(function Header({ header, cart, isLoggedIn }: HeaderProps) {
  const shopName = header?.shop?.name ?? 'care•atin';
  const menu = header?.menu ?? FALLBACK_HEADER_MENU;

  // Keep combined items for convenience
  const customNav = [...PRIORITY_NAV_ITEMS, ...SECONDARY_NAV_ITEMS];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Mark when component is mounted on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Effect to handle scroll events with optimized event listener
  useEffect(() => {
    const handleScroll = () => {
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        const scrollPosition = window.scrollY;
        setIsScrolled(scrollPosition > 50);
      });
    };

    // Add passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Use useCallback to memoize the toggle function
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prevState => {
      const newState = !prevState;
      // Prevent scrolling when menu is open
      if (typeof document !== 'undefined') {
        document.body.style.overflow = newState ? 'hidden' : '';
      }
      return newState;
    });
  }, []);

  return (
    <header className={`h-20 sticky top-0 z-40 w-full border-b transition-all duration-300 ease-in-out ${
      isScrolled ? 'bg-white shadow-md border-neutral-100' : 'bg-transparent border-transparent'
    } backdrop-blur-lg`}>
      <div className="container mx-auto h-full flex justify-between items-center px-4">
        {/* Logo */}
        <Link to="/" prefetch="intent" className={`brand-heading text-2xl font-medium tracking-tight ${
          isScrolled ? 'text-primary' : 'text-white'
        }`}>
          care<span className="brand-dot">•</span>atin
        </Link>

        {/* Desktop Navigation - Priority items always visible */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {PRIORITY_NAV_ITEMS.map((item) => (
            <NavLink
              key={item.id}
              to={item.url}
              prefetch="intent"
              className={({ isActive }) => 
                `text-sm font-normal tracking-wide transition-colors brand-body ${
                  isActive 
                    ? (isScrolled ? 'text-rose-500' : 'text-rose-300') 
                    : (isScrolled ? 'text-neutral-700 hover:text-rose-500' : 'text-neutral-100 hover:text-white')
                }`
              }
            >
              {item.title}
            </NavLink>
          ))}
          
          {/* Secondary items only on larger screens */}
          <div className="hidden lg:flex items-center gap-8">
            {SECONDARY_NAV_ITEMS.map((item) => (
              <NavLink
                key={item.id}
                to={item.url}
                prefetch="intent"
                className={({ isActive }) => 
                  `text-sm font-normal tracking-wide transition-colors brand-body ${
                    isActive 
                      ? (isScrolled ? 'text-rose-500' : 'text-rose-300') 
                      : (isScrolled ? 'text-neutral-700 hover:text-rose-500' : 'text-neutral-100 hover:text-white')
                  }`
                }
              >
                {item.title}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Header Icons & Mobile Toggle */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Cart with count - this is critical so we don't lazy load it */}
          <CartLink cart={cart} isScrolled={isScrolled} />
          
          {/* Other icons loaded via Suspense to reduce initial load */}
          {isClient && (
            <Suspense fallback={<div className="hidden md:block w-20"></div>}>
              <div className="hidden md:flex items-center gap-6">
                <Icons isScrolled={isScrolled} />
              </div>
            </Suspense>
          )}
          
          {/* Mobile Menu Toggle - use simplified icon components */}
          <button 
            className={`md:hidden p-2 transition-colors ${isScrolled ? 'text-primary' : 'text-white'}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay & Navigation - optimized for performance */}
      {isClient && (
        <div 
          className={`md:hidden fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
          onClick={toggleMobileMenu}
          aria-hidden={!isMobileMenuOpen}
        >
          <nav 
            className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <button onClick={toggleMobileMenu} aria-label="Close menu" className="p-2 text-primary">
                <XIcon />
              </button>
            </div>
            
            {/* Brand logo in mobile menu */}
            <div className="px-6 pb-6">
              <Link to="/" className="brand-heading text-2xl font-medium tracking-tight text-primary" onClick={toggleMobileMenu}>
                care<span className="brand-dot">•</span>atin
              </Link>
            </div>
            
            {/* Mobile Links */}
            <div className="flex flex-col space-y-3 p-6 pt-0">
              {customNav.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.url}
                  prefetch="intent"
                  className={({ isActive }) => 
                    `text-lg brand-body transition-colors ${isActive ? 'text-rose-500' : 'text-neutral-700 hover:text-rose-500'}`
                  }
                  onClick={toggleMobileMenu}
                >
                  {item.title}
                </NavLink>
              ))}
              <hr className="border-neutral-200 my-4" />
              
              {/* Load the mobile menu icons dynamically */}
              <Suspense fallback={<div className="h-24"></div>}>
                <MobileMenuLinks cart={cart} toggleMobileMenu={toggleMobileMenu} />
              </Suspense>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
});

// Separate component for mobile links to enable code splitting
const MobileMenuLinks = lazy(() => import('./MobileMenuLinks').then(
  mod => ({ default: mod.MobileMenuLinks })
));

// Memoize CartLink to prevent unnecessary re-renders
const CartLink = memo(({ cart, isScrolled }: { cart: HeaderProps['cart']; isScrolled: boolean }) => {
  const cartQuantity = cart?.totalQuantity || 0;

  return (
    <Link 
      to="/cart" 
      prefetch="intent"
      className={`relative transition-colors ${isScrolled ? 'text-neutral-600 hover:text-rose-500' : 'text-neutral-200 hover:text-white'}`}
      aria-label={`Cart (${cartQuantity} items)`}
    >
      <CartIcon />
      {cartQuantity > 0 && (
        <span 
          className="absolute -top-1 -right-2 text-xs bg-rose-500 text-white rounded-full w-4 h-4 flex items-center justify-center font-bold"
          aria-hidden="true"
        >
          {cartQuantity > 9 ? '9+' : cartQuantity}
        </span>
      )}
    </Link>
  );
});

// Fallback Menu
export const FALLBACK_HEADER_MENU: Menu = {
  id: 'fallback-gid://shopify/Menu/199655526488',
  title: 'Fallback Main Menu',
  handle: 'main-menu',
  itemsCount: 5,
  items: [
    {
      id: 'fallback-gid://shopify/MenuItem/shop',
      resourceId: null,
      tags: [],
      title: 'shop',
      type: 'HTTP',
      url: '/collections/all',
      items: []
    },
    {
      id: 'fallback-gid://shopify/MenuItem/science',
      resourceId: null,
      tags: [],
      title: 'hair science',
      type: 'HTTP',
      url: '/pages/science',
      items: []
    },
    {
      id: 'fallback-gid://shopify/MenuItem/results',
      resourceId: null,
      tags: [],
      title: 'results',
      type: 'HTTP',
      url: '/pages/results',
      items: []
    },
    {
      id: 'fallback-gid://shopify/MenuItem/quiz',
      resourceId: null,
      tags: [],
      title: 'hair quiz',
      type: 'HTTP',
      url: '/pages/hair-quiz',
      items: []
    },
    {
      id: 'fallback-gid://shopify/MenuItem/journal',
      resourceId: null,
      tags: [],
      title: 'journal',
      type: 'HTTP',
      url: '/journal',
      items: []
    }
  ]
};
