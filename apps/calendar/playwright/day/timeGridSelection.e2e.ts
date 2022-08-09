import { expect, test } from '@playwright/test';

import { assertTimeGridSelection } from '../assertions';
import { DAY_VIEW_PAGE_URL } from '../configs';
import { ClickDelay } from '../constants';
import {
  dragAndDrop,
  getBoundingBox,
  getTimeGridLineSelector,
  waitForSingleElement,
} from '../utils';

test.beforeEach(async ({ page }) => {
  await page.goto(DAY_VIEW_PAGE_URL);
});

const GRID_SELECTION_SELECTOR = '[data-testid*="time-grid-selection"]';

// NOTE: Only firefox automatically scrolls into view at some random tests, so narrowing the range of movement.
// Maybe `scrollIntoViewIfNeeded` is not supported in the firefox?
// reference: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoViewIfNeeded
test.describe('TimeGrid Selection', () => {
  const SELECT_START_TIME = '03:00';

  test('should be able to select a time slot with clicking', async ({ page }) => {
    // Given
    const startGridLineLocator = page.locator(getTimeGridLineSelector(SELECT_START_TIME));
    const timeGridSelectionLocator = page.locator(GRID_SELECTION_SELECTOR);
    const startGridLineBoundingBox = await getBoundingBox(startGridLineLocator);

    // When
    await startGridLineLocator.click({ force: true, delay: ClickDelay.Long });
    await waitForSingleElement(timeGridSelectionLocator); // Test for debounced click handler.

    // Then
    await assertTimeGridSelection(timeGridSelectionLocator, {
      startTop: startGridLineBoundingBox.y,
      endBottom: startGridLineBoundingBox.y + startGridLineBoundingBox.height,
      formattedTimes: ['03:00', '03:30'],
    });
  });

  test.fixme('should be able to select a time slot with double clicking', async ({ page }) => {
    // Given
    const startGridLineLocator = page.locator(getTimeGridLineSelector(SELECT_START_TIME));
    const timeGridSelectionLocator = page.locator(GRID_SELECTION_SELECTOR);
    const startGridLineBoundingBox = await getBoundingBox(startGridLineLocator);

    // When
    await startGridLineLocator.dblclick({ force: true, delay: ClickDelay.Immediate });

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
    await dragAndDrop({
      page,
      sourceLocator: startGridLineLocator,
      targetLocator: targetGridLineLocator,
    });

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
    await dragAndDrop({
      page,
      sourceLocator: startGridLineLocator,
      targetLocator: targetGridLineLocator,
    });

    // Then
    await assertTimeGridSelection(timeGridSelectionLocator, {
      formattedTimes: ['01:00', '03:30'],
      startTop: targetGridLineBoundingBox.y,
      endBottom: startGridLineBoundingBox.y + startGridLineBoundingBox.height,
    });
  });
});

test('When pressing down the ESC key, the grid selection is canceled.', async ({ page }) => {
  // Given
  const startGridLineLocator = page.locator(getTimeGridLineSelector('03:00'));
  const targetGridLineLocator = page.locator(getTimeGridLineSelector('05:00'));

  // When
  await dragAndDrop({
    page,
    sourceLocator: startGridLineLocator,
    targetLocator: targetGridLineLocator,
    hold: true,
  });
  await page.keyboard.down('Escape');

  // Then
  const gridSelectionLocator = page.locator(GRID_SELECTION_SELECTOR);
  expect(await gridSelectionLocator.count()).toBe(0);
});
