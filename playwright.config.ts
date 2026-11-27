import { defineConfig } from '@playwright/test';

const port = 5213;

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${port}`,
    // Local runs use installed Chrome; CI uses Playwright's bundled Chromium.
    channel: process.env.CI ? undefined : 'chrome',
  },
  webServer: {
    command: `npm run preview -- --port ${port}`,
    url: `http://localhost:${port}/Tour/`,
    reuseExistingServer: !process.env.CI,
  },
});
