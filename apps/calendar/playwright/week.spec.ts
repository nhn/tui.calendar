import { expect, test } from '@playwright/test';

const WEEK_VIEW_PAGE_URL =
  'http://localhost:6006/iframe.html?id=weekview--fixed-events&args=&viewMode=story';

test.beforeEach(async ({ page }) => {
  await page.goto(WEEK_VIEW_PAGE_URL);
});

test.describe('basic test', () => {
  test('event count', async ({ page }) => {
    const events = await page.$$('.toastui-calendar-weekday-event-block');

    expect(events).toHaveLength(3);
  });
});

test.describe('event resizing', () => {
  test('resizing allday grid row event', async ({ page }) => {
    const targetEventLocator = page.locator('.toastui-calendar-weekday-event >> nth=0');
    const boundingBoxBeforeResizing = await targetEventLocator.boundingBox();
    const resizerLocator = page.locator('.toastui-calendar-handle-y >> nth=0');
    const resizerBoundingBox = (await resizerLocator.boundingBox()) ?? {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };

    const eventWidthBeforeResizing = boundingBoxBeforeResizing?.width;
    const targetX = resizerBoundingBox.x + resizerBoundingBox.width / 2;
    const targetY = resizerBoundingBox.y + resizerBoundingBox.height / 2;

    await resizerLocator.hover({
      position: { x: resizerBoundingBox.width / 2, y: resizerBoundingBox.height / 2 },
    });
    await page.mouse.down();
    await page.mouse.move(targetX + 500, targetY, { steps: 15 });
    await page.mouse.up();
    // NOTE: Handling re-render timing issue
    await targetEventLocator.hover();

    const boundingBoxAfterResizing = await targetEventLocator.boundingBox();
    const eventWidthAfterResizing = boundingBoxAfterResizing?.width ?? 0;

    expect(eventWidthBeforeResizing).toBeLessThan(eventWidthAfterResizing);
  });
});

test.describe('event moving', () => {
  test('moving allday grid row event', async ({ page }) => {
    const cellLocator = page.locator('.toastui-calendar-panel-grid >> nth=0');
    const cellBoundingBox = await cellLocator.boundingBox();
    const cellWidth = cellBoundingBox?.width ?? 0;

    const targetEventLocator = page.locator('.toastui-calendar-handle-y >> nth=0');
    const boundingBoxBeforeMoving = (await targetEventLocator.boundingBox()) ?? {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };

    await targetEventLocator.hover({
      position: {
        x: boundingBoxBeforeMoving.width / 2,
        y: boundingBoxBeforeMoving.height / 2,
      },
    });
    await page.mouse.down();
    await page.mouse.move(boundingBoxBeforeMoving.x + cellWidth + 5, boundingBoxBeforeMoving.y, {
      steps: 15,
    });
    await page.mouse.up();
    // NOTE: Handling re-render timing issue
    await targetEventLocator.hover();

    const boundingBoxAfterMoving = await targetEventLocator.boundingBox();

    expect(boundingBoxAfterMoving?.x).toBeGreaterThan(boundingBoxBeforeMoving.x);
    expect(Math.floor(boundingBoxAfterMoving?.width ?? 0)).toEqual(
      Math.floor(boundingBoxBeforeMoving.width)
    );
  });
});
