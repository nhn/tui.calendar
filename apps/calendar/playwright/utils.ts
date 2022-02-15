import type { Locator, Page } from '@playwright/test';

import { BoundingBox } from './types';

export function getPrefixedClassName(className: string) {
  return `.toastui-calendar-${className}`;
}

export async function dragAndDrop(
  page: Page,
  sourceLocator: Locator,
  targetLocator: Locator,
  options: Parameters<Locator['dragTo']>[1] = {}
) {
  await sourceLocator.dragTo(targetLocator, { ...options, force: true });

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
