import { h } from 'preact';

import { act, renderHook } from '@testing-library/preact-hooks';

import { initCalendarStore, StoreProvider } from '@src/contexts/calendarStore';
import { DRAGGING_TYPE_CONSTANTS } from '@src/helpers/drag';
import { createGridPositionFinder } from '@src/helpers/grid';
import { useTimeGridSelection } from '@src/hooks/timeGridSelection/timeGridSelection';
import { DndDispatchers } from '@src/slices/dnd';
import { noop } from '@src/utils/noop';

import { PropsWithChildren } from '@t/components/common';
import { GridPositionFinder } from '@t/grid';
import { CalendarStore, InternalStoreAPI } from '@t/store';

describe('useTimeGridSelection', () => {
  let store: InternalStoreAPI<CalendarStore>;
  let dispatchers: DndDispatchers;
  let gridPositionFinder: GridPositionFinder;
  const container = document.createElement('div');

  const wrapper = ({ children }: PropsWithChildren) => (
    <StoreProvider store={store}>{children}</StoreProvider>
  );
  const setup = () => {
    const { result } = renderHook(() => useTimeGridSelection(gridPositionFinder), { wrapper });

    return result;
  };

  beforeEach(() => {
    store = initCalendarStore();
    dispatchers = store.getState().dispatch.dnd;
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
    gridPositionFinder = createGridPositionFinder({
      rowsCount: 48,
      columnsCount: 7,
      container,
    });
  });

  it('should return null if mousedown not fired', () => {
    // Given
    const result = setup();

    // When

    // Then
    expect(result.current).toBeNull();
  });

  describe('when drag start', () => {
    const cases = [
      {
        initX: 0,
        initY: 0,
        expected: {
          currentColIndex: 0,
          currentRowIndex: 0,
          initColIndex: 0,
          initRowIndex: 0,
        },
      },
      {
        initX: 0,
        initY: 480,
        expected: {
          currentColIndex: 0,
          currentRowIndex: 47,
          initColIndex: 0,
          initRowIndex: 47,
        },
      },
      {
        initX: 70,
        initY: 0,
        expected: {
          currentColIndex: 6,
          currentRowIndex: 0,
          initColIndex: 6,
          initRowIndex: 0,
        },
      },
      {
        initX: 70,
        initY: 480,
        expected: {
          currentColIndex: 6,
          currentRowIndex: 47,
          initColIndex: 6,
          initRowIndex: 47,
        },
      },
      {
        initX: 15,
        initY: 35,
        expected: {
          currentColIndex: 1,
          currentRowIndex: 3,
          initColIndex: 1,
          initRowIndex: 3,
        },
      },
      {
        initX: 35,
        initY: 165,
        expected: {
          currentColIndex: 3,
          currentRowIndex: 16,
          initColIndex: 3,
          initRowIndex: 16,
        },
      },
    ];

    cases.forEach(({ initX, initY, expected }) => {
      it(`should return grid selection data if mousedown fired at (${initX}, ${initY})`, () => {
        // Given
        const result = setup();

        // When
        act(() => {
          dispatchers.initDrag({
            draggingItemType: DRAGGING_TYPE_CONSTANTS.timeGridColumnSelection,
            initX,
            initY,
          });
        });

        // Then
        expect(result.current).toEqual(expected);
      });
    });
  });

  describe('when dragging', () => {
    const initX = 0;
    const initY = 0;
    const cases = [
      {
        x: 0,
        y: 0,
        expected: {
          currentColIndex: 0,
          currentRowIndex: 0,
        },
      },
      {
        x: 0,
        y: 480,
        expected: {
          currentColIndex: 0,
          currentRowIndex: 47,
        },
      },
      {
        x: 70,
        y: 0,
        expected: {
          currentColIndex: 6,
          currentRowIndex: 0,
        },
      },
      {
        x: 70,
        y: 480,
        expected: {
          currentColIndex: 6,
          currentRowIndex: 47,
        },
      },
      {
        x: 15,
        y: 35,
        expected: {
          currentColIndex: 1,
          currentRowIndex: 3,
        },
      },
      {
        x: 35,
        y: 165,
        expected: {
          currentColIndex: 3,
          currentRowIndex: 16,
        },
      },
    ];

    cases.forEach(({ x, y, expected }) => {
      it(`should return grid selection data if drag fired at (${x}, ${y})`, () => {
        // Given
        const result = setup();

        // When
        act(() => {
          dispatchers.initDrag({
            draggingItemType: DRAGGING_TYPE_CONSTANTS.timeGridColumnSelection,
            initX,
            initY,
          });
        });

        act(() => {
          dispatchers.setDraggingState({ x, y });
        });

        // Then
        expect(result.current).toEqual({
          ...expected,
          initColIndex: initX,
          initRowIndex: initY,
        });
      });
    });
  });
});
