import { expect, test } from '@playwright/test';

import { MONTH_VIEW_PAGE_URL } from '../configs';

test.beforeEach(async ({ page }) => {
  await page.goto(MONTH_VIEW_PAGE_URL);
});

test.describe('more events popup', () => {
  test('when clicking on "more events" button, popup should be visible', async ({ page }) => {
    await page.click('text=/\\d+ more/i >> nth=0');

    const popupLocator = page.locator('css=[role=dialog]');
    expect(await popupLocator.isVisible()).toBe(true);

    const listLocator = popupLocator.locator('css=[class*=list]');
    const listItemCount = await listLocator.evaluate((list) => list.children.length);

    expect(listItemCount).toBeGreaterThan(0);
  });
});
