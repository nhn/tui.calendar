import { h } from 'preact';

import { fireEvent, screen } from '@testing-library/preact';

import { initCalendarStore, StoreProvider } from '@src/contexts/calendarStore';
import { DRAGGING_TYPE_CREATORS } from '@src/helpers/drag';
import { createGridPositionFinder, createTimeGridData, getWeekDates } from '@src/helpers/grid';
import { useDrag } from '@src/hooks/common/drag';
import { useTimeGridEventMove } from '@src/hooks/timeGrid/timeGridEventMove';
import EventModel from '@src/model/eventModel';
import EventUIModel from '@src/model/eventUIModel';
import { renderHook } from '@src/test/utils';
import TZDate from '@src/time/date';
import { Day, setTimeStrToDate } from '@src/time/datetime';
import { noop } from '@src/utils/noop';

describe('useTimeGridEventMove', () => {
  let eventModel: EventModel;
  let eventUIModel: EventUIModel;
  const rows = getWeekDates(new TZDate('2022-02-14T00:00:00'), {
    startDayOfWeek: Day.SUN,
  });
  const timeGridData = createTimeGridData(rows, { hourStart: 0, hourEnd: 24 });

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
      width: 70,
      height: 480,
      toJSON: noop,
    });
    const store = initCalendarStore();
    const gridPositionFinder = createGridPositionFinder({
      rowsCount: timeGridData.rows.length,
      columnsCount: timeGridData.columns.length,
      container,
    });
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
    const { startTime, top: startRowTop } = timeGridData.rows[20];
    // eslint-disable-next-line prefer-destructuring
    const { top: endRowTop, height: endRowHeight, endTime } = timeGridData.rows[28];

    eventModel = EventModel.create({
      start: setTimeStrToDate(timeGridData.columns[2].date, startTime),
      end: setTimeStrToDate(timeGridData.columns[2].date, endTime),
    });
    eventUIModel = EventUIModel.create(eventModel);
    eventUIModel.setUIProps({
      top: startRowTop,
      height: endRowTop + endRowHeight - startRowTop,
    });
  });

  it('should return currently moving event ui model when starting to drag', () => {
    // Given
    const result = setup();
    const event = screen.getByText('Event 1');

    // When
    fireEvent.mouseDown(event);

    // Then
    expect(result.current?.movingEvent).toBeInstanceOf(EventUIModel);
    expect(result.current?.movingEvent).toMatchObject({
      top: eventUIModel.top,
      height: eventUIModel.height,
    });
  });
});
