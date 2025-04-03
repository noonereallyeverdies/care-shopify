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
    <header
      role="banner"
            className={`flex lg:hidden items-center h-nav sticky z-40 top-0 justify-between w-full leading-none gap-4 px-4 md:px-6 bg-contrast text-primary border-b border-primary/10`}
        >
            <div className="flex items-center justify-start w-1/3">
                {/* Actual Menu Button */}
          <button
                    onClick={openMenu}
                    className="relative flex items-center justify-center w-8 h-8 text-primary/80 hover:text-primary transition-colors"
          >
                    <span className="sr-only">open menu</span>
                    <MenuIcon />
          </button>
      </div>
      <Link
                className="flex items-center justify-center flex-grow w-1/3 h-full"
        to="/"
      >
                <h1 className="font-light text-center text-lg tracking-widest leading-none lowercase">
                    care<span className="text-red-400">•</span>atin
                </h1>
            </Link>
            <div className="flex items-center justify-end w-1/3">
                 {/* Actual Cart Button */}
                 <button
                    onClick={openCart}
                    className="relative flex items-center justify-center w-8 h-8 text-primary/80 hover:text-primary transition-colors"
                >
                    <span className="sr-only">open cart</span>
                    <CartIcon />
                    {/* Add Cart Count later if needed */}
                </button>
      </div>
    </header>
  );
}

function DesktopHeader({
    title,
  openCart,
    openMenu, // Keep openMenu if desktop might have a different menu trigger
}: {
    title: string;
  openCart: () => void;
    openMenu: () => void;
}) {
  return (
    <header
      role="banner"
            className={`hidden h-nav lg:flex items-center sticky z-40 top-0 justify-between w-full leading-none gap-8 px-6 xl:px-10 py-4 bg-contrast text-primary border-b border-primary/10`}
        >
             {/* Left Navigation */}
            <div className="flex justify-start items-center gap-6 flex-1">
                <Link to="/collections/all" className="text-sm font-light text-primary/80 hover:text-primary transition-colors">shop</Link>
                <Link to="/pages/science" className="text-sm font-light text-primary/80 hover:text-primary transition-colors">science</Link>
                {/* Add more links as needed */}
            </div>

             {/* Center Logo */}
            <div className="flex justify-center flex-shrink-0 mx-auto">
                <Link className="font-light text-xl tracking-[0.2em] lowercase" to="/" prefetch="intent">
                    care<span className="text-red-400">•</span>atin
                </Link>
            </div>

             {/* Right Navigation/Icons */}
            <div className="flex justify-end items-center gap-6 flex-1">
                 <Link to="/journal" className="text-sm font-light text-primary/80 hover:text-primary transition-colors">journal</Link>
                 {/* Placeholder for Account Icon */}
                 <Link to="/account" className="relative flex items-center justify-center w-8 h-8 text-primary/80 hover:text-primary transition-colors">
                    <span className="sr-only">account</span>
                    {/* Simple Account Icon Placeholder */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                 </Link>
                 {/* Actual Cart Button */}
          <button
                    onClick={openCart}
                    className="relative flex items-center justify-center w-8 h-8 text-primary/80 hover:text-primary transition-colors"
          >
                     <span className="sr-only">open cart</span>
                    <CartIcon />
                    {/* Add Cart Count later if needed */}
          </button>
      </div>
    </header>
  );
}

// Pass menu for potential future use in links
function Footer({ menu }: { menu?: EnhancedMenu | null }) {
    const [error, setError] = useState<Error | null>(null);

    if (error) {
  return (
            <div className="p-4 text-red-500">
                An error occurred in the footer: {error.message}
      </div>
  );
}

    return (
        <footer className="relative bg-contrast">
            <div className="container mx-auto">
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <WavyBackground 
                            colors={[
                                "#FFF1F2",
                                "#FFE4E6",
                                "#FECDD3",
                                "#FDA4AF",
                                "#FB7185",
                            ]}
                            waveWidth={150}
                            blur={10}
                            speed="slow"
                            waveOpacity={0.3}
                        />
                    </div>
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 p-8 md:p-12">
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-light tracking-widest mb-4 lowercase">
                                care<span className="text-red-400">•</span>atin
                            </h2>
                            <p className="text-sm text-primary/80">
                                Transforming hair care through science and sustainability.
                            </p>
                        </div>

                        <div className="text-center">
                            <h3 className="font-medium mb-4">Quick Links</h3>
                            <nav className="flex flex-col gap-2">
                                <Link to="/collections/all" className="text-sm text-primary/80 hover:text-primary transition-colors">Shop</Link>
                                <Link to="/pages/science" className="text-sm text-primary/80 hover:text-primary transition-colors">Science</Link>
                                <Link to="/journal" className="text-sm text-primary/80 hover:text-primary transition-colors">Journal</Link>
                            </nav>
                        </div>

                        <div className="text-center md:text-right">
                            <h3 className="font-medium mb-4">Connect</h3>
                            <div className="flex justify-center md:justify-end gap-4">
                                <a href="#" className="text-primary/80 hover:text-primary transition-colors">
                                    <Instagram className="w-5 h-5" />
                                    <span className="sr-only">Instagram</span>
                                </a>
                                <a href="#" className="text-primary/80 hover:text-primary transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                    <span className="sr-only">LinkedIn</span>
                                </a>
                                <a href="#" className="text-primary/80 hover:text-primary transition-colors">
                                    <Video className="w-5 h-5" />
                                    <span className="sr-only">YouTube</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

