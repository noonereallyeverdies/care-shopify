import { useEffect, useState } from 'react';

/**
 * Custom hook to check if a media query matches
 * @param query - Media query string
 * @returns - Boolean indicating if the query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Initial check
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    // Add listener for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}