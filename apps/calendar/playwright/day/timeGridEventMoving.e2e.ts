import { expect, test } from '@playwright/test';

import { addHours, setTimeStrToDate } from '../../src/time/datetime';
import { mockDayViewEvents } from '../../stories/mocks/mockDayViewEvents';
import type { FormattedTimeString } from '../../types/time/datetime';
import { DAY_VIEW_PAGE_URL } from '../configs';
import type { BoundingBox } from '../types';
import {
  dragAndDrop,
  getBoundingBox,
  getTimeGridLineSelector,
  getTimeStrFromDate,
  waitForSingleElement,
} from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(DAY_VIEW_PAGE_URL);
});

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

mockDayViewEvents
  .filter(({ isAllday }) => !isAllday)
  .forEach(({ title: eventTitle, start, end }) => {
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
          await dragAndDrop(page, eventLocator, targetRowLocator, {
            sourcePosition: {
              x: 1,
              y: dragStartRowBoundingBox.y - eventBoundingBoxBeforeMove.y + 1,
            },
            targetPosition: {
              y: 1,
              x: 1,
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

const [LONG_TIME_EVENT] = mockDayViewEvents.filter(({ title }) => title === 'long time');

function getCenterOfBoundingBox(boundingBox: BoundingBox): [number, number] {
  return [boundingBox.x + boundingBox.width / 2, boundingBox.y + boundingBox.height / 2];
}

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
      const targetBoundingBox = await getBoundingBox(targetRowLocator);

      // When
      await page.mouse.move(...getCenterOfBoundingBox(eventBoundingBoxBeforeMove));
      await page.mouse.down();
      await page.mouse.move(...getCenterOfBoundingBox(targetBoundingBox));

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
