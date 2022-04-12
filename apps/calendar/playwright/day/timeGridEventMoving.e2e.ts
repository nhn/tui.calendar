import { expect, test } from '@playwright/test';

import { addHours, setTimeStrToDate } from '../../src/time/datetime';
import { mockDayViewEvents } from '../../stories/mocks/mockDayViewEvents';
import type { FormattedTimeString } from '../../types/time/datetime';
import { DAY_VIEW_PAGE_URL } from '../configs';
import { dragAndDrop, getBoundingBox, getTimeGridLineSelector, getTimeStrFromDate } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(DAY_VIEW_PAGE_URL);
});

// Every time grid events in mockDayViewEvents should include DRAG_START_TIME.
const DRAG_START_TIME = '04:00';

const cases: { title: string; step: number }[] = [
  {
    title: 'to the top',
    step: -3, // move to 3 hours back
  },
  {
    title: 'to the bottom',
    step: 5, // move to 5 hours later
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

          // When
          await dragAndDrop(eventLocator, targetRowLocator, {
            sourcePosition: {
              x: 1,
              y: dragStartRowBoundingBox.y - eventBoundingBoxBeforeMove.y + 1,
            },
            targetPosition: {
              y: 1,
              x: 1,
            },
          });

          // Then
          const startTimeAfterMove = getTimeStrFromDate(addHours(start, step));
          await expect(eventLocator).toHaveText(new RegExp(startTimeAfterMove));
        });
      });
    });
  });
