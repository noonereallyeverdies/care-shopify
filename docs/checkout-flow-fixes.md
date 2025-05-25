# Checkout Flow Fixes

This document outlines the issues identified with the checkout flow in the Hydrogen storefront and the changes made to fix them.

## Issues Fixed

### 1. Checkout Button Integration
- **Issue:** The checkout button wasn't properly initiating the checkout process
- **Fix:** Ensured the checkout URL from the cart is correctly passed to the checkout button

### 2. "Buy Now" Button Functionality
- **Issue:** The "Buy Now" button was just a placeholder without actual functionality
- **Fix:** 
  - Created a dedicated `BuyNowButton` component
  - Implemented a direct checkout route at `/checkout/direct`
  - Connected the button to add the product to cart and immediately redirect to checkout

### 3. ShopPay Button Implementation
- **Issue:** The ShopPay button wasn't properly configured with the correct storefront domain
- **Fix:**
  - In product forms, updated the ShopPay button to use the storeDomain prop instead of window.location.host
  - Ensured proper conditional rendering to prevent client/server hydration issues

### 4. Price Total Consistency
- **Issue:** Price totals weren't consistently formatted through checkout steps
- **Fix:** 
  - Added consistent number formatting to ensure prices always display with 2 decimal places
  - Updated the Cart component to use a formatted subtotal amount

## Implementation Details

### 1. BuyNowButton Component
Created a new component that:
- Takes a variant ID and quantity
- Shows loading state during the redirect
- Directs users to the `/checkout/direct` route

```tsx
export function BuyNowButton({
  variantId,
  quantity = 1,
  className = '',
  children,
  ...props
}) {
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  const handleBuyNow = () => {
    if (isRedirecting) return;
    setIsRedirecting(true);
    
    const checkoutUrl = `/checkout/direct?variantId=${variantId}&quantity=${quantity}`;
    window.location.href = checkoutUrl;
  };
  
  // Component rendering...
}
```

### 2. Direct Checkout Route
Created a route handler that:
- Accepts variant ID and quantity from query parameters
- Adds the product to the cart
- Immediately redirects to the Shopify checkout URL

```tsx
export async function loader({request, context}) {
  const {cart} = context;
  const url = new URL(request.url);
  const variantId = url.searchParams.get('variantId');
  const quantity = parseInt(url.searchParams.get('quantity') ?? '1', 10);
  
  // Add the variant to cart
  const result = await cart.addLines([{ merchandiseId: variantId, quantity }]);
  
  // Redirect to checkout
  return redirect(result.cart.checkoutUrl, {
    headers: cart.setCartId(result.cart.id),
  });
}
```

### 3. Cart Price Formatting
Updated the cart component to ensure consistent price formatting:

```tsx
// Format the subtotal consistently - ensuring we always display with 2 decimal places
const subtotalAmount = cart?.cost?.subtotalAmount;
const formattedSubtotalAmount = subtotalAmount ? {
  ...subtotalAmount,
  amount: parseFloat(subtotalAmount.amount).toFixed(2)
} : null;
```

## Usage

The checkout flow now works more intuitively:

1. **Add to Cart → Proceed to Checkout**
   - User adds items to cart
   - User clicks "Proceed to Checkout"
   - User is taken to Shopify checkout with their cart items

2. **Buy Now**
   - User clicks "Buy Now" on a product
   - User is immediately taken to checkout with that specific product

3. **Shop Pay Express Checkout**
   - User clicks ShopPay button
   - User goes through Shop Pay's accelerated checkout process

All pricing remains consistent throughout these flows, with proper decimal formatting. 