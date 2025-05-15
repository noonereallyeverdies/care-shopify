#!/usr/bin/env node

console.log('Checking for potential server build issues...');

// Import built-in modules
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths to check
const appRoot = __dirname;
const rootTsPath = path.join(appRoot, 'app', 'root.tsx');
const analyticsPath = path.join(appRoot, 'app', 'lib', 'analytics.ts');

// Check for analytics import in root.tsx
try {
  console.log('Checking root.tsx...');
  const rootContent = fs.readFileSync(rootTsPath, 'utf8');
  
  // Check for analytics imports
  const analyticsImports = rootContent.match(/import.*from ['"].*analytics['"]/g) || [];
  console.log(`Found ${analyticsImports.length} analytics imports in root.tsx:`);
  analyticsImports.forEach(imp => console.log(`  - ${imp}`));
  
  // Check for SSR checks in useEffect hooks
  const useEffectCalls = rootContent.match(/useEffect\(\s*\(\)\s*=>\s*{[^}]*}/gs) || [];
  console.log(`\nFound ${useEffectCalls.length} useEffect calls in root.tsx`);
  
  const windowChecksInEffect = useEffectCalls.filter(ue => ue.includes('typeof window'));
  console.log(`  - ${windowChecksInEffect.length} have browser environment checks`);
  
} catch (err) {
  console.error('Error checking root.tsx:', err.message);
}

// Check for SSR issues in analytics.ts
try {
  if (fs.existsSync(analyticsPath)) {
    console.log('\nChecking analytics.ts...');
    const analyticsContent = fs.readFileSync(analyticsPath, 'utf8');
    
    // Count SSR protection checks
    const windowChecks = (analyticsContent.match(/typeof window (!=|!==) ['"]undefined['"]/g) || []).length;
    console.log(`Found ${windowChecks} browser environment checks in analytics.ts`);
    
    // Check for non-serializable code
    const functionExports = analyticsContent.match(/export (function|const) \w+/g) || [];
    console.log(`Found ${functionExports.length} exported functions/constants in analytics.ts`);
    
    const classExports = analyticsContent.match(/export class \w+/g) || [];
    console.log(`Found ${classExports.length} exported classes in analytics.ts`);
  } else {
    console.log('\nanalytics.ts not found');
  }
} catch (err) {
  console.error('Error checking analytics.ts:', err.message);
}

console.log('\nCheck complete. Look for missing SSR protection or non-serializable exports.');
console.log('To fix SSR issues, ensure all browser API usage is protected with "typeof window !== \'undefined\'" checks.');
console.log('Wrap component-level calls in useEffect hooks with empty dependency arrays.'); 