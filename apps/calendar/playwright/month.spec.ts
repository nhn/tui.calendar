/* eslint-disable jest/expect-expect */
import { expect, Page, test } from '@playwright/test';

import { assertGridSelectionMatching } from './assertions';
import { dragAndDrop } from './utils';

const MONTH_VIEW_PAGE_URL =
  'http://localhost:6006/iframe.html?id=monthview--fixed-events&args=&viewMode=story';

test.beforeEach(async ({ page }) => {
  await page.goto(MONTH_VIEW_PAGE_URL);
});

test('basic test', async ({ page }) => {
  const events = await page.$$('.toastui-calendar-weekday-event');

  expect(events).toHaveLength(4);
});

test.describe('Selection', () => {
  async function selectGridCells(page: Page, startCellIdx: number, endCellIdx: number) {
    const startCellLocator = page.locator('.toastui-calendar-daygrid-cell').nth(startCellIdx);
    const endCellLocator = page.locator('.toastui-calendar-daygrid-cell').nth(endCellIdx);

    const endCellBoundingBox = await endCellLocator.boundingBox();

    if (endCellBoundingBox) {
      await dragAndDrop(page, startCellLocator, {
        x: endCellBoundingBox.x + 10,
        y: endCellBoundingBox.y + 10,
      });
    }
  }

  test('select 2 cells from left to right', async ({ page }) => {
    await selectGridCells(page, 31, 32);

    await assertGridSelectionMatching(page, 31, 32);
  });

  test('select 2 rows from top to bottom', async ({ page }) => {
    await selectGridCells(page, 25, 32);

    await assertGridSelectionMatching(page, 25, 32);
  });

  test('select 2 rows from bottom to top(reverse)', async ({ page }) => {
    await selectGridCells(page, 32, 25);

    await assertGridSelectionMatching(page, 25, 32);
  });

  test('select entire row', async ({ page }) => {
    await selectGridCells(page, 28, 34);

    await assertGridSelectionMatching(page, 28, 34);
  });
});
