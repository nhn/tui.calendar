import { expect, test } from '@playwright/test';

import { MONTH_VIEW_PAGE_URL } from '../configs';

test.beforeEach(async ({ page }) => {
  await page.goto(MONTH_VIEW_PAGE_URL);
});

test('basic test', async ({ page }) => {
  const eventsLocator = page.locator('.toastui-calendar-weekday-event');
  const eventsCount = await eventsLocator.count();

  expect(eventsCount).toBe(5);
});
