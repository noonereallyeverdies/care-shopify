import React, { useState, useRef, useEffect } from 'react';

export function BeforeAfter() {
  const [sliderPos, setSliderPos] = useState(50); // Initial slider position (percentage)
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const beforeImageUrl = '/images/hair.jpg'; // Placeholder before image
  const afterImageUrl = '/images/prettyhair.jpg'; // Placeholder after image

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let x = clientX - rect.left;
    // Clamp position between 0 and container width
    x = Math.max(0, Math.min(x, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging) return;
    handleMove(event.clientX);
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (!isDragging) return;
    handleMove(event.touches[0].clientX);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <section className="before-after-section" style={{ padding: 'var(--section-padding-y) var(--container-padding-x)', textAlign: 'center' }}>
      <h2 style={{ marginBottom: 'var(--space-xl)' }}>See the Difference</h2>
      <div
        ref={containerRef}
        className="before-after-container"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '600px', // Max width for the component
          margin: '0 auto',
          overflow: 'hidden',
          aspectRatio: '1 / 1', // Adjust aspect ratio as needed
          cursor: isDragging ? 'grabbing' : 'grab',
          borderRadius: 'var(--border-radius-md)',
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown} // Use same handler for touch start
      >
        {/* After Image (Bottom Layer) */}
        <img
          src={afterImageUrl}
          alt="After using Care-atin device" // Add descriptive alt text
          style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
        />
        {/* Before Image (Top Layer, clipped) */}
        <div
          className="before-image-wrapper"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            clipPath: `polygon(0% 0%, ${sliderPos}% 0%, ${sliderPos}% 100%, 0% 100%)`,
            overflow: 'hidden',
          }}
        >
          <img
            src={beforeImageUrl}
            alt="Before using Care-atin device" // Add descriptive alt text
            style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        {/* Slider Handle */}
        <div
          className="slider-handle"
          style={{
            position: 'absolute',
            top: 0,
            left: `calc(${sliderPos}% - 2px)`,
            width: '4px',
            height: '100%',
            backgroundColor: 'var(--c-primary-white)',
            cursor: 'ew-resize',
            boxShadow: '0px 0px 5px rgba(0,0,0,0.5)',
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <div className="slider-grabber" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '30px', height: '30px', background: 'var(--c-primary-white)', borderRadius: '50%', border: '2px solid var(--c-accent-rlt)', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'column', padding: '5px' }}>
            <span style={{width: '2px', height: '40%', background: 'var(--c-accent-rlt)'}}></span>
            <span style={{width: '2px', height: '40%', background: 'var(--c-accent-rlt)'}}></span>
          </div>
        </div>
      </div>
      {/* Add optional captions/labels here */}
      <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '600px', margin: 'var(--space-sm) auto 0 auto', padding: '0 5px' }}>
        <span style={{fontSize: 'var(--font-size-small)', color: 'var(--c-primary-text-medium)' }}>Before</span>
        <span style={{fontSize: 'var(--font-size-small)', color: 'var(--c-primary-text-medium)' }}>After</span>
      </div>
    </section>
  );
} 