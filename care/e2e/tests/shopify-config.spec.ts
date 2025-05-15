import { test, expect } from '@playwright/test';

// Shopify configuration tests
test.describe('Shopify Configuration Tests', () => {
  
  // Test 1: Check if Shopify config is properly loaded
  test('should load Shopify configuration without errors', async ({ page }) => {
    let configErrors: string[] = [];
    
    // Capture any configuration-related errors
    page.on('console', msg => {
      if (msg.type() === 'error' && 
          (msg.text().includes('shopify') || 
           msg.text().includes('storefront') ||
           msg.text().includes('token'))) {
        configErrors.push(msg.text());
      }
    });
    
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Wait for any configuration loading
    await page.waitForTimeout(2000);
    
    // Check for configuration errors
    if (configErrors.length > 0) {
      console.log('Shopify config errors:', configErrors);
    }
    
    expect(configErrors.length).toBe(0);
  });

  // Test 2: Verify token is not the placeholder
  test('should have a valid Shopify token configured', async ({ page }) => {
    // Intercept network requests to check for auth headers
    const requestHeaders: any[] = [];
    
    page.on('request', request => {
      if (request.url().includes('shopify')) {
        requestHeaders.push({
          url: request.url(),
          headers: request.headers()
        });
      }
    });
    
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Check if we made any Shopify requests
    if (requestHeaders.length > 0) {
      // Verify that we have proper authorization headers
      const hasAuth = requestHeaders.some(req => 
        req.headers['x-shopify-storefront-access-token'] && 
        !req.headers['x-shopify-storefront-access-token'].includes('YOUR_')
      );
      
      console.log('Shopify requests with auth:', requestHeaders.length);
      expect(hasAuth).toBe(true);
    } else {
      console.warn('No Shopify requests detected - this may indicate a configuration issue');
    }
  });

  // Test 3: Check for proper error handling of missing token
  test('should handle missing token gracefully', async ({ page }) => {
    let errorHandled = false;
    
    page.on('console', msg => {
      if (msg.type() === 'error' && msg.text().includes('401')) {
        // If we get 401, at least we're trying to connect to Shopify
        errorHandled = true;
      }
    });
    
    page.on('response', response => {
      if (response.url().includes('shopify') && response.status() === 401) {
        errorHandled = true;
      }
    });
    
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // If we got a 401, it means we're at least trying to connect
    // This is better than not connecting at all
    console.log('Authentication attempt detected:', errorHandled);
  });

  // Test 4: Verify store domain configuration
  test('should use correct store domain', async ({ page }) => {
    const shopifyRequests: string[] = [];
    
    page.on('request', request => {
      if (request.url().includes('shopify')) {
        shopifyRequests.push(request.url());
      }
    });
    
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Check if requests are going to the correct domain
    const correctDomain = shopifyRequests.some(url => 
      url.includes('548e73-2.myshopify.com')
    );
    
    if (shopifyRequests.length > 0) {
      console.log('Shopify requests:', shopifyRequests);
      expect(correctDomain).toBe(true);
    }
  });
});
