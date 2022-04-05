import { expect, Page, test } from '@playwright/test';

import { mockDayViewEvents } from '../../stories/mocks/mockDayViewEvents';
import { DAY_VIEW_PAGE_URL } from '../configs';
import { getBoundingBox, getPrefixedClassName } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(DAY_VIEW_PAGE_URL);
});

// NOTE: Syncing scroll only happens when the mousemove event is fired
// and cannot use `dragAndDrop` because it's better to be manually controlled.

function getScrollTop(el: HTMLElement) {
  return el.scrollTop;
}

test.describe('Scroll syncing in time grid when selecting grid', () => {
  /**
   * Top right of the column should be empty
   */
  async function setup(page: Page) {
    const timeGridContainerLocator = page.locator(
      `${getPrefixedClassName('panel')}${getPrefixedClassName('time')}`
    );
    const targetColumnLocator = page.locator('[data-testid*=timegrid-column]');

    const containerBoundingBox = await getBoundingBox(timeGridContainerLocator);
    const columnBoundingBox = await getBoundingBox(targetColumnLocator);

    return {
      targetColumnLocator,
      timeGridContainerLocator,
      containerBoundingBox,
      columnBoundingBox,
    };
  }

  test('it should sync scroll while dragging down to the bottom', async ({ page }) => {
    // Given
    const {
      targetColumnLocator,
      columnBoundingBox,
      timeGridContainerLocator,
      containerBoundingBox,
    } = await setup(page);
    const scrollTopBeforeSync = await timeGridContainerLocator.evaluate(getScrollTop);

    // When
    await targetColumnLocator.hover({
      position: {
        x: columnBoundingBox.width - 10,
        y: 10,
      },
      force: true,
    });
    await page.mouse.down();
    await page.mouse.move(
      columnBoundingBox.x + columnBoundingBox.width / 2,
      containerBoundingBox.y + containerBoundingBox.height - 10
    );

    // Then
    const scrollTopAfterSync = await timeGridContainerLocator.evaluate(getScrollTop);
    expect(scrollTopAfterSync).toBeGreaterThan(scrollTopBeforeSync);
  });

  test('it should sync scroll while dragging up to the top', async ({ page }) => {
    // Given
    const {
      targetColumnLocator,
      columnBoundingBox,
      timeGridContainerLocator,
      containerBoundingBox,
    } = await setup(page);

    // When
    // Middle of the column
    const xPosition = columnBoundingBox.x + columnBoundingBox.width / 2;

    // Scroll down to the bottom of the column
    await targetColumnLocator.hover();
    await page.mouse.wheel(0, columnBoundingBox.height);
    const scrollTopBeforeSync = await timeGridContainerLocator.evaluate(getScrollTop);

    // Then drag up to the top of the column
    await page.mouse.move(xPosition, containerBoundingBox.y + containerBoundingBox.height - 10);
    await page.mouse.down();
    await page.mouse.move(xPosition, containerBoundingBox.y);

    // Then
    const scrollTopAfterSync = await timeGridContainerLocator.evaluate(getScrollTop);
    expect(scrollTopAfterSync).toBeLessThan(scrollTopBeforeSync);
  });
});

mockDayViewEvents
  .filter(({ isAllday }) => !isAllday)
  .forEach(({ title: eventTitle }) => {
    test.describe(`Scroll syncing in time grid when moving the ${eventTitle} event`, () => {
      async function setup(page: Page) {
        const timeGridContainerLocator = page.locator(
          `${getPrefixedClassName('panel')}${getPrefixedClassName('time')}`
        );
        const targetEventLocator = page.locator(`[data-testid*="time-event-${eventTitle}"]`);
        const containerBoundingBox = await getBoundingBox(timeGridContainerLocator);
        const eventBoundingBox = await getBoundingBox(targetEventLocator);

        return {
          timeGridContainerLocator,
          targetEventLocator,
          containerBoundingBox,
          eventBoundingBox,
        };
      }

      test('it should sync scroll while moving event to the edge of the bottom', async ({
        page,
      }) => {
        // Given
        const {
          timeGridContainerLocator,
          targetEventLocator,
          containerBoundingBox,
          eventBoundingBox,
        } = await setup(page);
        const scrollTopBeforeSync = await timeGridContainerLocator.evaluate(getScrollTop);

        // When
        await targetEventLocator.hover({
          position: {
            x: eventBoundingBox.width / 2,
            y: 3,
          },
          force: true,
        });
        await page.mouse.down();
        await page.mouse.move(
          eventBoundingBox.x + eventBoundingBox.width / 2,
          containerBoundingBox.y + containerBoundingBox.height - 10
        );
        await page.mouse.up();

        // Then
        const scrollTopAfterSync = await timeGridContainerLocator.evaluate(getScrollTop);
        expect(scrollTopAfterSync).toBeGreaterThan(scrollTopBeforeSync);
      });

      test('it should sync scroll while moving event to the edge of the top', async ({ page }) => {
        // Given
        const {
          timeGridContainerLocator,
          targetEventLocator,
          containerBoundingBox,
          eventBoundingBox,
        } = await setup(page);

        // Let's move the event to the bottom first.
        const middleXOfEvent = eventBoundingBox.x + eventBoundingBox.width / 2;
        await targetEventLocator.hover({
          position: {
            x: eventBoundingBox.width / 2,
            y: 3,
          },
          force: true,
        });
        await page.mouse.down();
        await page.mouse.move(
          middleXOfEvent,
          containerBoundingBox.y + containerBoundingBox.height - 10
        );
        await page.mouse.up();

        // Then scroll down a little.
        await page.mouse.wheel(0, containerBoundingBox.height / 2);
        const scrollTopBeforeSync = await timeGridContainerLocator.evaluate(getScrollTop);

        // When
        await targetEventLocator.hover({
          position: {
            x: eventBoundingBox.width / 2,
            y: 3,
          },
          force: true,
        });
        await page.mouse.down();
        await page.mouse.move(middleXOfEvent, containerBoundingBox.y);
        await page.mouse.up();

        // Then
        const scrollTopAfterSync = await timeGridContainerLocator.evaluate(getScrollTop);
        expect(scrollTopAfterSync).toBeLessThan(scrollTopBeforeSync);
      });
    });
  });
