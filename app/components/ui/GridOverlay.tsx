import React, { useState, useEffect } from 'react';

/**
 * A debugging overlay grid component that can be toggled with Ctrl+G
 * Helps with aligning elements and checking spacing on different screen sizes
 */
export function GridOverlay() {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'g' && e.ctrlKey) {
        setVisible(prevVisible => !prevVisible);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  if (!visible) return null;
  
  return (
    <div className="fixed inset-0 z-50 pointer-events-none opacity-40">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 h-full">
        <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-12 gap-4 h-full">
          {Array(12).fill(null).map((_, i) => (
            <div key={i} className="h-full bg-blue-500/15 border border-blue-500/20">
              <div className="bg-blue-600/20 h-2 mt-1"></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Control panel */}
      <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded p-2 shadow-lg text-xs pointer-events-auto">
        <p className="font-mono mb-1">Grid Overlay: ACTIVE</p>
        <p className="text-gray-600">Press Ctrl+G to toggle</p>
      </div>
    </div>
  );
}

export default GridOverlay;