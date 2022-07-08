import { noop } from '@src/utils/noop';
import { isString } from '@src/utils/type';

const CSS_AUTO_REGEX = /^auto$|^$|%/;

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
  if (
    (CSS_AUTO_REGEX.test(el.style.left || '') || CSS_AUTO_REGEX.test(el.style.top || '')) &&
    'getBoundingClientRect' in el
  ) {
    // When the element's left or top is 'auto'
    const { left, top } = el.getBoundingClientRect();

    return { x: left, y: top };
  }

  return {
    x: parseFloat(el.style.left || String(0)),
    y: parseFloat(el.style.top || String(0)),
  };
}

type SizeValue = 'auto' | string | null;

function invalidateSizeValue(value: SizeValue) {
  if (isString(value)) {
    return CSS_AUTO_REGEX.test(value);
  }

  return value === null;
}

export function getSize(el: HTMLElement): { width: number; height: number } {
  const w = getStyle(el, 'width') as SizeValue;
  const h = getStyle(el, 'height') as SizeValue;

  if ((invalidateSizeValue(w) || invalidateSizeValue(h)) && el.getBoundingClientRect) {
    const { width, height } = el.getBoundingClientRect();

    return {
      width: width || el.offsetWidth,
      height: height || el.offsetHeight,
    };
  }

  return {
    width: parseFloat(w ?? '0'),
    height: parseFloat(h ?? '0'),
  };
}

export function isOverlapped(el1: Element, el2: Element) {
  const r1 = el1.getBoundingClientRect();
  const r2 = el2.getBoundingClientRect();

  return !(r1.top > r2.bottom || r1.right < r2.left || r1.bottom < r2.top || r1.left > r2.right);
}

// for ssr
// eslint-disable-next-line @typescript-eslint/no-empty-function
const ElementClass = typeof Element === 'undefined' ? noop : Element;
const elProto = ElementClass.prototype;
const matchSelector =
  elProto.matches ||
  elProto.webkitMatchesSelector ||
  elProto.msMatchesSelector ||
  function (this: Element, selector: string) {
    return Array.from(document.querySelectorAll(selector)).includes(this);
  };

function matches(element: Node & ParentNode, selector: string) {
  return matchSelector.call(element, selector);
}

export function closest(element: HTMLElement, selector: string) {
  if (matches(element, selector)) {
    return element;
  }

  let parent = element.parentNode;

  while (parent && parent !== document) {
    if (matches(parent, selector)) {
      return parent as HTMLElement;
    }

    parent = parent.parentNode;
  }

  return null;
}

export function stripTags(str: string) {
  return str.replace(/<([^>]+)>/gi, '');
}
