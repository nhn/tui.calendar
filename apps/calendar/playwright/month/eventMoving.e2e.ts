import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import waitForExpect from 'wait-for-expect';

import { mockMonthViewEventsFixed } from '../../stories/mocks/mockMonthViewEvents';
import type { EventModelData } from '../../types/events';
import { MONTH_VIEW_PAGE_URL } from '../configs';
import { Direction } from '../types';
import { dragAndDrop, getBoundingBox, waitForSingleElement } from '../utils';

const CELL_SELECTOR = '.toastui-calendar-daygrid-cell';

test.beforeEach(async ({ page }) => {
  await page.goto(MONTH_VIEW_PAGE_URL);
});

const [TARGET_EVENT1, TARGET_EVENT2, TARGET_EVENT3] = mockMonthViewEventsFixed;
const testCases: {
  event: EventModelData;
  startCellIndex: number;
  endCellIndex: number;
  directions: Direction[];
}[] = [
  {
    event: TARGET_EVENT1,
    startCellIndex: 7,
    endCellIndex: 16,
    directions: [Direction.Up, Direction.Right, Direction.Down],
  },
  {
    event: TARGET_EVENT2,
    startCellIndex: 16,
    endCellIndex: 18,
    directions: [Direction.Up, Direction.Right, Direction.Down, Direction.Left],
  },
  {
    event: TARGET_EVENT3,
    startCellIndex: 25,
    endCellIndex: 27,
    directions: [Direction.Up, Direction.Right, Direction.Down, Direction.Left],
  },
];
const rightDirectionTestCases = testCases.filter((testCase) =>
  testCase.directions.includes(Direction.Right)
);
const leftDirectionTestCases = testCases.filter((testCase) =>
  testCase.directions.includes(Direction.Left)
);
const lowerDirectionTestCases = testCases.filter((testCase) =>
  testCase.directions.includes(Direction.Down)
);
const upperDirectionTestCases = testCases.filter((testCase) =>
  testCase.directions.includes(Direction.Up)
);

const getCellSelector = (cellIndex: number) => `${CELL_SELECTOR} >> nth=${cellIndex}`;

async function setup(page: Page, event: EventModelData, targetCellIndex: number) {
  const targetCellLocator = page.locator(getCellSelector(targetCellIndex));
  const targetCellBoundingBox = await getBoundingBox(targetCellLocator);
  const eventLocator = page
    .locator(`data-testid=${event.calendarId}-${event.id}-${event.title}`)
    .first();
  const boundingBoxBeforeMoving = await getBoundingBox(eventLocator);

  await dragAndDrop(page, eventLocator, targetCellLocator);
  await waitForSingleElement(eventLocator);

  let boundingBoxAfterMoving = await getBoundingBox(eventLocator);
  await waitForExpect(async () => {
    boundingBoxAfterMoving = await getBoundingBox(eventLocator);
    expect(boundingBoxAfterMoving).not.toEqual(boundingBoxBeforeMoving);
  });

  return {
    targetCellBoundingBox,
    boundingBoxBeforeMoving,
    boundingBoxAfterMoving,
  };
}

