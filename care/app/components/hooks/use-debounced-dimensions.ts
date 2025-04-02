import { useCallback, useEffect, useState } from "react";

interface Dimensions {
  width: number;
  height: number;
}

export function useDimensions(ref: React.RefObject<HTMLElement>) {
  if (!ref) {
    throw new Error('ref is required');
  }

  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  const updateDimensions = useCallback(() => {
    try {
      if (!ref.current) {
        console.warn('Element ref is not available');
        return;
      }

      const width = ref.current.offsetWidth;
      const height = ref.current.offsetHeight;

      if (width === 0 || height === 0) {
        console.warn('Element has no width or height');
      }

      setDimensions({
        width,
        height,
      });
    } catch (error) {
      console.error('Error updating dimensions:', error);
    }
  }, [ref]);

  useEffect(() => {
    try {
      updateDimensions();

      let observer: ResizeObserver;
      try {
        observer = new ResizeObserver((entries) => {
          try {
            updateDimensions();
          } catch (error) {
            console.error('Error in ResizeObserver callback:', error);
          }
        });

        if (ref.current) {
          observer.observe(ref.current);
        } else {
          console.warn('Element ref is not available for observation');
        }
      } catch (error) {
        console.error('Error creating or using ResizeObserver:', error);
        // Fallback to window resize event if ResizeObserver is not available
        const handleResize = () => {
          try {
            updateDimensions();
          } catch (error) {
            console.error('Error in window resize handler:', error);
          }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }

      return () => {
        try {
          observer?.disconnect();
        } catch (error) {
          console.error('Error disconnecting ResizeObserver:', error);
        }
      };
    } catch (error) {
      console.error('Error in useEffect:', error);
    }
  }, [ref, updateDimensions]);

  return dimensions;
} 