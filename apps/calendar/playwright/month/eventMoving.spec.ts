import { expect, test } from '@playwright/test';

import { assertMonthEventMovingMatching } from '../assertions';
import { MONTH_VIEW_PAGE_URL } from '../configs';
import { BoundingBox } from '../types';
import { dragAndDrop, getBoundingBox } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(MONTH_VIEW_PAGE_URL);
});

test.describe('event moving', () => {
  let cellBoundingBox: BoundingBox;

  test.beforeEach(async ({ page }) => {
    const cellLocator = page.locator('.toastui-calendar-daygrid-cell >> nth=0');
    cellBoundingBox = await getBoundingBox(cellLocator);
  });

  test('moving month grid event to right', async ({ page }) => {
    await assertMonthEventMovingMatching(page, {
      x: cellBoundingBox.width + 5,
      y: 0,
    });
  });

  test('moving month grid event to left', async ({ page }) => {
    await assertMonthEventMovingMatching(page, {
      x: -cellBoundingBox.width - 5,
      y: 0,
    });
  });

  test('moving month grid event to bottom', async ({ page }) => {
    await assertMonthEventMovingMatching(page, {
      x: 0,
      y: cellBoundingBox.height + 5,
    });
  });

  test('moving month grid event to top', async ({ page }) => {
    await assertMonthEventMovingMatching(page, {
      x: 0,
      y: -cellBoundingBox.height - 5,
    });
  });

  test('moving month grid event to end of week', async ({ page }) => {
    const targetEventLocator = page.locator(
      '.toastui-calendar-weekday-event-block:has-text("event2")'
    );
    const boundingBoxBeforeMoving = await getBoundingBox(targetEventLocator);

    await dragAndDrop(page, targetEventLocator, {
      x: boundingBoxBeforeMoving.x + cellBoundingBox.width * 5,
      y: boundingBoxBeforeMoving.y,
    });

    const targetEventsCount = await page
      .locator('.toastui-calendar-weekday-event-block:has-text("event2")')
      .evaluateAll((events) => events.length);

    expect(targetEventsCount).toBe(2);
  });
});
