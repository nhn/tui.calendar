import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

import { MONTH_VIEW_SCROLL_PAGE_URL } from '../configs';
import {
  getBoundingBox,
  getPopupPositionRelativeToDocument,
  getPrefixedClassName,
  selectGridCells,
} from '../utils';

const CONTAINER_SELECTOR = '.container';
const EVENT_SELECTOR = '[data-testid="cal1-0-event1"]';
const POPUP_SELECTOR = 'css=[role=dialog]';
const MORE_EVENTS_BUTTON_SELECTOR = getPrefixedClassName('grid-cell-more-events');
const MONTH_GRID_CELL_SELECTOR = getPrefixedClassName('daygrid-cell');

function selectMonthGridCells(page: Page, startCellIndex: number, endCellIndex: number) {
  return selectGridCells(page, startCellIndex, endCellIndex, MONTH_GRID_CELL_SELECTOR);
}

async function scrollPage(page: Page) {
  const containerLocator = page.locator(CONTAINER_SELECTOR);
  const containerBoundingBox = await getBoundingBox(containerLocator);

  await page.mouse.wheel(0, containerBoundingBox.height / 2);
}

test.beforeEach(async ({ page }) => {
  await page.goto(MONTH_VIEW_SCROLL_PAGE_URL);
});

test('FormPopup follows the scroll when scrolling container', async ({ page }) => {
  // Given
  await selectMonthGridCells(page, 9, 10);
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
  const eventLocator = page.locator(EVENT_SELECTOR).first();
  await eventLocator.click({ delay: 100 });
  const detailPopup = page.locator(POPUP_SELECTOR);
  const popupTopBeforeScrolling = await getPopupPositionRelativeToDocument(detailPopup);

  // When
  await scrollPage(page);

  // Then
  const popupTopAfterScrolling = await getPopupPositionRelativeToDocument(detailPopup);
  expect(popupTopAfterScrolling).toBeGreaterThan(popupTopBeforeScrolling);
});

test('SeeMoreEventsPopup follows the scroll when scrolling container', async ({ page }) => {
  // Given
  const eventLocator = page.locator(`${MORE_EVENTS_BUTTON_SELECTOR}:has-text("more")`).first();
  await eventLocator.click({ delay: 100 });
  const seeMoreEventsPopup = page.locator(POPUP_SELECTOR);
  const popupTopBeforeScrolling = await getPopupPositionRelativeToDocument(seeMoreEventsPopup);

  // When
  await scrollPage(page);

  // Then
  const popupTopAfterScrolling = await getPopupPositionRelativeToDocument(seeMoreEventsPopup);
  expect(popupTopAfterScrolling).toBeGreaterThan(popupTopBeforeScrolling);
});
