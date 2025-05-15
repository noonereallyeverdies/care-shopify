import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, ChevronRight, Info, Star, Package, ShoppingCart, Clock, Plus } from 'lucide-react';
import { Link } from '@remix-run/react';

// Import analytics hooks
import { 
  useAnalyticsSectionView, 
  useAnalyticsButtonClick, 
  useAnalyticsProduct,
  useAnalyticsTrack 
} from '~/lib/analytics-hooks';

export function ProductShowcaseSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [showFinanceDetails, setShowFinanceDetails] = useState(false);
  
  // Analytics tracking
  const sectionRef = useAnalyticsSectionView('product_showcase');
  const trackButtonClick = useAnalyticsButtonClick();
  const { trackProductView, trackAddToCart } = useAnalyticsProduct();
  const trackCustomEvent = useAnalyticsTrack();
  
  // Tab options with tooltips for clarity
  const tabs = [
    { name: "Device Features", tooltip: "Explore device specifications and technical features" },
    { name: "Lifestyle Views", tooltip: "See the device in everyday use settings" },
    { name: "Clinical Results", tooltip: "View before and after treatment results" },
  ];
  
  // Key metrics with descriptions
  const metrics = [
    { value: "168", label: "Red Light LEDs", description: "Precise 650-680nm wavelength for optimal cellular stimulation" },
    { value: "10", label: "Minutes per Session", description: "Quick, effective treatments fit easily into your routine" },
    { value: "93%", label: "Satisfaction Rate", description: "Based on clinical trials with 200+ participants" },
    { value: "28%", label: "Average Density Increase", description: "Measured after 12 weeks of consistent use" },
  ];
  
  // Box contents
  const boxContents = [
    { name: "Care•atin Device", description: "With protective cap" },
    { name: "USB-C Charging Cable", description: "Fast charging, universal compatibility" },
    { name: "15ml Starter Serum", description: "3-4 weeks supply" },
    { name: "Travel Pouch", description: "Water-resistant protective case" },
    { name: "Quick Start Guide", description: "Simple setup instructions" },
    { name: "2-Year Warranty Card", description: "Register online for coverage" },
  ];
  
  // Related products for cross-selling
  const relatedProducts = [
    {
      id: "prod_01",
      name: "Care•atin Revitalizing Serum",
      price: 39,
      description: "60ml supply (2-month), specially formulated for optimal results with your device",
      image: "/images/products/revitalizing-serum.jpg",
    },
    {
      id: "prod_02",
      name: "Replacement Massage Tips",
      price: 19,
      description: "Set of 2 silicone tips, recommended to replace every 6 months",
      image: "/images/products/replacement-tips.jpg",
    }
  ];
  
  // Format date for the limited time offer (3 months from now)
  const currentDate = new Date();
  const offerEndDate = new Date(currentDate.setMonth(currentDate.getMonth() + 3));
  const formattedDate = offerEndDate.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Track product view on component mount
  useEffect(() => {
    trackProductView('care-atin-device', 'Care•atin Hair Revitalizing Device');
  }, [trackProductView]);

  // Handle tab clicks with analytics
  const handleTabClick = (index: number) => {
    setActiveTab(index);
    trackCustomEvent({
      action: 'tab_click',
      category: 'product_showcase',
      label: tabs[index].name,
      custom_parameters: {
        tab_index: index,
        tab_name: tabs[index].name,
        brand: 'care_atin'
      }
    });
  };

  // Handle metric hover with analytics
  const handleMetricHover = (metric: typeof metrics[0]) => {
    trackCustomEvent({
      action: 'metric_hover',
      category: 'product_showcase',
      label: metric.label,
      custom_parameters: {
        metric_value: metric.value,
        metric_label: metric.label,
        brand: 'care_atin'
      }
    });
  };

  // Handle add to cart with analytics
  const handleAddToCart = () => {
    trackAddToCart('care-atin-device', 'Care•atin Hair Revitalizing Device', 1);
    trackButtonClick('main_add_to_cart', 'product_showcase');
  };

  // Handle related product add to cart
  const handleRelatedAddToCart = (product: typeof relatedProducts[0]) => {
    trackAddToCart(product.id, product.name, 1);
    trackButtonClick(`related_add_to_cart_${product.id}`, 'product_showcase');
  };

  // Handle financing toggle
  const handleFinancingToggle = () => {
    setShowFinanceDetails(!showFinanceDetails);
    trackCustomEvent({
      action: showFinanceDetails ? 'financing_close' : 'financing_open',
      category: 'product_showcase',
      label: 'affirm_financing',
      custom_parameters: {
        brand: 'care_atin',
        financing_provider: 'affirm'
      }
    });
  };
  
  return (
    <section ref={sectionRef} className="py-16 md:py-24 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-white opacity-50 z-0"></div>
      
      {/* Editorial film grain overlay for sophistication */}
      <div className="editorial-image-grain"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-rose-600 font-medium block mb-2">Premium Experience</span>
          <h2 className="heading-lg brand-heading mb-4">
            Advanced Hair Revitalization
          </h2>
          <p className="text-feature text-neutral-700">
            Cutting-edge technology backed by science, designed for your hair restoration journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Product Showcase - Enhanced with better visuals */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-100">
            <div className="mb-8">
              <div className="inline-flex space-x-3 mb-6">
                {tabs.map((tab, idx) => (
                  <div key={idx} className="relative group">
                    <button
                      onClick={() => handleTabClick(idx)}
                      className={`px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeTab === idx 
                          ? 'bg-rose-600 text-white shadow-md' 
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                      aria-label={tab.name}
                    >
                      {tab.name}
                    </button>
                    
                    {/* Enhanced tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-56 p-3 bg-neutral-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg">
                      {tab.tooltip}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-neutral-800"></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-neutral-50 rounded-xl overflow-hidden aspect-square relative shadow-inner border border-neutral-200">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <img 
                      src={`/images/product/showcase-${activeTab + 1}.jpg`} 
                      alt={`Care•atin device - ${tabs[activeTab].name}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            
            {/* Key Metrics - Enhanced for better visualization */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {metrics.map((metric, idx) => (
                <div 
                  key={idx} 
                  className="bg-white p-5 rounded-xl border border-rose-100 shadow-md text-center relative group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  onMouseEnter={() => handleMetricHover(metric)}
                >
                  <div className="text-2xl font-bold text-rose-600 mb-2">{metric.value}</div>
                  <div className="text-sm text-neutral-700 font-medium">{metric.label}</div>
                  
                  {/* Information tooltip - Enhanced for better visibility */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center border border-rose-200 shadow-sm">
                    <Info className="w-3.5 h-3.5 text-rose-600" />
                  </div>
                  
                  <div className="absolute bottom-full right-0 mb-3 w-56 p-3 bg-white text-neutral-700 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg border border-neutral-200">
                    {metric.description}
                    <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white border-r border-b border-neutral-200"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Info & Pricing - Enhanced with better visuals */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-100 mb-8">
              <div className="mb-6">
                <h2 className="heading-lg mb-3">Care•atin Hair Revitalizing Device</h2>
                <div className="flex items-center mb-5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-neutral-600 ml-3 font-medium">4.8/5 (326 reviews)</span>
                </div>
                <p className="text-feature text-neutral-700 mb-6">
                  Advanced red light therapy device clinically proven to improve hair density, strength, and overall scalp health. Non-invasive, drug-free solution for all hair types.
                </p>
              </div>
              
              {/* Pricing Section - Enhanced with gradient accents */}
              <div className="bg-gradient-to-br from-neutral-50 to-white p-6 rounded-xl border border-neutral-100 mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <div>
                    <div className="text-4xl font-bold text-neutral-800">$89</div>
                    <div className="text-sm text-neutral-500 flex items-center mt-1">
                      <span className="line-through">Regular price: $129</span>
                      <span className="bg-rose-100 text-rose-700 text-xs px-3 py-1 rounded-full ml-2">Save $40</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 text-sm px-4 py-2 rounded-lg flex items-center mt-4 md:mt-0 shadow-sm">
                    <Clock className="w-4 h-4 mr-2" />
                    Limited offer until {formattedDate}
                  </div>
                </div>
              </div>
              
              {/* Financing Option - Enhanced for better visibility */}
              <div className="mb-8">
                <button 
                  onClick={handleFinancingToggle}
                  className="w-full flex items-center justify-between bg-white p-4 rounded-xl border border-neutral-200 text-left hover:border-neutral-300 transition-colors shadow-sm"
                >
                  <div className="flex items-center">
                    <span className="text-neutral-800 font-medium text-lg">$14.83/month</span>
                    <span className="text-neutral-500 text-sm ml-3">with Affirm</span>
                  </div>
                  {showFinanceDetails ? 
                    <ChevronDown className="w-5 h-5 text-rose-500" /> : 
                    <ChevronRight className="w-5 h-5 text-neutral-500" />
                  }
                </button>
                
                {showFinanceDetails && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm text-neutral-600 p-5 bg-neutral-50 rounded-b-xl border-x border-b border-neutral-200 shadow-inner"
                  >
                    <p className="mb-3">Financing available through Affirm. Subject to eligibility check and approval.</p>
                    <ul className="space-y-2 list-disc pl-5 mb-3">
                      <li>6 monthly payments of $14.83</li>
                      <li>0% APR for qualified customers</li>
                      <li>No late fees or penalties</li>
                    </ul>
                    <a 
                      href="/pages/financing" 
                      className="text-rose-600 hover:text-rose-700 transition-colors font-medium inline-flex items-center"
                      onClick={() => trackButtonClick('financing_terms_link', 'product_showcase')}
                    >
                      See full terms
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </a>
                  </motion.div>
                )}
              </div>
              
              {/* Purchase Buttons - Enhanced with better visuals */}
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/cart/add?id=care-atin-device" 
                  className="bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 text-white py-4 px-6 rounded-full flex items-center justify-center transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-3" />
                  Add to Cart
                </Link>
                
                <button 
                  className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 py-4 px-6 rounded-full flex items-center justify-center transition-all duration-300 border border-neutral-200 shadow-sm hover:shadow-md"
                  onClick={() => trackButtonClick('shop_pay_button', 'product_showcase')}
                >
                  Buy with <img src="/images/payment/shop-pay.svg" alt="Shop Pay" className="h-5 mx-3" />
                </button>
              </div>
            </div>
            
            {/* What's in the Box - Enhanced with better visuals */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-100 mb-8">
              <h3 className="heading-md mb-6 flex items-center">
                <Package className="w-6 h-6 mr-3 text-rose-500" />
                What's in the Box
              </h3>
              
              <div className="bg-gradient-to-br from-neutral-50 to-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
                {boxContents.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-start p-4 hover:bg-rose-50 transition-colors ${
                      idx < boxContents.length - 1 ? 'border-b border-neutral-100' : ''
                    }`}
                  >
                    <div className="bg-green-100 rounded-full p-1 mr-4 flex-shrink-0">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-neutral-800 text-base">{item.name}</div>
                      <div className="text-sm text-neutral-600 mt-1">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Cross-Sell Recommendations - Enhanced with better visuals */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-100">
              <h3 className="heading-md mb-6">Recommended Add-ons</h3>
              
              <div className="space-y-5">
                {relatedProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="flex bg-gradient-to-br from-neutral-50 to-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="w-32 h-32 bg-white flex-shrink-0 p-2">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="flex-grow p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-neutral-800 text-lg">{product.name}</h4>
                          <p className="text-sm text-neutral-600 mb-3">{product.description}</p>
                        </div>
                        <div className="font-bold text-neutral-800 text-xl">${product.price}</div>
                      </div>
                      
                      <button 
                        className="text-sm bg-rose-100 hover:bg-rose-200 text-rose-700 py-2 px-4 rounded-full flex items-center transition-colors mt-2 ml-auto shadow-sm hover:shadow"
                        onClick={() => handleRelatedAddToCart(product)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}