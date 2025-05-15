import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration for more information
 */
export default defineConfig({
  testDir: './e2e/tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. */
  reporter: 'html',
  /* Timeout for each test */
  timeout: 30000,
  /* Shared settings for all the projects below. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3000',
    /* Collect trace when retrying the failed test. */
    trace: 'on-first-retry',
    /* Takes a screenshot on test failure */
    screenshot: 'only-on-failure',
  },

  /* Don't try to start a web server - we'll use the existing one */
  webServer: {
    reuseExistingServer: true,
    command: 'npm run dev',
    url: 'http://localhost:3000',
    timeout: 120 * 1000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
