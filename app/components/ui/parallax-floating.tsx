"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { useAnimationFrame } from "framer-motion"; // Using framer-motion's hook
import { cn } from "~/lib/utils"; // Assuming utils path
import { useMousePositionRef } from "~/hooks/useMousePositionRef"; // Assuming hook path

interface FloatingContextType {
  registerElement: (id: string, element: HTMLDivElement, depth: number) => void;
  unregisterElement: (id: string) => void;
}

const FloatingContext = createContext<FloatingContextType | null>(null);

interface FloatingProps {
  children: ReactNode;
  className?: string;
  sensitivity?: number;
  easingFactor?: number;
  // Allow passing other div props
  [key: string]: any;
}

const Floating = ({
  children,
  className,
  sensitivity = 1,
  easingFactor = 0.05,
  ...props
}: FloatingProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsMap = useRef(
    new Map<
      string,
      {
        element: HTMLDivElement;
        depth: number;
        currentPosition: { x: number; y: number };
      }
    >()
  );
  // Use the hook to get mouse position relative to the container center
  const mousePositionRef = useMousePositionRef(containerRef);

  const registerElement = useCallback(
    (id: string, element: HTMLDivElement, depth: number) => {
      elementsMap.current.set(id, {
        element,
        depth,
        currentPosition: { x: 0, y: 0 }, // Start at center (0,0)
      });
    },
    []
  );

  const unregisterElement = useCallback((id: string) => {
    elementsMap.current.delete(id);
  }, []);

  useAnimationFrame((time) => {
    if (!containerRef.current) return;

    elementsMap.current.forEach((data) => {
      // Invert sensitivity for natural movement (move away from cursor)
      const strength = (data.depth * -sensitivity) / 20; 

      // Target position based on centered mouse coords
      const targetX = mousePositionRef.current.x * strength;
      const targetY = mousePositionRef.current.y * strength;

      // Calculate the difference for easing
      const dx = targetX - data.currentPosition.x;
      const dy = targetY - data.currentPosition.y;

      // Apply easing - move a fraction of the distance each frame
      data.currentPosition.x += dx * easingFactor;
      data.currentPosition.y += dy * easingFactor;

      // Apply the transform using translate3d for potential GPU acceleration
      data.element.style.transform = `translate3d(${data.currentPosition.x}px, ${data.currentPosition.y}px, 0)`;
    });
  });

  return (
    <FloatingContext.Provider value={{ registerElement, unregisterElement }}>
      {/* Container needs to establish a positioning context and track mouse */}
      <div
        ref={containerRef}
        className={cn("relative w-full h-full overflow-hidden", className)} // Ensure relative positioning for absolute children
        {...props}
      >
        {children}
      </div>
    </FloatingContext.Provider>
  );
};

export default Floating;

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  depth?: number; 
}

export const FloatingElement = ({
  children,
  className,
  depth = 1, 
}: FloatingElementProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  // Use crypto.randomUUID for a more robust unique ID
  const idRef = useRef(typeof window !== 'undefined' ? crypto.randomUUID() : Math.random().toString(36).substring(7));
  const context = useContext(FloatingContext);

  useEffect(() => {
    if (!elementRef.current || !context) {
      console.warn("FloatingElement must be used within a Floating provider.");
      return;
    }

    const nonNullDepth = depth === 0 ? 0.01 : depth; // Ensure depth is never exactly 0

    context.registerElement(idRef.current, elementRef.current, nonNullDepth);
    return () => context.unregisterElement(idRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context, depth]); // Reregister if depth changes

  return (
    // Ensure element is absolutely positioned within the Floating container
    <div
      ref={elementRef}
      // Setting initial position via className is important
      className={cn("absolute will-change-transform", className)} 
    >
      {children}
    </div>
  );
}; 