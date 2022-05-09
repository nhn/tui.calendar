import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

import { mockWeekViewEvents } from '../../stories/mocks/mockWeekViewEvents';
import type { FormattedTimeString } from '../../types/time/datetime';
import { WEEK_VIEW_PAGE_URL } from '../configs';
import {
  dragAndDrop,
  getBoundingBox,
  getTimeGridLineSelector,
  queryLocatorByTestId,
  waitForSingleElement,
} from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(WEEK_VIEW_PAGE_URL);
});

function getHourDifference(minuend: FormattedTimeString, subtrahend: FormattedTimeString) {
  return Number(minuend.split(':')[0]) - Number(subtrahend.split(':')[0]);
}

interface EventInfo {
  title: string;
  startTime: FormattedTimeString;
  endTime: FormattedTimeString;
  endDateColumnIndex: number;
}

const [TWO_VIEW_EVENT, SHORT_TIME_EVENT, LONG_TIME_EVENT] = mockWeekViewEvents.filter(
  ({ isAllday }) => !isAllday
);

const targetEvents: EventInfo[] = [
  {
    title: TWO_VIEW_EVENT.title,
    startTime: '10:00',
    endTime: '06:00',
    endDateColumnIndex: 0,
  },
  {
    title: SHORT_TIME_EVENT.title,
    startTime: '04:00',
    endTime: '06:00',
    endDateColumnIndex: 3,
  },
  {
    title: LONG_TIME_EVENT.title,
    startTime: '10:00',
    endTime: '06:00',
    endDateColumnIndex: 6,
  },
];

const cases: {
  title: string;
  targetEndTime: FormattedTimeString;
  targetColumnIndex?: number;
  matcherToCompare: Extract<keyof jest.Matchers<number>, 'toBeGreaterThan' | 'toBeLessThan'>;
}[] = [
  {
    title: 'to the bottom',
    targetEndTime: '08:00',
    matcherToCompare: 'toBeGreaterThan',
  },
  {
    title: 'to the top',
    targetEndTime: '04:00',
    matcherToCompare: 'toBeLessThan',
  },
  {
    title: 'up to the y of the cursor when the target column is to the right of the current column',
    targetEndTime: '08:00',
    targetColumnIndex: 5,
    matcherToCompare: 'toBeGreaterThan',
  },
  {
    title: 'up to the y of the cursor when the target column is to the left of the current column',
    targetEndTime: '04:00',
    targetColumnIndex: 0,
    matcherToCompare: 'toBeLessThan',
  },
];

async function setup({
  page,
  targetEventTitle,
  targetEndTime,
  targetColumnIndex,
}: {
  page: Page;
  targetEventTitle: string;
  targetEndTime: FormattedTimeString;
  targetColumnIndex: number;
}) {
  // Given
  const eventLocator = queryLocatorByTestId(page, `time-event-${targetEventTitle}`).last();
  const resizeHandlerLocator = eventLocator.locator('[class*="resize-handler"]');
  const targetRowLocator = page.locator(getTimeGridLineSelector(targetEndTime));
  const targetColumnLocator = queryLocatorByTestId(page, `timegrid-column-${targetColumnIndex}`);
  const eventBoundingBoxBeforeResize = await getBoundingBox(eventLocator);

  const targetRowBoundingBox = await getBoundingBox(targetRowLocator);
  const targetColumnBoundingBox = await getBoundingBox(targetColumnLocator);

  // When
  await dragAndDrop(page, resizeHandlerLocator, targetRowLocator, {
    sourcePosition: {
      x: 1,
      y: 1,
    },
    targetPosition: {
      x: targetColumnBoundingBox.x + 1,
      y: targetRowBoundingBox.height / 2,
    },
  });
  await waitForSingleElement(eventLocator);

  let eventBoundingBoxAfterResize = await getBoundingBox(eventLocator);
  await expect
    .poll(async () => {
      eventBoundingBoxAfterResize = await getBoundingBox(eventLocator);

      return eventBoundingBoxAfterResize;
    })
    .not.toEqual(eventBoundingBoxBeforeResize);

  return {
    eventLocator,
    eventBoundingBoxBeforeResize,
    eventBoundingBoxAfterResize,
    targetRowBoundingBox,
  };
}

targetEvents.forEach(({ title: eventTitle, startTime, endTime, endDateColumnIndex }) => {
  test.describe(`Resize a ${eventTitle} in the time grid`, () => {
    cases.forEach(
      ({ title, targetEndTime, targetColumnIndex, matcherToCompare: compareAssertion }) => {
        test(`${title}`, async ({ page }) => {
          // Given

          // When
          const {
            eventLocator,
            eventBoundingBoxBeforeResize,
            eventBoundingBoxAfterResize,
            targetRowBoundingBox,
          } = await setup({
            page,
            targetEventTitle: eventTitle,
            targetEndTime,
            targetColumnIndex: targetColumnIndex || endDateColumnIndex,
          });

          // Then
          expect(eventBoundingBoxAfterResize.height)[compareAssertion](
            eventBoundingBoxBeforeResize.height
          );

          await expect(eventLocator).toContainText(startTime);

          const rowCount = getHourDifference(targetEndTime, endTime) * 2 + 1;
          expect(
            eventBoundingBoxAfterResize.height - eventBoundingBoxBeforeResize.height
          ).toBeCloseTo(targetRowBoundingBox.height * rowCount, -1);
        });
      }
    );

    test(`then it should have a minimum height(=1 row) even if the event is resized to before the start time`, async ({
      page,
    }) => {
      // Given

      // When
      const { eventBoundingBoxAfterResize, targetRowBoundingBox } = await setup({
        page,
        targetEventTitle: eventTitle,
        targetEndTime: '00:00',
        targetColumnIndex: endDateColumnIndex,
      });

      // Then
      expect(eventBoundingBoxAfterResize.height).toBeCloseTo(targetRowBoundingBox.height, -1);
    });
  });
});
