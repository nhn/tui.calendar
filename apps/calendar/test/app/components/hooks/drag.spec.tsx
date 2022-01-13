import { h } from 'preact';

import { act, renderHook } from '@testing-library/preact-hooks';

import { initCalendarStore, StoreProvider } from '@src/contexts/calendarStore';
import { DragListeners, useDrag } from '@src/hooks/common/drag';
import { noop } from '@src/utils/noop';

import { createKeyboardEvent, createMouseEvent, spyOnDragEvent } from '@test/helper';

import { PropsWithChildren } from '@t/components/common';
import { DraggingTypes } from '@t/drag';

const primaryButton = 0;

describe('drag hook', () => {
  let mouseDownEvent: MouseEvent;
  let mouseMoveEvent: MouseEvent;
  let mouseUpEvent: MouseEvent;
  let listeners: DragListeners;
  const wrapper = ({ children }: PropsWithChildren) => {
    const store = initCalendarStore();

    return <StoreProvider store={store}>{children}</StoreProvider>;
  };
  const setup = () => {
    const { result } = renderHook(() => useDrag('drag-test' as DraggingTypes, listeners), {
      wrapper,
    });
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

    act(() => {
      result.current?.onMouseMove(mouseMoveEvent);
    });

    expect(listeners.onDragStart).toHaveBeenCalledWith(mouseMoveEvent);
  });

  it('fires onDrag when onMouseMove invoked more than twice', () => {
    const result = setup();

    act(() => {
      result.current?.onMouseMove(mouseMoveEvent);
    });

    act(() => {
      result.current?.onMouseMove(mouseMoveEvent);
    });

    expect(listeners.onDrag).toHaveBeenCalledWith(mouseMoveEvent);
  });

  it('fires onDragEnd', () => {
    const result = setup();

    act(() => {
      result.current?.onMouseMove(mouseMoveEvent);
    });

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

    act(() => {
      result.current?.onMouseMove(mouseMoveEvent);
    });

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
