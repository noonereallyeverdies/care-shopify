import React, { useEffect, useRef, useState } from 'react';

// Utility to detect interactive elements
const isInteractive = (el: HTMLElement | null) => {
  if (!el) return false;
  return (
    el.tagName === 'BUTTON' ||
    el.tagName === 'A' ||
    el.getAttribute('role') === 'button' ||
    el.classList.contains('magnetic')
  );
};

const CustomCursor: React.FC = () => {
  console.log('CustomCursor mounted');
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [magnetic, setMagnetic] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const trail = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      // Detect if hovering interactive
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
      setHovered(isInteractive(el));
      setMagnetic(el?.classList.contains('magnetic'));
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  // Animate cursor dot and trail
  useEffect(() => {
    let frame: number;
    const animate = () => {
      // Dot follows mouse instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
      }
      // Trail follows with delay
      trail.current.x += (mouse.current.x - trail.current.x) * 0.18;
      trail.current.y += (mouse.current.y - trail.current.y) * 0.18;
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trail.current.x}px, ${trail.current.y}px, 0)`;
      }
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  // Hide cursor on mobile
  useEffect(() => {
    const setBodyCursor = () => {
      if (window.innerWidth < 768) {
        document.body.style.cursor = '';
      } else {
        document.body.style.cursor = 'none';
      }
    };
    setBodyCursor();
    window.addEventListener('resize', setBodyCursor);
    return () => window.removeEventListener('resize', setBodyCursor);
  }, []);

  return (
    <>
      {/* Debug: visible red square to confirm mounting */}
      <div style={{position: 'fixed', top: 0, left: 0, zIndex: 99999, background: 'red', width: 40, height: 40}} />
      {/* Main cursor dot */}
      <div
        ref={dotRef}
        className={`fixed z-[9999] pointer-events-none left-0 top-0 w-5 h-5 rounded-full transition-all duration-150
          ${hovered ? 'bg-pink-400 scale-150 mix-blend-multiply shadow-lg' : 'bg-rose-300/80'}
          ${magnetic ? 'scale-200 bg-yellow-200/80' : ''}
        `}
        style={{ marginLeft: -10, marginTop: -10, boxShadow: hovered ? '0 0 24px 8px #fadadd88' : undefined }}
      />
      {/* Trailing gradient/particle */}
      <div
        ref={trailRef}
        className="fixed z-[9998] pointer-events-none left-0 top-0 w-16 h-16 rounded-full bg-gradient-to-br from-pink-200 via-rose-100 to-yellow-100 opacity-60 blur-2xl transition-all duration-300"
        style={{ marginLeft: -32, marginTop: -32 }}
      />
    </>
  );
};

export default CustomCursor; 