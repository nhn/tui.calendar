import { expect, Page, test } from '@playwright/test';

export async function assertGridSelectionMatching(page: Page, startIdx: number, endIdx: number) {
  const startCellLocator = page.locator('.toastui-calendar-daygrid-cell').nth(startIdx);
  const endCellLocator = page.locator('.toastui-calendar-daygrid-cell').nth(endIdx);

  const selectionLocator = page.locator('.toastui-calendar-daygrid-grid-selection');
  const selectionStartLocator = selectionLocator.first();
  const selectionEndLocator = selectionLocator.last();

  const [
    startCellBoundingBox,
    endCellBoundingBox,
    selectionStartBoundingBox,
    selectionEndBoundingBox,
  ] = await Promise.all([
    startCellLocator.boundingBox(),
    endCellLocator.boundingBox(),
    selectionStartLocator.boundingBox(),
    selectionEndLocator.boundingBox(),
  ]);

  if (
    startCellBoundingBox &&
    endCellBoundingBox &&
    selectionStartBoundingBox &&
    selectionEndBoundingBox
  ) {
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
  } else {
    test.fail();
  }
}
