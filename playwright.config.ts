import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: 'apps/calendar/playwright',
  timeout: 30000,
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? 2 : undefined,
  use: {
    headless: false,
    screenshot: 'only-on-failure',
  },
};

export default config;
