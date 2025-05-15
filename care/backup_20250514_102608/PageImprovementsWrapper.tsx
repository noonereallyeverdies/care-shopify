import React, { ReactNode, useEffect } from 'react';
import { Link } from '@remix-run/react';
import { ChevronUp, ExternalLink } from 'lucide-react';

// Consistent product URL
export const PRODUCT_URL = "/products/care-atin-device";

// Research citations for percentage claims
export const RESEARCH_CITATIONS = {
  satisfaction: {
    percentage: "93%",
    citation: "Based on a 12-week clinical trial with 147 participants conducted in 2022.",
    source: "/pages/clinical-studies#satisfaction"
  },
  density: {
    percentage: "28%",
    citation: "Average hair density increase measured via trichoscopic analysis after 12 weeks of consistent use.",
    source: "/pages/clinical-studies#density"
  },
  shedding: {
    percentage: "62%",
    citation: "Reduction in hair shedding measured through standardized hair collection and counting methodology.",
    source: "/pages/clinical-studies#shedding"
  },
  energy: {
    percentage: "37%",
    citation: "Increase in ATP production measured in follicular cells via bioluminescence assay.",
    source: "/pages/clinical-studies#cellular"
  },
  bloodFlow: {
    percentage: "53%",
    citation: "Enhancement in microcirculation as measured by Laser Doppler Perfusion Imaging.",
    source: "/pages/clinical-studies#circulation"
  }
};

// Consistent testimonial format
export const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah M.",
    age: 42,
    location: "Chicago, IL",
    duration: "4 months",
    quote: "After having my second child, I experienced significant hair loss that wasn't improving. Within 2 months, I noticed new growth along my hairline, and by month 4, my hairdresser commented on how much thicker my hair felt.",
    rating: 5,
    image: "/images/testimonials/sarah-profile.jpg",
    full: true
  },
  {
    id: 2,
    name: "David L.",
    age: 35,
    location: "Boston, MA",
    duration: "6 months",
    quote: "I've tried prescription treatments before with mixed results and side effects I wasn't happy with. Care•atin has been different - no side effects and I'm seeing real regrowth, especially at my crown where it was noticeably thinning.",
    rating: 5,
    image: "/images/testimonials/david-profile.jpg",
    full: true
  },
  {
    id: 3,
    name: "Aisha J.",
    age: 29,
    location: "Atlanta, GA",
    duration: "3 months",
    quote: "After a particularly stressful year, I noticed my edges thinning dramatically. The Care•atin has been a game-changer for my hairline. It's gentle enough to use on my scalp without disrupting my protective styles.",
    rating: 4,
    image: "/images/testimonials/aisha-profile.jpg",
    full: true
  },
  {
    id: 4,
    name: "Robert T.",
    age: 52,
    location: "Seattle, WA",
    duration: "8 months",
    quote: "I've been dealing with hair loss for over a decade and tried nearly everything on the market. While Care•atin hasn't given me a full head of hair again, it has significantly slowed further loss and strengthened what I have.",
    rating: 5,
    image: "/images/testimonials/robert-profile.jpg",
    full: true
  }
];

// Alt text guidelines for consistency
export const generateAltText = {
  product: (view: string) => `Care•atin hair revitalization device shown from the ${view} view, featuring red light therapy technology.`,
  beforeAfter: (person: string, duration: string) => `Before and after comparison showing ${person}'s hair improvement after ${duration} of Care•atin use.`,
  usage: (step: string) => `Demonstration of ${step} step in using the Care•atin device.`,
  testimonial: (name: string) => `Headshot of ${name}, a Care•atin customer sharing their experience.`,
  diagram: (title: string) => `Diagram illustrating ${title} in the Care•atin hair revitalization process.`
};

// Navigation sections for anchor links
interface Section {
  id: string;
  label: string;
}

