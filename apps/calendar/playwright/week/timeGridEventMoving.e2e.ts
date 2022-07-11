import type { Locator } from '@playwright/test';
import { expect, test } from '@playwright/test';

import type TZDate from '../../src/time/date';
import { addHours, isSameDate } from '../../src/time/datetime';
import type { FormattedTimeString } from '../../src/types/time/datetime';
import { mockWeekViewEvents } from '../../stories/mocks/mockWeekViewEvents';
import { WEEK_VIEW_PAGE_URL } from '../configs';
import { Direction } from '../types';
import {
  dragAndDrop,
  getBoundingBox,
  getGuideTimeEventSelector,
  getTimeEventSelector,
  getTimeGridLineSelector,
  getTimeStrFromDate,
} from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(WEEK_VIEW_PAGE_URL);
});

const TIME_EVENTS = mockWeekViewEvents.filter(({ isAllday }) => !isAllday);
const [TWO_VIEW_EVENT, SHORT_TIME_EVENT, LONG_TIME_EVENT] = TIME_EVENTS;

const MOVE_EVENT_SELECTOR = '[class*="dragging--move-event"]';

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

cases.forEach(({ title, eventColumnIndex, directionInfo }) => {
  directionInfo.forEach(({ direction, startTimeAfterMoving, timeToDrop }) => {
    test(`Moving event: ${title} for ${direction}`, async ({ page }) => {
      // Given
      const eventLocator = page.locator(getTimeEventSelector(title)).last();
      const targetRowLocator = page.locator(getTimeGridLineSelector(timeToDrop));
      const targetColumnLocator = page.locator(`data-testid=timegrid-column-${eventColumnIndex}`);

      const targetColumnBoundingBox = await getBoundingBox(targetColumnLocator);

      // When
      await dragAndDrop({
        page,
        sourceLocator: eventLocator,
        targetLocator: targetRowLocator,
        options: {
          sourcePosition: {
            x: 5,
            y: 5,
          },
          targetPosition: {
            y: 5,
            x: targetColumnBoundingBox.x - 5,
          },
        },
      });

      // Then
      const eventBoundingBoxAfterMove = await getBoundingBox(eventLocator);
      expect(eventBoundingBoxAfterMove.x).toBeCloseTo(targetColumnBoundingBox.x, -1);
      await expect.poll(() => eventLocator.textContent()).toMatch(new RegExp(startTimeAfterMoving));
    });
  });
});

test('When pressing down the ESC key, the moving event resets to the initial position.', async ({
  page,
}) => {
  // Given
  const eventLocator = page.locator(getTimeEventSelector(SHORT_TIME_EVENT.title));
  const eventBoundingBoxBeforeMove = await getBoundingBox(eventLocator);

  const targetStartTime = getTimeStrFromDate(
    addHours(SHORT_TIME_EVENT.end as TZDate, 1)
  ) as FormattedTimeString;
  const targetRowLocator = page.locator(getTimeGridLineSelector(targetStartTime));

  // When
  await dragAndDrop({
    page,
    sourceLocator: eventLocator,
    targetLocator: targetRowLocator,
    hold: true,
  });
  await page.keyboard.down('Escape');

  // Then
  const eventBoundingBoxAfterMove = await getBoundingBox(eventLocator);
  expect(eventBoundingBoxAfterMove).toEqual(eventBoundingBoxBeforeMove);
});

test.describe('CSS class for a move event', () => {
  test('should be applied depending on a dragging state.', async ({ page }) => {
    // Given
    const eventLocator = page.locator(getTimeEventSelector(SHORT_TIME_EVENT.title));
    const eventBoundingBox = await getBoundingBox(eventLocator);
    const moveEventClassLocator = page.locator(MOVE_EVENT_SELECTOR);

    // When (a drag has not started yet)
    await page.mouse.move(eventBoundingBox.x + 10, eventBoundingBox.y + 10);
    await page.mouse.down();

    // Then
    expect(await moveEventClassLocator.count()).toBe(0);

    // When (a drag is working)
    await page.mouse.move(eventBoundingBox.x + 10, eventBoundingBox.y + 50);

    // Then
    expect(await moveEventClassLocator.count()).toBe(1);

    // When (a drag is finished)
    await page.mouse.up();

    // Then
    expect(await moveEventClassLocator.count()).toBe(0);
  });

  test('should not be applied when a drag is canceled.', async ({ page }) => {
    // Given
    const eventLocator = page.locator(getTimeEventSelector(SHORT_TIME_EVENT.title));
    const moveEventClassLocator = page.locator(MOVE_EVENT_SELECTOR);

    // When
    await dragAndDrop({
      page,
      sourceLocator: eventLocator,
      targetLocator: eventLocator,
      options: {
        targetPosition: { x: 10, y: 30 },
      },
      hold: true,
    });
    await page.keyboard.down('Escape');

    // Then
    expect(await moveEventClassLocator.count()).toBe(0);
  });
});

