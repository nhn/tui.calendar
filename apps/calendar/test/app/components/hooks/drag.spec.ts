import { DragListeners, MINIMUM_MOVE_DISTANCE, useDrag } from '@src/components/hooks/drag';
import { noop } from '@src/util';

import { createKeyboardEvent, createMouseEvent, spyOnDragEvent } from '@test/helper';
import { act, renderHook } from '@testing-library/preact-hooks';

const primaryButton = 0;

describe('drag hook', () => {
  let mouseDownEvent: MouseEvent;
  let mouseMoveEvent: MouseEvent;
  let mouseUpEvent: MouseEvent;
  let listeners: DragListeners;
  const setup = () => {
    const { result } = renderHook(() => useDrag(listeners));
    act(() => {
      result.current?.onMouseDown(mouseDownEvent);
    });

    return result;
  };

  beforeEach(() => {
    listeners = {
      onDragStart: noop,
      onDrag: noop,
      onDragEnd: noop,
      onPressESCKey: noop,
    };

    spyOnDragEvent(listeners);

    mouseDownEvent = createMouseEvent('mousedown', { button: primaryButton });
    mouseMoveEvent = createMouseEvent('mousemove');
    mouseUpEvent = createMouseEvent('mouseup');
  });

  it('fires onDragStart', () => {
    const result = setup();

    // do not fire until distance is DISTANCE
    for (let i = 0; i < MINIMUM_MOVE_DISTANCE; i += 1) {
      // eslint-disable-next-line no-loop-func
      act(() => {
        result.current?.onMouseMove(mouseMoveEvent);
      });

      expect(listeners.onDragStart).not.toHaveBeenCalledWith(mouseMoveEvent);
    }

    // fire it after fulfilling distance
    act(() => {
      result.current?.onMouseMove(mouseMoveEvent);
    });

    expect(listeners.onDragStart).toHaveBeenCalledWith(mouseMoveEvent);
  });

  it('fires onDrag', () => {
    const result = setup();

    // fire it after fulfilling distance
    for (let i = 0; i <= MINIMUM_MOVE_DISTANCE; i += 1) {
      // eslint-disable-next-line no-loop-func
      act(() => {
        result.current?.onMouseMove(mouseMoveEvent);
      });
    }

    act(() => {
      result.current?.onMouseMove(mouseMoveEvent);
    });

    expect(listeners.onDrag).toHaveBeenCalledWith(mouseMoveEvent);
  });

  it('fires onDragEnd', () => {
    const result = setup();

    // fire onDragStart after fulfilling distance
    for (let i = 0; i <= MINIMUM_MOVE_DISTANCE; i += 1) {
      // eslint-disable-next-line no-loop-func
      act(() => {
        result.current?.onMouseMove(mouseMoveEvent);
      });
    }

    // fire onDrag
    act(() => {
      result.current?.onMouseMove(mouseMoveEvent);
    });

    // fire onDragEnd
    act(() => {
      result.current?.onMouseUp(mouseUpEvent);
    });

    expect(listeners.onDragEnd).toHaveBeenCalledWith(mouseUpEvent);
  });

  it('ESC fires onCancel and do not fire any more events', () => {
    const keyEvent = createKeyboardEvent('keydown', { key: 'Escape' });
    const result = setup();

    // fire onDragStart after fulfilling distance
    for (let i = 0; i <= MINIMUM_MOVE_DISTANCE; i += 1) {
      // eslint-disable-next-line no-loop-func
      act(() => {
        result.current?.onMouseMove(mouseMoveEvent);
      });
    }

    act(() => {
      result.current?.onKeydown(keyEvent);
    });

    expect(listeners.onDragStart).toHaveBeenCalledWith(mouseMoveEvent);
    expect(listeners.onPressESCKey).toHaveBeenCalled();

    act(() => {
      result.current?.onMouseMove(mouseMoveEvent);
      result.current?.onMouseUp(mouseUpEvent);
    });

    expect(listeners.onDrag).not.toHaveBeenCalledWith(mouseMoveEvent);
    expect(listeners.onDragEnd).not.toHaveBeenCalled();
  });
});
