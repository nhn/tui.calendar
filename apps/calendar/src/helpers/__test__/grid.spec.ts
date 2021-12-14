import range from 'tui-code-snippet/array/range';

import TZDate from '@src/time/date';
import { addDate } from '@src/time/datetime';

import { getDateMatrixByMonth } from '../grid';

describe('getDateMatrixByMonth', () => {
  it('should create matrix of dates of given month - default option', () => {
    const targetMonth = new TZDate('2014-10-01T00:00:00');
    const expectedStartDateOfMonth = new TZDate('2014-09-28T00:00:00');

    const expected = range(6).map((rowCount) =>
      range(7).map((num) => addDate(expectedStartDateOfMonth, num + rowCount * 7))
    );

    const result = getDateMatrixByMonth(targetMonth, {});

    expect(result).toEqual(expected);
  });
});
