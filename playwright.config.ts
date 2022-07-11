import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const isCI = !!process.env.CI;

const config: PlaywrightTestConfig = {
  testDir: 'apps/calendar/playwright',
  testMatch: '*.e2e.ts',
  fullyParallel: !isCI,
  timeout: 30000,
  forbidOnly: isCI,
  // eslint-disable-next-line no-undefined
  workers: isCI ? 2 : undefined,
  use: {
    trace: isCI ? 'off' : 'retain-on-failure',
    viewport: {
      width: 1600,
      height: 900,
    },
    launchOptions: {
      slowMo: 250,
    },
    timezoneId: 'Asia/Seoul',
  },
  webServer: {
    command: isCI ? 'npm run serve:storybook' : 'npm run storybook --workspace=@toast-ui/calendar',
    port: isCI ? 8080 : 6006,
    timeout: 120 * 1000,
    reuseExistingServer: !isCI,
  },
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Safari',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
};

export default config;
