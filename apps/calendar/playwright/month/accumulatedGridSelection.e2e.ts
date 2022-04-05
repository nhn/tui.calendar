import { test } from '@playwright/test';

import { assertAccumulatedDayGridSelectionMatching } from '../assertions';
import { MONTH_VIEW_BASIC_PAGE_URL } from '../configs';
import { selectMonthGridCells } from '../utils';

test.describe('Accumulated grid selection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(MONTH_VIEW_BASIC_PAGE_URL);
  });

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
