import range from 'tui-code-snippet/array/range';

import {
  createDateMatrixOfMonth,
  createGridPositionFinder,
  createTimeGridData,
  getColumnsData,
  getWeekDates,
} from '@src/helpers/grid';
import TZDate from '@src/time/date';
import { addDate, Day, isWeekend, WEEK_DAYS } from '@src/time/datetime';
import { noop } from '@src/utils/noop';

import { GridPosition, GridPositionFinder, TimeGridRow } from '@t/grid';

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
      rangeStart: Day.SUN,
      rangeEnd: Day.SAT,
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
      rangeStart: Day.SUN,
      rangeEnd: Day.SAT,
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
      rangeStart: Day.SUN,
      rangeEnd: Day.SAT,
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
      rangeStart: Day.MON,
      rangeEnd: Day.FRI,
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
      rangeStart: Day.SUN,
      rangeEnd: Day.SAT,
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
      rangeStart: Day.SUN,
      rangeEnd: Day.SAT,
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
      rangeStart: Day.SUN,
      rangeEnd: Day.SAT,
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
        rangeStart: Day.SUN,
        rangeEnd: Day.SAT,
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
      startDayOfWeek: Day.SUN,
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
      startDayOfWeek: Day.SUN,
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
      startDayOfWeek: Day.SUN,
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
  function assertTimeGridDataRows(
    expectedRows: TimeGridRow[],
    options: { hourStart: number; hourEnd: number }
  ) {
    const steps = (options.hourEnd - options.hourStart) * 2;
    const expectedRowHeight = 100 / steps;

    expect(expectedRows).toHaveLength(steps);
    range(steps).forEach((step, index) => {
      const isOdd = index % 2 === 1;
      const hour = options.hourStart + Math.floor(step / 2);

      expect(expectedRows[index]).toEqual({
        top: expectedRowHeight * index,
        height: expectedRowHeight,
        startTime: `${hour}:${isOdd ? '30' : '00'}`.padStart(5, '0'),
        endTime: (isOdd ? `${hour + 1}:00` : `${hour}:30`).padStart(5, '0'),
      });
    });
  }

  it('should create data by default values', () => {
    // Given
    const rows = getWeekDates(new TZDate('2021-01-28T00:00:00'), {
      startDayOfWeek: Day.SUN,
    });
    const options = { hourStart: 0, hourEnd: 24 };

    // When
    const result = createTimeGridData(rows, options);

    // Then
    expect(result.columns).toEqual(getColumnsData(rows));
    assertTimeGridDataRows(result.rows, options);
  });

  it('should create data when rendering 00:00 to 12:00', () => {
    // Given
    const rows = getWeekDates(new TZDate('2021-01-28T00:00:00'), {
      startDayOfWeek: Day.SUN,
    });
    const options = { hourStart: 0, hourEnd: 12 };

    // When
    const result = createTimeGridData(rows, options);

    // Then
    expect(result.columns).toEqual(getColumnsData(rows));
    assertTimeGridDataRows(result.rows, options);
  });

  it('should create data when rendering 12:00 to 24:00', () => {
    // Given
    const rows = getWeekDates(new TZDate('2021-01-28T00:00:00'), {
      startDayOfWeek: Day.SUN,
    });
    const options = { hourStart: 12, hourEnd: 24 };

    // When
    const result = createTimeGridData(rows, options);

    // Then
    expect(result.columns).toEqual(getColumnsData(rows));
    assertTimeGridDataRows(result.rows, options);
  });
});

