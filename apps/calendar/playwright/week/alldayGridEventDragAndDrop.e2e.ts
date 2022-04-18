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
  await dragAndDrop(resizerLocator, endOfWeekCellLocator);

  // Then
  const boundingBoxAfterResizing = await getBoundingBox(targetEventLocator);
  expect(boundingBoxBeforeResizing.width).toBeLessThan(boundingBoxAfterResizing.width);
});

test('moving allday grid row event from left to right', async ({ page }) => {
  // Given
  const targetEventLocator = page.locator(TARGET_EVENT_SELECTOR);
  const boundingBoxBeforeMoving = await getBoundingBox(targetEventLocator);
  const fifthOfWeekCellLocator = page.locator(ALL_DAY_GRID_CELL_SELECTOR).nth(4);

  const targetBoundingBox = await getBoundingBox(fifthOfWeekCellLocator);

  // When
  await page.mouse.move(
    boundingBoxBeforeMoving.x + boundingBoxBeforeMoving.width / 2,
    boundingBoxBeforeMoving.y + boundingBoxBeforeMoving.height / 2
  );
  await page.mouse.down();
  await page.mouse.move(
    targetBoundingBox.x + targetBoundingBox.width / 2,
    targetBoundingBox.y + targetBoundingBox.height / 2,
    {
      steps: 20,
    }
  );
  await page.mouse.up();

  // Then
  const boundingBoxAfterMoving = await getBoundingBox(targetEventLocator);
  expect(boundingBoxAfterMoving.x).toBeGreaterThan(boundingBoxBeforeMoving.x);
  expect(boundingBoxAfterMoving.width).toBeCloseTo(boundingBoxBeforeMoving.width, 3);
});
