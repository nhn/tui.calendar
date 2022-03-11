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

const cases: {
  name: string;
  targetEndTime: FormattedTimeString;
  compareAssertion: Extract<keyof jest.Matchers<number>, 'toBeGreaterThan' | 'toBeLessThan'>;
}[] = [
  {
    name: 'resize event to the bottom',
    targetEndTime: '08:00',
    compareAssertion: 'toBeGreaterThan',
  },
  {
    name: 'resize event to the top',
    targetEndTime: '05:00',
    compareAssertion: 'toBeLessThan',
  },
];

/**
 * 1. 이벤트는 리사이즈가 시작된 컬럼 안에서만 상하로 크기를 조정할 수 있다.
 * 2. 리사이즈가 완료되었을 때 전체 이벤트의 길이가 24시간이 넘어간다면 TimeGrid에서 제거되고 Allday 이벤트로 표시된다.
 */

test.describe.only('timegrid event resizing', () => {
  cases.forEach(({ name, targetEndTime, compareAssertion }) => {
    test(`${name}`, async ({ page }) => {
      // Given
      const eventLocator = page.locator(targetEventSelector);
      const resizeHandlerLocator = eventLocator.locator('[class*="resize-handler"]');
      const targetRowLocator = page.locator(getTimeGridLineLocator(targetEndTime));
      const targetColumnLocator = page.locator(`data-testid=timegrid-column-3`);
      const eventBoundingBoxBeforeResize = await getBoundingBox(eventLocator);

      const targetColumnBoundingBox = await getBoundingBox(targetColumnLocator);

      // When
      await dragAndDrop(resizeHandlerLocator, targetRowLocator, {
        sourcePosition: {
          x: 1,
          y: 1,
        },
        targetPosition: {
          y: 1,
          x: targetColumnBoundingBox.x + 1,
        },
      });

      // Then
      const eventBoundingBoxAfterResize = await getBoundingBox(eventLocator);
      expect(eventBoundingBoxAfterResize.height)[compareAssertion](
        eventBoundingBoxBeforeResize.height
      );

      const targetRowBoundingBox = await getBoundingBox(targetRowLocator);
      expect(eventBoundingBoxAfterResize.y + eventBoundingBoxAfterResize.height).toBeCloseTo(
        targetRowBoundingBox.y,
        -1
      );
    });
  });
});
