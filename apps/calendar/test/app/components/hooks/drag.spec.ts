import {
  DragListeners,
  MINIMUM_MOVE_DETECTION_DISTANCE,
  useDrag,
} from '@src/components/hooks/drag';
import { noop } from '@src/util';

import { createKeyboardEvent, createMouseEvent, spyOnDragEvent } from '@test/helper';
import { act, renderHook } from '@testing-library/preact-hooks';

const primaryButton = 0;

describe('drag hook', () => {
  let mouseDownEvent: MouseEvent;
  let mouseMoveEvent: MouseEvent;
  let mouseUpEvent: MouseEvent;
  let listeners: DragListeners;
  const setup = () => renderHook(() => useDrag(listeners));

  beforeEach(() => {
    listeners = {
      onDragStart: noop,
      onDrag: noop,
      onDragEnd: noop,
      onClick: noop,
      onCancel: noop,
    };

    spyOnDragEvent(listeners);

    mouseDownEvent = createMouseEvent('mousedown', { button: primaryButton });
    mouseMoveEvent = createMouseEvent('mousemove');
    mouseUpEvent = createMouseEvent('mouseup');
  });

  it('fires onDragStart', () => {
    const { result } = setup();
    act(() => {
      result.current?.onMouseDown(mouseDownEvent);
    });

    // do not fire until distance is DISTANCE
    for (let i = 0; i < MINIMUM_MOVE_DETECTION_DISTANCE; i += 1) {
      result.current?.onMouseMove(mouseMoveEvent);

      expect(listeners.onDragStart).not.toHaveBeenCalledWith(mouseMoveEvent);
    }

    // fire it after fulfilling distance
    result.current?.onMouseMove(mouseMoveEvent);

    expect(listeners.onDragStart).toHaveBeenCalledWith(mouseMoveEvent);
  });

  it('fires onDrag', () => {
    const { result } = setup();
    act(() => {
      result.current?.onMouseDown(mouseDownEvent);
    });

    // fire it after fulfilling distance
    for (let i = 0; i <= MINIMUM_MOVE_DETECTION_DISTANCE; i += 1) {
      result.current?.onMouseMove(mouseMoveEvent);
    }

    result.current?.onMouseMove(mouseMoveEvent);

    expect(listeners.onDrag).toHaveBeenCalledWith(mouseMoveEvent);
  });

  it('fires onDragEnd, not onClick', () => {
    const { result } = setup();
    act(() => {
      result.current?.onMouseDown(mouseDownEvent);
    });

    // fire onDragStart after fulfilling distance
    for (let i = 0; i <= MINIMUM_MOVE_DETECTION_DISTANCE; i += 1) {
      result.current?.onMouseMove(mouseMoveEvent);
    }

    // fire onDrag
    result.current?.onMouseMove(mouseMoveEvent);

    // fire onDragEnd
    act(() => {
      result.current?.onMouseUp(mouseUpEvent);
    });

    expect(listeners.onDragEnd).toHaveBeenCalledWith(mouseUpEvent);
    expect(listeners.onClick).not.toHaveBeenCalled();
  });

  it('fires onClick', () => {
    const { result } = setup();
    act(() => {
      result.current?.onMouseDown(mouseDownEvent);
    });

    result.current?.onMouseMove(mouseMoveEvent);
    result.current?.onMouseUp(mouseUpEvent);

    expect(listeners.onClick).toHaveBeenCalledWith(mouseUpEvent);
  });

  it('ESC fires onCancel and do not fire any more events', () => {
    const keyEvent = createKeyboardEvent('keydown', { key: 'Escape' });
    const { result } = setup();
    act(() => {
      result.current?.onMouseDown(mouseDownEvent);
    });

    // fire onDragStart after fulfilling distance
    for (let i = 0; i <= MINIMUM_MOVE_DETECTION_DISTANCE; i += 1) {
      result.current?.onMouseMove(mouseMoveEvent);
    }

    act(() => {
      result.current?.onKeydown(keyEvent);
    });

    expect(listeners.onDragStart).toHaveBeenCalledWith(mouseMoveEvent);
    expect(listeners.onCancel).toHaveBeenCalled();

    result.current?.onMouseMove(mouseMoveEvent);
    result.current?.onMouseUp(mouseUpEvent);

    expect(listeners.onDrag).not.toHaveBeenCalledWith(mouseMoveEvent);
    expect(listeners.onDragEnd).not.toHaveBeenCalled();
  });
});
