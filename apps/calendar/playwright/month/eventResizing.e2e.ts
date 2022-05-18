import type { Locator } from '@playwright/test';
import { expect, test } from '@playwright/test';

import { mockMonthViewEventsFixed } from '../../stories/mocks/mockMonthViewEvents';
import { assertBoundingBoxIncluded } from '../assertions';
import { MONTH_VIEW_PAGE_URL } from '../configs';
import {
  dragAndDrop,
  getBoundingBox,
  getCellSelector,
  getHorizontalEventSelector,
  waitForSingleElement,
} from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(MONTH_VIEW_PAGE_URL);
});

const RESIZE_EVENT_SELECTOR = '[class*="dragging--resize-horizontal-event"]';

const [TARGET_EVENT1, TARGET_EVENT2] = mockMonthViewEventsFixed;

function getResizeIconLocatorOfEvent(eventLocator: Locator) {
  return eventLocator.last().locator('data-testid=horizontal-event-resize-icon');
}

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
  const RESIZE_TARGET_SELECTOR = getHorizontalEventSelector(TARGET_EVENT1);

  test('resize event to the right in the same row', async ({ page }) => {
    // Given
    const eventsLocator = page.locator(RESIZE_TARGET_SELECTOR);
    const resizeIconLocator = getResizeIconLocatorOfEvent(eventsLocator);
    const targetCellLocator = page.locator(getCellSelector(19));
    const eventBoundingBoxBeforeResizing = await getBoundingBox(eventsLocator.last());

    // When
    await dragAndDrop({ page, sourceLocator: resizeIconLocator, targetLocator: targetCellLocator });

    // Then
    await expect.poll(() => eventsLocator.count()).toBe(2);

    await expect
      .poll(async () => {
        const eventBoundingBoxAfterResizing = await getBoundingBox(eventsLocator.last());
        return eventBoundingBoxAfterResizing.width;
      })
      .toBeGreaterThan(eventBoundingBoxBeforeResizing.width);

    const targetCellBoundingBox = await getBoundingBox(targetCellLocator);
    const resizeIconBoundingBoxAfterResizing = await getBoundingBox(resizeIconLocator);
    assertBoundingBoxIncluded(resizeIconBoundingBoxAfterResizing, targetCellBoundingBox);
  });

  test('resize event to the left in the same row', async ({ page }) => {
    // Given
    const eventsLocator = page.locator(RESIZE_TARGET_SELECTOR);
    const resizeIconLocator = getResizeIconLocatorOfEvent(eventsLocator);
    const targetCellLocator = page.locator(getCellSelector(14));
    const eventBoundingBoxBeforeResizing = await getBoundingBox(eventsLocator.last());

    // When
    await dragAndDrop({ page, sourceLocator: resizeIconLocator, targetLocator: targetCellLocator });

    // Then
    await expect.poll(() => eventsLocator.count()).toBe(2);

    await expect
      .poll(async () => {
        const eventBoundingBoxAfterResizing = await getBoundingBox(eventsLocator.last());
        return eventBoundingBoxAfterResizing.width;
      })
      .toBeLessThan(eventBoundingBoxBeforeResizing.width);

    const targetCellBoundingBox = await getBoundingBox(targetCellLocator);
    const resizeIconBoundingBoxAfterResizing = await getBoundingBox(resizeIconLocator);
    assertBoundingBoxIncluded(resizeIconBoundingBoxAfterResizing, targetCellBoundingBox);
  });

  test('resize event to the right in the next two rows', async ({ page }) => {
    // Given
    const eventsLocator = page.locator(RESIZE_TARGET_SELECTOR);
    const resizeIconLocator = getResizeIconLocatorOfEvent(eventsLocator);
    const targetCellLocator = page.locator(getCellSelector(31));

    // When
    await dragAndDrop({ page, sourceLocator: resizeIconLocator, targetLocator: targetCellLocator });

    // Then
    await expect.poll(() => eventsLocator.count()).toBe(4);

    const resizeIconBoundingBoxAfterResizing = await getBoundingBox(resizeIconLocator);
    const targetCellBoundingBox = await getBoundingBox(targetCellLocator);
    assertBoundingBoxIncluded(resizeIconBoundingBoxAfterResizing, targetCellBoundingBox);
  });

  test('resize event to the left in the next two rows', async ({ page }) => {
    // Given
    const eventsLocator = page.locator(RESIZE_TARGET_SELECTOR);
    const resizeIconLocator = getResizeIconLocatorOfEvent(eventsLocator);
    const targetCellLocator = page.locator(getCellSelector(28));

    // When
    await dragAndDrop({ page, sourceLocator: resizeIconLocator, targetLocator: targetCellLocator });

    // Then
    await expect.poll(() => eventsLocator.count()).toBe(4);

    const resizeIconBoundingBoxAfterResizing = await getBoundingBox(resizeIconLocator);
    const targetCellBoundingBox = await getBoundingBox(targetCellLocator);
    assertBoundingBoxIncluded(resizeIconBoundingBoxAfterResizing, targetCellBoundingBox);
  });

  test('shrink event - to the end of the first row of rendered events', async ({ page }) => {
    // Given
    const eventsLocator = page.locator(RESIZE_TARGET_SELECTOR);
    const resizeIconLocator = getResizeIconLocatorOfEvent(eventsLocator);
    const targetCellLocator = page.locator(getCellSelector(13));

    // When
    await dragAndDrop({ page, sourceLocator: resizeIconLocator, targetLocator: targetCellLocator });
    await waitForSingleElement(eventsLocator);

    // Then
    const resizeIconBoundingBoxAfterResizing = await getBoundingBox(resizeIconLocator);
    const targetCellBoundingBox = await getBoundingBox(targetCellLocator);
    assertBoundingBoxIncluded(resizeIconBoundingBoxAfterResizing, targetCellBoundingBox);
  });

  test('shrink event - to take place of just one cell', async ({ page }) => {
    // Given
    const eventsLocator = page.locator(RESIZE_TARGET_SELECTOR);
    const resizeIconLocator = getResizeIconLocatorOfEvent(eventsLocator);
    const targetCellLocator = page.locator(getCellSelector(7));

    // When
    await dragAndDrop({ page, sourceLocator: resizeIconLocator, targetLocator: targetCellLocator });
    await waitForSingleElement(eventsLocator);

    // Then
    const resizeIconBoundingBoxAfterResizing = await getBoundingBox(resizeIconLocator);
    const targetCellBoundingBox = await getBoundingBox(targetCellLocator);
    assertBoundingBoxIncluded(resizeIconBoundingBoxAfterResizing, targetCellBoundingBox);
  });

  test('prevent resizing when dragging to above the first row of the event or left of the first cell of the event', async ({
    page,
  }) => {
    // Given
    const eventsLocator = page.locator(RESIZE_TARGET_SELECTOR);
    const resizeIconLocator = getResizeIconLocatorOfEvent(eventsLocator);
    const targetCellLocator = page.locator(getCellSelector(0));
    const expectedCellLocator = page.locator(getCellSelector(16));

    // When
    await dragAndDrop({ page, sourceLocator: resizeIconLocator, targetLocator: targetCellLocator });

    // Then
    await expect.poll(() => eventsLocator.count()).toBe(2);

    const resizeIconBoundingBoxAfterResizing = await getBoundingBox(resizeIconLocator);
    const expectedCellBoundingBox = await getBoundingBox(expectedCellLocator);
    assertBoundingBoxIncluded(resizeIconBoundingBoxAfterResizing, expectedCellBoundingBox);
  });
});

