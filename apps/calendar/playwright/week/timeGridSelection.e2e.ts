import type { Locator } from '@playwright/test';
import { expect, test } from '@playwright/test';

import type { FormattedTimeString } from '../../types/time/datetime';
import { WEEK_VIEW_PAGE_URL } from '../configs';
import { ClickDelay } from '../constants';
import { dragAndDrop, getBoundingBox, getTimeGridLineSelector } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(WEEK_VIEW_PAGE_URL);
});

async function assertTimeGridSelection(
  selectionLocator: Locator,
  expected: {
    startTop: number;
    endBottom: number;
    totalElements: number;
    formattedTimes: FormattedTimeString[];
  }
) {
  const timeGridSelectionElements = (await selectionLocator.evaluateAll(
    (selection) => selection
  )) as HTMLElement[];
  const expectedFormattedTime = expected.formattedTimes.join(' - ');

  expect(timeGridSelectionElements).toHaveLength(expected.totalElements);

  await expect(selectionLocator.first()).toHaveText(expectedFormattedTime);

  const firstElementBoundingBox = await getBoundingBox(selectionLocator.first());
  expect(firstElementBoundingBox.y).toBeCloseTo(expected.startTop, 0);

  const lastElementBoundingBox = await getBoundingBox(selectionLocator.last());
  expect(lastElementBoundingBox.y + lastElementBoundingBox.height).toBeCloseTo(
    expected.endBottom,
    0
  );
}

// NOTE: Only firefox automatically scrolls into view at some random tests, so narrowing the range of movement.
// Maybe `scrollIntoViewIfNeeded` is not supported in the firefox?
// reference: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoViewIfNeeded
const BASE_GRIDLINE_SELECTOR = 'data-testid=gridline-03:00-03:30';
const GRID_SELECTION_SELECTOR = '[data-testid*="time-grid-selection"]';

test('should be able to select a time slot with clicking', async ({ page }) => {
  // Given
  const startGridLineLocator = page.locator(BASE_GRIDLINE_SELECTOR);
  const timeGridSelectionLocator = page.locator(GRID_SELECTION_SELECTOR);
  const startGridLineBoundingBox = await getBoundingBox(startGridLineLocator);

  // When
  await startGridLineLocator.click({ force: true, delay: ClickDelay.Short });
  await timeGridSelectionLocator.waitFor(); // Test for debounced click handler.

  // Then
  await assertTimeGridSelection(timeGridSelectionLocator, {
    totalElements: 1,
    formattedTimes: ['03:00', '03:30'],
    startTop: startGridLineBoundingBox.y,
    endBottom: startGridLineBoundingBox.y + startGridLineBoundingBox.height,
  });
});

test('should be able to select a time slot with double clicking', async ({ page }) => {
  // Given
  const startGridLineLocator = page.locator(BASE_GRIDLINE_SELECTOR);
  const timeGridSelectionLocator = page.locator(GRID_SELECTION_SELECTOR);
  const startGridLineBoundingBox = await getBoundingBox(startGridLineLocator);

  // When
  await startGridLineLocator.dblclick({ force: true, delay: ClickDelay.Immediate });

  // Then
  await assertTimeGridSelection(timeGridSelectionLocator, {
    totalElements: 1,
    formattedTimes: ['03:00', '03:30'],
    startTop: startGridLineBoundingBox.y,
    endBottom: startGridLineBoundingBox.y + startGridLineBoundingBox.height,
  });
});

test('should be able to select a range of time from bottom to top', async ({ page }) => {
  // Given
  const startGridLineLocator = page.locator(BASE_GRIDLINE_SELECTOR);
  const targetGridLineLocator = page.locator(getTimeGridLineSelector('01:00'));
  const timeGridSelectionLocator = page.locator(GRID_SELECTION_SELECTOR);

  const startGridLineBoundingBox = await getBoundingBox(startGridLineLocator);
  const targetGridLineBoundingBox = await getBoundingBox(targetGridLineLocator);

  // When
  await dragAndDrop(page, startGridLineLocator, targetGridLineLocator);

  // Then
  await assertTimeGridSelection(timeGridSelectionLocator, {
    totalElements: 1,
    formattedTimes: ['01:00', '03:30'],
    startTop: targetGridLineBoundingBox.y,
    endBottom: startGridLineBoundingBox.y + startGridLineBoundingBox.height,
  });
});

