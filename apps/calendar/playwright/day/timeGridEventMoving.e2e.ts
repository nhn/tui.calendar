import { expect, test } from '@playwright/test';

import type TZDate from '../../src/time/date';
import { addHours, setTimeStrToDate } from '../../src/time/datetime';
import { mockDayViewEvents } from '../../stories/mocks/mockDayViewEvents';
import type { FormattedTimeString } from '../../types/time/datetime';
import { DAY_VIEW_PAGE_URL } from '../configs';
import {
  dragAndDrop,
  getBoundingBox,
  getTimeEventSelector,
  getTimeGridLineSelector,
  getTimeStrFromDate,
  waitForSingleElement,
} from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(DAY_VIEW_PAGE_URL);
});

const MOVE_EVENT_SELECTOR = '[class*="dragging--move-event"]';

// Every time grid events in mockDayViewEvents should include DRAG_START_TIME.
const DRAG_START_TIME = '04:00';

const cases: {
  title: string;
  step: number;
  matcherToCompare: Extract<keyof jest.Matchers<number>, 'toBeGreaterThan' | 'toBeLessThan'>;
}[] = [
  {
    title: 'to the top',
    step: -3, // move to 3 hours back
    matcherToCompare: 'toBeLessThan',
  },
  {
    title: 'to the bottom',
    step: 5, // move to 5 hours later
    matcherToCompare: 'toBeGreaterThan',
  },
];

const timeEvents = mockDayViewEvents.filter(({ isAllday }) => !isAllday);
const [, SHORT_TIME_EVENT] = timeEvents;

timeEvents.forEach(({ title: eventTitle, start, end }) => {
  test.describe(`Move the ${eventTitle} event in the time grid`, () => {
    cases.forEach(({ title, step }) => {
      test(`${title}`, async ({ page }) => {
        // Given
        const targetEventSelector = `[data-testid*="time-event-${eventTitle}"]`;
        const eventLocator = page.locator(targetEventSelector);
        const eventBoundingBoxBeforeMove = await getBoundingBox(eventLocator);

        const dragStartRowLocator = page.locator(getTimeGridLineSelector(DRAG_START_TIME));
        const dragStartRowBoundingBox = await getBoundingBox(dragStartRowLocator);

        const targetTime = getTimeStrFromDate(
          addHours(setTimeStrToDate(end, DRAG_START_TIME), step)
        ) as FormattedTimeString;
        const targetRowLocator = page.locator(getTimeGridLineSelector(targetTime));
        const expectedStartTimeAfterMove = getTimeStrFromDate(addHours(start, step));

        // When
        await dragAndDrop({
          page,
          sourceLocator: eventLocator,
          targetLocator: targetRowLocator,
          options: {
            sourcePosition: {
              x: 1,
              y: dragStartRowBoundingBox.y - eventBoundingBoxBeforeMove.y + 1,
            },
            targetPosition: {
              y: 1,
              x: 1,
            },
          },
        });
        await waitForSingleElement(eventLocator);

        // Then
        await expect
          .poll(() => eventLocator.textContent())
          .toMatch(new RegExp(expectedStartTimeAfterMove));
      });
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

const [LONG_TIME_EVENT] = mockDayViewEvents.filter(({ title }) => title === 'long time');

test.describe(`Calibrate event's height while dragging`, () => {
  cases.forEach(({ title, step, matcherToCompare }) => {
    test(`${title}`, async ({ page }) => {
      // Given
      const targetEventSelector = `[data-testid*="time-event-${LONG_TIME_EVENT.title}"]`;
      const eventLocator = page.locator(targetEventSelector);
      const eventBoundingBoxBeforeMove = await getBoundingBox(eventLocator);

      const targetTime = getTimeStrFromDate(
        addHours(setTimeStrToDate(LONG_TIME_EVENT.end, DRAG_START_TIME), step)
      ) as FormattedTimeString;
      const targetRowLocator = page.locator(getTimeGridLineSelector(targetTime));

      // When
      await dragAndDrop({
        page,
        sourceLocator: eventLocator,
        targetLocator: targetRowLocator,
        hold: true,
      });

      // Then
      await expect
        .poll(async () => {
          const shadowEventBoundingBox = await getBoundingBox(eventLocator.first());
          return shadowEventBoundingBox.height;
        })
        [matcherToCompare](eventBoundingBoxBeforeMove.height);
    });
  });
});
