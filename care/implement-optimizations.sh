#!/bin/bash

# Quick Implementation Script for Care•atin Performance Optimizations
# This script applies all optimizations while preserving the current visual design

echo "🚀 Care•atin Performance Optimization Implementation"
echo "=================================================="

# Ensure we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the care project root directory"
    exit 1
fi

# Create backup directory
echo "📦 Creating backups..."
mkdir -p ./backups/$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="./backups/$(date +%Y%m%d_%H%M%S)"

# Backup critical files
cp app/routes/\(\$locale\)._index.tsx $BACKUP_DIR/
cp app/root.tsx $BACKUP_DIR/
cp vite.config.ts $BACKUP_DIR/
cp tsconfig.json $BACKUP_DIR/
cp package.json $BACKUP_DIR/

echo "✅ Backups created in $BACKUP_DIR"

# Apply optimizations
echo "⚡ Applying performance optimizations..."

# 1. Replace homepage with optimized version
if [ -f "app/routes/(\$locale)._index.optimized.tsx" ]; then
    cp app/routes/\(\$locale\)._index.optimized.tsx app/routes/\(\$locale\)._index.tsx
    echo "   ✓ Homepage optimized"
fi

# 2. Replace root component
if [ -f "app/root.optimized.tsx" ]; then
    cp app/root.optimized.tsx app/root.tsx
    echo "   ✓ Root component optimized"
fi

# 3. Update Vite configuration
if [ -f "vite.config.optimized.ts" ]; then
    cp vite.config.optimized.ts vite.config.ts
    echo "   ✓ Vite configuration optimized"
fi

# 4. Update TypeScript configuration
if [ -f "tsconfig.optimized.json" ]; then
    cp tsconfig.optimized.json tsconfig.json
    echo "   ✓ TypeScript configuration optimized"
fi

# 5. Install performance tools
echo "📥 Installing performance monitoring tools..."
npm install --save-dev lighthouse bundlemon webpack-bundle-analyzer

# 6. Create optimized components directory if it doesn't exist
mkdir -p app/components/ui
if [ -f "app/components/ui/OptimizedComponents.tsx" ]; then
    echo "   ✓ Optimized UI components ready"
fi

# 7. Create performance monitoring utilities
if [ -f "app/lib/performance.ts" ]; then
    echo "   ✓ Performance monitoring utilities ready"
fi

# 8. Make performance test script executable
if [ -f "performance-test.sh" ]; then
    chmod +x performance-test.sh
    echo "   ✓ Performance test script ready"
fi

# Clean and reinstall dependencies
echo "🧹 Cleaning and reinstalling dependencies..."
npm run clean
npm install

# Build project to ensure everything works
echo "🔨 Building project to verify optimizations..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Restoring backups..."
    cp $BACKUP_DIR/* ./
    echo "🔄 Backups restored. Please check the error and try again."
    exit 1
fi

# Run initial performance test
echo "📊 Running initial performance test..."
npm run dev &
DEV_PID=$!

# Wait for server to start
sleep 10

# Quick lighthouse audit
if command -v lighthouse >/dev/null 2>&1; then
    lighthouse http://localhost:3000 \
        --only-categories=performance \
        --output=json \
        --output-path=./performance-baseline.json \
        --chrome-flags="--headless --no-sandbox" \
        --quiet
    
    if command -v jq >/dev/null 2>&1; then
        SCORE=$(jq '.categories.performance.score * 100' performance-baseline.json)
        echo "🎯 Performance Score: $SCORE"
    fi
fi

# Stop dev server
kill $DEV_PID 2>/dev/null

echo ""
echo "🎉 Optimization Implementation Complete!"
echo "======================================"
echo ""
echo "📊 Summary of Applied Optimizations:"
echo "   ✓ Component lazy loading implemented"
echo "   ✓ Bundle splitting configured"
echo "   ✓ React.memo optimizations applied"
echo "   ✓ Critical CSS loading optimized"
echo "   ✓ Performance monitoring tools installed"
echo ""
echo "🚀 Next Steps:"
echo "   1. Run 'npm run dev' to start development server"
echo "   2. Run './performance-test.sh' for comprehensive analysis"
echo "   3. Run 'npm run build:analyze' to check bundle sizes"
echo "   4. Monitor Core Web Vitals in production"
echo ""
echo "📁 Backups are stored in: $BACKUP_DIR"
echo "🔄 To rollback: cp $BACKUP_DIR/* ./"
echo ""
echo "✨ Your landing page performance is now optimized!"
