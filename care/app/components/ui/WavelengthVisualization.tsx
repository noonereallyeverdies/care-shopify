import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';

/**
 * WavelengthVisualization Component
 * 
 * Creates an animated visualization of light wavelengths,
 * designed to represent the 630-660nm red light used in Care•atin technology.
 * 
 * @param {boolean} animated - Whether the visualization should be animated
 * @param {boolean} dark - Whether to use dark mode styling
 * @param {string} className - Additional CSS classes to apply
 */
const WavelengthVisualization = ({ 
  animated = true, 
  dark = false, 
  className 
}: {
  animated?: boolean;
  dark?: boolean;
  className?: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const dpr = window.devicePixelRatio || 1;
    
    // Set canvas dimensions
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    // Initialize canvas size
    updateCanvasSize();
    
    // Add resize listener
    window.addEventListener('resize', updateCanvasSize);

    // Animation variables
    const waveParams = [
      { amplitude: 20, frequency: 0.02, speed: 0.05, color: '#f43f5e' }, // Primary rose color
      { amplitude: 15, frequency: 0.03, speed: 0.03, color: dark ? '#ffffff' : '#171717', opacity: 0.3 }, // Secondary wave
      { amplitude: 10, frequency: 0.01, speed: 0.07, color: dark ? '#ffffff' : '#171717', opacity: 0.2 }, // Tertiary wave
    ];

    // Draw a single wave
    const drawWave = (params: any, time: number) => {
      const { amplitude, frequency, speed, color, opacity = 1 } = params;
      const { width, height } = canvas.getBoundingClientRect();
      
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      
      for (let x = 0; x < width; x++) {
        const y = height / 2 + amplitude * Math.sin(frequency * x + time * speed);
        ctx.lineTo(x, y);
      }
      
      ctx.strokeStyle = color;
      ctx.globalAlpha = opacity;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    // Animation loop
    let animationTime = 0;
    const animate = () => {
      if (!canvas) return;
      
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      
      // Draw each wave
      waveParams.forEach(params => {
        drawWave(params, animationTime);
      });
      
      animationTime += 0.01;
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start/stop animation based on prop
    if (animated) {
      animate();
    } else {
      // Draw static version
      waveParams.forEach(params => {
        drawWave(params, 0);
      });
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animated, dark]);

  return (
    <canvas 
      ref={canvasRef} 
      className={clsx(
        'w-full h-full',
        dark ? 'bg-transparent' : 'bg-transparent',
        className
      )}
      aria-label="Visualization of red light wavelengths used in Care•atin technology"
    />
  );
};

export default WavelengthVisualization;
