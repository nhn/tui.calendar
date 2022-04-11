import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

import type { BoundingBox } from './types';
import { getBoundingBox } from './utils';

export async function assertDayGridSelectionMatching(
  page: Page,
  startIdx: number,
  endIdx: number,
  cellClassName: string,
  selectionClassName: string
) {
  const startCellLocator = page.locator(cellClassName).nth(startIdx);
  const endCellLocator = page.locator(cellClassName).nth(endIdx);

  const selectionLocator = page.locator(selectionClassName);
  const selectionStartLocator = selectionLocator.first();
  const selectionEndLocator = selectionLocator.last();

  const [
    startCellBoundingBox,
    endCellBoundingBox,
    selectionStartBoundingBox,
    selectionEndBoundingBox,
  ] = await Promise.all([
    getBoundingBox(startCellLocator),
    getBoundingBox(endCellLocator),
    getBoundingBox(selectionStartLocator),
    getBoundingBox(selectionEndLocator),
  ]);

  expect(selectionStartBoundingBox.x).toBeCloseTo(startCellBoundingBox.x, -1);
  expect(selectionStartBoundingBox.y).toBeCloseTo(startCellBoundingBox.y, -1);
  expect(selectionEndBoundingBox.x + selectionEndBoundingBox.width).toBeCloseTo(
    endCellBoundingBox.x + endCellBoundingBox.width,
    -1
  );
  expect(selectionEndBoundingBox.y).toBeCloseTo(endCellBoundingBox.y, -1);

  const totalCellCount = endIdx - startIdx + 1;
  const totalSelectionWidth = await selectionLocator.evaluateAll((selections) =>
    (selections as HTMLElement[]).reduce(
      (total, selectionRow) => selectionRow.getBoundingClientRect().width + total,
      0
    )
  );
  expect(Math.floor(totalSelectionWidth / totalCellCount)).toBeCloseTo(
    startCellBoundingBox.width,
    -1
  );
}

export async function assertAccumulatedDayGridSelectionMatching(
  page: Page,
  startIdx: number,
  endIdx: number,
  nthSelection: number,
  isAcrossWeeks: boolean
) {
  const cellClassName = '.toastui-calendar-daygrid-cell';
  const selectionClassName =
    '.toastui-calendar-accumulated-grid-selection .toastui-calendar-daygrid-grid-selection';

  const startCellLocator = page.locator(cellClassName).nth(startIdx);
  const endCellLocator = page.locator(cellClassName).nth(endIdx);

  const selectionLocator = page.locator(selectionClassName);
  const selectionStartLocator = selectionLocator.nth(nthSelection);
  const selectionEndLocator = selectionLocator.nth(isAcrossWeeks ? nthSelection + 1 : nthSelection);

  const [
    startCellBoundingBox,
    endCellBoundingBox,
    selectionStartBoundingBox,
    selectionEndBoundingBox,
  ] = await Promise.all([
    getBoundingBox(startCellLocator),
    getBoundingBox(endCellLocator),
    getBoundingBox(selectionStartLocator),
    getBoundingBox(selectionEndLocator),
  ]);

  expect(selectionStartBoundingBox.x).toBeCloseTo(startCellBoundingBox.x, -1);
  expect(selectionStartBoundingBox.y).toBeCloseTo(startCellBoundingBox.y, -1);
  expect(selectionEndBoundingBox.x + selectionEndBoundingBox.width).toBeCloseTo(
    endCellBoundingBox.x + endCellBoundingBox.width,
    -1
  );
  expect(selectionEndBoundingBox.y).toBeCloseTo(endCellBoundingBox.y, -1);

  const totalCellCount = endIdx - startIdx + 1;
  const startSelectionWidth = await selectionStartLocator.evaluateAll((selections) =>
    (selections as HTMLElement[]).reduce(
      (total, selectionRow) => selectionRow.getBoundingClientRect().width + total,
      0
    )
  );
  const endSelectionWidth = await selectionEndLocator.evaluateAll((selections) =>
    (selections as HTMLElement[]).reduce(
      (total, selectionRow) => selectionRow.getBoundingClientRect().width + total,
      0
    )
  );
  const totalSelectionWidth = isAcrossWeeks
    ? startSelectionWidth + endSelectionWidth
    : (startSelectionWidth + endSelectionWidth) / 2;

  expect(Math.floor(totalSelectionWidth / totalCellCount)).toBeCloseTo(
    startCellBoundingBox.width,
    -1
  );
}

export function assertBoundingBoxIncluded(targetBox: BoundingBox, wrappingBox: BoundingBox) {
  expect(targetBox.x).toBeGreaterThanOrEqual(wrappingBox.x);
  expect(targetBox.y).toBeGreaterThanOrEqual(wrappingBox.y);
  expect(targetBox.x + targetBox.width).toBeLessThanOrEqual(wrappingBox.x + wrappingBox.width);
  expect(targetBox.y + targetBox.height).toBeLessThanOrEqual(wrappingBox.y + wrappingBox.height);
}