describe('createGridPositionFinder', () => {
  const container = document.createElement('div');
  let finder: GridPositionFinder;

  function assertGridPosition(results: GridPosition[], expected: GridPosition[]) {
    expect(results.length).toBe(expected.length);
    results.forEach((result, index) => {
      expect(result).toEqual(expected[index]);
    });
  }

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be null returning function if container is null', () => {
    // Given
    finder = createGridPositionFinder({
      columnsCount: 7,
      rowsCount: 6,
      container: null,
    });

    // When
    const result = finder({ clientX: 100, clientY: 100 });

    // Then
    expect(result).toBeNull();
  });

  it('should return null if mouse position is out of container', () => {
    // Given
    jest.spyOn(container, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 100,
      height: 100,
      toJSON: noop,
    });

    finder = createGridPositionFinder({
      columnsCount: 7,
      rowsCount: 6,
      container,
    });

    const wrongCases = [
      { clientX: -1, clientY: -1 },
      { clientX: -1, clientY: 50 },
      { clientX: 50, clientY: -1 },
      { clientX: 50, clientY: 101 },
      { clientX: 101, clientY: 101 },
      { clientX: 101, clientY: 50 },
      { clientX: 101, clientY: -1 },
      { clientX: 50, clientY: -1 },
    ];

    // When
    const results = wrongCases.map(({ clientX, clientY }) => finder({ clientX, clientY }));

    // Then
    results.forEach((result) => expect(result).toBeNull());
  });

  it('should calculate x & y coords in grid in month', () => {
    // Given
    jest.spyOn(container, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 70,
      height: 100,
      toJSON: noop,
    });
    finder = createGridPositionFinder({
      columnsCount: 7,
      rowsCount: 2,
      container,
    });
    const cases = [
      {
        clientX: 9,
        clientY: 20,
        expected: {
          columnIndex: 0,
          rowIndex: 0,
        },
      },
      {
        clientX: 55,
        clientY: 60,
        expected: {
          columnIndex: 5,
          rowIndex: 1,
        },
      },
    ];

    // When
    const results = cases.map(({ clientX, clientY }) => finder({ clientX, clientY }));

    // Then
    assertGridPosition(
      results as GridPosition[],
      cases.map(({ expected }) => expected)
    );
  });

  it('should calculate x & y coords in grid in week', () => {
    // Given
    jest.spyOn(container, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 560,
      height: 100,
      toJSON: noop,
    });

    finder = createGridPositionFinder({
      columnsCount: 7,
      rowsCount: 1,
      container,
    });

    const cases = [
      {
        clientX: 0,
        clientY: 20,
        expected: {
          columnIndex: 0,
          rowIndex: 0,
        },
      },
      {
        clientX: 100,
        clientY: 40,
        expected: {
          columnIndex: 1,
          rowIndex: 0,
        },
      },
      {
        clientX: 390,
        clientY: 50,
        expected: {
          columnIndex: 4,
          rowIndex: 0,
        },
      },
      {
        clientX: 500,
        clientY: 60,
        expected: {
          columnIndex: 6,
          rowIndex: 0,
        },
      },
    ];

    // When
    const results = cases.map(({ clientX, clientY }) => finder({ clientX, clientY }));

    // Then
    assertGridPosition(
      results as GridPosition[],
      cases.map(({ expected }) => expected)
    );
  });

  it('should calculate x & y coords in grid in time grid', () => {
    // Given
    jest.spyOn(container, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 700,
      height: 960,
      toJSON: noop,
    });

    finder = createGridPositionFinder({
      columnsCount: 7,
      rowsCount: 48,
      container,
    });

    const cases = [
      {
        clientX: 0,
        clientY: 0,
        expected: {
          columnIndex: 0,
          rowIndex: 0,
        },
      },
      {
        clientX: 250,
        clientY: 130,
        expected: {
          columnIndex: 2,
          rowIndex: 6,
        },
      },
      {
        clientX: 450,
        clientY: 230,
        expected: {
          columnIndex: 4,
          rowIndex: 11,
        },
      },
      {
        clientX: 650,
        clientY: 450,
        expected: {
          columnIndex: 6,
          rowIndex: 22,
        },
      },
      {
        clientX: 700,
        clientY: 720,
        expected: {
          columnIndex: 6,
          rowIndex: 36,
        },
      },
      {
        clientX: 700,
        clientY: 730,
        expected: {
          columnIndex: 6,
          rowIndex: 36,
        },
      },
      {
        clientX: 700,
        clientY: 935,
        expected: {
          columnIndex: 6,
          rowIndex: 46,
        },
      },
      {
        clientX: 700,
        clientY: 960,
        expected: {
          columnIndex: 6,
          rowIndex: 47,
        },
      },
    ];

    // When
    const results = cases.map(({ clientX, clientY }) =>
      finder({
        clientX,
        clientY,
      })
    );

    // Then
    assertGridPosition(
      results as GridPosition[],
      cases.map(({ expected }) => expected)
    );
  });
});
