import range from 'tui-code-snippet/array/range';

import { createEventCollection } from '@src/controller/base';
import {
  createDateMatrixOfMonth,
  createGridPositionFinder,
  createTimeGridData,
  getColumnsData,
  getExceedCount,
  getGridWidthAndLeftPercentValues,
  getRenderedEventUIModels,
  getWeekDates,
  getWidth,
  isWithinHeight,
} from '@src/helpers/grid';
import EventModel from '@src/model/eventModel';
import EventUIModel from '@src/model/eventUIModel';
import { createDate } from '@src/test/helpers';
import TZDate from '@src/time/date';
import { addDate, Day, isWeekend, WEEK_DAYS } from '@src/time/datetime';
import { noop } from '@src/utils/noop';

import type { CalendarData } from '@t/events';
import type { GridPosition, GridPositionFinder, TimeGridRow } from '@t/grid';

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

describe('getWidth', () => {
  const widthList = [1, 2, 3, 4, 5];

  it.each([
    [0, 0, 1],
    [0, 1, 3],
    [0, 2, 6],
    [0, 3, 10],
    [0, 4, 15],
    [1, 1, 2],
    [1, 2, 5],
    [1, 3, 9],
    [1, 4, 14],
    [2, 2, 3],
    [2, 3, 7],
    [2, 4, 12],
    [3, 3, 4],
    [3, 4, 9],
    [4, 4, 5],
  ])('should return sum of width from %i to %i', (start, end, expected) => {
    const result = getWidth(widthList, start, end);

    expect(result).toBe(expected);
  });
});

describe('getGridWidthAndLeftPercentValues', () => {
  const totalWidth = 100;
  let narrowWeekend: boolean;
  let row: TZDate[];

  describe('narrowWeekend is true', () => {
    beforeAll(() => {
      narrowWeekend = true;
    });

    it('should return single PanelEventInfo', () => {
      row = [createDate(2021, 4, 16)];

      const { widthList, leftList } = getGridWidthAndLeftPercentValues(
        row,
        narrowWeekend,
        totalWidth
      );

      expect(widthList).toHaveLength(1);
      expect(widthList).toEqual([100]);
      expect(leftList).toHaveLength(1);
      expect(leftList).toEqual([0]);
    });

    it('should return PanelEventInfo list (only weekday)', () => {
      // Mon, Tue, Wed, Thu, Fri
      row = [12, 13, 14, 15, 16].map((d) => createDate(2021, 4, d));

      const { widthList, leftList } = getGridWidthAndLeftPercentValues(
        row,
        narrowWeekend,
        totalWidth
      );

      expect(widthList).toHaveLength(5);
      expect(widthList).toEqual([20, 20, 20, 20, 20]);
      expect(leftList).toHaveLength(5);
      expect(leftList).toEqual([0, 20, 40, 60, 80]);
    });

    it('should return PanelEventInfo list (only weekend)', () => {
      // Sat, Sun
      row = [17, 18].map((d) => createDate(2021, 4, d));

      const { widthList, leftList } = getGridWidthAndLeftPercentValues(
        row,
        narrowWeekend,
        totalWidth
      );

      expect(widthList).toHaveLength(2);
      expect(widthList).toEqual([50, 50]);
      expect(leftList).toHaveLength(2);
      expect(leftList).toEqual([0, 50]);
    });

    it('should return PanelEventInfo list', () => {
      // Thu, Fri, Sat
      row = [15, 16, 17].map((d) => createDate(2021, 4, d));

      const { widthList, leftList } = getGridWidthAndLeftPercentValues(
        row,
        narrowWeekend,
        totalWidth
      );

      expect(widthList).toHaveLength(3);
      expect(widthList).toEqual([40, 40, 20]);
      expect(leftList).toHaveLength(3);
      expect(leftList).toEqual([0, 40, 80]);
    });
  });

  describe('narrowWeekend is false', () => {
    beforeAll(() => {
      narrowWeekend = false;
    });

    it('should return single grid width and left percent value', () => {
      row = [createDate(2021, 4, 16)];

      const { widthList, leftList } = getGridWidthAndLeftPercentValues(
        row,
        narrowWeekend,
        totalWidth
      );

      expect(widthList).toHaveLength(1);
      expect(widthList).toEqual([100]);
      expect(leftList).toHaveLength(1);
      expect(leftList).toEqual([0]);
    });

    it('should return list for grid width and left percent values (only weekday)', () => {
      // Mon, Tue, Wed, Thu, Fri
      row = [12, 13, 14, 15, 16].map((d) => createDate(2021, 4, d));

      const { widthList, leftList } = getGridWidthAndLeftPercentValues(
        row,
        narrowWeekend,
        totalWidth
      );

      expect(widthList).toHaveLength(5);
      expect(widthList).toEqual([20, 20, 20, 20, 20]);
      expect(leftList).toHaveLength(5);
      expect(leftList).toEqual([0, 20, 40, 60, 80]);
    });

    it('should return list for grid width and left percent values (only weekend)', () => {
      // Sat, Sun
      row = [17, 18].map((d) => createDate(2021, 4, d));

      const { widthList, leftList } = getGridWidthAndLeftPercentValues(
        row,
        narrowWeekend,
        totalWidth
      );

      expect(widthList).toHaveLength(2);
      expect(widthList).toEqual([50, 50]);
      expect(leftList).toHaveLength(2);
      expect(leftList).toEqual([0, 50]);
    });

    it('should return list for grid width and left percent values', () => {
      // Thu, Fri, Sat, Sun
      row = [15, 16, 17, 18].map((d) => createDate(2021, 4, d));

      const { widthList, leftList } = getGridWidthAndLeftPercentValues(
        row,
        narrowWeekend,
        totalWidth
      );

      expect(widthList).toHaveLength(4);
      expect(widthList).toEqual([25, 25, 25, 25]);
      expect(leftList).toHaveLength(4);
      expect(leftList).toEqual([0, 25, 50, 75]);
    });
  });
});

