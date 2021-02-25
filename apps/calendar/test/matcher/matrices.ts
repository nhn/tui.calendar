/* eslint-disable prefer-template */
/**
 * @fileoverview jasmine custom matcher for test
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
import ScheduleViewModel from '@src/model/scheduleViewModel';

// eslint-disable-next-line no-undefined
const undef = undefined;
function pickTitle(matrix: ScheduleViewModel[]) {
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
    message,
    pass: false,
  };
}

function titleComparator(viewModel: ScheduleViewModel, title: string | number) {
  return viewModel.model.title === title;
}

function topComparator(viewModel: ScheduleViewModel, top: string | number) {
  return viewModel.top === top;
}

function getMatcher(comparator: (viewModel: ScheduleViewModel, value: string | number) => boolean) {
  return function matcher(
    actual: Array<ScheduleViewModel[]>,
    expected: Array<string[] | number[]>
  ) {
    let aMatrix;
    let aLength;
    let bMatrix;
    let bLength;
    let aColumn;
    let aViewModel;
    let bValue;

    if (actual.length !== expected.length) {
      return fail('Matrix number mismatch\nactual: ' + actual + '\nexpected: ' + expected);
    }

    for (let i = 0, cnt = actual.length; i < cnt; i += 1) {
      aMatrix = actual[i];
      aLength = aMatrix.length;
      bMatrix = expected[i];
      bLength = bMatrix.length;

      if (aLength !== bLength) {
        return fail(
          i +
            'th matrix is different\n' +
            'actual: ' +
            pickTitle(aMatrix) +
            '\n' +
            'expected: ' +
            bMatrix
        );
      }

      for (let j = 0, cnt2 = aMatrix.length; j < cnt2; j += 1) {
        aColumn = aMatrix[j];

        if (!aColumn) {
          continue;
        }

        aViewModel = aColumn;
        bValue = bMatrix[j];

        if (!comparator(aViewModel, bValue)) {
          return fail(
            '[' +
              i +
              '][' +
              j +
              '] th matrix is different\n' +
              'actual: ' +
              aViewModel +
              '\n' +
              'expected: ' +
              bValue
          );
        }
      }
    }

    return {
      message: 'Matrix match',
      pass: true,
    };
  };
}

export default {
  toEqualMatricesTitle() {
    return {
      compare: getMatcher(titleComparator),
    };
  },
  toEqualMatricesTop() {
    return {
      compare: getMatcher(topComparator),
    };
  },
};
