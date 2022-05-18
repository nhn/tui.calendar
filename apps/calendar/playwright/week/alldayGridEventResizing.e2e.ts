import type { Locator } from '@playwright/test';
import { expect, test } from '@playwright/test';

import { mockWeekViewEvents } from '../../stories/mocks/mockWeekViewEvents';
import { WEEK_VIEW_PAGE_URL } from '../configs';
import {
  dragAndDrop,
  getBoundingBox,
  getHorizontalEventSelector,
  getPrefixedClassName,
} from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(WEEK_VIEW_PAGE_URL);
});

const ALL_DAY_GRID_CELL_SELECTOR = `${getPrefixedClassName(
  'panel'
)}:has-text("All Day") ${getPrefixedClassName('panel-grid')}`;
const RESIZE_HANDLER_SELECTOR = getPrefixedClassName('handle-y');
const RESIZE_EVENT_SELECTOR = '[class*="dragging--resize-horizontal-event"]';

const [TARGET_EVENT] = mockWeekViewEvents.filter(({ isAllday }) => isAllday);
const TARGET_EVENT_SELECTOR = getHorizontalEventSelector(TARGET_EVENT);

async function getWidth(locator: Locator) {
  const boundingBox = await getBoundingBox(locator);

  return boundingBox.width;
}

/**
 * Suppose we have the following cells in the week view.
 * Each number represents the index of the cell.
 *
 * [ 0,  1,  2,  3,  4,  5,  6]
 */
test('resizing allday grid row event from left to right', async ({ page }) => {
  // Given
  const targetEventLocator = page.locator(TARGET_EVENT_SELECTOR);
  const boundingBoxBeforeResizing = await getBoundingBox(targetEventLocator);
  const resizerLocator = targetEventLocator.locator(RESIZE_HANDLER_SELECTOR);
  const endOfWeekCellLocator = page.locator(ALL_DAY_GRID_CELL_SELECTOR).last();

  // When
  await dragAndDrop({ page, sourceLocator: resizerLocator, targetLocator: endOfWeekCellLocator });

  // Then
  await expect
    .poll(() => getWidth(targetEventLocator))
    .toBeGreaterThan(boundingBoxBeforeResizing.width);
});

test.describe('When pressing down the ESC key', () => {
  test('the resizing event resets to the initial size.', async ({ page }) => {
    // Given
    const eventLocator = page.locator(TARGET_EVENT_SELECTOR);
    const eventBoundingBoxBeforeResize = await getBoundingBox(eventLocator);

    const resizeHandlerLocator = eventLocator.locator(RESIZE_HANDLER_SELECTOR);

    const targetCellLocator = page.locator(ALL_DAY_GRID_CELL_SELECTOR).nth(4);

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
});

test.describe('CSS class for a resize event', () => {
  test('should be applied depending on a dragging state.', async ({ page }) => {
    // Given
    const eventLocator = page.locator(TARGET_EVENT_SELECTOR);
    const resizeHandlerLocator = eventLocator.locator(RESIZE_HANDLER_SELECTOR);
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
    const eventLocator = page.locator(TARGET_EVENT_SELECTOR);
    const resizeHandlerLocator = eventLocator.locator(RESIZE_HANDLER_SELECTOR);

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
