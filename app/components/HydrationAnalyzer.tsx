import React, { useState, useEffect } from 'react';
import { getHydrationEvents, analyzeHydrationData, clearHydrationEvents } from '~/lib/HydrationUsage';

/**
 * HydrationAnalyzer
 * A development tool to analyze and visualize component hydration patterns
 * Helps identify optimization opportunities for progressive hydration
 */
export function HydrationAnalyzer({
  showDevTools = false
}: {
  showDevTools?: boolean
}) {
  const [analysisData, setAnalysisData] = useState<ReturnType<typeof analyzeHydrationData> | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (!showDevTools || process.env.NODE_ENV !== 'development') return;
    
    // Run analysis every 5 seconds
    const timer = setInterval(() => {
      const data = analyzeHydrationData();
      setAnalysisData(data);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [showDevTools]);

  if (!showDevTools || !analysisData || process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed top-0 right-0 z-50 p-4 bg-white border border-gray-200 shadow-lg rounded-bl-lg max-w-md max-h-[80vh] overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Hydration Analyzer</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="px-2 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200"
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
          <button 
            onClick={() => clearHydrationEvents()}
            className="px-2 py-1 bg-red-100 rounded text-sm hover:bg-red-200"
          >
            Clear Data
          </button>
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="font-medium mb-2">Summary</h3>
        <div className="text-sm">
          <p>Total hydration events: {analysisData.totalEvents}</p>
          <p>Cart components: {analysisData.byCategory.cart?.length || 0}</p>
          <p>Checkout components: {analysisData.byCategory.checkout?.length || 0}</p>
        </div>
      </div>
      
      {showDetails && (
        <>
          <div className="mb-4">
            <h3 className="font-medium mb-2">Recommendations</h3>
            <div className="text-sm">
              <p className="font-medium mt-1">Components to defer hydration:</p>
              <ul className="list-disc pl-5">
                {analysisData.recommendations.deferHydration.map((comp, i) => (
                  <li key={i}>{comp}</li>
                ))}
              </ul>
              
              <p className="font-medium mt-1">Components to prioritize:</p>
              <ul className="list-disc pl-5">
                {analysisData.recommendations.earlyHydration.map((comp, i) => (
                  <li key={i}>{comp}</li>
                ))}
              </ul>
              
              <p className="font-medium mt-1">Components for interaction hydration:</p>
              <ul className="list-disc pl-5">
                {analysisData.recommendations.interactionHydration.map((comp, i) => (
                  <li key={i}>{comp}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Cart Component Hydration</h3>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-1">Component</th>
                  <th className="text-left pb-1">Strategy</th>
                  <th className="text-right pb-1">Time (ms)</th>
                </tr>
              </thead>
              <tbody>
                {analysisData.byCategory.cart?.map((event, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-1">{event.componentName}</td>
                    <td className="py-1">{event.strategy}</td>
                    <td className="py-1 text-right">
                      {event.interactionTime || event.visibleTime || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      
      <div className="mt-4 text-xs text-gray-500">
        Use the data above to optimize your hydration strategies
      </div>
    </div>
  );
}

/**
 * Initialize the hydration analyzer
 * Should be called once at the root level
 */
export function initHydrationAnalyzer() {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return;
  
  console.log('[HydrationAnalyzer] Initialized');
  
  // Detect performance issues related to hydration
  window.addEventListener('load', () => {
    setTimeout(() => {
      const lcpElement = getLargestContentfulPaint();
      if (lcpElement) {
        console.log('[HydrationAnalyzer] LCP element:', lcpElement);
      }
      
      // Find elements that might benefit from deferred hydration
      const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
      console.log(`[HydrationAnalyzer] Interactive elements count: ${interactiveElements.length}`);
    }, 3000);
  });
}

// Helper function to get the LCP element
function getLargestContentfulPaint() {
  if (!window.performance || !window.performance.getEntriesByType) return null;
  
  const lcpEntries = window.performance.getEntriesByType('largest-contentful-paint');
  if (lcpEntries && lcpEntries.length > 0) {
    const lcpEntry = lcpEntries[lcpEntries.length - 1] as any;
    return lcpEntry.element;
  }
  
  return null;
} 