test('When pressing down the ESC key, the resizing event resets to the initial size.', async ({
  page,
}) => {
  // Given
  const eventLocator = page.locator(getHorizontalEventSelector(TARGET_EVENT2));
  const eventBoundingBoxBeforeResize = await getBoundingBox(eventLocator.last());

  const resizeHandlerLocator = getResizeIconLocatorOfEvent(eventLocator);

  const targetCellLocator = page.locator(getCellSelector(20));

  // When
  await dragAndDrop({
    page,
    sourceLocator: resizeHandlerLocator,
    targetLocator: targetCellLocator,
    hold: true,
  });
  await page.keyboard.down('Escape');

  // Then
  const eventBoundingBoxAfterResize = await getBoundingBox(eventLocator);
  expect(eventBoundingBoxAfterResize).toEqual(eventBoundingBoxBeforeResize);
});

test.describe('CSS class for a resize event', () => {
  test('should be applied depending on a dragging state.', async ({ page }) => {
    // Given
    const eventLocator = page.locator(getHorizontalEventSelector(TARGET_EVENT2));
    const resizeHandlerLocator = getResizeIconLocatorOfEvent(eventLocator);
    const resizeHandlerBoundingBox = await getBoundingBox(resizeHandlerLocator);

    const resizeEventClassLocator = page.locator(RESIZE_EVENT_SELECTOR);

    // When (a drag has not started yet)
    await page.mouse.move(resizeHandlerBoundingBox.x + 1, resizeHandlerBoundingBox.y + 3);
    await page.mouse.down();

    // Then
    expect(await resizeEventClassLocator.count()).toBe(0);

    // When (a drag is working)
    await page.mouse.move(resizeHandlerBoundingBox.x + 10, resizeHandlerBoundingBox.y + 50);

    // Then
    expect(await resizeEventClassLocator.count()).toBe(1);

    // When (a drag is finished)
    await page.mouse.up();

    // Then
    expect(await resizeEventClassLocator.count()).toBe(0);
  });

  test('should not be applied when a drag is canceled.', async ({ page }) => {
    // Given
    const eventLocator = page.locator(getHorizontalEventSelector(TARGET_EVENT2));
    const resizeHandlerLocator = getResizeIconLocatorOfEvent(eventLocator);

    const resizeEventClassLocator = page.locator(RESIZE_EVENT_SELECTOR);

    // When
    await dragAndDrop({
      page,
      sourceLocator: resizeHandlerLocator,
      targetLocator: resizeHandlerLocator,
      options: {
        targetPosition: { x: 10, y: 30 },
      },
      hold: true,
    });
    await page.keyboard.down('Escape');

    // Then
    expect(await resizeEventClassLocator.count()).toBe(0);
  });
});
