import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import type TZDate from '../src/time/date';
import type { EventObject } from '../src/types/events';
import type { FormattedTimeString } from '../src/types/time/datetime';
import type { BoundingBox } from './types';

export function getPrefixedClassName(className: string) {
  return `.toastui-calendar-${className}`;
}

export async function dragAndDrop({
  page,
  sourceLocator,
  targetLocator,
  options = {},
  hold = false,
}: {
  page: Page;
  sourceLocator: Locator;
  targetLocator: Locator;
  options?: Parameters<Locator['dragTo']>[1];
  hold?: boolean;
}) {
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
  await page.mouse.move(targetX, targetY, { steps: 4 });
  if (!hold) {
    await page.mouse.up();
  }
}

export async function selectGridCells(
  page: Page,
  startCellIdx: number,
  endCellIdx: number,
  className: string
) {
  const startCellLocator = page.locator(className).nth(startCellIdx);
  const endCellLocator = page.locator(className).nth(endCellIdx);

  await dragAndDrop({ page, sourceLocator: startCellLocator, targetLocator: endCellLocator });
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

export function getTimeEventSelector(title: string): string {
  return `[data-testid^="time-event-${title}-"]`;
}

export function getGuideTimeEventSelector(): string {
  return `[data-testid^="guide-time-event"]`;
}

export function getHorizontalEventSelector(event: EventObject): string {
  return `data-testid=${event.calendarId}-${event.id}-${event.title}`;
}

export function getTimeGridLineSelector(start: FormattedTimeString): string {
  return `[data-testid*="gridline-${start}"]`;
}

export function getCellSelector(cellIndex: number): string {
  return `.toastui-calendar-daygrid-cell >> nth=${cellIndex}`;
}

export function getTimeStrFromDate(d: TZDate) {
  const fixToTwoDigits = (num: number) => num.toString().padStart(2, '0');

  const hour = d.getHours();
  const minute = d.getMinutes();

  return `${fixToTwoDigits(hour)}:${fixToTwoDigits(minute)}`;
}

export function waitForSingleElement(locator: Locator) {
  return expect.poll(() => locator.count()).toBe(1);
}

/**
 * Get locator matches testId.
 */
export function queryLocatorByTestId(page: Page, testId: string) {
  return page.locator(`[data-testid*="${testId}"]`);
}
