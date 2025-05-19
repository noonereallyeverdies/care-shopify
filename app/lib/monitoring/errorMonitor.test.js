import { describe, it, expect, vi, beforeEach } from 'vitest';
import { errorMonitor, logError, ErrorSeverity } from '../app/lib/monitoring/errorMonitor';

describe('Error Monitor', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // Clear any stored errors
    errorMonitor.clearErrors();
    // Mock console.error to prevent test output pollution
    vi.spyOn(console, 'error').mockImplementation(() => {});
    // Mock fetch for server reporting
    global.fetch = vi.fn(() => Promise.resolve({ json: () => Promise.resolve({ success: true }) }));
  });

  it('should capture errors with correct details', () => {
    // Arrange
    const errorMessage = 'Test error message';
    const errorContext = { testKey: 'testValue' };
    const errorSeverity = ErrorSeverity.WARNING;

    // Act
    logError(errorMessage, errorSeverity, errorContext);
    const capturedErrors = errorMonitor.getErrors();

    // Assert
    expect(capturedErrors).toHaveLength(1);
    expect(capturedErrors[0].message).toBe(errorMessage);
    expect(capturedErrors[0].severity).toBe(errorSeverity);
    expect(capturedErrors[0].context).toEqual(errorContext);
    expect(capturedErrors[0].timestamp).toBeTypeOf('number');
  });

  it('should limit the number of stored errors', () => {
    // Arrange - Generate more errors than the limit
    const MAX_ERRORS = 100; // This should match the limit in the implementation
    
    // Act - Log more errors than the limit
    for (let i = 0; i < MAX_ERRORS + 10; i++) {
      logError(`Error ${i}`, ErrorSeverity.INFO);
    }
    
    const capturedErrors = errorMonitor.getErrors();
    
    // Assert
    expect(capturedErrors).toHaveLength(MAX_ERRORS);
    // The oldest errors should be removed, so the first error should be "Error 10"
    expect(capturedErrors[0].message).toBe('Error 10');
    expect(capturedErrors[MAX_ERRORS - 1].message).toBe(`Error ${MAX_ERRORS + 9}`);
  });

  it('should log to console in development environment', () => {
    // Mock environment check
    vi.stubEnv('NODE_ENV', 'development');
    
    // Act
    logError('Console logged error', ErrorSeverity.ERROR);
    
    // Assert
    expect(console.error).toHaveBeenCalled();
  });

  it('should not log to console in production environment', () => {
    // Mock environment check
    vi.stubEnv('NODE_ENV', 'production');
    
    // Act
    logError('Not console logged', ErrorSeverity.ERROR);
    
    // Assert
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should attempt to send errors to server in production', () => {
    // Mock environment check
    vi.stubEnv('NODE_ENV', 'production');
    
    // Act
    logError('Server reported error', ErrorSeverity.CRITICAL);
    
    // Assert - Should attempt to send to server
    expect(fetch).toHaveBeenCalled();
    expect(fetch.mock.calls[0][0]).toContain('/api/log-error');
    const requestBody = JSON.parse(fetch.mock.calls[0][1].body);
    expect(requestBody.message).toBe('Server reported error');
    expect(requestBody.severity).toBe(ErrorSeverity.CRITICAL);
  });

  it('should clear all errors when requested', () => {
    // Arrange
    logError('Error 1');
    logError('Error 2');
    
    // Act
    errorMonitor.clearErrors();
    const capturedErrors = errorMonitor.getErrors();
    
    // Assert
    expect(capturedErrors).toHaveLength(0);
  });
});
