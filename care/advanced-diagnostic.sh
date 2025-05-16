#!/bin/bash

echo "🔧 Advanced Diagnostic - Isolating JSON Parse Error"
echo "================================================="

cd /Users/yvonne/Desktop/shopify/care-shopify/care

# Kill all running processes
pkill -f "hydrogen\|mini-oxygen" || true

echo "Step 1: Enabled diagnostic mode in root loader"
echo "Step 2: Creating minimal homepage route for testing"

# Create a minimal homepage route that returns simple JSON
cat > app/routes/\(\$locale\)._index.minimal.tsx << 'EOF'
import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';

export async function loader({context}: LoaderFunctionArgs) {
  console.log('[HOMEPAGE LOADER] Minimal diagnostic loader');
  
  return json({
    message: 'Minimal homepage loaded successfully',
    timestamp: Date.now(),
  });
}

export default function Homepage() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Diagnostic Mode Active</h1>
      <p>If you see this, the JSON parsing error is not in the root or homepage loaders.</p>
      <p>The error must be deeper in the MiniOxygen/Vite pipeline.</p>
    </div>
  );
}
EOF

# Temporarily rename the original homepage route
mv "app/routes/(\$locale)._index.tsx" "app/routes/(\$locale)._index.tsx.backup" 2>/dev/null || true

# Use the minimal route
mv "app/routes/(\$locale)._index.minimal.tsx" "app/routes/(\$locale)._index.tsx"

echo "Step 3: Starting dev server with minimal routes..."
npm run dev