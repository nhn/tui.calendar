import { expect, test } from '@playwright/test';

import { MONTH_VIEW_PAGE_URL } from '../configs';
import { getCellSelector, getPrefixedClassName } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(MONTH_VIEW_PAGE_URL);
});

const eventsRowClassName = getPrefixedClassName('weekday-events');

test.describe('visibleEventCount option', () => {
  // In the default viewport, 3 event blocks are visible.
  // 16th cell has 12 events.

  test('when visibleEventCount is set to 0, no events should be visible', async ({ page }) => {
    // Given
    const targetCell = page.locator(getCellSelector(16));
    const events = page.locator(eventsRowClassName).nth(2);

    // When
    await page.evaluate(() => {
      window.$cal.setOptions({
        month: {
          visibleEventCount: 0,
        },
      });
    });

    // Then
    expect(await events.evaluate((_events) => _events.children.length)).toBe(0);

    const moreButton = targetCell.locator('button');
    await expect(moreButton).toHaveText('12 more');
  });

  test('when visibleEventCount is bigger than the content area, it only shows events within the content area', async ({
    page,
  }) => {
    // Given
    const targetCell = page.locator(getCellSelector(16));
    const events = page.locator(eventsRowClassName).nth(2);

    // When
    await page.evaluate(() => {
      window.$cal.setOptions({
        month: {
          visibleEventCount: 10,
        },
      });
    });

    // Then
    expect(await events.evaluate((_events) => _events.children.length)).toBe(3);

    const moreButton = targetCell.locator('button');
    await expect(moreButton).toHaveText('9 more');
  });
});
