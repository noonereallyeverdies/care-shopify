import { Page, expect } from '@playwright/test';

/**
 * Test utilities and helper functions
 */

export class TestHelpers {
  constructor(private page: Page) {}

  /**
   * Wait for page to be fully loaded with content
   */
  async waitForPageLoad(timeout = 15000) {
    await this.page.waitForLoadState('networkidle', { timeout });
    
    // Ensure basic content is visible
    await expect(this.page.locator('body')).toBeVisible();
    
    // Wait for any loading spinners to disappear
    const loadingElements = this.page.locator('.loading, .spinner, [class*="loading"]');
    if (await loadingElements.count() > 0) {
      await loadingElements.first().waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {
        // Continue if loading elements don't disappear
      });
    }
  }

  /**
   * Clear cart completely
   */
  async clearCart() {
    await this.page.goto('/cart');
    await this.waitForPageLoad();
    
    const emptyCartMessage = this.page.locator('text=Your cart is empty, text=No items');
    
    if (!await emptyCartMessage.isVisible()) {
      const removeButtons = this.page.locator('button:has-text("Remove"), button:has-text("Delete"), [aria-label*="remove"]');
      const count = await removeButtons.count();
      
      for (let i = 0; i < count; i++) {
        await removeButtons.first().click();
        await this.page.waitForTimeout(1000);
      }
    }
  }

  /**
   * Add product to cart
   */
  async addToCart(productHandle: string) {
    await this.page.goto(`/products/${productHandle}`);
    await this.waitForPageLoad();
    
    const addToCartButton = this.page.locator('[data-test="add-to-cart"], button:has-text("Add to cart")').first();
    
    await expect(addToCartButton).toBeVisible({ timeout: 10000 });
    
    if (await addToCartButton.isDisabled()) {
      throw new Error('Add to cart button is disabled');
    }
    
    await addToCartButton.click();
    await this.page.waitForTimeout(2000);
  }

  /**
   * Navigate to checkout
   */
  async goToCheckout() {
    await this.page.goto('/cart');
    await this.waitForPageLoad();
    
    const checkoutButton = this.page.locator('button:has-text("Checkout"), a:has-text("Checkout"), [href*="checkout"]');
    
    if (await checkoutButton.isVisible()) {
      await checkoutButton.click();
      await this.page.waitForTimeout(3000);
    } else {
      throw new Error('Checkout button not found');
    }
  }

  /**
   * Check if element has proper touch target size (mobile)
   */
  async checkTouchTarget(selector: string, minSize = 44) {
    const element = this.page.locator(selector);
    
    if (await element.isVisible()) {
      const box = await element.boundingBox();
      if (box) {
        expect(box.height).toBeGreaterThan(minSize);
        expect(box.width).toBeGreaterThan(minSize);
      }
    }
  }

  /**
   * Monitor network requests for specific patterns
   */
  async monitorNetworkRequests(pattern: RegExp, timeout = 10000): Promise<any[]> {
    const requests: any[] = [];
    
    const requestHandler = (request: any) => {
      if (pattern.test(request.url())) {
        requests.push({
          url: request.url(),
          method: request.method(),
          postData: request.postData(),
          headers: request.headers()
        });
      }
    };
    
    this.page.on('request', requestHandler);
    
    // Wait for requests
    await this.page.waitForTimeout(timeout);
    
    this.page.off('request', requestHandler);
    
    return requests;
  }

  /**
   * Check console errors
   */
  async checkConsoleErrors(): Promise<string[]> {
    const errors: string[] = [];
    
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    return errors;
  }

  /**
   * Measure page performance
   */
  async measurePerformance() {
    const performanceData = await this.page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        timeToFirstByte: navigation.responseStart - navigation.requestStart,
        domInteractive: navigation.domInteractive - navigation.navigationStart,
        totalPageLoadTime: navigation.loadEventEnd - navigation.navigationStart
      };
    });
    
    return performanceData;
  }

  /**
   * Check accessibility basics
   */
  async checkBasicAccessibility() {
    // Check for headings
    const headings = this.page.locator('h1, h2, h3, h4, h5, h6');
    expect(await headings.count()).toBeGreaterThan(0);
    
    // Check images have alt text
    const images = this.page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      for (let i = 0; i < Math.min(imageCount, 3); i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        const isDecorative = await img.getAttribute('aria-hidden');
        
        expect(alt !== null || isDecorative === 'true').toBe(true);
      }
    }
    
    // Check for form labels
    const inputs = this.page.locator('input[type="email"], input[type="text"]');
    const inputCount = await inputs.count();
    
    if (inputCount > 0) {
      for (let i = 0; i < Math.min(inputCount, 3); i++) {
        const input = inputs.nth(i);
        const id = await input.getAttribute('id');
        const ariaLabel = await input.getAttribute('aria-label');
        const placeholder = await input.getAttribute('placeholder');
        
        if (id) {
          const label = this.page.locator(`label[for="${id}"]`);
          const hasLabel = await label.isVisible();
          expect(hasLabel || ariaLabel || placeholder).toBe(true);
        } else {
          expect(ariaLabel || placeholder).toBeTruthy();
        }
      }
    }
  }

  /**
   * Simulate slow network conditions
   */
  async simulateSlowNetwork() {
    const context = this.page.context();
    await context.route('**/*', async route => {
      // Add delay to simulate slow network
      await new Promise(resolve => setTimeout(resolve, 1000));
      await route.continue();
    });
  }

  /**
   * Take full page screenshot
   */
  async takeFullPageScreenshot(name: string) {
    await this.page.screenshot({
      path: `test-results/screenshots/${name}-${Date.now()}.png`,
      fullPage: true
    });
  }

  /**
   * Verify SEO basics
   */
  async verifySEOBasics() {
    // Check title
    const title = await this.page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(10);
    expect(title.length).toBeLessThan(60);
    
    // Check meta description
    const metaDescription = await this.page.getAttribute('meta[name="description"]', 'content');
    if (metaDescription) {
      expect(metaDescription.length).toBeGreaterThan(50);
      expect(metaDescription.length).toBeLessThan(160);
    }
    
    // Check h1 tag
    const h1 = this.page.locator('h1');
    expect(await h1.count()).toBeGreaterThan(0);
    
    return {
      title,
      metaDescription,
      hasH1: await h1.count() > 0
    };
  }
}