test('should be able to select a range of time to upper right', async ({ page }) => {
  // Given
  const startGridLineLocator = page.locator(BASE_GRIDLINE_SELECTOR);
  const targetGridLineLocator = page.locator(getTimeGridLineSelector('01:00'));
  const timeGridSelectionLocator = page.locator(GRID_SELECTION_SELECTOR);

  const startGridLineBoundingBox = await getBoundingBox(startGridLineLocator);
  const targetGridLineBoundingBox = await getBoundingBox(targetGridLineLocator);

  // When
  await dragAndDrop(page, startGridLineLocator, targetGridLineLocator, {
    targetPosition: {
      x: targetGridLineBoundingBox.width,
      y: startGridLineBoundingBox.height,
    },
  });

  // Then
  await assertTimeGridSelection(timeGridSelectionLocator, {
    totalElements: 4,
    formattedTimes: ['03:00'],
    startTop: startGridLineBoundingBox.y,
    endBottom: targetGridLineBoundingBox.y + targetGridLineBoundingBox.height,
  });
});

test('should be able to select a range of time to right', async ({ page }) => {
  // Given
  const startGridLineLocator = page.locator(BASE_GRIDLINE_SELECTOR);
  const timeGridSelectionLocator = page.locator(GRID_SELECTION_SELECTOR);

  const startGridLineBoundingBox = await getBoundingBox(startGridLineLocator);

  // When
  await dragAndDrop(page, startGridLineLocator, startGridLineLocator, {
    targetPosition: {
      x: startGridLineBoundingBox.width,
      y: 1,
    },
  });

  // Then
  await assertTimeGridSelection(timeGridSelectionLocator, {
    totalElements: 4,
    formattedTimes: ['03:00'],
    startTop: startGridLineBoundingBox.y,
    endBottom: startGridLineBoundingBox.y + startGridLineBoundingBox.height,
  });
});

test('should be able to select a range of time to lower right', async ({ page }) => {
  // Given
  const startGridLineLocator = page.locator(BASE_GRIDLINE_SELECTOR);
  const targetGridLineLocator = page.locator(getTimeGridLineSelector('05:00'));
  const timeGridSelectionLocator = page.locator(GRID_SELECTION_SELECTOR);

  const startGridLineBoundingBox = await getBoundingBox(startGridLineLocator);
  const targetGridLineBoundingBox = await getBoundingBox(targetGridLineLocator);

  // When
  await dragAndDrop(page, startGridLineLocator, targetGridLineLocator, {
    targetPosition: {
      x: targetGridLineBoundingBox.width,
      y: targetGridLineBoundingBox.height,
    },
  });

  // Then
  await assertTimeGridSelection(timeGridSelectionLocator, {
    totalElements: 4,
    formattedTimes: ['03:00'],
    startTop: startGridLineBoundingBox.y,
    endBottom: targetGridLineBoundingBox.y + targetGridLineBoundingBox.height,
  });
});

test('should be able to select a range of time from top to bottom', async ({ page }) => {
  // Given
  const startGridLineLocator = page.locator(BASE_GRIDLINE_SELECTOR);
  const targetGridLineLocator = page.locator(getTimeGridLineSelector('05:00'));
  const timeGridSelectionLocator = page.locator(GRID_SELECTION_SELECTOR);

  const startGridLineBoundingBox = await getBoundingBox(startGridLineLocator);
  const targetGridLineBoundingBox = await getBoundingBox(targetGridLineLocator);

  // When
  await dragAndDrop(page, startGridLineLocator, targetGridLineLocator);

  // Then
  await assertTimeGridSelection(timeGridSelectionLocator, {
    totalElements: 1,
    formattedTimes: ['03:00', '05:30'],
    startTop: startGridLineBoundingBox.y,
    endBottom: targetGridLineBoundingBox.y + targetGridLineBoundingBox.height,
  });
});

