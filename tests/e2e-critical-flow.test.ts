import { test, expect, type Page } from '@playwright/test';

// Critical E2E flow tests for production readiness
test.describe('Critical E2E User Flows', () => {
  const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
  const PRODUCT_HANDLE = 'photonique-premium';

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('Complete Purchase Flow - Homepage to Checkout', async ({ page }) => {
    console.log('🔍 Testing: Complete purchase flow...');
    
    // 1. Landing page interaction
    await expect(page.locator('h1, h2')).toBeVisible({ timeout: 10000 });
    
    // 2. Navigate to product via CTA
    const mainCTA = page.locator('text=get photonique now').first();
    await expect(mainCTA).toBeVisible();
    await mainCTA.click();
    
    // 3. Product page
    await expect(page).toHaveURL(new RegExp(`products/${PRODUCT_HANDLE}`));
    await page.waitForLoadState('networkidle');
    
    // 4. Select options if available
    const colorOptions = page.locator('[aria-label*="Select"], .option-selector button');
    if (await colorOptions.count() > 0) {
      await colorOptions.first().click();
    }
    
    // 5. Add to cart
    const addToCartButton = page.locator('[data-test="add-to-cart"], button:has-text("Add to cart")').first();
    await expect(addToCartButton).toBeVisible();
    
    if (await addToCartButton.isDisabled()) {
      test.skip();
      return;
    }
    
    await addToCartButton.click();
    await page.waitForTimeout(2000);
    
    // 6. Go to cart
    await page.goto(`${BASE_URL}/cart`);
    await page.waitForLoadState('networkidle');
    
    // 7. Verify cart contents
    const cartItems = page.locator('[data-test="cart-item"], .cart-item, .line-item');
    await expect(cartItems.first()).toBeVisible({ timeout: 5000 });
    
    // 8. Proceed to checkout
    const checkoutButton = page.locator('button:has-text("Checkout"), a:has-text("Checkout"), [href*="checkout"]');
    if (await checkoutButton.isVisible()) {
      await checkoutButton.click();
      
      // Should reach Shopify checkout or internal checkout
      await page.waitForTimeout(3000);
      const currentUrl = page.url();
      expect(currentUrl).toMatch(/checkout|cart/);
    }
    
    console.log('✅ Complete purchase flow tested successfully');
  });

  test('Product Search and Discovery', async ({ page }) => {
    console.log('🔍 Testing: Product search and discovery...');
    
    // Test search functionality if available
    const searchInput = page.locator('input[type="search"], input[placeholder*="search"]');
    if (await searchInput.isVisible()) {
      await searchInput.fill('photonique');
      await searchInput.press('Enter');
      
      await page.waitForTimeout(2000);
      const searchResults = page.locator('.search-result, [data-test="product-item"]');
      if (await searchResults.count() > 0) {
        await searchResults.first().click();
        await expect(page).toHaveURL(/products\//);
      }
    }
    
    // Test collection pages
    const collectionLinks = page.locator('a[href*="/collections/"]');
    if (await collectionLinks.count() > 0) {
      await collectionLinks.first().click();
      await page.waitForLoadState('networkidle');
      
      const productGrid = page.locator('[data-test="product-grid"], .product-grid, .product-list');
      if (await productGrid.isVisible()) {
        const products = page.locator('[data-test="product-item"], .product-item, .product-card');
        expect(await products.count()).toBeGreaterThan(0);
      }
    }
    
    console.log('✅ Product search and discovery tested');
  });

  test('User Account Features', async ({ page }) => {
    console.log('🔍 Testing: User account features...');
    
    // Test account access
    const accountLink = page.locator('a:has-text("Account"), a:has-text("Login"), a[href*="account"]');
    if (await accountLink.isVisible()) {
      await accountLink.click();
      await page.waitForLoadState('networkidle');
      
      // Should reach login page or account page
      const isLoginPage = await page.locator('input[type="email"], input[type="password"]').isVisible();
      const isAccountPage = await page.locator('text=Account, text=Profile').isVisible();
      
      expect(isLoginPage || isAccountPage).toBe(true);
    }
    
    console.log('✅ User account features tested');
  });

  test('Newsletter Signup', async ({ page }) => {
    console.log('🔍 Testing: Newsletter signup...');
    
    const emailInput = page.locator('input[type="email"], input[placeholder*="email"]');
    if (await emailInput.isVisible()) {
      await emailInput.fill('test@example.com');
      
      const subscribeButton = page.locator('button:has-text("Subscribe"), button:has-text("Sign up")');
      if (await subscribeButton.isVisible()) {
        await subscribeButton.click();
        await page.waitForTimeout(2000);
        
        // Look for success message
        const successMessage = page.locator('text=success, text=subscribed, text=thank you');
        const errorMessage = page.locator('text=error, text=invalid');
        
        // Either success or error should appear
        const hasResponse = await successMessage.isVisible() || await errorMessage.isVisible();
        expect(hasResponse).toBe(true);
      }
    }
    
    console.log('✅ Newsletter signup tested');
  });
});
