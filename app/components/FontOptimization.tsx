/**
 * FontOptimization Component
 * 
 * This component implements font-display: swap for non-critical fonts
 * and ensures proper font loading behavior.
 */
import { useEffect } from 'react';

/**
 * The main brand font is preloaded in the ResourcePreload component.
 * This component handles all other fonts with font-display: swap.
 */
export function FontOptimization() {
  useEffect(() => {
    // Register a font loading observer to detect when fonts are loaded
    if ('FontFace' in window) {
      document.fonts.ready.then(() => {
        // Add a class to the document when fonts are loaded
        document.documentElement.classList.add('fonts-loaded');
      });
    }
  }, []);
  
  // Font face definitions with font-display: swap
  const fontFaceCSS = `
    /* Primary brand font - this is preloaded separately */
    @font-face {
      font-family: 'Brand Font';
      font-style: normal;
      font-weight: 400;
      font-display: swap; /* Use swap to ensure text is visible immediately */
      src: url('/fonts/brand-font.woff2') format('woff2');
      /* Subset for Latin characters to reduce file size */
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    
    /* Bold variant - not preloaded, uses swap */
    @font-face {
      font-family: 'Brand Font';
      font-style: normal;
      font-weight: 700;
      font-display: swap;
      src: url('/fonts/brand-font-bold.woff2') format('woff2');
    }
    
    /* Italic variant - not preloaded, uses swap */
    @font-face {
      font-family: 'Brand Font';
      font-style: italic;
      font-weight: 400;
      font-display: swap;
      src: url('/fonts/brand-font-italic.woff2') format('woff2');
    }
  `;
  
  return (
    <>
      {/* Define font-face rules with font-display: swap */}
      <style dangerouslySetInnerHTML={{ __html: fontFaceCSS }} />
      
      {/* System font fallback while custom fonts load */}
      <style dangerouslySetInnerHTML={{ 
        __html: `
          /* Before custom fonts load, use system fonts */
          html:not(.fonts-loaded) {
            /* System font stack as fallback */
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          }
          
          /* After fonts load, use our custom fonts */
          html.fonts-loaded {
            font-family: "Brand Font", serif;
          }
        `
      }} />
    </>
  );
}
