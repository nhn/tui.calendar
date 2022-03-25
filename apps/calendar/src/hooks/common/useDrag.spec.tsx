import { h } from 'preact';

import { fireEvent, render, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';

import { MINIMUM_DRAG_MOUSE_DISTANCE } from '@src/constants/mouse';
import { initCalendarStore, StoreProvider } from '@src/contexts/calendarStore';
import { DragListeners, useDrag } from '@src/hooks/common/useDrag';
import { dragAndDrop } from '@src/test/utils';

import { PropsWithChildren } from '@t/components/common';
import { DraggingTypes } from '@t/drag';
import { CalendarStore, InternalStoreAPI } from '@t/store';

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
    userEvent.click(button);

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
});
