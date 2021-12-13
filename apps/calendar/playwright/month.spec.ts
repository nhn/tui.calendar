import { expect, test } from '@playwright/test';

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
    const cellBoundingBox = await startCellLocator.boundingBox();

    await page.dragAndDrop(
      '.toastui-calendar-daygrid-cell >> nth=31',
      '.toastui-calendar-daygrid-cell >> nth=32'
    );

    const selectionLocator = page.locator('.toastui-calendar-daygrid-grid-selection');
    const selectionBoundingBox = await selectionLocator.boundingBox();

    expect(selectionBoundingBox.width).toBeGreaterThanOrEqual(cellBoundingBox.width * 2);
  });
});
