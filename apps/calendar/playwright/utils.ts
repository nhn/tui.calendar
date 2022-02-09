import type { Locator, Page } from '@playwright/test';

import { BoundingBox } from './types';

export async function dragAndDrop(page: Page, sourceLocator: Locator, targetLocator: Locator) {
  const { x, y, width, height } = await getBoundingBox(targetLocator);

  await sourceLocator.hover();
  await page.mouse.down();
  await page.mouse.move(x + width / 2, y + height / 2, { steps: 15 });
  await page.mouse.up();

  // NOTE: Handling re-render timing issue
  await page.locator('body').hover();
}

export async function selectGridCells(
  page: Page,
  startCellIdx: number,
  endCellIdx: number,
  className: string
) {
  const startCellLocator = page.locator(className).nth(startCellIdx);
  const endCellLocator = page.locator(className).nth(endCellIdx);

  await dragAndDrop(page, startCellLocator, endCellLocator);
}

export async function getBoundingBox(locator: Locator): Promise<BoundingBox> {
  const boundingBox = await locator.boundingBox();

  if (!boundingBox) {
    throw new Error(`BoundingBox of ${locator} is not found`);
  }

  return boundingBox;
}
