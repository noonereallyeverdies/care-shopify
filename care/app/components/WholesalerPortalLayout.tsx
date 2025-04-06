import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from '@remix-run/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  ShoppingBag,
  BarChart2,
  User,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Bell,
  Search,
  HelpCircle,
} from 'lucide-react';

// Props interface for the component
interface WholesalerPortalLayoutProps {
  children: React.ReactNode;
}

export function WholesalerPortalLayout({ children }: WholesalerPortalLayoutProps) {
  const location = useLocation();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  // Handle mobile menu toggle
  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };
  
  // Handle notifications panel toggle
  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };
  
  // Navigation items
  const navItems = [
    {
      name: 'Dashboard',
      path: '/wholesaler',
      icon: <Home className="w-5 h-5" />,
    },
    {
      name: 'Place Orders',
      path: '/wholesaler/orders',
      icon: <ShoppingBag className="w-5 h-5" />,
    },
    {
      name: 'Marketing Materials',
      path: '/wholesaler/marketing',
      icon: <FileText className="w-5 h-5" />,
    },
    {
      name: 'Sales Performance',
      path: '/wholesaler/performance',
      icon: <BarChart2 className="w-5 h-5" />,
    },
    {
      name: 'Account',
      path: '/wholesaler/account',
      icon: <User className="w-5 h-5" />,
    },
  ];
  
  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: 'Order Confirmation',
      message: 'Your order #12345 has been processed and will ship soon.',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      title: 'New Products Available',
      message: 'Check out the new summer collection now available for wholesale.',
      time: '1 day ago',
      read: true,
    },
    {
      id: 3,
      title: 'Price Update',
      message: 'Wholesale pricing for select products has been updated.',
      time: '3 days ago',
      read: true,
    },
  ];
  
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-30">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and mobile menu button */}
            <div className="flex items-center">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500 lg:hidden"
                onClick={toggleMobileNav}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileNavOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
              
              <div className="flex-shrink-0 flex items-center ml-4 lg:ml-0">
                <Link to="/" className="flex items-center">
                  <img
                    className="h-8 w-auto"
                    src="/images/c-logo.png"
                    alt="care•atin"
                  />
                  <span className="ml-2 text-lg font-semibold text-neutral-900">
                    Wholesaler Portal
                  </span>
                </Link>
              </div>
            </div>
            
            {/* Search - Desktop only */}
            <div className="hidden md:flex md:flex-1 md:justify-center px-2 lg:ml-6 lg:justify-end">
              <div className="max-w-lg w-full lg:max-w-xs">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-neutral-400" aria-hidden="true" />
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg leading-5 bg-white placeholder-neutral-500 focus:outline-none focus:placeholder-neutral-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                    placeholder="Search products, orders..."
                    type="search"
                  />
                </div>
              </div>
            </div>
            
            {/* Right navigation */}
            <div className="flex items-center lg:ml-4">
              {/* Notifications */}
              <div className="relative ml-3">
                <button
                  type="button"
                  className="p-1 rounded-full bg-white text-neutral-500 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 relative"
                  onClick={toggleNotifications}
                >
                  <span className="sr-only">View notifications</span>
                  <Bell className="h-6 w-6" aria-hidden="true" />
                  {notifications.some(n => !n.read) && (
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
                  )}
                </button>
                
                {/* Notifications panel */}
                <AnimatePresence>
                  {isNotificationsOpen && (
                    <motion.div 
                      className="origin-top-right absolute right-0 mt-2 w-80 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.1 }}
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-neutral-900">Notifications</h3>
                          <Link to="#" className="text-xs font-medium text-rose-600 hover:text-rose-500">
                            Mark all as read
                          </Link>
                        </div>
                        
                        <div className="mt-3 divide-y divide-neutral-100">
                          {notifications.map((notification) => (
                            <div key={notification.id} className={`py-3 ${!notification.read ? 'bg-rose-50' : ''}`}>
                              <div className="flex items-start">
                                <div className="flex-shrink-0">
                                  <div className={`h-2 w-2 rounded-full ${!notification.read ? 'bg-rose-500' : 'bg-neutral-300'}`}></div>
                                </div>
                                <div className="ml-3 flex-1">
                                  <p className="text-sm font-medium text-neutral-900">{notification.title}</p>
                                  <p className="mt-1 text-sm text-neutral-500">{notification.message}</p>
                                  <p className="mt-1 text-xs text-neutral-400">{notification.time}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <Link 
                          to="#" 
                          className="block mt-3 text-center text-sm font-medium text-rose-600 hover:text-rose-500"
                        >
                          View all notifications
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Help */}
              <div className="ml-3">
                <button
                  type="button"
                  className="p-1 rounded-full bg-white text-neutral-500 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                >
                  <span className="sr-only">View help</span>
                  <HelpCircle className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              
              {/* Profile dropdown */}
              <div className="ml-3 relative">
                <div>
                  <button
                    type="button"
                    className="flex items-center max-w-xs rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-800 font-medium">
                      WS
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex h-screen overflow-hidden bg-neutral-50 pt-16">
        {/* Sidebar for desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64 border-r border-neutral-200 bg-white">
            <div className="h-0 flex-1 flex flex-col overflow-y-auto">
              {/* Navigation */}
              <nav className="flex-1 px-2 py-4 space-y-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        isActive
                          ? 'bg-rose-50 text-rose-700'
                          : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50'
                      }`}
                    >
                      <div className={`mr-3 ${isActive ? 'text-rose-500' : 'text-neutral-500 group-hover:text-neutral-700'}`}>
                        {item.icon}
                      </div>
                      {item.name}
                      {isActive && (
                        <span className="bg-rose-100 ml-auto inline-block py-0.5 px-3 text-xs rounded-full">
                          Active
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
              
              {/* Footer */}
              <div className="p-4 border-t border-neutral-200">
                <Link
                  to="/account"
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50"
                >
                  <Settings className="mr-3 h-5 w-5 text-neutral-500 group-hover:text-neutral-700" />
                  Settings
                </Link>
                <Link
                  to="/logout"
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50"
                >
                  <LogOut className="mr-3 h-5 w-5 text-neutral-500 group-hover:text-neutral-700" />
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile navigation overlay */}
        <AnimatePresence>
          {isMobileNavOpen && (
            <motion.div
              className="lg:hidden fixed inset-0 z-40 flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className="fixed inset-0 bg-neutral-600 bg-opacity-75"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={toggleMobileNav}
              ></motion.div>
              
              <motion.div
                className="relative flex-1 flex flex-col max-w-xs w-full bg-white"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={toggleMobileNav}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <X className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
                
                <div className="flex-1 h-0 overflow-y-auto pt-5 pb-4">
                  <div className="flex-shrink-0 flex items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src="/images/c-logo.png"
                      alt="care•atin"
                    />
                    <span className="ml-2 text-lg font-semibold text-neutral-900">
                      Wholesaler Portal
                    </span>
                  </div>
                  
                  <nav className="mt-5 px-2 space-y-1">
                    {navItems.map((item) => {
                      const isActive = location.pathname === item.path;
                      
                      return (
                        <Link
                          key={item.name}
                          to={item.path}
                          className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                            isActive
                              ? 'bg-rose-50 text-rose-700'
                              : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50'
                          }`}
                          onClick={toggleMobileNav}
                        >
                          <div className={`mr-4 ${isActive ? 'text-rose-500' : 'text-neutral-500 group-hover:text-neutral-700'}`}>
                            {item.icon}
                          </div>
                          {item.name}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
                
                <div className="flex-shrink-0 flex border-t border-neutral-200 p-4">
                  <Link
                    to="/account"
                    className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50"
                    onClick={toggleMobileNav}
                  >
                    <Settings className="mr-4 h-5 w-5 text-neutral-500 group-hover:text-neutral-700" />
                    Settings
                  </Link>
                </div>
                
                <div className="flex-shrink-0 flex border-t border-neutral-200 p-4">
                  <Link
                    to="/logout"
                    className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50"
                    onClick={toggleMobileNav}
                  >
                    <LogOut className="mr-4 h-5 w-5 text-neutral-500 group-hover:text-neutral-700" />
                    Logout
                  </Link>
                </div>
              </motion.div>
              
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Main content */}
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
} 