describe('getRenderedEventUIModels', () => {
  it('should get rendered event ui models', () => {
    const narrowWeekend = false;
    const row: TZDate[] = [
      new TZDate(2021, 5, 2),
      new TZDate(2021, 5, 3),
      new TZDate(2021, 5, 4),
      new TZDate(2021, 5, 5),
    ];
    const calendarData: CalendarData = {
      calendars: [],
      events: createEventCollection(),
      idsOfDay: {},
    };

    expect(getRenderedEventUIModels(row, calendarData, narrowWeekend)).toEqual({
      uiModels: [],
      gridDateEventModelMap: {},
    });
  });
});

describe('isWithinHeight', () => {
  it('should return a callback function that checks whether do not exceed height of container', () => {
    expect(isWithinHeight(100, 20)({ top: 1 } as EventUIModel)).toBe(true);
    expect(isWithinHeight(100, 20)({ top: 6 } as EventUIModel)).toBe(false);
  });
});

describe('getExceedCount', () => {
  const data = [
    { start: createDate(2021, 4, 30), end: createDate(2021, 5, 2) }, // Fri ~ Sun
    { start: createDate(2021, 5, 2), end: createDate(2021, 5, 4) }, // Sun ~ Tue
    { start: createDate(2021, 5, 4), end: createDate(2021, 5, 6) }, // Tue ~ Thu
  ];

  it('should calculate the number of events that exceed height of container', () => {
    const uiModels = data.map((e) => {
      const event = new EventModel(e);
      event.isAllday = true;

      return new EventUIModel(event);
    });

    expect(getExceedCount(uiModels, 200, 30)).toBe(0);
  });
});

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

  it('should ignore isAlways6Weeks option when visibleWeeksCount option is enabled', () => {
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
      isAlways6Weeks: true,
    });

    expect(result).toEqual(expected);
  });

  it('should create 5 weeks for month has only 5 weeks when isAlways6Weeks option is disabled', () => {
    const targetMonth = new TZDate('2021-08-01T00:00:00');
    const expectedStartDateOfMonth = new TZDate('2021-08-01T00:00:00');

    const expected = createResultMatrix({
      startFrom: expectedStartDateOfMonth,
      rows: 5,
      rangeStart: Day.SUN,
      rangeEnd: Day.SAT,
    });

    const result = createDateMatrixOfMonth(targetMonth, {
      isAlways6Weeks: false,
    });

    expect(result).toEqual(expected);
  });

  it('should create 6 weeks even though target month has only 5 weeks when isAlways6Weeks option is enabled', () => {
    const targetMonth = new TZDate('2021-08-01T00:00:00');
    const expectedStartDateOfMonth = new TZDate('2021-08-01T00:00:00');

    const expected = createResultMatrix({
      startFrom: expectedStartDateOfMonth,
      rows: 6,
      rangeStart: Day.SUN,
      rangeEnd: Day.SAT,
    });

    const result = createDateMatrixOfMonth(targetMonth, {
      isAlways6Weeks: true,
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

  it('should create narrow weekends with option', () => {
    // Given
    const narrowWeekend = true;
    const rows = getWeekDates(new TZDate('2021-01-28T00:00:00'), {
      startDayOfWeek: Day.SUN,
    });
    const options = { hourStart: 0, hourEnd: 24, narrowWeekend };

    // When
    const result = createTimeGridData(rows, options);

    // Then
    expect(result.columns).toEqual(getColumnsData(rows, narrowWeekend));
  });
});

describe('createGridPositionFinder', () => {
  const container = document.createElement('div');
  let gridPositionFinder: GridPositionFinder;

  function assertGridPosition(results: GridPosition[], expected: GridPosition[]) {
    expect(results.length).toBe(expected.length);
    results.forEach((result, index) => {
      expect(result).toEqual(expected[index]);
    });
  }

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when narrowWeekend is false', () => {
    const narrowWeekend = false;

    it('should be null returning function if container is null', () => {
      // Given
      gridPositionFinder = createGridPositionFinder({
        columnsCount: 7,
        rowsCount: 6,
        container: null,
        narrowWeekend,
      });

      // When
      const result = gridPositionFinder({ clientX: 100, clientY: 100 });

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

      gridPositionFinder = createGridPositionFinder({
        columnsCount: 7,
        rowsCount: 6,
        container,
        narrowWeekend,
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
      const results = wrongCases.map(({ clientX, clientY }) =>
        gridPositionFinder({ clientX, clientY })
      );

      // Then
      results.forEach((result) => expect(result).toBeNull());
    });

    it('should calculate columnIndex & rowIndex of grid in month', () => {
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
      gridPositionFinder = createGridPositionFinder({
        columnsCount: 7,
        rowsCount: 2,
        container,
        narrowWeekend,
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
      const results = cases.map(({ clientX, clientY }) => gridPositionFinder({ clientX, clientY }));

      // Then
      assertGridPosition(
        results as GridPosition[],
        cases.map(({ expected }) => expected)
      );
    });

    it('should calculate columnIndex & rowIndex of grid in week', () => {
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

      gridPositionFinder = createGridPositionFinder({
        columnsCount: 7,
        rowsCount: 1,
        container,
        narrowWeekend,
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
      const results = cases.map(({ clientX, clientY }) => gridPositionFinder({ clientX, clientY }));

      // Then
      assertGridPosition(
        results as GridPosition[],
        cases.map(({ expected }) => expected)
      );
    });

    it('should calculate columnIndex & rowIndex of grid in time grid', () => {
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

      gridPositionFinder = createGridPositionFinder({
        columnsCount: 7,
        rowsCount: 48,
        container,
        narrowWeekend,
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
        gridPositionFinder({
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

  describe('when narrowWeekend is true', () => {
    const narrowWeekend = true;

    it('should be null returning function if container is null', () => {
      // Given
      gridPositionFinder = createGridPositionFinder({
        columnsCount: 7,
        rowsCount: 6,
        container: null,
        narrowWeekend,
      });

      // When
      const result = gridPositionFinder({ clientX: 100, clientY: 100 });

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

      gridPositionFinder = createGridPositionFinder({
        columnsCount: 7,
        rowsCount: 6,
        container,
        narrowWeekend,
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
      const results = wrongCases.map(({ clientX, clientY }) =>
        gridPositionFinder({ clientX, clientY })
      );

      // Then
      results.forEach((result) => expect(result).toBeNull());
    });

    it('should calculate columnIndex & rowIndex of grid in month', () => {
      // Given
      jest.spyOn(container, 'getBoundingClientRect').mockReturnValue({
        x: 0,
        y: 0,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: 60,
        height: 100,
        toJSON: noop,
      });
      gridPositionFinder = createGridPositionFinder({
        columnsCount: 7,
        rowsCount: 2,
        container,
        narrowWeekend,
      });
      const cases = [
        {
          clientX: 4,
          clientY: 20,
          expected: {
            columnIndex: 0,
            rowIndex: 0,
          },
        },
        {
          clientX: 5,
          clientY: 20,
          expected: {
            columnIndex: 1,
            rowIndex: 0,
          },
        },
        {
          clientX: 54,
          clientY: 60,
          expected: {
            columnIndex: 5,
            rowIndex: 1,
          },
        },
        {
          clientX: 55,
          clientY: 60,
          expected: {
            columnIndex: 6,
            rowIndex: 1,
          },
        },
      ];

      // When
      const results = cases.map(({ clientX, clientY }) => gridPositionFinder({ clientX, clientY }));

      // Then
      assertGridPosition(
        results as GridPosition[],
        cases.map(({ expected }) => expected)
      );
    });

    it('should calculate columnIndex & rowIndex of grid in week', () => {
      // Given
      jest.spyOn(container, 'getBoundingClientRect').mockReturnValue({
        x: 0,
        y: 0,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: 600,
        height: 100,
        toJSON: noop,
      });

      gridPositionFinder = createGridPositionFinder({
        columnsCount: 7,
        rowsCount: 1,
        container,
        narrowWeekend,
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
          clientX: 50,
          clientY: 30,
          expected: {
            columnIndex: 1,
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
          clientX: 400,
          clientY: 50,
          expected: {
            columnIndex: 4,
            rowIndex: 0,
          },
        },
        {
          clientX: 500,
          clientY: 50,
          expected: {
            columnIndex: 5,
            rowIndex: 0,
          },
        },
        {
          clientX: 550,
          clientY: 60,
          expected: {
            columnIndex: 6,
            rowIndex: 0,
          },
        },
      ];

      // When
      const results = cases.map(({ clientX, clientY }) => gridPositionFinder({ clientX, clientY }));

      // Then
      assertGridPosition(
        results as GridPosition[],
        cases.map(({ expected }) => expected)
      );
    });

    it('should calculate columnIndex & rowIndex of grid in time grid', () => {
      // Given
      jest.spyOn(container, 'getBoundingClientRect').mockReturnValue({
        x: 0,
        y: 0,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: 600,
        height: 960,
        toJSON: noop,
      });

      gridPositionFinder = createGridPositionFinder({
        columnsCount: 7,
        rowsCount: 48,
        container,
        narrowWeekend,
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
          clientX: 50,
          clientY: 130,
          expected: {
            columnIndex: 1,
            rowIndex: 6,
          },
        },
        {
          clientX: 200,
          clientY: 130,
          expected: {
            columnIndex: 2,
            rowIndex: 6,
          },
        },
        {
          clientX: 400,
          clientY: 230,
          expected: {
            columnIndex: 4,
            rowIndex: 11,
          },
        },
        {
          clientX: 500,
          clientY: 330,
          expected: {
            columnIndex: 5,
            rowIndex: 16,
          },
        },
        {
          clientX: 550,
          clientY: 450,
          expected: {
            columnIndex: 6,
            rowIndex: 22,
          },
        },
        {
          clientX: 600,
          clientY: 720,
          expected: {
            columnIndex: 6,
            rowIndex: 36,
          },
        },
        {
          clientX: 600,
          clientY: 730,
          expected: {
            columnIndex: 6,
            rowIndex: 36,
          },
        },
        {
          clientX: 600,
          clientY: 935,
          expected: {
            columnIndex: 6,
            rowIndex: 46,
          },
        },
        {
          clientX: 600,
          clientY: 960,
          expected: {
            columnIndex: 6,
            rowIndex: 47,
          },
        },
      ];

      // When
      const results = cases.map(({ clientX, clientY }) =>
        gridPositionFinder({
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
});

describe('getWeekDates', () => {
  // 2022-07-17(Sun) ~ 2022-07-23(Sat)
  const todayList = [
    new TZDate(2022, 6, 17),
    new TZDate(2022, 6, 18),
    new TZDate(2022, 6, 19),
    new TZDate(2022, 6, 20),
    new TZDate(2022, 6, 21),
    new TZDate(2022, 6, 22),
    new TZDate(2022, 6, 23),
  ];
  afterEach(() => {
    jest.clearAllMocks();
  });

  // startDayOfWeek, dayOfToday, prevDateCountOfToday, nextDateCountOfToday
  test.concurrent.each([
    [Day.SUN, Day.SUN, 0, 6],
    [Day.SUN, Day.MON, 1, 5],
    [Day.SUN, Day.TUE, 2, 4],
    [Day.SUN, Day.WED, 3, 3],
    [Day.SUN, Day.THU, 4, 2],
    [Day.SUN, Day.FRI, 5, 1],
    [Day.SUN, Day.SAT, 6, 0],
    [Day.MON, Day.SUN, 6, 0],
    [Day.MON, Day.MON, 0, 6],
    [Day.MON, Day.TUE, 1, 5],
    [Day.MON, Day.WED, 2, 4],
    [Day.MON, Day.THU, 3, 3],
    [Day.MON, Day.FRI, 4, 2],
    [Day.MON, Day.SAT, 5, 1],
    [Day.TUE, Day.SUN, 5, 1],
    [Day.TUE, Day.MON, 6, 0],
    [Day.TUE, Day.TUE, 0, 6],
    [Day.TUE, Day.WED, 1, 5],
    [Day.TUE, Day.THU, 2, 4],
    [Day.TUE, Day.FRI, 3, 3],
    [Day.TUE, Day.SAT, 4, 2],
    [Day.WED, Day.SUN, 4, 2],
    [Day.WED, Day.MON, 5, 1],
    [Day.WED, Day.TUE, 6, 0],
    [Day.WED, Day.WED, 0, 6],
    [Day.WED, Day.THU, 1, 5],
    [Day.WED, Day.FRI, 2, 4],
    [Day.WED, Day.SAT, 3, 3],
    [Day.THU, Day.SUN, 3, 3],
    [Day.THU, Day.MON, 4, 2],
    [Day.THU, Day.TUE, 5, 1],
    [Day.THU, Day.WED, 6, 0],
    [Day.THU, Day.THU, 0, 6],
    [Day.THU, Day.FRI, 1, 5],
    [Day.THU, Day.SAT, 2, 4],
    [Day.FRI, Day.SUN, 2, 4],
    [Day.FRI, Day.MON, 3, 3],
    [Day.FRI, Day.TUE, 4, 2],
    [Day.FRI, Day.WED, 5, 1],
    [Day.FRI, Day.THU, 6, 0],
    [Day.FRI, Day.FRI, 0, 6],
    [Day.FRI, Day.SAT, 1, 5],
    [Day.SAT, Day.SUN, 1, 5],
    [Day.SAT, Day.MON, 2, 4],
    [Day.SAT, Day.TUE, 3, 3],
    [Day.SAT, Day.WED, 4, 2],
    [Day.SAT, Day.THU, 5, 1],
    [Day.SAT, Day.FRI, 6, 0],
    [Day.SAT, Day.SAT, 0, 6],
  ])(
    'startDayOfWeek: %i, today: %i',
    // eslint-disable-next-line require-await
    async (startDayOfWeek, dayOfToday, prevDateCount, nextDateCount) => {
      // Given
      const today = todayList[dayOfToday];
      const prevDateList = range(-prevDateCount, 0).map((step) => addDate(today, step));
      const nextDateList = range(1, nextDateCount + 1).map((step) => addDate(today, step));
      const expected = [...prevDateList, today, ...nextDateList];

      // When
      const dates = getWeekDates(today, { startDayOfWeek, workweek: false });

      // Then
      expect(dates).toEqual(expected);
    }
  );
});
