import { Link, NavLink } from '@remix-run/react';
import { useState, useEffect } from 'react'; // Import useEffect
import useRootLoaderData from '~/root'; // Assuming this hook provides layout data
import type { Menu } from '@shopify/hydrogen/storefront-api-types'; // Use Menu type
import { ShoppingCart, User, Menu as MenuIcon, X } from 'lucide-react'; // Import icons, alias MenuIcon, Added X

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
        <Link to="/" className="font-serif text-xl font-semibold">
          care•atin
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
  };

  return (
    // Conditionally apply background and shadow based on isScrolled state
    // Add transition classes
    <header className={`h-20 sticky top-0 z-40 w-full border-b transition-colors duration-300 ease-in-out ${isScrolled ? 'bg-white shadow-md border-neutral-100' : 'bg-transparent border-transparent'} backdrop-blur-lg`}>
      <div className="container mx-auto h-full flex justify-between items-center px-4 md:px-6 lg:px-8">
        {/* Logo - Stylized Text */}
        <Link to="/" className={`header-logo font-serif text-2xl font-medium tracking-tight ${isScrolled ? 'text-primary' : 'text-white'}`}> {/* Adjust text color for transparency */}
          care<span className="text-rose-500">•</span>atin
        </Link>

        {/* Desktop Navigation - Hidden on mobile */} 
        <nav className="hidden lg:flex items-center gap-6">
          {menu.items.map((item: MenuItem) => (
            <NavLink
              key={item.id}
              to={item.url ?? '#'}
              prefetch="intent"
              className={({ isActive }) => 
                `text-sm font-medium transition-colors ${isActive ? (isScrolled ? 'text-primary' : 'text-white') : (isScrolled ? 'text-neutral-600 hover:text-primary' : 'text-neutral-200 hover:text-white')}` /* Adjust text color */
              }
            >
              {item.title}
            </NavLink>
          ))}
        </nav>

        {/* Header Icons & Mobile Toggle */} 
        <div className="flex items-center gap-4">
          {/* Desktop Icons - Hidden on mobile */} 
          <div className="hidden lg:flex items-center gap-4">
            <NavLink 
              to="/account" 
              className={`transition-colors ${isScrolled ? 'text-neutral-600 hover:text-primary' : 'text-neutral-200 hover:text-white'}`} /* Adjust text color */
              prefetch="intent"
            >
              <User size={20} strokeWidth={1.5}/> 
              <span className="sr-only">Account</span>
            </NavLink>
            <CartLink cart={cart} isScrolled={isScrolled} /> {/* Pass isScrolled to CartLink */}
          </div>
          {/* Mobile Menu Toggle - Hidden on desktop */} 
          <button 
            className={`lg:hidden p-2 transition-colors ${isScrolled ? 'text-primary' : 'text-white'}`} // Adjust text color
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />} 
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay & Navigation - Tailwind styled */}
      <div 
        className={`lg:hidden fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={toggleMobileMenu} // Close on overlay click
      >
        <nav 
          className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-contrast shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside nav
        >
          {/* Close Button inside mobile menu */}
          <div className="flex justify-end p-4">
            <button onClick={toggleMobileMenu} aria-label="Close menu" className="p-2 text-primary">
              <X size={24} />
            </button>
          </div>
          {/* Mobile Links */}
          <div className="flex flex-col space-y-4 p-6">
            {menu.items.map((item: MenuItem) => (
              <NavLink
                key={item.id}
                to={item.url ?? '#'}
                prefetch="intent"
                className={({ isActive }) => 
                  `text-lg font-medium transition-colors ${isActive ? 'text-primary' : 'text-neutral-700 hover:text-primary'}`
                }
                onClick={toggleMobileMenu} // Close menu on link click
              >
                {item.title}
              </NavLink>
            ))}
            <hr className="border-neutral-200" />
            <NavLink 
               to="/account" 
               className="text-lg font-medium text-neutral-700 hover:text-primary transition-colors"
               prefetch="intent"
               onClick={toggleMobileMenu}
              >
                Account
             </NavLink>
            {/* Optional: Add Cart link to mobile menu */}
             <Link to="/cart" className="flex items-center gap-2 text-lg font-medium text-neutral-700 hover:text-primary transition-colors" onClick={toggleMobileMenu}>
               Cart
               {cart && cart.totalQuantity > 0 && 
                 <span className="text-xs bg-primary text-contrast rounded-full px-2 py-0.5">{cart.totalQuantity}</span>
               }
             </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

function CartLink({ cart, isScrolled }: { cart: HeaderProps['cart']; isScrolled: boolean }) { // Add isScrolled prop
  const cartQuantity = cart?.totalQuantity || 0;

  return (
    <Link 
      to="/cart" 
      className={`relative transition-colors ${isScrolled ? 'text-neutral-600 hover:text-primary' : 'text-neutral-200 hover:text-white'}`} // Adjust text color
    >
      <ShoppingCart size={20} strokeWidth={1.5} />
      {cartQuantity > 0 && (
        <span 
          className="absolute -top-1 -right-2 text-xs bg-primary text-contrast rounded-full w-4 h-4 flex items-center justify-center font-bold"
        >
          {cartQuantity}
        </span>
      )}
      <span className="sr-only">Cart ({cartQuantity})</span> 
    </Link>
  );
}

// Fallback Menu Type Needs to Match Hydrogen's Menu Type Structure
export const FALLBACK_HEADER_MENU: Menu = {
  id: 'fallback-gid://shopify/Menu/199655526488',
  title: 'Fallback Main Menu',
  handle: 'main-menu',
  itemsCount: 4,
  items: [
    {
      id: 'fallback-gid://shopify/MenuItem/461609468186',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: []
    },
    {
      id: 'fallback-gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: []
    },
    {
      id: 'fallback-gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: []
    },
    {
      id: 'fallback-gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: []
    },
  ],
};

// Media query would go in a CSS file, e.g.:
// @media (max-width: 768px) {
//   .header-nav--desktop { display: none; }
//   .header-icons { display: none; } // Optionally hide icons too
//   .mobile-menu-toggle { display: block; }
// } 