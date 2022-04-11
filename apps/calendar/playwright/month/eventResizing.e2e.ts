import type { Locator } from '@playwright/test';
import { expect, test } from '@playwright/test';

import { assertBoundingBoxIncluded } from '../assertions';
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

  // target event is rendered from #7 to #16
  const RESIZE_TARGET_SELECTOR = 'data-testid=0-event1';

  function getResizeIconOfEvent(eventLocator: Locator) {
    return eventLocator.last().locator('data-testid=horizontal-event-resize-icon');
  }

  function getTargetCellSelector(cellIndex: number) {
    return `${CELL_SELECTOR} >> nth=${cellIndex}`;
  }

  test('resize event to the right in the same row', async ({ page }) => {
    // Given
    const renderedEventsLocator = page.locator(RESIZE_TARGET_SELECTOR);
    const resizeIconLocator = getResizeIconOfEvent(renderedEventsLocator);
    const targetCellLocator = page.locator(getTargetCellSelector(19));

    // When
    await dragAndDrop(resizeIconLocator, targetCellLocator);

    // Then
    expect(await renderedEventsLocator.count()).toBe(2);

    const targetCellBoundingBox = await getBoundingBox(targetCellLocator);
    const resizeIconBoundingBoxAfterResizing = await getBoundingBox(resizeIconLocator);
    assertBoundingBoxIncluded(resizeIconBoundingBoxAfterResizing, targetCellBoundingBox);
  });

  test('resize event to the left in the same row', async ({ page }) => {
    // Given
    const renderedEventsLocator = page.locator(RESIZE_TARGET_SELECTOR);
    const resizeIconLocator = getResizeIconOfEvent(renderedEventsLocator);
    const targetCellLocator = page.locator(getTargetCellSelector(14));

    // When
    await dragAndDrop(resizeIconLocator, targetCellLocator);

    // Then
    expect(await renderedEventsLocator.count()).toBe(2);

    const targetCellBoundingBox = await getBoundingBox(targetCellLocator);
    const resizeIconBoundingBoxAfterResizing = await getBoundingBox(resizeIconLocator);
    assertBoundingBoxIncluded(resizeIconBoundingBoxAfterResizing, targetCellBoundingBox);
  });

  test('resize event to the right in the next two rows', async ({ page }) => {
    // Given
    const renderedEventsLocator = page.locator(RESIZE_TARGET_SELECTOR);
    const resizeIconLocator = getResizeIconOfEvent(renderedEventsLocator);
    const targetCellLocator = page.locator(getTargetCellSelector(31));

    // When
    await dragAndDrop(resizeIconLocator, targetCellLocator);

    // Then
    expect(await renderedEventsLocator.count()).toBe(4);

    const resizeIconBoundingBoxAfterResizing = await getBoundingBox(resizeIconLocator);
    const targetCellBoundingBox = await getBoundingBox(targetCellLocator);
    assertBoundingBoxIncluded(resizeIconBoundingBoxAfterResizing, targetCellBoundingBox);
  });

  test('resize event to the left in the next two rows', async ({ page }) => {
    // Given
    const eventsLocator = page.locator(RESIZE_TARGET_SELECTOR);
    const resizeIconLocator = getResizeIconOfEvent(eventsLocator);
    const targetCellLocator = page.locator(getTargetCellSelector(28));

    // When
    await dragAndDrop(resizeIconLocator, targetCellLocator);

    // Then
    expect(await eventsLocator.count()).toBe(4);

    const resizeIconBoundingBoxAfterResizing = await getBoundingBox(resizeIconLocator);
    const targetCellBoundingBox = await getBoundingBox(targetCellLocator);
    assertBoundingBoxIncluded(resizeIconBoundingBoxAfterResizing, targetCellBoundingBox);
  });

  test('shrink event - to the end of the first row of rendered events', async ({ page }) => {
    // Given
    const eventsLocator = page.locator(RESIZE_TARGET_SELECTOR);
    const resizeIconLocator = getResizeIconOfEvent(eventsLocator);
    const targetCellLocator = page.locator(getTargetCellSelector(13));

    // When
    await dragAndDrop(resizeIconLocator, targetCellLocator);

    // Then
    expect(await eventsLocator.count()).toBe(1);

    const resizeIconBoundingBoxAfterResizing = await getBoundingBox(resizeIconLocator);
    const targetCellBoundingBox = await getBoundingBox(targetCellLocator);
    assertBoundingBoxIncluded(resizeIconBoundingBoxAfterResizing, targetCellBoundingBox);
  });

  test('shrink event - to take place of just one cell', async ({ page }) => {
    // Given
    const eventsLocator = page.locator(RESIZE_TARGET_SELECTOR);
    const resizeIconLocator = getResizeIconOfEvent(eventsLocator);
    const targetCellLocator = page.locator(getTargetCellSelector(7));

    // When
    await dragAndDrop(resizeIconLocator, targetCellLocator);

    // Then
    expect(await eventsLocator.count()).toBe(1);

    const resizeIconBoundingBoxAfterResizing = await getBoundingBox(resizeIconLocator);
    const targetCellBoundingBox = await getBoundingBox(targetCellLocator);
    assertBoundingBoxIncluded(resizeIconBoundingBoxAfterResizing, targetCellBoundingBox);
  });

  test('prevent resizing when dragging to above the first row of the event or left of the first cell of the event', async ({
    page,
  }) => {
    // Given
    const eventsLocator = page.locator(RESIZE_TARGET_SELECTOR);
    const resizeIconLocator = getResizeIconOfEvent(eventsLocator);
    const targetCellLocator = page.locator(getTargetCellSelector(0));
    const expectedCellLocator = page.locator(getTargetCellSelector(16));

    // When
    await dragAndDrop(resizeIconLocator, targetCellLocator);

    // Then
    expect(await eventsLocator.count()).toBe(2);

    const resizeIconBoundingBoxAfterResizing = await getBoundingBox(resizeIconLocator);
    const expectedCellBoundingBox = await getBoundingBox(expectedCellLocator);
    assertBoundingBoxIncluded(resizeIconBoundingBoxAfterResizing, expectedCellBoundingBox);
  });
});
