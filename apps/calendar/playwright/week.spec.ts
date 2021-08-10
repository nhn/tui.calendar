import { expect, test } from '@playwright/test';

test.describe('basic test', () => {
  let events: any[];

  test.beforeEach(async ({ page }) => {
    await page.goto(
      'http://localhost:6006/iframe.html?id=weekview--fixed-events&args=&viewMode=story'
    );
    events = await page.$$('.toastui-calendar-weekday-event-block');
  });

  test('event count', () => {
    expect(events).toHaveLength(3);
  });

  // eslint-disable-next-line complexity
  test('event resizing', async ({ page }) => {
    const boundingBoxBeforeResizing = await events[0].boundingBox();
    const eventWidthBeforeResizing = boundingBoxBeforeResizing?.width ?? 0;
    const sourceEvent = await events[0].$('.toastui-calendar-handle-y');
    const targetEvent = await events[2].$('.toastui-calendar-handle-y');

    const sourceBoundingBox = await sourceEvent?.boundingBox();
    const targetBoundingBox = await targetEvent?.boundingBox();

    const sourceX = sourceBoundingBox?.x ?? 0;
    const sourceY = sourceBoundingBox?.y ?? 0;
    const sourceWidth = sourceBoundingBox?.width ?? 0;
    const sourceHeight = sourceBoundingBox?.height ?? 0;
    const targetX = targetBoundingBox?.x ?? 0;
    const targetY = targetBoundingBox?.y ?? 0;
    const targetWidth = targetBoundingBox?.width ?? 0;
    const targetHeight = targetBoundingBox?.height ?? 0;

    const startX = sourceX + sourceWidth / 2;
    const startY = sourceY + sourceHeight / 2;
    const endX = targetX + targetWidth / 2;
    const endY = targetY + targetHeight / 2;

    await page.mouse.move(startX, startY, { steps: 5 });
    await page.mouse.down();
    await page.mouse.move(endX, endY, { steps: 5 });
    await page.mouse.up();

    const boundingBoxAfterResizing = await events[0].boundingBox();
    const eventWidthAfterResizing = boundingBoxAfterResizing?.width ?? 0;

    expect(eventWidthBeforeResizing).toBeLessThan(eventWidthAfterResizing);
  });
});
