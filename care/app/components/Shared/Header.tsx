import { Link, NavLink } from '@remix-run/react';
import { useState, useEffect } from 'react'; // Import useEffect
import useRootLoaderData from '~/root'; // Assuming this hook provides layout data
import type { Menu } from '@shopify/hydrogen/storefront-api-types'; // Use Menu type
import { ShoppingCart, User, Heart, Menu as MenuIcon, X, Search } from 'lucide-react'; // Import icons, alias MenuIcon, Added X and Search

// Import the CSS file for styling - We will rely less on this
import './Header.css';

// Define HeaderProps based on usage
interface HeaderProps {
  header: {
    shop: {
      name: string;
    };
    menu: Menu | null; // Use Hydrogen's Menu type
  };
  cart: {
    totalQuantity: number;
  } | null;
  isLoggedIn: boolean; // Keep for potential future use
}

// Define a type for menu items for clarity
type MenuItem = Menu['items'][number];

export function HeaderFallback() {
  // Basic fallback with Tailwind structure
  return (
    <header className="h-20 sticky top-0 z-40 w-full bg-contrast/80 backdrop-blur-lg border-b border-neutral-100/50">
      <div className="container mx-auto h-full flex justify-between items-center px-4">
        <Link to="/" className="brand-heading text-xl">
          care<span className="brand-dot">•</span>atin
        </Link>
        <div className="flex items-center gap-4">
          <div className="h-5 w-12 bg-neutral-200 rounded"></div> {/* Placeholder Nav */}
          <div className="h-5 w-5 bg-neutral-200 rounded-full"></div> {/* Placeholder Icon */}
          <div className="h-5 w-5 bg-neutral-200 rounded-full"></div> {/* Placeholder Icon */}
        </div>
      </div>
    </header>
  );
}

