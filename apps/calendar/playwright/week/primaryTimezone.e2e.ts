import { expect, test } from '@playwright/test';

import { mockWeekViewEvents } from '../../stories/mocks/mockWeekViewEvents';
import { WEEK_VIEW_TIMEZONE_PAGE_URL } from '../configs';
import { getBoundingBox, queryLocatorByTestId } from '../utils';

const [mockEvent] = mockWeekViewEvents.filter(({ title }) => title.includes('short'));

test.beforeEach(async ({ page }) => {
  await page.goto(WEEK_VIEW_TIMEZONE_PAGE_URL);
});

test.describe('Primary Timezone', () => {
  test(`${mockEvent.title} should be rendered at the top of the time grid in Pakistan Standard Time`, async ({
    page,
  }) => {
    // Given
    const targetEventLocator = queryLocatorByTestId(page, `time-event-${mockEvent.title}`);
    const firstTimeGridRowLocator = queryLocatorByTestId(page, 'gridline-00:00');

    // When
    // Rendered

    // Then
    const eventBoundingBox = await getBoundingBox(targetEventLocator);
    const targetRowBoundingBox = await getBoundingBox(firstTimeGridRowLocator);

    expect(eventBoundingBox.y).toBeCloseTo(targetRowBoundingBox.y, -1);
  });
});
