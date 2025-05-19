import React from 'react';
import {Button} from '~/components/Button';
import {Text} from '~/components/Text';

interface ErrorProps {
  title: string;
  message: string;
  code?: string;
  recoveryText?: string;
  recoveryAction?: () => void;
  recoveryButtonText?: string;
  secondaryAction?: () => void;
  secondaryButtonText?: string;
  showHomeButton?: boolean;
  technical?: string;
}

/**
 * Base Error component that all domain-specific error components can use
 */
export function ErrorBase({
  title,
  message,
  code,
  recoveryText,
  recoveryAction,
  recoveryButtonText = 'Try Again',
  secondaryAction,
  secondaryButtonText,
  showHomeButton = true,
  technical,
}: ErrorProps) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 max-w-3xl mx-auto my-8">
      <div className="w-full text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">{title}</h1>
        
        <div className="mb-6">
          <Text className="text-lg text-gray-700" as="p">
            {message}
          </Text>
          
          {code && isDev && (
            <Text className="text-sm text-gray-500 mt-2" as="p">
              Error code: {code}
            </Text>
          )}
          
          {recoveryText && (
            <Text className="text-md text-gray-600 mt-4" as="p">
              {recoveryText}
            </Text>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
          {recoveryAction && (
            <Button onClick={recoveryAction} variant="primary">
              {recoveryButtonText}
            </Button>
          )}
          
          {secondaryAction && secondaryButtonText && (
            <Button onClick={secondaryAction} variant="secondary">
              {secondaryButtonText}
            </Button>
          )}
          
          {showHomeButton && (
            <Button width="auto" variant="secondary" to={'/'}>
              Go to homepage
            </Button>
          )}
        </div>
        
        {technical && isDev && (
          <div className="mt-8">
            <details className="bg-gray-50 rounded-md p-4 text-left">
              <summary className="cursor-pointer text-gray-500 mb-2">Technical details</summary>
              <pre
                className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto max-h-60"
                style={{
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {technical}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}
