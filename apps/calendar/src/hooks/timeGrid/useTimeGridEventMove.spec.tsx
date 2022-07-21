import { h } from 'preact';

import { initCalendarStore, StoreProvider } from '@src/contexts/calendarStore';
import { EventBusProvider } from '@src/contexts/eventBus';
import { DRAGGING_TYPE_CREATORS } from '@src/helpers/drag';
import { createGridPositionFinder, createTimeGridData, getWeekDates } from '@src/helpers/grid';
import { useDrag } from '@src/hooks/common/useDrag';
import { useTimeGridEventMove } from '@src/hooks/timeGrid/useTimeGridEventMove';
import EventModel from '@src/model/eventModel';
import EventUIModel from '@src/model/eventUIModel';
import { createDate } from '@src/test/helpers';
import { dragAndDrop, renderHook, screen, userEvent } from '@src/test/utils';
import { Day, setTimeStrToDate, toFormat } from '@src/time/datetime';
import { EventBusImpl } from '@src/utils/eventBus';
import { noop } from '@src/utils/noop';
import { isNil } from '@src/utils/type';

describe('useTimeGridEventMove', () => {
  let eventModel: EventModel;
  let eventUIModel: EventUIModel;
  const rows = getWeekDates(createDate(2021, 2, 14), {
    startDayOfWeek: Day.SUN,
  });
  const timeGridData = createTimeGridData(rows, { hourStart: 0, hourEnd: 24 });
  const DEFAULT_CONTAINER_WIDTH = 70;
  const DEFAULT_CONTAINER_HEIGHT = 480;

  // Starts from the third day of the week, 10:00 AM ~ 12:00 PM
  const DEFAULT_START_ROW_INDEX = 20;
  const DEFAULT_END_ROW_INDEX = 28;
  const DEFAULT_COLUMN_INDEX = 2;

  const BASE_ROW_HEIGHT = timeGridData.rows[0].height;
  const BASE_COLUMN_WIDTH = timeGridData.columns[0].width;

  function toMousePosition(gridX: number, gridY: number) {
    return {
      clientX: gridX * 10 + 5,
      clientY: gridY * 10 + 5,
    };
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
    const eventBus = new EventBusImpl();
    const store = initCalendarStore();
    const gridPositionFinder = createGridPositionFinder({
      rowsCount: timeGridData.rows.length,
      columnsCount: timeGridData.columns.length,
      container,
    });
    store.getState().dispatch.calendar.createEvents([eventModel]);
    const MockBody = () => {
      const onMouseDown = useDrag(
        DRAGGING_TYPE_CREATORS.moveEvent('timeGrid', `${eventUIModel.cid()}`),
        {
          onInit: () => {
            store.getState().dispatch.dnd.setDraggingEventUIModel(eventUIModel);
          },
        }
      );
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
          <EventBusProvider value={eventBus}>
            <StoreProvider store={store}>
              <MockBody />
              {children}
            </StoreProvider>
          </EventBusProvider>
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

    eventModel = new EventModel({
      start: setTimeStrToDate(timeGridData.columns[DEFAULT_COLUMN_INDEX].date, startTime),
      end: setTimeStrToDate(timeGridData.columns[DEFAULT_COLUMN_INDEX].date, endTime),
    });
    eventUIModel = new EventUIModel(eventModel);
    eventUIModel.setUIProps({
      top: startRowTop,
      left: timeGridData.columns[DEFAULT_COLUMN_INDEX].left,
      height: endRowTop + endRowHeight - startRowTop,
    });
  });

  it('should return null when not dragging', () => {
    // Given
    const user = userEvent.setup();
    const result = setup();
    const event = screen.getByText('Event 1');

    // When
    user.click(event);

    // Then
    expect(result.current?.movingEvent).toBeNull();
  });

  /**
   * Starting from the top of the event, then clockwise
   */
  const cases = [
    {
      name: 'to the top',
      targetPosition: toMousePosition(DEFAULT_COLUMN_INDEX, DEFAULT_START_ROW_INDEX - 2),
      expected: {
        topDiff: -BASE_ROW_HEIGHT * 2,
        leftDiff: 0,
        timeLabel: '09:00',
      },
    },
    {
      name: 'to the upper right',
      targetPosition: toMousePosition(DEFAULT_COLUMN_INDEX + 1, DEFAULT_START_ROW_INDEX - 2),
      expected: {
        topDiff: -BASE_ROW_HEIGHT * 2,
        leftDiff: BASE_COLUMN_WIDTH,
        timeLabel: '09:00',
      },
    },
    {
      name: 'to the right',
      targetPosition: toMousePosition(DEFAULT_COLUMN_INDEX + 1, DEFAULT_START_ROW_INDEX),
      expected: {
        topDiff: 0,
        leftDiff: BASE_COLUMN_WIDTH,
        timeLabel: '10:00',
      },
    },
    {
      name: 'to the lower right',
      targetPosition: toMousePosition(DEFAULT_COLUMN_INDEX + 1, DEFAULT_START_ROW_INDEX + 2),
      expected: {
        topDiff: BASE_ROW_HEIGHT * 2,
        leftDiff: BASE_COLUMN_WIDTH,
        timeLabel: '11:00',
      },
    },
    {
      name: 'to the bottom',
      targetPosition: toMousePosition(DEFAULT_COLUMN_INDEX, DEFAULT_START_ROW_INDEX + 2),
      expected: {
        topDiff: BASE_ROW_HEIGHT * 2,
        leftDiff: 0,
        timeLabel: '11:00',
      },
    },
    {
      name: 'to the lower left',
      targetPosition: toMousePosition(DEFAULT_COLUMN_INDEX - 1, DEFAULT_START_ROW_INDEX + 2),
      expected: {
        topDiff: BASE_ROW_HEIGHT * 2,
        leftDiff: -BASE_COLUMN_WIDTH,
        timeLabel: '11:00',
      },
    },
    {
      name: 'to the left',
      targetPosition: toMousePosition(DEFAULT_COLUMN_INDEX - 1, DEFAULT_START_ROW_INDEX),
      expected: {
        topDiff: 0,
        leftDiff: -BASE_COLUMN_WIDTH,
        timeLabel: '10:00',
      },
    },
    {
      name: 'to the upper left',
      targetPosition: toMousePosition(DEFAULT_COLUMN_INDEX - 1, DEFAULT_START_ROW_INDEX - 2),
      expected: {
        topDiff: -BASE_ROW_HEIGHT * 2,
        leftDiff: -BASE_COLUMN_WIDTH,
        timeLabel: '09:00',
      },
    },
  ];

  it.each(cases)(
    'should change top & left value of moving event while dragging $name',
    ({ targetPosition, expected }) => {
      // Given
      const result = setup();
      const event = screen.getByText('Event 1');
      const { top: initTop, left: initLeft } = eventUIModel.getUIProps();

      // When
      dragAndDrop({
        element: event,
        initPosition: toMousePosition(DEFAULT_COLUMN_INDEX, DEFAULT_START_ROW_INDEX),
        targetPosition,
        hold: true,
      });

      // Then
      if (
        isNil(result.current) ||
        isNil(result.current.movingEvent) ||
        isNil(result.current.nextStartTime)
      ) {
        throw new Error('movingEvent is null');
      } else {
        const topDiff = result.current.movingEvent.top - initTop;
        const leftDiff = result.current.movingEvent.left - initLeft;

        expect(topDiff).toBeCloseTo(expected.topDiff, 1);
        expect(leftDiff).toBeCloseTo(expected.leftDiff, 1);
        expect(toFormat(result.current.nextStartTime, 'HH:mm')).toBe(expected.timeLabel);
      }
    }
  );
});
