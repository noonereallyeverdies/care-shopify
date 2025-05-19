import React from 'react';

/**
 * Simple text formatting utility to replace typographic-base
 * which is causing compatibility issues
 */
export function formatText(input?: string | React.ReactNode): string | React.ReactNode | undefined {
  if (!input) {
    return undefined;
  }

  if (typeof input !== 'string') {
    return input;
  }

  // Just return the input text without trying to format it
  // This avoids the Node.js compatibility issues
  return input;
} 