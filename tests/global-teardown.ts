import { FullConfig } from '@playwright/test';

/**
 * Global teardown for Playwright tests
 * Runs once after all tests complete
 */
async function globalTeardown(config: FullConfig) {
  console.log('🧹 Starting global test teardown...');
  
  try {
    // Calculate test duration
    const startTime = parseInt(process.env.TEST_START_TIME || '0');
    const duration = Date.now() - startTime;
    
    console.log(`⏱️ Total test duration: ${Math.round(duration / 1000)}s`);
    
    // Generate test summary
    console.log('\n📊 TEST SUMMARY');
    console.log('================');
    console.log(`Base URL: ${process.env.TEST_BASE_URL}`);
    console.log(`Test Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    
    // Clean up environment variables
    delete process.env.TEST_START_TIME;
    delete process.env.TEST_BASE_URL;
    
    console.log('✅ Global teardown completed successfully');
    
  } catch (error) {
    console.error('❌ Global teardown failed:', error);
  }
}

export default globalTeardown;
