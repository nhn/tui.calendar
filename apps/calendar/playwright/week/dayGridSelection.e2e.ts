import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

import { assertDayGridSelectionMatching } from '../assertions';
import { WEEK_VIEW_PAGE_URL } from '../configs';
import { selectGridCells } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(WEEK_VIEW_PAGE_URL);
});

const WEEK_GRID_SELECTOR = '.toastui-calendar-panel-grid';

function selectWeekGridCells(page: Page, startCellIndex: number, endCellIndex: number) {
  return selectGridCells(page, startCellIndex, endCellIndex, WEEK_GRID_SELECTOR);
}

test.describe('DayGrid Selection in week', () => {
  function assertWeekGridSelectionMatching(page: Page, startIndex: number, endIndex: number) {
    return assertDayGridSelectionMatching(
      page,
      startIndex,
      endIndex,
      WEEK_GRID_SELECTOR,
      '.toastui-calendar-daygrid-grid-selection'
    );
  }

  test('select a cell by clicking.', async ({ page }) => {
    // Given
    const weekGridCellLocator = page.locator(WEEK_GRID_SELECTOR).nth(14);

    // When
    await weekGridCellLocator.click({ delay: 100 });

    // Then
    await assertWeekGridSelectionMatching(page, 14, 14);
  });

  test('select a cell by double clicking.', async ({ page }) => {
    // Given
    const weekGridCellLocator = page.locator(WEEK_GRID_SELECTOR).nth(14);

    // When
    await weekGridCellLocator.dblclick({ delay: 1 });

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
});
