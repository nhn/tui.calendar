import { h } from 'preact';

import userEvent from '@testing-library/user-event';

import { initCalendarStore, StoreProvider } from '@src/contexts/calendarStore';
import { DRAGGING_TYPE_CREATORS } from '@src/helpers/drag';
import { createGridPositionFinder, createTimeGridData, getWeekDates } from '@src/helpers/grid';
import { useDrag } from '@src/hooks/common/drag';
import { useTimeGridEventMove } from '@src/hooks/timeGrid/timeGridEventMove';
import EventModel from '@src/model/eventModel';
import EventUIModel from '@src/model/eventUIModel';
import { createDate } from '@src/test/helpers';
import { dragAndDrop, renderHook, screen } from '@src/test/utils';
import { Day, setTimeStrToDate } from '@src/time/datetime';
import { ratio } from '@src/utils/math';
import { noop } from '@src/utils/noop';

describe('useTimeGridEventMove', () => {
  let eventModel: EventModel;
  let eventUIModel: EventUIModel;
  const rows = getWeekDates(createDate(2021, 2, 14), {
    startDayOfWeek: Day.SUN,
  });
  const timeGridData = createTimeGridData(rows, { hourStart: 0, hourEnd: 24 });
  const DEFAULT_CONTAINER_WIDTH = 70;
  const DEFAULT_CONTAINER_HEIGHT = 480;
  const DEFAULT_START_ROW_INDEX = 20;
  const DEFAULT_END_ROW_INDEX = 20;
  const DEFAULT_COLUMN_INDEX = 2;
  function getColumnIndex(x: number) {
    return Math.floor(ratio(DEFAULT_CONTAINER_WIDTH, timeGridData.columns.length, x));
  }
  function getRowIndex(y: number) {
    return Math.floor(ratio(DEFAULT_CONTAINER_HEIGHT, timeGridData.rows.length, y));
  }

  const setup = () => {
    const container = document.createElement('div');
    container.setAttribute('data-testid', 'container');
    document.body.appendChild(container);
    jest.spyOn(container, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: DEFAULT_CONTAINER_WIDTH,
      height: DEFAULT_CONTAINER_HEIGHT,
      toJSON: noop,
    });
    const store = initCalendarStore();
    const gridPositionFinder = createGridPositionFinder({
      rowsCount: timeGridData.rows.length,
      columnsCount: timeGridData.columns.length,
      container,
    });
    store.getState().dispatch.calendar.createEvents([eventModel]);
    const MockBody = () => {
      const onMouseDown = useDrag(DRAGGING_TYPE_CREATORS.moveEvent(`${eventUIModel.cid()}`), {
        onInit: () => {
          store.getState().dispatch.dnd.setDraggingEventUIModel(eventUIModel);
        },
      });
      return <div onMouseDown={onMouseDown}>Event 1</div>;
    };
    const { result } = renderHook(
      () =>
        useTimeGridEventMove({
          gridPositionFinder,
          timeGridData,
        }),
      {
        wrapper: ({ children }) => (
          <StoreProvider store={store}>
            <MockBody />
            {children}
          </StoreProvider>
        ),
      }
    );

    return result;
  };

  beforeEach(() => {
    // eslint-disable-next-line prefer-destructuring
    const { startTime, top: startRowTop } = timeGridData.rows[DEFAULT_START_ROW_INDEX];
    // eslint-disable-next-line prefer-destructuring
    const {
      top: endRowTop,
      height: endRowHeight,
      endTime,
    } = timeGridData.rows[DEFAULT_END_ROW_INDEX];

    eventModel = EventModel.create({
      start: setTimeStrToDate(timeGridData.columns[DEFAULT_COLUMN_INDEX].date, startTime),
      end: setTimeStrToDate(timeGridData.columns[DEFAULT_COLUMN_INDEX].date, endTime),
    });
    eventUIModel = EventUIModel.create(eventModel);
    eventUIModel.setUIProps({
      top: startRowTop,
      height: endRowTop + endRowHeight - startRowTop,
    });
  });

  it('should return null when not dragging', () => {
    // Given
    const result = setup();
    const event = screen.getByText('Event 1');

    // When
    userEvent.click(event);

    // Then
    expect(result.current?.movingEvent).toBeNull();
  });

  /**
   * Starting from the top of the event, then clockwise
   */
  const cases = [
    {
      name: 'to the top',
      clientX: 25,
      clientY: 100,
      expected: {
        top: timeGridData.rows[getRowIndex(100)].top,
        left: timeGridData.columns[getColumnIndex(25)].left,
      },
    },
    {
      name: 'to the upper right',
      clientX: 45,
      clientY: 100,
      expected: {
        top: timeGridData.rows[getRowIndex(100)].top,
        left: timeGridData.columns[getColumnIndex(45)].left,
      },
    },
    {
      name: 'to the right',
      clientX: 45,
      clientY: 240,
      expected: {
        top: timeGridData.rows[getRowIndex(240)].top,
        left: timeGridData.columns[getColumnIndex(45)].left,
      },
    },
    {
      name: 'to the lower right',
      clientX: 45,
      clientY: 360,
      expected: {
        top: timeGridData.rows[getRowIndex(360)].top,
        left: timeGridData.columns[getColumnIndex(45)].left,
      },
    },
    {
      name: 'to the bottom',
      clientX: 25,
      clientY: 360,
      expected: {
        top: timeGridData.rows[getRowIndex(360)].top,
        left: timeGridData.columns[getColumnIndex(25)].left,
      },
    },
    {
      name: 'to the lower left',
      clientX: 5,
      clientY: 360,
      expected: {
        top: timeGridData.rows[getRowIndex(360)].top,
        left: timeGridData.columns[getColumnIndex(5)].left,
      },
    },
    {
      name: 'to the left',
      clientX: 5,
      clientY: 240,
      expected: {
        top: timeGridData.rows[getRowIndex(240)].top,
        left: timeGridData.columns[getColumnIndex(5)].left,
      },
    },
    {
      name: 'to the upper left',
      clientX: 5,
      clientY: 100,
      expected: {
        top: timeGridData.rows[getRowIndex(100)].top,
        left: timeGridData.columns[getColumnIndex(5)].left,
      },
    },
  ];

  cases.forEach(({ name, clientX, clientY, expected }) => {
    it(`should change top & left value of moving event while dragging ${name}`, () => {
      // Given
      const result = setup();
      const event = screen.getByText('Event 1');

      // When
      dragAndDrop(
        event,
        {
          clientX,
          clientY,
        },
        true
      );

      // Then
      expect(result.current?.movingEvent).toMatchObject(expected);
    });
  });

  // it('should change start & end time of the target event when released', () => {
  //   // Given
  //   const result = setup();
  //   const event = screen.getByText('Event 1');
  //   const targetX = 25;
  //   const targetY = 100;
  //
  //   // When
  //   dragAndDrop(event, {
  //     clientX: targetX,
  //     clientY: targetY,
  //   });
  //   dragAndDrop(
  //     event,
  //     {
  //       clientX: targetX,
  //       clientY: targetY,
  //     },
  //     true
  //   );
  //
  //   // Then
  //   const resultStart = result.current?.movingEvent?.model?.start ?? Infinity;
  //   const resultEnd = result.current?.movingEvent?.model?.end ?? Infinity;
  //
  //   expect(resultStart < eventModel.start).toBeTruthy();
  //   expect(resultEnd < eventModel.end).toBeTruthy();
  // });
});