/**
 * Test data constants
 */
export const TEST_DATA = {
  PRODUCT_HANDLES: {
    MAIN: 'photonique-premium',
    ALTERNATIVE: 'photonique-touch'
  },
  TEST_EMAIL: 'test@example.com',
  TEST_PHONE: '+1234567890',
  INVALID_PRODUCT: 'non-existent-product-12345'
};

/**
 * Common assertions
 */
export const CommonAssertions = {
  async expectVisible(page: Page, selector: string, timeout = 5000) {
    await expect(page.locator(selector)).toBeVisible({ timeout });
  },
  
  async expectNotVisible(page: Page, selector: string, timeout = 5000) {
    await expect(page.locator(selector)).not.toBeVisible({ timeout });
  },
  
  async expectContainsText(page: Page, selector: string, text: string) {
    await expect(page.locator(selector)).toContainText(text);
  },
  
  async expectPageURL(page: Page, urlPattern: string | RegExp) {
    await expect(page).toHaveURL(urlPattern);
  }
};

/**
 * Mobile viewport sizes for testing
 */
export const VIEWPORTS = {
  MOBILE_PORTRAIT: { width: 375, height: 667 },
  MOBILE_LANDSCAPE: { width: 667, height: 375 },
  TABLET_PORTRAIT: { width: 768, height: 1024 },
  TABLET_LANDSCAPE: { width: 1024, height: 768 },
  DESKTOP_SMALL: { width: 1280, height: 720 },
  DESKTOP_LARGE: { width: 1920, height: 1080 }
};
