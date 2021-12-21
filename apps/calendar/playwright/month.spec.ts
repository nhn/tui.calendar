import { expect, test } from '@playwright/test';

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
    const startCellBoundingBox = await startCellLocator.boundingBox();
    const endCellBoundingBox = await endCellLocator.boundingBox();

    if (endCellBoundingBox) {
      await dragAndDrop(page, startCellLocator, {
        x: endCellBoundingBox.x + 10,
        y: endCellBoundingBox.y + 10,
      });
    }

    const selectionLocator = page.locator('.toastui-calendar-daygrid-grid-selection');
    const selectionBoundingBox = await selectionLocator.boundingBox();

    // @TODO 단언 개선
    // 1. 시작과 끝 좌표의 x,y 일치 여부
    // 2. GridSelection의 전체 너비를 한 셀의 너비로 나누면 선택한 셀의 갯수 확인 가능
    if (selectionBoundingBox && startCellBoundingBox) {
      expect(selectionBoundingBox.width).toBeGreaterThanOrEqual(startCellBoundingBox.width * 2);
    } else {
      test.fail();
    }
  });

  // @TODO
  // 한줄 정방향/역향향 + 한줄 꽉 찼는가?
  // 여러줄 정방향/역방향
});
