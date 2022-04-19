import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: 'apps/calendar/playwright',
  testMatch: '*.e2e.ts',
  fullyParallel: true,
  timeout: 30000,
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? 2 : undefined,
  use: {
    trace: process.env.CI ? undefined : 'retain-on-failure',
    viewport: {
      width: 1600,
      height: 900,
    },
  },
  webServer: {
    command: process.env.CI
      ? 'npm run serve:storybook'
      : 'lerna run --scope @toast-ui/calendar storybook',
    port: process.env.CI ? 8080 : 6006,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ].concat(
    process.env.CI
      ? [
          {
            name: 'Safari',
            use: { ...devices['Desktop Safari'] },
          },
          {
            name: 'Firefox',
            use: { ...devices['Desktop Firefox'] },
          },
        ]
      : ([] as any)
  ),
};

export default config;
