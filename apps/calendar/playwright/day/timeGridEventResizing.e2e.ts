import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

import { addMinutes } from '../../src/time/datetime';
import { mockDayViewEvents } from '../../stories/mocks/mockDayViewEvents';
import type { FormattedTimeString } from '../../types/time/datetime';
import { DAY_VIEW_PAGE_URL } from '../configs';
import { dragAndDrop, getBoundingBox, getTimeGridLineSelector, getTimeStrFromDate } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(DAY_VIEW_PAGE_URL);
});

const cases: {
  title: string;
  step: number;
  matcherToCompare: Extract<keyof jest.Matchers<number>, 'toBeGreaterThan' | 'toBeLessThan'>;
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

  const resizeHandlerLocator = eventLocator.locator('[class*="resize-handler"]');

  const targetRowLocator = page.locator(getTimeGridLineSelector(targetEndTime));
  const targetRowBoundingBox = await getBoundingBox(targetRowLocator);

  // When
  await dragAndDrop(resizeHandlerLocator, targetRowLocator, {
    sourcePosition: {
      x: 1,
      y: 1,
    },
    targetPosition: {
      x: 1,
      y: targetRowBoundingBox.height / 2,
    },
  });

  const eventBoundingBoxAfterResize = await getBoundingBox(eventLocator);

  return {
    eventLocator,
    eventBoundingBoxBeforeResize,
    eventBoundingBoxAfterResize,
    targetRowBoundingBox,
  };
}

mockDayViewEvents
  .filter(({ isAllday }) => !isAllday)
  .forEach(({ title: eventTitle, start, end }) => {
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

          await expect(eventLocator).toContainText(getTimeStrFromDate(start));

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
