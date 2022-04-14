import type { Locator } from '@playwright/test';
import { expect, test } from '@playwright/test';

import type { FormattedTimeString } from '../../types/time/datetime';
import { DAY_VIEW_PAGE_URL } from '../configs';
import { dragAndDrop, getBoundingBox, getTimeGridLineSelector } from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(DAY_VIEW_PAGE_URL);
});

async function assertTimeGridSelection(
  selectionLocator: Locator,
  expected: {
    startTop: number;
    endBottom: number;
    formattedTimes: FormattedTimeString[];
  }
) {
  const timeGridSelectionElements = (await selectionLocator.evaluateAll(
    (selection) => selection
  )) as HTMLElement[];
  const expectedFormattedTime = expected.formattedTimes.join(' - ');

  expect(timeGridSelectionElements).toHaveLength(1);

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
test.describe('TimeGrid Selection', () => {
  const SELECT_START_TIME = '03:00';
  const GRID_SELECTION_SELECTOR = '[data-testid*="time-grid-selection"]';

  test('should be able to select a time slot with clicking', async ({ page }) => {
    // Given
    const startGridLineLocator = page.locator(getTimeGridLineSelector(SELECT_START_TIME));
    const timeGridSelectionLocator = page.locator(GRID_SELECTION_SELECTOR);
    const startGridLineBoundingBox = await getBoundingBox(startGridLineLocator);

    // When
    await startGridLineLocator.click({ force: true });

    // Then
    await assertTimeGridSelection(timeGridSelectionLocator, {
      startTop: startGridLineBoundingBox.y,
      endBottom: startGridLineBoundingBox.y + startGridLineBoundingBox.height,
      formattedTimes: ['03:00', '03:30'],
    });
  });

  test('should be able to select a range of time from top to bottom', async ({ page }) => {
    // Given
    const startGridLineLocator = page.locator(getTimeGridLineSelector(SELECT_START_TIME));
    const targetGridLineLocator = page.locator(getTimeGridLineSelector('05:00'));
    const timeGridSelectionLocator = page.locator(GRID_SELECTION_SELECTOR);

    const startGridLineBoundingBox = await getBoundingBox(startGridLineLocator);
    const targetGridLineBoundingBox = await getBoundingBox(targetGridLineLocator);

    // When
    await dragAndDrop(startGridLineLocator, targetGridLineLocator);

    // Then
    await assertTimeGridSelection(timeGridSelectionLocator, {
      formattedTimes: ['03:00', '05:30'],
      startTop: startGridLineBoundingBox.y,
      endBottom: targetGridLineBoundingBox.y + targetGridLineBoundingBox.height,
    });
  });

  test('should be able to select a range of time from bottom to top', async ({ page }) => {
    // Given
    const startGridLineLocator = page.locator(getTimeGridLineSelector(SELECT_START_TIME));
    const targetGridLineLocator = page.locator(getTimeGridLineSelector('01:00'));
    const timeGridSelectionLocator = page.locator(GRID_SELECTION_SELECTOR);

    const startGridLineBoundingBox = await getBoundingBox(startGridLineLocator);
    const targetGridLineBoundingBox = await getBoundingBox(targetGridLineLocator);

    // When
    await dragAndDrop(startGridLineLocator, targetGridLineLocator);

    // Then
    await assertTimeGridSelection(timeGridSelectionLocator, {
      formattedTimes: ['01:00', '03:30'],
      startTop: targetGridLineBoundingBox.y,
      endBottom: startGridLineBoundingBox.y + startGridLineBoundingBox.height,
    });
  });
});
