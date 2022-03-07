import { expect, test } from '@playwright/test';

import { WEEK_VIEW_PAGE_URL } from '../configs';
import { dragAndDrop, getBoundingBox, getTimeGridLineLocator } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(WEEK_VIEW_PAGE_URL);
});

const TARGET_EVENT_TITLE = 'short time event';
// Target event is located in the fourth row of the time grid.
// And it starts from 04:00.
const targetEventSelector = `[data-testid*="time-event-${TARGET_EVENT_TITLE}"]`;

test('resize event to the bottom', async ({ page }) => {
  // Given
  const eventLocator = page.locator(targetEventSelector);
  const resizeHandlerLocator = eventLocator.locator('[class*="resize-handler"]');
  const targetRowLocator = page.locator(getTimeGridLineLocator('08:00'));
  const targetColumnLocator = page.locator(`data-testid=timegrid-column-4`);
  const eventBoundingBoxBeforeResize = await getBoundingBox(eventLocator);

  const targetColumnBoundingBox = await getBoundingBox(targetColumnLocator);

  // When
  await dragAndDrop(resizeHandlerLocator, targetRowLocator, {
    sourcePosition: {
      x: 1,
      y: 1,
    },
    targetPosition: {
      y: 1,
      x: targetColumnBoundingBox.x - 1,
    },
  });

  // Then
  const eventBoundingBoxAfterResize = await getBoundingBox(eventLocator);
  expect(eventBoundingBoxAfterResize.height).toBeGreaterThan(eventBoundingBoxBeforeResize.height);
});
