import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import type { Matchers } from '@playwright/test/types/expect-types';

import type TZDate from '../../src/time/date';
import { addHours, addMinutes } from '../../src/time/datetime';
import type { FormattedTimeString } from '../../src/types/time/datetime';
import { mockDayViewEvents } from '../../stories/mocks/mockDayViewEvents';
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

const RESIZE_HANDLER_SELECTOR = '[class*="resize-handler"]';
const RESIZE_EVENT_SELECTOR = '[class*="dragging--resize-vertical-event"]';

const cases: {
  title: string;
  step: number;
  matcherToCompare: Extract<keyof Matchers<number>, 'toBeGreaterThan' | 'toBeLessThan'>;
}[] = [
  {
    title: 'to the top',
    step: -1, // move the end time to 1 hour back
    matcherToCompare: 'toBeLessThan',
  },
  {
    title: 'to the bottom',
    step: 2, // move the end time to 2 hours later
    matcherToCompare: 'toBeGreaterThan',
  },
];

async function setup({
  page,
  targetEventTitle,
  targetEndTime,
}: {
  page: Page;
  targetEventTitle: string;
  targetEndTime: FormattedTimeString;
}) {
  // Given
  const targetEventSelector = `[data-testid*="time-event-${targetEventTitle}"]`;
  const eventLocator = page.locator(targetEventSelector);
  const eventBoundingBoxBeforeResize = await getBoundingBox(eventLocator);

  const resizeHandlerLocator = eventLocator.locator(RESIZE_HANDLER_SELECTOR);

  const targetRowLocator = page.locator(getTimeGridLineSelector(targetEndTime));
  const targetRowBoundingBox = await getBoundingBox(targetRowLocator);

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
        x: 1,
        y: targetRowBoundingBox.height / 2,
      },
    },
  });

  await waitForSingleElement(eventLocator);
  const eventBoundingBoxAfterResize = await getBoundingBox(eventLocator);

  return {
    eventLocator,
    eventBoundingBoxBeforeResize,
    eventBoundingBoxAfterResize,
    targetRowBoundingBox,
  };
}

const timeEvents = mockDayViewEvents.filter(
  ({ isAllday, goingDuration, comingDuration }) => !isAllday && !goingDuration && !comingDuration
);
const [, SHORT_TIME_EVENT] = timeEvents;

timeEvents.forEach(({ title: eventTitle, start, end }) => {
  test.describe(`Resize the ${eventTitle} event in the time grid`, () => {
    cases.forEach(({ title, step, matcherToCompare: compareAssertion }) => {
      test(`${title}`, async ({ page }) => {
        const targetEndTime = getTimeStrFromDate(
          addMinutes(end, (step * 2 - 1) * 30)
        ) as FormattedTimeString;
        const {
          eventLocator,
          eventBoundingBoxBeforeResize,
          eventBoundingBoxAfterResize,
          targetRowBoundingBox,
        } = await setup({
          page,
          targetEventTitle: eventTitle,
          targetEndTime,
        });

        // Then
        expect(eventBoundingBoxAfterResize.height)[compareAssertion](
          eventBoundingBoxBeforeResize.height
        );

        await expect.poll(() => eventLocator.textContent()).toContain(getTimeStrFromDate(start));

        expect(
          eventBoundingBoxAfterResize.height - eventBoundingBoxBeforeResize.height
        ).toBeCloseTo(targetRowBoundingBox.height * step * 2, -1);
      });
    });

    test(`then it should have a minimum height(=1 row) even if the event is resized to before the start time`, async ({
      page,
    }) => {
      const { eventBoundingBoxAfterResize, targetRowBoundingBox } = await setup({
        page,
        targetEventTitle: eventTitle,
        targetEndTime: '00:00',
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
        targetPosition: { x: 10, y: 30 },
      },
      hold: true,
    });
    await page.keyboard.down('Escape');

    // Then
    expect(await resizeEventClassLocator.count()).toBe(0);
  });
});
