import { useCallback, useEffect, useRef } from 'preact/hooks';

import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { dndSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import { isEscapePressed } from '@src/utils/keyboard';
import { noop } from '@src/utils/noop';
import { isNil } from '@src/utils/type';

import { DraggingTypes } from '@t/drag';

export interface DragListeners {
  onDragStart?: MouseEventListener;
  onDrag?: MouseEventListener;
  onDragEnd?: MouseEventListener;
  onPressESCKey?: KeyboardEventListener;
}

function isLeftClick(buttonNum: number) {
  return buttonNum === 0;
}

export function useDrag(
  draggingItemType: DraggingTypes,
  { onDragStart = noop, onDrag = noop, onDragEnd = noop, onPressESCKey = noop }: DragListeners = {}
) {
  const { initDrag, setDraggingState, endDrag, reset } = useDispatch('dnd');

  const { draggingState, initX, initY } = useStore(dndSelector);
  const isDragging = draggingState > DraggingState.INIT;
  const isDraggingStarted =
    !isNil(initX) && !isNil(initY) && draggingState < DraggingState.END_DRAG;

  const onMouseMoveRef = useRef<MouseEventListener | null>(null);
  const onMouseUpRef = useRef<MouseEventListener | null>(null);
  const onKeyDownRef = useRef<KeyboardEventListener | null>(null);

  const onMouseDown = useCallback<MouseEventListener>(
    (e) => {
      if (!isLeftClick(e.button)) {
        return;
      }

      initDrag({
        draggingItemType,
        initX: e.clientX,
        initY: e.clientY,
      });
    },
    [draggingItemType, initDrag]
  );

  const onMouseMove = useCallback<MouseEventListener>(
    (e) => {
      // prevent text selection on dragging
      e.preventDefault();

      if (!isDragging) {
        onDragStart(e);
        setDraggingState({});

        return;
      }

      setDraggingState({ draggingItemType, x: e.clientX, y: e.clientY });
      onDrag(e);
    },
    [draggingItemType, isDragging, onDrag, onDragStart, setDraggingState]
  );

  const onMouseUp = useCallback<MouseEventListener>(
    (e) => {
      if (isDragging) {
        endDrag();
        onDragEnd(e);
      }
    },
    [endDrag, isDragging, onDragEnd]
  );

  const onKeydown = useCallback<KeyboardEventListener>(
    (e) => {
      if (isEscapePressed(e)) {
        onPressESCKey(e);
        reset();
      }
    },
    [onPressESCKey, reset]
  );

  useEffect(() => {
    onMouseMoveRef.current = onMouseMove;
    onMouseUpRef.current = onMouseUp;
    onKeyDownRef.current = onKeydown;
  }, [onKeydown, onMouseMove, onMouseUp]);

  useEffect(() => {
    const handleMouseMove: MouseEventListener = (e) => onMouseMoveRef.current?.(e);
    const handleMouseUp: MouseEventListener = (e) => onMouseUpRef.current?.(e);
    const handleKeydown: KeyboardEventListener = (e) => onKeyDownRef.current?.(e);

    if (isDraggingStarted) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('keydown', handleKeydown);

      return () => {
        reset();
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('keydown', handleKeydown);
      };
    }

    return noop;
  }, [isDraggingStarted, reset]);

  return {
    isDragging,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onKeydown,
  };
}
