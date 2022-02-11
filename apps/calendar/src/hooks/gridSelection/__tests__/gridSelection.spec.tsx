import { h } from 'preact';

import { fireEvent, screen } from '@testing-library/preact';
import { act, renderHook } from '@testing-library/preact-hooks';

import { initCalendarStore, StoreProvider } from '@src/contexts/calendarStore';
import { createGridPositionFinder } from '@src/helpers/grid';
import { useGridSelection } from '@src/hooks/gridSelection/gridSelection';
import { DndDispatchers } from '@src/slices/dnd';
import TZDate from '@src/time/date';
import { noop } from '@src/utils/noop';

import { PropsWithChildren } from '@t/components/common';
import { GridPosition } from '@t/grid';
import { CalendarStore, InternalStoreAPI } from '@t/store';

/**
 * 1. 타입별 인자를 받도록 수정한다. (type, gridPositionFinder, sorter, date getter, date context)
 * 2. GridPosition값이 바뀌면 sort하여 GridSelection을 저장한다.
 * 3. dragEnd가 발생 시, date getter로 시작 시간과 끝 시간을 가져와서 show popup 액션을 실행한다.
 */

describe.only('useGridSelection', () => {
  let store: InternalStoreAPI<CalendarStore>;
  let dispatchers: DndDispatchers;

  const wrapper = ({ children }: PropsWithChildren) => (
    <StoreProvider store={store}>{children}</StoreProvider>
  );
  const setup = () => {
    const container = document.createElement('div');
    container.setAttribute('data-testId', 'container');
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

    const gridPositionFinder = createGridPositionFinder({
      rowsCount: 48,
      columnsCount: 7,
      container,
    });

    const { result } = renderHook(
      () =>
        useGridSelection({
          type: 'timeGrid',
          selectionSorter: jest.fn((gridPosition: GridPosition) => ({
            startRowIndex: gridPosition.rowIndex,
            startColumnIndex: gridPosition.columnIndex,
            endRowIndex: gridPosition.rowIndex,
            endColumnIndex: gridPosition.columnIndex,
          })),
          dateGetter: jest.fn(() => [new TZDate(), new TZDate()]),
          dateCollection: {} as any,
          gridPositionFinder,
        }),
      {
        wrapper,
      }
    );

    if (result.current) {
      container.addEventListener('mousedown', result.current.onMouseDown);
      container.addEventListener('click', result.current.onClick);
    }

    return result;
  };

  beforeEach(() => {
    store = initCalendarStore();
    dispatchers = store.getState().dispatch.dnd;
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
      it(`should return grid selection data if mousedown fired at (${initX}, ${initY})`, () => {
        // Given
        const result = setup();
        const container = screen.getByTestId('container');

        // When
        act(() => {
          fireEvent.click(container, {
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
    const initX = 0;
    const initY = 0;
    const cases = [
      {
        x: 0,
        y: 0,
        expected: {
          endColumnIndex: 0,
          endRowIndex: 0,
        },
      },
      {
        x: 0,
        y: 480,
        expected: {
          endColumnIndex: 0,
          endRowIndex: 47,
        },
      },
      {
        x: 70,
        y: 0,
        expected: {
          endColumnIndex: 6,
          endRowIndex: 0,
        },
      },
      {
        x: 70,
        y: 480,
        expected: {
          endColumnIndex: 6,
          endRowIndex: 47,
        },
      },
      {
        x: 15,
        y: 35,
        expected: {
          endColumnIndex: 1,
          endRowIndex: 3,
        },
      },
      {
        x: 35,
        y: 165,
        expected: {
          endColumnIndex: 3,
          endRowIndex: 16,
        },
      },
    ];

    cases.forEach(({ x, y, expected }) => {});
  });
});
