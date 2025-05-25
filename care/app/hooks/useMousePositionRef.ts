import { RefObject, useEffect, useRef } from "react";

export const useMousePositionRef = (
  containerRef?: RefObject<HTMLElement | SVGElement>
) => {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Calculate position relative to the center of the container
        const relativeX = x - rect.left - rect.width / 2;
        const relativeY = y - rect.top - rect.height / 2;
        positionRef.current = { x: relativeX, y: relativeY };
      } else {
        // Fallback to viewport center if no containerRef
        const relativeX = x - window.innerWidth / 2;
        const relativeY = y - window.innerHeight / 2;
        positionRef.current = { x: relativeX, y: relativeY };
      }
    };

    const handleMouseMove = (ev: MouseEvent) => {
      updatePosition(ev.clientX, ev.clientY);
    };

    const handleTouchMove = (ev: TouchEvent) => {
      if (ev.touches.length > 0) {
        const touch = ev.touches[0];
        updatePosition(touch.clientX, touch.clientY);
      }
    };

    // Use requestAnimationFrame for performance
    let frameId: number | null = null;
    const throttledMouseMove = (ev: MouseEvent) => {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => handleMouseMove(ev));
    };
    const throttledTouchMove = (ev: TouchEvent) => {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => handleTouchMove(ev));
    };

    window.addEventListener("mousemove", throttledMouseMove);
    window.addEventListener("touchmove", throttledTouchMove, { passive: true });

    // Set initial position
    updatePosition(window.innerWidth / 2, window.innerHeight / 2);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", throttledMouseMove);
      window.removeEventListener("touchmove", throttledTouchMove);
    };
  }, [containerRef]);

  return positionRef;
}; 