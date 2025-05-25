#!/bin/bash

# Fix all Hydrogen import paths from /dist/index.js to the correct package import
echo "🔧 Fixing all Hydrogen import paths..."

# Find all TypeScript/JavaScript files and replace the import paths
find /Users/yvonne/Desktop/care/new-hydrogen-app/app -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | \
xargs sed -i '' 's/@shopify\/hydrogen\/dist\/index\.js/@shopify\/hydrogen/g'

# Also fix entry.server.tsx and env.d.ts in the root
sed -i '' 's/@shopify\/hydrogen\/dist\/index\.js/@shopify\/hydrogen/g' /Users/yvonne/Desktop/care/new-hydrogen-app/entry.server.tsx
sed -i '' 's/@shopify\/hydrogen\/dist\/index\.js/@shopify\/hydrogen/g' /Users/yvonne/Desktop/care/new-hydrogen-app/env.d.ts

echo "✅ All Hydrogen import paths have been fixed!"
echo "📝 Fixed files in:"
echo "   - app/ directory (all .ts, .tsx, .js, .jsx files)"
echo "   - entry.server.tsx" 
echo "   - env.d.ts"
