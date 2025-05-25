import { useState, useEffect } from 'react';
import { Link } from '@remix-run/react';

interface StickyHeaderProps {
  sections: {
    id: string;
    label: string;
  }[];
}

export function StickyHeader({ sections }: StickyHeaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Track scroll position to show/hide header and highlight active section
  useEffect(() => {
    const handleScroll = () => {
      // Show header after scrolling past hero (approx 100vh)
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      
      setIsVisible(scrollY > heroHeight * 0.7);
      
      // Determine active section based on scroll position
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      })).filter(item => item.element !== null);
      
      // Find the current section in view
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);
  
  // Scroll to section smoothly
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <button 
            onClick={scrollToTop}
            className="font-medium text-xl text-neutral-900 flex items-center"
          >
            <span className="text-rose-500 mr-1">P</span>hotonique
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`text-sm font-medium py-1 px-2 rounded-md transition-colors ${
                    activeSection === section.id
                      ? 'text-rose-500 bg-rose-50'
                      : 'text-neutral-700 hover:text-rose-500'
                  }`}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            className="p-2 rounded-full bg-rose-50 text-rose-500"
            aria-label="Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        
        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            to="/products/photonique-touch"
            className="bg-rose-500 hover:bg-rose-600 text-white py-2 px-5 rounded-md text-sm font-medium transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </header>
  );
}

export default StickyHeader; 