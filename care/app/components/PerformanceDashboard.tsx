import React, { useState, useEffect } from 'react';
import { cn } from '~/lib/utils';
import { 
  PerformanceMonitor, 
  MemoryManager, 
  ImagePreloader,
  BundleOptimizer 
} from '~/lib/performance-stub';

// Also import Core Web Vitals for enhanced monitoring
import { CORE_WEB_VITALS_THRESHOLDS } from '~/lib/core-web-vitals';

interface PerformanceStats {
  coreWebVitals: {
    fcp?: number;
    lcp?: number;
    cls?: number;
    fid?: number;
  };
  loadTimes: Record<string, any>;
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
    usedPercentage: number;
  };
  chunkData: {
    loadedChunks: string[];
    loadTimes: Record<string, number>;
    averageLoadTime: number;
  };
  imageCache: {
    size: number;
  };
}

/**
 * Performance Dashboard Component
 * 
 * Provides real-time performance monitoring and analytics
 * for the application. Useful for development and debugging.
 */
export function PerformanceDashboard({ 
  className,
  showInProduction = false 
}: { 
  className?: string;
  showInProduction?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [stats, setStats] = useState<PerformanceStats | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Only show in development
  if (process.env.NODE_ENV === 'production' && !showInProduction) return null;

  // Collect performance statistics with Core Web Vitals
  const collectStats = () => {
    const coreWebVitals: any = {};
    
    // Get Core Web Vitals with proper thresholds
    if ('PerformanceObserver' in window) {
      const fcpMetric = PerformanceMonitor.getMetric('first-contentful-paint');
      if (fcpMetric) coreWebVitals.fcp = fcpMetric.average;
      
      const lcpMetric = PerformanceMonitor.getMetric('largest-contentful-paint');
      if (lcpMetric) coreWebVitals.lcp = lcpMetric.average;
      
      const clsMetric = PerformanceMonitor.getMetric('layout-shift');
      if (clsMetric) {
        coreWebVitals.cls = clsMetric.values.reduce((sum, val) => sum + val, 0);
      }
      
      const fidMetric = PerformanceMonitor.getMetric('first-input-delay');
      if (fidMetric) coreWebVitals.fid = fidMetric.average;
    }

    // Get real-time Core Web Vitals from the monitoring system
    if (window.webVitalsMonitor) {
      const vitalsMetrics = (window.webVitalsMonitor as any).getMetricsSummary();
      Object.keys(vitalsMetrics).forEach(key => {
        if (vitalsMetrics[key] && vitalsMetrics[key].value) {
          coreWebVitals[key.toLowerCase()] = vitalsMetrics[key].value;
        }
      });
    }

    const newStats: PerformanceStats = {
      coreWebVitals,
      loadTimes: PerformanceMonitor.getAllMetrics(),
      memory: MemoryManager.getMemoryInfo(),
      chunkData: {
        loadedChunks: BundleOptimizer.getLoadedChunks(),
        loadTimes: BundleOptimizer.getChunkLoadTimes(),
        averageLoadTime: BundleOptimizer.getAverageChunkLoadTime(),
      },
      imageCache: {
        size: ImagePreloader.getCacheSize(),
      },
    };

    setStats(newStats);
  };

  // Auto-refresh stats
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(collectStats, 1000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Initial load
  useEffect(() => {
    collectStats();
  }, []);

  // Manual cleanup functions
  const clearImageCache = () => {
    ImagePreloader.clearCache();
    collectStats();
  };

  const runMemoryCleanup = () => {
    MemoryManager.runCleanup();
    setTimeout(collectStats, 100);
  };

  const clearPerformanceMetrics = () => {
    PerformanceMonitor.clear();
    collectStats();
  };

  if (!stats) return null;

  return (
    <div className={cn('fixed bottom-4 right-4 z-50', className)}>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Toggle Performance Dashboard"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
          />
        </svg>
      </button>

      {/* Dashboard Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 max-h-96 overflow-y-auto bg-white rounded-lg shadow-xl border border-gray-200">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Performance Monitor</h3>
              <div className="flex items-center space-x-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={autoRefresh}
                    onChange={(e) => setAutoRefresh(e.target.checked)}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">Auto-refresh</span>
                </label>
                <button
                  onClick={collectStats}
                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                >
                  Refresh
                </button>
              </div>
            </div>
          </div>

          {/* Core Web Vitals */}
          <div className="p-4 border-b border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">Core Web Vitals</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-gray-50 p-2 rounded">
                <div className="text-gray-600">FCP</div>
                <div className="font-mono">
                  {stats.coreWebVitals.fcp ? `${stats.coreWebVitals.fcp.toFixed(0)}ms` : 'N/A'}
                </div>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <div className="text-gray-600">LCP</div>
                <div className="font-mono">
                  {stats.coreWebVitals.lcp ? `${stats.coreWebVitals.lcp.toFixed(0)}ms` : 'N/A'}
                </div>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <div className="text-gray-600">CLS</div>
                <div className="font-mono">
                  {stats.coreWebVitals.cls ? stats.coreWebVitals.cls.toFixed(3) : 'N/A'}
                </div>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <div className="text-gray-600">FID</div>
                <div className="font-mono">
                  {stats.coreWebVitals.fid ? `${stats.coreWebVitals.fid.toFixed(0)}ms` : 'N/A'}
                </div>
              </div>
            </div>
          </div>

          {/* Memory Usage */}
          {stats.memory && (
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Memory Usage</h4>
                <button
                  onClick={runMemoryCleanup}
                  className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
                >
                  Cleanup
                </button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Used:</span>
                  <span className="font-mono">
                    {(stats.memory.usedJSHeapSize / 1024 / 1024).toFixed(1)}MB
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-mono">
                    {(stats.memory.totalJSHeapSize / 1024 / 1024).toFixed(1)}MB
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Usage:</span>
                  <span className="font-mono">
                    {stats.memory.usedPercentage.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${stats.memory.usedPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Chunk Loading */}
          <div className="p-4 border-b border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">Bundle Chunks</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Loaded:</span>
                <span className="font-mono">{stats.chunkData.loadedChunks.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Load Time:</span>
                <span className="font-mono">
                  {stats.chunkData.averageLoadTime.toFixed(0)}ms
                </span>
              </div>
              {stats.chunkData.loadedChunks.length > 0 && (
                <div className="max-h-20 overflow-y-auto">
                  {stats.chunkData.loadedChunks.map((chunk, index) => (
                    <div key={index} className="flex justify-between text-xs">
                      <span className="text-gray-500 truncate">{chunk}</span>
                      <span className="font-mono ml-2">
                        {stats.chunkData.loadTimes[chunk]?.toFixed(0)}ms
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Image Cache */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Image Cache</h4>
              <button
                onClick={clearImageCache}
                className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
              >
                Clear
              </button>
            </div>
            <div className="text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Cached Images:</span>
                <span className="font-mono">{stats.imageCache.size}</span>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Performance Metrics</h4>
              <button
                onClick={clearPerformanceMetrics}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
              >
                Clear
              </button>
            </div>
            <div className="max-h-32 overflow-y-auto space-y-1 text-xs">
              {Object.entries(stats.loadTimes).map(([metric, data]) => (
                <div key={metric} className="flex justify-between">
                  <span className="text-gray-600 truncate">{metric}:</span>
                  <span className="font-mono ml-2">
                    {data.average?.toFixed(0)}ms ({data.count})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Performance alerts component
export function PerformanceAlerts() {
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    const checkPerformance = () => {
      const newAlerts: string[] = [];
      
      // Check memory usage
      const memory = MemoryManager.getMemoryInfo();
      if (memory && memory.usedPercentage > 80) {
        newAlerts.push(`High memory usage: ${memory.usedPercentage.toFixed(1)}%`);
      }
      
      // Check for long tasks
      const longTasks = PerformanceMonitor.getMetric('long-task');
      if (longTasks && longTasks.average > 50) {
        newAlerts.push(`Long tasks detected: ${longTasks.average.toFixed(0)}ms avg`);
      }
      
      // Check layout shifts
      const layoutShifts = PerformanceMonitor.getMetric('layout-shift');
      if (layoutShifts && layoutShifts.values.reduce((sum, val) => sum + val, 0) > 0.1) {
        newAlerts.push('High Cumulative Layout Shift detected');
      }
      
      setAlerts(newAlerts);
    };

    const interval = setInterval(checkPerformance, 5000);
    checkPerformance(); // Initial check

    return () => clearInterval(interval);
  }, []);

  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {alerts.map((alert, index) => (
        <div
          key={index}
          className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded shadow-lg max-w-sm"
        >
          <div className="flex">
            <div className="py-1">
              <svg className="fill-current h-6 w-6 text-yellow-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
              </svg>
            </div>
            <div>
              <p className="font-bold">Performance Alert</p>
              <p className="text-sm">{alert}</p>
            </div>
            <button
              onClick={() => setAlerts(alerts.filter((_, i) => i !== index))}
              className="ml-auto pl-3"
            >
              <svg className="h-6 w-6 text-yellow-500 hover:text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Component to show performance insights
export function PerformanceInsights() {
  const [insights, setInsights] = useState<string[]>([]);

  useEffect(() => {
    const generateInsights = () => {
      const newInsights: string[] = [];
      
      // Analyze memory usage patterns
      const memory = MemoryManager.getMemoryInfo();
      if (memory) {
        if (memory.usedPercentage < 30) {
          newInsights.push('Memory usage is optimal');
        } else if (memory.usedPercentage > 70) {
          newInsights.push('Consider implementing memory cleanup strategies');
        }
      }
      
      // Analyze chunk loading
      const avgChunkTime = BundleOptimizer.getAverageChunkLoadTime();
      if (avgChunkTime > 100) {
        newInsights.push('Bundle chunks are loading slowly - consider code splitting optimization');
      } else if (avgChunkTime < 50) {
        newInsights.push('Bundle chunk loading is performing well');
      }
      
      // Analyze image cache
      const imageCache = ImagePreloader.getCacheSize();
      if (imageCache > 50) {
        newInsights.push('Large image cache detected - consider implementing cache size limits');
      }
      
      // Check Core Web Vitals
      const fcp = PerformanceMonitor.getMetric('first-contentful-paint');
      if (fcp && fcp.average > 1800) {
        newInsights.push('First Contentful Paint is slow - optimize critical rendering path');
      } else if (fcp && fcp.average < 1000) {
        newInsights.push('Excellent First Contentful Paint performance');
      }
      
      setInsights(newInsights);
    };

    generateInsights();
    const interval = setInterval(generateInsights, 10000);
    
    return () => clearInterval(interval);
  }, []);

  if (insights.length === 0) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 m-4">
      <h3 className="text-lg font-semibold text-blue-900 mb-2">Performance Insights</h3>
      <ul className="space-y-1">
        {insights.map((insight, index) => (
          <li key={index} className="text-blue-800 text-sm flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            {insight}
          </li>
        ))}
      </ul>
    </div>
  );
}