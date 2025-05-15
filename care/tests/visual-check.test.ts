import { test, expect } from '@playwright/test';

test('Visual check of the site', async ({ page }) => {
  // Start the dev server
  const devServerProcess = require('child_process').spawn(
    'npm',
    ['run', 'dev'],
    {
      cwd: '/Users/yvonne/FINAL_SHOPIFY_PLZ/care-shopify/care',
      shell: true,
    }
  );

  // Wait for server to start
  await new Promise(resolve => setTimeout(resolve, 30000));

  try {
    // Go to homepage
    await page.goto('http://localhost:3001/');
    console.log('Current URL:', page.url());
    
    // Take a screenshot of homepage
    await page.screenshot({ path: 'homepage.png', fullPage: true });

    // Check header elements
    const header = await page.locator('header');
    await header.screenshot({ path: 'header.png' });

    // Check footer elements
    const footer = await page.locator('footer');
    await footer.screenshot({ path: 'footer.png' });

    // Check product page
    await page.goto('http://localhost:3001/collections/all');
    await page.screenshot({ path: 'collections.png', fullPage: true });

    // Check science page
    await page.goto('http://localhost:3001/pages/science');
    await page.screenshot({ path: 'science.png', fullPage: true });

    // Check responsive layout
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3001/');
    await page.screenshot({ path: 'homepage-mobile.png', fullPage: true });

  } finally {
    // Kill the dev server
    devServerProcess.kill();
  }
});
