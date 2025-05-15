/**
 * This script directly patches specific problematic files
 * that are still causing issues even after the automated fixes
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Files that need custom patching
const filesAndPatches = [
  // Fix @remix-run/node fileStorage.js
  {
    path: path.join(__dirname, 'node_modules', '@remix-run', 'node', 'dist', 'sessions', 'fileStorage.js'),
    replacements: [
      {
        search: "var crypto = require('crypto');",
        replace: "var crypto = require('crypto');"
      },
      {
        search: "var node_fs = require('fs');",
        replace: "var node_fs = global.fs || require('fs');"
      },
      {
        search: "var path = require('path');",
        replace: "var path = global.path || require('path');"
      }
    ]
  },
  // Fix @remix-run/node stream.js
  {
    path: path.join(__dirname, 'node_modules', '@remix-run', 'node', 'dist', 'stream.js'),
    replacements: [
      {
        search: "var node_stream = require('stream');",
        replace: "var node_stream = global.stream || require('stream');"
      }
    ]
  },
  // Fix @remix-run/node fileUploadHandler.js
  {
    path: path.join(__dirname, 'node_modules', '@remix-run', 'node', 'dist', 'upload', 'fileUploadHandler.js'),
    replacements: [
      {
        search: "var promises = require('fs/promises');",
        replace: "var promises = global.fs ? global.fs.promises : require('fs/promises');"
      },
      {
        search: "var node_os = require('os');",
        replace: "var node_os = global.os || require('os');"
      },
      {
        search: "var path = require('path');",
        replace: "var path = global.path || require('path');"
      }
    ]
  },
  // Fix undici proxy-agent.js
  {
    path: path.join(__dirname, 'node_modules', 'undici', 'lib', 'dispatcher', 'proxy-agent.js'),
    replacements: [
      {
        search: "const { URL } = require('url')",
        replace: "const { URL } = global.url ? global.url : require('url')"
      }
    ]
  }
];

// Main function to apply the patches
async function main() {
  console.log('🔧 Applying direct patches to specific files...');
  
  for (const { path, replacements } of filesAndPatches) {
    if (!fs.existsSync(path)) {
      console.log(`⚠️  File does not exist, skipping: ${path}`);
      continue;
    }
    
    console.log(`Processing file: ${path}`);
    
    try {
      // Read the file
      let content = await fs.promises.readFile(path, 'utf8');
      let modified = false;
      
      // Apply each replacement
      for (const { search, replace } of replacements) {
        if (content.includes(search)) {
          content = content.replace(search, replace);
          modified = true;
        }
      }
      
      // Save the modified content
      if (modified) {
        await fs.promises.writeFile(path, content, 'utf8');
        console.log(`✅ Patched: ${path}`);
      } else {
        console.log(`ℹ️  No changes needed for: ${path}`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${path}: ${error.message}`);
    }
  }
  
  console.log('🎉 Direct patching completed!');
}

// Run the main function
main().catch(error => {
  console.error('Error applying direct patches:', error);
  process.exit(1);
});
