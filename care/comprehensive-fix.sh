#!/bin/bash

echo "🔧 Comprehensive Fix for JSON Parsing Error"
echo "==========================================="

cd /Users/yvonne/Desktop/shopify/care-shopify/care

# Kill all running processes
pkill -f "hydrogen\|mini-oxygen" || true

echo "✅ Fixed root.tsx with:"
echo "   - Proper error handling and fallbacks"
echo "   - Comprehensive logging for diagnosis"
echo "   - Diagnostic mode toggle (currently disabled)"
echo "   - Safe data handling in App component"

echo ""
echo "🧪 To test in diagnostic mode:"
echo "   1. Open app/root.tsx"
echo "   2. Change 'USE_DIAGNOSTIC_LOADER = false' to 'USE_DIAGNOSTIC_LOADER = true'"
echo "   3. This will use minimal hardcoded data to bypass data fetching issues"

echo ""
echo "🚀 Starting development server..."
npm run dev

echo ""
echo "📝 Check the terminal output for:"
echo "   - '[ROOT LOADER]' messages showing loader execution"
echo "   - Any error details if the JSON parsing error persists"
echo "   - Whether the app loads successfully"
