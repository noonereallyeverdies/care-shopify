import React from "react";
import {json, redirect} from '@shopify/remix-oxygen';
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';
import type {CartLineInput} from "@shopify/hydrogen/storefront-api-types";
import invariant from 'tiny-invariant';

/**
 * Route handler for direct checkout
 * Adds a product to the cart and redirects to the checkout URL
 */
export async function loader({request, context}: LoaderFunctionArgs) {
  const {cart, storefront} = context;
  
  const url = new URL(request.url);
  const variantId = url.searchParams.get('variantId');
  const quantityParam = url.searchParams.get('quantity') ?? '1';
  const quantity = parseInt(quantityParam, 10);
  const sellingPlanId = url.searchParams.get('sellingPlanId');
  
  try {
    // Validate required parameters
    if (!variantId) {
      throw new Error('Variant ID is required');
    }
    
    if (isNaN(quantity) || quantity <= 0) {
      throw new Error('Valid quantity is required');
    }
    
    // Check if variant exists and is available for purchase
    try {
      const {product} = await storefront.query(`
        query ProductVariantById($variantId: ID!) {
          product: node(id: $variantId) {
            ... on ProductVariant {
              id
              availableForSale
              product {
                title
              }
            }
          }
        }
      `, {
        variables: {
          variantId,
        },
      });
      
      if (!product) {
        throw new Error('Product variant not found');
      }
      
      if (product && 'availableForSale' in product && !product.availableForSale) {
        throw new Error(`This product is currently not available for purchase`);
      }
    } catch (variantError) {
      console.error('Error checking variant availability:', variantError);
      // Continue with checkout attempt even if variant check fails
      // The cart API will validate the variant as well
    }

    // Create line item for cart
    const lines: CartLineInput[] = [
      {
        merchandiseId: variantId,
        quantity,
        ...(sellingPlanId ? { sellingPlanId } : {}),
      },
    ];

    // Add to cart and get checkout URL
    const result = await cart.addLines(lines);
    
    // Check if there are any user errors from the cart operation
    if (result.userErrors && result.userErrors.length > 0) {
      const errorMessages = result.userErrors.map(err => err.message).join('. ');
      return json(
        {error: `Unable to add product to cart: ${errorMessages}`},
        {status: 400}
      );
    }
    
    // Set the cartId in the session
    const headers = cart.setCartId(result.cart.id);
    
    // Redirect to checkout URL
    if (result.cart.checkoutUrl) {
      return redirect(result.cart.checkoutUrl, {
        headers,
      });
    }
    
    // Fallback to cart page if no checkout URL is available
    return redirect('/cart', {
      headers,
    });
    
  } catch (error) {
    console.error('Direct checkout error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred during checkout';
    
    return json(
      {error: errorMessage},
      {status: 500},
    );
  }
}

export default function DirectCheckout() {
  // This component won't render as we're redirecting in the loader
  return null;
} 