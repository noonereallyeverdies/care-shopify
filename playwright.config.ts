import { defineConfig, devices } from '@playwright/test';

/**
 * Comprehensive Playwright Configuration for Production-Ready Testing
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  
  // Global test timeout
  timeout: 60 * 1000,
  
  // Expect timeout for assertions
  expect: {
    timeout: 10 * 1000,
  },
  
  // Run tests in files in parallel
  fullyParallel: true,
  
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  
  // Retry failed tests on CI
  retries: process.env.CI ? 2 : 1,
  
  // Number of workers
  workers: process.env.CI ? 2 : undefined,
  
  // Multiple reporters for different needs
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list']
  ],
  
  // Global setup and teardown
  globalSetup: require.resolve('./tests/global-setup.ts'),
  globalTeardown: require.resolve('./tests/global-teardown.ts'),
  
  // Output directory for test artifacts
  outputDir: 'test-results',
  
  // Shared settings for all projects
  use: {
    // Base URL to use in tests
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    
    // Collect trace when retrying failed tests
    trace: 'retain-on-failure',
    
    // Take screenshot on failure
    screenshot: 'only-on-failure',
    
    // Record video for failed tests
    video: 'retain-on-failure',
    
    // User agent
    userAgent: 'Playwright Test Agent v1.0 (Production Testing)',
    
    // Ignore HTTPS errors
    ignoreHTTPSErrors: true,
    
    // Accept downloads
    acceptDownloads: true,
    
    // Viewport size
    viewport: { width: 1280, height: 720 },
    
    // Extra HTTP headers
    extraHTTPHeaders: {
      'X-Test-Environment': 'playwright'
    }
  },
  
  // Configure projects for different browsers and scenarios
  projects: [
    // Setup project - runs before all other projects
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
    
    // Desktop browsers
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
    },
    
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      dependencies: ['setup'],
    },
    
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      dependencies: ['setup'],
    },
    
    // Mobile browsers
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
      dependencies: ['setup'],
    },
    
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
      dependencies: ['setup'],
    },
    
    // Tablet testing
    {
      name: 'tablet',
      use: { ...devices['iPad Pro'] },
      dependencies: ['setup'],
    },
    
    // Performance testing project
    {
      name: 'performance',
      testMatch: /.*performance.*\.test\.ts/,
      use: { 
        ...devices['Desktop Chrome'],
        // Slower connection for performance testing
        launchOptions: {
          args: ['--disable-dev-shm-usage', '--disable-extensions']
        }
      },
      dependencies: ['setup'],
      retries: 0, // No retries for performance tests
    },
    
    // API testing project
    {
      name: 'api',
      testMatch: /.*api.*\.test\.ts/,
      use: { 
        ...devices['Desktop Chrome'],
        // Headless for API tests
        headless: true
      },
      dependencies: ['setup'],
    },
    
    // Critical flow testing (highest priority)
    {
      name: 'critical',
      testMatch: /.*critical.*\.test\.ts/,
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
      retries: 3, // More retries for critical tests
    }
  ],
  
  // Configure web server to start before tests
  webServer: [
    {
      command: process.env.CI ? 'npm run build && npm run preview' : 'npm run dev',
      url: process.env.BASE_URL || 'http://localhost:3000',
      reuseExistingServer: !process.env.CI,
      timeout: 120 * 1000,
      stdout: 'pipe',
      stderr: 'pipe',
    }
  ],
});