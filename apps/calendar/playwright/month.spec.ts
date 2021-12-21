/* eslint-disable jest/expect-expect */
import { expect, Page, test } from '@playwright/test';

import { assertGridSelectionMatching } from './assertions';
import { selectGridCells } from './utils';

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
  async function selectMonthGridCells(page: Page, startCellIdx: number, endCellIdx: number) {
    await selectGridCells(page, startCellIdx, endCellIdx, '.toastui-calendar-daygrid-cell');
  }

  async function assertMonthGridSelectionMatching(page: Page, startIdx: number, endIdx: number) {
    await assertGridSelectionMatching(page, startIdx, endIdx, '.toastui-calendar-daygrid-cell');
  }

  test('select 2 cells from left to right', async ({ page }) => {
    await selectMonthGridCells(page, 31, 32);

    await assertMonthGridSelectionMatching(page, 31, 32);
  });

  test('select 2 cells from right to left(reverse)', async ({ page }) => {
    await selectMonthGridCells(page, 32, 31);

    await assertMonthGridSelectionMatching(page, 31, 32);
  });

  test('select 2 rows from top to bottom', async ({ page }) => {
    await selectMonthGridCells(page, 25, 32);

    await assertMonthGridSelectionMatching(page, 25, 32);
  });

  test('select 2 rows from bottom to top(reverse)', async ({ page }) => {
    await selectMonthGridCells(page, 32, 25);

    await assertMonthGridSelectionMatching(page, 25, 32);
  });

  test('select entire row', async ({ page }) => {
    await selectMonthGridCells(page, 28, 34);

    await assertMonthGridSelectionMatching(page, 28, 34);
  });
});
