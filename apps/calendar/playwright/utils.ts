import type { Locator, Page } from '@playwright/test';

export async function dragAndDrop(
  page: Page,
  startLocator: Locator,
  targetCoords: { x: number; y: number }
) {
  await startLocator.hover();
  await page.mouse.down();
  await page.mouse.move(targetCoords.x, targetCoords.y, { steps: 15 });
  await page.mouse.up();
}