// Updated Header component using Tailwind classes
export function Header({ header, cart, isLoggedIn }: HeaderProps) {
  const shopName = header?.shop?.name ?? 'care•atin'; // Default to stylized name
  const menu = header?.menu ?? FALLBACK_HEADER_MENU;

  // Add custom navigation items specifically for hair care
  const customNav = [
    { id: 'shop', title: 'shop', url: '/collections/all' },
    { id: 'hair-science', title: 'hair science', url: '/pages/science' },
    { id: 'our-story', title: 'our story', url: '/pages/our-story' },
    { id: 'quiz', title: 'hair quiz', url: '/pages/hair-quiz' },
    { id: 'journal', title: 'journal', url: '/journal' },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // State to track scroll position
  const [isScrolled, setIsScrolled] = useState(false);

  // Effect to handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50); // Set threshold to 50px
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check in case the page loads scrolled
    handleScroll(); 

    // Cleanup function to remove listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent scrolling when menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  return (
    // Conditionally apply background and shadow based on isScrolled state
    // Add transition classes
    <header className={`h-20 sticky top-0 z-40 w-full border-b transition-all duration-300 ease-in-out ${isScrolled ? 'bg-white shadow-md border-neutral-100' : 'bg-transparent border-transparent'} backdrop-blur-lg`}>
      <div className="container mx-auto h-full flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className={`brand-heading text-2xl font-medium tracking-tight ${isScrolled ? 'text-primary' : 'text-white'}`}>
          care<span className="brand-dot">•</span>atin
        </Link>

        {/* Desktop Navigation */} 
        <nav className="hidden lg:flex items-center gap-8">
          {customNav.map((item) => (
            <NavLink
              key={item.id}
              to={item.url}
              prefetch="intent"
              className={({ isActive }) => 
                `text-sm font-normal tracking-wide transition-colors brand-body ${isActive ? (isScrolled ? 'text-rose-500' : 'text-rose-300') : (isScrolled ? 'text-neutral-700 hover:text-rose-500' : 'text-neutral-100 hover:text-white')}`
              }
            >
              {item.title}
            </NavLink>
          ))}
        </nav>

        {/* Header Icons & Mobile Toggle */} 
        <div className="flex items-center gap-6">
          {/* Search Icon */}
          <Link to="/search" className={`hidden md:flex transition-colors ${isScrolled ? 'text-neutral-600 hover:text-rose-500' : 'text-neutral-200 hover:text-white'}`} aria-label="Search">
            <Search size={20} strokeWidth={1.5} />
          </Link>
          
          {/* Wishlist */}
          <Link to="/wishlist" className={`hidden md:flex transition-colors ${isScrolled ? 'text-neutral-600 hover:text-rose-500' : 'text-neutral-200 hover:text-white'}`} aria-label="Wishlist">
            <Heart size={20} strokeWidth={1.5} />
          </Link>
          
          {/* Account */}
          <Link 
            to="/account" 
            className={`hidden md:flex transition-colors ${isScrolled ? 'text-neutral-600 hover:text-rose-500' : 'text-neutral-200 hover:text-white'}`}
            aria-label="Account"
          >
            <User size={20} strokeWidth={1.5}/> 
          </Link>
          
          {/* Cart */}
          <CartLink cart={cart} isScrolled={isScrolled} />
          
          {/* Mobile Menu Toggle */} 
          <button 
            className={`lg:hidden p-2 transition-colors ${isScrolled ? 'text-primary' : 'text-white'}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />} 
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay & Navigation */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        onClick={toggleMobileMenu}
      >
        <nav 
          className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button onClick={toggleMobileMenu} aria-label="Close menu" className="p-2 text-primary">
              <X size={24} />
            </button>
          </div>
          
          {/* Brand logo in mobile menu */}
          <div className="px-6 pb-6">
            <Link to="/" className="brand-heading text-2xl font-medium tracking-tight text-primary" onClick={toggleMobileMenu}>
              care<span className="brand-dot">•</span>atin
            </Link>
          </div>
          
          {/* Mobile Links */}
          <div className="flex flex-col space-y-4 p-6 pt-0">
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
            
            <Link to="/search" className="flex items-center gap-2 brand-body text-lg text-neutral-700 hover:text-rose-500 transition-colors" onClick={toggleMobileMenu}>
              <Search size={20} strokeWidth={1.5} />
              <span>search</span>
            </Link>
            
            <Link to="/wishlist" className="flex items-center gap-2 brand-body text-lg text-neutral-700 hover:text-rose-500 transition-colors" onClick={toggleMobileMenu}>
              <Heart size={20} strokeWidth={1.5} />
              <span>wishlist</span>
            </Link>
            
            <Link to="/account" className="flex items-center gap-2 brand-body text-lg text-neutral-700 hover:text-rose-500 transition-colors" onClick={toggleMobileMenu}>
              <User size={20} strokeWidth={1.5} />
              <span>account</span>
            </Link>
            
            <Link to="/cart" className="flex items-center gap-2 brand-body text-lg text-neutral-700 hover:text-rose-500 transition-colors" onClick={toggleMobileMenu}>
              <ShoppingCart size={20} strokeWidth={1.5} />
              <span>cart</span>
              {cart && cart.totalQuantity > 0 && 
                <span className="text-xs bg-rose-500 text-white rounded-full px-2 py-0.5">{cart.totalQuantity}</span>
              }
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

function CartLink({ cart, isScrolled }: { cart: HeaderProps['cart']; isScrolled: boolean }) {
  const cartQuantity = cart?.totalQuantity || 0;

  return (
    <Link 
      to="/cart" 
      className={`relative transition-colors ${isScrolled ? 'text-neutral-600 hover:text-rose-500' : 'text-neutral-200 hover:text-white'}`}
      aria-label={`Cart (${cartQuantity} items)`}
    >
      <ShoppingCart size={20} strokeWidth={1.5} />
      {cartQuantity > 0 && (
        <span 
          className="absolute -top-1 -right-2 text-xs bg-rose-500 text-white rounded-full w-4 h-4 flex items-center justify-center font-bold"
          aria-hidden="true"
        >
          {cartQuantity}
        </span>
      )}
    </Link>
  );
}

// Fallback Menu Type Needs to Match Hydrogen's Menu Type Structure
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

// Media query would go in a CSS file, e.g.:
// @media (max-width: 768px) {
//   .header-nav--desktop { display: none; }
//   .header-icons { display: none; } // Optionally hide icons too
//   .mobile-menu-toggle { display: block; }
// } 