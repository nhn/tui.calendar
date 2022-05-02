import type { Locator } from '@playwright/test';
import { expect, test } from '@playwright/test';

import { mockWeekViewEvents } from '../../stories/mocks/mockWeekViewEvents';
import type { FormattedTimeString } from '../../types/time/datetime';
import { WEEK_VIEW_PAGE_URL } from '../configs';
import { Direction } from '../types';
import { dragAndDrop, getBoundingBox, getTimeGridLineSelector } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(WEEK_VIEW_PAGE_URL);
});

const [TWO_VIEW_EVENT, SHORT_TIME_EVENT, LONG_TIME_EVENT] = mockWeekViewEvents.filter(
  ({ isAllday }) => !isAllday
);

/**
 * 8 Directions for testing
 *
 * 7  0  1
 * 6     2
 * 5  4  3
 */
const cases: {
  title: string;
  eventColumnIndex: number;
  directionInfo: {
    direction: Direction;
    startTimeAfterMoving: FormattedTimeString;
    timeToDrop: FormattedTimeString;
  }[];
}[] = [
  {
    title: TWO_VIEW_EVENT.title,
    eventColumnIndex: 0,
    directionInfo: [
      {
        direction: Direction.Right,
        startTimeAfterMoving: '10:00',
        timeToDrop: '00:00',
      },
      {
        direction: Direction.LowerRight,
        startTimeAfterMoving: '12:00',
        timeToDrop: '02:00',
      },
      {
        direction: Direction.Down,
        startTimeAfterMoving: '12:00',
        timeToDrop: '02:00',
      },
    ],
  },
  {
    title: SHORT_TIME_EVENT.title,
    eventColumnIndex: 3,
    directionInfo: [
      {
        direction: Direction.Up,
        startTimeAfterMoving: '02:00',
        timeToDrop: '02:00',
      },
      {
        direction: Direction.UpperRight,
        startTimeAfterMoving: '02:00',
        timeToDrop: '02:00',
      },
      {
        direction: Direction.Right,
        startTimeAfterMoving: '04:00',
        timeToDrop: '04:00',
      },
      {
        direction: Direction.LowerRight,
        startTimeAfterMoving: '06:00',
        timeToDrop: '06:00',
      },
      {
        direction: Direction.Down,
        startTimeAfterMoving: '06:00',
        timeToDrop: '06:00',
      },
      {
        direction: Direction.LowerLeft,
        startTimeAfterMoving: '06:00',
        timeToDrop: '06:00',
      },
      {
        direction: Direction.Left,
        startTimeAfterMoving: '04:00',
        timeToDrop: '04:00',
      },
      {
        direction: Direction.UpperLeft,
        startTimeAfterMoving: '02:00',
        timeToDrop: '02:00',
      },
    ],
  },
  {
    title: LONG_TIME_EVENT.title,
    eventColumnIndex: 6,
    directionInfo: [
      {
        direction: Direction.Down,
        startTimeAfterMoving: '12:00',
        timeToDrop: '02:00',
      },
      {
        direction: Direction.LowerLeft,
        startTimeAfterMoving: '12:00',
        timeToDrop: '02:00',
      },
      {
        direction: Direction.Left,
        startTimeAfterMoving: '10:00',
        timeToDrop: '00:00',
      },
    ],
  },
];

const getTargetEventSelector = (title: string) => `[data-testid*="time-event-${title}"]`;

