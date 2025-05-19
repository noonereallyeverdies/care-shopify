/**
 * AccessibilityChecker Component
 * 
 * This component runs automated accessibility checks in development mode.
 * It helps identify common accessibility issues during development.
 * 
 * NOTE: This should only be enabled in development, not production.
 */

import { useEffect } from 'react';

interface AccessibilityCheckerProps {
  enabled?: boolean;
}

export default function AccessibilityChecker({ enabled = process.env.NODE_ENV !== 'production' }: AccessibilityCheckerProps) {
  useEffect(() => {
    // Only run in development and browser environment
    if (!enabled || typeof window === 'undefined') return;

    // Dynamically import axe-core for development only
    import('axe-core').then(({ default: axe }) => {
      // Configure and run axe
      axe.configure({
        rules: [
          // Enable specific rules
          { id: 'color-contrast', enabled: true },
          { id: 'aria-roles', enabled: true },
          { id: 'button-name', enabled: true },
          { id: 'image-alt', enabled: true },
          { id: 'label', enabled: true },
          { id: 'link-name', enabled: true },
        ],
      });

      // Run the accessibility tests
      axe.run(document.body, {}, (err, results) => {
        if (err) {
          console.error('Error running accessibility checks:', err);
          return;
        }

        // Log results with improved formatting
        if (results.violations.length > 0) {
          console.group('%cAccessibility Violations', 'color: #e74c3c; font-weight: bold; font-size: 14px;');
          
          results.violations.forEach((violation) => {
            const nodes = violation.nodes.map((node) => node.html).join('\n');
            
            console.group(`%c${violation.impact?.toUpperCase() || 'ISSUE'}: ${violation.help}`, 
              `color: ${getImpactColor(violation.impact)}; font-weight: bold;`);
            
            console.log(`%cDescription: %c${violation.description}`, 
              'font-weight: bold;', 'font-weight: normal;');
            
            console.log(`%cImpacted Elements:%c\n${nodes}`, 
              'font-weight: bold;', 'font-weight: normal;');
            
            console.log(`%cHow to fix: %c${violation.helpUrl}`, 
              'font-weight: bold;', 'font-weight: normal; text-decoration: underline;');
            
            console.groupEnd();
          });
          
          console.groupEnd();
          
          // Add visual indicator to the page
          addA11yIndicator(results.violations.length);
        } else {
          console.log('%c✓ No accessibility violations detected', 'color: #2ecc71; font-weight: bold;');
        }
      });
    }).catch(error => {
      console.warn('Could not load accessibility checking module:', error);
    });

    return () => {
      // Remove the indicator when component unmounts
      const indicator = document.getElementById('a11y-violation-indicator');
      if (indicator) {
        indicator.remove();
      }
    };
  }, [enabled]);

  return null; // This component doesn't render anything
}

// Helper to get color based on impact level
function getImpactColor(impact?: string): string {
  switch (impact) {
    case 'critical': return '#e74c3c';
    case 'serious': return '#e67e22';
    case 'moderate': return '#f39c12';
    case 'minor': return '#3498db';
    default: return '#95a5a6';
  }
}

// Helper to add a visual indicator to the page
function addA11yIndicator(violationCount: number) {
  // Remove existing indicator if any
  const existingIndicator = document.getElementById('a11y-violation-indicator');
  if (existingIndicator) {
    existingIndicator.remove();
  }

  // Create new indicator
  const indicator = document.createElement('div');
  indicator.id = 'a11y-violation-indicator';
  indicator.style.position = 'fixed';
  indicator.style.bottom = '20px';
  indicator.style.right = '20px';
  indicator.style.backgroundColor = '#e74c3c';
  indicator.style.color = 'white';
  indicator.style.padding = '8px 16px';
  indicator.style.borderRadius = '4px';
  indicator.style.fontFamily = 'sans-serif';
  indicator.style.fontSize = '14px';
  indicator.style.fontWeight = 'bold';
  indicator.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
  indicator.style.zIndex = '9999';
  indicator.style.cursor = 'pointer';
  indicator.textContent = `⚠️ ${violationCount} Accessibility ${violationCount === 1 ? 'Issue' : 'Issues'}`;
  
  // Add click handler to open console
  indicator.addEventListener('click', () => {
    console.log('%cAccessibility Issues Detected', 'color: #e74c3c; font-weight: bold; font-size: 16px;');
    console.log('Open the Console and look for "Accessibility Violations" to see details');
  });
  
  document.body.appendChild(indicator);
}
