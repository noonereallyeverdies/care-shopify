import React, { useState } from 'react';
import { Await, Form, Link, useLoaderData, useParams, useRouteLoaderData } from '@remix-run/react';
import { CartForm, Image } from '@shopify/hydrogen';
import { Suspense, useEffect } from 'react';
import { Drawer, useDrawer } from '~/components/Drawer';
import { IconAccount, IconBag, IconLogin, IconMenu, IconSearch } from '~/components/Icon';
import { Input } from '~/components/Input';
import { Section, Text } from '~/components/Text';
import { useCartFetchers } from '~/hooks/useCartFetchers';
import { useIsHydrated } from '~/hooks/useIsHydrated';
import { useIsHomePath, type EnhancedMenu, type ChildEnhancedMenuItem } from '~/lib/utils';
import type { RootLoader } from '~/root';
import { Cart } from './Cart';
import { CartLoading } from './CartLoading';
import { HeartPulse, Instagram, Linkedin, Video } from 'lucide-react';
import { WavyBackground } from '~/components/WavyBackground';

type LayoutProps = {
  children: React.ReactNode;
    layout?: {
    headerMenu?: EnhancedMenu | null;
    footerMenu?: EnhancedMenu | null;
  };
};

// Simple SVG Placeholders for Icons (replace with actual icons)
const MenuIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const CartIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export function PageLayout({ children, layout }: LayoutProps) {
    const { headerMenu, footerMenu } = layout || {}; 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    if (error) {
        return (
            <div className="flex items-center justify-center w-full min-h-screen">
                <div className="p-4 text-red-500">An error occurred: {error.message}</div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-full h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

  return (
        <div className="flex flex-col min-h-screen bg-contrast text-primary font-sans">
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>
            <Header title="care•atin" menu={headerMenu} />
        <main role="main" id="mainContent" className="flex-grow">
                <Suspense fallback={
                    <div className="flex items-center justify-center w-full h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                    </div>
                }>
          {children}
                </Suspense>
        </main>
            <Footer menu={footerMenu} /> 
      </div>
  );
}

// Pass menu back for potential drawer usage
function Header({ title, menu }: { title: string; menu?: EnhancedMenu | null }) { 
  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer();

  const addToCartFetchers = useCartFetchers(CartForm.ACTIONS.LinesAdd);

  useEffect(() => {
    if (isCartOpen || !addToCartFetchers.length) return;
    openCart();
  }, [addToCartFetchers, isCartOpen, openCart]);

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      {menu && (
        <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menu={menu} />
      )}
            <DesktopHeader title={title} openCart={openCart} openMenu={openMenu} />
            <MobileHeader title={title} openCart={openCart} openMenu={openMenu} />
    </>
  );
}

// Keep CartDrawer as it was, might be needed
function CartDrawer({isOpen, onClose}: {isOpen: boolean; onClose: () => void}) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  if (!rootData) return null;

  return (
    <Drawer open={isOpen} onClose={onClose} heading="Cart" openFrom="right">
      <div className="grid">
        <Suspense fallback={
          <div className="flex items-center justify-center w-full h-64">
            <CartLoading />
          </div>
        }>
          <Await resolve={rootData?.cart} errorElement={<div className="p-4 text-red-500">Error loading cart data</div>}>
            {(cart) => (
              <div className="flex flex-col">
                <Cart layout="drawer" onClose={onClose} cart={cart || null} />
              </div>
            )}
          </Await>
        </Suspense>
      </div>
    </Drawer>
  );
}

// Keep MenuDrawer for mobile nav later
export function MenuDrawer({
  isOpen,
  onClose,
  menu,
}: {
  isOpen: boolean;
  onClose: () => void;
  menu: EnhancedMenu;
}) {
  return (
    <Drawer open={isOpen} onClose={onClose} openFrom="left" heading="Menu">
      <div className="grid">
        <Suspense fallback={
          <div className="flex items-center justify-center w-full h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        }>
        <MenuMobileNav menu={menu} onClose={onClose} />
        </Suspense>
      </div>
    </Drawer>
  );
}

// Keep MenuMobileNav for the drawer
function MenuMobileNav({
  menu,
  onClose,
}: {
  menu: EnhancedMenu;
  onClose: () => void;
}) {
  return (
    <nav className="grid gap-4 p-6 sm:gap-6 sm:px-12 sm:py-8">
      {(menu?.items || []).map((item: ChildEnhancedMenuItem) => (
          <Link
          key={item.id}
            to={item.to}
            target={item.target}
            onClick={onClose}
          className="text-lg" 
          >
              {item.title}
          </Link>
      ))}
    </nav>
  );
}

// Desktop Header - Completely redesigned for premium Glossier+Apple aesthetic
function DesktopHeader({
  title,
  openCart,
  openMenu,
}: {
  title: string;
  openCart: () => void;
  openMenu: () => void;
}) {
  // Function to handle smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <header className="hidden md:flex h-20 items-center justify-between w-full px-8 backdrop-blur-md bg-white/80 border-b border-stone-200/30 fixed top-0 z-40 transition-all duration-300">
      <div className="flex items-center gap-8">
        {/* Logo */}
        <div className="flex items-center">
          <button
            onClick={scrollToTop}
            className="text-2xl font-light tracking-tight"
          >
            <span className="text-primary hover:text-rose-600 transition-colors duration-300">{title}</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/collections"
            className="text-primary/70 hover:text-primary text-sm font-medium relative group px-1 py-2"
          >
            Products
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-rose-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/collections/featured"
            className="text-primary/70 hover:text-primary text-sm font-medium relative group px-1 py-2"
          >
            Featured
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-rose-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/about"
            className="text-primary/70 hover:text-primary text-sm font-medium relative group px-1 py-2"
          >
            About
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-rose-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </nav>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Search button with hover effect */}
        <button 
          className="flex items-center justify-center w-10 h-10 rounded-full bg-transparent hover:bg-stone-100 transition-colors duration-300 text-primary/70 hover:text-primary"
          aria-label="Search"
        >
          <IconSearch className="w-5 h-5" />
        </button>

        {/* Account button with hover effect */}
        <Link
          to="/account"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-transparent hover:bg-stone-100 transition-colors duration-300 text-primary/70 hover:text-primary"
          aria-label="Account"
        >
          <IconAccount className="w-5 h-5" />
        </Link>

        {/* Cart button with hover effect */}
        <button
          onClick={openCart}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-transparent hover:bg-stone-100 transition-colors duration-300 text-primary/70 hover:text-primary relative"
          aria-label="Cart"
        >
          <IconBag className="w-5 h-5" />
          <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center text-[10px] text-white font-medium">0</div>
        </button>
      </div>
    </header>
  );
}

