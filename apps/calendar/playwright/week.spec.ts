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

  test('event resizing', async ({ page }) => {
    const boundingBoxBeforeResizing = await events[0].boundingBox();
    const eventWidthBeforeResizing = boundingBoxBeforeResizing.width;

    const resizer = await events[0].$('.toastui-calendar-handle-y');
    const resizerBoundingBox = await resizer?.boundingBox();

    const targetX = resizerBoundingBox.x + resizerBoundingBox.width / 2;
    const targetY = resizerBoundingBox.y + resizerBoundingBox.height / 2;

    await page.mouse.move(targetX, targetY, { steps: 15 });
    await page.mouse.down();
    await page.mouse.move(targetX + 500, targetY, { steps: 15 });
    await page.mouse.up();

    const boundingBoxAfterResizing = await events[0].boundingBox();
    const eventWidthAfterResizing = boundingBoxAfterResizing.width;

    expect(eventWidthBeforeResizing).toBeLessThan(eventWidthAfterResizing);
  });
});
