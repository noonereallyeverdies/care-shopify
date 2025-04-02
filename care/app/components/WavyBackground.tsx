import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";
import { cn } from "~/lib/utils";
import { ErrorBoundary } from "react-error-boundary";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 12,
  speed = "slow",
  waveOpacity = 0.4,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const noise = createNoise3D();
  let w: number,
    h: number,
    nt: number,
    i: number,
    x: number,
    ctx: any,
    canvas: any;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.0005; // Even slower than original for more subtle movement
      case "fast":
        return 0.001;
      default:
        return 0.0005;
    }
  };

  const init = () => {
    try {
      canvas = canvasRef.current;
      if (!canvas) {
        throw new Error("Canvas element not found");
      }
      ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Could not get 2D context from canvas");
      }
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
      nt = 0;
      window.onresize = function () {
        w = ctx.canvas.width = window.innerWidth;
        h = ctx.canvas.height = window.innerHeight;
        ctx.filter = `blur(${blur}px)`;
      };
      render();
    } catch (error) {
      console.error("Error initializing WavyBackground:", error);
      throw error;
    }
  };

  // Default colors changed to red tones
  const waveColors = colors ?? [
    "#FFE4E6", // Lightest red
    "#FECDD3", // Light red
    "#FDA4AF", // Soft red
    "#FB7185", // Medium red
    "#F43F5E", // Vibrant red
  ];

  const drawWave = (n: number) => {
    try {
      nt += getSpeed();
      for (i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth || 120; // Default width increased
        ctx.strokeStyle = waveColors[i % waveColors.length];
        for (x = 0; x < w; x += 5) {
          var y = noise(x / 800, 0.2 * i, nt) * 150; // Increased amplitude from 100 to 150
          ctx.lineTo(x, y + h * 0.5);
        }
        ctx.stroke();
        ctx.closePath();
      }
    } catch (error) {
      console.error("Error drawing wave:", error);
      throw error;
    }
  };

  let animationId: number;
  const render = () => {
    try {
      ctx.fillStyle = backgroundFill || "#FFFFFF"; // White background
      ctx.globalAlpha = waveOpacity;
      ctx.fillRect(0, 0, w, h);
      drawWave(5);
      animationId = requestAnimationFrame(render);
    } catch (error) {
      console.error("Error rendering:", error);
      throw error;
    }
  };

  useEffect(() => {
    try {
      init();
      return () => {
        cancelAnimationFrame(animationId);
      };
    } catch (error) {
      console.error("Error in useEffect:", error);
      throw error;
    }
  }, []);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    try {
      setIsSafari(
        typeof window !== "undefined" &&
          navigator.userAgent.includes("Safari") &&
          !navigator.userAgent.includes("Chrome")
      );
    } catch (error) {
      console.error("Error detecting Safari:", error);
      throw error;
    }
  }, []);

  return (
    <ErrorBoundary fallback={<div className="p-4 text-red-500">Error rendering wavy background</div>}>
      <div
        className={cn(
          "min-h-[70vh] flex flex-col items-center justify-center relative overflow-hidden",
          containerClassName
        )}
      >
        <canvas
          className="absolute inset-0 z-0"
          ref={canvasRef}
          id="canvas"
          style={{
            ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
          }}
        ></canvas>
        <div className={cn("relative z-10", className)} {...props}>
          {children}
        </div>
      </div>
    </ErrorBoundary>
  );
}; 