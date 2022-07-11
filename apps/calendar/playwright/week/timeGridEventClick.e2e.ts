import { expect, test } from '@playwright/test';

import { mockWeekViewEvents } from '../../stories/mocks/mockWeekViewEvents';
import { WEEK_VIEW_PAGE_URL } from '../configs';
import { getBoundingBox, getTimeEventSelector } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(WEEK_VIEW_PAGE_URL);
});

const targetEvents = mockWeekViewEvents.filter(({ isAllday }) => !isAllday);

targetEvents.forEach(({ title }) => {
  test(`Click event: show popup when ${title} is clicked`, async ({ page }) => {
    // Given
    const targetEventSelector = getTimeEventSelector(title);
    const targetEventLocator = page.locator(targetEventSelector).last();
    const targetEventBoundingBox = await getBoundingBox(targetEventLocator);

    // When
    await page.mouse.move(targetEventBoundingBox.x + 2, targetEventBoundingBox.y + 2);
    await page.mouse.down();
    await page.mouse.up();

    // Then
    const detailPopup = page.locator('css=[role=dialog]');
    await expect(detailPopup).toBeVisible();
  });
});
