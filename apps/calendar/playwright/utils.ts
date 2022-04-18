import type { Locator, Page } from '@playwright/test';

import type TZDate from '../src/time/date';
import type { FormattedTimeString } from '../types/time/datetime';
import type { BoundingBox } from './types';

export function getPrefixedClassName(className: string) {
  return `.toastui-calendar-${className}`;
}

export async function dragAndDrop(
  page: Page,
  sourceLocator: Locator,
  targetLocator: Locator,
  options: Parameters<Locator['dragTo']>[1] = {}
) {
  const sourceBoundingBox = await getBoundingBox(sourceLocator);
  const targetBoundingBox = await getBoundingBox(targetLocator);

  const sourceX = sourceBoundingBox.x + (options?.sourcePosition?.x ?? sourceBoundingBox.width / 2);
  const sourceY =
    sourceBoundingBox.y + (options?.sourcePosition?.y ?? sourceBoundingBox.height / 2);
  const targetX = targetBoundingBox.x + (options?.targetPosition?.x ?? targetBoundingBox.width / 2);
  const targetY =
    targetBoundingBox.y + (options?.targetPosition?.y ?? targetBoundingBox.height / 2);

  await page.mouse.move(sourceX, sourceY);
  await page.mouse.down();
  await page.mouse.move(targetX, targetY, { steps: 20 });
  await page.mouse.up();
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

export function selectMonthGridCells(page: Page, startCellIndex: number, endCellIndex: number) {
  return selectGridCells(page, startCellIndex, endCellIndex, '.toastui-calendar-daygrid-cell');
}

export async function getBoundingBox(locator: Locator): Promise<BoundingBox> {
  const boundingBox = await locator.boundingBox();

  if (!boundingBox) {
    throw new Error(`BoundingBox of ${locator} is not found`);
  }

  return boundingBox;
}

export function getTimeGridLineSelector(start: FormattedTimeString): string {
  return `[data-testid*="gridline-${start}"]`;
}

export function getTimeStrFromDate(d: TZDate) {
  const hour = d.getHours();
  const minute = d.getMinutes();

  return `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`;
}
