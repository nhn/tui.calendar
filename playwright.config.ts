import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: 'apps/calendar/playwright',
  timeout: 30000,
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? 2 : undefined,
  use: {
    trace: process.env.CI ? undefined : 'retain-on-failure',
    viewport: {
      width: 1600,
      height: 900,
    },
    launchOptions: {
      slowMo: 100,
    }
  },
  webServer: {
    command: process.env.CI
      ? 'npm run serve:storybook'
      : 'lerna run --scope @toast-ui/calendar storybook',
    port: process.env.CI ? 8080 : 6006,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
};

export default config;
