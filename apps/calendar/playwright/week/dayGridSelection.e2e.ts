import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

import { assertDayGridSelectionMatching } from '../assertions';
import { WEEK_VIEW_PAGE_URL } from '../configs';
import { ClickDelay } from '../constants';
import { dragAndDrop, getPrefixedClassName, selectGridCells } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(WEEK_VIEW_PAGE_URL);
});

const WEEK_GRID_CELL_SELECTOR = getPrefixedClassName('panel-grid');
const DAY_GRID_SELECTION_SELECTOR = getPrefixedClassName('grid-selection');

function selectWeekGridCells(page: Page, startCellIndex: number, endCellIndex: number) {
  return selectGridCells(page, startCellIndex, endCellIndex, WEEK_GRID_CELL_SELECTOR);
}

function assertWeekGridSelectionMatching(page: Page, startIndex: number, endIndex: number) {
  return assertDayGridSelectionMatching(
    page,
    startIndex,
    endIndex,
    WEEK_GRID_CELL_SELECTOR,
    DAY_GRID_SELECTION_SELECTOR
  );
}

test('select a cell by clicking.', async ({ page }) => {
  // Given
  const weekGridCellLocator = page.locator(WEEK_GRID_CELL_SELECTOR).nth(14);

  // When
  await weekGridCellLocator.click({ delay: ClickDelay.Short });

  // Then
  await assertWeekGridSelectionMatching(page, 14, 14);
});

test('select a cell by double clicking.', async ({ page }) => {
  // Given
  const weekGridCellLocator = page.locator(WEEK_GRID_CELL_SELECTOR).nth(14);

  // When
  await weekGridCellLocator.dblclick({ delay: ClickDelay.Immediate });

  // Then
  await assertWeekGridSelectionMatching(page, 14, 14);
});

test('select 2 cells from left to right', async ({ page }) => {
  await selectWeekGridCells(page, 14, 15);

  await assertWeekGridSelectionMatching(page, 14, 15);
});

test('select 2 cells from right to left(reverse)', async ({ page }) => {
  await selectWeekGridCells(page, 15, 14);

  await assertWeekGridSelectionMatching(page, 14, 15);
});

test('event form popup with grid selection', async ({ page }) => {
  await selectWeekGridCells(page, 14, 15);

  const floatingLayer = page.locator('css=[role=dialog]');

  expect(floatingLayer).not.toBeNull();
});

test('When pressing down the ESC key, the grid selection is canceled.', async ({ page }) => {
  // Given
  const startCellLocator = page.locator(WEEK_GRID_CELL_SELECTOR).nth(14);
  const targetCellLocator = page.locator(WEEK_GRID_CELL_SELECTOR).nth(15);

  // When
  await dragAndDrop({
    page,
    sourceLocator: startCellLocator,
    targetLocator: targetCellLocator,
    hold: true,
  });
  await page.keyboard.down('Escape');

  // Then
  const gridSelectionLocator = page.locator(DAY_GRID_SELECTION_SELECTOR);
  expect(await gridSelectionLocator.count()).toBe(0);
});
