import { expect, test } from '@playwright/test';

import { WEEK_VIEW_PAGE_URL } from '../configs';
import { dragAndDrop, getBoundingBox } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(WEEK_VIEW_PAGE_URL);
});

test.describe('event resizing', () => {
  /**
   * Suppose we have the following cells in the week view.
   * Each number represents the index of the cell.
   *
   * [ 0,  1,  2,  3,  4,  5,  6]
   */

  test('resizing allday grid row event', async ({ page }) => {
    const targetEventLocator = page.locator('.toastui-calendar-weekday-event >> nth=0');
    const boundingBoxBeforeResizing = await getBoundingBox(targetEventLocator);

    const resizerLocator = page.locator('.toastui-calendar-handle-y >> nth=0');
    const endOfWeekCellLocator = page.locator('.toastui-calendar-panel-grid >> nth=6');

    await dragAndDrop(page, resizerLocator, endOfWeekCellLocator);

    const boundingBoxAfterResizing = await getBoundingBox(targetEventLocator);

    expect(boundingBoxBeforeResizing.width).toBeLessThan(boundingBoxAfterResizing.width);
  });
});

test.describe('event moving', () => {
  test('moving allday grid row event', async ({ page }) => {
    const targetEventLocator = page.locator('data-test-id=cal1-1-event1');
    const boundingBoxBeforeMoving = await getBoundingBox(targetEventLocator);

    const secondOfWeekCellLocator = page.locator('.toastui-calendar-panel-grid >> nth=1');

    await dragAndDrop(page, targetEventLocator, secondOfWeekCellLocator);

    const boundingBoxAfterMoving = await getBoundingBox(targetEventLocator);

    expect(boundingBoxAfterMoving.x).toBeGreaterThan(boundingBoxBeforeMoving.x);
    expect(boundingBoxAfterMoving.width).toBeCloseTo(boundingBoxBeforeMoving.width, 3);
  });
});
