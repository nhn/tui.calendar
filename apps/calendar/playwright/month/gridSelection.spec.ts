import { expect, Page, test } from '@playwright/test';

import {
  assertAccumulatedDayGridSelectionMatching,
  assertDayGridSelectionMatching,
} from '../assertions';
import { MONTH_VIEW_PAGE_URL } from '../configs';
import { selectGridCells } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(MONTH_VIEW_PAGE_URL);
});

test.describe('Selection', () => {
  /**
   * Suppose we have the following cells in the month view.
   * Each number represents the index of the cell.
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
    return assertDayGridSelectionMatching(
      page,
      startIndex,
      endIndex,
      '.toastui-calendar-daygrid-cell',
      '.toastui-calendar-weekday > .toastui-calendar-daygrid-grid-selection'
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

  test('event form popup with grid selection', async ({ page }) => {
    await selectMonthGridCells(page, 28, 34);

    const floatingLayer = page.locator('css=[role=dialog]');

    expect(floatingLayer).not.toBeNull();
  });

  test.describe('Accumulated grid selection', () => {
    test('select 2 cells in each week', async ({ page }) => {
      await selectMonthGridCells(page, 21, 23);
      await selectMonthGridCells(page, 28, 30);

      await assertAccumulatedDayGridSelectionMatching(page, 21, 23, 0, false);
      await assertAccumulatedDayGridSelectionMatching(page, 28, 30, 1, false);
    });

    test('select 2 cells across 2 weeks', async ({ page }) => {
      await selectMonthGridCells(page, 13, 14);
      await selectMonthGridCells(page, 20, 21);

      await assertAccumulatedDayGridSelectionMatching(page, 13, 14, 0, true);
      await assertAccumulatedDayGridSelectionMatching(page, 20, 21, 2, true);
    });

    test('select cell across 2 weeks and select cell in 1 week', async ({ page }) => {
      await selectMonthGridCells(page, 13, 14);
      await selectMonthGridCells(page, 24, 25);

      await assertAccumulatedDayGridSelectionMatching(page, 13, 14, 0, true);
      await assertAccumulatedDayGridSelectionMatching(page, 24, 25, 2, false);
    });
  });
});
