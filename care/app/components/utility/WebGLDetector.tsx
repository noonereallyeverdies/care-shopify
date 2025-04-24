import { useEffect, useState } from 'react';

// Function to detect WebGL support
function detectWebGLSupport(): { supported: boolean; reason?: string } {
  if (typeof window === 'undefined') {
    return { supported: false, reason: 'Running on server-side' };
  }

  try {
    const canvas = document.createElement('canvas');
    const gl = 
      canvas.getContext('webgl') || 
      canvas.getContext('experimental-webgl');

    if (!gl) {
      return { 
        supported: false, 
        reason: 'WebGL not supported by your browser'
      };
    }

    return { supported: true };
  } catch (e) {
    return { 
      supported: false, 
      reason: `Error detecting WebGL: ${e instanceof Error ? e.message : String(e)}`
    };
  }
}

// Component to check WebGL support
export function WebGLDetector({ 
  children, 
  fallback 
}: { 
  children: React.ReactNode; 
  fallback?: React.ReactNode | ((reason: string) => React.ReactNode);
}) {
  const [webGLStatus, setWebGLStatus] = useState<{ 
    checked: boolean; 
    supported: boolean; 
    reason?: string;
  }>({
    checked: false,
    supported: false
  });

  useEffect(() => {
    const result = detectWebGLSupport();
    setWebGLStatus({
      checked: true,
      supported: result.supported,
      reason: result.reason
    });
  }, []);

  // Don't render anything during server-side rendering
  if (typeof window === 'undefined') {
    return null;
  }

  // Show loading until the check is complete
  if (!webGLStatus.checked) {
    return <div>Checking WebGL compatibility...</div>;
  }

  // If WebGL is supported, render children
  if (webGLStatus.supported) {
    return <>{children}</>;
  }

  // If WebGL is not supported, render fallback
  if (fallback) {
    if (typeof fallback === 'function' && webGLStatus.reason) {
      return <>{fallback(webGLStatus.reason)}</>;
    }
    return <>{fallback}</>;
  }

  // Default fallback message
  return (
    <div className="p-4 bg-orange-100 text-orange-800 rounded-md">
      <h3 className="font-bold mb-2">WebGL Not Supported</h3>
      <p>{webGLStatus.reason || 'Your browser or device does not support 3D rendering.'}</p>
      <p className="mt-2 text-sm">
        Try using a modern browser like Chrome, Firefox, or Edge.
      </p>
    </div>
  );
} 