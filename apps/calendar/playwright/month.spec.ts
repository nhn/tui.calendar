import { expect, test } from '@playwright/test';

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
  test('select 2 cells from left to right', async ({ page }) => {
    const startCellLocator = page.locator('.toastui-calendar-daygrid-cell').nth(31);
    const endCellLocator = page.locator('.toastui-calendar-daygrid-cell').nth(32);

    const endCellBoundingBox = await endCellLocator.boundingBox();

    if (endCellBoundingBox) {
      await dragAndDrop(page, startCellLocator, {
        x: endCellBoundingBox.x + 10,
        y: endCellBoundingBox.y + 10,
      });
    }

    await assertGridSelectionMatching(page, 31, 32);
  });

  // @TODO
  // 한줄 정방향/역향향 + 한줄 꽉 찼는가?
  // 여러줄 정방향/역방향
});
