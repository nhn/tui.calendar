import { expect, test } from '@playwright/test';

test.describe('basic test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      'http://localhost:6006/iframe.html?id=weekview--fixed-events&args=&viewMode=story'
    );
  });

  test('event count', async ({ page }) => {
    const events = await page.$$('.toastui-calendar-weekday-event-block');

    expect(events).toHaveLength(3);
  });

  test('event resizing', async ({ page }) => {
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

    const boundingBoxAfterResizing = await targetEventLocator.boundingBox();
    const eventWidthAfterResizing = boundingBoxAfterResizing?.width ?? 0;

    expect(eventWidthBeforeResizing).toBeLessThan(eventWidthAfterResizing);
  });
});
