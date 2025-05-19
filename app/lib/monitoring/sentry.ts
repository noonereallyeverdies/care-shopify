/**
 * Sentry integration for enhanced error monitoring
 */
import * as Sentry from '@sentry/remix';
// Comment out the problematic profiling import
// import { ProfilingIntegration } from '@sentry/profiling-node';
import { Replay } from '@sentry/replay';
import { BrowserTracing } from '@sentry/browser';

const SENTRY_DSN = process.env.SENTRY_DSN;
const ENVIRONMENT = process.env.NODE_ENV || 'development';

export function initializeSentry() {
  if (!SENTRY_DSN) {
    console.warn('Sentry DSN not provided. Error monitoring will be limited.');
    return;
  }

  // Initialize Sentry for browser and server
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: ENVIRONMENT,
    tracesSampleRate: ENVIRONMENT === 'production' ? 0.1 : 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    integrations: [
      // Performance and error monitoring
      new BrowserTracing(),
      
      // Session replay for error reproduction
      new Replay({
        maskAllText: true,
        blockAllMedia: true,
      }),
      
      // Remove the problematic profiling integration
      // new ProfilingIntegration(),
    ],
  });
}

/**
 * Capture an exception with Sentry with additional context
 */
export function captureException(error: Error, context?: Record<string, any>) {
  if (!SENTRY_DSN) {
    // Fallback to console if Sentry isn't configured
    console.error('[Error]', error, context);
    return;
  }
  
  if (context) {
    Sentry.setContext('error_context', context);
  }
  
  Sentry.captureException(error);
}

/**
 * Set user information for error tracking
 */
export function identifyUser(id?: string, email?: string, username?: string) {
  if (SENTRY_DSN) {
    Sentry.setUser({
      id,
      email,
      username,
    });
  }
}

/**
 * Clear user information (e.g., on logout)
 */
export function clearUserIdentity() {
  if (SENTRY_DSN) {
    Sentry.setUser(null);
  }
}

/**
 * Track a performance span
 */
export function trackPerformance(name: string, callback: () => any) {
  if (!SENTRY_DSN) return callback();
  
  const transaction = Sentry.startTransaction({
    name,
  });
  
  try {
    return callback();
  } finally {
    transaction.finish();
  }
}
