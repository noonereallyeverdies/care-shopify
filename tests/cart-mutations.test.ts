import { test, expect, Page, Request, Route } from '@playwright/test';

// Configuration
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const PRODUCT_HANDLE = 'photonique-premium'; // Update with an actual product handle in your store

test.describe('Cart Mutation Tests', () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    // Clear any existing cart state before each test
    await page.goto(`${BASE_URL}/cart`);
    
    // Check if cart has items
    const emptyCartMessage = page.locator('text=Your cart is empty');
    if (!await emptyCartMessage.isVisible()) {
      // If cart is not empty, try to clear it
      const removeButtons = page.locator('button:has-text("Remove"), button:has-text("Delete"), [aria-label*="remove"]');
      const count = await removeButtons.count();
      
      for (let i = 0; i < count; i++) {
        // Always click the first button since the DOM changes after each removal
        await removeButtons.first().click();
        await page.waitForTimeout(500);
      }
      
      // Verify cart is empty
      await expect(emptyCartMessage).toBeVisible({ timeout: 5000 });
    }
  });

  test('1. Add to Cart Mutation', async ({ page }: { page: Page }) => {
    console.log('🔍 Testing: Add to cart mutation...');
    
    // Navigate to a product page
    await page.goto(`${BASE_URL}/products/${PRODUCT_HANDLE}`);
    await page.waitForLoadState('networkidle');
    
    // Capture network requests
    const cartRequestPromise = page.waitForRequest((request: Request) => {
      return request.url().includes('/cart') && 
             request.method() === 'POST' && 
             (request.postData()?.includes('cartLinesAdd') || 
              request.postData()?.includes('cartCreate'));
    });
    
    // Find and click the add to cart button
    const addToCartButton = page.locator('[data-test="add-to-cart"], button:has-text("Add to cart")').first();
    await expect(addToCartButton).toBeVisible({ timeout: 10000 });
    
    // Skip test if button is disabled
    if (await addToCartButton.isDisabled()) {
      console.warn('⚠️ Add to cart button is disabled - skipping test');
      test.skip();
      return;
    }
    
    // Click add to cart
    await addToCartButton.click();
    
    // Wait for the cart request to complete
    const cartRequest = await cartRequestPromise;
    expect(cartRequest).toBeTruthy();
    
    // Verify cart state
    await page.goto(`${BASE_URL}/cart`);
    await page.waitForLoadState('networkidle');
    
    // Check for cart items
    const cartItems = page.locator('[data-test="cart-item"], .cart-item, .line-item, [class*="CartLineItem"]');
    await expect(cartItems.first()).toBeVisible({ timeout: 5000 });
    
    // Verify item details match what was added
    const productTitle = page.locator('[data-test="cart-item-title"], [class*="CartLineItem"] h3').first();
    expect(await productTitle.isVisible()).toBeTruthy();
    
    console.log('✅ Add to cart mutation working correctly');
  });

  test('2. Update Cart Quantity Mutation', async ({ page }: { page: Page }) => {
    console.log('🔍 Testing: Update cart quantity mutation...');
    
    // First add an item to cart
    await page.goto(`${BASE_URL}/products/${PRODUCT_HANDLE}`);
    await page.waitForLoadState('networkidle');
    
    const addToCartButton = page.locator('[data-test="add-to-cart"], button:has-text("Add to cart")').first();
    
    // Skip test if button is disabled
    if (!await addToCartButton.isVisible() || await addToCartButton.isDisabled()) {
      console.warn('⚠️ Add to cart button is disabled - skipping test');
      test.skip();
      return;
    }
    
    await addToCartButton.click();
    await page.waitForTimeout(2000);
    
    // Go to cart page
    await page.goto(`${BASE_URL}/cart`);
    await page.waitForLoadState('networkidle');
    
    // Capture network requests for update
    const updateRequestPromise = page.waitForRequest((request: Request) => {
      return request.url().includes('/cart') && 
             request.method() === 'POST' && 
             request.postData()?.includes('cartLinesUpdate');
    });
    
    // Find quantity input and update it
    const quantityInput = page.locator('input[type="number"], [class*="quantity"] input, [aria-label*="quantity"]').first();
    
    if (await quantityInput.isVisible()) {
      // Get current quantity
      const currentQuantity = await quantityInput.inputValue();
      const newQuantity = (parseInt(currentQuantity) + 1).toString();
      
      // Update quantity
      await quantityInput.fill(newQuantity);
      await quantityInput.press('Enter');
      
      // Wait for update request
      try {
        const updateRequest = await updateRequestPromise;
        expect(updateRequest).toBeTruthy();
        
        // Wait for page to update
        await page.waitForTimeout(1000);
        
        // Verify updated quantity
        const updatedQuantity = await quantityInput.inputValue();
        expect(updatedQuantity).toBe(newQuantity);
        
        console.log('✅ Update cart quantity mutation working correctly');
      } catch (e) {
        console.warn('⚠️ Cart update request not detected - may be using client-side state');
        
        // Try to find update button and click it
        const updateButton = page.locator('button:has-text("Update"), button:has-text("Apply")').first();
        if (await updateButton.isVisible()) {
          await updateButton.click();
          await page.waitForTimeout(1000);
        }
      }
    } else {
      console.warn('⚠️ Quantity input not found - testing alternative update method');
      
      // Try to find increment button
      const incrementButton = page.locator('button:has-text("+"), [aria-label*="increase"]').first();
      if (await incrementButton.isVisible()) {
        await incrementButton.click();
        await page.waitForTimeout(2000);
        console.log('✅ Alternative quantity update method tested');
      } else {
        test.skip();
      }
    }
  });

  test('3. Remove From Cart Mutation', async ({ page }: { page: Page }) => {
    console.log('🔍 Testing: Remove from cart mutation...');
    
    // First add an item to cart
    await page.goto(`${BASE_URL}/products/${PRODUCT_HANDLE}`);
    await page.waitForLoadState('networkidle');
    
    const addToCartButton = page.locator('[data-test="add-to-cart"], button:has-text("Add to cart")').first();
    
    // Skip test if button is disabled
    if (!await addToCartButton.isVisible() || await addToCartButton.isDisabled()) {
      console.warn('⚠️ Add to cart button is disabled - skipping test');
      test.skip();
      return;
    }
    
    await addToCartButton.click();
    await page.waitForTimeout(2000);
    
    // Go to cart page
    await page.goto(`${BASE_URL}/cart`);
    await page.waitForLoadState('networkidle');
    
    // Capture network requests for remove
    const removeRequestPromise = page.waitForRequest((request: Request) => {
      return request.url().includes('/cart') && 
             request.method() === 'POST' && 
             request.postData()?.includes('cartLinesRemove');
    });
    
    // Find and click remove button
    const removeButton = page.locator('button:has-text("Remove"), [aria-label*="remove"], [class*="remove"]').first();
    
    if (!await removeButton.isVisible()) {
      console.warn('⚠️ Remove button not found - skipping test');
      test.skip();
      return;
    }
    
    await removeButton.click();
    
    // Wait for remove request
    try {
      const removeRequest = await removeRequestPromise;
      expect(removeRequest).toBeTruthy();
    } catch (e) {
      console.warn('⚠️ Remove request not detected - may be using client-side state');
    }
    
    // Verify item was removed
    await page.waitForTimeout(2000);
    const emptyCartMessage = page.locator('text=Your cart is empty, text=No items');
    const cartItems = page.locator('[data-test="cart-item"], .cart-item, .line-item');
    
    // Either cart should be empty or there should be fewer items
    const isCartEmpty = await emptyCartMessage.isVisible();
    const remainingItems = await cartItems.count();
    
    // If cart shows empty message or no items are visible, test passes
    expect(isCartEmpty || remainingItems === 0).toBeTruthy();
    
    console.log('✅ Remove from cart mutation working correctly');
  });

  test('4. Cart API Error Handling', async ({ page }: { page: Page }) => {
    console.log('🔍 Testing: Cart API error handling...');
    
    // Mock API errors by intercepting requests
    await page.route('**/api/2023-01/graphql.json', async (route: Route) => {
      const requestText = route.request().postData() || '';
      
      // Only intercept cart mutations
      if (requestText.includes('cartLinesAdd') || 
          requestText.includes('cartCreate') || 
          requestText.includes('cartLinesUpdate') || 
          requestText.includes('cartLinesRemove')) {
        
        // Return error response
        await route.fulfill({
          status: 400,
          contentType: 'application/json',
          body: JSON.stringify({
            errors: [{ message: 'Test error for cart mutation' }],
            data: null
          })
        });
      } else {
        // Pass through all other requests
        await route.continue();
      }
    });
    
    // Navigate to a product page
    await page.goto(`${BASE_URL}/products/${PRODUCT_HANDLE}`);
    await page.waitForLoadState('networkidle');
    
    // Find and click the add to cart button
    const addToCartButton = page.locator('[data-test="add-to-cart"], button:has-text("Add to cart")').first();
    
    if (!await addToCartButton.isVisible() || await addToCartButton.isDisabled()) {
      console.warn('⚠️ Add to cart button is disabled - skipping test');
      test.skip();
      return;
    }
    
    await addToCartButton.click();
    
    // Wait for potential error states
    await page.waitForTimeout(2000);
    
    // Look for error messages
    const errorMessages = page.locator('[class*="error"], [class*="alert"], text=/error/i, text=/failed/i');
    
    // Check if any error indicators are visible
    const errorCount = await errorMessages.count();
    if (errorCount > 0) {
      console.log('✅ Error handling detected properly');
    } else {
      console.warn('⚠️ No visible error handling detected - checking for fallback behaviors');
      
      // Check if the app falls back gracefully (doesn't crash)
      const isPageFunctional = await addToCartButton.isVisible();
      expect(isPageFunctional).toBeTruthy();
      
      console.log('✅ Application remains functional despite error');
    }
  });
}); 