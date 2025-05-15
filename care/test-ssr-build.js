/**
 * Test script to isolate SSR build issues
 * Run with: node test-ssr-build.js
 */
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('=== Testing SSR Build ===');
console.log('Current directory:', __dirname);

// Backup the original vite.config.ts
const viteConfigPath = path.join(__dirname, 'vite.config.ts');
const backupConfigPath = path.join(__dirname, 'vite.config.ts.backup');

try {
  if (fs.existsSync(viteConfigPath)) {
    fs.copyFileSync(viteConfigPath, backupConfigPath);
    console.log('Backed up original vite.config.ts');
  }

  // Run the SSR build
  console.log('Running SSR build...');
  execSync('npx vite build --ssr', { stdio: 'inherit' });
  
  console.log('SSR build completed successfully!');
} catch (error) {
  console.error('SSR build failed:', error.message);
} finally {
  // Restore the original vite.config.ts
  if (fs.existsSync(backupConfigPath)) {
    fs.copyFileSync(backupConfigPath, viteConfigPath);
    fs.unlinkSync(backupConfigPath);
    console.log('Restored original vite.config.ts');
  }
}
