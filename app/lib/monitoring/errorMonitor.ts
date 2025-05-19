/**
 * Error monitoring and reporting utilities
 * 
 * In a production application, this would likely integrate with services
 * like Sentry, LogRocket, or a custom error tracking solution
 */

// Error severity levels
export enum ErrorSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical',
}

interface ErrorDetails {
  message: string;
  source?: string;
  severity: ErrorSeverity;
  context?: Record<string, any>;
  stack?: string;
  timestamp: number;
}

class ErrorMonitor {
  private static instance: ErrorMonitor;
  private errors: ErrorDetails[] = [];
  private MAX_STORED_ERRORS = 100;
  
  // Configuration - in production this would connect to your error reporting service
  private config = {
    reportToServer: process.env.NODE_ENV === 'production',
    logToConsole: process.env.NODE_ENV !== 'production',
    errorEndpoint: '/api/log-error',
  };

  private constructor() {
    // Initialize error handlers
    if (typeof window !== 'undefined') {
      this.setupClientErrorHandlers();
    }
  }

  public static getInstance(): ErrorMonitor {
    if (!ErrorMonitor.instance) {
      ErrorMonitor.instance = new ErrorMonitor();
    }

    return ErrorMonitor.instance;
  }

  /**
   * Set up global error handlers for client-side errors
   */
  private setupClientErrorHandlers() {
    // Global unhandled error handler
    window.addEventListener('error', (event) => {
      this.captureError({
        message: event.message || 'Unknown error',
        source: event.filename,
        severity: ErrorSeverity.ERROR,
        stack: event.error?.stack,
        context: {
          lineNumber: event.lineno,
          columnNumber: event.colno,
        },
        timestamp: Date.now(),
      });
      
      // Don't prevent default so browser console still shows the error
      return false;
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      const error = event.reason;
      this.captureError({
        message: error.message || 'Unhandled Promise Rejection',
        severity: ErrorSeverity.ERROR,
        stack: error.stack,
        context: { 
          promiseRejection: true
        },
        timestamp: Date.now(),
      });
    });
    
    // Capture React's error boundary errors
    window.__REACT_ERROR_OVERLAY__ = true;
  }

  /**
   * Log an error to the appropriate targets
   */
  public captureError(errorDetails: ErrorDetails): void {
    // Add to in-memory queue (limited size)
    this.errors.push(errorDetails);
    if (this.errors.length > this.MAX_STORED_ERRORS) {
      this.errors.shift(); // Remove oldest error
    }

    // Log to console in development
    if (this.config.logToConsole) {
      console.error('[ErrorMonitor]', errorDetails);
    }

    // Report to server in production
    if (this.config.reportToServer) {
      this.sendErrorToServer(errorDetails);
    }
  }

  /**
   * Send error to server-side logging endpoint
   */
  private async sendErrorToServer(errorDetails: ErrorDetails): Promise<void> {
    try {
      await fetch(this.config.errorEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorDetails),
      });
    } catch (e) {
      // Silently fail - we don't want to cause additional errors while reporting
      console.error('[ErrorMonitor] Failed to send error to server', e);
    }
  }

  /**
   * Get all captured errors (for debugging purposes)
   */
  public getErrors(): ErrorDetails[] {
    return [...this.errors];
  }

  /**
   * Clear all stored errors
   */
  public clearErrors(): void {
    this.errors = [];
  }

  /**
   * Capture performance information along with errors
   */
  public capturePerformanceMetrics(): void {
    if (typeof window !== 'undefined') {
      // Capture page load timing
      window.addEventListener('load', () => {
        setTimeout(() => {
          const timing = performance.timing;
          const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
          const domReadyTime = timing.domComplete - timing.domLoading;
          
          this.captureError({
            message: 'Performance metrics',
            severity: ErrorSeverity.INFO,
            context: {
              pageLoadTime,
              domReadyTime,
              url: window.location.href,
              userAgent: navigator.userAgent,
            },
            timestamp: Date.now(),
          });
          
          // Capture Core Web Vitals if available
          if ('web-vitals' in window) {
            // This would normally use the web-vitals library
            // import {getCLS, getFID, getLCP} from 'web-vitals';
            // getCLS(metric => {...});
          }
        }, 0);
      });
    }
  }
}

// Export singleton instance
export const errorMonitor = ErrorMonitor.getInstance();

// Utility function for components to log errors
export function logError(
  message: string, 
  severity: ErrorSeverity = ErrorSeverity.ERROR, 
  context?: Record<string, any>
) {
  errorMonitor.captureError({
    message,
    severity,
    context,
    timestamp: Date.now(),
  });
}
