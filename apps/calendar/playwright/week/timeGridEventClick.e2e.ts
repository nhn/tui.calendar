import { expect, test } from '@playwright/test';
import type { BoundingBox } from 'playwright/types';

import { mockWeekViewEvents } from '../../stories/mocks/mockWeekViewEvents';
import { WEEK_VIEW_DUPLICATE_EVENTS_PAGE_URL, WEEK_VIEW_PAGE_URL } from '../configs';
import { getBoundingBox, getTimeEventSelector } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(WEEK_VIEW_PAGE_URL);
});

const targetEvents = mockWeekViewEvents.filter(({ isAllday }) => !isAllday);
targetEvents.forEach(({ title }) => {
  test(`Click event: show popup when ${title} is clicked`, async ({ page }) => {
    // Given
    const targetEventSelector = getTimeEventSelector(title);
    const targetEventLocator = page.locator(targetEventSelector).last();
    const targetEventBoundingBox = await getBoundingBox(targetEventLocator);

    // When
    await page.mouse.move(targetEventBoundingBox.x + 2, targetEventBoundingBox.y + 2);
    await page.mouse.down();
    await page.mouse.up();

    // Then
    const detailPopup = page.locator('css=[role=dialog]');
    await expect(detailPopup).toBeVisible();
  });
});

test.describe('Collapse duplicate events', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(WEEK_VIEW_DUPLICATE_EVENTS_PAGE_URL);
  });

  const collapsedEvents = mockWeekViewEvents.filter(({ title }) =>
    title.match(/duplicate event(\s\d)?$/)
  );
  const [collapsedEvent] = collapsedEvents;

  test('The duplicate events are sorted according to the result of getDuplicateEvents option.', async ({
    page,
  }) => {
    // Given
    // getDuplicateEvents: sort by calendarId in descending order
    const sortedDuplicateEvents = mockWeekViewEvents
      .filter(({ title }) => title.startsWith('duplicate event 2'))
      .sort((a, b) => (b.calendarId > a.calendarId ? 1 : -1));

    // When
    // Nothing

    // Then
    const promiseBoundingBoxes: Promise<BoundingBox>[] = [];
    sortedDuplicateEvents.forEach((event) => {
      const eventLocator = page.locator(getTimeEventSelector(event.title));
      promiseBoundingBoxes.push(getBoundingBox(eventLocator));
    });

    await Promise.all(promiseBoundingBoxes).then((eventBoundingBoxes) => {
      let prevX = -1;
      eventBoundingBoxes.forEach(({ x }) => {
        expect(prevX).toBeLessThan(x);
        prevX = x;
      });
    });
  });

  collapsedEvents.forEach((event) => {
    test(`When clicking the collapsed duplicate event, it should be expanded. - ${event.title}`, async ({
      page,
    }) => {
      // Given
      const collapsedEventLocator = page.locator(getTimeEventSelector(event.title));
      const { x, y, width: widthBeforeClick } = await getBoundingBox(collapsedEventLocator);
      const mainEventLocator = page.locator(getTimeEventSelector(`${event.title} - main`));
      const { width: mainEventWidth } = await getBoundingBox(mainEventLocator);

      // When
      await page.mouse.move(x + 2, y + 2);
      await page.mouse.down();
      await page.mouse.up();

      // Then
      const { width: widthAfterClick } = await getBoundingBox(collapsedEventLocator);
      expect(widthAfterClick).toBeGreaterThan(widthBeforeClick);
      expect(widthAfterClick).toBeCloseTo(mainEventWidth, -1);
    });
  });

  const otherEvents = mockWeekViewEvents.filter(({ title }) => {
    return (
      title === 'duplicate event with durations' || // duplicate event in the same duplicate event group
      title === 'duplicate event 2' || // duplicate event but not in the same duplicate event group
      title === 'short time event' // normal event
    );
  });
  otherEvents.forEach((otherEvent) => {
    test(`When clicking the other event (title: ${otherEvent.title}), the previous expanded event should be collapsed.`, async ({
      page,
    }) => {
      // Given
      const collapsedEventLocator = page.locator(getTimeEventSelector(collapsedEvent.title));
      const { x, y, width: widthBeforeClick } = await getBoundingBox(collapsedEventLocator);
      await page.mouse.move(x + 2, y + 2);
      await page.mouse.down();
      await page.mouse.up();

      // When
      const otherEventLocator = page.locator(getTimeEventSelector(otherEvent.title));
      const {
        x: otherX,
        y: otherY,
        width: otherWidthBeforeClick,
      } = await getBoundingBox(otherEventLocator);
      await page.mouse.move(otherX + 2, otherY + 2);
      await page.mouse.down();
      await page.mouse.up();

      // Then
      const { width: widthAfterClick } = await getBoundingBox(collapsedEventLocator);
      const { width: otherWidthAfterClick } = await getBoundingBox(otherEventLocator);
      expect(widthAfterClick).toBeCloseTo(widthBeforeClick, -1);

      if (otherEvent.title.includes('duplicate')) {
        // if the next clicked event is duplicate, it should be expanded.
        expect(otherWidthAfterClick).toBeGreaterThan(otherWidthBeforeClick);
      }
    });
  });

  test('When clicking one day of a two-day duplicate event, the other day also should be expanded.', async ({
    page,
  }) => {
    // Given
    const longCollapsedEventTitle = 'duplicate long event';
    const longCollapsedEventLocator = page.locator(getTimeEventSelector(longCollapsedEventTitle));
    const firstDayLocator = longCollapsedEventLocator.first();
    const lastDayLocator = longCollapsedEventLocator.last();
    const { x, y, width: widthBeforeClick } = await getBoundingBox(firstDayLocator);

    // When
    await page.mouse.move(x + 2, y + 2);
    await page.mouse.down();
    await page.mouse.up();

    // Then
    const { width: widthAfterClick } = await getBoundingBox(firstDayLocator);
    const { width: widthAfterClickOnLastDay } = await getBoundingBox(lastDayLocator);
    expect(widthAfterClick).toBeGreaterThan(widthBeforeClick);
    expect(widthAfterClickOnLastDay).toBeCloseTo(widthAfterClick);
  });
});
