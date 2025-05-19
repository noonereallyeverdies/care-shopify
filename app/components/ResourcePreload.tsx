/**
 * ResourcePreload Component
 * 
 * This component implements preload directives for critical resources.
 * It focuses on preloading critical CSS and fonts, with support for
 * route-specific resources.
 */
import { useMatches } from '@remix-run/react';
import { useMemo } from 'react';

// Define preloadable resource types
type ResourceType = 'style' | 'font' | 'image' | 'script';

// Interface for preloadable resources
interface PreloadResource {
  href: string;
  as: ResourceType;
  type?: string;
  crossOrigin?: 'anonymous' | 'use-credentials';
  media?: string;
  imagesrcset?: string;
  imagesizes?: string;
}

// Route-specific critical resources
const ROUTE_RESOURCES: Record<string, PreloadResource[]> = {
  // Home page
  'routes/($locale)._index': [
    // Home hero image (crucial for LCP)
    { href: '/images/home-hero.jpg', as: 'image' },
  ],
  
  // Collection page
  'routes/($locale).collections.$collectionHandle': [
    // Collection header image
    { href: '/images/collection-header.jpg', as: 'image' },
  ],
  
  // Product page
  'routes/($locale).products.$handle': [
    // Product gallery first image (crucial for LCP)
    { href: '/images/product-default.jpg', as: 'image' },
  ],
};

// Core resources that should be preloaded on all pages
const CORE_RESOURCES: PreloadResource[] = [
  // Critical CSS - exactly as requested
  { href: '/styles/critical.css', as: 'style' },
  
  // Primary brand font - exactly as requested
  { 
    href: '/fonts/brand-font.woff2', 
    as: 'font', 
    type: 'font/woff2',
    crossOrigin: 'anonymous'
  },
];

/**
 * ResourcePreload component that implements the preload directives
 * and dynamically determines route-specific resources to preload
 */
export function ResourcePreload() {
  // Get current route matches to determine which route we're on
  const matches = useMatches();
  
  // Combine core resources with route-specific resources
  const preloadResources = useMemo(() => {
    // Start with core resources
    const resources = [...CORE_RESOURCES];
    
    // Find the current route ID from matches
    const currentRoute = matches[matches.length - 1]?.id;
    
    // Add route-specific resources if they exist
    if (currentRoute && ROUTE_RESOURCES[currentRoute]) {
      resources.push(...ROUTE_RESOURCES[currentRoute]);
    }
    
    return resources;
  }, [matches]);
  
  return (
    <>
      {/* Explicitly add the two required preload directives */}
      <link rel="preload" href="/styles/critical.css" as="style" />
      <link rel="preload" href="/fonts/brand-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      
      {/* Dynamically add any additional route-specific resources */}
      {preloadResources
        .filter(res => !(res.href === '/styles/critical.css' || res.href === '/fonts/brand-font.woff2'))
        .map((resource, index) => (
          <link 
            key={`preload-${index}`}
            rel="preload" 
            href={resource.href}
            as={resource.as}
            type={resource.type}
            crossOrigin={resource.crossOrigin}
            media={resource.media}
            imagesrcset={resource.imagesrcset}
            imagesizes={resource.imagesizes}
          />
        ))}
      
      {/* DNS prefetch and preconnect for key domains */}
      <link rel="dns-prefetch" href="https://cdn.shopify.com" />
      <link rel="preconnect" href="https://cdn.shopify.com" crossOrigin="anonymous" />
    </>
  );
}
