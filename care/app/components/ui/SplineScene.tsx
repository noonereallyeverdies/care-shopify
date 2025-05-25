// Note: 'use client' is specific to Next.js App Router. 
// Spline requires client-side rendering, which Suspense helps manage.
import React, { Suspense, lazy } from 'react';

// Lazy load the Spline component
const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    // Suspense handles the loading state while the Spline component is fetched
    <Suspense
      fallback={
        // Basic CSS loader (ensure .loader class is defined in your CSS)
        <div className="w-full h-full flex items-center justify-center bg-black/50">
          <span className="loader"></span> 
        </div>
      }
    >
      {/* Render Spline once loaded */}
      <Spline scene={scene} className={className} />
    </Suspense>
  );
} 