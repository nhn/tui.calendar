import { expect, test } from '@playwright/test';

import { WEEK_VIEW_PAGE_URL } from '../configs';
import { dragAndDrop } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(WEEK_VIEW_PAGE_URL);
});

test.describe('event resizing', () => {
  test('resizing allday grid row event', async ({ page }) => {
    const targetEventLocator = page.locator('.toastui-calendar-weekday-event >> nth=0');
    const boundingBoxBeforeResizing = await targetEventLocator.boundingBox();

    const resizerLocator = page.locator('.toastui-calendar-handle-y >> nth=0');
    const resizerBoundingBox = await resizerLocator.boundingBox();

    if (resizerBoundingBox) {
      const targetX = resizerBoundingBox.x + resizerBoundingBox.width / 2;
      const targetY = resizerBoundingBox.y + resizerBoundingBox.height / 2;

      await dragAndDrop(page, resizerLocator, { x: targetX + 500, y: targetY });
    }

    const boundingBoxAfterResizing = await targetEventLocator.boundingBox();

    if (boundingBoxBeforeResizing && boundingBoxAfterResizing) {
      expect(boundingBoxBeforeResizing.width).toBeLessThan(boundingBoxAfterResizing.width);
    } else {
      test.fail();
    }
  });
});

test.describe('event moving', () => {
  test('moving allday grid row event', async ({ page }) => {
    const cellLocator = page.locator('.toastui-calendar-panel-grid >> nth=0');
    const cellBoundingBox = await cellLocator.boundingBox();

    const targetEventLocator = page.locator(
      '.toastui-calendar-weekday-event-block:has-text("event1")'
    );
    const boundingBoxBeforeMoving = await targetEventLocator.boundingBox();

    if (cellBoundingBox && boundingBoxBeforeMoving) {
      await dragAndDrop(page, targetEventLocator, {
        x: boundingBoxBeforeMoving.x + cellBoundingBox.width + 5,
        y: boundingBoxBeforeMoving.y,
      });
    }

    const boundingBoxAfterMoving = await targetEventLocator.boundingBox();

    if (boundingBoxBeforeMoving && boundingBoxAfterMoving) {
      expect(boundingBoxAfterMoving.x).toBeGreaterThan(boundingBoxBeforeMoving.x);
      expect(boundingBoxAfterMoving.width).toBeCloseTo(boundingBoxBeforeMoving.width, 3);
    } else {
      test.fail();
    }
  });
});
