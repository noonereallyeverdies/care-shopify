import { useState, useEffect } from 'react';

/**
 * A utility component that delays rendering its children until the component has mounted on the client.
 * This is useful for components that depend on browser APIs or have SSR compatibility issues.
 */
export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // The effect runs only on the client, after the initial render
    setIsMounted(true);
  }, []);

  // Render children only when the component is mounted on the client
  return isMounted ? <>{children}</> : null;
} 