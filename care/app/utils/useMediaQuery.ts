import React from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false); // Assuming React is imported where this is used or will be imported
  
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const media = window.matchMedia(query);
    setMatches(media.matches);
    
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const handler = (e: MediaQueryListEvent) => {
      if (timeoutId) clearTimeout(timeoutId);
      // Debounce the state update
      timeoutId = setTimeout(() => setMatches(e.matches), 16); 
    };
    
    // Prefer addEventListener for modern browsers
    if (media.addEventListener) {
      media.addEventListener('change', handler);
    } else {
      // Fallback for older browsers
      // @ts-ignore - addListener is deprecated but might be needed for compatibility
      media.addListener(handler); 
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (media.removeEventListener) {
        media.removeEventListener('change', handler);
      } else {
        // @ts-ignore - removeListener is deprecated
        media.removeListener(handler);
      }
    };
  }, [query]);
  
  return matches;
} 