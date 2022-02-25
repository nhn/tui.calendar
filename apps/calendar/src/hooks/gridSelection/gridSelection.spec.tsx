import { h } from 'preact';

import { fireEvent, screen } from '@testing-library/preact';
import { act, renderHook } from '@testing-library/preact-hooks';
import userEvent from '@testing-library/user-event';

import { initCalendarStore, StoreProvider } from '@src/contexts/calendarStore';
import { EventBusProvider } from '@src/contexts/eventBus';
import { createGridPositionFinder, createTimeGridData, getWeekDates } from '@src/helpers/grid';
import { timeGridSelectionHelper } from '@src/helpers/gridSelection';
import { useGridSelection } from '@src/hooks/gridSelection/gridSelection';
import TZDate from '@src/time/date';
import { EventBusImpl } from '@src/utils/eventBus';
import { noop } from '@src/utils/noop';

import { PropsWithChildren } from '@t/components/common';
import { GridSelectionType } from '@t/drag';
import { ExternalEventTypes } from '@t/eventBus';
import { GridPosition } from '@t/grid';
import { CalendarStore, InternalStoreAPI } from '@t/store';

describe('useGridSelection', () => {
  let store: InternalStoreAPI<CalendarStore>;
  const eventBus = new EventBusImpl<ExternalEventTypes>();

  const wrapper = ({ children }: PropsWithChildren) => (
    <EventBusProvider value={eventBus}>
      <StoreProvider store={store}>{children}</StoreProvider>
    </EventBusProvider>
  );

  function setup<DateCollection>({
    type = 'timeGrid',
    useCreationPopup = false,
    selectionSorter = jest.fn((init, current) => ({
      startColumnIndex: current.columnIndex,
      startRowIndex: current.rowIndex,
      endColumnIndex: current.columnIndex,
      endRowIndex: current.rowIndex,
    })),
    dateGetter = jest.fn(() => [new TZDate(), new TZDate()]),
    dateCollection = {} as DateCollection,
  }: {
    type?: GridSelectionType;
    useCreationPopup?: boolean;
    dateCollection?: DateCollection;
    selectionSorter?: (
      initPosition: GridPosition,
      currentPosition: GridPosition
    ) => GridSelectionData;
    dateGetter?: (
      dateCollection: DateCollection,
      gridSelection: GridSelectionData
    ) => [TZDate, TZDate];
  } = {}) {
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

    if (useCreationPopup) {
      store.getState().dispatch.options.setOptions({
        useCreationPopup: true,
      });
    }

    const gridPositionFinder = createGridPositionFinder({
      rowsCount: 48,
      columnsCount: 7,
      container,
    });

    const { result } = renderHook(
      () =>
        useGridSelection({
          type,
          selectionSorter,
          dateGetter,
          dateCollection,
          gridPositionFinder,
        }),
      {
        wrapper,
      }
    );

    if (result.current) {
      container.addEventListener('mousedown', result.current.onMouseDown);
    }

    return result;
  }

  function dragMouse(container: HTMLElement, from: ClientMousePosition, to: ClientMousePosition) {
    act(() => {
      fireEvent.mouseDown(container, {
        clientX: from.clientX,
        clientY: from.clientY,
      });
    });
    // to init drag
    act(() => {
      fireEvent.mouseMove(document, {
        clientX: 0,
        clientY: 0,
      });
    });
    act(() => {
      fireEvent.mouseMove(document, {
        clientX: to.clientX,
        clientY: to.clientY,
      });
    });
    act(() => {
      fireEvent.mouseUp(document);
    });
  }

  beforeEach(() => {
    store = initCalendarStore();
    store.getState().dispatch.popup.showFormPopup = jest.fn();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  it('should return null if mousedown not fired', () => {
    // Given
    const result = setup();

    // When

    // Then
    expect(result.current?.gridSelection).toBeNull();
  });

  describe('when drag start', () => {
    const cases = [
      {
        initX: 0,
        initY: 0,
        expected: {
          endColumnIndex: 0,
          endRowIndex: 0,
          startColumnIndex: 0,
          startRowIndex: 0,
        },
      },
      {
        initX: 0,
        initY: 480,
        expected: {
          endColumnIndex: 0,
          endRowIndex: 47,
          startColumnIndex: 0,
          startRowIndex: 47,
        },
      },
      {
        initX: 70,
        initY: 0,
        expected: {
          endColumnIndex: 6,
          endRowIndex: 0,
          startColumnIndex: 6,
          startRowIndex: 0,
        },
      },
      {
        initX: 70,
        initY: 480,
        expected: {
          endColumnIndex: 6,
          endRowIndex: 47,
          startColumnIndex: 6,
          startRowIndex: 47,
        },
      },
      {
        initX: 15,
        initY: 35,
        expected: {
          endColumnIndex: 1,
          endRowIndex: 3,
          startColumnIndex: 1,
          startRowIndex: 3,
        },
      },
      {
        initX: 35,
        initY: 165,
        expected: {
          endColumnIndex: 3,
          endRowIndex: 16,
          startColumnIndex: 3,
          startRowIndex: 16,
        },
      },
    ];

    cases.forEach(({ initX, initY, expected }) => {
      it(`should return grid selection data when just click at (${initX}, ${initY})`, () => {
        // Given
        const result = setup();
        const container = screen.getByTestId('container');

        // When
        act(() => {
          userEvent.click(container, {
            clientX: initX,
            clientY: initY,
          });
        });

        // Then
        expect(result.current?.gridSelection).toEqual(expected);
      });
    });
  });

  describe('when dragging', () => {
    // NOTE: center of container, index is (3, 24)
    const initX = 35;
    const initY = 240;
    /*
       index of directions
       0  1  2
       7     3
       6  5  4
    */
    const cases = [
      {
        x: 0,
        y: 0,
        expected: {
          startColumnIndex: 0,
          startRowIndex: 0,
          endColumnIndex: 3,
          endRowIndex: 24,
        },
      },
      {
        x: initX,
        y: 0,
        expected: {
          startColumnIndex: 3,
          startRowIndex: 0,
          endColumnIndex: 3,
          endRowIndex: 24,
        },
      },
      {
        x: 70,
        y: 0,
        expected: {
          startColumnIndex: 3,
          startRowIndex: 24,
          endColumnIndex: 6,
          endRowIndex: 0,
        },
      },
      {
        x: 70,
        y: initY,
        expected: {
          startColumnIndex: 3,
          startRowIndex: 24,
          endColumnIndex: 6,
          endRowIndex: 24,
        },
      },
      {
        x: 70,
        y: 480,
        expected: {
          startColumnIndex: 3,
          startRowIndex: 24,
          endColumnIndex: 6,
          endRowIndex: 47,
        },
      },
      {
        x: initX,
        y: 480,
        expected: {
          startColumnIndex: 3,
          startRowIndex: 24,
          endColumnIndex: 3,
          endRowIndex: 47,
        },
      },
      {
        x: 0,
        y: 480,
        expected: {
          startColumnIndex: 0,
          startRowIndex: 47,
          endColumnIndex: 3,
          endRowIndex: 24,
        },
      },
      {
        x: 0,
        y: initY,
        expected: {
          startColumnIndex: 0,
          startRowIndex: 24,
          endColumnIndex: 3,
          endRowIndex: 24,
        },
      },
    ];

    cases.forEach(({ x, y, expected }) => {
      it(`should return grid selection data if drag event is fired at center to (${x}, ${y})`, () => {
        // Given
        const result = setup({
          selectionSorter: timeGridSelectionHelper.sortSelection,
        });
        const container = screen.getByTestId('container');

        // When
        dragMouse(container, { clientX: initX, clientY: initY }, { clientX: x, clientY: y });

        // Then
        expect(result.current?.gridSelection).toEqual(expected);
      });
    });
  });

  describe('Accumulated gridSelection', () => {
    const from = { clientX: 0, clientY: 0 };
    const to = { clientX: 50, clientY: 50 };

    it('should not add grid selection in timeGrid', () => {
      // Given
      setup({
        type: 'timeGrid',
      });
      const container = screen.getByTestId('container');

      // When
      dragMouse(container, from, to);

      // Then
      expect(store.getState().gridSelection.timeGrid).toEqual([]);
    });

    it('should not add grid selection in dayGridWeek', () => {
      // Given
      setup({
        type: 'dayGridWeek',
      });
      const container = screen.getByTestId('container');

      // When
      dragMouse(container, from, to);

      // Then
      expect(store.getState().gridSelection.dayGridWeek).toEqual([]);
    });

    it('should not add grid selection in dayGridMonth when useCreationPopup is true', () => {
      // Given
      setup({
        type: 'dayGridMonth',
        useCreationPopup: true,
      });
      const container = screen.getByTestId('container');

      // When
      dragMouse(container, from, to);

      // Then
      expect(store.getState().gridSelection.dayGridMonth).toEqual([]);
    });

    it('should add grid selection in dayGridMonth when useCreationPopup is false', () => {
      // Given
      setup({
        type: 'dayGridMonth',
      });
      const container = screen.getByTestId('container');

      // When
      dragMouse(container, from, to);

      // Then
      const accumulatedGridSelection = store.getState().gridSelection.dayGridMonth;
      expect(accumulatedGridSelection).not.toEqual([]);
      expect(accumulatedGridSelection).toHaveLength(1);
    });
  });

  const weekDates = getWeekDates(new TZDate('2022-02-14T00:00:00.000'), {
    startDayOfWeek: 0,
    workweek: false,
  });

  const timeGridData = createTimeGridData(weekDates, { hourStart: 0, hourEnd: 24 });

  describe('Opening popup', () => {
    it('should open event form popup after dragging when the `useCreationPopup` option is enabled', () => {
      // Given
      const showFormPopupAction = store.getState().dispatch.popup.showFormPopup;
      setup({
        useCreationPopup: true,
        selectionSorter: timeGridSelectionHelper.sortSelection,
        dateCollection: timeGridData,
        dateGetter: timeGridSelectionHelper.getDateFromCollection,
      });
      const container = screen.getByTestId('container');

      // When
      dragMouse(container, { clientX: 35, clientY: 240 }, { clientX: 35, clientY: 480 });

      // Then
      expect(showFormPopupAction).toHaveBeenCalledWith(
        expect.objectContaining({
          start: new TZDate('2022-02-16T12:00:00.000'),
          end: new TZDate('2022-02-17T00:00:00.000'),
        })
      );
    });

    it('should open event form popup after clicking when the `useCreationPopup` option is enabled', () => {
      // Given
      const showFormPopupAction = store.getState().dispatch.popup.showFormPopup;
      setup({
        useCreationPopup: true,
        selectionSorter: timeGridSelectionHelper.sortSelection,
        dateCollection: timeGridData,
        dateGetter: timeGridSelectionHelper.getDateFromCollection,
      });
      const container = screen.getByTestId('container');

      // When
      userEvent.click(container, { clientX: 35, clientY: 240 });

      // Then
      expect(showFormPopupAction).toHaveBeenCalledWith(
        expect.objectContaining({
          start: new TZDate('2022-02-16T12:00:00.000'),
          end: new TZDate('2022-02-16T12:30:00.000'),
        })
      );
    });
  });

  describe('Invoking Custom Event', () => {
    function wrapMockHandler(mockFn: jest.Mock) {
      return (...args: any[]) => mockFn(...args);
    }
    const mockHandler = jest.fn();

    beforeEach(() => {
      eventBus.on('selectDateTime', wrapMockHandler(mockHandler));
      setup({
        useCreationPopup: true,
        selectionSorter: timeGridSelectionHelper.sortSelection,
        dateCollection: timeGridData,
        dateGetter: timeGridSelectionHelper.getDateFromCollection,
      });
    });

    afterEach(() => {
      mockHandler.mockReset();
    });

    it('should fire `selectDateTime` custom event after dragging', () => {
      // Given
      const container = screen.getByTestId('container');

      // When
      dragMouse(container, { clientX: 35, clientY: 240 }, { clientX: 35, clientY: 480 });

      // Then
      expect(mockHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          start: new Date('2022-02-16T12:00:00.000'),
          end: new Date('2022-02-17T00:00:00.000'),
        })
      );
    });

    it('should fire `selectDateTime` custom event after clicking', () => {
      // Given
      const container = screen.getByTestId('container');

      // When
      userEvent.click(container, { clientX: 35, clientY: 240 });

      // Then
      expect(mockHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          start: new Date('2022-02-16T12:00:00.000'),
          end: new Date('2022-02-16T12:30:00.000'),
        })
      );
    });
  });
});
