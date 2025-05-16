#!/bin/bash

echo "🔄 Restoring Original Vite Config"
echo "================================="

cd /Users/yvonne/Desktop/shopify/care-shopify/care

# Kill any running processes
pkill -f "hydrogen\|mini-oxygen" || true

# Restore original config
if [ -f "vite.config.backup.ts" ]; then
    cp vite.config.backup.ts vite.config.ts
    echo "✅ Original vite.config.ts restored"
else
    echo "❌ No backup found"
fi

# Clean up test files
rm -f vite.config.test.ts vite.config.backup.ts

echo "Original configuration restored. You can now run npm run dev normally."