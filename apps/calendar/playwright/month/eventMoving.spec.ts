import { expect, Locator, test } from '@playwright/test';

import { MONTH_VIEW_PAGE_URL } from '../configs';
import { dragAndDrop, getBoundingBox } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(MONTH_VIEW_PAGE_URL);
});

test.describe('event moving', () => {
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

  test('moving month grid event to right', async ({ page }) => {
    const targetCellLocator = page.locator('.toastui-calendar-daygrid-cell >> nth=17');
    const targetCellBoundingBox = await getBoundingBox(targetCellLocator);

    const boundingBoxBeforeMoving = await getBoundingBox(eventLocator);
    await dragAndDrop(page, eventLocator, targetCellLocator);
    const boundingBoxAfterMoving = await getBoundingBox(eventLocator);

    expect(boundingBoxAfterMoving.x).toBeGreaterThan(boundingBoxBeforeMoving.x);
    expect(boundingBoxAfterMoving.width).toBeCloseTo(boundingBoxBeforeMoving.width, 3);
    expect(boundingBoxAfterMoving.x).toBeCloseTo(targetCellBoundingBox.x, 1);
    expect(boundingBoxAfterMoving.x).toBeLessThan(
      targetCellBoundingBox.x + targetCellBoundingBox.width
    );
  });

  test('moving month grid event to left', async ({ page }) => {
    const targetCellLocator = page.locator('.toastui-calendar-daygrid-cell >> nth=15');
    const targetCellBoundingBox = await getBoundingBox(targetCellLocator);

    const boundingBoxBeforeMoving = await getBoundingBox(eventLocator);
    await dragAndDrop(page, eventLocator, targetCellLocator);
    const boundingBoxAfterMoving = await getBoundingBox(eventLocator);

    expect(boundingBoxAfterMoving.x).toBeLessThan(boundingBoxBeforeMoving.x);
    expect(boundingBoxAfterMoving.width).toBeCloseTo(boundingBoxBeforeMoving.width, 3);
    expect(boundingBoxAfterMoving.x).toBeCloseTo(targetCellBoundingBox.x, 1);
    expect(boundingBoxAfterMoving.x).toBeLessThan(
      targetCellBoundingBox.x + targetCellBoundingBox.width
    );
  });

  test('moving month grid event to bottom', async ({ page }) => {
    const targetCellLocator = page.locator('.toastui-calendar-daygrid-cell >> nth=23');
    const targetCellBoundingBox = await getBoundingBox(targetCellLocator);

    const boundingBoxBeforeMoving = await getBoundingBox(eventLocator);
    await dragAndDrop(page, eventLocator, targetCellLocator);
    const boundingBoxAfterMoving = await getBoundingBox(eventLocator);

    expect(boundingBoxAfterMoving.y).toBeGreaterThan(boundingBoxBeforeMoving.y);
    expect(boundingBoxAfterMoving.width).toBeCloseTo(boundingBoxBeforeMoving.width, 3);
    expect(boundingBoxAfterMoving.y).toBeGreaterThan(targetCellBoundingBox.y);
    expect(boundingBoxAfterMoving.y).toBeLessThan(
      targetCellBoundingBox.y + targetCellBoundingBox.height
    );
  });

  test('moving month grid event to top', async ({ page }) => {
    const targetCellLocator = page.locator('.toastui-calendar-daygrid-cell >> nth=9');
    const targetCellBoundingBox = await getBoundingBox(targetCellLocator);

    const boundingBoxBeforeMoving = await getBoundingBox(eventLocator);
    await dragAndDrop(page, eventLocator, targetCellLocator);
    const boundingBoxAfterMoving = await getBoundingBox(eventLocator);

    expect(boundingBoxAfterMoving.y).toBeLessThan(boundingBoxBeforeMoving.y);
    expect(boundingBoxAfterMoving.width).toBeCloseTo(boundingBoxBeforeMoving.width, 3);
    expect(boundingBoxAfterMoving.y).toBeGreaterThan(targetCellBoundingBox.y);
    expect(boundingBoxAfterMoving.y).toBeLessThan(
      targetCellBoundingBox.y + targetCellBoundingBox.height
    );
  });

  test('moving month grid event to end of week', async ({ page }) => {
    const endOfWeekCellLocator = page.locator('.toastui-calendar-daygrid-cell >> nth=20');
    const endOfWeekCellBoundingBox = await getBoundingBox(endOfWeekCellLocator);
    const secondOfWeekCellLocator = page.locator('.toastui-calendar-daygrid-cell >> nth=22');
    const secondOfWeekCellBoundingBox = await getBoundingBox(secondOfWeekCellLocator);

    await dragAndDrop(page, eventLocator, endOfWeekCellLocator);

    const targetEventsCount = await eventLocator.evaluateAll((events) => events.length);
    const targetEventLength = await eventLocator.evaluateAll((events) =>
      (events as HTMLElement[]).reduce(
        (total, eventRow) => eventRow.getBoundingClientRect().width + total,
        0
      )
    );

    const firstEventLocator = eventLocator.first();
    const lastEventLocator = eventLocator.last();
    const firstEventBoundingBox = await getBoundingBox(firstEventLocator);
    const lastEventBoundingBox = await getBoundingBox(lastEventLocator);

    expect(targetEventsCount).toBe(2);
    expect(firstEventBoundingBox.x).toBeCloseTo(endOfWeekCellBoundingBox.x, 3);
    expect(lastEventBoundingBox.x).toBeLessThan(
      secondOfWeekCellBoundingBox.x + secondOfWeekCellBoundingBox.width
    );
    expect(firstEventBoundingBox.y).toBeLessThan(secondOfWeekCellBoundingBox.y);
    expect(lastEventBoundingBox.y).toBeGreaterThan(secondOfWeekCellBoundingBox.y);
    expect(targetEventLength).toBeCloseTo(endOfWeekCellBoundingBox.width * 3, 1);
  });
});