test('should be able to select a range of time to lower left', async ({ page }) => {
  // Given
  const startGridLineLocator = page.locator(BASE_GRIDLINE_SELECTOR);
  const targetGridLineLocator = page.locator(getTimeGridLineSelector('05:00'));
  const timeGridSelectionLocator = page.locator(GRID_SELECTION_SELECTOR);

  const startGridLineBoundingBox = await getBoundingBox(startGridLineLocator);
  const targetGridLineBoundingBox = await getBoundingBox(targetGridLineLocator);

  // When
  await dragAndDrop(page, startGridLineLocator, targetGridLineLocator, {
    targetPosition: {
      x: 0,
      y: targetGridLineBoundingBox.height,
    },
  });

  // Then
  await assertTimeGridSelection(timeGridSelectionLocator, {
    totalElements: 4,
    formattedTimes: ['05:00'],
    startTop: targetGridLineBoundingBox.y,
    endBottom: startGridLineBoundingBox.y + startGridLineBoundingBox.height,
  });
});

test('should be able to select a range of time to left', async ({ page }) => {
  // Given
  const startGridLineLocator = page.locator(BASE_GRIDLINE_SELECTOR);
  const timeGridSelectionLocator = page.locator(GRID_SELECTION_SELECTOR);

  const startGridLineBoundingBox = await getBoundingBox(startGridLineLocator);

  // When
  await dragAndDrop(page, startGridLineLocator, startGridLineLocator, {
    targetPosition: {
      x: 1,
      y: 1,
    },
  });

  // Then
  await assertTimeGridSelection(timeGridSelectionLocator, {
    totalElements: 4,
    formattedTimes: ['03:00'],
    startTop: startGridLineBoundingBox.y,
    endBottom: startGridLineBoundingBox.y + startGridLineBoundingBox.height,
  });
});

test('should be able to select a range of time to upper left', async ({ page }) => {
  // Given
  const startGridLineLocator = page.locator(BASE_GRIDLINE_SELECTOR);
  const targetGridLineLocator = page.locator(getTimeGridLineSelector('01:00'));
  const timeGridSelectionLocator = page.locator(GRID_SELECTION_SELECTOR);

  const startGridLineBoundingBox = await getBoundingBox(startGridLineLocator);
  const targetGridLineBoundingBox = await getBoundingBox(targetGridLineLocator);

  // When
  await dragAndDrop(page, startGridLineLocator, targetGridLineLocator, {
    targetPosition: {
      x: 1,
      y: 1,
    },
  });

  // Then
  await assertTimeGridSelection(timeGridSelectionLocator, {
    totalElements: 4,
    formattedTimes: ['01:00'],
    startTop: targetGridLineBoundingBox.y,
    endBottom: startGridLineBoundingBox.y + startGridLineBoundingBox.height,
  });
});

test('When pressing down the ESC key, the grid selection is canceled.', async ({ page }) => {
  // Given
  const startGridLineLocator = page.locator(getTimeGridLineSelector('03:00'));
  const startGridLineBoundingBox = await getBoundingBox(startGridLineLocator);

  const targetGridLineLocator = page.locator(getTimeGridLineSelector('05:00'));
  const targetGridLineBoundingBox = await getBoundingBox(targetGridLineLocator);

  // When
  await page.mouse.move(startGridLineBoundingBox.x + 10, startGridLineBoundingBox.y + 10);
  await page.mouse.down();
  await page.mouse.move(targetGridLineBoundingBox.x + 10, targetGridLineBoundingBox.y + 10);
  await page.keyboard.down('Escape');

  // Then
  const gridSelectionLocator = page.locator(GRID_SELECTION_SELECTOR);
  expect(await gridSelectionLocator.count()).toBe(0);
});
