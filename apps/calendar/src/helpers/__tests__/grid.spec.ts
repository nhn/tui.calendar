import range from 'tui-code-snippet/array/range';

import {
  createDateMatrixOfMonth,
  createTimeGridData,
  getColumnsData,
  getWeekDates,
} from '@src/helpers/grid';
import TZDate from '@src/time/date';
import { addDate, isWeekend, WEEK_DAYS } from '@src/time/datetime';

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

describe('getColumnStyles', () => {
  it('should create default styles of a week', () => {
    // Given
    const weekDates = getWeekDates(new TZDate('2021-01-28T00:00:00'), {
      startDayOfWeek: 0,
      workweek: false,
    });
    const expectedWidth = 100 / weekDates.length;
    const getExpectedLeft = (index: number) => expectedWidth * index;

    // When
    const result = getColumnsData(weekDates);
    const totalWidth = result.reduce((acc, curr) => acc + curr.width, 0);

    // Then
    expect(result).toHaveLength(7);
    expect(totalWidth).toBeCloseTo(100, 0);
    weekDates.forEach((date, index) => {
      expect(result[index]).toEqual({
        date,
        width: expectedWidth,
        left: getExpectedLeft(index),
      });
    });
  });

  it('should create styles of a workweek', () => {
    // Given
    const weekDates = getWeekDates(new TZDate('2021-01-28T00:00:00'), {
      startDayOfWeek: 0,
      workweek: true,
    });
    const expectedWidth = 100 / weekDates.length;
    const getExpectedLeft = (index: number) => expectedWidth * index;

    // When
    const result = getColumnsData(weekDates);
    const totalWidth = result.reduce((acc, curr) => acc + curr.width, 0);

    // Then
    expect(result).toHaveLength(5);
    expect(totalWidth).toBeCloseTo(100, 0);
    weekDates.forEach((date, index) => {
      expect(result[index]).toEqual({
        date,
        width: expectedWidth,
        left: getExpectedLeft(index),
      });
    });
  });

  it('should create styles of a week with narrowWeekend option', () => {
    // Given
    const weekDates = getWeekDates(new TZDate('2021-01-28T00:00:00'), {
      startDayOfWeek: 0,
      workweek: false,
    });
    const expectedBasicWidth = 100 / (weekDates.length - 1);
    const expectedNarrowWidth = expectedBasicWidth / 2;
    let expectedLeft = 0;

    // When
    const result = getColumnsData(weekDates, true);
    const totalWidth = result.reduce((acc, curr) => acc + curr.width, 0);

    // Then
    expect(result).toHaveLength(7);
    expect(totalWidth).toBeCloseTo(100, 0);
    weekDates.forEach((date, index) => {
      expect(result[index]).toEqual({
        date,
        width: isWeekend(date.getDay()) ? expectedNarrowWidth : expectedBasicWidth,
        left: expectedLeft,
      });

      expectedLeft += result[index].width;
    });
  });
});

describe('createTimeGridData', () => {
  it('should create data by default values', () => {
    // Given
    const rows = getWeekDates(new TZDate('2021-01-28T00:00:00'), {
      startDayOfWeek: 0,
    });
    const expectedRowHeight = 100 / 24;
    const expected = {
      columns: getColumnsData(rows),
      rows: range(0, 24).map((hour, index) => ({
        top: expectedRowHeight * index,
        height: expectedRowHeight,
        startTime: `${hour}:00`.padStart(5, '0'),
        endTime: `${hour + 1}:00`.padStart(5, '0'),
      })),
    };

    // When
    const result = createTimeGridData(rows, { hourStart: 0, hourEnd: 24 });

    // Then
    expect(result).toEqual(expected);
  });

  it('should create data when rendering 00:00 to 12:00', () => {
    // Given
    const rows = getWeekDates(new TZDate('2021-01-28T00:00:00'), {
      startDayOfWeek: 0,
    });
    const expectedRowHeight = 100 / 12;
    const expected = {
      columns: getColumnsData(rows),
      rows: range(0, 12).map((hour, index) => ({
        top: expectedRowHeight * index,
        height: expectedRowHeight,
        startTime: `${hour}:00`.padStart(5, '0'),
        endTime: `${hour + 1}:00`.padStart(5, '0'),
      })),
    };

    // When
    const result = createTimeGridData(rows, { hourStart: 0, hourEnd: 12 });

    // Then
    expect(result).toEqual(expected);
  });

  it('should create data when rendering 12:00 to 24:00', () => {
    // Given
    const rows = getWeekDates(new TZDate('2021-01-28T00:00:00'), {
      startDayOfWeek: 0,
    });
    const expectedRowHeight = 100 / 12;
    const expected = {
      columns: getColumnsData(rows),
      rows: range(12, 24).map((hour, index) => ({
        top: expectedRowHeight * index,
        height: expectedRowHeight,
        startTime: `${hour}:00`.padStart(5, '0'),
        endTime: `${hour + 1}:00`.padStart(5, '0'),
      })),
    };

    // When
    const result = createTimeGridData(rows, { hourStart: 12, hourEnd: 24 });

    // Then
    expect(result).toEqual(expected);
  });
});
