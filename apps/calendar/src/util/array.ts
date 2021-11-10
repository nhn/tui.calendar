import EventModel from '@src/model/eventModel';
import EventUIModel from '@src/model/eventUIModel';
import { compare } from '@src/time/datetime';

function compareBooleansASC(a: boolean, b: boolean) {
  if (a !== b) {
    return a ? -1 : 1;
  }

  return 0;
}

function compareNumbersASC(a: any, b: any) {
  return Number(a) - Number(b);
}

function compareStringsASC(_a: any, _b: any) {
  const a = String(_a);
  const b = String(_b);

  if (a === b) {
    return 0;
  }

  return a > b ? 1 : -1;
}

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
