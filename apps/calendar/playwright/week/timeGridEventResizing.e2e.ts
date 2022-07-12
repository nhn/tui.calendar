import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import type { Matchers } from '@playwright/test/types/expect-types';

import type TZDate from '../../src/time/date';
import { addHours } from '../../src/time/datetime';
import type { FormattedTimeString } from '../../src/types/time/datetime';
import { mockWeekViewEvents } from '../../stories/mocks/mockWeekViewEvents';
import { WEEK_VIEW_PAGE_URL } from '../configs';
import {
  dragAndDrop,
  getBoundingBox,
  getGuideTimeEventSelector,
  getTimeEventSelector,
  getTimeGridLineSelector,
  getTimeStrFromDate,
  queryLocatorByTestId,
  waitForSingleElement,
} from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(WEEK_VIEW_PAGE_URL);
});

const RESIZE_HANDLER_SELECTOR = '[class*="resize-handler"]';
const RESIZE_EVENT_SELECTOR = '[class*="dragging--resize-vertical-event"]';

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
  matcherToCompare: Extract<keyof Matchers<number>, 'toBeGreaterThan' | 'toBeLessThan'>;
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
  const resizeHandlerLocator = eventLocator.locator(RESIZE_HANDLER_SELECTOR);
  const targetRowLocator = page.locator(getTimeGridLineSelector(targetEndTime));
  const targetColumnLocator = queryLocatorByTestId(page, `timegrid-column-${targetColumnIndex}`);
  const eventBoundingBoxBeforeResize = await getBoundingBox(eventLocator);

  const targetRowBoundingBox = await getBoundingBox(targetRowLocator);
  const targetColumnBoundingBox = await getBoundingBox(targetColumnLocator);

  // When
  await dragAndDrop({
    page,
    sourceLocator: resizeHandlerLocator,
    targetLocator: targetRowLocator,
    options: {
      sourcePosition: {
        x: 1,
        y: 1,
      },
      targetPosition: {
        x: targetColumnBoundingBox.x + 1,
        y: targetRowBoundingBox.height / 2,
      },
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

test('When pressing down the ESC key, the resizing event resets to the initial size.', async ({
  page,
}) => {
  // Given
  const eventLocator = page.locator(getTimeEventSelector(SHORT_TIME_EVENT.title));
  const eventBoundingBoxBeforeResize = await getBoundingBox(eventLocator);

  const resizeHandlerLocator = eventLocator.locator(RESIZE_HANDLER_SELECTOR);

  const targetStartTime = getTimeStrFromDate(
    addHours(SHORT_TIME_EVENT.end as TZDate, 1)
  ) as FormattedTimeString;
  const targetRowLocator = page.locator(getTimeGridLineSelector(targetStartTime));

  // When
  await dragAndDrop({
    page,
    sourceLocator: resizeHandlerLocator,
    targetLocator: targetRowLocator,
    hold: true,
  });
  await page.keyboard.down('Escape');

  // Then
  const eventBoundingBoxAfterResize = await getBoundingBox(eventLocator);
  expect(eventBoundingBoxAfterResize).toEqual(eventBoundingBoxBeforeResize);
});

test.describe('CSS class for a resize event', () => {
  test('should be applied depending on a dragging state.', async ({ page }) => {
    // Given
    const eventLocator = page.locator(getTimeEventSelector(SHORT_TIME_EVENT.title));
    const resizeHandlerLocator = eventLocator.locator(RESIZE_HANDLER_SELECTOR);
    const resizeHandlerBoundingBox = await getBoundingBox(resizeHandlerLocator);

    const resizeEventClassLocator = page.locator(RESIZE_EVENT_SELECTOR);

    // When (a drag has not started yet)
    await page.mouse.move(resizeHandlerBoundingBox.x + 10, resizeHandlerBoundingBox.y + 3);
    await page.mouse.down();

    // Then
    expect(await resizeEventClassLocator.count()).toBe(0);

    // When (a drag is working)
    await page.mouse.move(resizeHandlerBoundingBox.x + 10, resizeHandlerBoundingBox.y + 50);

    // Then
    expect(await resizeEventClassLocator.count()).toBe(1);

    // When (a drag is finished)
    await page.mouse.up();

    // Then
    expect(await resizeEventClassLocator.count()).toBe(0);
  });

  test('should not be applied when a drag is canceled.', async ({ page }) => {
    // Given
    const eventLocator = page.locator(getTimeEventSelector(SHORT_TIME_EVENT.title));
    const resizeHandlerLocator = eventLocator.locator(RESIZE_HANDLER_SELECTOR);

    const resizeEventClassLocator = page.locator(RESIZE_EVENT_SELECTOR);

    // When
    await dragAndDrop({
      page,
      sourceLocator: resizeHandlerLocator,
      targetLocator: resizeHandlerLocator,
      options: {
        targetPosition: { x: 10, y: 50 },
      },
    });
    await page.keyboard.down('Escape');

    // Then
    expect(await resizeEventClassLocator.count()).toBe(0);
  });
});

test.describe('Resizing the event which has a going or coming duration', () => {
  const [event] = mockWeekViewEvents.filter(
    ({ isAllday, goingDuration, comingDuration }) => !isAllday && (goingDuration || comingDuration)
  );

  async function setupResizingGoingOrComingDuration(
    page: Page,
    targetEndTime: FormattedTimeString,
    hold?: boolean
  ) {
    const eventLocator = queryLocatorByTestId(page, `time-event-${event.title}`).last();

    const travelTimeLocator = eventLocator.locator('[class*="travel-time"]');
    const goingDurationLocator = travelTimeLocator.first();
    const goingDurationBoundingBoxBeforeResize = await getBoundingBox(goingDurationLocator);
    const comingDurationLocator = travelTimeLocator.last();
    const comingDurationBoundingBoxBeforeResize = await getBoundingBox(comingDurationLocator);

    const eventTimeLocator = eventLocator.locator('[class*="event-time"]');
    const modelDurationBoundingBoxBeforeResize = await getBoundingBox(eventTimeLocator);

    const resizeHandlerLocator = eventLocator.locator(RESIZE_HANDLER_SELECTOR);
    const targetRowLocator = page.locator(getTimeGridLineSelector(targetEndTime));
    const targetRowBoundingBox = await getBoundingBox(targetRowLocator);

    await dragAndDrop({
      page,
      sourceLocator: resizeHandlerLocator,
      targetLocator: targetRowLocator,
      options: {
        sourcePosition: {
          x: 1,
          y: 1,
        },
        targetPosition: {
          x: targetRowBoundingBox.width / 2,
          y: targetRowBoundingBox.height / 2,
        },
      },
      hold,
    });

    let draggingGoingDurationBoundingBox = null;
    let draggingComingDurationBoundingBox = null;
    let draggingModelDurationBoundingBox = null;
    if (hold) {
      const draggingEventLocator = page.locator(getGuideTimeEventSelector());
      const draggingTravelTimeLocator = draggingEventLocator.locator('[class*="travel-time"]');
      const draggingGoingDurationLocator = draggingTravelTimeLocator.first();
      draggingGoingDurationBoundingBox = await getBoundingBox(draggingGoingDurationLocator);
      const draggingComingDurationLocator = draggingTravelTimeLocator.last();
      draggingComingDurationBoundingBox = await getBoundingBox(draggingComingDurationLocator);

      const draggingEventTimeLocator = draggingEventLocator.locator('[class*="event-time"]');
      draggingModelDurationBoundingBox = await getBoundingBox(draggingEventTimeLocator);
    }

    const goingDurationBoundingBoxAfterResize = await getBoundingBox(goingDurationLocator);
    const comingDurationBoundingBoxAfterResize = await getBoundingBox(comingDurationLocator);
    const modelDurationBoundingBoxAfterResize = await getBoundingBox(eventTimeLocator);

    return {
      goingDurationBoundingBoxBeforeResize,
      goingDurationBoundingBoxAfterResize,
      comingDurationBoundingBoxBeforeResize,
      comingDurationBoundingBoxAfterResize,
      modelDurationBoundingBoxBeforeResize,
      modelDurationBoundingBoxAfterResize,
      draggingGoingDurationBoundingBox,
      draggingComingDurationBoundingBox,
      draggingModelDurationBoundingBox,
      rowHeight: targetRowBoundingBox.height,
    };
  }

  test('should change only the end time.', async ({ page }) => {
    // Given
    const targetEndTime = '10:00';

    // When
    const {
      goingDurationBoundingBoxBeforeResize,
      goingDurationBoundingBoxAfterResize,
      comingDurationBoundingBoxBeforeResize,
      comingDurationBoundingBoxAfterResize,
      modelDurationBoundingBoxBeforeResize,
      modelDurationBoundingBoxAfterResize,
    } = await setupResizingGoingOrComingDuration(page, targetEndTime);

    // Then
    expect(goingDurationBoundingBoxAfterResize.height).toBeCloseTo(
      goingDurationBoundingBoxBeforeResize.height,
      -1
    );
    expect(comingDurationBoundingBoxAfterResize.height).toBeCloseTo(
      comingDurationBoundingBoxBeforeResize.height,
      -1
    );
    expect(modelDurationBoundingBoxAfterResize.height).toBeGreaterThan(
      modelDurationBoundingBoxBeforeResize.height
    );
  });

  test('the dragging element should have a minimum height(=1 row) without going and coming durations.', async ({
    page,
  }) => {
    // Given
    const targetEndTime = '04:00';

    // When
    const {
      goingDurationBoundingBoxBeforeResize,
      comingDurationBoundingBoxBeforeResize,
      draggingGoingDurationBoundingBox,
      draggingComingDurationBoundingBox,
      draggingModelDurationBoundingBox,
      rowHeight,
    } = await setupResizingGoingOrComingDuration(page, targetEndTime, true);

    // Then
    expect(draggingGoingDurationBoundingBox?.height).toBeCloseTo(
      goingDurationBoundingBoxBeforeResize.height,
      -1
    );
    expect(draggingComingDurationBoundingBox?.height).toBeCloseTo(
      comingDurationBoundingBoxBeforeResize.height,
      -1
    );
    expect(draggingModelDurationBoundingBox?.height).toBeCloseTo(rowHeight, -1);
  });

  test('the result of resizing should have a minimum height(=1 row) without going and coming durations.', async ({
    page,
  }) => {
    // Given
    const targetEndTime = '04:00';

    // When
    const {
      goingDurationBoundingBoxBeforeResize,
      goingDurationBoundingBoxAfterResize,
      comingDurationBoundingBoxBeforeResize,
      comingDurationBoundingBoxAfterResize,
      modelDurationBoundingBoxAfterResize,
      rowHeight,
    } = await setupResizingGoingOrComingDuration(page, targetEndTime);

    // Then
    expect(goingDurationBoundingBoxAfterResize.height).toBeCloseTo(
      goingDurationBoundingBoxBeforeResize.height,
      -1
    );
    expect(comingDurationBoundingBoxAfterResize.height).toBeCloseTo(
      comingDurationBoundingBoxBeforeResize.height,
      -1
    );
    expect(modelDurationBoundingBoxAfterResize.height).toBeCloseTo(rowHeight, -1);
  });
});