cases.forEach(({ title, eventColumnIndex, directionInfo }) => {
  directionInfo.forEach(({ direction, startTimeAfterMoving, timeToDrop }) => {
    test(`Moving event: ${title} for ${direction}`, async ({ page }) => {
      // Given
      const eventLocator = page.locator(getTargetEventSelector(title)).last();
      const targetRowLocator = page.locator(getTimeGridLineSelector(timeToDrop));
      const targetColumnLocator = page.locator(`data-testid=timegrid-column-${eventColumnIndex}`);

      const targetColumnBoundingBox = await getBoundingBox(targetColumnLocator);

      // When
      await dragAndDrop(page, eventLocator, targetRowLocator, {
        sourcePosition: {
          x: 1,
          y: 1,
        },
        targetPosition: {
          y: 1,
          x: targetColumnBoundingBox.x - 1,
        },
      });

      // Then
      const eventBoundingBoxAfterMove = await getBoundingBox(eventLocator);
      expect(eventBoundingBoxAfterMove.x).toBeCloseTo(targetColumnBoundingBox.x, -1);
      await expect(eventLocator).toHaveText(new RegExp(startTimeAfterMoving));
    });
  });
});

test.describe(`Calibrate event's height when dragging`, () => {
  let eventLocator: Locator;
  let lowerLongTimeEventLocator: Locator;
  let upperLongTimeEventLocator: Locator;

  test.beforeEach(({ page }) => {
    const targetEventSelector = getTargetEventSelector(LONG_TIME_EVENT.title);

    lowerLongTimeEventLocator = page.locator(targetEventSelector).first();
    upperLongTimeEventLocator = page.locator(targetEventSelector).last();
    eventLocator = page.locator(targetEventSelector);
  });

  test('lower long time event become longer when drag to upper side', async ({ page }) => {
    // Given
    const eventBoundingBox = await getBoundingBox(lowerLongTimeEventLocator);

    // When
    await page.mouse.move(eventBoundingBox.x + 10, eventBoundingBox.y + 10);
    await page.mouse.down();
    await page.mouse.move(eventBoundingBox.x + 10, eventBoundingBox.y - 10);

    // Then
    const shadowEventBoundingBox = await getBoundingBox(eventLocator.first());
    expect(shadowEventBoundingBox.y).toBeLessThan(eventBoundingBox.y);
    expect(shadowEventBoundingBox.height).toBeGreaterThan(eventBoundingBox.height);
  });

  test('lower long time event become shorter when drag to lower side', async ({ page }) => {
    // Given
    const eventBoundingBox = await getBoundingBox(lowerLongTimeEventLocator);

    // When
    await page.mouse.move(eventBoundingBox.x + 10, eventBoundingBox.y + 10);
    await page.mouse.down();
    await page.mouse.move(eventBoundingBox.x + 10, eventBoundingBox.y + 30);

    // Then
    const shadowEventBoundingBox = await getBoundingBox(eventLocator.first());
    // NOTE: shadow event's height is greater than event's height, but it looks like it isn't.
    //       height is truncated because of stacking context.
    expect(shadowEventBoundingBox.y).toBeGreaterThan(eventBoundingBox.y);
  });

  test('upper long time event become longer when drag to lower side', async ({ page }) => {
    // Given
    const eventBoundingBox = await getBoundingBox(upperLongTimeEventLocator);

    // When
    await page.mouse.move(eventBoundingBox.x + 10, eventBoundingBox.y + 10);
    await page.mouse.down();
    await page.mouse.move(eventBoundingBox.x + 10, eventBoundingBox.y + 30);

    // Then
    const shadowEventBoundingBox = await getBoundingBox(eventLocator.first());
    expect(shadowEventBoundingBox.height).toBeGreaterThan(eventBoundingBox.height);
  });

  test('upper long time event become shorter when drag to upper side', async ({ page }) => {
    // Given
    const eventBoundingBox = await getBoundingBox(upperLongTimeEventLocator);

    // When
    await page.mouse.move(eventBoundingBox.x + 10, eventBoundingBox.y + 100);
    await page.mouse.down();
    await page.mouse.move(eventBoundingBox.x + 10, eventBoundingBox.y + 50);

    // Then
    const shadowEventBoundingBox = await getBoundingBox(eventLocator.first());
    expect(shadowEventBoundingBox.height).toBeLessThan(eventBoundingBox.height);
  });
});
