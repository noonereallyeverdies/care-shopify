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
import { Footer } from '~/components/Layout/Footer';
import { WavyBackground } from '~/components/WavyBackground';
import { GridOverlay } from '~/components/ui/GridOverlay';

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
        <main role="main" id="mainContent" className="grow pt-24">
                <Suspense fallback={
                    <div className="flex items-center justify-center w-full h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                    </div>
                }>
          {children}
                </Suspense>
        </main>
            <Footer menu={footerMenu} /> 
            {/* Grid Overlay for debugging - toggle with Ctrl+G */}
            <GridOverlay />
      </div>
  );
}

// Pass menu back for potential drawer usage
function Header({ title, menu }: { title: string; menu?: EnhancedMenu | null | undefined }) { 
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

  // Safely handle the cart fetchers
  let addToCartFetchers: any[] = []; // Explicitly type as any[] for now, revisit if specific type known
  try {
    // Use a try-catch in case useCartFetchers throws an error
    addToCartFetchers = useCartFetchers(CartForm.ACTIONS?.LinesAdd || 'ADD_LINES');
  } catch (error) {
    console.error('Error in useCartFetchers:', error);
    // Continue with empty array
  }

  useEffect(() => {
    // Null check everything to prevent errors
    if (isCartOpen || !(addToCartFetchers && Array.isArray(addToCartFetchers) && addToCartFetchers.length > 0)) return;
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
  menu?: EnhancedMenu;
}) {
  return (
    <Drawer open={isOpen} onClose={onClose} openFrom="left" heading="Menu">
      <div className="grid">
        <Suspense fallback={
          <div className="flex items-center justify-center w-full h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        }>
        {menu && <MenuMobileNav menu={menu} onClose={onClose} />}
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
      {/* Check if menu and menu.items exist and are arrays before mapping */}
      {(menu?.items && Array.isArray(menu.items) ? menu.items : []).map((item: ChildEnhancedMenuItem) => (
          <Link
          key={item.id}
            to={item.to}
            target={item.target}
            onClick={onClose}
          className="text-lg" 
          >
              {item.title.toLowerCase()}
          </Link>
      ))}
    </nav>
  );
}

// Desktop Header - Enhanced styling
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
    <header className="hidden md:flex h-24 items-center justify-between w-full px-10 backdrop-blur-lg bg-white/75 border-b border-stone-200/20 fixed top-0 z-40 transition-all duration-300 shadow-apple-sm">
      <div className="flex items-center gap-12">
        {/* Logo */}
        <div className="flex items-center">
          <button
            onClick={scrollToTop}
            className="text-2xl font-light tracking-tight"
          >
            <span className="text-primary hover:text-rose-600 transition-colors duration-300">care<span className="text-rose-500">•</span>atin</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/collections"
            className="text-primary/80 hover:text-primary text-sm font-medium relative group px-1 py-2"
          >
            products
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-rose-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/collections/featured"
            className="text-primary/80 hover:text-primary text-sm font-medium relative group px-1 py-2"
          >
            featured
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-rose-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/about"
            className="text-primary/80 hover:text-primary text-sm font-medium relative group px-1 py-2"
          >
            about
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-rose-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/science"
            className="text-primary/80 hover:text-primary text-sm font-medium relative group px-1 py-2"
          >
            science
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-rose-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          {/* Example of a dropdown - adapt as needed */}
          <div className="relative group">
            <button className="text-primary/80 hover:text-primary text-sm font-medium px-1 py-2 focus:outline-none">
              learn
              {/* <ChevronDown className="h-4 w-4 inline-block ml-1 group-hover:rotate-180 transition-transform duration-200" /> */}
            </button>
            <div className="absolute left-0 mt-0 w-48 bg-white/90 backdrop-blur-md rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out pointer-events-none group-hover:pointer-events-auto z-50 border border-stone-200/30">
              <Link to="/blog" className="block px-4 py-2.5 text-sm text-neutral-700 hover:bg-rose-50/70 hover:text-rose-600 transition-colors rounded-t-md">blog</Link>
              <Link to="/our-story" className="block px-4 py-2.5 text-sm text-neutral-700 hover:bg-rose-50/70 hover:text-rose-600 transition-colors">our story</Link>
              <Link to="/faq" className="block px-4 py-2.5 text-sm text-neutral-700 hover:bg-rose-50/70 hover:text-rose-600 transition-colors rounded-b-md">faq</Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Right side icons/actions */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => alert('Search clicked')} // Replace with actual search functionality
          className="text-primary/80 hover:text-primary transition-colors"
          aria-label="search"
        >
          <IconSearch className="w-5 h-5" />
        </button>
        <Link
          to="/account"
          className="text-primary/80 hover:text-primary transition-colors"
          aria-label="my account"
        >
          <IconAccount className="w-5 h-5" />
        </Link>
        <button
          onClick={openCart}
          className="text-primary/80 hover:text-primary transition-colors relative"
          aria-label="open cart"
        >
          <IconBag className="w-5 h-5" />
          {/* Cart count can be added here if needed */}
        </button>
      </div>
    </header>
  );
}

// Mobile Header - Enhanced styling
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
    <header className="md:hidden flex h-20 items-center justify-between w-full px-5 backdrop-blur-lg bg-white/75 border-b border-stone-200/20 fixed top-0 z-40 transition-all duration-300 shadow-apple-sm">
      {/* Menu Button */}
      <button 
        onClick={openMenu}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-transparent hover:bg-stone-100 transition-colors duration-300 text-primary/80 hover:text-primary"
        aria-label="Menu"
      >
        <IconMenu className="w-5 h-5" />
      </button>

      {/* Logo */}
      <Link
        to="/"
        className="text-xl font-light tracking-tight text-primary hover:text-rose-600 transition-colors duration-300"
      >
        care<span className="text-rose-500">•</span>atin
      </Link>

      {/* Cart Button */}
      <button
        onClick={openCart}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-transparent hover:bg-stone-100 transition-colors duration-300 text-primary/80 hover:text-primary relative"
        aria-label="Cart"
      >
        <IconBag className="w-5 h-5" />
        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center text-[10px] text-white font-medium">0</div>
      </button>
    </header>
  );
}

// Using the imported Footer component from Layout/Footer.tsx
// The imported Footer provides a richer design with benefits section, better styling and animations
