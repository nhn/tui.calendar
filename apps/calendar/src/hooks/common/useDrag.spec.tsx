import { h } from 'preact';

import { MINIMUM_DRAG_MOUSE_DISTANCE } from '@src/constants/mouse';
import { initCalendarStore, StoreProvider } from '@src/contexts/calendarStore';
import type { DragListeners } from '@src/hooks/common/useDrag';
import { useDrag } from '@src/hooks/common/useDrag';
import { DraggingState } from '@src/slices/dnd';
import { dragAndDrop, fireEvent, render, screen } from '@src/test/utils';

import type { PropsWithChildren } from '@t/components/common';
import type { DraggingTypes } from '@t/drag';
import type { CalendarStore, InternalStoreAPI } from '@t/store';

describe('drag hook', () => {
  const TEST_DRAGGING_TYPE = 'drag-test';
  let store: InternalStoreAPI<CalendarStore>;
  const listeners: DragListeners = {
    onInit: jest.fn(),
    onDragStart: jest.fn(),
    onDrag: jest.fn(),
    onMouseUp: jest.fn(),
    onPressESCKey: jest.fn(),
  };
  const wrapper = ({ children }: PropsWithChildren) => {
    store = initCalendarStore();

    return <StoreProvider store={store}>{children}</StoreProvider>;
  };
  const Component = () => {
    const onMouseDown = useDrag(TEST_DRAGGING_TYPE as DraggingTypes, listeners);

    return <button onMouseDown={onMouseDown} />;
  };
  const setup = () => render(<Component />, { wrapper });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fire onInit when mouse down', () => {
    // Given
    setup();
    const button = screen.getByRole('button');

    // When
    fireEvent.mouseDown(button);

    // Then
    expect(listeners.onInit).toBeCalledWith(
      expect.objectContaining({
        button: 0,
      }),
      expect.objectContaining({
        draggingItemType: TEST_DRAGGING_TYPE,
        initX: 0,
        initY: 0,
        x: null,
        y: null,
      })
    );
  });

  it('should fire onDragStart when move more than equal 3px from the staring point', () => {
    // Given
    setup();
    const button = screen.getByRole('button');
    const targetCoords = {
      clientX: MINIMUM_DRAG_MOUSE_DISTANCE + 1,
      clientY: MINIMUM_DRAG_MOUSE_DISTANCE + 1,
    };

    // When
    fireEvent.mouseDown(button);
    fireEvent.mouseMove(document, targetCoords);

    // Then
    expect(listeners.onDragStart).toBeCalledWith(
      expect.objectContaining(targetCoords),
      expect.objectContaining({
        draggingItemType: TEST_DRAGGING_TYPE,
        initX: 0,
        initY: 0,
        x: targetCoords.clientX,
        y: targetCoords.clientY,
      })
    );
  });

  it('should not fire onDragStart when move less than 3px from the staring point', () => {
    // Given
    setup();
    const button = screen.getByRole('button');

    // When
    fireEvent.mouseDown(button);
    fireEvent.mouseMove(document, {
      clientX: MINIMUM_DRAG_MOUSE_DISTANCE - 1,
      clientY: MINIMUM_DRAG_MOUSE_DISTANCE - 1,
    });

    // Then
    expect(listeners.onDragStart).not.toBeCalled();
  });

  it('fires onDrag when mousemove after onDragStart', () => {
    // Given
    setup();
    const button = screen.getByRole('button');
    const targetCoords = {
      clientX: MINIMUM_DRAG_MOUSE_DISTANCE + 1,
      clientY: MINIMUM_DRAG_MOUSE_DISTANCE + 1,
    };

    // When
    dragAndDrop({
      element: button,
      initPosition: { clientX: 0, clientY: 0 },
      targetPosition: targetCoords,
      hold: true,
    });

    // Then
    expect(listeners.onDrag).toBeCalledWith(
      expect.objectContaining(targetCoords),
      expect.objectContaining({
        draggingItemType: TEST_DRAGGING_TYPE,
        initX: 0,
        initY: 0,
        x: targetCoords.clientX,
        y: targetCoords.clientY,
      })
    );
  });

  it('fires onMouseUp right after dragging is started', () => {
    // Given
    setup();
    const button = screen.getByRole('button');

    // When
    fireEvent.mouseDown(button);
    fireEvent.mouseUp(button);

    // Then
    expect(listeners.onMouseUp).toBeCalled();
  });

  it('fires onPressESCKey when press ESC key', () => {
    // Given
    setup();
    const button = screen.getByRole('button');

    // When
    fireEvent.mouseDown(button);
    fireEvent.keyDown(document, { key: 'Escape' });

    // Then
    expect(listeners.onPressESCKey).toBeCalled();
  });
  describe('draggingState', () => {
    const getDraggingState = () => store.getState().dnd.draggingState;

    it('should be an idle state when a drag is not started', () => {
      // Given
      setup();

      // When
      // Nothing

      // Then
      expect(getDraggingState()).toBe(DraggingState.IDLE);
    });

    it('should be an init state when a drag is started (after mousedown and before mousemove)', () => {
      // Given
      setup();
      const button = screen.getByRole('button');

      // When
      fireEvent.mouseDown(button);

      // Then
      expect(getDraggingState()).toBe(DraggingState.INIT);
    });

    it('should be a dragging state when a drag is working (after mousemove)', () => {
      // Given
      setup();
      const button = screen.getByRole('button');

      // When
      dragAndDrop({
        element: button,
        targetPosition: {
          clientX: MINIMUM_DRAG_MOUSE_DISTANCE,
          clientY: MINIMUM_DRAG_MOUSE_DISTANCE,
        },
        hold: true,
      });

      // Then
      expect(getDraggingState()).toBe(DraggingState.DRAGGING);
    });

    it('should be an idle state when a drag is finished (after mouseup)', () => {
      // Given
      setup();
      const button = screen.getByRole('button');

      // When
      dragAndDrop({
        element: button,
        targetPosition: {
          clientX: MINIMUM_DRAG_MOUSE_DISTANCE,
          clientY: MINIMUM_DRAG_MOUSE_DISTANCE,
        },
        hold: false,
      });

      // Then
      expect(getDraggingState()).toBe(DraggingState.IDLE);
    });

    it('should be a canceled state when a drag is canceled by pressing an ESC key', () => {
      // Given
      setup();
      const button = screen.getByRole('button');

      // When
      dragAndDrop({
        element: button,
        targetPosition: {
          clientX: MINIMUM_DRAG_MOUSE_DISTANCE,
          clientY: MINIMUM_DRAG_MOUSE_DISTANCE,
        },
        hold: true,
      });
      fireEvent.keyDown(document, { key: 'Escape' });

      // Then
      expect(getDraggingState()).toBe(DraggingState.CANCELED);
    });
  });
});
