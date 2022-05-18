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
const MOVE_EVENT_SELECTOR = '[class*="dragging--move-event"]';

const [TARGET_EVENT] = mockWeekViewEvents.filter(({ isAllday }) => isAllday);
const TARGET_EVENT_SELECTOR = getHorizontalEventSelector(TARGET_EVENT);

async function getX(locator: Locator) {
  const boundingBox = await getBoundingBox(locator);

  return boundingBox.x;
}

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
test('moving allday grid row event from left to right', async ({ page }) => {
  // Given
  const targetEventLocator = page.locator(TARGET_EVENT_SELECTOR);
  const boundingBoxBeforeMoving = await getBoundingBox(targetEventLocator);
  const fifthOfWeekCellLocator = page.locator(ALL_DAY_GRID_CELL_SELECTOR).nth(4);

  // When
  await dragAndDrop({
    page,
    sourceLocator: targetEventLocator,
    targetLocator: fifthOfWeekCellLocator,
  });

  // Then
  await expect.poll(() => getX(targetEventLocator)).toBeGreaterThan(boundingBoxBeforeMoving.x);
  await expect
    .poll(() => getWidth(targetEventLocator))
    .toBeCloseTo(boundingBoxBeforeMoving.width, 3);
});

test.describe('moving allday grid row event when moving by holding the middle or end', () => {
  test('holding middle of event', async ({ page }) => {
    // Given
    const targetEventLocator = page.locator(TARGET_EVENT_SELECTOR);
    const boundingBoxBeforeMoving = await getBoundingBox(targetEventLocator);
    const fourthOfWeekCellLocator = page.locator(ALL_DAY_GRID_CELL_SELECTOR).nth(3);

    // When
    await dragAndDrop({
      page,
      sourceLocator: targetEventLocator,
      targetLocator: fourthOfWeekCellLocator,
    });

    // Then
    await expect
      .poll(() => getX(targetEventLocator))
      .toBeCloseTo(boundingBoxBeforeMoving.x + (boundingBoxBeforeMoving.width * 2) / 3, 1);
    await expect
      .poll(() => getX(targetEventLocator))
      .toBeLessThan(boundingBoxBeforeMoving.x + boundingBoxBeforeMoving.width);
  });

  test('holding end of event', async ({ page }) => {
    // Given
    const targetEventLocator = page.locator(TARGET_EVENT_SELECTOR);
    const boundingBoxBeforeMoving = await getBoundingBox(targetEventLocator);
    const fourthOfWeekCellLocator = page.locator(ALL_DAY_GRID_CELL_SELECTOR).nth(3);

    // When
    await dragAndDrop({
      page,
      sourceLocator: targetEventLocator,
      targetLocator: fourthOfWeekCellLocator,
      options: {
        sourcePosition: {
          x: (boundingBoxBeforeMoving.width * 5) / 6,
          y: boundingBoxBeforeMoving.height / 2,
        },
      },
    });

    // Then
    await expect
      .poll(() => getX(targetEventLocator))
      .toBeCloseTo(boundingBoxBeforeMoving.x + boundingBoxBeforeMoving.width / 3, 1);
    await expect
      .poll(() => getX(targetEventLocator))
      .toBeLessThan(boundingBoxBeforeMoving.x + boundingBoxBeforeMoving.width);
  });
});

test('When pressing down the ESC key, the moving event resets to the initial position.', async ({
  page,
}) => {
  // Given
  const eventLocator = page.locator(TARGET_EVENT_SELECTOR);
  const eventBoundingBoxBeforeMove = await getBoundingBox(eventLocator);

  const targetCellLocator = page.locator(ALL_DAY_GRID_CELL_SELECTOR).nth(4);

  // When
  await dragAndDrop({
    page,
    sourceLocator: eventLocator,
    targetLocator: targetCellLocator,
    hold: true,
  });
  await page.keyboard.down('Escape');

  // Then
  const eventBoundingBoxAfterMove = await getBoundingBox(eventLocator);
  expect(eventBoundingBoxAfterMove).toEqual(eventBoundingBoxBeforeMove);
});

test.describe('CSS class for a move event', () => {
  test('should be applied depending on a dragging state.', async ({ page }) => {
    // Given
    const eventLocator = page.locator(TARGET_EVENT_SELECTOR);
    const eventBoundingBox = await getBoundingBox(eventLocator);
    const moveEventClassLocator = page.locator(MOVE_EVENT_SELECTOR);

    // When (a drag has not started yet)
    await page.mouse.move(eventBoundingBox.x + 10, eventBoundingBox.y + 10);
    await page.mouse.down();

    // Then
    expect(await moveEventClassLocator.count()).toBe(0);

    // When (a drag is working)
    await page.mouse.move(eventBoundingBox.x + 10, eventBoundingBox.y + 50);

    // Then
    expect(await moveEventClassLocator.count()).toBe(1);

    // When (a drag is finished)
    await page.mouse.up();

    // Then
    expect(await moveEventClassLocator.count()).toBe(0);
  });

  test('should not be applied when a drag is canceled.', async ({ page }) => {
    // Given
    const eventLocator = page.locator(TARGET_EVENT_SELECTOR);
    const moveEventClassLocator = page.locator(MOVE_EVENT_SELECTOR);

    // When
    await dragAndDrop({
      page,
      sourceLocator: eventLocator,
      targetLocator: eventLocator,
      options: {
        targetPosition: { x: 10, y: 30 },
      },
    });
    await page.keyboard.down('Escape');

    // Then
    expect(await moveEventClassLocator.count()).toBe(0);
  });
});
