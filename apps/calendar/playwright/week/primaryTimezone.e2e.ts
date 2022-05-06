import { expect, test } from '@playwright/test';

import { mockWeekViewEvents } from '../../stories/mocks/mockWeekViewEvents';
import { WEEK_VIEW_TIMEZONE_PAGE_URL } from '../configs';
import { queryLocatorByTestId } from '../utils';

const [mockEvent] = mockWeekViewEvents.filter(({ title }) => title.includes('short'));

// From local timezone (+09:00) to target timezone (+05:00)
const TARGET_TIMEZONE_HOUR_DIFFERENCE = 4;

test.beforeEach(async ({ page }) => {
  await page.goto(WEEK_VIEW_TIMEZONE_PAGE_URL);
});

test.describe('Primary Timezone', () => {
  test(`${mockEvent.title} should be rendered at the top of the time grid in Pakistan Standard Time`, async ({
    page,
  }) => {
    // Given
    const targetEventLocator = queryLocatorByTestId(page, `time-event-${mockEvent.title}`);
    const originalStartTime = mockEvent.start.toDate();
    const originalStartHour = originalStartTime.getHours();
    const originalStartMinute = originalStartTime.getMinutes();

    const expectedEventStartTimeStr = `${String(
      originalStartHour - TARGET_TIMEZONE_HOUR_DIFFERENCE
    ).padStart(2, '0')}:${String(originalStartMinute).padStart(2, '0')}`;

    // When
    // Rendered

    // Then
    await expect(targetEventLocator).toHaveText(new RegExp(expectedEventStartTimeStr));
  });
});
