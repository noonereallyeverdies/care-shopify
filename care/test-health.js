#!/usr/bin/env node

/**
 * Health check script to verify the application state before running Playwright tests
 */

import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

console.log('🔍 Running application health check...\n');

// 1. Check if Shopify config exists and has real token
console.log('1. Checking Shopify configuration...');
try {
  const configPath = './shopify.config.ts';
  const configContent = fs.readFileSync(configPath, 'utf8');
  
  if (configContent.includes('YOUR_STOREFRONT_API_PUBLIC_TOKEN')) {
    console.log('❌ Shopify token still using placeholder - needs update');
  } else if (configContent.includes('REPLACE_THIS_WITH_YOUR_ACTUAL_TOKEN')) {
    console.log('❌ Shopify token still using placeholder - needs update');
  } else {
    console.log('✅ Shopify config appears to have a real token');
  }
} catch (error) {
  console.log('❌ Could not read shopify.config.ts:', error.message);
}

// 2. Check if problematic node modules scripts are still present
console.log('\n2. Checking for problematic node modules scripts...');
const problematicFiles = [
  'node-simple-solution.cjs',
  'fix-node-modules.js',
  'fake-node-modules'
];

problematicFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`⚠️  Found: ${file} (may cause issues)`);
  } else {
    console.log(`✅ Clean: ${file} not found`);
  }
});

// 3. Check package.json scripts
console.log('\n3. Checking package.json scripts...');
try {
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  const devScript = packageJson.scripts.dev;
  
  if (devScript.includes('node-simple-solution.cjs')) {
    console.log('❌ dev script still references node-simple-solution.cjs');
  } else {
    console.log('✅ dev script looks clean');
  }
  
  if (devScript.includes('NODE_OPTIONS')) {
    console.log('⚠️  dev script still uses NODE_OPTIONS');
  }
} catch (error) {
  console.log('❌ Could not read package.json:', error.message);
}

// 4. Check Vite config
console.log('\n4. Checking Vite configuration...');
try {
  const viteConfigContent = fs.readFileSync('./vite.config.ts', 'utf8');
  
  if (viteConfigContent.includes('nodeBuiltinProviderPlugin')) {
    console.log('⚠️  Vite config still includes custom node builtin plugins');
  } else {
    console.log('✅ Vite config looks clean');
  }
} catch (error) {
  console.log('❌ Could not read vite.config.ts:', error.message);
}

// 5. Check if Node modules are clean
console.log('\n5. Checking Node modules...');
try {
  const nodeModulesPath = './node_modules';
  if (fs.existsSync(nodeModulesPath)) {
    // Check for any suspicious symlinks in node_modules
    const nodeModulesContents = fs.readdirSync(nodeModulesPath);
    const suspiciousFiles = ['fs', 'path', 'crypto', 'stream'].filter(name => 
      nodeModulesContents.includes(name)
    );
    
    if (suspiciousFiles.length > 0) {
      console.log('⚠️  Found suspicious files in node_modules:', suspiciousFiles);
    } else {
      console.log('✅ Node modules look clean');
    }
  } else {
    console.log('❌ node_modules directory not found - run npm install');
  }
} catch (error) {
  console.log('❌ Could not check node_modules:', error.message);
}

console.log('\n🏁 Health check complete. Running Playwright tests...\n');

// Run the Playwright tests
try {
  console.log('Running system health tests...');
  await execAsync('npx playwright test e2e/tests/system-health.spec.ts --reporter=line');
  
  console.log('\nRunning Shopify configuration tests...');
  await execAsync('npx playwright test e2e/tests/shopify-config.spec.ts --reporter=line');
  
  console.log('\n✅ All tests completed. Check the output above for any issues.');
} catch (error) {
  console.log('\n❌ Error running tests:', error.message);
  console.log('You may need to install Playwright browsers: npx playwright install');
}
