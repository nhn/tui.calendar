import { expect, test } from '@playwright/test';

import { WEEK_VIEW_PAGE_URL } from '../configs';
import { dragAndDrop, getBoundingBox, getTimeGridLineSelector } from '../utils';

// Regression test for #1228
test.describe('Moving events with week.hourStart option', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(WEEK_VIEW_PAGE_URL);
  });

  test('it should be able to move an event when the week.hourStart option is set', async ({
    page,
  }) => {
    // Given
    await page.evaluate(() => {
      window.$cal.setOptions({
        week: {
          hourStart: 4,
        },
      });
    });
    const targetHourTextToMove = '08:00';
    const targetEventLocator = page.locator('text=/short time event/');
    const targetRowLocator = page.locator(getTimeGridLineSelector(targetHourTextToMove));
    const { y: rowY } = await getBoundingBox(targetRowLocator);
    const { x: eventX } = await getBoundingBox(targetEventLocator);

    // When
    await dragAndDrop({
      page,
      sourceLocator: targetEventLocator,
      targetLocator: targetRowLocator,
      options: {
        targetPosition: {
          x: eventX + 10,
          y: 10,
        },
      },
    });

    // Then
    const eventBoundingBoxAfterMoving = await getBoundingBox(targetEventLocator);
    expect(eventBoundingBoxAfterMoving.y).toBeCloseTo(rowY, -1);

    const parentText = await targetEventLocator.evaluate((el) => el?.parentElement?.textContent);
    expect(parentText).toContain(targetHourTextToMove);
  });
});