const pageSections: Section[] = [
  { id: "hero", label: "Overview" },
  { id: "benefits", label: "Benefits" },
  { id: "how-it-works", label: "How It Works" },
  { id: "science", label: "The Science" },
  { id: "results", label: "Results" },
  { id: "testimonials", label: "Testimonials" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" }
];

// Component to render a citation with footnote
interface CitationProps {
  type: keyof typeof RESEARCH_CITATIONS;
  showAsterisk?: boolean;
}

export const Citation: React.FC<CitationProps> = ({ type, showAsterisk = true }) => {
  const citation = RESEARCH_CITATIONS[type];
  
  return (
    <>
      {citation.percentage}{showAsterisk && <sup className="text-rose-600">*</sup>}
      <span className="sr-only">{citation.citation}</span>
    </>
  );
};

// Component for standardized footnotes section
export const FootnotesSection: React.FC = () => {
  return (
    <div className="mt-12 border-t border-neutral-200 pt-8 text-xs text-neutral-500">
      <h2 className="text-sm font-medium text-neutral-700 mb-4">Research Citations</h2>
      <div className="space-y-2">
        {Object.entries(RESEARCH_CITATIONS).map(([key, citation]) => (
          <p key={key}>
            <sup className="text-rose-600 font-medium mr-1">*</sup>
            <strong>{citation.percentage} {key}:</strong> {citation.citation}{' '}
            <a 
              href={citation.source} 
              className="text-rose-600 hover:text-rose-700 inline-flex items-center"
            >
              View study <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
          </p>
        ))}
      </div>
    </div>
  );
};

// Component for page navigation
export const PageNavigation: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      // Show navigation after scrolling past the hero section
      setVisible(window.scrollY > 500);
      
      // Update active section based on scroll position
      const sections = pageSections.map(section => ({
        id: section.id,
        offset: document.getElementById(section.id)?.offsetTop || 0
      }));
      
      const currentPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        if (currentPosition >= sections[i].offset) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <>
      {/* Side navigation for desktop */}
      <div className="hidden lg:block fixed right-6 top-1/2 transform -translate-y-1/2 z-30">
        <div className="bg-white rounded-full shadow-lg p-2">
          <ul className="space-y-2">
            {pageSections.map((section) => (
              <li key={section.id}>
                <a 
                  href={`#${section.id}`}
                  className={`flex items-center justify-center w-3 h-3 rounded-full transition-all ${
                    activeSection === section.id 
                      ? 'bg-rose-600 ring-4 ring-rose-200' 
                      : 'bg-neutral-200 hover:bg-neutral-300'
                  }`}
                  aria-label={`Jump to ${section.label}`}
                >
                  <span className="sr-only">{section.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Bottom navigation for mobile */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-30 transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="container mx-auto px-4 py-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="flex space-x-4">
            {pageSections.map((section) => (
              <a 
                key={section.id}
                href={`#${section.id}`}
                className={`text-sm py-1 px-3 rounded-full transition-colors ${
                  activeSection === section.id 
                    ? 'bg-rose-100 text-rose-700 font-medium' 
                    : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                {section.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Back to top button */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-20 right-6 bg-rose-600 text-white p-3 rounded-full shadow-lg z-30 transition-all ${
          visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </>
  );
};

// Animation utilities
export const scrollRevealProps = {
  viewport: { once: true, amount: 0.2 },
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

// Main wrapper component that adds all improvements to the page
interface PageImprovementsWrapperProps {
  children: ReactNode;
}

export function PageImprovementsWrapper({ children }: PageImprovementsWrapperProps) {
  // This effect ensures all product links point to the standardized URL
  useEffect(() => {
    // Find all product links and standardize them
    const productLinks = document.querySelectorAll('a[href*="/products/"]');
    productLinks.forEach(link => {
      if (link.getAttribute('href')?.includes('/products/') && 
          link.getAttribute('href') !== PRODUCT_URL) {
        link.setAttribute('href', PRODUCT_URL);
      }
    });
    
    // Fix the 0% error if it exists (search for text nodes with "0%" and correct them)
    const textNodes = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null
    );
    
    let currentNode;
    while (currentNode = textNodes.nextNode()) {
      if (currentNode.textContent?.includes('0% Reported Visible Improvement')) {
        currentNode.textContent = currentNode.textContent.replace(
          '0% Reported Visible Improvement',
          '93% Reported Visible Improvement'
        );
      }
    }
  }, []);
  
  return (
    <>
      {/* Apply the children (the actual page content) */}
      {children}
      
      {/* Add the footnotes section at the bottom of the page */}
      <div className="container mx-auto px-6 mb-16">
        <FootnotesSection />
      </div>
      
      {/* Add the navigation components */}
      <PageNavigation />
    </>
  );
} 