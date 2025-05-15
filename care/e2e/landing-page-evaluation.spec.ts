import { test, expect } from '@playwright/test';

// Landing page visual evaluation test
test('Evaluate landing page visual appearance and accessibility', async ({ page }) => {
  // Navigate to the landing page
  await page.goto('http://localhost:3000');
  
  // Take a screenshot of the entire page for visual reference
  await page.screenshot({ path: 'landing-page-full.png', fullPage: true });

  // Log that we're starting the evaluation
  console.log('Starting landing page evaluation...');
  
  // Check performance metrics
  const performanceMetrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    return {
      loadTime: navigation.loadEventEnd - navigation.startTime,
      domContentLoadedTime: navigation.domContentLoadedEventEnd - navigation.startTime,
      firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 'Not available',
      firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 'Not available',
    };
  });
  
  console.log('Performance metrics:', performanceMetrics);

  // Visual Evaluation: Check for adequate contrast and readability
  const contrastIssues = await page.evaluate(() => {
    const textElements = [...document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, button')];
    const lowContrastElements = textElements.filter(el => {
      const style = window.getComputedStyle(el);
      const bgColor = style.backgroundColor;
      const color = style.color;
      const fontSize = parseInt(style.fontSize);
      
      // Very basic contrast check - we'd want a more sophisticated algorithm in a real test
      if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
        // Skip elements with transparent background as they inherit from parent
        return false;
      }
      
      // Check if text is too small
      if (fontSize < 12) {
        return true;
      }
      
      // Very simplified contrast check - would need a proper WCAG calculation
      if (color === bgColor) {
        return true;
      }
      
      return false;
    });
    
    return lowContrastElements.length > 0 ? 
      `Found ${lowContrastElements.length} elements with potential contrast issues` : 
      null;
  });
  
  if (contrastIssues) {
    console.log('Contrast check:', contrastIssues);
  } else {
    console.log('Contrast check: No obvious issues detected');
  }

  // Check for responsive behavior
  // Test mobile viewport
  await page.setViewportSize({ width: 375, height: 667 });
  await page.screenshot({ path: 'landing-page-mobile.png' });
  
  // Test tablet viewport
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.screenshot({ path: 'landing-page-tablet.png' });
  
  // Test desktop viewport
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.screenshot({ path: 'landing-page-desktop.png' });

  // Check for visual consistency across sections
  const visualConsistencyIssues = await page.evaluate(() => {
    // Gather sections
    const sections = [...document.querySelectorAll('section')];
    
    // Check for inconsistent padding
    const paddingValues = sections.map(section => {
      const style = window.getComputedStyle(section);
      return {
        paddingTop: style.paddingTop,
        paddingBottom: style.paddingBottom
      };
    });
    
    const uniquePaddingValues = new Set(paddingValues.map(p => `${p.paddingTop},${p.paddingBottom}`));
    const paddingConsistent = uniquePaddingValues.size <= 2; // Allow for up to 2 different padding styles
    
    // Check for inconsistent typography
    const headings = [...document.querySelectorAll('h1, h2, h3')];
    const headingStyles = headings.map(heading => {
      const style = window.getComputedStyle(heading);
      return {
        fontFamily: style.fontFamily,
        fontWeight: style.fontWeight
      };
    });
    
    const uniqueHeadingStyles = new Set(headingStyles.map(h => `${h.fontFamily},${h.fontWeight}`));
    const typographyConsistent = uniqueHeadingStyles.size <= 3; // Allow for different styles for h1/h2/h3
    
    const issues = [];
    if (!paddingConsistent) issues.push('Inconsistent section padding');
    if (!typographyConsistent) issues.push('Inconsistent typography');
    
    return issues.length > 0 ? issues : null;
  });
  
  if (visualConsistencyIssues) {
    console.log('Visual consistency issues:', visualConsistencyIssues);
  } else {
    console.log('Visual consistency: No obvious issues detected');
  }

  // Check for content redundancy
  const contentRedundancyIssues = await page.evaluate(() => {
    // This is a simplified check - in reality you'd want something more sophisticated
    const headings = [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')];
    const headingText = headings.map(h => h.textContent?.trim().toLowerCase());
    
    // Check for duplicate headings
    const duplicates = headingText.filter((item, index) => 
      item && item.length > 10 && headingText.indexOf(item) !== index
    );
    
    // Check for repetitive phrases in paragraphs
    const paragraphs = [...document.querySelectorAll('p')];
    const paragraphText = paragraphs.map(p => p.textContent?.trim().toLowerCase());
    
    // Extract key phrases (simplified)
    const keyPhrases = ['hair density', 'hair diameter', 'clinical results', 'red light therapy', 'hair loss'];
    const phraseCount = {};
    
    paragraphText.forEach(text => {
      if (!text) return;
      keyPhrases.forEach(phrase => {
        if (text.includes(phrase)) {
          phraseCount[phrase] = (phraseCount[phrase] || 0) + 1;
        }
      });
    });
    
    const repeatedPhrases = Object.entries(phraseCount)
      .filter(([_, count]) => (count as number) > 3) // Allow phrase to appear up to 3 times
      .map(([phrase, count]) => `"${phrase}" appears ${count} times`);
    
    const issues = [
      ...duplicates.map(d => `Duplicate heading: "${d}"`),
      ...repeatedPhrases
    ];
    
    return issues.length > 0 ? issues : null;
  });
  
  if (contentRedundancyIssues) {
    console.log('Content redundancy issues:', contentRedundancyIssues);
  } else {
    console.log('Content redundancy: No obvious issues detected');
  }

  // Evaluate the visual structure and flow
  const visualStructureIssues = await page.evaluate(() => {
    // Check for proper visual hierarchy
    const headings = [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')];
    const previousLevels = [];
    const hierarchyIssues = [];
    
    for (const heading of headings) {
      const level = parseInt(heading.tagName.substring(1));
      
      if (previousLevels.length > 0) {
        const previousLevel = previousLevels[previousLevels.length - 1];
        
        // Check if heading levels are skipped (e.g., h2 followed by h4)
        if (level > previousLevel + 1) {
          hierarchyIssues.push(`Heading level skipped: ${heading.tagName} after H${previousLevel}`);
        }
      }
      
      previousLevels.push(level);
    }
    
    // Check for proper visual balance
    const sections = [...document.querySelectorAll('section')];
    const sectionSizes = sections.map(section => {
      const rect = section.getBoundingClientRect();
      return rect.height;
    });
    
    // Simple check for sections that are too small or too large
    const averageSectionHeight = sectionSizes.reduce((a, b) => a + b, 0) / sectionSizes.length;
    const sizeIssues = [];
    
    sectionSizes.forEach((height, index) => {
      if (height < averageSectionHeight * 0.5) {
        sizeIssues.push(`Section ${index + 1} appears too small compared to others`);
      } else if (height > averageSectionHeight * 1.5) {
        sizeIssues.push(`Section ${index + 1} appears too large compared to others`);
      }
    });
    
    return [...hierarchyIssues, ...sizeIssues];
  });
  
  if (visualStructureIssues && visualStructureIssues.length > 0) {
    console.log('Visual structure issues:', visualStructureIssues);
  } else {
    console.log('Visual structure: No obvious issues detected');
  }

  // Check for CTA clarity and prominence
  const ctaIssues = await page.evaluate(() => {
    const ctaButtons = [...document.querySelectorAll('a[href*="products"], button[class*="primary"]')];
    
    const issues = [];
    
    if (ctaButtons.length === 0) {
      issues.push('No clear CTAs found');
    } else if (ctaButtons.length > 4) {
      issues.push(`Found ${ctaButtons.length} CTAs, which may be too many for one page`);
    }
    
    // Check if the primary CTA is visible without scrolling
    const firstCTA = ctaButtons[0];
    if (firstCTA) {
      const rect = firstCTA.getBoundingClientRect();
      const isAboveFold = rect.top < window.innerHeight;
      
      if (!isAboveFold) {
        issues.push('Primary CTA is below the fold and requires scrolling');
      }
    }
    
    return issues.length > 0 ? issues : null;
  });
  
  if (ctaIssues) {
    console.log('CTA issues:', ctaIssues);
  } else {
    console.log('CTA evaluation: No obvious issues detected');
  }

  // Overall grading based on all checks
  let overallGrade = '';
  const visualIssues = [...(visualConsistencyIssues || []), ...(visualStructureIssues || [])];
  const contentIssues = [...(contentRedundancyIssues || [])];
  const usabilityIssues = [...(ctaIssues || [])];
  
  const totalIssues = visualIssues.length + contentIssues.length + usabilityIssues.length;
  
  if (totalIssues === 0) {
    overallGrade = 'A';
  } else if (totalIssues <= 3) {
    overallGrade = 'B';
  } else if (totalIssues <= 6) {
    overallGrade = 'C';
  } else if (totalIssues <= 9) {
    overallGrade = 'D';
  } else {
    overallGrade = 'F';
  }
  
  console.log('------------------------------------------------------');
  console.log(`OVERALL LANDING PAGE GRADE: ${overallGrade}`);
  console.log('------------------------------------------------------');
  console.log('Visual Issues:', visualIssues.length > 0 ? visualIssues : 'None detected');
  console.log('Content Issues:', contentIssues.length > 0 ? contentIssues : 'None detected');
  console.log('Usability Issues:', usabilityIssues.length > 0 ? usabilityIssues : 'None detected');
  console.log('------------------------------------------------------');
  
  // Add suggestions for improvement
  console.log('RECOMMENDATIONS FOR IMPROVEMENT:');
  
  if (visualIssues.length > 0) {
    console.log('Visual Improvements:');
    visualIssues.forEach(issue => console.log(`- ${issue}`));
  }
  
  if (contentIssues.length > 0) {
    console.log('Content Improvements:');
    contentIssues.forEach(issue => console.log(`- ${issue}`));
  }
  
  if (usabilityIssues.length > 0) {
    console.log('Usability Improvements:');
    usabilityIssues.forEach(issue => console.log(`- ${issue}`));
  }
  
  // If there are no issues, provide some general enhancement suggestions
  if (totalIssues === 0) {
    console.log('While no major issues were detected, consider these enhancements:');
    console.log('- Ensure images have appropriate alt text for accessibility');
    console.log('- Consider A/B testing different versions of the hero section CTAs');
    console.log('- Review page load times on various devices and network conditions');
    console.log('- Check analytics to identify any user drop-off points');
  }
  
  console.log('------------------------------------------------------');
});
