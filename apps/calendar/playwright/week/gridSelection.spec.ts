import { expect, Page, test } from '@playwright/test';

import { assertGridSelectionMatching } from '../assertions';
import { WEEK_VIEW_PAGE_URL } from '../configs';
import { selectGridCells } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(WEEK_VIEW_PAGE_URL);
});

function selectWeekGridCells(page: Page, startCellIndex: number, endCellIndex: number) {
  return selectGridCells(page, startCellIndex, endCellIndex, '.toastui-calendar-panel-grid');
}

test.describe('Grid Selection', () => {
  function assertWeekGridSelectionMatching(page: Page, startIndex: number, endIndex: number) {
    return assertGridSelectionMatching(page, startIndex, endIndex, '.toastui-calendar-panel-grid');
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

test('event form popup with grid selection', async ({ page }) => {
  await selectWeekGridCells(page, 14, 15);

  const floatingLayer = page.locator('css=[role=dialog]');

  expect(floatingLayer).not.toBeNull();
});
