import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react"
import { useAnimationFrame } from "framer-motion"
import { ErrorBoundary } from "react-error-boundary"

import { cn } from "~/lib/utils"
import { useMousePositionRef } from "~/hooks/use-mouse-position-ref"

interface FloatingContextType {
  registerElement: (id: string, element: HTMLDivElement, depth: number) => void
  unregisterElement: (id: string) => void
}

const FloatingContext = createContext<FloatingContextType | null>(null)

interface FloatingProps {
  children: ReactNode
  className?: string
  sensitivity?: number
  easingFactor?: number
}

const Floating = ({
  children,
  className,
  sensitivity = 1,
  easingFactor = 0.05,
  ...props
}: FloatingProps) => {
  if (typeof sensitivity !== 'number' || sensitivity <= 0) {
    throw new Error('sensitivity must be a positive number');
  }

  if (typeof easingFactor !== 'number' || easingFactor <= 0 || easingFactor > 1) {
    throw new Error('easingFactor must be a number between 0 and 1');
  }

  const containerRef = useRef<HTMLDivElement>(null)
  const elementsMap = useRef(
    new Map<
      string,
      {
        element: HTMLDivElement
        depth: number
        currentPosition: { x: number; y: number }
      }
    >()
  )
  const mousePositionRef = useMousePositionRef(containerRef)

  const registerElement = useCallback(
    (id: string, element: HTMLDivElement, depth: number) => {
      if (!id || typeof id !== 'string') {
        throw new Error('id must be a non-empty string');
      }
      if (!element || !(element instanceof HTMLDivElement)) {
        throw new Error('element must be an HTMLDivElement');
      }
      if (typeof depth !== 'number') {
        throw new Error('depth must be a number');
      }
      elementsMap.current.set(id, {
        element,
        depth,
        currentPosition: { x: 0, y: 0 },
      })
    },
    []
  )

  const unregisterElement = useCallback((id: string) => {
    if (!id || typeof id !== 'string') {
      throw new Error('id must be a non-empty string');
    }
    elementsMap.current.delete(id)
  }, [])

  useAnimationFrame(() => {
    try {
      if (!containerRef.current) return

      elementsMap.current.forEach((data) => {
        const strength = (data.depth * sensitivity) / 20

        // Calculate new target position
        const newTargetX = mousePositionRef.current.x * strength
        const newTargetY = mousePositionRef.current.y * strength

        // Check if we need to update
        const dx = newTargetX - data.currentPosition.x
        const dy = newTargetY - data.currentPosition.y

        // Update position only if we're still moving
        data.currentPosition.x += dx * easingFactor
        data.currentPosition.y += dy * easingFactor

        data.element.style.transform = `translate3d(${data.currentPosition.x}px, ${data.currentPosition.y}px, 0)`
      })
    } catch (error) {
      console.error('Error in animation frame:', error);
    }
  })

  return (
    <ErrorBoundary fallback={<div className="p-4 text-red-500">Error in floating animation</div>}>
      <FloatingContext.Provider value={{ registerElement, unregisterElement }}>
        <div
          ref={containerRef}
          className={cn("absolute top-0 left-0 w-full h-full", className)}
          {...props}
        >
          {children}
        </div>
      </FloatingContext.Provider>
    </ErrorBoundary>
  )
}

export default Floating

interface FloatingElementProps {
  children: ReactNode
  className?: string
  depth?: number
}

export const FloatingElement = ({
  children,
  className,
  depth = 1,
}: FloatingElementProps) => {
  if (typeof depth !== 'number') {
    throw new Error('depth must be a number');
  }

  const elementRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(Math.random().toString(36).substring(7))
  const context = useContext(FloatingContext)

  useEffect(() => {
    try {
      if (!elementRef.current || !context) return

      const nonNullDepth = depth ?? 0.01

      context.registerElement(idRef.current, elementRef.current, nonNullDepth)
      return () => context.unregisterElement(idRef.current)
    } catch (error) {
      console.error('Error in FloatingElement useEffect:', error);
      throw error;
    }
  }, [depth])

  return (
    <ErrorBoundary fallback={<div className="p-4 text-red-500">Error in floating element</div>}>
      <div
        ref={elementRef}
        className={cn("absolute will-change-transform", className)}
      >
        {children}
      </div>
    </ErrorBoundary>
  )
} 