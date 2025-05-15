/**
 * This script directly patches specific import paths in node_modules files
 * to help resolve issues with Node.js built-in modules
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to node_modules
const nodeModulesDir = path.join(__dirname, 'node_modules');

// Files that need specific patching
const filesToPatch = [
  // Remix-run node files
  {
    path: path.join(nodeModulesDir, '@remix-run', 'node', 'dist', 'sessions', 'fileStorage.js'),
    replacements: [
      {
        search: "var crypto = require('crypto');",
        replace: "var crypto = typeof global.crypto !== 'undefined' ? global.crypto : require('crypto');"
      },
      {
        search: "var node_fs = require('fs');",
        replace: "var node_fs = typeof global.fs !== 'undefined' ? global.fs : require('fs');"
      },
      {
        search: "var path = require('path');",
        replace: "var path = typeof global.path !== 'undefined' ? global.path : require('path');"
      }
    ]
  },
  {
    path: path.join(nodeModulesDir, '@remix-run', 'node', 'dist', 'stream.js'),
    replacements: [
      {
        search: "var node_stream = require('stream');",
        replace: "var node_stream = typeof global.stream !== 'undefined' ? global.stream : require('stream');"
      }
    ]
  },
  {
    path: path.join(nodeModulesDir, '@remix-run', 'node', 'dist', 'upload', 'fileUploadHandler.js'),
    replacements: [
      {
        search: "var promises = require('fs/promises');",
        replace: "var promises = typeof global.fs !== 'undefined' && global.fs.promises ? global.fs.promises : require('fs/promises');"
      },
      {
        search: "var node_os = require('os');",
        replace: "var node_os = typeof global.os !== 'undefined' ? global.os : require('os');"
      },
      {
        search: "var path = require('path');",
        replace: "var path = typeof global.path !== 'undefined' ? global.path : require('path');"
      }
    ]
  },
  
  // Undici problematic files
  {
    path: path.join(nodeModulesDir, 'undici', 'lib', 'dispatcher', 'proxy-agent.js'),
    replacements: [
      {
        search: "const { URL } = require('url')",
        replace: "const { URL } = typeof global.url !== 'undefined' ? global.url : require('url')"
      }
    ]
  },
  {
    path: path.join(nodeModulesDir, 'undici', 'lib', 'interceptor', 'dns.js'),
    replacements: [
      {
        search: "const { isIP } = require('net')",
        replace: "const { isIP } = typeof global.net !== 'undefined' ? global.net : require('net')"
      },
      {
        search: "const { lookup } = require('dns')",
        replace: "const { lookup } = typeof global.dns !== 'undefined' ? global.dns : require('dns')"
      }
    ]
  },
  {
    path: path.join(nodeModulesDir, 'undici', 'lib', 'web', 'websocket', 'events.js'),
    replacements: [
      {
        search: "const { MessagePort } = require('worker_threads')",
        replace: "const { MessagePort } = typeof global.worker_threads !== 'undefined' ? global.worker_threads : require('worker_threads')"
      }
    ]
  },
  {
    path: path.join(nodeModulesDir, 'undici', 'lib', 'core', 'diagnostics.js'),
    replacements: [
      {
        search: "const diagnosticsChannel = require('diagnostics_channel')",
        replace: "const diagnosticsChannel = typeof global.diagnostics_channel !== 'undefined' ? global.diagnostics_channel : require('diagnostics_channel')"
      }
    ]
  },
  {
    path: path.join(nodeModulesDir, 'undici', 'lib', 'web', 'fetch', 'util.js'),
    replacements: [
      {
        search: "const { performance } = require('perf_hooks')",
        replace: "const { performance } = typeof global.perf_hooks !== 'undefined' ? global.perf_hooks : require('perf_hooks')"
      },
      {
        search: "const { isUint8Array } = require('util/types')",
        replace: "const { isUint8Array } = typeof global.util !== 'undefined' && global.util.types ? global.util.types : require('util/types')"
      }
    ]
  },
  {
    path: path.join(nodeModulesDir, 'undici', 'lib', 'dispatcher', 'client-h2.js'),
    replacements: [
      {
        search: "http2 = require('http2')",
        replace: "http2 = typeof global.http2 !== 'undefined' ? global.http2 : require('http2')"
      }
    ]
  }
];

// Main function to apply the patches
async function main() {
  console.log('🔧 Applying direct import path patches to specific files...');
  
  for (const { path, replacements } of filesToPatch) {
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
  
  console.log('🎉 Import path patching completed!');
}

// Run the main function
main().catch(error => {
  console.error('Error applying import path patches:', error);
  process.exit(1);
});
