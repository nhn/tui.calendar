import { expect, test } from '@playwright/test';

import { WEEK_VIEW_PAGE_URL } from '../configs';

test.beforeEach(async ({ page }) => {
  await page.goto(WEEK_VIEW_PAGE_URL);
});

test.describe('basic test', () => {
  test('event count', async ({ page }) => {
    const events = await page.$$('.toastui-calendar-weekday-event-block');

    expect(events).toHaveLength(3);
  });
});
