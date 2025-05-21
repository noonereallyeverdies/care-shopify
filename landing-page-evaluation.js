const { test, expect } = require('@playwright/test');

/**
 * Visual Landing Page Evaluation Script
 * 
 * This script will evaluate the visual layout and alignment of sections on the landing page,
 * providing measurements and screenshots to identify layout issues.
 */

test('Evaluate landing page visual layout', async ({ page }) => {
  // Navigate to the landing page
  await page.goto('http://localhost:3000/en-us');
  
  // Wait for the page to be fully loaded
  await page.waitForLoadState('networkidle');
  
  // Set a wide viewport to ensure we can test responsive behavior
  await page.setViewportSize({ width: 1920, height: 1080 });

  // Take a full page screenshot
  await page.screenshot({ path: 'landing-page-full.png', fullPage: true });

  // Evaluate section alignment and spacing
  const sections = await page.$$('section');
  console.log(`Found ${sections.length} sections on the page`);

  // Check alignment of each section
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    
    // Get bounding box to check alignment
    const boundingBox = await section.boundingBox();
    
    console.log(`Section ${i+1}: Left: ${boundingBox.x}, Width: ${boundingBox.width}, Top: ${boundingBox.y}, Height: ${boundingBox.height}`);
    
    // Take screenshot of the specific section
    await section.screenshot({ path: `section-${i+1}.png` });
    
    // Check if the section has appropriate container and padding
    const container = await section.$('.container');
    if (container) {
      const containerBox = await container.boundingBox();
      console.log(`  Container: Left: ${containerBox.x}, Width: ${containerBox.width}`);
      
      // Check if container is centered
      const leftMargin = containerBox.x;
      const rightMargin = boundingBox.width - (containerBox.x + containerBox.width);
      const marginDifference = Math.abs(leftMargin - rightMargin);
      
      if (marginDifference > 20) {
        console.log(`  ISSUE: Container is not properly centered. Left margin: ${leftMargin}px, Right margin: ${rightMargin}px`);
      }
    } else {
      console.log(`  ISSUE: Section ${i+1} does not have a container class element`);
    }
    
    // Check for mobile responsiveness
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
    await section.screenshot({ path: `section-${i+1}-mobile.png` });
    
    // Reset viewport for next section
    await page.setViewportSize({ width: 1920, height: 1080 });
  }

  // Check brand consistency
  const brandElements = {
    colors: ['#FF7F50', '#FFDAB9', '#FFD700'], // coral, peach, gold
    fonts: ['serif', 'sans-serif'],
    caseStyle: 'lowercase'
  };

  // Check for headings case style
  const headings = await page.$$('h1, h2, h3, h4, h5, h6');
  let nonLowercaseHeadings = 0;
  
  for (const heading of headings) {
    const text = await heading.innerText();
    // Convert to lowercase and compare
    if (text !== text.toLowerCase() && text.length > 2) {
      nonLowercaseHeadings++;
      console.log(`Found non-lowercase heading: "${text}"`);
    }
  }
  
  console.log(`Found ${nonLowercaseHeadings} headings not in lowercase out of ${headings.length} total headings`);

  // Check spacing between sections
  let previousSectionBottom = 0;
  let inconsistentSpacing = 0;
  
  for (let i = 0; i < sections.length; i++) {
    const box = await sections[i].boundingBox();
    
    if (i > 0) {
      const spacing = box.y - previousSectionBottom;
      console.log(`Spacing between section ${i} and ${i+1}: ${spacing}px`);
      
      if (i > 1) {
        const previousSpacing = previousSectionBottom - (await sections[i-2].boundingBox()).y - (await sections[i-2].boundingBox()).height;
        if (Math.abs(spacing - previousSpacing) > 40) {
          inconsistentSpacing++;
          console.log(`  ISSUE: Inconsistent spacing between sections`);
        }
      }
    }
    
    previousSectionBottom = box.y + box.height;
  }
  
  console.log(`Found ${inconsistentSpacing} instances of inconsistent spacing between sections`);
  
  // Generate a summary report
  console.log('\n=== VISUAL EVALUATION SUMMARY ===');
  console.log(`Total sections: ${sections.length}`);
  console.log(`Sections with alignment issues: ${sections.length - (await page.$$('section > .container')).length}`);
  console.log(`Non-lowercase headings: ${nonLowercaseHeadings}/${headings.length}`);
  console.log(`Inconsistent section spacing: ${inconsistentSpacing}`);
});
