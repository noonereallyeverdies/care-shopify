import { chromium } from '@playwright/test';

(async () => {
  // Launch the browser
  const browser = await chromium.launch();
  
  // Create a new page
  const page = await browser.newPage();
  
  // Navigate to the URL
  await page.goto('http://localhost:3002/', { waitUntil: 'networkidle' });
  
  // Wait for any potential animations or loading indicators
  await page.waitForTimeout(3000);
  
  // Take a screenshot of the full page
  await page.screenshot({ path: 'e2e/screenshots/homepage-success.png', fullPage: true });
  
  // Close the browser
  await browser.close();
  
  console.log('Screenshot saved to e2e/screenshots/homepage-success.png');
})();
