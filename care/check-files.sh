#!/bin/bash

echo "🔍 Checking for problematic files..."

# Check for any backup files
if find . -name "*.backup" 2>/dev/null | grep -q .; then
    echo "❌ Found backup files:"
    find . -name "*.backup"
else
    echo "✅ No backup files found"
fi

# Check for optimized files in app directory (excluding node_modules)
if find app -name "*optimized*" 2>/dev/null | grep -q .; then
    echo "❌ Found optimized files in app directory:"
    find app -name "*optimized*"
else
    echo "✅ No optimized files in app directory"
fi

# Check specific route file exists
if [ -f "app/routes/(\$locale)._index.tsx" ]; then
    echo "✅ Main index file exists"
else
    echo "❌ Main index file missing"
fi

# Check for any files with problematic names
echo ""
echo "Files in routes directory:"
ls -la app/routes/ | grep -E "(index|optimized|backup)"

echo ""
echo "✅ File check complete"
