/**
 * @fileoverview Utility module for manipulating DOM
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
import isNull from 'tui-code-snippet/type/isNull';
import getTarget from 'tui-code-snippet/domEvent/getTarget';
import getMousePosition from 'tui-code-snippet/domEvent/getMousePosition';

const CSS_AUTO_REGEX = /^auto$|^$|%/;

/**
 * Get specific CSS style value from HTML element.
 * @param {HTMLElement} el target element
 * @param {string} style css attribute name
 * @returns {(string|null)} css style value
 */
function getStyle(el: HTMLElement, style: keyof CSSStyleDeclaration) {
  let value = el.style[style];

  if ((!value || value === 'auto') && document.defaultView) {
    const css = document.defaultView.getComputedStyle(el, null);
    value = css ? css[style] : null;
  }

  return value === 'auto' ? null : value;
}

// eslint-disable-next-line complexity
export function getPosition(el: HTMLElement) {
  let x = 0;
  let y = 0;
  let bound;

  if (
    (CSS_AUTO_REGEX.test(el.style.left || '') || CSS_AUTO_REGEX.test(el.style.top || '')) &&
    'getBoundingClientRect' in el
  ) {
    // When the element's left or top is 'auto'
    bound = el.getBoundingClientRect();

    x = bound.left;
    y = bound.top;
  } else {
    x = parseFloat(el.style.left || String(0));
    y = parseFloat(el.style.top || String(0));
  }

  return { x, y };
}

// eslint-disable-next-line complexity
export function getSize(el: HTMLElement): { width: number; height: number } {
  let width = getStyle(el, 'width');
  let height = getStyle(el, 'height');
  let bound;

  if (
    (CSS_AUTO_REGEX.test(width) ||
      CSS_AUTO_REGEX.test(height) ||
      isNull(width) ||
      isNull(height)) &&
    el.getBoundingClientRect
  ) {
    bound = el.getBoundingClientRect();
    width = bound.width || el.offsetWidth;
    height = bound.height || el.offsetHeight;
  } else {
    width = parseFloat(width || 0);
    height = parseFloat(height || 0);
  }

  return { width, height };
}

export function getElementRect(el: HTMLElement) {
  return {
    ...getPosition(el),
    ...getSize(el)
  };
}

export function getOffsetParent(e: MouseEvent): HTMLElement {
  const { offsetParent } = getTarget(e);

  return offsetParent as HTMLElement;
}

export function getOffsetParentPos(e: MouseEvent) {
  const offsetParent = getOffsetParent(e);

  return getMousePosition(e, offsetParent);
}

export function getOffsetParentRect(e: MouseEvent) {
  const offsetParent = getOffsetParent(e);

  return getElementRect(offsetParent);
}

export function isOverlapped(el1: Element, el2: Element) {
  const r1 = el1.getBoundingClientRect();
  const r2 = el2.getBoundingClientRect();

  return !(r1.top > r2.bottom || r1.right < r2.left || r1.bottom < r2.top || r1.left > r2.right);
}
