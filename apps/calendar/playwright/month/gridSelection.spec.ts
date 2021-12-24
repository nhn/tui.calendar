import { Page, test } from '@playwright/test';

import { assertGridSelectionMatching } from '../assertions';
import { MONTH_VIEW_PAGE_URL } from '../configs';
import { selectGridCells } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(MONTH_VIEW_PAGE_URL);
});

test.describe('Selection', () => {
  /**
   * Suppose we have following cells in the month view.
   * Each number represetns the index of the cell.
   *
   * [
   *   [ 0,  1,  2,  3,  4,  5,  6],
   *   [ 7,  8,  9, 10, 11, 12, 13],
   *   [14, 15, 16, 17, 18, 19 ,20],
   *   [21, 22, 23, 24, 25, 26, 27],
   *   [28, 29, 30, 31, 32, 33, 34],
   * ]
   */

  function selectMonthGridCells(page: Page, startCellIndex: number, endCellIndex: number) {
    return selectGridCells(page, startCellIndex, endCellIndex, '.toastui-calendar-daygrid-cell');
  }

  function assertMonthGridSelectionMatching(page: Page, startIndex: number, endIndex: number) {
    return assertGridSelectionMatching(
      page,
      startIndex,
      endIndex,
      '.toastui-calendar-daygrid-cell'
    );
  }

  test('select a cell', async ({ page }) => {
    await selectMonthGridCells(page, 31, 31);

    await assertMonthGridSelectionMatching(page, 31, 31);
  });

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
