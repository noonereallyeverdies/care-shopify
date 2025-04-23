import { Link } from '@remix-run/react';
import type { EnhancedMenu, ParentEnhancedMenuItem, ChildEnhancedMenuItem } from '~/lib/utils';
import { Facebook, Instagram, Twitter } from 'lucide-react'; // Example: Using lucide-react for icons

// Import the CSS file for base structural styling
import './Footer.css';

// --- Helper function for Policy Links ---
function FooterPolicyLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link 
      to={to} 
      className="footer-bottom-link text-stone-400 hover:text-white text-xs px-3 relative" /* Increased px */
    >
      {children}
    </Link>
  );
}
// --------------------------------------

export function FooterFallback() {
  // Use CSS classes for fallback structure
  return (
    <footer className="footer fallback bg-stone-900 text-stone-300 border-t border-stone-700"> {/* Basic dark fallback */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Care-atin. All rights reserved.</p>
      </div>
    </footer>
  );
}

// Updated Footer component using CSS classes and structure inspired by modern e-commerce sites
export function Footer({ footer }: { footer?: EnhancedMenu | null }) {
  const renderMenuItem = (item: ParentEnhancedMenuItem | ChildEnhancedMenuItem) => (
    <li key={item.id} className="footer-list-item">
      <Link 
        to={item.to} 
        target={item.target} 
        prefetch="intent"
        className="footer-link text-stone-300 hover:text-white" /* Link styling */
      >
        {item.title}
      </Link>
    </li>
  );

  return (
    <footer className="footer bg-stone-900 text-stone-300 border-t border-stone-700 py-16 lg:py-20"> {/* Increased padding */}
      {/* Top Section: Logo + Main Content - Use Flexbox */} 
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 max-w-7xl mx-auto mb-16 px-6 lg:px-8"> {/* Increased gap/margin, added horizontal padding */}
        {/* Logo Area */} 
        <div className="lg:w-1/3 flex-shrink-0"> {/* Increased width slightly */}
          {/* --- LOGO --- */} 
          <Link to="/" className="block mb-6"> {/* Link wraps image */} 
            {/* Placeholder for actual logo image - replace src */}
            <img 
              src="/images/c-white.png" /* Updated with provided logo path */
              alt="Care-atin Logo" 
              className="h-10 w-auto" /* Adjusted height */
              width={150} /* Optional: provide explicit width/height */
              height={40} 
            /> 
          </Link>
          {/* --- END LOGO --- */} 
          {/* <Link to="/" className="footer-brand-name text-white text-3xl block mb-4">Care-atin</Link> */}
          <p className="footer-brand-description text-stone-300 text-sm leading-relaxed">Unlock your hair's potential with science-backed care.</p> {/* Added leading-relaxed */}
        </div>

        {/* Main Content Columns Area */} 
        <div className="footer-content flex-grow"> {/* footer-content now uses grid via CSS */}
          {/* Column: Explore */}
          <div className="footer-column">
             <h4 className="footer-column-title text-white font-serif lowercase tracking-wide">explore</h4> {/* Lowercase, Serif font, tracking */}
             <ul className="footer-list">
              {/* Shop Links */}
              <li className="footer-list-item"><Link to="/products/care-atin-device" className="footer-link text-stone-300 hover:text-white text-sm">Care-atin Device</Link></li> {/* Ensure text-sm */}
              <li className="footer-list-item"><Link to="/collections/all" className="footer-link text-stone-300 hover:text-white text-sm">All Products</Link></li>
              {/* Company Links */}
              <li className="footer-list-item"><Link to="/about" className="footer-link text-stone-300 hover:text-white text-sm">About Us</Link></li>
              <li className="footer-list-item"><Link to="/blog" className="footer-link text-stone-300 hover:text-white text-sm">Blog</Link></li>
              <li className="footer-list-item"><Link to="/contact" className="footer-link text-stone-300 hover:text-white text-sm">Contact</Link></li> 
             </ul>
          </div>

          {/* Column: Support */}
          {footer?.items && footer.items.length > 0 && (
            <div className="footer-column">
              <h4 className="footer-column-title text-white font-serif lowercase tracking-wide">Support</h4> {/* Lowercase, Serif font, tracking */}
              <ul className="footer-list">
                {footer.items.map((item) => ( /* Ensure map applies text-sm */
                  <li key={item.id} className="footer-list-item">
                    <Link 
                      to={item.to} 
                      target={item.target} 
                      prefetch="intent"
                      className="footer-link text-stone-300 hover:text-white text-sm" 
                    >
                      {item.title}
                    </Link>
                  </li>
                ))} 
              </ul>
            </div>
          )}

          {/* Column: Newsletter & Follow Us */}
          <div className="footer-column">
            <h4 className="footer-column-title text-white font-serif lowercase tracking-wide">Follow Us</h4> {/* Lowercase, Serif font, tracking */}
            <div className="social-links-horizontal mb-8"> {/* Added margin below icons */} 
              {/* Icons inherit text color via CSS rules */}
              <a href="#" aria-label="Facebook" className="social-link-icon text-stone-300 hover:text-white"><Facebook size={20} /></a>
              <a href="#" aria-label="Instagram" className="social-link-icon text-stone-300 hover:text-white"><Instagram size={20} /></a>
              <a href="#" aria-label="Twitter" className="social-link-icon text-stone-300 hover:text-white"><Twitter size={20} /></a>
            </div>

            {/* Newsletter Section Placeholder */} 
            <h4 className="footer-column-title newsletter-title text-white font-serif lowercase tracking-wide">Join Our Mailing List</h4> {/* Lowercase, Serif font, tracking */}
            <p className="footer-newsletter-text text-stone-300 text-xs mb-4">Stay updated on news and offers.</p> {/* Smaller text, added margin */}
            {/* Add actual form component here later */} 
            <form className="newsletter-form-placeholder">
              {/* Omiwell style: bg-transparent, border-b only, white text/light placeholder */}
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-transparent border-b border-stone-700 text-white placeholder-stone-400 focus:border-white focus:ring-0 w-full text-sm" /* Ensure text-sm */
              />
              {/* Omiwell style: transparent bg, white text, slightly dimmer hover */}
              <button 
                type="submit" 
                className="newsletter-button bg-transparent text-white hover:text-stone-300 text-right font-normal text-xs uppercase tracking-wider mt-4" /* Smaller text, added margin top */
              >Sign Up</button>
            </form>
          </div>
        </div>
      </div>

      {/* Middle Section: Disclaimer */}
      <div className="max-w-5xl mx-auto my-12 lg:my-16 px-6 lg:px-8"> {/* Increased margin, added horizontal padding */}
        <div className="footer-disclaimer border border-stone-700 rounded-lg p-6 text-xs text-stone-400 leading-relaxed"> {/* Increased padding, leading */}
          *Statements on this website have not been evaluated by the Food and Drug Administration. Any products discussed or advertised are not intended to diagnose, treat, cure or prevent any disease. Testimonial results are not typical. If you are pregnant, nursing, taking medication, or have a medical condition, consult your physician before using any dietary supplement. 
          {/* Placeholder Disclaimer */} 
        </div>
      </div>
      
      {/* Bottom Section: Copyright & Policy Links */}
      <div className="footer-bottom border-t border-stone-700 text-center pt-8 pb-12 px-6 lg:px-8"> {/* Increased padding, added horizontal padding */} 
        {/* Copyright */} 
        <div className="footer-bottom-center mb-4"> {/* Increased margin bottom */}
          <p className="text-stone-400 text-xs">&copy; {new Date().getFullYear()} Care-atin. All rights reserved.</p> 
        </div>

        {/* Policy Links */} 
        <div className="footer-policy-links flex flex-wrap justify-center items-center gap-y-2"> {/* Added gap-y */} 
          {/* Add actual policy links here */} 
          <FooterPolicyLink to="/policies/refund-policy">Refund policy</FooterPolicyLink>
          <FooterPolicyLink to="/policies/privacy-policy">Privacy policy</FooterPolicyLink>
          <FooterPolicyLink to="/policies/terms-of-service">Terms of service</FooterPolicyLink>
          <FooterPolicyLink to="/policies/shipping-policy">Shipping policy</FooterPolicyLink>
          <FooterPolicyLink to="/pages/contact">Contact information</FooterPolicyLink>
          {/* Add more links as needed */} 
        </div>

        {/* Removed Placeholder Selectors and Payment Icons */} 
      </div>
    </footer>
  );
}

// Removed the inline footerStyles object 