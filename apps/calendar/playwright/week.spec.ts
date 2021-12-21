/* eslint-disable jest/expect-expect */
import { expect, Page, test } from '@playwright/test';

import { assertGridSelectionMatching } from './assertions';
import { dragAndDrop, selectGridCells } from './utils';

const WEEK_VIEW_PAGE_URL =
  'http://localhost:6006/iframe.html?id=weekview--fixed-events&args=&viewMode=story';

test.beforeEach(async ({ page }) => {
  await page.goto(WEEK_VIEW_PAGE_URL);
});

test.describe('basic test', () => {
  test('event count', async ({ page }) => {
    const events = await page.$$('.toastui-calendar-weekday-event-block');

    expect(events).toHaveLength(3);
  });
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
      // NOTE: Handling re-render timing issue
      await targetEventLocator.hover();
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

    const targetEventLocator = page.locator('.toastui-calendar-handle-y >> nth=0');
    const boundingBoxBeforeMoving = await targetEventLocator.boundingBox();

    if (cellBoundingBox && boundingBoxBeforeMoving) {
      await dragAndDrop(page, targetEventLocator, {
        x: boundingBoxBeforeMoving.x + cellBoundingBox.width + 5,
        y: boundingBoxBeforeMoving.y,
      });
      // NOTE: Handling re-render timing issue
      await targetEventLocator.hover();
    }

    const boundingBoxAfterMoving = await targetEventLocator.boundingBox();

    if (boundingBoxBeforeMoving && boundingBoxAfterMoving) {
      expect(boundingBoxAfterMoving.x).toBeGreaterThan(boundingBoxBeforeMoving.x);
      expect(Math.floor(boundingBoxAfterMoving.width)).toEqual(
        Math.floor(boundingBoxBeforeMoving.width)
      );
    } else {
      test.fail();
    }
  });

  test.describe('Selection', () => {
    async function selectWeekGridCells(page: Page, startCellIdx: number, endCellIdx: number) {
      await selectGridCells(page, startCellIdx, endCellIdx, '.toastui-calendar-panel-grid');
    }

    async function assertWeekGridSelectionMatching(page: Page, startIdx: number, endIdx: number) {
      await assertGridSelectionMatching(page, startIdx, endIdx, '.toastui-calendar-panel-grid');
    }

    test('select 2 cells from left to right', async ({ page }) => {
      await selectWeekGridCells(page, 14, 15);

      await assertWeekGridSelectionMatching(page, 14, 15);
    });

    test('select 2 cells from right to left(reverse)', async ({ page }) => {
      await selectWeekGridCells(page, 15, 14);

      await assertWeekGridSelectionMatching(page, 14, 15);
    });
  });
});
