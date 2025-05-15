import React, { useState } from 'react';
import { Link } from '@remix-run/react';
import { 
  ArrowRight, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  MessageCircle, 
  X, 
  Shield, 
  AlertCircle,
  Settings,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

export function FooterSection() {
  const [email, setEmail] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Would normally submit to newsletter service
    alert(`Thank you for subscribing with ${email}!`);
    setEmail('');
  };
  
  // Links structured by category
  const footerLinks = {
    solutions: [
      { name: "Hair Loss", href: "/pages/hair-loss" },
      { name: "Thinning Hair", href: "/pages/thinning-hair" },
      { name: "Postpartum Regrowth", href: "/pages/postpartum" },
      { name: "Scalp Health", href: "/pages/scalp-health" },
      { name: "Stress-Related Loss", href: "/pages/stress-related-loss" },
    ],
    discover: [
      { name: "Our Science", href: "/pages/science" },
      { name: "Clinical Studies", href: "/pages/clinical-studies" },
      { name: "Before & After", href: "/pages/before-after" },
      { name: "User Stories", href: "/pages/testimonials" },
      { name: "FAQ", href: "/pages/faq" },
    ],
    support: [
      { name: "Contact Us", href: "/pages/contact" },
      { name: "User Guides", href: "/pages/guides" },
      { name: "Shipping & Delivery", href: "/pages/shipping" },
      { name: "Returns & Warranty", href: "/pages/returns-warranty" },
      { name: "Terms of Service", href: "/pages/terms" },
    ]
  };
  
  // Social media links (with real links or hidden until launch)
  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/careatin", launched: true },
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/careatin", launched: true },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/careatin", launched: false },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com/channel/careatin", launched: true },
    { name: "TikTok", icon: X, href: "https://tiktok.com/@careatin", launched: true }
  ];
  
  // Detailed warranty information
  const warrantyDetails = {
    coverage: "Our devices are covered by a comprehensive 2-year manufacturer's warranty against defects in materials and workmanship under normal use.",
    process: "If your device experiences any issues during the warranty period, our support team will guide you through troubleshooting or replacement options.",
    exclusions: "The warranty does not cover damage from accidents, misuse, or unauthorized modifications."
  };
  
  // Specific return policy details
  const returnPolicy = {
    window: "90-day satisfaction guarantee from the date of delivery",
    condition: "Products must be returned in original packaging with all accessories",
    process: "Initiate returns through your account or by contacting support for a prepaid return label",
    refunds: "Full refunds processed within 5-7 business days after receiving the returned item"
  };

  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand & Newsletter */}
          <div className="md:col-span-4">
            <div className="mb-6">
              <Link to="/" className="inline-block">
                <img 
                  src="/images/logo/care-atin-logo-dark.svg" 
                  alt="Care•atin" 
                  className="h-8"
                />
              </Link>
              <p className="text-neutral-600 mt-4 text-sm">
                Revitalizing hair care through advanced
                red light technology and natural science.
              </p>
            </div>
            
            {/* Newsletter Signup */}
            <div>
              <h3 className="font-medium text-neutral-800 mb-3">Join our community</h3>
              <p className="text-neutral-600 text-sm mb-4">
                Get exclusive offers, hair care tips, and product updates.
              </p>
              
              <form onSubmit={handleSubmit} className="mb-4">
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="flex-grow px-4 py-2 rounded-l-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-r-md transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-2 flex items-start">
                  <input 
                    type="checkbox" 
                    id="privacy-consent" 
                    required 
                    className="mt-1 mr-2"
                  />
                  <label htmlFor="privacy-consent" className="text-xs text-neutral-500">
                    I agree to receive emails and accept the 
                    <Link 
                      to="/pages/privacy" 
                      className="text-rose-600 hover:text-rose-700 transition-colors font-medium underline underline-offset-2 mx-1"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </form>
            </div>
            
            {/* Social Media */}
            <div>
              <h3 className="font-medium text-neutral-800 mb-3">Follow us</h3>
              <div className="flex space-x-4">
                {socialLinks.filter(link => link.launched).map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white hover:bg-neutral-100 text-neutral-700 p-2 rounded-full border border-neutral-200 transition-colors"
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Footer Links - Desktop */}
          <div className="hidden md:grid md:col-span-8 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-neutral-800 font-medium mb-4">Solutions</h3>
              <ul className="space-y-2">
                {footerLinks.solutions.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href} 
                      className="text-neutral-600 hover:text-rose-600 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-neutral-800 font-medium mb-4">Discover</h3>
              <ul className="space-y-2">
                {footerLinks.discover.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href} 
                      className="text-neutral-600 hover:text-rose-600 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-neutral-800 font-medium mb-4">Support</h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href} 
                      className="text-neutral-600 hover:text-rose-600 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Footer Links - Mobile Accordion */}
          <div className="md:hidden w-full">
            <div className="border-t border-neutral-200">
              <button 
                onClick={() => toggleSection('solutions')}
                className="w-full py-3 flex justify-between items-center text-left"
              >
                <h3 className="text-neutral-800 font-medium">Solutions</h3>
                {expandedSection === 'solutions' ? 
                  <ChevronUp className="w-5 h-5 text-neutral-500" /> : 
                  <ChevronDown className="w-5 h-5 text-neutral-500" />
                }
              </button>
              {expandedSection === 'solutions' && (
                <ul className="space-y-2 py-2">
                  {footerLinks.solutions.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.href} 
                        className="text-neutral-600 hover:text-rose-600 transition-colors text-sm block py-1"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <div className="border-t border-neutral-200">
              <button 
                onClick={() => toggleSection('discover')}
                className="w-full py-3 flex justify-between items-center text-left"
              >
                <h3 className="text-neutral-800 font-medium">Discover</h3>
                {expandedSection === 'discover' ? 
                  <ChevronUp className="w-5 h-5 text-neutral-500" /> : 
                  <ChevronDown className="w-5 h-5 text-neutral-500" />
                }
              </button>
              {expandedSection === 'discover' && (
                <ul className="space-y-2 py-2">
                  {footerLinks.discover.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.href} 
                        className="text-neutral-600 hover:text-rose-600 transition-colors text-sm block py-1"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <div className="border-t border-neutral-200">
              <button 
                onClick={() => toggleSection('support')}
                className="w-full py-3 flex justify-between items-center text-left"
              >
                <h3 className="text-neutral-800 font-medium">Support</h3>
                {expandedSection === 'support' ? 
                  <ChevronUp className="w-5 h-5 text-neutral-500" /> : 
                  <ChevronDown className="w-5 h-5 text-neutral-500" />
                }
              </button>
              {expandedSection === 'support' && (
                <ul className="space-y-2 py-2">
                  {footerLinks.support.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.href} 
                        className="text-neutral-600 hover:text-rose-600 transition-colors text-sm block py-1"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        
        {/* Warranty & Returns Sections */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-lg border border-neutral-200 shadow-sm">
            <div className="flex items-start mb-3">
              <Shield className="w-5 h-5 text-rose-600 mr-2 flex-shrink-0 mt-0.5" />
              <h3 className="text-lg font-medium text-neutral-800">2-Year Warranty</h3>
            </div>
            <p className="text-sm text-neutral-600 mb-2">{warrantyDetails.coverage}</p>
            <p className="text-sm text-neutral-600 mb-2">{warrantyDetails.process}</p>
            <p className="text-xs text-neutral-500 italic">{warrantyDetails.exclusions}</p>
            <Link 
              to="/pages/warranty" 
              className="text-sm text-rose-600 hover:text-rose-700 transition-colors font-medium inline-flex items-center mt-2"
            >
              View warranty details
              <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
          
          <div className="bg-white p-5 rounded-lg border border-neutral-200 shadow-sm">
            <div className="flex items-start mb-3">
              <Settings className="w-5 h-5 text-rose-600 mr-2 flex-shrink-0 mt-0.5" />
              <h3 className="text-lg font-medium text-neutral-800">90-Day Returns</h3>
            </div>
            <p className="text-sm text-neutral-600">We offer a {returnPolicy.window}.</p>
            <ul className="text-sm text-neutral-600 mt-2 space-y-1 list-disc pl-5">
              <li>{returnPolicy.condition}</li>
              <li>{returnPolicy.process}</li>
              <li>{returnPolicy.refunds}</li>
            </ul>
            <Link 
              to="/pages/returns" 
              className="text-sm text-rose-600 hover:text-rose-700 transition-colors font-medium inline-flex items-center mt-2"
            >
              Return policy details
              <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
        </div>
        
        {/* Regulatory Information */}
        <div className="mt-12 bg-white p-5 rounded-lg border border-neutral-200 shadow-sm">
          <div className="flex items-start mb-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
            <h3 className="text-lg font-medium text-neutral-800">Important Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-neutral-700 mb-2">FDA Disclaimer</h4>
              <div className="text-xs text-neutral-600 p-3 bg-neutral-50 rounded border border-neutral-200">
                <p>
                  These statements have not been evaluated by the Food and Drug Administration. 
                  This product is not intended to diagnose, treat, cure, or prevent any disease.
                </p>
                <p className="mt-2">
                  The Care•atin device is classified as a cosmetic appliance and is not a medical device 
                  as defined by the FDA. It is intended for cosmetic use only. Individual results may vary.
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-neutral-700 mb-2">Patent & Trademark Information</h4>
              <div className="text-xs text-neutral-600 p-3 bg-neutral-50 rounded border border-neutral-200">
                <p>
                  Care•atin™ is a registered trademark of Aesthetic Health Technologies, Inc.
                </p>
                <p className="mt-2">
                  Our products are protected by U.S. Patent No. 10,842,917 and U.S. Patent No. 11,129,982 
                  with additional patents pending. Unauthorized reproduction or distribution is prohibited.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-neutral-200 py-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-xs text-neutral-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} Aesthetic Health Technologies. All rights reserved.
          </div>
          
          <div className="flex space-x-4">
            <Link to="/pages/privacy" className="text-xs text-neutral-500 hover:text-neutral-800 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/pages/terms" className="text-xs text-neutral-500 hover:text-neutral-800 transition-colors">
              Terms of Service
            </Link>
            <Link to="/pages/accessibility" className="text-xs text-neutral-500 hover:text-neutral-800 transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
      
      {/* Live Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {showChat ? (
          <div className="bg-white rounded-lg shadow-lg border border-neutral-200 w-72 overflow-hidden">
            <div className="bg-rose-600 text-white p-3 flex justify-between items-center">
              <h4 className="font-medium">Customer Support</h4>
              <button 
                onClick={() => setShowChat(false)}
                className="text-white hover:text-neutral-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 h-80 bg-neutral-50 flex flex-col justify-center items-center text-center">
              <p className="text-neutral-600 mb-4">Our support team is here to help.</p>
              <div className="space-y-2 w-full">
                <a 
                  href="mailto:support@careatin.com" 
                  className="block w-full bg-rose-600 hover:bg-rose-700 text-white py-2 px-4 rounded transition-colors text-sm text-center"
                >
                  Email Support
                </a>
                <a 
                  href="tel:+18005551234" 
                  className="block w-full bg-neutral-200 hover:bg-neutral-300 text-neutral-800 py-2 px-4 rounded transition-colors text-sm text-center"
                >
                  Call: 1-800-555-1234
                </a>
                <p className="text-xs text-neutral-500 mt-4">
                  Available Monday-Friday, 9am-5pm EST
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowChat(true)}
            className="bg-rose-600 hover:bg-rose-700 text-white p-3 rounded-full shadow-lg flex items-center justify-center transition-colors"
            aria-label="Open support chat"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        )}
      </div>
    </footer>
  );
} 