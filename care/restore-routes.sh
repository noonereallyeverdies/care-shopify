#!/bin/bash

echo "🔄 Restoring Original Routes"
echo "============================"

cd /Users/yvonne/Desktop/shopify/care-shopify/care

# Kill any running processes
pkill -f "hydrogen\|mini-oxygen" || true

# Restore original homepage route
if [ -f "app/routes/(\$locale)._index.tsx.backup" ]; then
    mv "app/routes/(\$locale)._index.tsx.backup" "app/routes/(\$locale)._index.tsx"
    echo "✅ Original homepage route restored"
else
    echo "❌ No backup found"
fi

echo "Original routes restored. You can now test normally."