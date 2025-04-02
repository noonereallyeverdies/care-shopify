import { RefObject, useEffect, useRef } from "react"

export const useMousePositionRef = (ref: RefObject<HTMLElement>) => {
  if (!ref) {
    throw new Error('ref is required');
  }

  const mousePositionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      try {
        if (!ref.current) return

        const rect = ref.current.getBoundingClientRect()
        if (!rect.width || !rect.height) {
          console.warn('Element has no width or height');
          return;
        }

        const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
        const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)

        mousePositionRef.current = { x, y }
      } catch (error) {
        console.error('Error in mouse move handler:', error);
      }
    }

    try {
      window.addEventListener("mousemove", handleMouseMove)
      return () => {
        try {
          window.removeEventListener("mousemove", handleMouseMove)
        } catch (error) {
          console.error('Error removing mouse move listener:', error);
        }
      }
    } catch (error) {
      console.error('Error adding mouse move listener:', error);
    }
  }, [ref])

  return mousePositionRef
} 