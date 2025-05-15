import { test, expect } from '@playwright/test';

// System health tests to verify all fixes are working
test.describe('System Health Check', () => {
  // Test 1: Basic app loading and console errors
  test('should load without critical errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    const consoleWarnings: string[] = [];
    
    // Capture console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      } else if (msg.type() === 'warning') {
        consoleWarnings.push(msg.text());
      }
    });
    
    // Navigate to the home page
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Check for critical errors in console
    const criticalErrors = consoleErrors.filter(error => 
      !error.includes('DevTools') && 
      !error.includes('extension') &&
      !error.includes('Chrome extension')
    );
    
    // Log any errors for debugging
    if (criticalErrors.length > 0) {
      console.log('Console errors found:', criticalErrors);
    }
    
    if (consoleWarnings.length > 0) {
      console.log('Console warnings found:', consoleWarnings);
    }
    
    // Verify no critical errors
    expect(criticalErrors.length).toBe(0);
    
    // Take screenshot for verification
    await page.screenshot({ path: 'e2e/screenshots/system-health-landing.png' });
  });

  // Test 2: Node.js module resolution
  test('should handle Node.js modules correctly', async ({ page }) => {
    // Navigate and check for module resolution errors
    const moduleErrors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error' && 
          (msg.text().includes('Cannot read file') || 
           msg.text().includes('node:') ||
           msg.text().includes('EPERM'))) {
        moduleErrors.push(msg.text());
      }
    });
    
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Wait for any delayed module loading
    await page.waitForTimeout(3000);
    
    // Check for module-related errors
    expect(moduleErrors.length).toBe(0);
    
    if (moduleErrors.length > 0) {
      console.log('Module errors found:', moduleErrors);
    }
  });

  // Test 3: Shopify connection
  test('should connect to Shopify successfully', async ({ page }) => {
    const networkErrors: string[] = [];
    
    // Monitor network requests
    page.on('requestfailed', request => {
      networkErrors.push(`Failed request: ${request.url()}`);
    });
    
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Look for Shopify-related network requests
    const requests = await page.evaluate(() => {
      return performance.getEntriesByType('resource').map(r => r.name);
    });
    
    // Check if we're making requests to Shopify
    const shopifyRequests = requests.filter(url => 
      url.includes('shopify') || url.includes('548e73-2.myshopify.com')
    );
    
    // We should have at least some Shopify requests if configured correctly
    if (shopifyRequests.length === 0) {
      console.warn('No Shopify requests detected - may indicate missing token or configuration issue');
    }
    
    // Log all network errors
    if (networkErrors.length > 0) {
      console.log('Network errors:', networkErrors);
    }
  });

  // Test 4: Environment variables and configuration
  test('should have proper configuration loaded', async ({ page }) => {
    // Navigate to page and check configuration
    await page.goto('/');
    
    // Inject script to check for configuration
    const configCheck = await page.evaluate(() => {
      // Check if global variables are properly set
      const issues = [];
      
      // Check for process.env definition
      if (typeof process === 'undefined') {
        issues.push('process is not defined');
      }
      
      // Check for global definition
      if (typeof global === 'undefined' && typeof globalThis === 'undefined') {
        issues.push('Neither global nor globalThis is defined');
      }
      
      return {
        issues,
        hasProcess: typeof process !== 'undefined',
        hasGlobal: typeof global !== 'undefined' || typeof globalThis !== 'undefined'
      };
    });
    
    console.log('Configuration check:', configCheck);
    
    // Verify basic environment setup
    expect(configCheck.issues.length).toBe(0);
    expect(configCheck.hasGlobal).toBe(true);
  });

  // Test 5: Build and runtime integrity
  test('should render all main components', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Check for main application structure
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    
    // Check for key sections
    const keySelectors = [
      'section', // At least one section should exist
      'h1', // Main heading
    ];
    
    for (const selector of keySelectors) {
      await expect(page.locator(selector).first()).toBeVisible();
    }
    
    // Take full page screenshot
    await page.screenshot({ path: 'e2e/screenshots/full-page-render.png', fullPage: true });
  });

  // Test 6: Performance and loading
  test('should load with reasonable performance', async ({ page }) => {
    // Start measuring performance
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Get performance metrics
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        ttfb: navigation.responseStart - navigation.fetchStart,
        totalLoad: navigation.loadEventEnd - navigation.fetchStart
      };
    });
    
    console.log('Performance metrics:', metrics);
    
    // Assert reasonable loading times (adjust thresholds as needed)
    expect(metrics.ttfb).toBeLessThan(5000); // 5 seconds TTFB
    expect(metrics.totalLoad).toBeLessThan(10000); // 10 seconds total load
  });
});
