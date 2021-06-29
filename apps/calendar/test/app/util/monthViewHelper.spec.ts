import TZDate from '@src/time/date';
import { getGridInfo } from '@src/time/datetime';
import { createMousePositionDataGrabber } from '@src/util/monthViewHelper';

describe('monthView Helper', function () {
  let container: HTMLElement;
  let calendar: TZDate[][] = [];
  let grids: GridInfo[] = [];

  beforeEach(function () {
    container = document.createElement('div');
    container.style.width = '70px';
    container.style.height = '100px';

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

    grids = getGridInfo(7, false, 0, false);
  });

  it('should calc date by mouse event.', () => {
    const getBoundingClientRectSpy = jest.fn(
      () =>
        ({
          width: 70,
          height: 100,
          left: 0,
          top: 0,
        } as DOMRect)
    );
    container.getBoundingClientRect = getBoundingClientRectSpy;

    const func = createMousePositionDataGrabber(calendar, grids, container);

    let mockMouseEvent = {
      clientX: 9,
      clientY: 20,
      type: 'click',
    } as MouseEvent;

    expect(func(mockMouseEvent)).toEqual({
      gridX: 0,
      gridY: 0,
      x: 9,
      y: 20,
      triggerEvent: 'click',
    });

    mockMouseEvent = {
      clientX: 55,
      clientY: 60,
      type: 'click',
    } as MouseEvent;

    expect(func(mockMouseEvent)).toEqual({
      gridX: 5,
      gridY: 1,
      x: 55,
      y: 60,
      triggerEvent: 'click',
    });
  });
});