test.describe('event moving', () => {
  /**
   * Suppose we have the following cells in the month view.
   * Each number represents the index of the cell.
   *
   * [
   *   [ 0,  1,  2,  3,  4,  5,  6],
   *   [ 7,  8,  9, 10, 11, 12, 13],
   *   [14, 15, 16, 17, 18, 19 ,20],
   *   [21, 22, 23, 24, 25, 26, 27],
   *   [28, 29, 30, 31, 32, 33, 34],
   * ]
   */

  rightDirectionTestCases.forEach(({ event, startCellIndex }) => {
    const getRightCellIndex = (cellIndex: number) => cellIndex + 1;

    test(`moving month event ${event.title} for direction right`, async ({ page }) => {
      // Given
      const rightCellIndex = getRightCellIndex(startCellIndex);

      // When
      const { targetCellBoundingBox, boundingBoxBeforeMoving, boundingBoxAfterMoving } =
        await setup(page, event, rightCellIndex);

      // Then
      expect(boundingBoxAfterMoving.x).toBeGreaterThan(boundingBoxBeforeMoving.x);
      expect(boundingBoxAfterMoving.x).toBeCloseTo(targetCellBoundingBox.x, 1);
      expect(boundingBoxAfterMoving.x).toBeLessThan(
        targetCellBoundingBox.x + targetCellBoundingBox.width
      );
    });
  });

  leftDirectionTestCases.forEach(({ event, startCellIndex }) => {
    const getLeftCellIndex = (cellIndex: number) => cellIndex - 1;

    test(`moving month event ${event.title} for direction left`, async ({ page }) => {
      // Given
      const leftCellIndex = getLeftCellIndex(startCellIndex);

      // When
      const { targetCellBoundingBox, boundingBoxBeforeMoving, boundingBoxAfterMoving } =
        await setup(page, event, leftCellIndex);

      // Then
      expect(boundingBoxAfterMoving.x).toBeLessThan(boundingBoxBeforeMoving.x);
      expect(boundingBoxAfterMoving.x).toBeCloseTo(targetCellBoundingBox.x, 1);
      expect(boundingBoxAfterMoving.x).toBeLessThan(
        targetCellBoundingBox.x + targetCellBoundingBox.width
      );
    });
  });

  lowerDirectionTestCases.forEach(({ event, startCellIndex }) => {
    const getDownCellIndex = (cellIndex: number) => cellIndex + 7;

    test(`moving month event ${event.title} for direction down`, async ({ page }) => {
      // Given
      const downCellIndex = getDownCellIndex(startCellIndex);

      // When
      const { targetCellBoundingBox, boundingBoxBeforeMoving, boundingBoxAfterMoving } =
        await setup(page, event, downCellIndex);

      // Then
      expect(boundingBoxAfterMoving.y).toBeGreaterThan(boundingBoxBeforeMoving.y);
      expect(boundingBoxAfterMoving.width).toBeCloseTo(boundingBoxBeforeMoving.width);
      expect(boundingBoxAfterMoving.y).toBeGreaterThan(targetCellBoundingBox.y);
      expect(boundingBoxAfterMoving.y).toBeLessThan(
        targetCellBoundingBox.y + targetCellBoundingBox.height
      );
    });
  });

  upperDirectionTestCases.forEach(({ event, startCellIndex }) => {
    const getUpCellIndex = (cellIndex: number) => cellIndex - 7;

    test(`moving month event ${event.title} for direction up`, async ({ page }) => {
      // Given
      const upCellIndex = getUpCellIndex(startCellIndex);

      // When
      const { targetCellBoundingBox, boundingBoxBeforeMoving, boundingBoxAfterMoving } =
        await setup(page, event, upCellIndex);

      // Then
      expect(boundingBoxAfterMoving.y).toBeLessThan(boundingBoxBeforeMoving.y);
      expect(boundingBoxAfterMoving.width).toBeCloseTo(boundingBoxBeforeMoving.width);
      expect(boundingBoxAfterMoving.y).toBeGreaterThan(targetCellBoundingBox.y);
      expect(boundingBoxAfterMoving.y).toBeLessThan(
        targetCellBoundingBox.y + targetCellBoundingBox.height
      );
    });
  });

  test('moving month grid event to end of week', async ({ page }) => {
    // Given
    const eventLocator = page.locator(
      `data-testid=${TARGET_EVENT2.calendarId}-${TARGET_EVENT2.id}-${TARGET_EVENT2.title}`
    );
    const endOfWeekCellLocator = page.locator(`${CELL_SELECTOR} >> nth=20`);
    const endOfWeekCellBoundingBox = await getBoundingBox(endOfWeekCellLocator);
    const secondOfWeekCellLocator = page.locator(`${CELL_SELECTOR} >> nth=22`);
    const secondOfWeekCellBoundingBox = await getBoundingBox(secondOfWeekCellLocator);

    // When
    await dragAndDrop(page, eventLocator, endOfWeekCellLocator);

    // Then
    await waitForExpect(async () => {
      const targetEventsCount = await eventLocator.evaluateAll((events) => events.length);
      const targetEventLength = await eventLocator.evaluateAll((events) =>
        (events as HTMLElement[]).reduce(
          (total, eventRow) => eventRow.getBoundingClientRect().width + total,
          0
        )
      );
      const firstEventLocator = eventLocator.first();
      const lastEventLocator = eventLocator.last();
      const firstEventBoundingBox = await getBoundingBox(firstEventLocator);
      const lastEventBoundingBox = await getBoundingBox(lastEventLocator);

      expect(targetEventsCount).toBe(2);
      expect(firstEventBoundingBox.x).toBeCloseTo(endOfWeekCellBoundingBox.x, 3);
      expect(lastEventBoundingBox.x).toBeLessThan(
        secondOfWeekCellBoundingBox.x + secondOfWeekCellBoundingBox.width
      );
      expect(firstEventBoundingBox.y).toBeLessThan(secondOfWeekCellBoundingBox.y);
      expect(lastEventBoundingBox.y).toBeGreaterThan(secondOfWeekCellBoundingBox.y);
      expect(targetEventLength).toBeCloseTo(endOfWeekCellBoundingBox.width * 3, 1);
    });
  });
});
