import type { Locator, Page } from '@playwright/test';

import type TZDate from '../src/time/date';
import type { FormattedTimeString } from '../types/time/datetime';
import type { BoundingBox } from './types';

export function getPrefixedClassName(className: string) {
  return `.toastui-calendar-${className}`;
}

export async function dragAndDrop(
  sourceLocator: Locator,
  targetLocator: Locator,
  options: Parameters<Locator['dragTo']>[1] = {}
) {
  await sourceLocator.dragTo(targetLocator, { ...options, force: true });
}

export async function selectGridCells(
  page: Page,
  startCellIdx: number,
  endCellIdx: number,
  className: string
) {
  const startCellLocator = page.locator(className).nth(startCellIdx);
  const endCellLocator = page.locator(className).nth(endCellIdx);

  await dragAndDrop(startCellLocator, endCellLocator);
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

export function getTimeGridLineLocator(start: FormattedTimeString): string {
  return `[data-testid*="gridline-${start}"]`;
}

export function getTimeStrFromDate(d: TZDate) {
  const hour = d.getHours();
  const minute = d.getMinutes();

  return `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`;
}
