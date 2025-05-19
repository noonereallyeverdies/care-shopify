import { Link } from '@remix-run/react';
import type { EnhancedMenu, ParentEnhancedMenuItem, ChildEnhancedMenuItem } from '~/lib/utils';
import { Facebook, Instagram, Twitter, Youtube, Package, RotateCcw, Award, Heart, Star, Sparkles, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Import the CSS file for base structural styling
import './Footer.css';

// --- Helper function for Policy Links ---
function FooterPolicyLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link 
      to={to} 
      className="text-stone-300 hover:text-rose-300 text-xs px-4 relative transition-colors duration-300 font-light"
    >
      {children}
    </Link>
  );
}

export function FooterFallback() {
  return (
    <footer className="footer fallback bg-stone-900 text-stone-300 border-t border-stone-700">
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} care•atin. all rights reserved.</p>
      </div>
    </footer>
  );
}

export function Footer({ footer }: { footer?: EnhancedMenu | null }) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.offsetHeight;
      
      // When user scrolls near the footer
      if (scrollPosition > docHeight - windowHeight - 300) {
        setIsVisible(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Benefits Bar */}
      <div className="bg-linear-to-r from-stone-50 to-rose-50 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className={`flex flex-col items-center group hover:scale-105 transition-all duration-500 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{animationDelay: '0ms'}}>
            <div className="w-12 h-12 mb-4 rounded-full bg-white shadow-md flex items-center justify-center group-hover:shadow-rose-200">
              <Package className="w-6 h-6 text-rose-400" />
            </div>
            <h3 className="uppercase text-sm font-light tracking-widest mb-2 text-stone-700">free us shipping</h3>
            <p className="text-sm text-stone-500 font-light">on orders more than $20</p>
          </div>
          
          <div className={`flex flex-col items-center group hover:scale-105 transition-all duration-500 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{animationDelay: '200ms'}}>
            <div className="w-12 h-12 mb-4 rounded-full bg-white shadow-md flex items-center justify-center group-hover:shadow-rose-200">
              <RotateCcw className="w-6 h-6 text-rose-400" />
            </div>
            <h3 className="uppercase text-sm font-light tracking-widest mb-2 text-stone-700">no-hassle return policy</h3>
            <p className="text-sm text-stone-500 font-light">60 days to try risk-free</p>
          </div>
          
          <div className={`flex flex-col items-center group hover:scale-105 transition-all duration-500 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{animationDelay: '400ms'}}>
            <div className="w-12 h-12 mb-4 rounded-full bg-white shadow-md flex items-center justify-center group-hover:shadow-rose-200">
              <Award className="w-6 h-6 text-rose-400" />
            </div>
            <h3 className="uppercase text-sm font-light tracking-widest mb-2 text-stone-700">1 year premium warranty</h3>
            <p className="text-sm text-stone-500 font-light">free replacement for any product issues</p>
          </div>
        </div>
      </div>
    
      {/* Main Footer */}
      <footer className="bg-linear-to-b from-stone-900 to-black text-stone-300 py-16 relative overflow-hidden">
        {/* Background geometric patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-64 h-64 bg-rose-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Footer Links Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mb-16">
            {/* Column 1: Hair Solutions */}
            <div className={`${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`} style={{animationDelay: '0ms'}}>
              <h3 className="text-white text-base font-light tracking-wider mb-6 lowercase">hair solutions</h3>
              <ul className="flex flex-col gap-3">
                <li><Link to="/collections/all" className="text-stone-300 hover:text-rose-300 text-sm transition-colors duration-300 font-light">shop all</Link></li>
                <li><Link to="/products/photonique-touch" className="text-stone-300 hover:text-rose-300 text-sm transition-colors duration-300 font-light">photonique touch device</Link></li>
                <li><Link to="/collections/accessories" className="text-stone-300 hover:text-rose-300 text-sm transition-colors duration-300 font-light">hair care accessories</Link></li>
                <li><Link to="/pages/hair-quiz" className="text-stone-300 hover:text-rose-300 text-sm transition-colors duration-300 font-light">find your hair solution</Link></li>
              </ul>
            </div>
            
            {/* Column 2: Discover */}
            <div className={`${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`} style={{animationDelay: '200ms'}}>
              <h3 className="text-white text-base font-light tracking-wider mb-6 lowercase">discover</h3>
              <ul className="flex flex-col gap-3">
                <li><Link to="/pages/science" className="text-stone-300 hover:text-rose-300 text-sm transition-colors duration-300 font-light">how red light therapy works</Link></li>
                <li><Link to="/pages/results" className="text-stone-300 hover:text-rose-300 text-sm transition-colors duration-300 font-light">before & after results</Link></li>
                <li><Link to="/pages/our-story" className="text-stone-300 hover:text-rose-300 text-sm transition-colors duration-300 font-light">our story</Link></li>
                <li><Link to="/journal" className="text-stone-300 hover:text-rose-300 text-sm transition-colors duration-300 font-light">hair care journal</Link></li>
              </ul>
            </div>
            
            {/* Column 3: Help */}
            <div className={`${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`} style={{animationDelay: '400ms'}}>
              <h3 className="text-white text-base font-light tracking-wider mb-6 lowercase">help & support</h3>
              <ul className="flex flex-col gap-3">
                <li><Link to="/pages/faq" className="text-stone-300 hover:text-rose-300 text-sm transition-colors duration-300 font-light">frequently asked questions</Link></li>
                <li><Link to="/pages/warranty" className="text-stone-300 hover:text-rose-300 text-sm transition-colors duration-300 font-light">warranty information</Link></li>
                <li><Link to="/policies/refund-policy" className="text-stone-300 hover:text-rose-300 text-sm transition-colors duration-300 font-light">returns & refunds</Link></li>
                <li><Link to="/pages/support" className="text-stone-300 hover:text-rose-300 text-sm transition-colors duration-300 font-light">help center</Link></li>
                <li><Link to="/pages/contact" className="text-stone-300 hover:text-rose-300 text-sm transition-colors duration-300 font-light">contact us</Link></li>
              </ul>
            </div>
            
            {/* Column 4: Newsletter */}
            <div className={`${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`} style={{animationDelay: '600ms'}}>
              <h3 className="text-white text-base font-light tracking-wider mb-6 lowercase">join our community</h3>
              <p className="text-stone-300 text-sm mb-5 font-light">stay updated with tips, special offers, and hair care insights.</p>
              <form className="mb-8">
                <div className="relative mb-4 group">
                  <input 
                    type="email" 
                    placeholder="your email address" 
                    className="bg-black/30 border border-stone-700 rounded-full text-white placeholder-stone-400 focus:border-rose-300 focus:ring-0 w-full py-2.5 px-4 text-sm pr-14 transition-all duration-300 group-hover:border-rose-400" 
                  />
                  <motion.button
                    type="submit"
                    aria-label="sign up for newsletter"
                    className="absolute right-1 top-1 bg-rose-400 text-white text-xs rounded-full h-8 w-12 flex items-center justify-center"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
                      backgroundColor: "#f43f5e" // Tailwind rose-500
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    style={{ WebkitAppearance: 'button', cursor: 'pointer' }} // Ensure button appearance
                  >
                    <Sparkles size={16} className="animate-pulse" />
                  </motion.button>
                </div>
                <p className="text-stone-500 text-xs font-light">by subscribing, you agree to our privacy policy</p>
              </form>
              
              <h3 className="text-white text-base font-light tracking-wider mb-3 lowercase">follow us</h3>
              <div className="flex gap-4">
                <a href="#" aria-label="instagram" className="text-stone-400 hover:text-rose-300 transition-colors duration-300">
                  <div className="w-8 h-8 rounded-full bg-black/30 border border-stone-700 flex items-center justify-center hover:border-rose-300 transition-all duration-300 hover:scale-110">
                    <Instagram size={16} />
                  </div>
                </a>
                <a href="#" aria-label="facebook" className="text-stone-400 hover:text-rose-300 transition-colors duration-300">
                  <div className="w-8 h-8 rounded-full bg-black/30 border border-stone-700 flex items-center justify-center hover:border-rose-300 transition-all duration-300 hover:scale-110">
                    <Facebook size={16} />
                  </div>
                </a>
                <a href="#" aria-label="twitter" className="text-stone-400 hover:text-rose-300 transition-colors duration-300">
                  <div className="w-8 h-8 rounded-full bg-black/30 border border-stone-700 flex items-center justify-center hover:border-rose-300 transition-all duration-300 hover:scale-110">
                    <Twitter size={16} />
                  </div>
                </a>
                <a href="#" aria-label="youtube" className="text-stone-400 hover:text-rose-300 transition-colors duration-300">
                  <div className="w-8 h-8 rounded-full bg-black/30 border border-stone-700 flex items-center justify-center hover:border-rose-300 transition-all duration-300 hover:scale-110">
                    <Youtube size={16} />
                  </div>
                </a>
              </div>
            </div>
          </div>
          
          {/* Brand Logo */}
          <div className="text-center mb-16 relative">
            <div className="h-px bg-linear-to-r from-transparent via-stone-700 to-transparent w-full absolute top-1/2 left-0"></div>
            <Link to="/" className="inline-block bg-black relative px-6 transition-transform duration-500 hover:scale-105">
              <h2 className="text-white text-5xl font-extralight tracking-wider">
                care<span className="text-rose-400 font-normal animate-pulse">•</span>atin
              </h2>
            </Link>
            <p className="text-stone-400 font-light text-xs mt-4 italic tracking-widest">designed in california. where beauty meets care.</p>
          </div>
          
          {/* Disclaimers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-black/30 border border-stone-800 p-5 rounded-lg text-xs text-stone-400 leading-relaxed font-light backdrop-blur-sm transition-all duration-500 hover:border-stone-700">
              protected by patents globally to provide the best red light therapy technology for hair growth and scalp health.
            </div>
            <div className="bg-black/30 border border-stone-800 p-5 rounded-lg text-xs text-stone-400 leading-relaxed font-light backdrop-blur-sm transition-all duration-500 hover:border-stone-700">
              the statements on this website have not been evaluated by the fda. the information provided on this site is not intended to diagnose, treat, cure, or prevent any disease and should not be construed as medical advice. results may not be typical.
            </div>
          </div>
          
          {/* Policy Links */}
          <div className="text-center mb-10">
            <div className="flex flex-wrap justify-center">
              <FooterPolicyLink to="/policies/terms-of-service">terms & conditions</FooterPolicyLink>
              <FooterPolicyLink to="/policies/privacy-policy">privacy policy</FooterPolicyLink>
              <FooterPolicyLink to="/policies/shipping-policy">shipping policy</FooterPolicyLink>
              <FooterPolicyLink to="/policies/refund-policy">refund policy</FooterPolicyLink>
              <FooterPolicyLink to="/pages/cookies">cookie policy</FooterPolicyLink>
            </div>
          </div>
          
          {/* Copyright & Payment Methods */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-stone-800">
            <p className="text-stone-400 text-xs mb-6 md:mb-0 font-light">© {new Date().getFullYear()} care•atin. all rights reserved.</p>
            
            <div className="flex gap-2 items-center">
              <img src="/images/payment/visa.svg" alt="visa" className="h-6 w-10 opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/images/payment/mastercard.svg" alt="mastercard" className="h-6 w-10 opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/images/payment/amex.svg" alt="american express" className="h-6 w-10 opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/images/payment/discover.svg" alt="discover" className="h-6 w-10 opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/images/payment/paypal.svg" alt="paypal" className="h-6 w-10 opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/images/payment/applepay.svg" alt="apple pay" className="h-6 w-10 opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/images/payment/googlepay.svg" alt="google pay" className="h-6 w-10 opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/images/payment/shopify.svg" alt="shop pay" className="h-6 w-10 opacity-70 hover:opacity-100 transition-opacity" />
            </div>
          </div>
      </div>
    </footer>
    </>
  );
}

// Add these animation keyframes to your CSS file
// @keyframes fadeInUp {
//   from {
//     opacity: 0;
//     transform: translateY(20px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }

// @keyframes fadeInRight {
//   from {
//     opacity: 0;
//     transform: translateX(-20px);
//   }
//   to {
//     opacity: 1;
//     transform: translateX(0);
//   }
// }

// .animate-fade-in-up {
//   animation: fadeInUp 0.6s ease-out forwards;
// }

// .animate-fade-in-right {
//   animation: fadeInRight 0.6s ease-out forwards;
// } 