import React from "react";
import {Button} from './Button';
import {useState, useEffect} from 'react';

interface ErrorResponse {
  error?: string;
  [key: string]: unknown;
}

// Define a simplified SellingPlan type since storefrontapi.generated might not have it
interface SellingPlan {
  id: string;
  name?: string;
  options?: Array<{
    name: string;
    value: string;
  }>;
}

/**
 * A Buy Now button that directly initiates the checkout process with the specified variant
 */
export function BuyNowButton({
  variantId,
  quantity = 1,
  className = '',
  children,
  disabled = false,
  isOutOfStock = false,
  selectedSellingPlan = null,
  ...props
}: {
  variantId: string;
  quantity?: number;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  isOutOfStock?: boolean;
  selectedSellingPlan?: SellingPlan | null;
  [key: string]: any;
}) {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [checkoutTimer, setCheckoutTimer] = useState<number | null>(null);

  // Clear any existing timers when component unmounts
  useEffect(() => {
    return () => {
      if (checkoutTimer) window.clearTimeout(checkoutTimer);
    };
  }, [checkoutTimer]);

  // Create a checkout URL with the variant and quantity
  const handleBuyNow = async () => {
    if (isRedirecting) return;
    
    setIsRedirecting(true);
    setError(null);
    setStatus('loading');
    
    try {
      // Construct checkout URL with variant and quantity
      let checkoutUrl = `/checkout/direct?variantId=${variantId}&quantity=${quantity}`;
      
      // Add selling plan ID if a subscription is selected
      if (selectedSellingPlan?.id) {
        checkoutUrl += `&sellingPlanId=${selectedSellingPlan.id}`;
      }
      
      // Use fetch API to submit the request
      const response = await fetch(checkoutUrl);
      
      if (!response.ok) {
        // Handle non-OK responses
        const errorData = await response.json().catch(() => ({} as ErrorResponse)) as ErrorResponse;
        throw new Error(errorData.error || 'Failed to process checkout');
      }
      
      // Set success status briefly before redirecting
      setStatus('success');
      
      // For successful responses with redirects, the fetch API follows redirects
      // but doesn't actually navigate the page, so we need to extract the location
      // header from the response and manually navigate
      const redirectUrl = response.url;
      
      // Set a timer to redirect after showing the success state briefly
      const timer = window.setTimeout(() => {
        // Check if we have a valid URL to redirect to
        if (redirectUrl && redirectUrl !== window.location.href) {
          window.location.href = redirectUrl;
        } else {
          // If no redirect URL is found, fall back to the cart page
          window.location.href = '/cart';
        }
      }, 1000); // short delay to show the success state
      
      setCheckoutTimer(timer);
    } catch (err) {
      console.error('Buy Now error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setIsRedirecting(false);
      setStatus('error');
    }
  };

  // Determine button text based on state
  let buttonText = children || 'Buy Now';
  if (isOutOfStock) buttonText = 'Out of Stock';
  else if (status === 'loading') buttonText = 'Processing...';
  else if (status === 'success') buttonText = 'Redirecting to Checkout...';
  else if (isRedirecting) buttonText = 'Redirecting...';
  
  // Add subscription text if a selling plan is selected
  if (selectedSellingPlan && status === 'idle' && !isOutOfStock) {
    buttonText = `Subscribe Now`;
  }

  // Determine button styles based on state
  const buttonStyles = `${className} ${
    isRedirecting ? 'opacity-80' : ''
  } ${
    status === 'success' ? 'bg-green-600 hover:bg-green-700' : ''
  } ${
    status === 'error' ? 'bg-red-600 hover:bg-red-700' : ''
  } ${
    isOutOfStock ? 'opacity-60 cursor-not-allowed' : ''
  }`;

  return (
    <>
      <Button
        as="button"
        type="button"
        variant="secondary"
        width="full"
        className={buttonStyles}
        disabled={isRedirecting || disabled || isOutOfStock}
        onClick={handleBuyNow}
        {...props}
      >
        {buttonText}
        
        {status === 'loading' && (
          <span className="ml-2">
            <svg className="animate-spin h-4 w-4 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
        )}
        
        {status === 'success' && (
          <span className="ml-2">
            <svg className="h-4 w-4 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </span>
        )}
      </Button>
      
      {/* Error message */}
      {error && (
        <div className="mt-2 text-sm text-red-600">
          {error}
        </div>
      )}
    </>
  );
} 