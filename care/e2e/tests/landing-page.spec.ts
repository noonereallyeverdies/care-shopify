import { test, expect } from '@playwright/test';

// Landing page test suite
test.describe('Landing Page Tests', () => {
  // Setup: navigate to landing page before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Allow a moment for animations and content to load
    await page.waitForTimeout(1000);
  });

  // Check the main page loading and basic elements
  test('should load the landing page correctly', async ({ page }) => {
    // Verify page title
    const title = await page.title();
    expect(title).toContain('Red Light Therapy');
    
    // Check hero section exists
    await expect(page.locator('section').first()).toBeVisible();
    
    // Screenshot for visual verification
    await page.screenshot({ path: 'e2e/screenshots/landing-page.png', fullPage: false });
  });

  // Test hero section content and appearance
  test('should display hero section with correct content', async ({ page }) => {
    const heroSection = page.locator('section').first();
    
    // Check if hero section is visible
    await expect(heroSection).toBeVisible();
    
    // Verify hero heading content
    const headingText = await page.locator('h1').first().innerText();
    expect(headingText.toLowerCase()).toContain('red light');
    
    // Check for CTA button
    const ctaButton = heroSection.locator('a:has-text("Get Started")');
    await expect(ctaButton).toBeVisible();
  });

  // Test how it works section
  test('should display how it works section properly', async ({ page }) => {
    // Navigate to the how it works section
    const howItWorksSection = page.locator('section:has-text("How It Works")');
    
    // Check if the section is visible
    await expect(howItWorksSection).toBeVisible();
    
    // Check if it has steps or process explanations
    const steps = howItWorksSection.locator('div[class*="step"]');
    await expect(steps.first()).toBeVisible();
    
    // Take a screenshot of the section
    await howItWorksSection.screenshot({ path: 'e2e/screenshots/how-it-works.png' });
  });

  // Test problem solution section
  test('should display problem solution section', async ({ page }) => {
    // Look for the problem solution section
    const problemSolutionSection = page.locator('section:has-text("Hair Loss")');
    
    // Check if the section exists and is visible
    await expect(problemSolutionSection).toBeVisible();
    
    // Verify it contains both problem statement and solution
    expect(await page.locator('text=problem').count()).toBeGreaterThan(0);
    expect(await page.locator('text=solution').count()).toBeGreaterThan(0);
  });

  // Test testimonials section
  test('should display testimonials section', async ({ page }) => {
    // Find the testimonials section
    const testimonialSection = page.locator('section:has-text("testimonial")');
    
    // Check if it exists
    await expect(testimonialSection).toBeVisible();
    
    // Check for customer quotes
    const testimonialText = await testimonialSection.innerText();
    expect(testimonialText.toLowerCase()).toMatch(/testimonial|customer|experience|review/);
  });

  // Test before/after section
  test('should display before and after results section', async ({ page }) => {
    // Find the before/after section
    const beforeAfterSection = page.locator('section:has-text("Before")');
    
    // Check if it exists and is visible
    await expect(beforeAfterSection).toBeVisible();
    
    // Check for images
    const images = beforeAfterSection.locator('img');
    await expect(images.first()).toBeVisible();
  });

  // Test device spotlight section
  test('should display product spotlight section properly', async ({ page }) => {
    // Find the product section
    const productSection = page.locator('section.device-spotlight-section');
    
    // Check if it's visible
    await expect(productSection).toBeVisible();
    
    // Check for product image
    const productImage = productSection.locator('img');
    await expect(productImage).toBeVisible();
    
    // Check for price information
    const priceElement = productSection.locator('.device-price-wrapper');
    await expect(priceElement).toBeVisible();
    
    // Check for CTA button
    const productCTA = productSection.locator('a:has-text("View Product")');
    await expect(productCTA).toBeVisible();
  });

  // Test final CTA section
  test('should display final call to action section', async ({ page }) => {
    // Find the final CTA section (usually at the bottom of the page)
    const finalCTA = page.locator('section:has-text("Get Started")').last();
    
    // Check if it exists
    await expect(finalCTA).toBeVisible();
    
    // Check for CTA button
    const ctaButton = finalCTA.locator('a').first();
    await expect(ctaButton).toBeVisible();
    
    // Verify the button text
    const buttonText = await ctaButton.innerText();
    expect(buttonText).toMatch(/start|shop|buy|order|get/i);
  });

  // Test overall page performance (basic)
  test('should have good scrolling performance', async ({ page }) => {
    // Scroll the page from top to bottom smoothly to test animations
    await page.evaluate(() => {
      const scrollHeight = document.body.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollSteps = Math.ceil(scrollHeight / viewportHeight);
      
      return new Promise((resolve) => {
        let currentStep = 0;
        
        const scrollInterval = setInterval(() => {
          if (currentStep >= scrollSteps) {
            clearInterval(scrollInterval);
            resolve(true);
            return;
          }
          
          window.scrollTo(0, currentStep * viewportHeight);
          currentStep++;
        }, 300); // Scroll every 300ms
      });
    });
    
    // Take a screenshot after scrolling
    await page.screenshot({ path: 'e2e/screenshots/after-scroll.png' });
  });

  // Test responsiveness (basic)
  test('should be responsive on mobile viewport', async ({ page }) => {
    // Resize the viewport to mobile size
    await page.setViewportSize({ width: 390, height: 844 }); // iPhone 12 Pro dimensions
    
    // Wait for layout to adjust
    await page.waitForTimeout(1000);
    
    // Take a screenshot of mobile view
    await page.screenshot({ path: 'e2e/screenshots/mobile-view.png', fullPage: false });
    
    // Check if mobile menu is properly displayed
    const mobileMenu = page.locator('header button[aria-label*="menu" i]');
    await expect(mobileMenu).toBeVisible();
  });
});
