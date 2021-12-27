import { expect, test } from '@playwright/test';

import { assertMonthEventMovingMatching } from '../assertions';
import { MONTH_VIEW_PAGE_URL } from '../configs';
import { dragAndDrop } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(MONTH_VIEW_PAGE_URL);
});

test.describe('event moving', () => {
  type BoundingBox = {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  let cellBoundingBox: BoundingBox | null;

  test.beforeEach(async ({ page }) => {
    const cellLocator = page.locator('.toastui-calendar-daygrid-cell >> nth=0');
    cellBoundingBox = await cellLocator.boundingBox();
  });

  test('moving month grid event to right', async ({ page }) => {
    if (cellBoundingBox) {
      await assertMonthEventMovingMatching(page, {
        x: cellBoundingBox.width + 5,
        y: 0,
      });
    } else {
      test.fail();
    }
  });

  test('moving month grid event to left', async ({ page }) => {
    if (cellBoundingBox) {
      await assertMonthEventMovingMatching(page, {
        x: -cellBoundingBox.width - 5,
        y: 0,
      });
    }
  });

  test('moving month grid event to bottom', async ({ page }) => {
    if (cellBoundingBox) {
      await assertMonthEventMovingMatching(page, {
        x: 0,
        y: cellBoundingBox.y * 2,
      });
    }
  });

  test('moving month grid event to top', async ({ page }) => {
    if (cellBoundingBox) {
      await assertMonthEventMovingMatching(page, {
        x: 0,
        y: -cellBoundingBox.y * 2,
      });
    }
  });

  test('moving month grid event to end of week', async ({ page }) => {
    const targetEventLocator = page.locator(
      '.toastui-calendar-weekday-event-block:has-text("event2")'
    );
    const boundingBoxBeforeMoving = await targetEventLocator.boundingBox();

    if (cellBoundingBox && boundingBoxBeforeMoving) {
      await dragAndDrop(page, targetEventLocator, {
        x: boundingBoxBeforeMoving.x + cellBoundingBox.width * 5,
        y: boundingBoxBeforeMoving.y,
      });
    } else {
      test.fail();
    }

    const targetEvents = await page.$$('.toastui-calendar-weekday-event-block:has-text("event2")');

    expect(targetEvents).toHaveLength(2);
  });
});
