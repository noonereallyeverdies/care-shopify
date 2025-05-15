// @ts-check
const { test, expect } = require('@playwright/test');

test('Landing page section analysis', async ({ page }) => {
  // Navigate to the landing page
  await page.goto('/');
  
  // Wait for page to be fully loaded
  await page.waitForLoadState('networkidle');
  
  // Define sections to analyze
  const sections = [
    { id: 'hero', name: 'Hero Section' },
    { id: 'benefits', name: 'Benefits Section' },
    { id: 'how-it-works', name: 'How It Works Section' },
    { id: 'science', name: 'Science & Technology Section' },
    { id: 'results', name: 'Results Section' },
    { id: 'comparison', name: 'Comparison Section' },
    { id: 'testimonials', name: 'Testimonials Section' },
    { id: 'pricing', name: 'Pricing Section' },
    { id: 'faq', name: 'FAQ Section' }
  ];
  
  // Analyze each section
  for (const section of sections) {
    console.log(`Analyzing ${section.name}...`);
    
    // Scroll to section
    await page.evaluate((sectionId) => {
      document.getElementById(sectionId).scrollIntoView();
    }, section.id);
    
    // Wait for any animations to complete
    await page.waitForTimeout(1000);
    
    // Take screenshot of the section
    await page.screenshot({ 
      path: `e2e/screenshots/${section.id}.png`,
      fullPage: false 
    });
    
    // Perform section-specific checks
    const sectionElement = await page.locator(`#${section.id}`);
    
    // Check visibility
    const isVisible = await sectionElement.isVisible();
    console.log(`${section.name} visibility: ${isVisible}`);
    
    // Check content presence
    const textContent = await sectionElement.textContent();
    const hasContent = textContent && textContent.trim().length > 0;
    console.log(`${section.name} has content: ${hasContent}`);
    
    // Check image loading
    const images = await sectionElement.locator('img').all();
    for (const img of images) {
      const isLoaded = await img.evaluate((el) => {
        if (!el.complete) return false;
        if (el.naturalWidth === 0) return false;
        return true;
      });
      const imgAlt = await img.getAttribute('alt') || 'No alt text';
      console.log(`Image ${imgAlt} loaded: ${isLoaded}`);
    }
    
    // Check responsive behavior
    const boundingBox = await sectionElement.boundingBox();
    console.log(`${section.name} dimensions: ${boundingBox.width}x${boundingBox.height}`);
  }
  
  // Analyze overall page flow
  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log(`Total page height: ${pageHeight}px`);
  
  // Check for redundant content
  const allHeadings = await page.locator('h1, h2, h3').allTextContents();
  const headingSet = new Set(allHeadings);
  const hasDuplicateHeadings = allHeadings.length !== headingSet.size;
  console.log(`Page has duplicate headings: ${hasDuplicateHeadings}`);
  
  // Check footer
  const footer = await page.locator('footer');
  const footerContent = await footer.textContent();
  console.log(`Footer content length: ${footerContent.length}`);
});
