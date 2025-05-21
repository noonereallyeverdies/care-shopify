import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@remix-run/react';
import {
  Instagram, 
  Facebook,
  Twitter, 
  Youtube,
  ChevronDown,
  Star
} from 'lucide-react';

const footerSections = [
  {
    title: "shop",
    links: [
      { name: "photonique touch device", href: "/products/photonique-touch" },
      { name: "hair care accessories", href: "/collections/accessories" },
      { name: "find your hair solution", href: "/quiz" },
    ],
  },
  {
    title: "our company",
    links: [
      { name: "before & after results", href: "/pages/before-after" },
      { name: "our story", href: "/about" },
      { name: "hair care journal", href: "/journal" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { name: "Warranty Information", href: "/pages/warranty" },
      { name: "shipping policy", href: "/policies/shipping-policy" },
      { name: "Help Center", href: "/pages/faq" },
      { name: "Contact Us", href: "/pages/contact" },
    ],
  },
];

const socialLinks = [
  { name: "Instagram", Icon: Instagram, href: "https://instagram.com" },
  { name: "Facebook", Icon: Facebook, href: "https://facebook.com" },
  { name: "Twitter", Icon: Twitter, href: "https://twitter.com" },
  { name: "Youtube", Icon: Youtube, href: "https://youtube.com" },
];

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => {
  return (
    <Link to={href} prefetch="intent" className="group text-neutral-400 hover:text-neutral-100 transition-colors duration-200 block py-1 relative">
      {children}
      <span className="absolute bottom-0 left-0 h-px w-0 bg-neutral-100 transition-all duration-300 ease-out group-hover:w-full"></span>
    </Link>
  );
};

interface CollapsibleLinkGroupProps {
  title: string;
  links: { name: string; href: string }[];
}

const CollapsibleLinkGroup: React.FC<CollapsibleLinkGroupProps> = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-2">
      <button 
        className="flex md:hidden justify-between items-center w-full py-2 text-lg font-medium text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </button>
      <h3 className="hidden md:block text-xs font-normal text-neutral-300 mb-4">{title}</h3>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto", marginTop: '8px' },
              collapsed: { opacity: 0, height: 0, marginTop: '0px' },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
          >
            <ul className="space-y-1">
              {links.map((link) => (
                <li key={link.name}><FooterLink href={link.href}>{link.name}</FooterLink></li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <ul className="hidden md:block space-y-1.5">
        {links.map((link) => (
          <li key={link.name}><FooterLink href={link.href}>{link.name}</FooterLink></li>
        ))}
      </ul>
      </div>
  );
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-neutral-300 pt-12 pb-4 font-sans">
      <div className="container mx-auto px-6">

        {/* "care • atin" Logo and Tagline Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white">
            care<span className="text-red-500">•</span>atin
          </h2>
          <p className="text-neutral-400 text-sm mt-2">
            designed in california. where beauty meets care.
          </p>
        </div>

        {/* Top section: Links and Newsletter/Social */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Link Groups */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {footerSections.map((section) => (
              <CollapsibleLinkGroup key={section.title} title={section.title} links={section.links} />
            ))}
          </div>
          
          {/* Newsletter and Social */}
          <div className="md:col-span-1 lg:col-span-1 flex flex-col items-start">
            <h3 className="text-lg font-medium text-white mb-3">your email address</h3>
            <form className="w-full mb-5">
              <label htmlFor="footer-newsletter-email" className="sr-only">your email address</label>
              <div className="flex items-stretch gap-2 w-full">
                <input 
                  type="email" 
                  name="email" 
                  id="footer-newsletter-email"
                  placeholder="your email address" 
                  className="flex-grow bg-neutral-800 border border-neutral-700 rounded-full py-3 px-4 text-neutral-100 placeholder-neutral-400 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none text-sm text-center md:text-left"
                />
                <button 
                  type="submit" 
                  aria-label="Subscribe to newsletter"
                  className="bg-pink-500 text-white rounded-full p-3 flex-shrink-0 hover:bg-pink-600 transition-colors aspect-square flex items-center justify-center"
                >
                  <Star className="h-5 w-5" />
                </button>
              </div>
              <p className="text-xs text-neutral-400 mt-2 ml-1">by subscribing, you agree to our privacy policy</p>
            </form>
            
            <h4 className="text-lg font-medium text-white mb-3">follow us</h4>
            <div className="flex space-x-2.5">
              {socialLinks.map((social) => (
                <a 
                  key={social.name} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={social.name} 
                  className="bg-neutral-700 text-neutral-100 rounded-full p-2 hover:bg-pink-500 hover:text-white transition-colors flex items-center justify-center w-9 h-9"
                >
                  <social.Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer Boxes Section */}
        <div className="grid md:grid-cols-2 gap-6 my-12">
          <div className="bg-neutral-800 p-5 rounded-md">
            <p className="text-neutral-300 text-sm leading-relaxed">
              protected by patents globally to provide the best red light therapy technology for hair growth and scalp health.
            </p>
          </div>
          <div className="bg-neutral-800 p-5 rounded-md">
            <p className="text-neutral-300 text-sm leading-relaxed">
              these statements have not been evaluated by the food and drug administration. this product is not intended to diagnose, treat, cure, or prevent any disease. results may vary.
            </p>
          </div>
        </div>
          
        {/* Bottom section: Legal and Copyright */}
        <div className="border-t border-neutral-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 mb-4 md:mb-0">
            <FooterLink href="/policies/privacy-policy">privacy policy</FooterLink>
            <FooterLink href="/policies/terms-of-service">terms of service</FooterLink>
            <FooterLink href="/policies/shipping-policy">shipping</FooterLink>
            <FooterLink href="/pages/accessibility-statement">accessibility</FooterLink>
          </div>
          <p className="text-neutral-400 text-xs">
            © 2025 care<span className="text-red-500">•</span>atin. all rights reserved.
          </p>
        </div>
        </div>
      </footer>
  );
}

export default Footer; 