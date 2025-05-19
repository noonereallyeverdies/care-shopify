import React, { ReactNode } from 'react';
import { useNavigate } from '@remix-run/react';
import { Button } from './Button';
import { PageHeader, Text } from './Text';
import { analyzeError } from '~/utils/errors';

export interface GenericErrorProps {
  error?: unknown;
  title?: string;
  showDetails?: boolean;
}

/**
 * Enhanced generic error component with user-friendly error messaging
 * 
 * @param error - The error object to display
 * @param title - Optional custom title
 * @param showDetails - Whether to show technical details (defaults to dev mode only)
 */
export function GenericError({
  error,
  title,
  showDetails = process.env.NODE_ENV === 'development',
}: GenericErrorProps) {
  const navigate = useNavigate();
  const isDev = process.env.NODE_ENV === 'development';
  
  // Default if no error provided
  const defaultErrorInfo = {
    message: 'An unknown error occurred',
    isNotFound: false,
    statusCode: 500,
    stack: undefined,
  };
  
  // Use error analysis utility or default
  const errorInfo = error ? analyzeError(error) : defaultErrorInfo;
  
  // Extract information for display
  const { message, isNotFound, statusCode, stack } = errorInfo;
  
  // Format technical details for display if available
  const technicalDetails = stack || 
    (error instanceof Error ? error.stack : JSON.stringify(error, null, 2));
  
  // Consider all non-404 errors as recoverable
  const isRecoverable = !isNotFound;
  
  // Error code for display
  const errorCode = `HTTP ${statusCode}`;
  
  // Get user-friendly message based on error type
  const userMessage = getUserFriendlyMessage(errorInfo);
  const recoveryText = getRecoveryInstructions(errorInfo);
  
  // Default heading with optional override
  const heading = title || "We're having trouble loading this page";

  // Convert technical details to safe ReactNode
  const safeDetails: ReactNode = typeof technicalDetails === 'string' 
    ? technicalDetails 
    : String(technicalDetails);

  const handleRetry = () => {
    // Attempt to refresh the page
    window.location.reload();
  };

  const handleGoBack = () => {
    // Go back in history
    navigate(-1);
  };

  return (
    <>
      <PageHeader heading={heading}>
        <Text width="narrow" as="p" className="mb-3">
          {userMessage}
        </Text>
        
        {recoveryText && (
          <Text width="narrow" as="p" className="text-gray-600 mb-6">
            {recoveryText}
          </Text>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          {isRecoverable && (
            <Button width="auto" variant="primary" onClick={handleRetry}>
              Try again
            </Button>
          )}
          
          <Button width="auto" variant="secondary" onClick={handleGoBack}>
            Go back
          </Button>
          
          <Button width="auto" variant="secondary" to="/">
            Go to homepage
          </Button>
        </div>

        {/* Show technical details only in development or when explicitly enabled */}
        {(isDev || showDetails) && error !== undefined && error !== null && (
          <div className="mt-8 max-w-2xl">
            <details className="bg-gray-50 rounded-md p-4">
              <summary className="cursor-pointer text-gray-500 mb-2">Technical details</summary>
              
              {errorCode && (
                <div className="text-sm text-gray-500 mb-2">
                  Error code: <code className="bg-gray-100 px-1 py-0.5 rounded">{errorCode}</code>
                </div>
              )}
              
              <div className="text-sm text-gray-500 mb-2">
                Error message: <span className="font-mono bg-gray-100 px-1 py-0.5 rounded">{message}</span>
              </div>
              
              {technicalDetails && (
                <pre
                  className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto max-h-60"
                  style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
                >
                  {safeDetails}
                </pre>
              )}
            </details>
          </div>
        )}
      </PageHeader>
    </>
  );
}

/**
 * Get a user-friendly error message based on the error analysis
 */
function getUserFriendlyMessage(errorInfo: ReturnType<typeof analyzeError>): string {
  if (errorInfo.isNotFound) {
    return "We couldn't find the page you're looking for. It might have been moved or deleted.";
  }
  
  switch (errorInfo.statusCode) {
    case 401:
      return "You need to be logged in to access this page.";
    case 403:
      return "You don't have permission to access this page.";
    case 500:
      return "We're experiencing technical difficulties. Our team has been notified.";
    case 503:
      return "Our service is temporarily unavailable. Please try again later.";
    default:
      return "Something went wrong while loading this page. Please try again.";
  }
}

/**
 * Get recovery instructions based on the error analysis
 */
function getRecoveryInstructions(errorInfo: ReturnType<typeof analyzeError>): string {
  if (errorInfo.isNotFound) {
    return "Double-check the URL or navigate to a different section of our site.";
  }
  
  switch (errorInfo.statusCode) {
    case 401:
      return "Try logging in and then return to this page.";
    case 403:
      return "If you believe you should have access, please contact support.";
    case 500:
    case 503:
      return "This is likely a temporary issue. Please try again in a few minutes.";
    default:
      return "You can try refreshing the page or come back later.";
  }
}
