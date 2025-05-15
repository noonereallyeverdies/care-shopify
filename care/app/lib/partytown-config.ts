/**
 * Partytown Configuration
 * This file configures Partytown for use with analytics scripts
 */

// Type definitions for Partytown window object
interface PartytownConfig {
  forward: string[];
  debug: boolean;
  resolveUrl?: (url: URL) => URL | string | undefined;
}

declare global {
  interface Window {
    partytown?: PartytownConfig;
  }
}

/**
 * Initialize Partytown configuration
 * Called from root.tsx
 */
export function initPartytown() {
  if (typeof window !== 'undefined') {
    window.partytown = {
      forward: ['gtag', 'dataLayer.push', 'clarity', 'fbq'],
      debug: process.env.NODE_ENV === 'development',
      resolveUrl: (url: URL) => {
        // Handle Google Analytics
        if (url.hostname === 'www.google-analytics.com' || 
            url.hostname === 'www.googletagmanager.com') {
          return url;
        }
        // Handle Microsoft Clarity
        if (url.hostname === 'www.clarity.ms') {
          return url;
        }
        return url;
      }
    };
  }
}

export default { initPartytown }; 