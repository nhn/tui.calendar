/* eslint-disable complexity,prefer-destructuring */

const hasOwnProp = (obj: any, key: any) => Object.prototype.hasOwnProperty.call(obj, key);

/**
 * Compare two objects deeply
 *
 * It doesn't care about some types like RegExp, Map, Set etc.
 * Because they are not proper types for props of the Calendar component.
 *
 * Comparing two functions with `toString` is not completely reliable
 * because their closure variables might not the same.
 *
 * @param {any} a the first object
 * @param {any} b the second object to compare
 * @returns {boolean}
 */
export function isEqual(a: any, b: any) {
  if (a === b) {
    return true;
  }

  if (a instanceof Function) {
    return a.toString() === b.toString();
  }

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    let length;

    if (a.constructor !== b.constructor) {
      return false;
    }
    if (Array.isArray(a)) {
      length = a.length;
      if (length !== b.length) {
        return false;
      }
      for (let i = 0; i < length; i += 1) {
        // eslint-disable-next-line max-depth
        if (!isEqual(a[i], b[i])) {
          return false;
        }
      }

      return true;
    }
    if (a.valueOf !== Object.prototype.valueOf) {
      return a.valueOf() === b.valueOf();
    }
    if (a.toString !== Object.prototype.toString) {
      return a.toString() === b.toString();
    }
    const keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }
    for (let i = 0; i < length; i += 1) {
      const key = keys[i];
      if (!hasOwnProp(b, key) || !isEqual(a[key], b[key])) {
        return false;
      }
    }

    return true;
  }

  // eslint-disable-next-line no-self-compare
  return a !== a && b !== b;
}
