import React from 'react';
import { ErrorBase } from './ErrorBase';

interface NetworkErrorProps {
  message?: string;
  code?: string;
  onRetry?: () => void;
  technical?: string;
}

/**
 * Specialized component for network-related errors
 */
export function NetworkError({
  message = "We're having trouble connecting to our services right now.",
  code,
  onRetry,
  technical,
}: NetworkErrorProps) {
  return (
    <ErrorBase 
      title="Connection Issue"
      message={message}
      code={code}
      recoveryText="Check your internet connection and try again."
      recoveryAction={onRetry}
      recoveryButtonText="Retry Connection"
      technical={technical}
    />
  );
}

interface APIErrorProps {
  message?: string;
  code?: string;
  onRetry?: () => void;
  technical?: string;
}

/**
 * Specialized component for API errors
 */
export function APIError({
  message = "We couldn't complete your request due to a server issue.",
  code,
  onRetry,
  technical,
}: APIErrorProps) {
  return (
    <ErrorBase 
      title="Service Unavailable"
      message={message}
      code={code}
      recoveryText="Our team has been notified. Please try again in a moment."
      recoveryAction={onRetry}
      technical={technical}
    />
  );
}

interface ProductErrorProps {
  message?: string;
  code?: string;
  onRetry?: () => void;
  onBrowse?: () => void;
  technical?: string;
}

/**
 * Specialized component for product-related errors
 */
export function ProductError({
  message = "We couldn't load the product information.",
  code,
  onRetry,
  onBrowse,
  technical,
}: ProductErrorProps) {
  return (
    <ErrorBase 
      title="Product Unavailable"
      message={message}
      code={code}
      recoveryText="The product may be temporarily unavailable or no longer exists."
      recoveryAction={onRetry}
      secondaryAction={onBrowse}
      secondaryButtonText="Browse Products"
      technical={technical}
    />
  );
}

interface CartErrorProps {
  message?: string;
  code?: string;
  onRetry?: () => void;
  onViewCart?: () => void;
  technical?: string;
}

/**
 * Specialized component for cart-related errors
 */
export function CartError({
  message = "We encountered an issue with your shopping cart.",
  code,
  onRetry,
  onViewCart,
  technical,
}: CartErrorProps) {
  return (
    <ErrorBase 
      title="Cart Issue"
      message={message}
      code={code}
      recoveryText="Try refreshing the page or viewing your cart."
      recoveryAction={onRetry}
      secondaryAction={onViewCart}
      secondaryButtonText="View Cart"
      technical={technical}
    />
  );
}

interface CheckoutErrorProps {
  message?: string;
  code?: string;
  onRetry?: () => void;
  onViewCart?: () => void;
  technical?: string;
}

/**
 * Specialized component for checkout-related errors
 */
export function CheckoutError({
  message = "We couldn't process your checkout request.",
  code,
  onRetry,
  onViewCart,
  technical,
}: CheckoutErrorProps) {
  return (
    <ErrorBase 
      title="Checkout Issue"
      message={message}
      code={code}
      recoveryText="Your payment hasn't been processed. Please try again or review your cart."
      recoveryAction={onRetry}
      recoveryButtonText="Try Checkout Again"
      secondaryAction={onViewCart}
      secondaryButtonText="Review Cart"
      technical={technical}
    />
  );
}

interface AuthErrorProps {
  message?: string;
  code?: string;
  onRetry?: () => void;
  onSignIn?: () => void;
  technical?: string;
}

/**
 * Specialized component for authentication-related errors
 */
export function AuthError({
  message = "We couldn't authenticate your account.",
  code,
  onRetry,
  onSignIn,
  technical,
}: AuthErrorProps) {
  return (
    <ErrorBase 
      title="Authentication Error"
      message={message}
      code={code}
      recoveryText="You may need to sign in again."
      recoveryAction={onRetry}
      secondaryAction={onSignIn}
      secondaryButtonText="Sign In"
      technical={technical}
    />
  );
}

interface SearchErrorProps {
  message?: string;
  code?: string;
  onRetry?: () => void;
  onClear?: () => void;
  technical?: string;
}

/**
 * Specialized component for search-related errors
 */
export function SearchError({
  message = "We couldn't complete your search request.",
  code,
  onRetry,
  onClear,
  technical,
}: SearchErrorProps) {
  return (
    <ErrorBase 
      title="Search Error"
      message={message}
      code={code}
      recoveryText="Try simplifying your search terms or try again later."
      recoveryAction={onRetry}
      secondaryAction={onClear}
      secondaryButtonText="Clear Search"
      technical={technical}
    />
  );
}

interface ValidationErrorProps {
  message?: string;
  code?: string;
  fieldErrors?: Record<string, string[]>;
  technical?: string;
}

/**
 * Specialized component for validation errors
 */
export function ValidationError({
  message = "Please check the information you provided.",
  code,
  fieldErrors,
  technical,
}: ValidationErrorProps) {
  return (
    <div className="max-w-md mx-auto my-4 p-4 border border-red-200 rounded-md bg-red-50">
      <h3 className="text-lg font-semibold text-red-700 mb-2">Form Error</h3>
      <p className="text-red-600 mb-3">{message}</p>
      
      {fieldErrors && Object.keys(fieldErrors).length > 0 && (
        <div className="mt-3">
          <strong className="text-sm text-red-600">Please fix the following:</strong>
          <ul className="list-disc pl-5 mt-1 text-sm text-red-600">
            {Object.entries(fieldErrors).map(([field, errors]) => (
              <li key={field} className="mt-1">
                <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong>{' '}
                {errors.join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export * from './ErrorBase';
