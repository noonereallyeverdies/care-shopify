import { Link } from '@remix-run/react';
import { useRootLoaderData } from '~/root';

export function Footer() {
  const { shop } = useRootLoaderData();
  
  return (
    <footer className="bg-primary text-white">
      {/* Benefits Bar */}
      <div className="bg-white text-primary py-8 section-spacing">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            <h3 className="font-light tracking-tight mb-1 brand-heading">free us shipping</h3>
            <p className="text-sm brand-body">on orders more than $75</p>
          </div>
          
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="font-light tracking-tight mb-1 brand-heading">no-hassle return policy</h3>
            <p className="text-sm brand-body">60 days to try risk-free</p>
          </div>
          
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <h3 className="font-light tracking-tight mb-1 brand-heading">1 year premium warranty</h3>
            <p className="text-sm brand-body">free replacement for any product issues</p>
          </div>
        </div>
      </div>
      
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 section-spacing">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-lg font-light mb-4 brand-heading">shop by collection</h3>
            <ul className="space-y-2 brand-body">
              <li><Link to="/collections/all" className="text-neutral-200 hover:text-white transition-colors">shop all</Link></li>
              <li><Link to="/collections/red-light-therapy" className="text-neutral-200 hover:text-white transition-colors">red light therapy devices</Link></li>
              <li><Link to="/collections/scalp-treatment" className="text-neutral-200 hover:text-white transition-colors">scalp treatments</Link></li>
              <li><Link to="/collections/hair-care" className="text-neutral-200 hover:text-white transition-colors">hair care</Link></li>
              <li><Link to="/collections/accessories" className="text-neutral-200 hover:text-white transition-colors">accessories</Link></li>
            </ul>
          </div>
          
          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-light mb-4 brand-heading">shop by area</h3>
            <ul className="space-y-2 brand-body">
              <li><Link to="/collections/face" className="text-neutral-200 hover:text-white transition-colors">face</Link></li>
              <li><Link to="/collections/eye" className="text-neutral-200 hover:text-white transition-colors">eye</Link></li>
              <li><Link to="/collections/neck-chest" className="text-neutral-200 hover:text-white transition-colors">neck & chest</Link></li>
              <li><Link to="/collections/body" className="text-neutral-200 hover:text-white transition-colors">body</Link></li>
              <li><Link to="/collections/hands" className="text-neutral-200 hover:text-white transition-colors">hands</Link></li>
            </ul>
          </div>
          
          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-light mb-4 brand-heading">explore</h3>
            <ul className="space-y-2 brand-body">
              <li><Link to="/pages/science" className="text-neutral-200 hover:text-white transition-colors">how light therapy works</Link></li>
              <li><Link to="/pages/results" className="text-neutral-200 hover:text-white transition-colors">before & afters</Link></li>
              <li><Link to="/pages/hair-quiz" className="text-neutral-200 hover:text-white transition-colors">quiz: find your device</Link></li>
              <li><Link to="/pages/about" className="text-neutral-200 hover:text-white transition-colors">our story</Link></li>
              <li><Link to="/journal" className="text-neutral-200 hover:text-white transition-colors">hair science journal</Link></li>
            </ul>
          </div>
          
          {/* Column 4 */}
          <div>
            <h3 className="text-lg font-light mb-4 brand-heading">help</h3>
            <ul className="space-y-2 brand-body">
              <li><Link to="/pages/faq" className="text-neutral-200 hover:text-white transition-colors">frequently asked questions</Link></li>
              <li><Link to="/policies/refund-policy" className="text-neutral-200 hover:text-white transition-colors">return policy</Link></li>
              <li><Link to="/pages/warranty" className="text-neutral-200 hover:text-white transition-colors">device warranty</Link></li>
              <li><Link to="/pages/guides" className="text-neutral-200 hover:text-white transition-colors">tutorials & guides</Link></li>
              <li><Link to="/pages/contact" className="text-neutral-200 hover:text-white transition-colors">contact us</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Logo and Tagline */}
        <div className="mt-12 mb-6 text-center">
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-3 brand-heading">
            care<span className="brand-dot">•</span>atin
          </h2>
          <p className="text-neutral-300 italic brand-body">illuminate your hair's potential</p>
        </div>
        
        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-12">
          <a href="https://instagram.com" aria-label="Instagram" className="hover:text-rose-400 transition-colors">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="https://facebook.com" aria-label="Facebook" className="hover:text-rose-400 transition-colors">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="https://twitter.com" aria-label="Twitter" className="hover:text-rose-400 transition-colors">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a href="https://pinterest.com" aria-label="Pinterest" className="hover:text-rose-400 transition-colors">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
            </svg>
          </a>
          <a href="https://youtube.com" aria-label="YouTube" className="hover:text-rose-400 transition-colors">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="https://tiktok.com" aria-label="TikTok" className="hover:text-rose-400 transition-colors">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
            </svg>
          </a>
        </div>
        
        {/* Disclaimer */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 text-xs text-neutral-300 brand-body">
          <div className="border border-neutral-700 rounded-lg p-4">
            <p>protected by patents globally, including US20230271003A1, CA3211634A1, BR112023018367A2, MX2023010674A, EP4304709A1, CN112795541A, WO2022192775A1, AU2022231817A1, D1037474S, and KR20230156925A</p>
          </div>
          <div className="border border-neutral-700 rounded-lg p-4">
            <p>the statements on this website have not been evaluated by the FDA. the information provided on this site is not intended to diagnose, treat, cure, or prevent any disease and should not be construed as medical advice. results may not be typical.</p>
          </div>
        </div>
        
        {/* Bottom Links */}
        <div className="flex flex-wrap justify-center space-x-4 text-sm text-neutral-400 mb-8 brand-body">
          <Link to="/policies/terms-of-service" className="hover:text-white transition-colors">terms & conditions</Link>
          <Link to="/policies/privacy-policy" className="hover:text-white transition-colors">privacy policy</Link>
          <Link to="/policies/shipping-policy" className="hover:text-white transition-colors">cookie policy</Link>
          <Link to="/pages/ccpa" className="hover:text-white transition-colors">california privacy notice</Link>
          <button className="hover:text-white transition-colors">privacy choices</button>
        </div>
        
        {/* Copyright and Payment Methods */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-neutral-800 text-sm text-neutral-400 brand-body">
          <p>© care<span className="brand-dot">•</span>atin {new Date().getFullYear()} • all rights reserved</p>
          
          <div className="flex space-x-2 mt-4 md:mt-0">
            <img src="/images/payment/amex.svg" alt="American Express payment method" className="h-8" />
            <img src="/images/payment/apple-pay.svg" alt="Apple Pay payment method" className="h-8" />
            <img src="/images/payment/discover.svg" alt="Discover payment method" className="h-8" />
            <img src="/images/payment/mastercard.svg" alt="Mastercard payment method" className="h-8" />
            <img src="/images/payment/paypal.svg" alt="PayPal payment method" className="h-8" />
            <img src="/images/payment/shop-pay.svg" alt="Shop Pay payment method" className="h-8" />
            <img src="/images/payment/venmo.svg" alt="Venmo payment method" className="h-8" />
            <img src="/images/payment/visa.svg" alt="Visa payment method" className="h-8" />
          </div>
        </div>
      </div>
    </footer>
  );
} 