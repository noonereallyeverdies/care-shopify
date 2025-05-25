#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to recursively find all TypeScript and TypeScript JSX files
function findTsFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and other irrelevant directories
      if (!['node_modules', '.git', 'dist', 'build'].includes(item)) {
        findTsFiles(fullPath, files);
      }
    } else if (item.match(/\.(ts|tsx)$/)) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Function to fix imports in a file
function fixImportsInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Replace the problematic import path
  const fixedContent = content.replace(
    /@shopify\/hydrogen\/dist\/storefront-api-types\.js/g,
    '@shopify/hydrogen/storefront-api-types'
  );
  
  // Only write if there were changes
  if (content !== fixedContent) {
    fs.writeFileSync(filePath, fixedContent, 'utf8');
    console.log(`Fixed imports in: ${filePath}`);
    return true;
  }
  
  return false;
}

// Main execution
console.log('Fixing Hydrogen import paths...');

const projectRoot = '/Users/yvonne/Desktop/care/new-hydrogen-app';
const files = findTsFiles(projectRoot);

let fixedCount = 0;

for (const file of files) {
  if (fixImportsInFile(file)) {
    fixedCount++;
  }
}

console.log(`\nFixed imports in ${fixedCount} files.`);
console.log('Import path fixes completed!');
