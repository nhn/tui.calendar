import { expect, Page, test } from '@playwright/test';

import { dragAndDrop } from './utils';

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

export async function assertMonthEventMovingMatching(
  page: Page,
  targetCoordsDiff: { x: number; y: number }
) {
  type BoundingBox = {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  function checkBoundingBoxAfterMoving(
    boundingBoxBeforeMoving: BoundingBox,
    boundingBoxAfterMoving: BoundingBox
  ) {
    if (targetCoordsDiff.x > 0) {
      expect(boundingBoxAfterMoving.x).toBeGreaterThan(boundingBoxBeforeMoving.x);
    } else if (targetCoordsDiff.x < 0) {
      expect(boundingBoxAfterMoving.x).toBeLessThan(boundingBoxBeforeMoving.x);
    }

    if (targetCoordsDiff.y > 0) {
      expect(boundingBoxAfterMoving.y).toBeGreaterThan(boundingBoxBeforeMoving.y);
    } else if (targetCoordsDiff.y < 0) {
      expect(boundingBoxAfterMoving.y).toBeLessThan(boundingBoxBeforeMoving.y);
    }
  }

  const targetEventLocator = page.locator(
    '.toastui-calendar-weekday-event-block:has-text("event2")'
  );
  const boundingBoxBeforeMoving = await targetEventLocator.boundingBox();

  if (boundingBoxBeforeMoving) {
    await dragAndDrop(page, targetEventLocator, {
      x: boundingBoxBeforeMoving.x + targetCoordsDiff.x,
      y: boundingBoxBeforeMoving.y + targetCoordsDiff.y,
    });
  } else {
    test.fail();
  }

  const boundingBoxAfterMoving = await targetEventLocator.boundingBox();

  if (boundingBoxBeforeMoving && boundingBoxAfterMoving) {
    checkBoundingBoxAfterMoving(boundingBoxBeforeMoving, boundingBoxAfterMoving);
    expect(boundingBoxAfterMoving.width).toBeCloseTo(boundingBoxBeforeMoving.width, 3);
  } else {
    test.fail();
  }
}
