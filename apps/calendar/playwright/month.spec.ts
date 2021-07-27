import { expect, test } from '@playwright/test';

// eslint-disable-next-line jest/no-done-callback
test('basic test', async ({ page }) => {
  await page.goto(
    'http://localhost:6006/iframe.html?id=monthview--fixed-events&args=&viewMode=story'
  );
  const eventCount = 4;
  const events = await page.$$('.toastui-calendar-weekday-event');

  expect(events).toHaveLength(eventCount);
});
