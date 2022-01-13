import { expect, Locator, test } from '@playwright/test';

import { MONTH_VIEW_PAGE_URL } from '../configs';
import { dragAndDrop, getBoundingBox } from '../utils';

const CELL_SELECTOR = '.toastui-calendar-daygrid-cell';

test.beforeEach(async ({ page }) => {
  await page.goto(MONTH_VIEW_PAGE_URL);
});

test.describe('event resizing', () => {
  /**
   * Suppose we have the following cells in the month view.
   * Each number represents the index of the cell.
   *
   * [
   *   [ 0,  1,  2,  3,  4,  5,  6],
   *   [ 7,  8,  9, 10, 11, 12, 13],
   *   [14, 15, 16, 17, 18, 19 ,20],
   *   [21, 22, 23, 24, 25, 26, 27],
   *   [28, 29, 30, 31, 32, 33, 34],
   * ]
   */
  let eventLocator: Locator;

  test.beforeEach(({ page }) => {
    // NOTE: 'event2' is started at cell #16
    eventLocator = page.locator('data-test-id=1-event2');
  });

  test('resize event to the right', async ({ page }) => {
    const boundingBoxBeforeResizing = await getBoundingBox(eventLocator);
    const resizeIconLocator = eventLocator.locator('[data-test-id=horizontal-event-resize-icon]');
    const targetCellLocator = page.locator(`${CELL_SELECTOR} >> nth=19`);

    await dragAndDrop(page, resizeIconLocator, targetCellLocator);

    const boundingBoxAfterResizing = await getBoundingBox(eventLocator);

    expect(boundingBoxAfterResizing.width).toBeGreaterThan(boundingBoxBeforeResizing.width);
  });
});
