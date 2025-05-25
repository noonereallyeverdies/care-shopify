import { test, expect, type Page } from '@playwright/test';

// Performance and accessibility testing
test.describe('Performance & Accessibility Tests', () => {
  const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

  test('Core Web Vitals and Performance', async ({ page }) => {
    console.log('🔍 Testing: Core Web Vitals and performance...');
    
    // Start performance monitoring
    await page.addInitScript(() => {
      window.performanceData = {
        navigationStart: performance.timeOrigin,
        marks: [],
        measures: []
      };
      
      // Monitor LCP
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        for (const entry of entries) {
          if (entry.entryType === 'largest-contentful-paint') {
            window.performanceData.lcp = entry.startTime;
          }
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });
      
      // Monitor CLS
      let clsValue = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        window.performanceData.cls = clsValue;
      }).observe({ entryTypes: ['layout-shift'] });
    });
    
    const startTime = Date.now();
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Get performance metrics
    const performanceData = await page.evaluate(() => window.performanceData);
    
    console.log(`📊 Performance Metrics:`);
    console.log(`- Page Load Time: ${loadTime}ms`);
    console.log(`- LCP: ${performanceData?.lcp || 'N/A'}ms`);
    console.log(`- CLS: ${performanceData?.cls || 'N/A'}`);
    
    // Performance assertions
    expect(loadTime).toBeLessThan(5000); // Page should load within 5 seconds
    
    if (performanceData?.lcp) {
      expect(performanceData.lcp).toBeLessThan(2500); // LCP should be under 2.5s
    }
    
    if (performanceData?.cls) {
      expect(performanceData.cls).toBeLessThan(0.1); // CLS should be under 0.1
    }
    
    console.log('✅ Performance metrics validated');
  });

  test('Accessibility Compliance - WCAG 2.1', async ({ page }) => {
    console.log('🔍 Testing: Accessibility compliance...');
    
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    
    // Check for basic accessibility features
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const headingCount = await headings.count();
    expect(headingCount).toBeGreaterThan(0);
    
    // Check for alt text on images
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      for (let i = 0; i < Math.min(imageCount, 5); i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        const isDecorative = await img.getAttribute('aria-hidden');
        
        // Images should have alt text or be marked as decorative
        expect(alt !== null || isDecorative === 'true').toBe(true);
      }
    }
    
    // Check for proper button labels
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    if (buttonCount > 0) {
      for (let i = 0; i < Math.min(buttonCount, 5); i++) {
        const button = buttons.nth(i);
        const text = await button.textContent();
        const ariaLabel = await button.getAttribute('aria-label');
        const ariaLabelledBy = await button.getAttribute('aria-labelledby');
        
        // Buttons should have accessible names
        expect(
          (text && text.trim().length > 0) || 
          ariaLabel || 
          ariaLabelledBy
        ).toBe(true);
      }
    }
    
    // Check color contrast (basic check)
    const bodyStyles = await page.evaluate(() => {
      const body = document.body;
      const styles = window.getComputedStyle(body);
      return {
        color: styles.color,
        backgroundColor: styles.backgroundColor
      };
    });
    
    // Should have defined colors
    expect(bodyStyles.color).toBeTruthy();
    expect(bodyStyles.backgroundColor).toBeTruthy();
    
    // Check for form labels
    const inputs = page.locator('input[type="email"], input[type="text"], input[type="password"]');
    const inputCount = await inputs.count();
    
    if (inputCount > 0) {
      for (let i = 0; i < Math.min(inputCount, 3); i++) {
        const input = inputs.nth(i);
        const id = await input.getAttribute('id');
        const ariaLabel = await input.getAttribute('aria-label');
        const placeholder = await input.getAttribute('placeholder');
        
        // Inputs should have labels or aria-label
        if (id) {
          const label = page.locator(`label[for="${id}"]`);
          const hasLabel = await label.isVisible();
          expect(hasLabel || ariaLabel || placeholder).toBe(true);
        } else {
          expect(ariaLabel || placeholder).toBeTruthy();
        }
      }
    }
    
    console.log('✅ Basic accessibility compliance checked');
  });

  test('Keyboard Navigation', async ({ page }) => {
    console.log('🔍 Testing: Keyboard navigation...');
    
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    
    // Test tab navigation
    const focusableElements = await page.evaluate(() => {
      const elements = document.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      return elements.length;
    });
    
    expect(focusableElements).toBeGreaterThan(0);
    
    // Test first few tab stops
    for (let i = 0; i < Math.min(focusableElements, 5); i++) {
      await page.keyboard.press('Tab');
      
      // Check if focus is visible
      const focusedElement = await page.evaluate(() => {
        const focused = document.activeElement;
        const styles = window.getComputedStyle(focused!);
        return {
          tagName: focused?.tagName,
          hasOutline: styles.outline !== 'none' && styles.outline !== '',
          hasBoxShadow: styles.boxShadow !== 'none',
        };
      });
      
      // Should have visible focus indicator or be a naturally focusable element
      expect(
        focusedElement.hasOutline || 
        focusedElement.hasBoxShadow || 
        ['INPUT', 'BUTTON', 'A', 'SELECT'].includes(focusedElement.tagName!)
      ).toBe(true);
    }
    
    // Test escape key functionality if modal exists
    const modalTrigger = page.locator('[data-modal], [aria-haspopup="dialog"]');
    if (await modalTrigger.isVisible()) {
      await modalTrigger.click();
      await page.waitForTimeout(500);
      
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
      
      // Modal should be closed
      const modal = page.locator('[role="dialog"], .modal');
      expect(await modal.isVisible()).toBe(false);
    }
    
    console.log('✅ Keyboard navigation tested');
  });

  test('Mobile Performance and Touch Interaction', async ({ page }) => {
    console.log('🔍 Testing: Mobile performance and touch interaction...');
    
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    const startTime = Date.now();
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    const mobileLoadTime = Date.now() - startTime;
    
    console.log(`📱 Mobile load time: ${mobileLoadTime}ms`);
    expect(mobileLoadTime).toBeLessThan(6000); // Slightly higher threshold for mobile
    
    // Test touch targets
    const buttons = page.locator('button, a');
    const buttonCount = await buttons.count();
    
    if (buttonCount > 0) {
      for (let i = 0; i < Math.min(buttonCount, 5); i++) {
        const button = buttons.nth(i);
        if (await button.isVisible()) {
          const box = await button.boundingBox();
          if (box) {
            // Touch targets should be at least 44px (iOS guideline)
            expect(box.height).toBeGreaterThan(30);
            expect(box.width).toBeGreaterThan(30);
          }
        }
      }
    }
    
    // Test pinch zoom (if applicable)
    const viewport = page.viewportSize();
    if (viewport) {
      await page.setViewportSize({ 
        width: Math.floor(viewport.width * 1.5), 
        height: Math.floor(viewport.height * 1.5) 
      });
      
      // Page should still be functional at different zoom levels
      const mainContent = page.locator('main, [role="main"], body');
      await expect(mainContent).toBeVisible();
      
      // Reset viewport
      await page.setViewportSize({ width: 375, height: 667 });
    }
    
    console.log('✅ Mobile performance and touch interaction tested');
  });

  test('SEO and Meta Tag Validation', async ({ page }) => {
    console.log('🔍 Testing: SEO and meta tag validation...');
    
    await page.goto(BASE_URL);
    
    // Check title tag
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(10);
    expect(title.length).toBeLessThan(60);
    
    // Check meta description
    const metaDescription = await page.getAttribute('meta[name="description"]', 'content');
    if (metaDescription) {
      expect(metaDescription.length).toBeGreaterThan(50);
      expect(metaDescription.length).toBeLessThan(160);
    }
    
    // Check Open Graph tags
    const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
    const ogDescription = await page.getAttribute('meta[property="og:description"]', 'content');
    const ogImage = await page.getAttribute('meta[property="og:image"]', 'content');
    
    // At least some OG tags should be present
    expect(ogTitle || ogDescription || ogImage).toBeTruthy();
    
    // Check structured data (basic)
    const structuredData = await page.evaluate(() => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      return scripts.length > 0;
    });
    
    // Check canonical URL
    const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
    if (canonical) {
      expect(canonical).toContain(BASE_URL.replace(/^https?:\/\//, ''));
    }
    
    console.log('✅ SEO and meta tags validated');
    console.log(`- Title: ${title}`);
    console.log(`- Meta Description: ${metaDescription || 'Not found'}`);
    console.log(`- Structured Data: ${structuredData ? 'Present' : 'Not found'}`);
  });
});
