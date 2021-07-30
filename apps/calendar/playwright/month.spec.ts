import { expect, test } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto(
    'http://localhost:6006/iframe.html?id=monthview--fixed-events&args=&viewMode=story'
  );
  const events = await page.$$('.toastui-calendar-weekday-event');

  expect(events).toHaveLength(4);
});
