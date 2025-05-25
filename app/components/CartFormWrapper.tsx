import React from 'react';
import { CartForm } from '@shopify/hydrogen';
import { useLocation } from '@remix-run/react';

interface CartFormWrapperProps {
  action: typeof CartForm.ACTIONS[keyof typeof CartForm.ACTIONS];
  inputs: any;
  children: React.ReactNode | ((fetcher: any) => React.ReactNode);
}

/**
 * A wrapper around CartForm that determines the correct route based on the current location
 */
export function CartFormWrapper({ action, inputs, children }: CartFormWrapperProps) {
  const location = useLocation();
  
  // Extract locale from pathname if it exists
  const pathParts = location.pathname.split('/').filter(Boolean);
  
  // Common locale patterns with country codes
  const localePattern = /^[a-z]{2}-[a-z]{2}$/i; // matches en-us, es-mx, fr-ca, etc.
  
  // Check if the first part matches a locale pattern
  let locale = 'en-us'; // default locale
  if (pathParts.length > 0 && localePattern.test(pathParts[0])) {
    locale = pathParts[0].toLowerCase();
  }
  
  // Construct the cart route with locale
  const cartRoute = `/${locale}/cart`;
  
  return (
    <CartForm
      route={cartRoute}
      action={action}
      inputs={inputs}
    >
      {children}
    </CartForm>
  );
}
