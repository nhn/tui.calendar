import { h } from 'preact';

import { initCalendarStore, StoreProvider } from '@src/contexts/calendarStore';
import { EventBusProvider } from '@src/contexts/eventBus';
import { createGridPositionFinder, createTimeGridData, getWeekDates } from '@src/helpers/grid';
import { timeGridSelectionHelper } from '@src/helpers/gridSelection';
import { useGridSelection } from '@src/hooks/gridSelection/useGridSelection';
import type { GridSelectionType } from '@src/slices/gridSelection';
import { dragAndDrop, renderHook, screen } from '@src/test/utils';
import TZDate from '@src/time/date';
import { EventBusImpl } from '@src/utils/eventBus';
import { noop } from '@src/utils/noop';

import type { PropsWithChildren } from '@t/components/common';
import type { GridSelectionData } from '@t/components/gridSelection';
import type { ExternalEventTypes } from '@t/eventBus';
import type { GridPosition } from '@t/grid';
import type { GridSelectionOptions } from '@t/options';
import type { CalendarStore, InternalStoreAPI } from '@t/store';

const CONTAINER_WIDTH = 70;
const CONTAINER_HEIGHT = 480;

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
    gridSelection = { enableDblClick: true, enableClick: true },
    useFormPopup = false,
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
    gridSelection?: GridSelectionOptions;
    useFormPopup?: boolean;
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
      width: CONTAINER_WIDTH,
      height: CONTAINER_HEIGHT,
      toJSON: noop,
    });

    store.getState().dispatch.options.setOptions({
      useFormPopup,
      gridSelection,
    });

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
      container.addEventListener('mousedown', result.current);
    }

    return result;
  }
  function getGridSelectionState() {
    return store.getState().gridSelection;
  }

  beforeEach(() => {
    store = initCalendarStore();
    store.getState().dispatch.popup.showFormPopup = jest.fn();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('should return null if mousedown not fired', () => {
    // Given
    setup();

    // When
    // Do nothing

    // Then
    expect(getGridSelectionState().timeGrid).toBeNull();
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
        initY: CONTAINER_HEIGHT,
        expected: {
          endColumnIndex: 0,
          endRowIndex: 47,
          startColumnIndex: 0,
          startRowIndex: 47,
        },
      },
      {
        initX: CONTAINER_WIDTH,
        initY: 0,
        expected: {
          endColumnIndex: 6,
          endRowIndex: 0,
          startColumnIndex: 6,
          startRowIndex: 0,
        },
      },
      {
        initX: CONTAINER_WIDTH,
        initY: CONTAINER_HEIGHT,
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
      it(`should return grid selection data when just mousedown and mousemove at (${initX}, ${initY})`, () => {
        // Given
        setup();
        const container = screen.getByTestId('container');

        // When
        dragAndDrop({
          element: container,
          initPosition: { clientX: initX, clientY: initY },
          targetPosition: {
            clientX: initX < CONTAINER_WIDTH ? initX + 3 : initX - 3,
            clientY: initY < CONTAINER_HEIGHT ? initY + 3 : initY - 3,
          },
          hold: true,
        });

        // Then
        expect(getGridSelectionState().timeGrid).toEqual(expected);
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
        x: CONTAINER_WIDTH,
        y: 0,
        expected: {
          startColumnIndex: 3,
          startRowIndex: 24,
          endColumnIndex: 6,
          endRowIndex: 0,
        },
      },
      {
        x: CONTAINER_WIDTH,
        y: initY,
        expected: {
          startColumnIndex: 3,
          startRowIndex: 24,
          endColumnIndex: 6,
          endRowIndex: 24,
        },
      },
      {
        x: CONTAINER_WIDTH,
        y: CONTAINER_HEIGHT,
        expected: {
          startColumnIndex: 3,
          startRowIndex: 24,
          endColumnIndex: 6,
          endRowIndex: 47,
        },
      },
      {
        x: initX,
        y: CONTAINER_HEIGHT,
        expected: {
          startColumnIndex: 3,
          startRowIndex: 24,
          endColumnIndex: 3,
          endRowIndex: 47,
        },
      },
      {
        x: 0,
        y: CONTAINER_HEIGHT,
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
        setup({
          selectionSorter: timeGridSelectionHelper.sortSelection,
        });
        const container = screen.getByTestId('container');

        // When
        dragAndDrop({
          element: container,
          initPosition: { clientX: initX, clientY: initY },
          targetPosition: { clientX: x, clientY: y },
        });

        // Then
        expect(getGridSelectionState().timeGrid).toEqual(expected);
      });
    });
  });

  describe('Accumulated gridSelection', () => {
    const initPosition = { clientX: 0, clientY: 0 };
    const targetPosition = { clientX: 50, clientY: 50 };

    it('should not add grid selection in dayGridMonth when useFormPopup is true', () => {
      // Given
      setup({
        type: 'dayGridMonth',
        useFormPopup: true,
      });
      const container = screen.getByTestId('container');

      // When
      dragAndDrop({ element: container, initPosition, targetPosition });

      // Then
      expect(store.getState().gridSelection.accumulated.dayGridMonth).toEqual([]);
    });

    it('should add grid selection in dayGridMonth when useFormPopup is false', () => {
      // Given
      setup({
        type: 'dayGridMonth',
      });
      const container = screen.getByTestId('container');

      // When
      dragAndDrop({ element: container, initPosition, targetPosition });
      dragAndDrop({ element: container, initPosition, targetPosition });

      // Then
      const accumulatedGridSelection = store.getState().gridSelection.accumulated.dayGridMonth;
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
    it('should open event form popup after dragging when the `useFormPopup` option is enabled', () => {
      // Given
      const showFormPopupAction = store.getState().dispatch.popup.showFormPopup;
      setup({
        useFormPopup: true,
        selectionSorter: timeGridSelectionHelper.sortSelection,
        dateCollection: timeGridData,
        dateGetter: timeGridSelectionHelper.getDateFromCollection,
      });
      const container = screen.getByTestId('container');

      // When
      dragAndDrop({
        element: container,
        initPosition: { clientX: 35, clientY: 240 },
        targetPosition: { clientX: 35, clientY: 480 },
      });

      // Then
      expect(showFormPopupAction).toHaveBeenCalledWith(
        expect.objectContaining({
          start: new TZDate('2022-02-16T12:00:00.000'),
          end: new TZDate('2022-02-17T00:00:00.000'),
        })
      );
    });

    // FIXME
    // it('should open event form popup after clicking when the `useFormPopup` option is enabled', () => {
    //   // Given
    //   jest.useFakeTimers(); // Test for debounced click handler.
    //   const showFormPopupAction = store.getState().dispatch.popup.showFormPopup;
    //   setup({
    //     useFormPopup: true,
    //     selectionSorter: timeGridSelectionHelper.sortSelection,
    //     dateCollection: timeGridData,
    //     dateGetter: timeGridSelectionHelper.getDateFromCollection,
    //   });
    //   const container = screen.getByTestId('container');
    //
    //   // When
    //   userEvent.click(container, { clientX: 35, clientY: 240 });
    //   jest.advanceTimersByTime(1000);
    //
    //   // Then
    //   expect(showFormPopupAction).toHaveBeenCalledWith(
    //     expect.objectContaining({
    //       start: new TZDate('2022-02-16T12:00:00.000'),
    //       end: new TZDate('2022-02-16T12:30:00.000'),
    //     })
    //   );
    // });
  });

  describe('Invoking Custom Event', () => {
    function wrapMockHandler(mockFn: jest.Mock) {
      return (...args: any[]) => mockFn(...args);
    }
    const mockHandler = jest.fn();

    beforeEach(() => {
      eventBus.on('selectDateTime', wrapMockHandler(mockHandler));
      setup({
        useFormPopup: true,
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
      dragAndDrop({
        element: container,
        initPosition: { clientX: 35, clientY: 240 },
        targetPosition: { clientX: 35, clientY: 480 },
      });

      // Then
      expect(mockHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          start: new Date('2022-02-16T12:00:00.000'),
          end: new Date('2022-02-17T00:00:00.000'),
        })
      );
    });

    // FIXME
    // it('should fire `selectDateTime` custom event after clicking', () => {
    //   // Given
    //   jest.useFakeTimers(); // Test for debounced click handler.
    //   const container = screen.getByTestId('container');
    //
    //   // When
    //   userEvent.click(container, { clientX: 35, clientY: 240 });
    //   jest.advanceTimersByTime(1000);
    //
    //   // Then
    //   expect(mockHandler).toHaveBeenCalledWith(
    //     expect.objectContaining({
    //       start: new Date('2022-02-16T12:00:00.000'),
    //       end: new Date('2022-02-16T12:30:00.000'),
    //     })
    //   );
    // });
  });

  describe('GridSelection options', () => {
    const cases: GridSelectionOptions[] = [
      {
        enableDblClick: true,
        enableClick: true,
      },
      {
        enableDblClick: true,
        enableClick: false,
      },
      {
        enableDblClick: false,
        enableClick: true,
      },
      {
        enableDblClick: false,
        enableClick: false,
      },
    ];

    cases.forEach(({ enableDblClick, enableClick }) => {
      // FIXME
      // it(`should make enable/disable the click event depending on gridSelection options: { enableDblClick: ${enableDblClick}, enableClick: ${enableClick} }`, () => {
      //   // Given
      //   jest.useFakeTimers(); // Test for debounced click handler.
      //   setup({ gridSelection: { enableDblClick, enableClick } });
      //   const container = screen.getByTestId('container');
      //
      //   // When
      //   userEvent.click(container, {
      //     clientX: 0,
      //     clientY: 0,
      //   });
      //   jest.advanceTimersByTime(1000);
      //
      //   // Then
      //   if (enableClick) {
      //     expect(getGridSelectionState().timeGrid).not.toBeNull();
      //   } else {
      //     expect(getGridSelectionState().timeGrid).toBeNull();
      //   }
      // });
      //
      // it(`should make enable/disable the double click event depending on gridSelection options: { enableDblClick: ${enableDblClick}, enableClick: ${enableClick} }`, () => {
      //   // Given
      //   setup({ gridSelection: { enableDblClick, enableClick } });
      //   const container = screen.getByTestId('container');
      //
      //   // When
      //   userEvent.dblClick(container, {
      //     clientX: 0,
      //     clientY: 0,
      //   });
      //
      //   // Then
      //   if (enableDblClick) {
      //     expect(getGridSelectionState().timeGrid).not.toBeNull();
      //   } else {
      //     expect(getGridSelectionState().timeGrid).toBeNull();
      //   }
      // });

      it(`should not affect the drag event: { enableDblClick: ${enableDblClick}, enableClick: ${enableClick} }`, () => {
        // Given
        setup({ gridSelection: { enableDblClick, enableClick } });
        const container = screen.getByTestId('container');

        // When
        dragAndDrop({
          element: container,
          initPosition: { clientX: 0, clientY: 0 },
          targetPosition: { clientX: 35, clientY: 240 },
        });

        // Then
        expect(getGridSelectionState().timeGrid).not.toBeNull();
      });
    });
  });
});
