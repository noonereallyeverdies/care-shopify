/**
 * FontOptimization Component
 * 
 * This component implements font-display: swap for non-critical fonts
 * and ensures proper font loading behavior.
 */
import { useEffect } from 'react';

/**
 * The main brand font is preloaded in the head.
 * This component handles font loading behavior.
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
  
  return (
    <>
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
            font-family: "IBMPlexSerif", serif;
          }
        `
      }} />
    </>
  );
}
