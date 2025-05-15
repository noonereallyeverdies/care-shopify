import { Link } from '@remix-run/react';
import { useRef, useState, useEffect } from 'react';

export interface HeaderProps {
  header: any;
  cart: any;
  isLoggedIn: boolean;
}

export function Header({ header, cart, isLoggedIn }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Handle scroll effect for transparent to solid header
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Extract menu items from header data
  const menuItems = header?.menu?.items || [
    { title: 'Home', url: '/' },
    { title: 'Products', url: '/products' },
    { title: 'The Science', url: '/science' },
    { title: 'About', url: '/about' }
  ];

  return (
    <header 
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary-500">care•atin</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item: any, index: number) => (
              <Link 
                key={`menu-item-${index}`}
                to={item.url}
                className={`text-sm font-medium transition ${
                  isScrolled ? 'text-primary-text-medium hover:text-primary-500' : 'text-white hover:text-primary-300'
                }`}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Cart & Account Section */}
          <div className="flex items-center space-x-6">
            {/* Cart Icon with Counter */}
            <Link 
              to="/cart" 
              className={`relative ${isScrolled ? 'text-primary-text-medium' : 'text-white'}`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
              {(cart?.totalQuantity || 0) > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cart?.totalQuantity || 0}
                </span>
              )}
            </Link>

            {/* Account Link */}
            <Link 
              to={isLoggedIn ? "/account" : "/account/login"} 
              className={`hidden sm:flex items-center space-x-1 ${isScrolled ? 'text-primary-text-medium' : 'text-white'}`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                />
              </svg>
              <span className="text-sm">{isLoggedIn ? 'Account' : 'Sign In'}</span>
            </Link>

            {/* Mobile Menu Button */}
            <button 
              type="button" 
              className={`md:hidden ${isScrolled ? 'text-primary-text-medium' : 'text-white'}`}
              onClick={toggleMobileMenu}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 mt-2 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item: any, index: number) => (
                <Link 
                  key={`mobile-menu-item-${index}`}
                  to={item.url}
                  className={`text-sm font-medium transition px-2 py-1 ${
                    isScrolled ? 'text-primary-text-medium hover:text-primary-500' : 'text-white hover:text-primary-300'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
              <Link 
                to={isLoggedIn ? "/account" : "/account/login"} 
                className="text-sm font-medium text-primary-text-medium hover:text-primary-500 px-2 py-1 sm:hidden"
                onClick={() => setMobileMenuOpen(false)}
              >
                {isLoggedIn ? 'Account' : 'Sign In'}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export function HeaderFallback() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary-500">care•atin</div>
          <div className="hidden md:flex items-center space-x-8">
            <div className="animate-pulse bg-gray-200 h-4 w-16 rounded"></div>
            <div className="animate-pulse bg-gray-200 h-4 w-16 rounded"></div>
            <div className="animate-pulse bg-gray-200 h-4 w-16 rounded"></div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="animate-pulse bg-gray-200 h-6 w-6 rounded-full"></div>
            <div className="animate-pulse bg-gray-200 h-6 w-20 rounded hidden sm:block"></div>
            <div className="animate-pulse bg-gray-200 h-6 w-6 rounded md:hidden"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
