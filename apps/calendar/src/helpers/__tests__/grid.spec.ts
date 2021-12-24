import range from 'tui-code-snippet/array/range';

import { createDateMatrixOfMonth } from '@src/helpers/grid';
import TZDate from '@src/time/date';
import { addDate, WEEK_DAYS } from '@src/time/datetime';

function createResultMatrix({
  startFrom,
  rows,
  rangeStart,
  rangeEnd,
}: {
  startFrom: TZDate;
  rows: number;
  rangeStart: number;
  rangeEnd: number;
}) {
  return range(rows).map((rowCount) =>
    range(rangeStart, rangeEnd + 1).map((num) => addDate(startFrom, num + rowCount * WEEK_DAYS))
  );
}

describe('createDateMatrixOfMonth', () => {
  it('should create matrix of dates of given month with empty option', () => {
    const targetMonth = new TZDate('2021-12-01T00:00:00');
    const expectedStartDateOfMonth = new TZDate('2021-11-28T00:00:00');

    const expected = createResultMatrix({
      startFrom: expectedStartDateOfMonth,
      rows: 6,
      rangeStart: 0,
      rangeEnd: 6,
    });

    const result = createDateMatrixOfMonth(targetMonth, {});

    expect(result).toEqual(expected);
  });

  it('should create matrix of dates less than 6 weeks', () => {
    const targetMonth = new TZDate('2021-12-01T00:00:00');
    const expectedStartDateOfMonth = new TZDate('2021-11-28T00:00:00');

    const expected = createResultMatrix({
      startFrom: expectedStartDateOfMonth,
      rows: 4,
      rangeStart: 0,
      rangeEnd: 6,
    });

    const result = createDateMatrixOfMonth(targetMonth, {
      visibleWeeksCount: 4,
    });

    expect(result).toEqual(expected);
  });

  it('should create matrix of dates less than 6 weeks, even though target date is not the first day of the month', () => {
    const targetDate = new TZDate('2021-12-15T00:00:00');
    const expectedStartDateOfMonth = new TZDate('2021-12-12T00:00:00');

    const expected = createResultMatrix({
      startFrom: expectedStartDateOfMonth,
      rows: 2,
      rangeStart: 0,
      rangeEnd: 6,
    });

    const result = createDateMatrixOfMonth(targetDate, {
      visibleWeeksCount: 2,
    });

    expect(result).toEqual(expected);
  });

  it('should exclude weekends when workweek option is enabled', () => {
    const targetMonth = new TZDate('2021-12-01T00:00:00');
    const expectedStartDateOfMonth = new TZDate('2021-11-28T00:00:00');

    const expected = createResultMatrix({
      startFrom: expectedStartDateOfMonth,
      rows: 6,
      rangeStart: 1,
      rangeEnd: 5,
    });

    const result = createDateMatrixOfMonth(targetMonth, {
      workweek: true,
    });

    expect(result).toEqual(expected);
  });

  it('should ignore isAlways6Week option when visibleWeeksCount option is enabled', () => {
    const targetMonth = new TZDate('2021-12-01T00:00:00');
    const expectedStartDateOfMonth = new TZDate('2021-11-28T00:00:00');

    const expected = createResultMatrix({
      startFrom: expectedStartDateOfMonth,
      rows: 4,
      rangeStart: 0,
      rangeEnd: 6,
    });

    const result = createDateMatrixOfMonth(targetMonth, {
      visibleWeeksCount: 4,
      isAlways6Week: true,
    });

    expect(result).toEqual(expected);
  });

  it('should create 5 weeks for month has only 5 weeks when isAlways6Week option is disabled', () => {
    const targetMonth = new TZDate('2021-08-01T00:00:00');
    const expectedStartDateOfMonth = new TZDate('2021-08-01T00:00:00');

    const expected = createResultMatrix({
      startFrom: expectedStartDateOfMonth,
      rows: 5,
      rangeStart: 0,
      rangeEnd: 6,
    });

    const result = createDateMatrixOfMonth(targetMonth, {
      isAlways6Week: false,
    });

    expect(result).toEqual(expected);
  });

  it('should create 6 weeks even though target month has only 5 weeks when isAlways6Week option is enabled', () => {
    const targetMonth = new TZDate('2021-08-01T00:00:00');
    const expectedStartDateOfMonth = new TZDate('2021-08-01T00:00:00');

    const expected = createResultMatrix({
      startFrom: expectedStartDateOfMonth,
      rows: 6,
      rangeStart: 0,
      rangeEnd: 6,
    });

    const result = createDateMatrixOfMonth(targetMonth, {
      isAlways6Week: true,
    });

    expect(result).toEqual(expected);
  });

  it('should not start from sunday when startDayOfWeek option is provided', () => {
    const targetMonth = new TZDate('2021-12-01T00:00:00');
    const createExpected = (startFrom: TZDate) =>
      createResultMatrix({
        startFrom,
        rows: 6,
        rangeStart: 0,
        rangeEnd: 6,
      });

    const startingMonday = new TZDate('2021-11-29T00:00:00');
    const expectedStartFromMonday = createExpected(startingMonday);
    const resultStartFromMonday = createDateMatrixOfMonth(targetMonth, {
      startDayOfWeek: 1,
    });

    expect(resultStartFromMonday).toEqual(expectedStartFromMonday);

    const startingWednesday = new TZDate('2021-12-01T00:00:00');
    const expectStartFromWednesday = createExpected(startingWednesday);
    const resultStartFromWednesday = createDateMatrixOfMonth(targetMonth, {
      startDayOfWeek: 3,
    });

    expect(resultStartFromWednesday).toEqual(expectStartFromWednesday);

    const startingFriday = new TZDate('2021-11-26T00:00:00');
    const expectStartFromFriday = createExpected(startingFriday);
    const resultStartFromFriday = createDateMatrixOfMonth(targetMonth, {
      startDayOfWeek: 5,
    });

    expect(resultStartFromFriday).toEqual(expectStartFromFriday);
  });
});