test.describe(`Calibrate event's height while dragging`, () => {
  let lowerLongTimeEventLocator: Locator;
  let upperLongTimeEventLocator: Locator;
  let guideLocator: Locator;

  test.beforeEach(({ page }) => {
    const targetEventSelector = getTimeEventSelector(LONG_TIME_EVENT.title);

    lowerLongTimeEventLocator = page.locator(targetEventSelector).first();
    upperLongTimeEventLocator = page.locator(targetEventSelector).last();
    guideLocator = page.locator(getGuideTimeEventSelector());
  });

  test('lower long time event become longer while drag to upper side', async ({ page }) => {
    // Given
    const eventBoundingBox = await getBoundingBox(lowerLongTimeEventLocator);

    // When
    await dragAndDrop({
      page,
      sourceLocator: lowerLongTimeEventLocator,
      targetLocator: lowerLongTimeEventLocator,
      options: {
        sourcePosition: { x: 10, y: 10 },
        targetPosition: { x: 10, y: -10 },
      },
      hold: true,
    });

    // Then
    const guideBoundingBox = await getBoundingBox(guideLocator);
    expect(guideBoundingBox.y).toBeLessThan(eventBoundingBox.y);
    expect(guideBoundingBox.height).toBeGreaterThan(eventBoundingBox.height);
  });

  test('lower long time event become shorter while drag to lower side', async ({ page }) => {
    // Given
    const eventBoundingBox = await getBoundingBox(lowerLongTimeEventLocator);

    // When
    await dragAndDrop({
      page,
      sourceLocator: lowerLongTimeEventLocator,
      targetLocator: lowerLongTimeEventLocator,
      options: {
        sourcePosition: { x: 10, y: 10 },
        targetPosition: { x: 10, y: 30 },
      },
      hold: true,
    });

    // Then
    const guideBoundingBox = await getBoundingBox(guideLocator);
    // NOTE: the guide event's height is greater than event's height, but it looks like it isn't.
    //       height is truncated because of stacking context.
    expect(guideBoundingBox.y).toBeGreaterThan(eventBoundingBox.y);
  });

  test('upper long time event become longer while drag to lower side', async ({ page }) => {
    // Given
    const eventBoundingBox = await getBoundingBox(upperLongTimeEventLocator);

    // When
    await dragAndDrop({
      page,
      sourceLocator: upperLongTimeEventLocator,
      targetLocator: upperLongTimeEventLocator,
      options: {
        sourcePosition: { x: 10, y: 10 },
        targetPosition: { x: 10, y: 30 },
      },
      hold: true,
    });

    // Then
    const guideBoundingBox = await getBoundingBox(guideLocator);
    expect(guideBoundingBox.height).toBeGreaterThan(eventBoundingBox.height);
  });

  test('upper long time event become shorter while drag to upper side', async ({ page }) => {
    // Given
    const eventBoundingBox = await getBoundingBox(upperLongTimeEventLocator);

    // When
    await dragAndDrop({
      page,
      sourceLocator: upperLongTimeEventLocator,
      targetLocator: upperLongTimeEventLocator,
      options: {
        sourcePosition: { x: 10, y: 100 },
        targetPosition: { x: 10, y: 50 },
      },
      hold: true,
    });

    // Then
    const guideBoundingBox = await getBoundingBox(guideLocator);
    expect(guideBoundingBox.height).toBeLessThan(eventBoundingBox.height);
  });
});

const ONE_DAY_TIME_EVENTS = mockWeekViewEvents.filter(
  ({ isAllday, start, end }) => !isAllday && isSameDate(start, end)
);

ONE_DAY_TIME_EVENTS.forEach(({ title }) => {
  test(`The height of guide element should be same as the event element. - ${title}`, async ({
    page,
  }) => {
    // Given
    const eventLocator = page.locator(getTimeEventSelector(title));
    const eventBoundingBox = await getBoundingBox(eventLocator);

    const targetRowLocator = page.locator(getTimeGridLineSelector('02:00'));
    const targetColumnLocator = page.locator('data-testid=timegrid-column-2');
    const targetColumnBoundingBox = await getBoundingBox(targetColumnLocator);

    // When
    await dragAndDrop({
      page,
      sourceLocator: eventLocator,
      targetLocator: targetRowLocator,
      options: {
        sourcePosition: {
          x: 5,
          y: 5,
        },
        targetPosition: {
          y: 5,
          x: targetColumnBoundingBox.x - 5,
        },
      },
      hold: true,
    });

    // Then
    const guideLocator = page.locator(getGuideTimeEventSelector());
    const guideBoundingBox = await getBoundingBox(guideLocator);
    expect(guideBoundingBox.height).toBeCloseTo(eventBoundingBox.height, 0);
  });
});
