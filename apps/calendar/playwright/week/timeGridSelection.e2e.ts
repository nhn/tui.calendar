import { expect, test } from '@playwright/test';

import { assertTimeGridSelection } from '../assertions';
import { WEEK_VIEW_HOUR_START_OPTION_PAGE_URL, WEEK_VIEW_PAGE_URL } from '../configs';
import { ClickDelay } from '../constants';
import { dragAndDrop, getBoundingBox, getTimeGridLineSelector } from '../utils';

const GRID_SELECTION_SELECTOR = '[data-testid*="time-grid-selection"]';

test.describe('Time Grid Selection - Default Options', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(WEEK_VIEW_PAGE_URL);
  });

  // NOTE: Only firefox automatically scrolls into view at some random tests, so narrowing the range of movement.
  // Maybe `scrollIntoViewIfNeeded` is not supported in the firefox?
  // reference: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoViewIfNeeded
  const BASE_GRIDLINE_SELECTOR = 'data-testid=gridline-03:00-03:30';

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

  // FIXME: it fails on safari & firefox
  test.fixme('should be able to select a time slot with double clicking', async ({ page }) => {
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
    await dragAndDrop({
      page,
      sourceLocator: startGridLineLocator,
      targetLocator: targetGridLineLocator,
    });

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
    await dragAndDrop({
      page,
      sourceLocator: startGridLineLocator,
      targetLocator: targetGridLineLocator,
      options: {
        targetPosition: {
          x: targetGridLineBoundingBox.width,
          y: startGridLineBoundingBox.height,
        },
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
    await dragAndDrop({
      page,
      sourceLocator: startGridLineLocator,
      targetLocator: startGridLineLocator,
      options: {
        targetPosition: {
          x: startGridLineBoundingBox.width,
          y: 1,
        },
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
    await dragAndDrop({
      page,
      sourceLocator: startGridLineLocator,
      targetLocator: targetGridLineLocator,
      options: {
        targetPosition: {
          x: targetGridLineBoundingBox.width,
          y: targetGridLineBoundingBox.height,
        },
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
    await dragAndDrop({
      page,
      sourceLocator: startGridLineLocator,
      targetLocator: targetGridLineLocator,
    });

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
    await dragAndDrop({
      page,
      sourceLocator: startGridLineLocator,
      targetLocator: targetGridLineLocator,
      options: {
        targetPosition: {
          x: 0,
          y: targetGridLineBoundingBox.height,
        },
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
    await dragAndDrop({
      page,
      sourceLocator: startGridLineLocator,
      targetLocator: startGridLineLocator,
      options: {
        targetPosition: {
          x: 1,
          y: 1,
        },
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
    await dragAndDrop({
      page,
      sourceLocator: startGridLineLocator,
      targetLocator: targetGridLineLocator,
      options: {
        targetPosition: {
          x: 1,
          y: 1,
        },
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
});

// Regression test for #1238
// Since the most of the test duplicated with the normal one, check for a few cases including horizontal selections only.
test.describe('Time Grid Selection - With different hourStart and hourEnd', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(WEEK_VIEW_HOUR_START_OPTION_PAGE_URL);
  });

  const getColumnSelector = (columnIndex: number) => `data-testid=timegrid-column-${columnIndex}`;

  test('should be able to select a range of time to lower right', async ({ page }) => {
    // Given
    const startGridLineLocator = page.locator(getTimeGridLineSelector('06:00'));
    const targetGridLineLocator = page.locator(getTimeGridLineSelector('08:00'));
    const startColumnLocator = page.locator(getColumnSelector(4));
    const targetColumnLocator = page.locator(getColumnSelector(5));

    const startGridLineBoundingBox = await getBoundingBox(startGridLineLocator);
    const targetGridLineBoundingBox = await getBoundingBox(targetGridLineLocator);
    const startColumnBoundingBox = await getBoundingBox(startColumnLocator);
    const endColumnBoundingBox = await getBoundingBox(targetColumnLocator);

    // When
    await dragAndDrop({
      page,
      sourceLocator: startGridLineLocator,
      targetLocator: targetGridLineLocator,
      options: {
        sourcePosition: {
          x: startColumnBoundingBox.x,
          y: 5,
        },
        targetPosition: {
          x: endColumnBoundingBox.x,
          y: 5,
        },
      },
    });

    // Then
    await assertTimeGridSelection(page.locator(GRID_SELECTION_SELECTOR), {
      totalElements: 2,
      formattedTimes: ['06:00'],
      startTop: startGridLineBoundingBox.y,
      endBottom: targetGridLineBoundingBox.y + targetGridLineBoundingBox.height,
    });
  });

  test('should be able to select a range of time to upper left', async ({ page }) => {
    // Given
    const startGridLineLocator = page.locator(getTimeGridLineSelector('08:00'));
    const targetGridLineLocator = page.locator(getTimeGridLineSelector('06:00'));
    const startColumnLocator = page.locator(getColumnSelector(5));
    const targetColumnLocator = page.locator(getColumnSelector(4));

    const startGridLineBoundingBox = await getBoundingBox(startGridLineLocator);
    const targetGridLineBoundingBox = await getBoundingBox(targetGridLineLocator);
    const startColumnBoundingBox = await getBoundingBox(startColumnLocator);
    const endColumnBoundingBox = await getBoundingBox(targetColumnLocator);

    // When
    await dragAndDrop({
      page,
      sourceLocator: startGridLineLocator,
      targetLocator: targetGridLineLocator,
      options: {
        sourcePosition: {
          x: startColumnBoundingBox.x,
          y: 5,
        },
        targetPosition: {
          x: endColumnBoundingBox.x,
          y: 5,
        },
      },
    });

    // Then
    await assertTimeGridSelection(page.locator(GRID_SELECTION_SELECTOR), {
      totalElements: 2,
      formattedTimes: ['06:00'],
      startTop: targetGridLineBoundingBox.y,
      endBottom: startGridLineBoundingBox.y + startGridLineBoundingBox.height,
    });
  });
});
