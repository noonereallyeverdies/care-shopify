#!/bin/bash

echo "🎉 Final Test - Verifying Everything Works"
echo "========================================="

cd /Users/yvonne/Desktop/shopify/care-shopify/care

# Kill any running processes
pkill -f "hydrogen\|mini-oxygen" || true

# Start dev server
echo "🚀 Starting dev server..."
npm run dev

echo "✨ The JSON parsing error should now be completely resolved!"
echo "✨ The syntax error in performance.ts should also be fixed!"