import forEach from 'tui-code-snippet/collection/forEach';

import EventModel from '@src/model/eventModel';
import EventUIModel from '@src/model/eventUIModel';
import { compare } from '@src/time/datetime';

/**
 * A module for sorting array.
 * @module array
 */

/**********
 * Compare Functions
 **********/

/**
 * compare function for array sort.
 *
 * sort array by ascending.
 * @param {boolean} a The boolean to compare
 * @param {boolean} b The boolean to compare.
 * @returns {number} Result of comparison.
 */
function compareBooleansASC(a: boolean, b: boolean) {
  if (a !== b) {
    return a ? -1 : 1;
  }

  return 0;
}

/**
 * compare function for array sort.
 *
 * sort array by number ascending.
 * @param {number} a The number to compare.
 * @param {number} b The number to compare.
 * @returns {number} Result of comparison.
 */
function compareNumbersASC(a: any, b: any) {
  return Number(a) - Number(b);
}

/**
 * compare function for array sort.
 *
 * sort array by string ascending
 * @param {string} _a The string to compare.
 * @param {string} _b The string to compare.
 * @returns {number} Result of comparison.
 */
function compareStringsASC(_a: any, _b: any) {
  const a = String(_a),
    b = String(_b);

  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }

  return 0;
}

/**
 * Compare event models for sort.
 *
 * 1. all day event first.
 * 2. early start.
 * 3. longest duration.
 * 4. early created.
 * @param {EventModel} a The object event instance.
 * @param {EventModel} b The object event instance.
 * @returns {number} Result of comparison.
 */
// eslint-disable-next-line complexity
function compareEventsASC(a: EventModel | EventUIModel, b: EventModel | EventUIModel) {
  const modelA = a instanceof EventUIModel ? a.model : a;
  const modelB = b instanceof EventUIModel ? b.model : b;
  const allDayCompare = compareBooleansASC(
    modelA.isAllDay || modelA.hasMultiDates,
    modelB.isAllDay || modelB.hasMultiDates
  );

  if (allDayCompare) {
    return allDayCompare;
  }

  const startsCompare = compare(a.getStarts(), b.getStarts());

  if (startsCompare) {
    return startsCompare;
  }

  const durationA = a.duration();
  const durationB = b.duration();

  if (durationA < durationB) {
    return 1;
  }
  if (durationA > durationB) {
    return -1;
  }

  return modelA.cid() - modelB.cid();
}

/**********
 * Search
 **********/

/**
 * search item index using binary search algorithm.
 *
 * the array must be sorted.
 * @param {array} arr array to search.
 * @param {(string|number|boolean)} search value to search.
 * @param {function} [fn] iteratee for retrieve each element's value to search.
 * @param {function} [compare] compare function for specific sort status. default is string ascending.
 * @returns {number} The number of item index searched. return negative number when no exist that item.
 * It can use insert index after Math.abs()
 * @example
 *
 * var arr = [1, 3, 7, 11, 15, 23];
 *
 * function sortNumber(a, b) {
 *     return a - b;
 * }
 *
 * bsearch(arr, 15, null, sortNumber);    // 4
 * bsearch(arr, 21, null, sortNumber);    // -5
 *
 * arr.splice(Math.abs(bsearch(arr, 21, null, sortNumber)), 0, 21);
 * // [1, 2, 7, 11, 15, 21, 23]
 */
export function bsearch(
  arr: any[],
  search: any,
  fn?: (item: any) => any,
  compareFn?: (item: any, searchArg: any) => number
) {
  let minIndex = 0;
  let maxIndex = arr.length - 1;
  let currentIndex;
  let value;
  let comp;

  compareFn = compareFn || compareStringsASC;

  while (minIndex <= maxIndex) {
    currentIndex = ((minIndex + maxIndex) / 2) | 0; // Math.floor
    value = fn ? fn(arr[currentIndex]) : arr[currentIndex];
    comp = compareFn(value, search);

    if (comp < 0) {
      minIndex = currentIndex + 1;
    } else if (comp > 0) {
      maxIndex = currentIndex - 1;
    } else {
      return currentIndex;
    }
  }

  return ~maxIndex;
}

export default {
  bsearch,
  compare: {
    event: {
      asc: compareEventsASC,
    },
    num: {
      asc: compareNumbersASC,
    },
  },
};

export function first<T>(array: Array<T>) {
  return array[0];
}

export function last<T>(array: Array<T>) {
  return array[array.length - 1];
}

export function findIndex<T>(array: Array<T>, iteratee: (item: T) => boolean) {
  if (Array.prototype.findIndex) {
    return Array.prototype.findIndex.call(array, iteratee);
  }

  let foundIndex = -1;
  forEach(array, (item: T, index: number) => {
    if (iteratee(item)) {
      foundIndex = index;

      return false;
    }

    return true;
  });

  return foundIndex;
}
