import { expect, test } from '@playwright/test';

import type { FormattedTimeString } from '../../types/time/datetime';
import { WEEK_VIEW_PAGE_URL } from '../configs';
import { dragAndDrop, getBoundingBox, getTimeGridLineLocator } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(WEEK_VIEW_PAGE_URL);
});

const TARGET_EVENT_TITLE = 'short time event';
// Target event is located in the fourth row of the time grid.
// And it starts from 04:00.
const targetEventSelector = `[data-testid*="time-event-${TARGET_EVENT_TITLE}"]`;

const cases: { name: string; targetStartTime: FormattedTimeString; targetColumnIndex: number }[] = [
  {
    name: 'drag event to the top of the day',
    targetStartTime: '02:00',
    targetColumnIndex: 3,
  },
  {
    name: 'drag event to the upper right of the day',
    targetStartTime: '02:00',
    targetColumnIndex: 4,
  },
  {
    name: 'drag event to the right of the day',
    targetStartTime: '04:00',
    targetColumnIndex: 4,
  },
  {
    name: 'drag event to the bottom right of the day',
    targetStartTime: '06:00',
    targetColumnIndex: 4,
  },
  {
    name: 'drag event to the bottom of the day',
    targetStartTime: '06:00',
    targetColumnIndex: 3,
  },
  {
    name: 'drag event to the lower left of the day',
    targetStartTime: '06:00',
    targetColumnIndex: 2,
  },
  {
    name: 'drag event to the left of the day',
    targetStartTime: '04:00',
    targetColumnIndex: 2,
  },
  {
    name: 'drag event to the upper left of the day',
    targetStartTime: '02:00',
    targetColumnIndex: 2,
  },
];

cases.forEach(({ name, targetStartTime, targetColumnIndex }) => {
  test(`${name}`, async ({ page }) => {
    // Given
    const eventLocator = page.locator(targetEventSelector);
    const targetRowLocator = page.locator(getTimeGridLineLocator(targetStartTime));
    const targetColumnLocator = page.locator(`data-testid=timegrid-column-${targetColumnIndex}`);

    const targetColumnBoundingBox = await getBoundingBox(targetColumnLocator);

    // When
    await dragAndDrop(eventLocator, targetRowLocator, {
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
    await expect(eventLocator).toHaveText(new RegExp(targetStartTime));
  });
});
