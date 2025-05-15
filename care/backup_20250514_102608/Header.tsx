import { Link, NavLink } from '@remix-run/react';
import { useState, useEffect } from 'react';
import { ShoppingCart, User, Heart, Menu as MenuIcon, X, Search, Shield } from 'lucide-react';

interface HeaderProps {
  header: {
    shop: {
      name: string;
    };
    menu: any | null;
  };
  cart: {
    totalQuantity: number;
  } | null;
  isLoggedIn: boolean;
}

// Simplified fallback header for loading state
export function HeaderFallback() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 py-4">
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-serif text-2xl text-white">
            care<span className="text-rose-300">•</span>atin
          </Link>
          <div className="w-24 h-4 bg-white/20 rounded"></div>
        </div>
      </div>
    </header>
  );
}

export function Header({ header, cart, isLoggedIn }: HeaderProps) {
  const shopName = header?.shop?.name ?? 'care•atin';
  
  // Updated primary navigation items - removed duplicate Shop entries
  const primaryNav = [
    { id: 'shop', title: 'Shop', url: '/collections/all', highlight: true },
    { id: 'science', title: 'The Science', url: '/pages/science' },
    { id: 'results', title: 'Results', url: '/pages/results' },
    { id: 'reviews', title: 'Reviews', url: '/pages/reviews' },
    { id: 'faq', title: 'FAQ', url: '/pages/faq' },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent scrolling when menu is open
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between">
          {/* Refined logo presentation */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className={`font-serif text-2xl tracking-wide ${isScrolled ? 'text-neutral-900' : 'text-white'}`}
            >
              care<span className={isScrolled ? "text-rose-600" : "text-rose-300"}>•</span>atin
            </Link>
          </div>
          
          {/* Improved navigation with visual indicators */}
          <nav className="hidden md:flex items-center space-x-6">
            {primaryNav.map(item => (
              <NavLink 
                key={item.id} 
                to={item.url}
                className={({ isActive }) => `
                  text-sm uppercase tracking-wide font-medium transition-all relative
                  ${
                    item.highlight
                    ? isScrolled
                      ? 'bg-rose-600 text-white px-4 py-2 rounded-full hover:bg-rose-700'
                      : 'bg-white/20 text-white px-4 py-2 rounded-full hover:bg-white/30'
                    : isActive 
                      ? isScrolled 
                        ? 'text-rose-600 after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[2px] after:bg-rose-600' 
                        : 'text-rose-300 after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[2px] after:bg-rose-300' 
                      : isScrolled 
                        ? 'text-neutral-700 hover:text-rose-600' 
                        : 'text-white/90 hover:text-white'
                  }
                `}
              >
                {item.title}
              </NavLink>
            ))}
          </nav>
          
          {/* Cart indicator & mobile menu trigger */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/cart" 
              className={`relative ${isScrolled ? 'text-neutral-800' : 'text-white'} transition-colors`}
              aria-label={`Cart (${cart?.totalQuantity || 0} items)`}
            >
              <ShoppingCart size={20} strokeWidth={1.5} />
              {(cart?.totalQuantity ?? 0) > 0 && (
                <span className="absolute -top-1 -right-2 bg-rose-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cart?.totalQuantity ?? 0}
                </span>
              )}
            </Link>
            
            <button 
              className={`block md:hidden ${isScrolled ? 'text-neutral-800' : 'text-white'} transition-colors`}
              onClick={toggleMobileMenu}
              aria-label="Menu"
              aria-expanded={isMobileMenuOpen}
            >
              <MenuIcon size={24} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Improved Mobile menu with better accessibility and visibility */}
      <div 
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-all duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={toggleMobileMenu}
        aria-hidden={!isMobileMenuOpen}
      >
        <div 
          className={`absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-white shadow-lg transition-transform duration-300 transform ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={e => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
        >
          <div className="flex justify-end p-4">
            <button 
              onClick={toggleMobileMenu}
              className="p-2 text-neutral-500 hover:bg-neutral-100 rounded-full"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-80px)]">
            <Link 
              to="/" 
              className="block font-serif text-2xl text-neutral-900 mb-8"
              onClick={toggleMobileMenu}
            >
              care<span className="text-rose-600">•</span>atin
            </Link>
            
            <nav className="space-y-4">
              {primaryNav.map(item => (
                <NavLink 
                  key={item.id} 
                  to={item.url}
                  className={({ isActive }) => `
                    block text-lg py-2 font-medium border-l-2 pl-3
                    ${item.highlight
                      ? 'text-rose-600 border-rose-600'
                      : isActive 
                        ? 'text-rose-600 border-rose-600' 
                        : 'text-neutral-800 border-transparent hover:border-neutral-200 hover:bg-neutral-50'
                    }
                  `}
                  onClick={toggleMobileMenu}
                >
                  {item.title}
                </NavLink>
              ))}
              
              {/* Account and cart links */}
              <div className="pt-6 mt-6 border-t border-neutral-200">
                <Link 
                  to={isLoggedIn ? "/account" : "/account/login"}
                  className="flex items-center py-3 text-neutral-800 hover:bg-neutral-50 rounded-md pl-3"
                  onClick={toggleMobileMenu}
                >
                  <User size={18} className="mr-3" />
                  {isLoggedIn ? "My Account" : "Sign In"}
                </Link>
                
                <Link 
                  to="/cart" 
                  className="flex items-center py-3 text-neutral-800 hover:bg-neutral-50 rounded-md pl-3"
                  onClick={toggleMobileMenu}
                >
                  <ShoppingCart size={18} className="mr-3" />
                  Cart ({cart?.totalQuantity ?? 0})
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
