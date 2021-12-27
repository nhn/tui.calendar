import { expect, Page } from '@playwright/test';

import { getBoundingBox } from './utils';

export async function assertGridSelectionMatching(
  page: Page,
  startIdx: number,
  endIdx: number,
  className: string
) {
  const startCellLocator = page.locator(className).nth(startIdx);
  const endCellLocator = page.locator(className).nth(endIdx);

  const selectionLocator = page.locator('.toastui-calendar-daygrid-grid-selection');
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
