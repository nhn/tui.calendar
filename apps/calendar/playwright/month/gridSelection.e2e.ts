import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

import { assertDayGridSelectionMatching } from '../assertions';
import { MONTH_VIEW_PAGE_URL } from '../configs';
import { ClickDelay } from '../constants';
import { dragAndDrop, getPrefixedClassName, selectMonthGridCells } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(MONTH_VIEW_PAGE_URL);
});

const MONTH_GRID_CELL_SELECTOR = getPrefixedClassName('daygrid-cell');
const GRID_SELECTION_SELECTOR = `${getPrefixedClassName('weekday')} > ${getPrefixedClassName(
  'grid-selection'
)}`;

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

function assertMonthGridSelectionMatching(page: Page, startIndex: number, endIndex: number) {
  return assertDayGridSelectionMatching(
    page,
    startIndex,
    endIndex,
    MONTH_GRID_CELL_SELECTOR,
    GRID_SELECTION_SELECTOR
  );
}

test('select a cell by clicking.', async ({ page }) => {
  // Given
  const monthGridCellLocator = page.locator(MONTH_GRID_CELL_SELECTOR).nth(31);

  // When
  await monthGridCellLocator.click({ delay: ClickDelay.Short });

  // Then
  await assertMonthGridSelectionMatching(page, 31, 31);
});

// It looks like triple click happens.
// Affected by auto clearing grid selection when form popup closed.
test.fixme('select a cell by double clicking.', async ({ page }) => {
  // Given
  const monthGridCellLocator = page.locator(MONTH_GRID_CELL_SELECTOR).nth(31);

  // When
  await monthGridCellLocator.dblclick({ delay: ClickDelay.Immediate });

  // Then
  await assertMonthGridSelectionMatching(page, 31, 31);
});

test('select a cell by drag and drop.', async ({ page }) => {
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

test('When pressing down the ESC key, the grid selection is canceled.', async ({ page }) => {
  // Given
  const startCellLocator = page.locator(MONTH_GRID_CELL_SELECTOR).nth(31);
  const targetCellLocator = page.locator(MONTH_GRID_CELL_SELECTOR).nth(32);

  // When
  await dragAndDrop({
    page,
    sourceLocator: startCellLocator,
    targetLocator: targetCellLocator,
    hold: true,
  });
  await page.keyboard.down('Escape');

  // Then
  const gridSelectionLocator = page.locator(GRID_SELECTION_SELECTOR);
  expect(await gridSelectionLocator.count()).toBe(0);
});
