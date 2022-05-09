import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

import { WEEK_VIEW_PAGE_URL } from '../configs';
import { getBoundingBox, getPrefixedClassName } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(WEEK_VIEW_PAGE_URL);
});

// NOTE: Syncing scroll only happens when the mousemove event is fired
// and cannot use `dragAndDrop` because it's better to be manually controlled.

function getScrollTop(el: HTMLElement) {
  return el.scrollTop;
}

test.describe('Scroll syncing in time grid when selecting grid', () => {
  /**
   * The third column should be empty
   */
  async function setup(page: Page) {
    const timeGridContainerLocator = page.locator(
      `${getPrefixedClassName('panel')}${getPrefixedClassName('time')}`
    );
    const targetColumnLocator = page.locator('data-testid=timegrid-column-2');

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
        x: columnBoundingBox.width / 2,
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

    // Middle of the column
    const xPosition = columnBoundingBox.x + columnBoundingBox.width / 2;

    // Scroll down to the bottom of the column
    await targetColumnLocator.hover();
    await page.mouse.wheel(0, containerBoundingBox.height);
    let scrollTopBeforeSync = await timeGridContainerLocator.evaluate(getScrollTop);
    await expect
      .poll(async () => {
        scrollTopBeforeSync = await timeGridContainerLocator.evaluate(getScrollTop);

        return scrollTopBeforeSync;
      })
      .toBeCloseTo(containerBoundingBox.height, -2);

    // When
    // drag up to the top of the column
    await page.mouse.move(xPosition, containerBoundingBox.y + containerBoundingBox.height - 10);
    await page.mouse.down();

    await expect
      .poll(async () => {
        await page.mouse.move(xPosition, containerBoundingBox.y);

        // Then
        const scrollTopAfterSync = await timeGridContainerLocator.evaluate(getScrollTop);
        return scrollTopAfterSync;
      })
      .toBeLessThan(scrollTopBeforeSync);
  });
});

test.describe('Scroll syncing in time grid when moving event', () => {
  async function setup(page: Page) {
    const timeGridContainerLocator = page.locator(
      `${getPrefixedClassName('panel')}${getPrefixedClassName('time')}`
    );
    const targetEventLocator = page.locator(
      '[data-testid*="time-event"]:has-text("short time event")'
    );
    const containerBoundingBox = await getBoundingBox(timeGridContainerLocator);
    const eventBoundingBox = await getBoundingBox(targetEventLocator);

    return {
      timeGridContainerLocator,
      targetEventLocator,
      containerBoundingBox,
      eventBoundingBox,
    };
  }

  test('it should sync scroll while moving event to the edge of the bottom', async ({ page }) => {
    // Given
    const { timeGridContainerLocator, targetEventLocator, containerBoundingBox, eventBoundingBox } =
      await setup(page);
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
    const { timeGridContainerLocator, targetEventLocator, containerBoundingBox, eventBoundingBox } =
      await setup(page);

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
    let scrollTopBeforeSync = await timeGridContainerLocator.evaluate(getScrollTop);
    await expect
      .poll(async () => {
        scrollTopBeforeSync = await timeGridContainerLocator.evaluate(getScrollTop);

        return scrollTopBeforeSync;
      })
      .toBeCloseTo(containerBoundingBox.height / 2, -2);

    // When
    await targetEventLocator.hover({
      position: {
        x: eventBoundingBox.width / 2,
        y: 3,
      },
      force: true,
    });
    await page.mouse.down();

    await expect
      .poll(async () => {
        await page.mouse.move(middleXOfEvent, containerBoundingBox.y - 10);

        // Then
        const scrollTopAfterSync = await timeGridContainerLocator.evaluate(getScrollTop);
        return scrollTopAfterSync;
      })
      .toBeLessThan(scrollTopBeforeSync);
  });
});
