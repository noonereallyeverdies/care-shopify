import React, { lazy, Suspense } from 'react';

// Lazy load the heavy 3D component
const DeviceScene = lazy(() => import('./DeviceScene'));

interface LazyDeviceSceneProps {
  pageScrollProgress: number;
}

/**
 * Wrapper component that lazy loads the 3D DeviceScene
 * Only imports the heavy Three.js dependencies when actually rendered
 */
export function LazyDeviceScene({ pageScrollProgress }: LazyDeviceSceneProps) {
  return (
    <Suspense fallback={<DeviceScenePlaceholder />}>
      <DeviceScene pageScrollProgress={pageScrollProgress} />
    </Suspense>
  );
}

/**
 * Simple placeholder shown while the 3D scene is loading
 */
function DeviceScenePlaceholder() {
  return (
    <div className="relative w-full h-full min-h-[300px] md:min-h-[400px] bg-neutral-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="w-32 h-32 rounded-full bg-neutral-200 animate-pulse mx-auto mb-4"></div>
        <p className="text-neutral-500 text-sm">Loading 3D visualization...</p>
      </div>
    </div>
  );
} 