// Mobile Header - Enhanced for Glossier+Apple aesthetic
function MobileHeader({
  title,
  openCart,
  openMenu,
}: {
  title: string;
  openCart: () => void;
  openMenu: () => void;
}) {
  return (
    <header className="md:hidden flex h-16 items-center justify-between w-full px-4 backdrop-blur-md bg-white/80 border-b border-stone-200/30 fixed top-0 z-40 transition-all duration-300">
      {/* Menu Button */}
      <button 
        onClick={openMenu}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-transparent hover:bg-stone-100 transition-colors duration-300 text-primary/70 hover:text-primary"
        aria-label="Menu"
      >
        <IconMenu className="w-5 h-5" />
      </button>

      {/* Logo */}
      <Link
        to="/"
        className="text-xl font-light tracking-tight text-primary hover:text-rose-600 transition-colors duration-300"
      >
        {title}
      </Link>

      {/* Cart Button */}
      <button
        onClick={openCart}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-transparent hover:bg-stone-100 transition-colors duration-300 text-primary/70 hover:text-primary relative"
        aria-label="Cart"
      >
        <IconBag className="w-5 h-5" />
        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center text-[10px] text-white font-medium">0</div>
      </button>
    </header>
  );
}

// Footer - Enhanced with Glossier+Apple aesthetics
function Footer({ menu }: { menu?: EnhancedMenu | null }) {
  return (
    <footer className="border-t border-stone-200/30 bg-stone-50/50">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Column 1: Logo and description */}
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-xl font-light tracking-tight text-primary">care•atin</h3>
            <p className="text-sm text-primary/70 leading-relaxed">
              Premium hair care products designed with science and elegance in mind.
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-4 mt-4">
              <a href="#" className="text-primary/60 hover:text-rose-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-primary/60 hover:text-rose-500 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-primary/60 hover:text-rose-500 transition-colors">
                <Video size={20} />
              </a>
              <a href="#" className="text-primary/60 hover:text-rose-500 transition-colors">
                <HeartPulse size={20} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Shop */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium uppercase tracking-wider text-primary/40">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/collections/all" className="text-sm text-primary/70 hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/collections/featured" className="text-sm text-primary/70 hover:text-primary transition-colors">
                  Featured
                </Link>
              </li>
              <li>
                <Link to="/collections/new" className="text-sm text-primary/70 hover:text-primary transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/collections/best-sellers" className="text-sm text-primary/70 hover:text-primary transition-colors">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: About */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium uppercase tracking-wider text-primary/40">About</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/pages/our-story" className="text-sm text-primary/70 hover:text-primary transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/pages/science" className="text-sm text-primary/70 hover:text-primary transition-colors">
                  Our Science
                </Link>
              </li>
              <li>
                <Link to="/pages/ingredients" className="text-sm text-primary/70 hover:text-primary transition-colors">
                  Ingredients
                </Link>
              </li>
              <li>
                <Link to="/pages/sustainability" className="text-sm text-primary/70 hover:text-primary transition-colors">
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Customer Service */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium uppercase tracking-wider text-primary/40">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/pages/contact" className="text-sm text-primary/70 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/pages/shipping" className="text-sm text-primary/70 hover:text-primary transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/pages/faq" className="text-sm text-primary/70 hover:text-primary transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/account" className="text-sm text-primary/70 hover:text-primary transition-colors">
                  My Account
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-stone-200/30 text-center">
          <p className="text-xs text-primary/50 mb-1">
            © 2025 care•atin. All rights reserved.
          </p>
          <p className="text-xs text-primary/50 mb-4">
            Designed in California, where beauty meets care.
          </p>
          <p className="text-xs text-primary/40 max-w-2xl mx-auto leading-relaxed">
            The statements on this website have not been evaluated by the FDA. The information provided on this site is not intended to diagnose, treat, cure, or prevent any disease and should not be construed as medical advice. Results may not be typical.
          </p>
        </div>
      </div>
    </footer>
  );
}

