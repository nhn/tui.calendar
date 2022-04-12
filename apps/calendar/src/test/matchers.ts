import type EventModel from '@src/model/eventModel';
import type EventUIModel from '@src/model/eventUIModel';
import TZDate from '@src/time/date';
import { isSameDate } from '@src/time/datetime';

// eslint-disable-next-line no-undefined
const undef = undefined;
function pickTitle(matrix: EventUIModel[]) {
  const titleList = [];

  for (let i = 0, cnt = matrix.length; i < cnt; i += 1) {
    if (!matrix[i]) {
      titleList.push(undef);
      continue;
    }

    titleList.push(matrix[i].valueOf().title);
  }

  return titleList;
}

function fail(message: string) {
  return {
    message: () => message,
    pass: false,
  };
}

function titleComparator(uiModel: EventUIModel, title: string | number) {
  return uiModel.model.title === title;
}

function topComparator(uiModel: EventUIModel, top: string | number) {
  return uiModel.top === top;
}

function getMatcher(comparator: (uiModel: EventUIModel, value: string | number) => boolean) {
  return function matcher(actual: Array<EventUIModel[]>, expected: Array<string[] | number[]>) {
    let aMatrix;
    let aLength;
    let bMatrix;
    let bLength;
    let aColumn;
    let aUIModel;
    let bValue;

    if (actual.length !== expected.length) {
      return fail(`Matrix number mismatch\nactual: ${actual}\nexpected: ${expected}`);
    }

    for (let i = 0, cnt = actual.length; i < cnt; i += 1) {
      aMatrix = actual[i];
      aLength = aMatrix.length;
      bMatrix = expected[i];
      bLength = bMatrix.length;

      if (aLength !== bLength) {
        return fail(
          `${i}th matrix is different\n` +
            `actual: ${pickTitle(aMatrix)}\n` +
            `expected: ${bMatrix}`
        );
      }

      for (let j = 0, cnt2 = aMatrix.length; j < cnt2; j += 1) {
        aColumn = aMatrix[j];

        if (!aColumn) {
          continue;
        }

        aUIModel = aColumn;
        bValue = bMatrix[j];

        if (!comparator(aUIModel, bValue)) {
          return fail(
            `[${i}][${j}] th matrix is different\n` +
              `actual: ${aUIModel}\n` +
              `expected: ${bValue}`
          );
        }
      }
    }

    return {
      message: () => 'Matrix match',
      pass: true,
    };
  };
}

expect.extend({
  toEqualMatricesTitle: getMatcher(titleComparator),
  toEqualMatricesTop: getMatcher(topComparator),
  toEqualUIModelByTitle(actual: Record<string, EventModel[]>, expected: Record<string, string[]>) {
    const result = {
      pass: false,
      message: () => '',
    };
    let isEqual = true;

    Object.keys(expected).findIndex((ymd) => {
      const models = actual[ymd];

      if (!models) {
        isEqual = false;

        return false;
      }

      const titleList = models.map((item) => item.title);

      isEqual = this.equals(titleList.sort(), expected[ymd].sort());

      return isEqual;
    });

    result.pass = isEqual;

    return result;
  },
  toBeSameDate(actual: number | string | TZDate | Date, expected: number | string | TZDate | Date) {
    return {
      pass: isSameDate(new TZDate(actual), new TZDate(expected)),
      message: () => `${expected} is not the same date as ${actual}.`,
    };
  },
});
