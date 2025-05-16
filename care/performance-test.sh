#!/bin/bash

# Performance Testing Script for Care•atin
# Run this script to analyze current performance metrics

echo "🚀 Care•atin Performance Analysis Starting..."
echo "=============================================="

# Check if required tools are installed
command -v lighthouse >/dev/null 2>&1 || { echo "❌ Lighthouse not installed. Run: npm install -g lighthouse"; exit 1; }
command -v bundlemon >/dev/null 2>&1 || { echo "❌ Bundlemon not installed. Run: npm install -g bundlemon"; exit 1; }

# Start development server
echo "🏗️  Starting development server..."
npm run dev &
DEV_PID=$!

# Wait for server to start
echo "⏳ Waiting for server to be ready..."
sleep 10

# Run Lighthouse audit
echo "🔍 Running Lighthouse performance audit..."
lighthouse http://localhost:3000 \
  --only-categories=performance \
  --output=json \
  --output-path=./performance-report.json \
  --chrome-flags="--headless --no-sandbox"

# Extract key metrics
echo "📊 Performance Metrics:"
echo "======================="

# Parse Lighthouse results (requires jq)
if command -v jq >/dev/null 2>&1; then
  PERFORMANCE_SCORE=$(jq '.categories.performance.score * 100' performance-report.json)
  FCP=$(jq '.audits["first-contentful-paint"].displayValue' performance-report.json)
  LCP=$(jq '.audits["largest-contentful-paint"].displayValue' performance-report.json)
  FID=$(jq '.audits["max-potential-fid"].displayValue' performance-report.json)
  CLS=$(jq '.audits["cumulative-layout-shift"].displayValue' performance-report.json)
  
  echo "🎯 Performance Score: ${PERFORMANCE_SCORE}"
  echo "⚡ First Contentful Paint: ${FCP}"
  echo "🖼️  Largest Contentful Paint: ${LCP}"
  echo "👆 First Input Delay: ${FID}"
  echo "📐 Cumulative Layout Shift: ${CLS}"
else
  echo "⚠️  jq not installed. Install it to see detailed metrics."
fi

# Bundle size analysis
echo ""
echo "📦 Bundle Size Analysis:"
echo "======================="

# Build the project
npm run build

# Analyze bundle sizes
echo "📊 Analyzing bundle sizes..."
du -sh build/* | sort -h

# Check for large dependencies
echo ""
echo "🔍 Large Dependencies:"
echo "===================="
npx webpack-bundle-analyzer build/client/_shared/build-* --no-open

# Memory usage check
echo ""
echo "🧠 Memory Usage Check:"
echo "===================="
node -e "
const used = process.memoryUsage();
Object.entries(used).forEach(([key, value]) => {
  console.log(\`\${key}: \${Math.round(value / 1024 / 1024 * 100) / 100} MB\`);
});
"

# Network timing
echo ""
echo "🌐 Network Performance:"
echo "====================="
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:3000

# Create curl format file
cat > curl-format.txt << 'EOF'
     time_namelookup:  %{time_namelookup}s\n
        time_connect:  %{time_connect}s\n
     time_appconnect:  %{time_appconnect}s\n
    time_pretransfer:  %{time_pretransfer}s\n
       time_redirect:  %{time_redirect}s\n
  time_starttransfer:  %{time_starttransfer}s\n
                     ----------\n
          time_total:  %{time_total}s\n
EOF

# Check Core Web Vitals
echo ""
echo "🎯 Core Web Vitals Check:"
echo "========================"

# Create a simple performance test
cat > performance-test.js << 'EOF'
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Enable performance monitoring
  await page.tracing.start({
    path: 'trace.json',
    categories: ['devtools.timeline']
  });
  
  await page.goto('http://localhost:3000', { 
    waitUntil: 'networkidle0',
    timeout: 30000 
  });
  
  await page.tracing.stop();
  
  // Get performance metrics
  const metrics = await page.metrics();
  console.log('📊 Runtime Performance:');
  console.log(`   Heap Used: ${Math.round(metrics.JSHeapUsedSize / 1024 / 1024)} MB`);
  console.log(`   Heap Total: ${Math.round(metrics.JSHeapTotalSize / 1024 / 1024)} MB`);
  console.log(`   Nodes: ${metrics.Nodes}`);
  console.log(`   JS Event Listeners: ${metrics.JSEventListeners}`);
  
  await browser.close();
})();
EOF

# Run performance test if puppeteer is available
if npm list puppeteer >/dev/null 2>&1; then
  node performance-test.js
fi

# Cleanup
echo ""
echo "🧹 Cleaning up..."
kill $DEV_PID 2>/dev/null
rm -f curl-format.txt performance-test.js trace.json

echo ""
echo "✅ Performance analysis complete!"
echo "📄 Detailed report saved to: performance-report.json"
echo ""

# Generate recommendations
echo "💡 Performance Recommendations:"
echo "==============================="
echo "1. 🖼️  Optimize images with WebP format and responsive sizes"
echo "2. 📦 Implement code splitting for non-critical components" 
echo "3. ⚡ Use React.lazy() for heavy interactive sections"
echo "4. 🗂️  Enable Shopify CDN caching for static assets"
echo "5. 🔄 Implement service worker for offline functionality"
echo "6. 📱 Optimize mobile experience with touch-friendly interfaces"
echo "7. 🎯 Reduce Time to Interactive (TTI) by deferring non-critical JS"
echo "8. 🖱️  Minimize First Input Delay (FID) with optimized event handlers"
