import type { Locator } from '@playwright/test';
import { expect, test } from '@playwright/test';

import { mockWeekViewEvents } from '../../stories/mocks/mockWeekViewEvents';
import { WEEK_VIEW_PAGE_URL } from '../configs';
import { dragAndDrop, getBoundingBox, getPrefixedClassName } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(WEEK_VIEW_PAGE_URL);
});

const ALL_DAY_GRID_CELL_SELECTOR = `${getPrefixedClassName(
  'panel'
)}:has-text("All Day") ${getPrefixedClassName('panel-grid')}`;

const [{ calendarId, id, title }] = mockWeekViewEvents;
const TARGET_EVENT_SELECTOR = `data-testid=${calendarId}-${id}-${title}`;

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
test('resizing allday grid row event from left to right', async ({ page }) => {
  // Given
  const targetEventLocator = page.locator(TARGET_EVENT_SELECTOR);
  const boundingBoxBeforeResizing = await getBoundingBox(targetEventLocator);
  const resizerLocator = targetEventLocator.locator(getPrefixedClassName('handle-y'));
  const endOfWeekCellLocator = page.locator(ALL_DAY_GRID_CELL_SELECTOR).last();

  // When
  await dragAndDrop(page, resizerLocator, endOfWeekCellLocator);

  // Then
  await expect
    .poll(() => getWidth(targetEventLocator))
    .toBeGreaterThan(boundingBoxBeforeResizing.width);
});

test('moving allday grid row event from left to right', async ({ page }) => {
  // Given
  const targetEventLocator = page.locator(TARGET_EVENT_SELECTOR);
  const boundingBoxBeforeMoving = await getBoundingBox(targetEventLocator);
  const fifthOfWeekCellLocator = page.locator(ALL_DAY_GRID_CELL_SELECTOR).nth(4);
  const targetBoundingBox = await getBoundingBox(fifthOfWeekCellLocator);

  // When
  await dragAndDrop(page, targetEventLocator, fifthOfWeekCellLocator, {
    sourcePosition: {
      x: boundingBoxBeforeMoving.width / 2,
      y: boundingBoxBeforeMoving.height / 2,
    },
    targetPosition: {
      x: targetBoundingBox.width / 2,
      y: targetBoundingBox.height / 2,
    },
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
    const targetBoundingBox = await getBoundingBox(fourthOfWeekCellLocator);

    // When
    await dragAndDrop(page, targetEventLocator, fourthOfWeekCellLocator, {
      sourcePosition: {
        x: boundingBoxBeforeMoving.width / 2,
        y: boundingBoxBeforeMoving.height / 2,
      },
      targetPosition: {
        x: targetBoundingBox.width / 2,
        y: targetBoundingBox.height / 2,
      },
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
    const targetBoundingBox = await getBoundingBox(fourthOfWeekCellLocator);

    // When
    await dragAndDrop(page, targetEventLocator, fourthOfWeekCellLocator, {
      sourcePosition: {
        x: (boundingBoxBeforeMoving.width * 5) / 6,
        y: boundingBoxBeforeMoving.height / 2,
      },
      targetPosition: {
        x: targetBoundingBox.width / 2,
        y: targetBoundingBox.height / 2,
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
