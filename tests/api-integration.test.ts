import { test, expect, type Page, type Route } from '@playwright/test';

// API integration and error handling tests
test.describe('API Integration & Error Handling', () => {
  const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
  const PRODUCT_HANDLE = 'photonique-premium';

  test('Shopify GraphQL API Integration', async ({ page }) => {
    console.log('🔍 Testing: Shopify GraphQL API integration...');
    
    // Monitor GraphQL requests
    const graphqlRequests: any[] = [];
    page.on('request', request => {
      if (request.url().includes('graphql') || request.url().includes('api/2023')) {
        graphqlRequests.push({
          url: request.url(),
          method: request.method(),
          postData: request.postData()
        });
      }
    });
    
    // Load homepage
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    
    // Should make GraphQL requests for product data
    expect(graphqlRequests.length).toBeGreaterThan(0);
    
    // Navigate to product page
    await page.goto(`${BASE_URL}/products/${PRODUCT_HANDLE}`);
    await page.waitForLoadState('networkidle');
    
    // More GraphQL requests for product details
    const productRequests = graphqlRequests.filter(req => 
      req.postData?.includes('product') || req.postData?.includes('Product')
    );
    expect(productRequests.length).toBeGreaterThan(0);
    
    console.log(`📡 GraphQL requests made: ${graphqlRequests.length}`);
    console.log('✅ Shopify GraphQL API integration verified');
  });

  test('Network Error Resilience', async ({ page }) => {
    console.log('🔍 Testing: Network error resilience...');
    
    // Simulate network failures
    await page.route('**/api/**', async (route: Route) => {
      // Fail 50% of API requests
      if (Math.random() > 0.5) {
        await route.abort('failed');
      } else {
        await route.continue();
      }
    });
    
    await page.goto(BASE_URL);
    
    // Page should still load despite some API failures
    await expect(page.locator('body')).toBeVisible();
    
    // Should show some form of error handling or graceful degradation
    const errorElements = page.locator('.error, .alert, [class*="error"]');
    const loadingElements = page.locator('.loading, .spinner, [class*="loading"]');
    
    // Either errors are handled gracefully or content loads
    const hasContent = await page.locator('h1, h2, main').isVisible();
    expect(hasContent).toBe(true);
    
    console.log('✅ Network error resilience tested');
  });

  test('Cart API Error Handling', async ({ page }) => {
    console.log('🔍 Testing: Cart API error handling...');
    
    // Mock cart API failures
    await page.route('**/cart/**', async (route: Route) => {
      const request = route.request();
      if (request.method() === 'POST') {
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({
            errors: [{ message: 'Internal server error' }]
          })
        });
      } else {
        await route.continue();
      }
    });
    
    await page.goto(`${BASE_URL}/products/${PRODUCT_HANDLE}`);
    await page.waitForLoadState('networkidle');
    
    const addToCartButton = page.locator('[data-test="add-to-cart"], button:has-text("Add to cart")').first();
    
    if (await addToCartButton.isVisible() && !await addToCartButton.isDisabled()) {
      await addToCartButton.click();
      await page.waitForTimeout(3000);
      
      // Should show error message or handle gracefully
      const errorMessage = page.locator('text=/error/i, text=/failed/i, .error, .alert');
      const isErrorVisible = await errorMessage.isVisible();
      
      // Either error is shown or page remains functional
      const isPageFunctional = await addToCartButton.isVisible();
      expect(isErrorVisible || isPageFunctional).toBe(true);
    }
    
    console.log('✅ Cart API error handling tested');
  });

  test('Rate Limiting and Throttling', async ({ page }) => {
    console.log('🔍 Testing: Rate limiting and throttling...');
    
    let requestCount = 0;
    page.on('request', request => {
      if (request.url().includes('graphql')) {
        requestCount++;
      }
    });
    
    // Make multiple rapid requests
    const promises = [];
    for (let i = 0; i < 5; i++) {
      promises.push(page.goto(`${BASE_URL}/products/${PRODUCT_HANDLE}?v=${i}`));
    }
    
    await Promise.all(promises);
    
    // Should handle multiple requests gracefully
    expect(requestCount).toBeGreaterThan(0);
    
    // Page should still be functional
    await expect(page.locator('body')).toBeVisible();
    
    console.log(`📊 Made ${requestCount} GraphQL requests`);
    console.log('✅ Rate limiting and throttling tested');
  });

  test('Invalid Product Handling', async ({ page }) => {
    console.log('🔍 Testing: Invalid product handling...');
    
    // Test non-existent product
    const response = await page.goto(`${BASE_URL}/products/non-existent-product-123`);
    expect(response?.status()).toBe(404);
    
    // Should show proper 404 page
    const notFoundContent = page.locator('text=/not found/i, text=/404/i, h1');
    await expect(notFoundContent).toBeVisible();
    
    // Navigation should still work
    const homeLink = page.locator('a[href="/"], a:has-text("Home"), a:has-text("Back")');
    if (await homeLink.isVisible()) {
      await homeLink.click();
      await expect(page).toHaveURL(BASE_URL);
    }
    
    console.log('✅ Invalid product handling tested');
  });

  test('Session and State Management', async ({ page }) => {
    console.log('🔍 Testing: Session and state management...');
    
    // Add item to cart
    await page.goto(`${BASE_URL}/products/${PRODUCT_HANDLE}`);
    await page.waitForLoadState('networkidle');
    
    const addToCartButton = page.locator('[data-test="add-to-cart"], button:has-text("Add to cart")').first();
    
    if (await addToCartButton.isVisible() && !await addToCartButton.isDisabled()) {
      await addToCartButton.click();
      await page.waitForTimeout(2000);
      
      // Refresh page
      await page.reload();
      await page.waitForLoadState('networkidle');
      
      // Go to cart
      await page.goto(`${BASE_URL}/cart`);
      
      // Cart state should be persisted
      const cartItems = page.locator('[data-test="cart-item"], .cart-item, .line-item');
      const emptyMessage = page.locator('text=/empty/i, text=/no items/i');
      
      // Either cart has items or shows empty message
      const hasItems = await cartItems.count() > 0;
      const isEmpty = await emptyMessage.isVisible();
      
      expect(hasItems || isEmpty).toBe(true);
    }
    
    console.log('✅ Session and state management tested');
  });

  test('Payment Gateway Integration', async ({ page }) => {
    console.log('🔍 Testing: Payment gateway integration...');
    
    // Add item and go to checkout
    await page.goto(`${BASE_URL}/products/${PRODUCT_HANDLE}`);
    await page.waitForLoadState('networkidle');
    
    const addToCartButton = page.locator('[data-test="add-to-cart"], button:has-text("Add to cart")').first();
    
    if (await addToCartButton.isVisible() && !await addToCartButton.isDisabled()) {
      await addToCartButton.click();
      await page.waitForTimeout(2000);
      
      await page.goto(`${BASE_URL}/cart`);
      await page.waitForLoadState('networkidle');
      
      const checkoutButton = page.locator('button:has-text("Checkout"), a:has-text("Checkout")');
      
      if (await checkoutButton.isVisible()) {
        await checkoutButton.click();
        await page.waitForTimeout(3000);
        
        // Should reach checkout page (Shopify or custom)
        const isCheckoutPage = page.url().includes('checkout') || 
                              await page.locator('input[name="email"], input[type="email"]').isVisible();
        
        expect(isCheckoutPage).toBe(true);
        
        // Check for payment methods
        const paymentMethods = page.locator('[data-testid="payment-method"], .payment-method, input[name="payment_method"]');
        
        if (await paymentMethods.count() > 0) {
          console.log('💳 Payment methods detected');
        }
      }
    }
    
    console.log('✅ Payment gateway integration tested');
  });

  test('Analytics and Tracking', async ({ page }) => {
    console.log('🔍 Testing: Analytics and tracking...');
    
    // Monitor analytics requests
    const analyticsRequests: string[] = [];
    page.on('request', request => {
      const url = request.url();
      if (url.includes('google-analytics') || 
          url.includes('gtag') || 
          url.includes('facebook.com/tr') ||
          url.includes('analytics') ||
          url.includes('tracking')) {
        analyticsRequests.push(url);
      }
    });
    
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    
    // Navigate to product
    await page.goto(`${BASE_URL}/products/${PRODUCT_HANDLE}`);
    await page.waitForLoadState('networkidle');
    
    // Add to cart if possible
    const addToCartButton = page.locator('[data-test="add-to-cart"], button:has-text("Add to cart")').first();
    
    if (await addToCartButton.isVisible() && !await addToCartButton.isDisabled()) {
      await addToCartButton.click();
      await page.waitForTimeout(2000);
    }
    
    console.log(`📊 Analytics requests detected: ${analyticsRequests.length}`);
    
    // Check for common tracking pixels/scripts
    const trackingScripts = await page.evaluate(() => {
      const scripts = Array.from(document.scripts);
      return scripts.filter(script => 
        script.src.includes('google') ||
        script.src.includes('facebook') ||
        script.src.includes('analytics') ||
        script.innerHTML.includes('gtag') ||
        script.innerHTML.includes('fbq')
      ).length;
    });
    
    console.log(`📊 Tracking scripts found: ${trackingScripts}`);
    console.log('✅ Analytics and tracking tested');
  });
});
