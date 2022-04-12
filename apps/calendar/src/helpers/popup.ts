import type { Rect } from '@t/store';

export function isTopOutOfLayout(top: number, layoutRect: Rect, popupRect: Rect): boolean {
  return top + popupRect.height > layoutRect.top + layoutRect.height;
}

export function isLeftOutOfLayout(left: number, layoutRect: Rect, popupRect: Rect): boolean {
  return left + popupRect.width > layoutRect.left + layoutRect.width;
}
