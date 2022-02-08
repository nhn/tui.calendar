import { createTimeGridData, getWeekDates } from '@src/helpers/grid';
import {
  createMousePositionDataGrabberMonth,
  createMousePositionDataGrabberTimeGrid,
} from '@src/helpers/view';
import TZDate from '@src/time/date';
import { Day } from '@src/time/datetime';
import { noop } from '@src/utils/noop';

describe('createMousePositionDataGrabberMonth', function () {
  let calendar: TZDate[][] = [];
  const container = document.createElement('div');

  beforeEach(() => {
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

    calendar = [
      [
        new TZDate(2021, 3, 25),
        new TZDate(2021, 3, 26),
        new TZDate(2021, 3, 27),
        new TZDate(2021, 3, 28),
        new TZDate(2021, 3, 29),
        new TZDate(2021, 3, 30),
        new TZDate(2021, 4, 1),
      ],
      [
        new TZDate(2021, 4, 2),
        new TZDate(2021, 4, 3),
        new TZDate(2021, 4, 4),
        new TZDate(2021, 4, 5),
        new TZDate(2021, 4, 6),
        new TZDate(2021, 4, 7),
        new TZDate(2021, 4, 8),
      ],
    ];
  });

  it('should calculate gridX and gridY', () => {
    const grabber = createMousePositionDataGrabberMonth(calendar, container);

    let mockMouseEvent = {
      clientX: 9,
      clientY: 20,
      type: 'click',
    } as MouseEvent;

    expect(grabber(mockMouseEvent)).toEqual({
      gridX: 0,
      gridY: 0,
      x: 9,
      y: 20,
    });

    mockMouseEvent = {
      clientX: 55,
      clientY: 60,
      type: 'click',
    } as MouseEvent;

    expect(grabber(mockMouseEvent)).toEqual({
      gridX: 5,
      gridY: 1,
      x: 55,
      y: 60,
    });
  });
});

describe('createMousePositionDataGrabberTimeGrid', () => {
  const rows = getWeekDates(new TZDate('2021-02-07T00:00:00'), {
    startDayOfWeek: Day.SUN,
  });
  const timegridData = createTimeGridData(rows, { hourStart: 0, hourEnd: 24 });
  const container = document.createElement('div');

  beforeEach(() => {
    jest.spyOn(container, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 700, // NOTE: total 7 columns
      height: 960, // NOTE: total 48 rows
      toJSON: noop,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a function', () => {
    const grabber = createMousePositionDataGrabberTimeGrid(timegridData, container);

    expect(grabber).toBeInstanceOf(Function);
  });

  it('should return null if the mouse is outside the container', () => {
    const grabber = createMousePositionDataGrabberTimeGrid(timegridData, container);
    const result = grabber({
      clientX: -1,
      clientY: -1,
    });

    expect(result).toBeNull();
  });

  it('should calculate gridX from mouse position x', () => {
    // Given
    const cases = [
      {
        x: 0,
        expectedGridX: 0,
      },
      {
        x: 250,
        expectedGridX: 2,
      },
      {
        x: 450,
        expectedGridX: 4,
      },
      {
        x: 650,
        expectedGridX: 6,
      },
      {
        x: 700,
        expectedGridX: 6,
      },
    ];

    // When
    const grabber = createMousePositionDataGrabberTimeGrid(timegridData, container);
    const results = cases.map(({ x }) =>
      grabber({
        clientX: x,
        clientY: 0,
      })
    );

    // Then
    results.forEach((result, index) => {
      expect(result).toEqual({
        gridX: cases[index].expectedGridX,
        gridY: 0,
        x: cases[index].x,
        y: 0,
      });
    });
  });

  it('should calculate gridY from mouse position y', () => {
    // Given
    const cases = [
      {
        y: 0,
        expectedGridY: 0,
      },
      {
        y: 130,
        expectedGridY: 6,
      },
      {
        y: 230,
        expectedGridY: 11,
      },
      {
        y: 450,
        expectedGridY: 22,
      },
      {
        y: 720,
        expectedGridY: 36,
      },
      {
        y: 730,
        expectedGridY: 36,
      },
      {
        y: 935,
        expectedGridY: 46,
      },
      {
        y: 960,
        expectedGridY: 47,
      },
    ];

    // When
    const grabber = createMousePositionDataGrabberTimeGrid(timegridData, container);
    const results = cases.map(({ y }) =>
      grabber({
        clientX: 0,
        clientY: y,
      })
    );

    // Then
    results.forEach((result, index) => {
      expect(result).toEqual({
        gridX: 0,
        gridY: cases[index].expectedGridY,
        x: 0,
        y: cases[index].y,
      });
    });
  });

  it('should calculate gridX and gridY from mouse position x and y', () => {
    // Given
    const cases = [
      {
        x: 0,
        y: 0,
        expectedGridX: 0,
        expectedGridY: 0,
      },
      {
        x: 250,
        y: 130,
        expectedGridX: 2,
        expectedGridY: 6,
      },
      {
        x: 450,
        y: 230,
        expectedGridX: 4,
        expectedGridY: 11,
      },
      {
        x: 650,
        y: 450,
        expectedGridX: 6,
        expectedGridY: 22,
      },
      {
        x: 700,
        y: 720,
        expectedGridX: 6,
        expectedGridY: 36,
      },
      {
        x: 700,
        y: 730,
        expectedGridX: 6,
        expectedGridY: 36,
      },
      {
        x: 700,
        y: 935,
        expectedGridX: 6,
        expectedGridY: 46,
      },
      {
        x: 700,
        y: 960,
        expectedGridX: 6,
        expectedGridY: 47,
      },
    ];

    // When
    const grabber = createMousePositionDataGrabberTimeGrid(timegridData, container);
    const results = cases.map(({ x, y }) =>
      grabber({
        clientX: x,
        clientY: y,
      })
    );

    // Then
    results.forEach((result, index) => {
      expect(result).toEqual({
        gridX: cases[index].expectedGridX,
        gridY: cases[index].expectedGridY,
        x: cases[index].x,
        y: cases[index].y,
      });
    });
  });
});
