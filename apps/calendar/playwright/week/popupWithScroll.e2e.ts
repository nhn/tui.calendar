import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

import { WEEK_VIEW_SCROLL_PAGE_URL } from '../configs';
import {
  getBoundingBox,
  getPopupPositionRelativeToDocument,
  getPrefixedClassName,
  selectGridCells,
} from '../utils';

const CONTAINER_SELECTOR = '.container';
const EVENT_SELECTOR = '[data-testid="cal1-1-event1"]';
const POPUP_SELECTOR = 'css=[role=dialog]';
const WEEK_GRID_CELL_SELECTOR = getPrefixedClassName('panel-grid');

function selectWeekGridCells(page: Page, startCellIndex: number, endCellIndex: number) {
  return selectGridCells(page, startCellIndex, endCellIndex, WEEK_GRID_CELL_SELECTOR);
}

async function scrollPage(page: Page) {
  const containerLocator = page.locator(CONTAINER_SELECTOR);
  const containerBoundingBox = await getBoundingBox(containerLocator);

  await page.mouse.wheel(0, containerBoundingBox.height / 2);
}

test.beforeEach(async ({ page }) => {
  await page.goto(WEEK_VIEW_SCROLL_PAGE_URL);
});

test('FormPopup follows the scroll when scrolling container', async ({ page }) => {
  // Given
  await selectWeekGridCells(page, 14, 15);
  const formPopup = page.locator(POPUP_SELECTOR);
  const popupTopBeforeScrolling = await getPopupPositionRelativeToDocument(formPopup);

  // When
  await scrollPage(page);

  // Then
  const popupTopAfterScrolling = await getPopupPositionRelativeToDocument(formPopup);
  expect(popupTopAfterScrolling).toBeGreaterThan(popupTopBeforeScrolling);
});

test('DetailPopup follows the scroll when scrolling container', async ({ page }) => {
  // Given
  const eventLocator = page.locator(EVENT_SELECTOR);
  await eventLocator.click({ delay: 100 });
  const detailPopup = page.locator(POPUP_SELECTOR);
  const popupTopBeforeScrolling = await getPopupPositionRelativeToDocument(detailPopup);

  // When
  await scrollPage(page);

  // Then
  const popupTopAfterScrolling = await getPopupPositionRelativeToDocument(detailPopup);
  expect(popupTopAfterScrolling).toBeGreaterThan(popupTopBeforeScrolling);
});
