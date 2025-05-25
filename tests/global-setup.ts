import { chromium, FullConfig } from '@playwright/test';

/**
 * Global setup for Playwright tests
 * Runs once before all tests
 */
async function globalSetup(config: FullConfig) {
  console.log('🚀 Starting global test setup...');
  
  const baseURL = config.projects[0].use.baseURL || 'http://localhost:3000';
  
  // Launch browser for setup
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    // Health check - ensure the application is running
    console.log('🔍 Performing health check...');
    const response = await page.goto(baseURL, { waitUntil: 'networkidle' });
    
    if (!response || response.status() !== 200) {
      throw new Error(`Health check failed. Server returned status: ${response?.status()}`);
    }
    
    // Clear any existing cart state
    console.log('🧹 Clearing cart state...');
    await page.goto(`${baseURL}/cart`);
    
    // Try to clear cart if it has items
    const emptyCartMessage = page.locator('text=Your cart is empty, text=No items');
    if (!await emptyCartMessage.isVisible()) {
      const removeButtons = page.locator('button:has-text("Remove"), button:has-text("Delete")');
      const count = await removeButtons.count();
      
      for (let i = 0; i < count; i++) {
        await removeButtons.first().click();
        await page.waitForTimeout(500);
      }
    }
    
    // Verify essential pages are accessible
    console.log('📋 Verifying essential pages...');
    const essentialPages = [
      '/',
      '/products/photonique-premium',
      '/cart'
    ];
    
    for (const path of essentialPages) {
      try {
        const pageResponse = await page.goto(`${baseURL}${path}`);
        if (!pageResponse || pageResponse.status() >= 400) {
          console.warn(`⚠️ Warning: ${path} returned status ${pageResponse?.status()}`);
        }
      } catch (error) {
        console.warn(`⚠️ Warning: Failed to access ${path}:`, error);
      }
    }
    
    // Set up test environment variables
    process.env.TEST_START_TIME = Date.now().toString();
    process.env.TEST_BASE_URL = baseURL;
    
    console.log('✅ Global setup completed successfully');
    
  } catch (error) {
    console.error('❌ Global setup failed:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

export default globalSetup;
