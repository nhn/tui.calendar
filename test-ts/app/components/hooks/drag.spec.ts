import { useDrag, DISTANCE, MouseEventListener, DragListeners } from '@src/components/hooks/drag';
import { noop } from '@src/util';
import { createMouseEvent, createKeyboardEvent } from '@test/util';

const primaryButton = 0;

describe('drag hook', () => {
  let onMouseDown: MouseEventListener;
  let onMouseMove: MouseEventListener;
  let onMouseUp: MouseEventListener;
  let onKeydown: (e: KeyboardEvent) => void;
  let mouseDownEvent: MouseEvent;
  let mouseMoveEvent: MouseEvent;
  let mouseUpEvent: MouseEvent;
  let listeners: DragListeners;

  beforeEach(() => {
    listeners = {
      onDragStart: noop,
      onDrag: noop,
      onDragEnd: noop,
      onClick: noop,
      onCancel: noop
    };
    spyOn(listeners, 'onDragStart');
    spyOn(listeners, 'onDrag');
    spyOn(listeners, 'onDragEnd');
    spyOn(listeners, 'onClick');
    spyOn(listeners, 'onCancel');

    ({ onMouseDown, onMouseMove, onMouseUp, onKeydown } = useDrag(listeners));

    mouseDownEvent = createMouseEvent('mousedown', { button: primaryButton });
    mouseMoveEvent = createMouseEvent('mousemove');
    mouseUpEvent = createMouseEvent('mouseup');
  });

  it('fires onDragStart', () => {
    onMouseDown(mouseDownEvent);

    // do not fire until distance is DISTANCE
    for (let i = 0; i < DISTANCE; i += 1) {
      onMouseMove(mouseMoveEvent);

      expect(listeners.onDragStart).not.toHaveBeenCalledWith(mouseMoveEvent);
    }

    // fire it after fulfilling distance
    onMouseMove(mouseMoveEvent);

    expect(listeners.onDragStart).toHaveBeenCalledWith(mouseMoveEvent);
  });

  it('fires onDrag', () => {
    onMouseDown(mouseDownEvent);

    // fire it after fulfilling distance
    for (let i = 0; i <= DISTANCE; i += 1) {
      onMouseMove(mouseMoveEvent);
    }

    onMouseMove(mouseMoveEvent);

    expect(listeners.onDrag).toHaveBeenCalledWith(mouseMoveEvent);
  });

  it('fires onDragEnd, not onClick', () => {
    onMouseDown(mouseDownEvent);

    // fire onDragStart after fulfilling distance
    for (let i = 0; i <= DISTANCE; i += 1) {
      onMouseMove(mouseMoveEvent);
    }

    // fire onDrag
    onMouseMove(mouseMoveEvent);

    // fire onDragEnd
    onMouseUp(mouseUpEvent);

    expect(listeners.onDragEnd).toHaveBeenCalledWith(mouseUpEvent);
    expect(listeners.onClick).not.toHaveBeenCalledWith();
  });

  it('fires onClick', () => {
    onMouseDown(mouseDownEvent);
    onMouseMove(mouseMoveEvent);
    onMouseUp(mouseUpEvent);

    expect(listeners.onClick).toHaveBeenCalledWith(mouseUpEvent);
  });

  it('ESC fires onCancel and do not fire any more events', () => {
    const keyEvent = createKeyboardEvent('keydown', { key: 'Escape' });

    onMouseDown(mouseDownEvent);

    // fire onDragStart after fulfilling distance
    for (let i = 0; i <= DISTANCE; i += 1) {
      onMouseMove(mouseMoveEvent);
    }

    onKeydown(keyEvent);

    onMouseMove(mouseMoveEvent);
    onMouseUp(mouseUpEvent);

    expect(listeners.onDragStart).toHaveBeenCalledWith(mouseMoveEvent);
    expect(listeners.onCancel).toHaveBeenCalledWith();
    expect(listeners.onDrag).not.toHaveBeenCalledWith(mouseMoveEvent);
    expect(listeners.onDragEnd).not.toHaveBeenCalledWith();
  });
});
