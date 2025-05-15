// Component Cleanup Test Script
// Run this in the browser console to test component mount/unmount

const testComponentCleanup = (componentName) => {
  console.log(`Testing ${componentName} cleanup...`);
  
  // Mount component
  const startMemory = performance.memory?.usedJSHeapSize || 0;
  console.log(`Initial memory: ${startMemory}`);
  
  // Simulate rapid mount/unmount cycles
  for (let i = 0; i < 10; i++) {
    // This would need to be adapted for actual component mounting
    // React.render() and React.unmount() cycles
  }
  
  // Force garbage collection (if available)
  if (window.gc) {
    window.gc();
  }
  
  // Check final memory
  setTimeout(() => {
    const endMemory = performance.memory?.usedJSHeapSize || 0;
    console.log(`Final memory: ${endMemory}`);
    console.log(`Memory difference: ${endMemory - startMemory}`);
  }, 1000);
};

console.log('Component cleanup tester loaded. Use testComponentCleanup("ComponentName") to test.');
