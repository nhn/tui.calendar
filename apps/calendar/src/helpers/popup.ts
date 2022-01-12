import { Rect } from '@t/store';

export function isTopOverLayoutContainer(top: number, layoutRect: Rect, popupRect: Rect): boolean {
  return top + popupRect.height > layoutRect.top + layoutRect.height;
}

export function isLeftOverLayoutContainer(
  left: number,
  layoutRect: Rect,
  popupRect: Rect
): boolean {
  return left + popupRect.width > layoutRect.left + layoutRect.width;
}
